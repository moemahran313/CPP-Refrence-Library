import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Lazy loading for safety on missing key
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required to run the C++ simulation engine.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Robust retry utility for handling transient 503/429/UNAVAILABLE/RESOURCE_EXHAUSTED high-demand or quota errors
async function generateWithRetry(client: GoogleGenAI, payload: any, maxRetries = 5, baseDelayMs = 2000) {
  let lastError: any = null;
  const originalModel = payload.model || "gemini-flash-latest";
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Gemini Sandbox Engine] Contacting model ${payload.model} (attempt ${attempt}/${maxRetries})...`);
      const response = await client.models.generateContent(payload);
      return response;
    } catch (error: any) {
      lastError = error;
      const errorMsg = error?.message || "";
      console.error(`[Gemini Sandbox Error] Attempt ${attempt} failed with:`, errorMsg);
      
      const isUnavailableOrRateLimited = 
        errorMsg.includes("503") || 
        errorMsg.includes("UNAVAILABLE") || 
        errorMsg.includes("high demand") || 
        errorMsg.includes("429") ||
        errorMsg.includes("RESOURCE_EXHAUSTED") ||
        errorMsg.includes("quota") ||
        errorMsg.includes("Quota") ||
        error?.status === "UNAVAILABLE" ||
        error?.status === "RESOURCE_EXHAUSTED" ||
        (error?.code && (String(error.code) === "503" || String(error.code) === "429"));

      // Rotate models to bypass quota limits or transient unavailability immediately on retry!
      if (isUnavailableOrRateLimited && attempt < maxRetries) {
        if (payload.model === "gemini-flash-latest") {
          console.warn(`[Gemini Sandbox Fallback] Rate limit or high volume on gemini-flash-latest. Switching to gemini-3.1-flash-lite...`);
          payload.model = "gemini-3.1-flash-lite";
        } else if (payload.model === "gemini-3.1-flash-lite") {
          console.warn(`[Gemini Sandbox Fallback] Rate limit or high volume on gemini-3.1-flash-lite. Switching to gemini-1.5-flash...`);
          payload.model = "gemini-1.5-flash"; 
        } else {
          console.warn(`[Gemini Sandbox Fallback] Rate limit or high volume on ${payload.model}. Switching to gemini-flash-latest...`);
          payload.model = "gemini-flash-latest";
        }
      }

      if (attempt < maxRetries) {
        // Exponential backoff with random jitter to avoid thundering herd problem
        const jitter = 0.9 + Math.random() * 0.2;
        const delay = Math.round(baseDelayMs * Math.pow(2.2, attempt - 1) * jitter);
        console.warn(`[Gemini Sandbox Retry] Backing off. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  // Restore original model in case payload gets reused across requests
  payload.model = originalModel;
  throw lastError;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse json requests
  app.use(express.json());

  // Health check for troubleshooting connectivity
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  // API endpoint for simulating compilation and execution of C++ source strings
  app.post("/api/simulate-cpp", async (req, res) => {
    console.log("[Simulation Engine] Received request for C++ execution.");
    try {
      const { code, stdin } = req.body;

      if (!code) {
        res.status(400).json({ error: "Code payload is required." });
        return;
      }

      // Check if API key is configured
      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({
          error: "API Key missing",
          message: "The server requires your Gemini API Key. Please add 'GEMINI_API_KEY' in the Settings > Secrets menu."
        });
        return;
      }

      const client = getGeminiClient();

      const promptPayload = `CODE:
${code}

STDIN:
${stdin || ""}`;

      const systemInstruction = `You are the isolated, headless backend execution and compilation engine for a professional C++ Online Playground.
You operate with absolute zero conversation, zero markdown pleasantries, and zero textual fluff. Your sole purpose is to ingest a combined payload of C++ source code and standard input (stdin), simulate its complete syntactic and behavioral lifecycle using modern G++ conventions (C++20/C++23 standards), and output highly structured, raw terminal arrays.

## INPUT PAYLOAD SCHEMA:
The user payload will separate code logic from runtime input exactly as:
CODE:
[Full C++ source string]

STDIN:
[Sequential, space- or newline-separated input tokens]

## STREAM ALLOCATION RULES:
- No Logic Truncation: Do not skip loops, ignore macros, or summarize large code blocks. Parse all custom classes, templates, and header files line-by-line.

## THE LINE-BY-LINE SIMULATION & HALT ALGORITHM (CRITICAL):
You MUST mentally trace the execution of the C++ code main() function step-by-step, line-by-line:
1. Divide the provided STDIN string into a sequence of input values (tokens/lines). Let this be your "Available Inputs" queue/list.
2. Begin simulating the program from the start of main().
3. Maintain a simulated print buffer (TERMINAL_OUTPUT).
4. Walk through the code instructions in sequential execution order:
   - For any output statement (like \`cout << expr;\` or \`printf(...)\`):
     - Append the exact output string to TERMINAL_OUTPUT.
   - For any input statement (like \`cin >> x;\` or \`getline(cin, x);\`):
     - Inspect your "Available Inputs" queue for the next value.
     - **CASE 1: If there IS an input value available in the queue**:
       - Consume it (remove it from the queue).
       - Append that consumed value directly to TERMINAL_OUTPUT, followed immediately by a newline (\n) representing the user pressing the "Enter" key on their keyboard.
       - Assign that value to 'x' in your simulated program state, and continue executing the next statements.
     - **CASE 2: If the queue is EMPTY / exhausted (NO input available)**:
       - **YOU MUST STOP AND HALT ALL PROGRAM SIMULATION IMMEDIATELY.**
       - Do NOT simulate further statements. Do NOT print the next prompt strings or any other couts downstream.
       - Under ### [TERMINAL_OUTPUT], return exactly the characters printed up to this moment (ending precisely at the prompt character of the active input statement, without any echoed value and without any trailing newline).
       - Under ### [COMPILER_LOGS], you MUST set 'Status: SUSPENDED', set 'Exit Code: 0', and write "[ERR: Program suspended - Awaiting user input]" in the Diagnostics section. This is extremely important so the client knows to prompt the user for input.
       - Terminate your generation immediately. Do NOT output anything else.

## CONCRETE SIMULATION EXAMPLES (FOLLOW THESE PATTERNS EXACTLY):

### EXAMPLE 1 (Single Prompt, STDIN is empty)
CODE:
#include <iostream>
using namespace std;
int main() {
    string name;
    cout << "Enter your name: ";
    cin >> name;
    cout << "Hello " << name << "!" << endl;
    return 0;
}
STDIN:
[empty]

YOUR EXACT OUTPUT MUST BE:
### [TERMINAL_OUTPUT]
\`\`\`text
Enter your name: 
\`\`\`

### [COMPILER_LOGS]
\`\`\`text
Status: SUSPENDED
Exit Code: 0
Diagnostics:
[ERR: Program suspended - Awaiting user input]
\`\`\`

### EXAMPLE 2 (Single Prompt, STDIN is filled)
CODE:
#include <iostream>
using namespace std;
int main() {
    string name;
    cout << "Enter your name: ";
    cin >> name;
    cout << "Hello " << name << "!" << endl;
    return 0;
}
STDIN:
John

YOUR EXACT OUTPUT MUST BE:
### [TERMINAL_OUTPUT]
\`\`\`text
Enter your name: John
Hello John!
\`\`\`

### [COMPILER_LOGS]
\`\`\`text
Status: SUCCESS
Exit Code: 0
Diagnostics:
\`\`\`

### EXAMPLE 3 (Multiple Sequential Prompts, STDIN is partially filled)
CODE:
#include <iostream>
#include <string>
using namespace std;
int main() {
    string name;
    string city;
    cout << "Enter Name: ";
    getline(cin, name);
    cout << "Enter City: ";
    getline(cin, city);
    cout << name << " lives in " << city << endl;
    return 0;
}
STDIN:
Alice

YOUR EXACT OUTPUT MUST BE (Notice we halt at the city prompt because city input in STDIN is missing):
### [TERMINAL_OUTPUT]
\`\`\`text
Enter Name: Alice
Enter City: 
\`\`\`

### [COMPILER_LOGS]
\`\`\`text
Status: SUSPENDED
Exit Code: 0
Diagnostics:
[ERR: Program suspended - Awaiting user input]
\`\`\`

## COMPILATION & RUNTIME EXCEPTION RULES:
1. Compilation Phase: Scan for syntax errors, missing semicolons, type mismatches, implicit conversions, or violations of standard library rules. If any exist, fail the build immediately. Do not attempt to fix or guess what the user meant to write. Make sure the headers like <iostream>, <string>, <vector>, <algorithm> are strictly scrutinized.
2. Runtime Memory Tracking: Monitor pointer variables, addresses, array bounds, and resource lifetimes (RAII).
3. Crash Simulation: If the code attempts undefined behavior, you must simulate the explicit hardware/OS signal or standard exception:
   - Array index out of bounds on raw array -> Segmentation fault (core dumped)
   - Out of bounds on std::vector::at() -> std::out_of_range exception termination log.
   - Infinite recursion -> Stack overflow (core dumped)
   - Dereferencing a nullptr or dangling pointer -> Segmentation fault (core dumped)
   - Division by zero -> Floating point exception (core dumped)

## STRICTOR RESPONSE FORMAT:
Your final output response must consist ONLY of the markdown layout containing \`### [TERMINAL_OUTPUT]\` and \`### [COMPILER_LOGS]\`, exactly as shown in the examples.`;

      const response = await generateWithRetry(client, {
        model: "gemini-flash-latest",
        contents: promptPayload,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.1,
        }
      });

      // Defensive text extraction
      let text = "";
      try {
        text = response.text || "";
      } catch (err) {
        console.error("[Gemini Sandbox] Failed to extract text from response:", err);
        // If it throws, check if we have any candidate text parts manually
        if (response.candidates?.[0]?.content?.parts) {
          text = response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
        }
      }
      
      if (!text) {
        console.warn("[Gemini Sandbox] Model returned empty response or was filtered.");
        res.status(500).json({
          error: "Empty Response",
          message: "The execution engine returned no output. This might be due to safety filters or a transient error."
        });
        return;
      }

      // Parse the output blocks
      let terminalOutput = "";
      let status = "SUCCESS";
      let exitCode = "0";
      let diagnostics = "";

      const terminalOutputMatch = text.match(/###\s*\[TERMINAL_OUTPUT\]\s*```(?:text)?\n([\s\S]*?)```/i);
      if (terminalOutputMatch) {
        terminalOutput = terminalOutputMatch[1];
      }

      const compilerLogsMatch = text.match(/###\s*\[COMPILER_LOGS\]\s*```(?:text)?\n([\s\S]*?)```/i);
      if (compilerLogsMatch) {
        const logDetails = compilerLogsMatch[1];
        
        const statusMatch = logDetails.match(/Status:\s*([^\n]+)/i);
        if (statusMatch) status = statusMatch[1].trim();

        const exitCodeMatch = logDetails.match(/Exit Code:\s*([^\n]+)/i);
        if (exitCodeMatch) exitCode = exitCodeMatch[1].trim();

        const diagnosticsIndex = logDetails.indexOf("Diagnostics:");
        if (diagnosticsIndex !== -1) {
          diagnostics = logDetails.slice(diagnosticsIndex + "Diagnostics:".length).trim();
        }
      } else {
        // Fallback: If formatting slightly deviated, return raw response as terminalOutput
        terminalOutput = text;
      }

      res.json({
        terminalOutput,
        status,
        exitCode,
        diagnostics,
        raw: text
      });

    } catch (error: any) {
      console.error("Compilation simulation error:", error);
      
      const errorMsg = error?.message || "";
      const isUnavailable = errorMsg.includes("503") || 
                           errorMsg.includes("UNAVAILABLE") || 
                           errorMsg.includes("high demand") || 
                           error?.status === "UNAVAILABLE";

      const friendlyMessage = isUnavailable 
        ? "The sandbox compilation servers are under heavy load right now. Please wait a moment and press 'Run Code' to execute again."
        : (errorMsg || "An unexpected error occurred during execution.");

      res.status(500).json({
        error: isUnavailable ? "Service Busy" : "Simulation execution failed",
        message: friendlyMessage
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static client bundle assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
