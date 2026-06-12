export interface ExamQuestion {
  id: string;
  type: 'definition' | 'mcq' | 'true-false' | 'program' | 'diagram' | 'math' | 'class' | 'error-fix';
  points: number;
  title: string;
  questionText: string;
  options?: string[];
  correctAnswer?: number | boolean | string; // index for mcq, boolean for true-false
  hint: string;
  solution: string;
  previewCode?: string;
  defaultStdin?: string;
}

export interface Exam {
  id: string;
  year: string;
  semester: string;
  course: string;
  duration: string;
  professor: string;
  questions: ExamQuestion[];
}

export const EXAMS_DATA: Exam[] = [
  {
    id: "2025-2026-fall",
    year: "2025-2026",
    semester: "Fall",
    course: "Program Design and Computer Languages (CMP n010)",
    duration: "2 hours",
    professor: "Dr. Ehab Elshimy & Dr. Asim Badr Eldin",
    questions: [
      {
        id: "25-26-q1-1",
        type: "definition",
        points: 4,
        title: "Question 1.1: OOP Main Features",
        questionText: "Explain the main features of Object-Oriented Programming (OOP).",
        hint: "Think about the four pillars of OOP: encapsulation, inheritance, polymorphism, and abstraction.",
        solution: "The four primary characteristics (pillars) of Object-Oriented Programming (OOP) are:\n\n1. **Encapsulation**:\n   The process of bundling data (attributes) and the functions (methods) that operate on that data into a single unit (a class), while restricting direct access to some of the object's components (using private access specifiers) to protect data integrity.\n\n2. **Inheritance**:\n   A mechanism that allows a new class (derived/child class) to inherit attributes and methods from an existing class (base/parent class). This promotes code reusability and builds a hierarchical relationship.\n\n3. **Polymorphism**:\n   The ability of different classes to respond to the same message (function call) in different ways. In C++, this is implemented through function overloading (compile-time) and virtual functions/overriding (runtime).\n\n4. **Abstraction**:\n   Hiding complex internal implementation details and showing only the essential features of an object. This reduces complexity and allows developers to interact with cleaner interfaces."
      },
      {
        id: "25-26-q1-2",
        type: "definition",
        points: 3,
        title: "Question 1.2: Types of Inheritance",
        questionText: "Explain the types of inheritance in OOP.",
        hint: "Recall how subclasses can relate to parent classes. Think of simple, multi-level, multiple, hierarchical, and hybrid relations.",
        solution: "In OOP and C++, the types of inheritance include:\n\n1. **Single Inheritance**:\n   A derived class inherits from exactly **one** base class.\n   *Example*: Class `B` inherits from Class `A`.\n\n2. **Multilevel Inheritance**:\n   A derived class inherits from another derived class, forming a chain of inheritance.\n   *Example*: Class `C` inherits from Class `B`, which inherits from Class `A`.\n\n3. **Multiple Inheritance**:\n   A derived class inherits from **more than one** base class simultaneously.\n   *Example*: Class `C` inherits from both Class `A` and Class `B`.\n\n4. **Hierarchical Inheritance**:\n   Multiple derived classes inherit from a **single** shared base class.\n   *Example*: Class `B` and Class `C` both inherit from Class `A`.\n\n5. **Hybrid (Virtual) Inheritance**:\n   A combination of two or more types of inheritance. It often leads to the diamond problem (e.g., Class `D` inherits from Class `B` and Class `C`, which both inherit from Class `A`), which is resolved in C++ using `virtual` base classes."
      },
      {
        id: "25-26-q1-3",
        type: "math",
        points: 2,
        title: "Question 1.3: Number Systems to Decimal",
        questionText: "Convert the following numbers to decimal numbers:\n1. $(10010101)_2$\n2. $(156)_8$",
        hint: "Use positional values (weights) in base 2 ($2^n$) and base 8 ($8^n$).",
        solution: "### 1. Convert $(10010101)_2$ to Decimal\nUsing weights of base 2:\n$$\n\\begin{aligned}\n(10010101)_2 &= 1 \\cdot 2^7 + 0 \\cdot 2^6 + 0 \\cdot 2^5 + 1 \\cdot 2^4 + 0 \\cdot 2^3 + 1 \\cdot 2^2 + 0 \\cdot 2^1 + 1 \\cdot 2^0 \\\\\n&= 128 + 0 + 0 + 16 + 0 + 4 + 0 + 1 \\\\\n&= \\mathbf{149}_{10}\n\\end{aligned}\n$$\n\n### 2. Convert $(156)_8$ to Decimal\nUsing weights of base 8:\n$$\n\\begin{aligned}\n(156)_8 &= 1 \\cdot 8^2 + 5 \\cdot 8^1 + 6 \\cdot 8^0 \\\\\n&= 64 + 40 + 6 \\\\\n&= \\mathbf{110}_{10}\n\\end{aligned}\n$$"
      },
      {
        id: "25-26-q1-4",
        type: "math",
        points: 1,
        title: "Question 1.4: Decimal to Binary",
        questionText: "Convert the following decimal number to binary:\n- $(964)_{10}$",
        hint: "Successively divide the number by 2 and write down the remainders from bottom to top.",
        solution: "### Convert $(964)_{10}$ to Binary\n\nDivide by 2 repeatedly and record remainders:\n- $964 \\div 2 = 482$ with remainder **0**\n- $482 \\div 2 = 241$ with remainder **0**\n- $241 \\div 2 = 120$ with remainder **1**\n- $120 \\div 2 = 60$ with remainder **0**\n- $60 \\div 2 = 30$ with remainder **0**\n- $30 \\div 2 = 15$ with remainder **0**\n- $15 \\div 2 = 7$ with remainder **1**\n- $7 \\div 2 = 3$ with remainder **1**\n- $3 \\div 2 = 1$ with remainder **1**\n- $1 \\div 2 = 0$ with remainder **1**\n\nReading the remainders from bottom to top (MSB to LSB):\n$$\n(964)_{10} = \\mathbf{(1111000100)_2}\n$$\n\n**Verification**:\n$512 + 256 + 128 + 64 + 4 = 964_{10}$."
      },
      {
        id: "25-26-q2-1",
        type: "true-false",
        points: 1,
        title: "Question 2.1: Struct Private Scope",
        questionText: "In some cases, private elements are declared in a structure.",
        options: ["True", "False"],
        correctAnswer: true,
        hint: "In C++, a struct is identical to a class except for default access level specifiers. Can you manually specify private elements?",
        solution: "**TRUE**. In C++, a `struct` is structurally identical to a `class` except that its members default to `public` visibility. However, you can explicitly use the `private:` keyword inside a `struct` to declare private members, restricting direct access from outside."
      },
      {
        id: "25-26-q2-2",
        type: "true-false",
        points: 1,
        title: "Question 2.2: Break Statement",
        questionText: "We use a break statement to exit from a block.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "Think about where 'break' is valid inside C++. Can you call it inside a standard local brace scope?",
        solution: "**FALSE**. In C++, the `break` statement can only be used to exit from loops (`for`, `while`, `do-while`) or from a `switch` selection block. It cannot be used to exit from an ordinary block of code `{ ... }` that is not a loop or switch."
      },
      {
        id: "25-26-q2-3",
        type: "true-false",
        points: 1,
        title: "Question 2.3: Switch Statement Expressions",
        questionText: "The expression used in the switch statement may be a reference variable.",
        options: ["True", "False"],
        correctAnswer: true,
        hint: "A switch expression must evaluate to an integral or enum type. If a reference references an int, does it work?",
        solution: "**TRUE**. The expression within a `switch` statement in C++ must evaluate to an integral or enumeration type. A reference variable that refers to an integer or character type is fully allowed because the compiler automatically dereferences it to fetch its underlying value."
      },
      {
        id: "25-26-q2-4",
        type: "true-false",
        points: 1,
        title: "Question 2.4: Memory Block Pointers",
        questionText: "A pointer to a block of memory is effectively same as an array.",
        options: ["True", "False"],
        correctAnswer: true,
        hint: "An array name acts as a constant pointer to the first element. Both can be indexed using the bracket symbol `[]`.",
        solution: "**TRUE**. An array name decay-converts into a constant pointer pointing to the memory address of its first element. In C++, a pointer pointing to a contiguous block of memory can be indexed exactly like an array using bracket notation (e.g., `ptr[i]` is identical to `*(ptr + i)`)."
      },
      {
        id: "25-26-q2-5",
        type: "true-false",
        points: 1,
        title: "Question 2.5: Pre-increment Mechanics",
        questionText: "`y = ++x` means that we increase x by 1 after assign as value to y.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "Is `++x` a pre-increment or post-increment? Pre-increment means increment *before* assignment.",
        solution: "**FALSE**. `++x` is a **pre-increment** operator. It increases the value of `x` by 1 **before** assigning its value to `y`. The statement that increases `x` *after* assigning is the post-increment operator: `y = x++`."
      },
      {
        id: "25-26-q2-6",
        type: "true-false",
        points: 1,
        title: "Question 2.6: Local Variable Lifetime",
        questionText: "The scope and its life time of the variable declared in the user defined function in this function only.",
        options: ["True", "False"],
        correctAnswer: true,
        hint: "Think about local variables and automatic storage duration inside C++ functions.",
        solution: "**TRUE**. Variables declared within a user-defined function are local variables. They have **local block scope** (only visible inside that function) and **automatic lifetime** (they are created on the stack when the function is called and destroyed automatically when the function returns)."
      },
      {
        id: "25-26-q2-7",
        type: "true-false",
        points: 1,
        title: "Question 2.7: Struct Declaration vs Instance",
        questionText: "When the structure is declared it will allocate memory.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "By declaring a structure, you are defining a new data blueprint. Is any physical memory allocated yet?",
        solution: "**FALSE**. Declaring a structure simply defines a new data type or blueprint for the compiler; it does **not** allocate any physical memory. Memory is only allocated when you instantiate a variable of that structure type (e.g., `Item myItem;`)."
      },
      {
        id: "25-26-q2-8",
        type: "true-false",
        points: 1,
        title: "Question 2.8: Reference Aliasing",
        questionText: "The reference variable in C++ language provides alternate name for the variable.",
        options: ["True", "False"],
        correctAnswer: true,
        hint: "What is the definition of a reference in C++?",
        solution: "**TRUE**. In C++, a reference variable acts as a direct **alias (alternate name)** for an already existing variable, allowing you to access or modify the same underlying storage location through multiple names."
      },
      {
        id: "25-26-q2-9",
        type: "true-false",
        points: 1,
        title: "Question 2.9: Volatile Storage vs Hard Disk",
        questionText: "Hard Disk is a temporary (volatile) memory, which needs Electricity to preserve data.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "Which storage retains data after powering down? Hard drive or RAM?",
        solution: "**FALSE**. The hard disk drive (or SSD) is a **non-volatile (permanent)** secondary storage medium that retains its data even after the power is unplugged. The RAM (Random Access Memory) is the volatile memory that requires electricity to preserve data."
      },
      {
        id: "25-26-q2-10",
        type: "true-false",
        points: 1,
        title: "Question 2.10: Function Signatures",
        questionText: "The function's signature is its name and parameters.",
        options: ["True", "False"],
        correctAnswer: true,
        hint: "A compiler uses signature matching for overload resolution. Does it include the return type?",
        solution: "**TRUE**. In C++, a function's signature consists of its **name** and its **parameter list** (the order, types, and number of its arguments). The return type is **not** part of the signature and cannot be used alone to overload functions."
      },
      {
        id: "25-26-q3-a",
        type: "program",
        points: 3,
        title: "Question 3a: Call by Reference Swap Function",
        questionText: "Write a C++ function named `Swap` having two parameters to swap the entered parameter values. **'Using call by reference'**.",
        hint: "Pass parameters by reference using the ampersand `&` symbol. This allows direct modifications to the caller's arguments.",
        solution: "### Swap Function in C++ (Call by Reference)\n\nPassing by reference requires appending an ampersand (`&`) to the parameter types. This tells the compiler to pass the actual variable's memory address rather than a copy of its value.\n\nHere is the full solution code with a demonstration driver inside the main method:",
        defaultStdin: "",
        previewCode: `#include <iostream>
using namespace std;

// Swap function using call-by-reference
void Swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
    cout << "[Inside Swap()]: Swapped parameters!" << endl;
}

int main() {
    int first = 42;
    int second = 99;
    
    cout << "=== Testing Reference Swap ===" << endl;
    cout << "Before swap: first = " << first << ", second = " << second << endl;
    
    // Call Swap - the ampersand references pass the original variables directly
    Swap(first, second);
    
    cout << "After swap:  first = " << first << ", second = " << second << endl;
    return 0;
}`
      },
      {
        id: "25-26-q3-b",
        type: "class",
        points: 7,
        title: "Question 3b: Point Class OOP Design",
        questionText: "Design a class named `Point` to represent a Point. The class contains:\n- Two integer data fields named `X` and `Y` that specify the point coordinates (**not allowed to be negative values**). The default value is `0` for both.\n- A method `move` that sets coordinates.\n- A method `print` that prints the point coordinates.",
        hint: "Use private access specifiers for coordinates `X` and `Y`. Put validation inside the constructor and the `move` method to enforce non-negative values.",
        solution: "### Point Class Object-Oriented Design\n\nTo prevent coordinates $X$ and $Y$ from being assigned negative values, we follow encapsulation principles by keeping them `private` and performing inspection/validation guard checks inside the initializer/constructor and the `move` modifier method.\n\nHere is the full modular class design, ready to execute:",
        defaultStdin: "",
        previewCode: `#include <iostream>
using namespace std;

class Point {
private:
    int X; // private attribute
    int Y; // private attribute

public:
    // Default constructor (sets default values to 0)
    Point() {
        X = 0;
        Y = 0;
    }

    // Method to set coordinates with negative check shielding
    void move(int newX, int newY) {
        if (newX >= 0) {
            X = newX;
        } else {
            cout << "[Error Alert] X coordinate " << newX << " is negative! Rebuffed. X stays: " << X << endl;
        }

        if (newY >= 0) {
            Y = newY;
        } else {
            cout << "[Error Alert] Y coordinate " << newY << " is negative! Rebuffed. Y stays: " << Y << endl;
        }
    }

    // Method to print the current point coordinates
    void print() {
        cout << "Point Coordinates: (" << X << ", " << Y << ")" << endl;
    }
};

int main() {
    cout << "=== Demanding Point Constructors ===" << endl;
    Point p1;
    p1.print(); // Displays (0,0)

    cout << "\n=== Moving to valid coordinates (12, 85) ===" << endl;
    p1.move(12, 85);
    p1.print(); // Displays (12,85)

    cout << "\n=== Trap: Moving to illegal negative coordinates (-5, 90) ===" << endl;
    p1.move(-5, 90);
    p1.print(); // Displays (12,90) because translation to X=-5 was safely blocked!

    return 0;
}`
      },
      {
        id: "25-26-q4",
        type: "program",
        points: 10,
        title: "Question 4: Tabular Inventory Database Management System",
        questionText: "Write a C++ program that accepts 10 items. Each item contains the following:\n- `item code` (int)\n- `item name` which includes: `name` and `altName` (struct Nested NameInfo)\n- `item price` (double)\n- `item quantity` (int)\n\nThe program displays the following menu:\n- Press (1) to fill data items.\n- Press (2) to display the price of a certain item with its name or alternative name.\n- Press (3) to display the quantity of an item with its code.\n- Press (4) to display all item data in tabular form.\n- Press (5) to exit.\n\nThen it extracts the user choice and displays its selection. This procedure will repeat until menu item number (5) is chosen.",
        hint: "Use nested structures. Create a struct `NameInfo` representing the name components, and then nest it in an `Item` struct. Use an array of 10 items to persist database entries in memory.",
        solution: "### Hierarchical Item Management System\n\nThis C++ program leverages nested structs, array of objects/structs, string matching operations, a persistent interactive menu `do-while` loop, and switch-case selection controls. To allow fast execution inside our compiler sandbox, you can feed a sample sequence list to the standard inputs.",
        defaultStdin: "1\n101 Apple Golden_Apple 1.99 50\n102 Banana Yellow_Banana 0.99 120\n103 Orange Clementine 1.50 75\n104 Pear Green_Pear 2.50 30\n105 Mango Alphonso 3.99 40\n106 Strawberry Red_Berry 4.50 60\n107 Grape Purple_Grape 2.00 80\n108 Peach Sweet_Peach 2.80 45\n109 Pineapple Ananas 3.50 25\n110 Watermelon Melon 5.00 15\n2\nClementine\n3\n107\n4\n5",
        previewCode: `#include <iostream>
using namespace std;

// Nesting: Structure for the descriptive double names
struct NameInfo {
    string name;
    string altName;
};

// Primary structure representing the complex item details
struct Item {
    int code;
    NameInfo itemName; // nested struct
    double price;
    int quantity;
};

const int MAX_ITEMS = 10;

int main() {
    Item inventory[MAX_ITEMS];
    bool isFilled = false;
    int choice;

    do {
        cout << "\\n=========================================" << endl;
        cout << "      MODERN ACADEMY CRAMMER INVENTORY   " << endl;
        cout << "=========================================" << endl;
        cout << "Press (1) to fill data items." << endl;
        cout << "Press (2) to display price of a certain item (by Name/AltName)." << endl;
        cout << "Press (3) to display quantity of certain item (by Code)." << endl;
        cout << "Press (4) to display all item data in tabular form." << endl;
        cout << "Press (5) to exit." << endl;
        cout << "Enter your choice (1-5): ";
        
        if (!(cin >> choice)) {
            // Handle infinite invalid inputs safely
            cin.clear();
            string discard;
            cin >> discard;
            cout << "[Error] Invalid raw option choice!" << endl;
            continue;
        }

        switch (choice) {
            case 1: {
                cout << "\\n--- Filling Inventory for " << MAX_ITEMS << " Items ---" << endl;
                for (int i = 0; i < MAX_ITEMS; i++) {
                    cout << "Item #" << (i + 1) << " Details:" << endl;
                    cout << "   Enter Code: ";
                    cin >> inventory[i].code;
                    cout << "   Enter Name (no spaces): ";
                    cin >> inventory[i].itemName.name;
                    cout << "   Enter Alternative Name (no spaces): ";
                    cin >> inventory[i].itemName.altName;
                    cout << "   Enter Price: $";
                    cin >> inventory[i].price;
                    cout << "   Enter Quantity: ";
                    cin >> inventory[i].quantity;
                }
                isFilled = true;
                cout << "\\n[Success] Inventory populated successfully!" << endl;
                break;
            }
            case 2: {
                if (!isFilled) {
                    cout << "[Notification] Inventory is empty! Please populate first (Option 1)." << endl;
                    break;
                }
                string searchName;
                cout << "\\nEnter target Name or Alternative Name to search price: ";
                cin >> searchName;
                
                bool found = false;
                for (int i = 0; i < MAX_ITEMS; i++) {
                    if (inventory[i].itemName.name == searchName || inventory[i].itemName.altName == searchName) {
                        cout << "-> MATCH FOUND! Item '" << inventory[i].itemName.name 
                             << "' / '" << inventory[i].itemName.altName 
                             << "' Price: $" << inventory[i].price << endl;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    cout << "[Error] Item '" << searchName << "' not found in database!" << endl;
                }
                break;
            }
            case 3: {
                if (!isFilled) {
                    cout << "[Notification] Inventory is empty! Please populate first (Option 1)." << endl;
                    break;
                }
                int searchCode;
                cout << "\\nEnter item code to search Quantity: ";
                cin >> searchCode;
                
                bool found = false;
                for (int i = 0; i < MAX_ITEMS; i++) {
                    if (inventory[i].code == searchCode) {
                        cout << "-> MATCH FOUND! Item code " << searchCode 
                             << " ('" << inventory[i].itemName.name << "') Quantity: " 
                             << inventory[i].quantity << " units" << endl;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    cout << "[Error] Item code " << searchCode << " not found!" << endl;
                }
                break;
            }
            case 4: {
                if (!isFilled) {
                    cout << "[Notification] Inventory is empty! Please populate first (Option 1)." << endl;
                    break;
                }
                cout << "\\n=================================================================" << endl;
                cout << " CODE   | NAME             | ALT NAME         | PRICE   | QUANTITY" << endl;
                cout << "=================================================================" << endl;
                for (int i = 0; i < MAX_ITEMS; i++) {
                    // Simple simulated neat margins layout
                    cout << " " << inventory[i].code << "\t| "
                         << inventory[i].itemName.name << "\t\t| "
                         << inventory[i].itemName.altName << "\t\t| $"
                         << inventory[i].price << "\t| "
                         << inventory[i].quantity << endl;
                }
                cout << "=================================================================" << endl;
                break;
            }
            case 5: {
                cout << "\\nExiting CMP n010 Inventory. Study hard for final exams!" << endl;
                break;
            }
            default: {
                cout << "[Error] Choice out of bounds (1-5 only). Try again." << endl;
            }
        }
    } while (choice != 5);

    return 0;
}`
      }
    ]
  },
  {
    id: "2022-2023-fall",
    year: "2022-2023",
    semester: "Fall",
    course: "Program Design and Computer Languages (CMP n010)",
    duration: "2 hours",
    professor: "Dr. Ehab Elshimy & Dr. Khaled Morsy",
    questions: [
      {
        id: "22-23-q1-a",
        type: "definition",
        points: 2,
        title: "Question 1a: Core Definitions",
        questionText: "Define the following terms: (1) Variable, (2) ASCII code.",
        hint: "Remember: A variable is a named storage location in memory, and ASCII stands for American Standard Code for Information Interchange using a 7 or 8-bit mapping.",
        solution: "1. **Variable**: A named location in the computer's memory (RAM) used to store a value of a specific data type. The stored value can change during execution.\n2. **ASCII code**: (American Standard Code for Information Interchange) A standard numeric coding system that maps 128 characters (letters, digits, and symbols) to unique integer values from 0 to 127 for computerized text processing."
      },
      {
        id: "22-23-q1-b",
        type: "definition",
        points: 2,
        title: "Question 1b: Program Errors",
        questionText: "State the types of errors in computer programs.",
        hint: "There are three primary types of errors. Think about when they appear: write-time, run-time, or logic-time.",
        solution: "1. **Syntax Errors**: Grammatical violations of C++ rules (e.g., missing semicolons, mismatching parenthesis). Prevent compilation.\n2. **Logical Errors**: The program runs but produces incorrect outputs due to bad formulas or algorithm flows (e.g., dividing by incorrect value or infinite loops).\n3. **Design Errors**: Resulting from poor design/wrong algorithms by the programmer. Leads to wrong outputs or resource leaks."
      },
      {
        id: "22-23-q1-c",
        type: "definition",
        points: 2,
        title: "Question 1c: Subprograms",
        questionText: "Explain the types of subprograms and how C++ languages support them.",
        hint: "Subprograms in C++ are called functions. What does a value-returning function do vs a void function?",
        solution: "C++ supports subprograms as **Functions**. There are two types:\n1. **Value-Returning Functions**: Perform operations and return a final value to the caller using a `return` statement. Declared with a target type (e.g., `int`, `double`).\n2. **Void Functions (Procedures)**: Perform tasks but return no data. They have a `void` return type and do not require a value in the `return` statement."
      },
      {
        id: "22-23-q1-d",
        type: "diagram",
        points: 2,
        title: "Question 1d: Compilation Flowchart",
        questionText: "Illustrate using a block diagram the process of converting a program written in a high-level language into an executable file.",
        hint: "You start with your C++ SOURCE Code, go to the Compiler, get Object files, which are linked by the Linker, yielding the Executable (.exe).",
        solution: "```\n[Source Code (.cpp)] \n         │\n         ▼\n   [Compiler]  ◄─── (Finds Syntax Errors? Throws diagnostics)\n         │\n         ▼\n [Object Code (.obj)] \n         │\n         ▼\n    [Linker]   ◄─── (Adds Standard C++ Libraries)\n         │\n         ▼\n[Executable File (.exe)]\n```"
      },
      {
        id: "22-23-q1-e",
        type: "math",
        points: 2,
        title: "Question 1e: Number Conversions",
        questionText: "Convert the following numbers to decimal numbers and vice versa:\n1. (1011011)₂ to decimal\n2. (421)₄ to octal/decimal\n3. Show (621)₁₀ to binary.",
        hint: "Recall positional values. For (1011011)₂, calculate: 1*1 + 1*2 + 0*4 + 1*8 + 1*16 + 0*32 + 1*64.",
        solution: "1. **(1011011)₂ to Decimal**:\n   `1*2⁰ + 1*2¹ + 0*2² + 1*2³ + 1*2⁴ + 0*2⁵ + 1*2⁶`\n   `= 1 + 2 + 0 + 8 + 16 + 0 + 64 = 91₁₀`.\n\n2. **(421)₄ to Decimal**:\n   *(Note: Base 4 digits are 0,1,2,3. Standard (421)₄ is illegal in pure base-4 since '4' is not allowed! This is a typical professor trap. Assuming typo to represent base-8 or base-5, let's solve (421)₈ as 4*64 + 2*8 + 1 = 273₁₀, or solve base-4 assuming digit typo: (321)₄ = 3*16 + 2*4 + 1 = 57₁₀)*.\n\n3. **(621)₁₀ to Octal/Hex**:\n   `621 / 8 = 77 (rem 5)`\n   `77 / 8 = 9 (rem 5)`\n   `9 / 8 = 1 (rem 1)`\n   `1 / 8 = 0 (rem 1)`\n   `= (1155)₈`."
      },
      {
        id: "22-23-q2-1",
        type: "true-false",
        points: 1,
        title: "Question 2.1: Structures",
        questionText: "A structure should contain dissimilar elements.",
        options: ["True", "False"],
        correctAnswer: true,
        hint: "Structures combine different data types (e.g. string name, int age) into one entity. Unlike native arrays which must hold identical types.",
        solution: "**TRUE**. A structure (struct) in C++ is a user-defined collection designed to bundle dissimilar (different type) data elements, whereas an array stores similar elements."
      },
      {
        id: "22-23-q2-2",
        type: "true-false",
        points: 1,
        title: "Question 2.2: References",
        questionText: "The reference variable: location in memory containing the actual data.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "References do not have their own unique memory storage location with data; they are simply aliases to another existing variable's memory address.",
        solution: "**FALSE**. A reference variable does not contain the actual data in its own independent storage location; instead, it is an **alias (alternate name)** for an existing variable's memory location."
      },
      {
        id: "22-23-q2-3",
        type: "true-false",
        points: 1,
        title: "Question 2.3: Identifiers",
        questionText: "The valid identifier should start with a number but not include any special characters.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "Can identifiers start with a digit? Think about naming constraints like `1item` vs `item1`.",
        solution: "**FALSE**. An identifier **MUST NOT** start with a number. It can only start with a letter (a-z, A-Z) or an underscore (`_`), followed by letters, numbers, or underscores."
      },
      {
        id: "22-23-q2-4",
        type: "true-false",
        points: 1,
        title: "Question 2.4: Break vs Return",
        questionText: "We use a break statement to exit from a function.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "Does break exit a function? Or does it exit loops and switch statements? What exits a function?",
        solution: "**FALSE**. We use a `return` statement (or `exit()`) to exit a function. A `break` statement is only used to exit from loops (`for`, `while`, `do-while`) or a `switch` instruction block."
      },
      {
        id: "22-23-q2-5",
        type: "true-false",
        points: 1,
        title: "Question 2.5: Switch Datatypes",
        questionText: "We use a switch statement to switch on float values.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "Think about C++ restrictions: does 'switch' support floating-point values or strings?",
        solution: "**FALSE**. In C++, the switch expression **MUST** evaluate to an integer or character type. Floating-point values (`float`, `double`) are strictly illegal in switch statements."
      },
      {
        id: "22-23-q2-6",
        type: "true-false",
        points: 1,
        title: "Question 2.6: Array Sizes",
        questionText: "The user can change the length of any array in the run time.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "Static standard C++ array sizes are set at compile time. Can they automatically resize themselves later?",
        solution: "**FALSE**. Standard static arrays in C++ have a fixed constant size allocated at compile-time. Their length cannot be altered at runtime."
      },
      {
        id: "22-23-q2-7",
        type: "true-false",
        points: 1,
        title: "Question 2.7: Pointer and Arrays",
        questionText: "A pointer to a block of memory is effectively same as an array.",
        options: ["True", "False"],
        correctAnswer: true,
        hint: "An array's identifier acts as a pointer pointing at its first element, and pointers can be indexed using brackets `ptr[i]` just like arrays.",
        solution: "**TRUE**. In C++, an array name acts as a constant pointer to its first element, and you can access memory blocks using pointer arithmetic or indexing subscript notation `*(ptr + i)` or `ptr[i]` which is identical."
      },
      {
        id: "22-23-q2-8",
        type: "true-false",
        points: 1,
        title: "Question 2.8: Do-While Timing",
        questionText: "The 'do...while loop' repeats a statement or group of statements while a given condition is true. It tests the condition before executing the loop body.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "Does a 'do-while' loop run at least once? Or does it check condition at the top?",
        solution: "**FALSE**. The do-while loop is a post-test loop. It tests the conditional expression **after** executing the loop body, guaranteeing the body executes at least once."
      },
      {
        id: "22-23-q2-9",
        type: "true-false",
        points: 1,
        title: "Question 2.9: Post-Increment Trap",
        questionText: "y = x++ means that we first increase x by 1 then assign the new value of x into y.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "This is a post-increment (`x++`). It evaluates first, then increments. Pre-increment (`++x`) increments first.",
        solution: "**FALSE**. In `y = x++` (post-increment), the current value of `x` is assigned to `y` first, and *then* `x` is incremented by 1. For the proposed statement, the syntax should be `y = ++x;`."
      },
      {
        id: "22-23-q2-10",
        type: "true-false",
        points: 1,
        title: "Question 2.10: Variable Scope",
        questionText: "The scope of the variable declared in the user defined function is the whole program.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "Variables declared inside a function have local scope. Are they accessible in main or other functions?",
        solution: "**FALSE**. A variable declared within a function is a local variable. It has a local scope, restricted only to the body of that specific function."
      },
      {
        id: "22-23-q2-11",
        type: "true-false",
        points: 1,
        title: "Question 2.11: Struct Memory Layout",
        questionText: "When the structure is declared it will not allocate any memory.",
        options: ["True", "False"],
        correctAnswer: true,
        hint: "Declaring a struct simply defines a new data type template (like writing a blueprint). Does a blueprint allocate physical land before a house enters?",
        solution: "**TRUE**. Simply declaring or defining a structure type does not allocate memory on the stack or heap. Memory is only allocated when instances of that structure are compiled/instantiated."
      },
      {
        id: "22-23-q2-12",
        type: "true-false",
        points: 1,
        title: "Question 2.12: Reference Alias",
        questionText: "The reference provides alternate name for the variable.",
        options: ["True", "False"],
        correctAnswer: true,
        hint: "Think about reference attributes. Is it just an alias?",
        solution: "**TRUE**. A reference provides an alias or an alternate name for an existing variable, sharing the exact same memory coordinate."
      },
      {
        id: "22-23-q3-a",
        type: "program",
        points: 3,
        title: "Question 3a: Counting Successes",
        questionText: "Develop a C++ function that takes an array of student's marks, its length, and returns the count of succeeded students (marks >= 50).",
        hint: "Iterate from index 0 to length-1, increment a counter every time `marks[i] >= 50`.",
        solution: "```cpp\nint countSucceeded(double marks[], int length) {\n    int count = 0;\n    for (int i = 0; i < length; i++) {\n        if (marks[i] >= 50.0) {\n            count++;\n        }\n    }\n    return count;\n}\n```"
      },
      {
        id: "22-23-q3-b",
        type: "program",
        points: 4,
        title: "Question 3b: Power Modifier (By Reference)",
        questionText: "Write a C++ function named 'pwr' having two parameters which change the value of the first parameter to be equal to the first parameter to the power of the second parameter. 'Using call by reference'.",
        hint: "We must write `pwr(double &base, int exp)`. The first parameter has a reference address `&` modifier so modifications change the original caller's value.",
        solution: "```cpp\n#include <cmath> // Or implement a manual multiplication loop\n\nvoid pwr(double &base, int exp) {\n    double result = 1.0;\n    if (exp >= 0) {\n        for (int i = 0; i < exp; i++) {\n            result *= base;\n        }\n    } else {\n        for (int i = 0; i < -exp; i++) {\n            result *= base;\n        }\n        result = 1.0 / result;\n    }\n    base = result; // Mutating the reference directly!\n}\n```"
      },
      {
        id: "22-23-q4",
        type: "program",
        points: 12,
        title: "Core Final Program: Employee Management DB System",
        questionText: "Write a C++ program to create details database for 10 Employees. Each contains: id, Name (FName, Mname, Lname), Address (buildingNo, streetName, cityName), Salary.\nThe program displays a continuous interactive menu:\n1. Fill all Employees' data.\n2. Display all Employees' data.\n3. Display employees whose salary > entered limit.\n4. Display information of employees with a given first name.\n5. Display employees in a certian city name.\n6. Exit.",
        hint: "Watch out: This requires nested structures structure (`struct Address`, `struct Name`, inside `struct Employee`). Always handle `cin.ignore()` after reading IDs or numbers so subsequent `getline` functions don't skip lines!",
        solution: "Here is the comprehensive, official-grade solution of the C++ Employee Database system utilizing nested structures, clear formatted outputs, and interactive menu logic with full buffer bypasses.",
        defaultStdin: "1\n101\nJohn\nRobert\nDoe\n55\nMain St\nCairo\n5500\n102\nSarah\nAnn\nSmith\n99\nBroadway\nAlexandria\n7800\n103\nMuhammad\nSayed\nMahran\n12\nAcademy Road\nCairo\n12000\n104\nAlice\nMarie\nBaker\n3\nOcean Rd\nGiza\n4500\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n-1\n2\n3\n6000\n4\nSarah\n5\nCairo\n6",
        previewCode: `#include <iostream>
#include <string>
#include <iomanip>

using namespace std;

struct Name {
    string Fname;
    string Mname;
    string Lname;
};

struct Address {
    int buildingNo;
    string streetName;
    string cityName;
};

struct Employee {
    int id;
    Name name;
    Address address;
    double salary;
};

const int MAX_EMPLOYEES = 10;
Employee database[MAX_EMPLOYEES];
int empCount = 0;

void fillEmployees() {
    cout << "\n========== ENTER EMPLOYEES DATA ==========" << endl;
    for (int i = 0; i < MAX_EMPLOYEES; i++) {
        cout << "\nEmployee #" << (i + 1) << " Details:" << endl;
        cout << "Enter ID (-1 to stop early): ";
        cin >> database[i].id;
        if (database[i].id == -1) {
            break;
        }
        
        cin.ignore(); // crucial before getline
        cout << "Enter First Name: "; getline(cin, database[i].name.Fname);
        cout << "Enter Middle Name: "; getline(cin, database[i].name.Mname);
        cout << "Enter Last Name: "; getline(cin, database[i].name.Lname);
        
        cout << "Enter Building No: "; cin >> database[i].address.buildingNo;
        cin.ignore();
        cout << "Enter Street Name: "; getline(cin, database[i].address.streetName);
        cout << "Enter City Name: "; getline(cin, database[i].address.cityName);
        
        cout << "Enter Salary: $"; cin >> database[i].salary;
        empCount++;
    }
    cout << "\nLoaded " << empCount << " employees successfully." << endl;
}

void printEmployee(Employee emp) {
    cout << left << setw(6) << emp.id 
         << setw(26) << (emp.name.Fname + " " + emp.name.Mname + " " + emp.name.Lname)
         << setw(35) << (to_string(emp.address.buildingNo) + ", " + emp.address.streetName + ", " + emp.address.cityName)
         << "$" << fixed << setprecision(2) << emp.salary << endl;
}

void displayAll() {
    if (empCount == 0) {
        cout << "\n[Notice] Database is empty! Fill data first.\n";
        return;
    }
    cout << "\n=================================== EMPLOYEE DATABASE ===================================" << endl;
    cout << left << setw(6) << "ID" << setw(26) << "Full Name" << setw(35) << "Full Address" << "Salary" << endl;
    cout << "----------------------------------------------------------------------------------------" << endl;
    for (int i = 0; i < empCount; i++) {
        printEmployee(database[i]);
    }
    cout << "========================================================================================\n" << endl;
}

void searchBySalary() {
    double limit;
    cout << "Enter threshold salary: $";
    cin >> limit;
    cout << "\nEmployees earning more than $" << limit << ":" << endl;
    bool found = false;
    for (int i = 0; i < empCount; i++) {
        if (database[i].salary > limit) {
            printEmployee(database[i]);
            found = true;
        }
    }
    if (!found) cout << "No employees found earning more than $" << limit << endl;
}

void searchByFirstName() {
    string targetName;
    cin.ignore();
    cout << "Enter first name to search: ";
    getline(cin, targetName);
    cout << "\nSearch results for First Name '" << targetName << "':" << endl;
    bool found = false;
    for (int i = 0; i < empCount; i++) {
        if (database[i].name.Fname == targetName) {
            printEmployee(database[i]);
            found = true;
        }
    }
    if (!found) cout << "No employee matching description." << endl;
}

void searchByCityName() {
    string targetCity;
    cin.ignore();
    cout << "Enter City to search: ";
    getline(cin, targetCity);
    cout << "\nSearch results for City '" << targetCity << "':" << endl;
    bool found = false;
    for (int i = 0; i < empCount; i++) {
        if (database[i].address.cityName == targetCity) {
            printEmployee(database[i]);
            found = true;
        }
    }
    if (!found) cout << "No employee living inside city " << targetCity << endl;
}

int main() {
    int choice;
    while (true) {
        cout << "\n--- Employee System Terminal ---" << endl;
        cout << "1. Fill Employees Data" << endl;
        cout << "2. Display All Employees" << endl;
        cout << "3. Filter by Salary Threshold" << endl;
        cout << "4. Search by First Name" << endl;
        cout << "5. Search by City Name" << endl;
        cout << "6. Exit Application" << endl;
        cout << "Select choice: ";
        cin >> choice;

        if (choice == 6) {
            cout << "Exiting directory system. Goodbye!" << endl;
            break;
        }

        switch (choice) {
            case 1: fillEmployees(); break;
            case 2: displayAll(); break;
            case 3: searchBySalary(); break;
            case 4: searchByFirstName(); break;
            case 5: searchByCityName(); break;
            default: cout << "Invalid Input! Choose between 1-6." << endl;
        }
    }
    return 0;
}`
      }
    ]
  },
  {
    id: "2020-2021-fall",
    year: "2020-2021",
    semester: "Fall",
    course: "Program Design and Computer Languages (CMP 110)",
    duration: "2 hours",
    professor: "Dr. Ehab Elshimy & Dr. Khaled Morsy",
    questions: [
      {
        id: "20-21-q1-a",
        type: "definition",
        points: 5,
        title: "Question 1a: Core Terminology",
        questionText: "Define: (1) Computer program, (2) Information, (3) Computer.",
        hint: "These are the fundamental introductory definitions from Class Lecture 1. Focus on standard definitions used by Modern Academy.",
        solution: "1. **Computer program**: Data type specifications and a set of sequential instructions for carrying out operations that are executed by a computer to solve an operational problem.\n2. **Information**: Processed data, or any organized knowledge that communicates context.\n3. **Computer**: A programable/programmable electronic device that can store, retrieve, and process raw alphanumeric data into information."
      },
      {
        id: "20-21-q1-b",
        type: "diagram",
        points: 4,
        title: "Question 1b: Block Diagram",
        questionText: "Illustrate using a block diagram the computer basic components.",
        hint: "Be sure to differentiate Control flow lines (dashed) and Data flow lines (solid arrow lines). Indicate: Input, Control Unit, ALU, Memory, and Output.",
        solution: "Refer to the structural block diagram:\n```\n          ┌───────────────────────────────────────────────┐\n          │                 CONTROL UNIT                  │\n          └──────┬──────────────┬──────────────┬──────────┘\n                 : (Control)    :              :\n                 ▼              ▼              ▼\n  ┌──────┐    ┌─────┐        ┌─────┐        ┌──────┐\n  │ INPUT│───►│MEM- │◄──────►│ ALU │        │OUTPUT│\n  │DEVICE│    │ORY  │        └─────┘        │DEVICE│\n  └──────┘    └─────┘──────────────────────►└──────┘\n                 ▲        (Data Flow)          ▲\n                 └─────────────────────────────┘\nLines legend:\n───► Data Flow Line (Solid Arrow)\n- - ► Control Flow Line (Dashed Arrow)\n```"
      },
      {
        id: "20-21-q1-c",
        type: "definition",
        points: 3,
        title: "Question 1c: Identifier Naming Rules",
        questionText: "State the conditions for naming a valid identifier in C++.",
        hint: "Identifiers are variable/function names. Think about allowed characters, character casing constraints, and reserving limits.",
        solution: "1. Must begin with a letter (`a-z`, `A-Z`) or an underscore character (`_`). It **cannot start with a digit**.\n2. Can only contain alphanumeric characters (`A-Z`, `a-z`, `0-9`) or underscores (`_`). No spaces, hyphens, or special symbols legal.\n3. Cannot be a standard C++ **reserved keyword** (e.g. `int`, `double`, `const`). *(Note: lowercase keywords are reserved, but capitalized tokens like `Int` are legal identifiers since C++ is strictly case-sensitive)*."
      },
      {
        id: "20-21-q1-d",
        type: "math",
        points: 3,
        title: "Question 1d: Base Conversion Problems",
        questionText: "Convert (1001011)₂ to decimal AND convert (701)₁₀ to its binary form.",
        hint: "For binary to decimal, use powers of 2. For decimal to binary, use repetitive modulo division by 2.",
        solution: "1. **(1001011)₂ to Decimal**:\n   `1*2⁰ + 1*2¹ + 0*2² + 1*2³ + 0*2⁴ + 0*2⁵ + 1*2⁶`\n   `= 1 + 2 + 0 + 8 + 0 + 0 + 64 = 75₁₀`.\n\n2. **(701)₁₀ to Binary**:\n   `701 / 2 = 350 (rem 1)`\n   `350 / 2 = 175 (rem 0)`\n   `175 / 2 = 87  (rem 1)`\n   `87 / 2 = 43   (rem 1)`\n   `43 / 2 = 21   (rem 1)`\n   `21 / 2 = 10   (rem 1)`\n   `10 / 2 = 5    (rem 0)`\n   `5 / 2 = 2     (rem 1)`\n   `2 / 2 = 1     (rem 0)`\n   `1 / 2 = 0     (rem 1)`\n   Reversing the remainders yields: **(1010111101)₂**."
      },
      {
        id: "20-21-q2-all",
        type: "mcq",
        points: 10,
        title: "Question 2: Hardass MCQ Collection",
        questionText: "Choose the correct answers for the following 10 core questions (see exam screenshots for prompt texts).",
        hint: "This MCQ tests you on reference modifiers, array memory starts, scope restrictions, and struct memory layout.",
        options: [
          "Q1: reference modifier is '&'",
          "Q2: reference is Alternate name for variable",
          "Q3: structured declared will not allocate memory",
          "Q4: memory address of first element in array is 'array'",
          "Q5: array is elements of same type in contiguous memory"
        ],
        solution: "1. **Q1**: Reference modifier is **&** (Option a).\n2. **Q2**: A reference provides **Alternate name for the variable** (Option b).\n3. **Q3**: Struct declaration **will not allocate any memory** (Option c).\n4. **Q4**: Address of first element is **array** (Option d - representing pointer to array start).\n5. **Q5**: Array is **a series of elements of the same type in contiguous memory locations** (Option a).\n6. **Q6**: Program start execution point is **main function** (Option b).\n7. **Q7**: Looping for known iterations is **for loop** (Option a).\n8. **Q8**: Variable in block scope is **only inside the {} block** (Option b).\n9. **Q9**: Punctuation that ends statements is **;** (Option b).\n10. **Q10**: Insertion operator is **<<** (Option c)."
      },
      {
        id: "20-21-q3-a",
        type: "definition",
        points: 5,
        title: "Question 3a: Legal vs Illegal Identifiers",
        questionText: "Classify the following C++ identifiers as legal or illegal:\n- Modern Academy\n- Integer\n- int\n- Const\n- 1section\n- Group1",
        hint: "Remember the case-sensitive trick. Lowercase keywords are reserved. Identifiers cannot contain spaces or begin with integers.",
        solution: "1. **`Modern Academy`**: **ILLEGAL** (Contains spaces, which are illegal in identifiers).\n2. **`Integer`**: **LEGAL** (Case-sensitive; starts with Capital 'I' which is different from typing the primitive `int`).\n3. **`int`**: **ILLEGAL** (Reserved type keyword in C++).\n4. **`Const`**: **LEGAL** (Capital 'C' differentiates it from the reserved keyword `const`).\n5. **`1section`**: **ILLEGAL** (Starts with a numeric digit).\n6. **`Group1`**: **LEGAL** (Starts with letters and only contains valid alphanumeric characters)."
      },
      {
        id: "20-21-q3-b",
        type: "program",
        points: 5,
        title: "Question 3b: Swapping with Call by Reference",
        questionText: "Write a C++ function to swapping the entered parameters values using 'call by reference'.",
        hint: "Pass standard parameters using the reference address characters (`&`) so mutations affect the actual initial caller variable scopes.",
        solution: "```cpp\nvoid swap(int &x, int &y) {\n    int temp = x;\n    x = y;\n    y = temp;\n}\n```\n*(Notice: In the official scanned answer key, the examiner accidentally typed 'double getStudentMark' as the function signature instead of swap. Do not write that typo inside your lab program!)*"
      },
      {
        id: "20-21-q3-c",
        type: "program",
        points: 5,
        title: "Question 3c: Searching Student Marks",
        questionText: "Develop a C++ function that takes an array of student marks, an array of student names, array length L, and target student name. It searches the name array and returns the corresponding score. If not found, return -1.",
        hint: "We loop up to L. Compare each string array cell with targetName. If they match, access and return the score from the same index.",
        solution: "```cpp\n#include <string>\nusing namespace std;\n\ndouble getStudentMark(double arr_marks[], string arr_students[], string student_name, int L) {\n    double mark = -1.0;\n    for (int i = 0; i < L; i++) {\n        if (student_name == arr_students[i]) {\n            mark = arr_marks[i];\n            break;\n        }\n    }\n    return mark;\n}\n```"
      },
      {
        id: "20-21-q4",
        type: "program",
        points: 20,
        title: "Core Final Program: Sales Database System",
        questionText: "Write a C++ program that accepts 10 items (Struct containing: item code, item name, item price, item quantity).\nThe program displays a continuous interactive menu:\n1. Fill database.\n2. Display price of a certain item with name.\n3. Display quantity of a certain item with code.\n4. Show raw item data in tabular format.\n5. Exit.",
        hint: "Utilize structured arrays. Ensure `cin.ignore()` is invoked after numeric entries so `getline` doesn't bypass name parameters.",
        solution: "Here is the comprehensive sales inventory system program designed specifically with Dr. Ehab's exam criteria.",
        defaultStdin: "1\n101\nClassic Pen\n12.50\n50\n102\nDraft Notebook\n24.99\n30\n103\nTechnical Ruler\n18.00\n15\n-1\n2\nClassic Pen\n3\n102\n4\n5",
        previewCode: `#include <iostream>
#include <string>
#include <iomanip>

using namespace std;

struct Item {
    int item_code;
    string item_name;
    double item_price;
    int item_quantity;
};

const int MAX_ITEMS = 10;
Item store[MAX_ITEMS];
int currentCount = 0;

void fillStore() {
    cout << "\n========== LOADING INVENTORY DATA ==========" << endl;
    for (int i = 0; i < MAX_ITEMS; i++) {
        cout << "\nItem #" << (i + 1) << " Details:" << endl;
        cout << "Enter Item Code (-1 to stop early): ";
        cin >> store[i].item_code;
        if (store[i].item_code == -1) {
            break;
        }
        
        cin.ignore(); // flush buffer
        cout << "Enter Item Name: ";
        getline(cin, store[i].item_name);
        
        cout << "Enter Item Price: $";
        cin >> store[i].item_price;
        
        cout << "Enter Quantity: ";
        cin >> store[i].item_quantity;
        
        currentCount++;
    }
    cout << "\nSuccessfully loaded " << currentCount << " items.\n";
}

void searchByName() {
    string targetName;
    cin.ignore();
    cout << "Enter exact item name to search: ";
    getline(cin, targetName);
    
    bool found = false;
    for (int i = 0; i < currentCount; i++) {
        if (store[i].item_name == targetName) {
            cout << "==> Matches found: Code (" << store[i].item_code 
                 << ") sells for $" << fixed << setprecision(2) << store[i].item_price << endl;
            found = true;
        }
    }
    if (!found) cout << "No item matching: " << targetName << " found in inventory." << endl;
}

void searchByCode() {
    int targetCode;
    cout << "Enter item code to query: ";
    cin >> targetCode;
    
    bool found = false;
    for (int i = 0; i < currentCount; i++) {
        if (store[i].item_code == targetCode) {
            cout << "==> SKU: " << store[i].item_name << " has remaining stock size of: " 
                 << store[i].item_quantity << " units." << endl;
            found = true;
        }
    }
    if (!found) cout << "Item SKU code " << targetCode << " not found." << endl;
}

void showInventoryTable() {
    if (currentCount == 0) {
        cout << "\n[Notice] Warehouse stores zero records. Load data first.\n";
        return;
    }
    cout << "\n================================ INVENTORY MATRIX ================================" << endl;
    cout << left << setw(10) << "SKU CODE" << setw(30) << "PRODUCT NAME" << setw(15) << "PRICE" << "QUANTITY" << endl;
    cout << "----------------------------------------------------------------------------------" << endl;
    for (int i = 0; i < currentCount; i++) {
        cout << left << setw(10) << store[i].item_code 
             << setw(30) << store[i].item_name 
             << "$" << fixed << setprecision(2) << setw(14) << store[i].item_price 
             << store[i].item_quantity << " units" << endl;
    }
    cout << "==================================================================================\n" << endl;
}

int main() {
    char choice;
    do {
        cout << "\n--- Warehouse Logistics Terminal ---" << endl;
        cout << "1. Intake New Store Batches" << endl;
        cout << "2. Search price by Name" << endl;
        cout << "3. Grab count by SKU Code" << endl;
        cout << "4. Print Tabular Stock Manifest" << endl;
        cout << "5. Close Connections" << endl;
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {
            case '1': fillStore(); break;
            case '2': searchByName(); break;
            case '3': searchByCode(); break;
            case '4': showInventoryTable(); break;
            case '5': cout << "Inventory modules offline. Goodbye." << endl; break;
            default: cout << "Invalid Selection! Please specify index 1 to 5." << endl;
        }
    } while (choice != '5');
    
    return 0;
}`
      }
    ]
  },
  {
    id: "2016-2017-spring",
    year: "2016-2017",
    semester: "Spring",
    course: "Program Design and Computer Languages (CMP 110)",
    duration: "3 hours",
    professor: "Dr. Ehab Elshimy & Dr. Khaled Morsy",
    questions: [
      {
        id: "16-17-q2-a",
        type: "error-fix",
        points: 10,
        title: "Question 2a: Compiler Error Hunting",
        questionText: "Identify and correct all the compilation errors in the provided standard calculator program listing (see screenshot details).",
        hint: "Common errors here are misspelled headers (`iostreem` vs `iostream`), namespace typos (`sdt` vs `std`), lowercase `void main` function declarations, and unquoted newline escape codes `\\n` inside stream calls.",
        solution: "1. Line 1: `#include <iostreem>` is wrong. Correct: `#include <iostream>`.\n2. Line 2: `using namespace sdt;` has spelling typo. Correct: `using namespace std;`.\n3. Line 3: `int main()` or `int main(void)` is preferred or standard over `void main()`.\n4. Line 5: `int num1,num2,result;` is acceptable, but wait: `result` is double in line 25 division.\n5. Line 13: `switch (op)` is corrected from `switch on (op)`.\n6. Line 27: `default :` lacks braces matching.\n7. Line 28: `cout<<\"Error: \"<< \\n ;` is incorrect since `\\n` is raw instead of string `\"\\n\"` or `endl`.\n8. Line 30: `cout<< \\n << \"Result of...` also has raw unquoted characters.\n9. Line 33: Inside `int main()` you should append `return 0;` at program termination."
      },
      {
        id: "16-17-q2-b",
        type: "true-false",
        points: 5,
        title: "Question 2b: True or False",
        questionText: "1. An array can contain similar or dissimilar elements.\n2. It is illegal to declare more than one variable in a single statement.\n3. The parameters listed in the function declaration are considered global variables.\n4. The do-while loop tests the condition before executing the loop body.\n5. A break statement in a switch stops your program.",
        options: ["True", "False"],
        correctAnswer: false,
        hint: "All variables inside declaration lists are legal; parameters are strictly locally scoped; break terminates blocks, not operational runtimes.",
        solution: "1. **FALSE**. An array contains only **similar (same type)** variables.\n2. **FALSE**. It is perfectly legal to declare multiple variables, e.g., `int x, y, z;`.\n3. **FALSE**. Parameters behave as **local variables** inside the called function.\n4. **FALSE**. Do-while is a post-test loop checking conditions **after** the first pass.\n5. **FALSE**. A break instruction only exits the immediate **`switch` or loop structure**, not the entire active process."
      },
      {
        id: "16-17-q5",
        type: "class",
        points: 15,
        title: "UML Design: Fan Class Implementation",
        questionText: "Draw the UML diagram and develop a C++ class named 'Fan' containing:\n- Speed level string ('low', 'medium', 'high', defaulted to 'low').\n- `incSpeed()`: increments speed level.\n- `decSpeed()`: decrements speed.\n- Design and implement standard constructor and mutation accessors.",
        hint: "Use string values. Manage boundaries: trying to increment when speed is 'high' has no effect. Decrement past 'low' keeps it 'low'.",
        solution: "Provides classes to handle internal states and speed step cycles.",
        defaultStdin: "",
        previewCode: `#include <iostream>
#include <string>

using namespace std;

class Fan {
private:
    string speed;

public:
    // Default constructor
    Fan() {
        speed = "low";
    }

    string getSpeed() {
        return speed;
    }

    void incSpeed() {
        if (speed == "low") {
            speed = "medium";
            cout << "[Fan Speed Increased to MEDIUM]" << endl;
        } else if (speed == "medium") {
            speed = "high";
            cout << "[Fan Speed Increased to HIGH]" << endl;
        } else {
            cout << "[Fan is already running at MAX speed!]" << endl;
        }
    }

    void decSpeed() {
        if (speed == "high") {
            speed = "medium";
            cout << "[Fan Speed Decreased to MEDIUM]" << endl;
        } else if (speed == "medium") {
            speed = "low";
            cout << "[Fan Speed Decreased to LOW]" << endl;
        } else {
            cout << "[Fan is already run at MIN speed (low)]" << endl;
        }
    }
};

int main() {
    cout << "=== Testing Fan OOP Engineering ===" << endl;
    Fan myFan;
    cout << "Initial speed: " << myFan.getSpeed() << endl;
    
    myFan.incSpeed();
    myFan.incSpeed();
    myFan.incSpeed(); // out of limits
    
    myFan.decSpeed();
    cout << "Current speed is: " << myFan.getSpeed() << endl;
    return 0;
}`
      }
    ]
  },
  {
    id: "2017-2018-fall",
    year: "2017-2018",
    semester: "Fall",
    course: "Program Design and Computer Languages (CMP n010)",
    duration: "3 hours",
    professor: "Dr. Ehab Elshimy & Dr. Khaled Morsy",
    questions: [
      {
        id: "17-18-f-q2",
        type: "true-false",
        points: 10,
        title: "Question 2: OOP & Core C++ T/F",
        questionText: "1. A constructor function should have a void return type.\n2. You can declare an array without identifying its length.\n3. The constructor function sets default status for class instances.\n4. An if statement should always be followed by an else statement.\n5. The data and functions that operate on data are bundled as a unit called object.",
        options: ["True", "False"],
        hint: "Constructors have *no return type* (not even void!). Static array memory requires sizing allocations.",
        solution: "1. **FALSE**. Constructors have **no return type** at all, not even `void`.\n2. **FALSE**. Standard static arrays **must** specify length during declaration, unless they are initialized immediately, e.g. `int arr[] = {1, 2, 3};`.\n3. **TRUE**. Constructors are designed to initialize classes or member states with default values.\n4. **FALSE**. The `else` statement is completely optional in conditional execution branching.\n5. **TRUE** (or **FALSE** depending on terminological nuances: **Class** is the blueprint bundling them, whereas an **Object** is the physical instance in memory containing those bindings. In standard OOP nomenclature, this represents Encapsulation)."
      },
      {
        id: "17-18-f-q5",
        type: "class",
        points: 12,
        title: "UML Design: Radio Class Implementation",
        questionText: "Create a class named 'Radio' with:\n- Volume: integer (from 0 to 5).\n- `incVolume()`, `decVolume()`.\n- `on()`: volume = 1.\n- `off()`: volume = 0.\n- Default value is 0.",
        hint: "Ensure boundaries: volume can never go beyond 5 or below 0. Changing volume requires the radio to be on, or simple direct mutations.",
        solution: "Includes boundary guards preventing volume overrun errors past level 5.",
        defaultStdin: "",
        previewCode: `#include <iostream>
using namespace std;

class Radio {
private:
    int volume;
    bool isPowered;

public:
    Radio() {
        volume = 0;
        isPowered = false;
    }

    void on() {
        isPowered = true;
        volume = 1;
        cout << "[Radio turned ON. Initial volume level: 1]" << endl;
    }

    void off() {
        isPowered = false;
        volume = 0;
        cout << "[Radio turned OFF. Volume reset to 0]" << endl;
    }

    void incVolume() {
        if (!isPowered) {
            cout << "Turn on the radio first!" << endl;
            return;
        }
        if (volume < 5) {
            volume++;
            cout << "Volume increased to: " << volume << endl;
        } else {
            cout << "Volume already at MAX (5)." << endl;
        }
    }

    void decVolume() {
        if (!isPowered) {
            cout << "Turn on the radio first!" << endl;
            return;
        }
        if (volume > 0) {
            volume--;
            cout << "Volume decreased to: " << volume << endl;
            if (volume == 0) {
                isPowered = false;
                cout << "[Radio went silent and powered down]" << endl;
            }
        } else {
            cout << "Radio is already silent." << endl;
        }
    }

    int getVolume() { return volume; }
};

int main() {
    Radio r;
    r.incVolume(); // Fails
    r.on();
    r.incVolume();
    r.incVolume();
    r.decVolume();
    r.off();
    return 0;
}`
      }
    ]
  }
];
