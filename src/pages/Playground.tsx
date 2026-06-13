import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';
import { Terminal, Play, RotateCcw, HelpCircle, FileCode, CheckCircle, AlertTriangle, XCircle, Info, Keyboard } from 'lucide-react';
import { motion } from 'motion/react';
import { CppInterpreter } from '../lib/cppInterpreter';

// Code Templates for quick playground loads
interface CodeTemplate {
  name: string;
  description: string;
  code: string;
  stdin: string;
  isDangerous?: boolean;
}

const PLAYGROUND_TEMPLATES: CodeTemplate[] = [
  {
    name: "Hello World",
    description: "The basic starting blueprint of any C++ program.",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World! Welcome to Modern Academy." << endl;
    cout << "This playground is fueled by a simulated high-fidelity G++ engine." << endl;
    return 0;
}`,
    stdin: ""
  },
  {
    name: "Flight Ticket System",
    description: "Struct-based ticket details with custom base conversion logic.",
    code: `#include <iostream>
#include <string>

using namespace std;

struct FlightTicket {
    int ticketID;
    string passengerName;
    string destination;
    int flightNumber;
    float price;
};

string convertBase(int num, int base) {
    if (num == 0) return "0";
    string result = "";
    string digits = "0123456789ABCDEF";
    while (num > 0) {
        result = digits[num % base] + result;
        num /= base;
    }
    return result;
}

void displayTicket(FlightTicket t, int base) {
    cout << "\\n--- Ticket Details ---" << endl;
    cout << "Passenger: " << t.passengerName << endl;
    cout << "Destination: " << t.destination << endl;
    cout << "Ticket ID (Decimal): " << t.ticketID << endl;
    cout << "Ticket ID (Base " << base << "): " << convertBase(t.ticketID, base) << endl;
    cout << "Flight Number (Base " << base << "): " << convertBase(t.flightNumber, base) << endl;
    cout << "Price: $" << t.price << endl;
}

int main() {
    FlightTicket myTicket;
    int targetBase;

    cout << "Enter Passenger Name: ";
    getline(cin, myTicket.passengerName);
    
    cout << "Enter Destination: ";
    getline(cin, myTicket.destination);
    
    cout << "Enter Ticket ID (Decimal): ";
    cin >> myTicket.ticketID;
    
    cout << "Enter Flight Number (Decimal): ";
    cin >> myTicket.flightNumber;
    
    cout << "Enter Price: ";
    cin >> myTicket.price;

    cout << "Enter Target Base for Conversion (2-16): ";
    cin >> targetBase;

    if (targetBase >= 2 && targetBase <= 16) {
        displayTicket(myTicket, targetBase);
    } else {
        cout << "Invalid Base!" << endl;
    }

    return 0;
}`,
    stdin: "Muhammad Mahran\nLondon\n456\n1024\n599.99\n16"
  },
  {
    name: "Student Database",
    description: "Manage student profiles within a struct array database using CLI options.",
    code: `#include <iostream>
#include <string>

using namespace std;

struct Student {
    int id;
    string name;
    float gpa;
    string department;
    string email;
    int age;
};

const int MAX_STUDENTS = 100;
Student database[MAX_STUDENTS];
int currentCount = 0;

void showMenu() {
    cout << "\\n--- Student Database System ---" << endl;
    cout << "1. Add New Student" << endl;
    cout << "2. View All Students" << endl;
    cout << "3. Search by ID" << endl;
    cout << "4. Update Student Info" << endl;
    cout << "5. Delete Student" << endl;
    cout << "6. Filter by High GPA" << endl;
    cout << "7. Show Total Count" << endl;
    cout << "8. Search by Department" << endl;
    cout << "9. Clear Database" << endl;
    cout << "10. Calculate Average GPA" << endl;
    cout << "11. Update Student GPA" << endl;
    cout << "12. Change Student Department" << endl;
    cout << "13. View Student Email" << endl;
    cout << "14. View Student Age" << endl;
    cout << "15. Search by Name" << endl;
    cout << "16. Filter by Low GPA" << endl;
    cout << "17. Check if Database is Full" << endl;
    cout << "18. Check if Database is Empty" << endl;
    cout << "19. Reset ID System" << endl;
    cout << "20. System Credits" << endl;
    cout << "0. Exit" << endl;
    cout << "Enter your choice: ";
}

int main() {
    int choice;
    
    while (true) {
        showMenu();
        cin >> choice;

        if (choice == 0) {
            cout << "Exiting program..." << endl;
            break;
        }

        switch (choice) {
            case 1:
                if (currentCount < MAX_STUDENTS) {
                    cout << "Enter ID: "; cin >> database[currentCount].id;
                    cin.ignore();
                    cout << "Enter Name: "; getline(cin, database[currentCount].name);
                    cout << "Enter Dept: "; getline(cin, database[currentCount].department);
                    cout << "Enter GPA: "; cin >> database[currentCount].gpa;
                    currentCount++;
                    cout << "Added successfully!" << endl;
                }
                break;

            case 2:
                for (int i = 0; i < currentCount; i++) {
                    cout << "ID: " << database[i].id << " | Name: " << database[i].name << endl;
                }
                break;

            case 3:
                {
                    int sId;
                    cout << "Search ID: "; cin >> sId;
                    for (int i = 0; i < currentCount; i++) {
                        if (database[i].id == sId) cout << "Found: " << database[i].name << endl;
                    }
                }
                break;

            case 7:
                cout << "Total Students: " << currentCount << endl;
                break;

            case 9:
                currentCount = 0;
                cout << "Database Cleared." << endl;
                break;

            case 20:
                cout << "Student Management System v1.0" << endl;
                break;

            default:
                cout << "Feature under development or invalid choice." << endl;
                break;
        }
    }
    return 0;
}`,
    stdin: "1\n101\nMuhammad Mahran\nComputer Science\n3.85\n1\n102\nAlice Jenkins\nSoftware Engineering\n3.92\n2\n3\n101\n7\n20\n0"
  },
  {
    name: "User Input (cin)",
    description: "Read sequential strings, and numbers from stdin.",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string fullName;
    int age;
    float currentBalance;

    cout << "--- Professional Database Capture ---" << endl;
    cout << "Please enter your age: ";
    cin >> age;

    cout << "Please enter your initial balance: $";
    cin >> currentBalance;

    // Notice we clear buffer or read nicely
    cout << "\\nProcessing user metadata..." << endl;
    cout << "SUCCESS! Verified Member." << endl;
    cout << "Age: " << age << " years old." << endl;
    cout << "Simulated Balance: $" << currentBalance * 1.05 << " (accumulated 5% interest)" << endl;

    return 0;
}`,
    stdin: "21 5000.5"
  },
  {
    name: "Encapsulation (BankAccount)",
    description: "Defensive OOP protecting balance modification using getters and setters.",
    code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;

public:
    BankAccount(string name, double initialBalance) {
        owner = name;
        if (initialBalance >= 0) {
            balance = initialBalance;
        } else {
            balance = 0;
            cout << "Warning: Initial balance cannot be negative. Set to 0." << endl;
        }
    }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited: $" << amount << endl;
        } else {
            cout << "Error: Deposit must be positive!" << endl;
        }
    }

    double getBalance() {
        return balance;
    }
};

int main() {
    cout << "=== Implementing Encapsulation ===" << endl;
    BankAccount account("Muhammad Mahran", -500.0); // Triggers warning
    
    BankAccount safeAccount("Student", 250.0);
    safeAccount.deposit(120.0);
    safeAccount.deposit(-50); // Triggers error
    
    cout << "Final balance: $" << safeAccount.getBalance() << endl;
    return 0;
}`,
    stdin: ""
  },
  {
    name: "Pass-by-Reference (&)",
    description: "Modifying variables directly inside a separate function.",
    code: `#include <iostream>
using namespace std;

void swapByReference(int &x, int &y) {
    int temp = x;
    x = y;
    y = temp;
}

int main() {
    int a = 45;
    int b = 99;
    cout << "Before swap: a = " << a << ", b = " << b << endl;
    
    swapByReference(a, b);
    
    cout << "After swap: a = " << a << ", b = " << b << endl;
    return 0;
}`,
    stdin: ""
  },
  {
    name: "Segment Fault (Dangerous)",
    description: "Simulating hardware fault when accessing array beyond limits.",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Attempting to access out of bounds index memory..." << endl;
    int numbers[3] = {10, 20, 30};
    
    // G++ will throw segmentation fault when accessing dangerous offsets
    cout << "Accessing index 104523: " << numbers[104523] << endl;
    return 0;
}`,
    stdin: "",
    isDangerous: true
  },
  {
    name: "Division by Zero (Dangerous)",
    description: "Fails instantly with hardware exception signal.",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Starting system telemetry..." << endl;
    int top = 50;
    int bottom = 0;
    
    // Attempting division with zero yields immediate runtime termination
    int result = top / bottom;
    cout << "Result: " << result << endl;
    return 0;
}`,
    stdin: "",
    isDangerous: true
  },
  {
    name: "Vector Out of Range (Dangerous)",
    description: "Simulating safe STL out_of_range runtime exception.",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "Instantiating STL element store..." << endl;
    vector<int> numbers = {10, 20, 30};
    
    // Using vectors bound checks
    cout << "Vector value: " << numbers.at(5) << endl; 
    return 0;
}`,
    stdin: "",
    isDangerous: true
  }
];

export default function Playground() {
  const [code, setCode] = useState(PLAYGROUND_TEMPLATES[0].code);
  const [loading, setLoading] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("");
  const [status, setStatus] = useState<"SUCCESS" | "COMPILATION_FAILED" | "RUNTIME_CRASH" | "IDLE" | "SUSPENDED">("IDLE");
  const [exitCode, setExitCode] = useState("0");
  const [diagnostics, setDiagnostics] = useState("");
  const [errorDetails, setErrorDetails] = useState("");

  // Live Interactive Stream state
  const [accumulatedInputs, setAccumulatedInputs] = useState<string[]>([]);
  const [currentInputLine, setCurrentInputLine] = useState("");
  const [isProgramSuspended, setIsProgramSuspended] = useState(false);

  const terminalInputRef = React.useRef<HTMLInputElement>(null);
  const consoleEndRef = React.useRef<HTMLDivElement>(null);

  const focusTerminalInput = () => {
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalOutput, isProgramSuspended, loading]);

  const handleRun = async (currentCode = code, inputsList: string[] = []) => {
    setLoading(true);
    setStatus("IDLE");
    setDiagnostics("");
    setErrorDetails("");

    if (inputsList.length === 0) {
      setTerminalOutput("");
      setAccumulatedInputs([]);
      setIsProgramSuspended(false);
    }

    try {
      const interpreter = new CppInterpreter();
      const result = await interpreter.execute(
        currentCode,
        inputsList,
        (currentBuffer) => {
          setTerminalOutput(currentBuffer);
        },
        (suspendedState) => {
          setIsProgramSuspended(suspendedState);
        }
      );

      setStatus(result.status);
      setExitCode(result.exitCode);
      setDiagnostics(result.diagnostics);

      if (result.status === "SUSPENDED") {
        setIsProgramSuspended(true);
      } else {
        setIsProgramSuspended(false);
      }

    } catch (err: any) {
      console.error(err);
      setStatus("COMPILATION_FAILED");
      setErrorDetails(err.message || "Something went wrong during simulation.");
      setDiagnostics(`Internal Error: Failed to complete simulation execution.\n${err.message || ""}`);
    } finally {
      setLoading(false);
      // Auto focus the input after rendering the suspension point
      setTimeout(() => {
        focusTerminalInput();
      }, 80);
    }
  };

  useEffect(() => {
    const override = localStorage.getItem('playground_override');
    if (override) {
      try {
        const parsed = JSON.parse(override);
        if (parsed.code) {
          setCode(parsed.code);
          setTerminalOutput("");
          setStatus("IDLE");
          setExitCode("0");
          setDiagnostics("");
          setErrorDetails("");
          setAccumulatedInputs([]);
          setCurrentInputLine("");
          setIsProgramSuspended(false);
          
          if (parsed.stdin !== undefined) {
            const list = parsed.stdin ? parsed.stdin.split("\n") : [];
            setAccumulatedInputs(list);
            handleRun(parsed.code, list);
          } else {
            handleRun(parsed.code, []);
          }
        }
      } catch (e) {
        console.error("Failed to parse playground_override", e);
      }
      localStorage.removeItem('playground_override');
    }
  }, []);

  const loadTemplate = (tpl: CodeTemplate) => {
    setCode(tpl.code);
    setTerminalOutput("");
    setStatus("IDLE");
    setExitCode("0");
    setDiagnostics("");
    setErrorDetails("");
    setAccumulatedInputs([]);
    setCurrentInputLine("");
    setIsProgramSuspended(false);
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (loading) return;

      const trimmedValue = currentInputLine;
      setCurrentInputLine("");

      // Immediately append the typed value to the local output buffer for instant visual echo
      setTerminalOutput(prev => prev + trimmedValue + "\n");

      // Save to client context and re-submit running state
      const updatedList = [...accumulatedInputs, trimmedValue];
      setAccumulatedInputs(updatedList);
      
      handleRun(code, updatedList);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 flex flex-col gap-6 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Terminal size={18} />
            <span className="font-bold uppercase tracking-widest text-xs">Simulated Sandbox</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100 dark:text-white tracking-tight">C++ Interactive Compiler</h1>
          <p className="text-slate-400 text-sm mt-1">
            Accepts raw program designs. Prompts and handles input interactively downstream <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">cin &gt;&gt;</code> directly inside the terminal console like Programiz.
          </p>
        </div>

        {/* Compile trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => loadTemplate(PLAYGROUND_TEMPLATES[0])}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-350 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border border-slate-700"
          >
            <RotateCcw size={16} />
            Reset Initial
          </button>
          
          <button
            onClick={() => handleRun(code, [])}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white shadow-lg shadow-blue-600/30 px-6 py-2.5 rounded-xl font-bold text-sm transition-all animate-none"
          >
            {loading && accumulatedInputs.length === 0 ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Compiling...
              </>
            ) : (
              <>
                <Play size={16} className="fill-current" />
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset templates selector bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2.5">Load Playground Template Presets:</span>
        <div className="flex flex-wrap gap-2">
          {PLAYGROUND_TEMPLATES.map((tpl, i) => (
            <button
              key={i}
              onClick={() => loadTemplate(tpl)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                tpl.isDangerous
                  ? "bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 border-rose-900"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
              }`}
            >
              <FileCode size={13} />
              <div className="text-left">
                <span className="font-bold">{tpl.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main split workarea */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Editorial Code Area */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden min-h-[500px]">
          <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold ml-2">main.cpp</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Modern G++ Compiler</span>
          </div>

          <div className="flex-1 font-mono text-sm overflow-auto p-2 bg-slate-905">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => Prism.highlight(code, Prism.languages.cpp, 'cpp')}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "JetBrains Mono", "SF Mono", monospace',
                fontSize: window.innerWidth < 768 ? 12 : 14,
                backgroundColor: 'transparent',
                outline: 'none',
              }}
              className="min-h-[450px]"
            />
          </div>
        </div>

        {/* Right Side: Inputs / Terminals / compiler statuses */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Active Terminal Instructions panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 shrink-0">
                <Info size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">How Interactive Input Works:</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  As the simulation runs, if the engine hits <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-[10px] text-emerald-400">cin &gt;&gt;</code>, it pauses and waits. A green blinking cursor will invite you to type directly inside the Terminal below. Enter your response and press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] border border-slate-700 text-slate-300">Enter</kbd> to proceed seamlessly.
                </p>
              </div>
            </div>
          </div>

          {/* Virtual Terminal Console Output */}
          <div className="flex-grow bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col min-h-[350px]">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1.5">
                <Terminal size={14} className="text-slate-400" /> Interactive Terminal
              </span>
              
               {/* Pill status */}
              {status !== "IDLE" && (
                <div className={`px-2.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                  status === "SUCCESS"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : status === "COMPILATION_FAILED"
                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    : status === "SUSPENDED"
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}>
                  {status === "SUCCESS" && <CheckCircle size={10} />}
                  {status === "COMPILATION_FAILED" && <XCircle size={10} />}
                  {status === "RUNTIME_CRASH" && <AlertTriangle size={10} />}
                  {status === "SUSPENDED" && <Terminal size={10} className="animate-pulse" />}
                  {status === "SUSPENDED" ? "AWAITING INPUT" : status}
                </div>
              )}
            </div>

            {/* Output screen */}
            <div 
              onClick={focusTerminalInput}
              className="flex-1 p-4 font-mono text-xs overflow-auto text-slate-200 leading-relaxed min-h-[220px] bg-slate-950 cursor-text select-text relative"
            >
              {loading && accumulatedInputs.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-500 gap-2 font-sans py-12">
                  <span className="inline-block animate-pulse">Compiling source code in sandbox environment...</span>
                </div>
              ) : terminalOutput ? (
                <div className="whitespace-pre-wrap font-mono break-all text-slate-200">
                  {terminalOutput}
                  
                  {/* Inline interactive input field */}
                  {isProgramSuspended && (
                    <span className="inline-flex items-center ml-1">
                      <input
                        id="interactive-terminal-input"
                        ref={terminalInputRef}
                        type="text"
                        value={currentInputLine}
                        onChange={(e) => setCurrentInputLine(e.target.value)}
                        onKeyDown={handleTerminalKeyDown}
                        disabled={loading}
                        className="bg-transparent text-emerald-400 font-mono text-xs outline-none border-0 p-0 m-0 caret-emerald-400 focus:ring-0 w-36"
                        autoFocus
                        placeholder="Type input & enter"
                      />
                      {loading && (
                        <span className="text-slate-500 text-[10px] ml-2 animate-pulse">(computing next frame...)</span>
                      )}
                    </span>
                  )}
                </div>
              ) : status === "COMPILATION_FAILED" ? (
                <div className="text-rose-400 italic">No output produced due to compiler failure (check logs below).</div>
              ) : (
                <div className="text-slate-600 italic">Terminal is idle. Click 'Run Code' above to compile and view stdout.</div>
              )}
              <div ref={consoleEndRef} />
            </div>
            
            {/* Exit statistics tray */}
            <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Exit Code: <span className={exitCode === "0" ? "text-emerald-400" : "text-rose-400"}>{exitCode}</span></span>
              <span>Process: {loading ? "running" : status !== "IDLE" ? "terminated" : "ready"}</span>
            </div>
          </div>

          {/* Compiler Diagnostics Diagnostics Panel */}
          {(status === "COMPILATION_FAILED" || status === "RUNTIME_CRASH" || (status !== "SUSPENDED" && diagnostics)) && (
            <div className={`rounded-2xl border p-4 shadow-sm ${
              status === "COMPILATION_FAILED"
                ? "bg-rose-950/20 border-rose-900 text-rose-200"
                : status === "RUNTIME_CRASH"
                ? "bg-amber-950/20 border-amber-900 text-amber-200"
                : "bg-slate-900 border-slate-800 text-slate-300"
            }`}>
              <span className="text-xs font-bold flex items-center gap-1.5 uppercase tracking-widest block mb-2">
                {status === "COMPILATION_FAILED" ? (
                  <XCircle size={14} className="text-rose-500" />
                ) : status === "RUNTIME_CRASH" ? (
                  <AlertTriangle size={14} className="text-amber-500" />
                ) : (
                  <Info size={14} className="text-slate-400" />
                )}
                Compiler Diagnostics (Logs)
              </span>
              <pre className="font-mono text-xs whitespace-pre-wrap bg-black/30 p-3 rounded-lg overflow-x-auto max-h-48">
                {diagnostics || errorDetails}
              </pre>
            </div>
          )}

        </div>
      </div>
      
    </div>
  );
}
