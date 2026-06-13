export interface CurriculumSection {
  title: string;
  content: string;
  code?: string;
  trick?: string;
  image?: string;
}

export interface CurriculumTopic {
  id: string;
  title: string;
  description: string;
  sections: CurriculumSection[];
}

export const CURRICULUM_TOPICS: CurriculumTopic[] = [
  {
    id: "basics_syntax",
    title: "1. Basics & Syntax",
    description: "The fundamental building blocks of a C++ program. Learn how a file is structured, what the mandatory components are, and how to compile and run your first piece of code.",
    sections: [
      {
        title: "Hello World & Program Structure",
        content: "Every C++ program has a standard boilerplate structure that you must write before doing anything else.\n\nLet's break down the 'Hello World' code line by line:\n\n1. `#include <iostream>`: This is a **header file library** that lets us work with input and output objects, such as `cout`. Header files add functionality to C++ programs. The `#include` directive tells the preprocessor to include the contents of this file.\n\n2. `using namespace std;`: This tells the compiler that we will use the standard workspace (namespace) for our objects and variables. It allows us to write `cout` instead of `std::cout`. It's a convenience feature, though in large projects it's sometimes omitted to avoid naming conflicts.\n\n3. `int main() { ... }`: This is the **main function**. This is the entry point of your program. Any code inside its curly brackets `{}` will be executed when the program runs. Every C++ program MUST have a `main()` function.\n\n4. `cout << \"Hello World!\";`: `cout` (pronounced 'see-out') is an object used together with the insertion operator `<<` to output/print text. In C++, every statement must end with a semicolon `;`.\n\n5. `return 0;`: This ends the `main()` function and sends a signal of `0` to the operating system, which represents a successful execution (no errors).",
        code: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello World!";
  return 0;
}`,
        trick: "You can omit `using namespace std;` and instead use `std::cout` and `std::string`. This is actually considered a best practice in professional C++ to avoid 'namespace pollution'. If two libraries share a function with the same name, the namespace prevents them from clashing."
      },
      {
        title: "Comments",
        content: "Comments are text blocks inside your code that are completely ignored by the C++ compiler. They are crucial for explaining what your code does to yourself and to other developers, making it much more readable. They can also be used to quickly disable code while testing.\n\n**Single-line comments** start with two forward slashes `//`. Any text between `//` and the end of the line will be ignored.\n\n**Multi-line comments** start with `/*` and end with `*/`. Any text between these two markers will be ignored, even if it spans across multiple lines.",
        code: `// This is a single-line comment
int x = 5; // You can also put comments at the end of a line

/* This is a 
   multi-line comment.
   It spans multiple lines! */
int y = 10;`
      },
      {
        title: "Visual Memory: Computer Components",
        content: "A block diagram of the basic components found in almost all computer architectures.",
        image: "/images/computer_components.jpg"
      },
      {
        title: "Visual Memory: Compilation Process",
        content: "A block diagram of the process of converting C++ source code into an executable machine code file.",
        image: "/images/compilation_process.jpg"
      }
    ]
  },
  {
    id: "vars_data_types",
    title: "2. Variables & Data Types",
    description: "Variables are containers for storing data values. C++ is a strongly-typed language, meaning every variable must be declared with a specific data type before it can be used.",
    sections: [
      {
        title: "Declaring Variables",
        content: "To create a variable, you must specify the **type** and assign it a **value**:\n\n`type variableName = value;`\n\nWhere `type` is one of C++ types (such as `int`), and `variableName` is the name of the variable (such as `x` or `myName`). The equal sign `=` is used to assign values to the variable.\n\nIf you assign a new value to an existing variable, it will overwrite the previous value. You can also declare a variable without assigning it a value, and assign the value later.",
        code: `int myNum = 15; // Declare and assign
int emptyObj;   // Declare only
emptyObj = 20;  // Assign later

myNum = 10;     // Now myNum is 10 instead of 15`,
      },
      {
        title: "Primitive Data Types",
        content: "C++ has a rich set of built-in data types. Choosing the correct type is important for memory efficiency and program logic.\n\n- `int`: Stores integers (whole numbers), without decimals, such as 123 or -123.\n- `double`: Stores floating-point numbers, with decimals, such as 19.99 or -19.99. It has double the precision of a float.\n- `float`: Stores floating-point numbers. Generally, `double` is preferred unless you are tightly constrained by memory.\n- `char`: Stores single characters, like 'a' or 'B'. Char values must be surrounded by **single quotes**.\n- `string`: Stores text, like \"Hello\". String values are surrounded by **double quotes**. (Note: you must `#include <string>` to use this reliably).\n- `bool`: Stores logical values with two states: `true` or `false`.",
        code: `int    myNum       = 5;         // Integer (whole number)
float  myFloatNum  = 5.99f;     // Floating point (add 'f' suffix)
double myDoubleNum = 9.98;      // Double precision 
char   myLetter    = 'D';       // Character
bool   myBoolean   = true;      // Boolean
string myText      = "Hello";   // String`,
        trick: "A `char` is actually stored as an integer (its ASCII value) under the hood. This means you can do math with letters! E.g., `char nextLetter = 'A' + 1;` will result in 'B'."
      },
      {
        title: "Constants (const)",
        content: "When you have a variable whose value should never be changed, you can use the `const` keyword. This will declare the variable as \"constant\", which means unchangeable and read-only.\n\nIf anyone (or even you yourself) tries to overwrite the variable, the C++ compiler will throw an error, preventing your program from running. This is a very powerful defensive programming tool.",
        code: `const int myNum = 15;
// myNum = 10;  // ERROR! You cannot reassign a const variable

const double PI = 3.14159265359;
const int MINUTES_PER_HOUR = 60;`,
        trick: "Always use `const` for values that shouldn't change, like Pi (3.14159) or the maximum size of an array. It makes your intentions clear and physically stops nasty bugs before they happen!"
      }
    ]
  },
  {
    id: "io_operators",
    title: "3. Input, Output & Operators",
    description: "Learn how to interact with the user via the console and perform deep mathematical and logical operations on your variables.",
    sections: [
      {
        title: "User Input (cin)",
        content: "While `cout` (character out) is used to output values to the screen, `cin` (character in) is used to get user input from the keyboard.\n\n`cin` is a predefined variable that reads data from the keyboard with the extraction operator `>>`. Here is how you can prompt a user for a number, wait for them to type it, and then print it back.",
        code: `int x;
cout << "Type a number: "; 
cin >> x; // The program pauses here until the user presses Enter
cout << "Your number is: " << x;`,
        trick: "`cin` stops reading as soon as it hits a space! If you ask for a full name and the user types 'John Doe', `cin >> name` only captures 'John'. To capture a full line with spaces, use `getline(cin, stringVariable);` instead."
      },
      {
        title: "Arithmetic Operators",
        content: "Arithmetic operators perform common mathematical operations. Note that integer division works differently than you might expect.\n\n- `+` (Addition): Adds two values.\n- `-` (Subtraction): Subtracts one value from another.\n- `*` (Multiplication): Multiplies two values.\n- `/` (Division): Divides one value by another. **Important:** dividing two integers drops the decimal! `5 / 2` is `2`. If you want `2.5`, one of them must be a double: `5.0 / 2`.\n- `%` (Modulo): Returns the division remainder. `5 % 2` is `1`.\n- `++` (Increment): Increases the value by 1. `x++` is the same as `x = x + 1`.\n- `--` (Decrement): Decreases the value by 1.",
        code: `int x = 10;
int y = 3;
cout << (x + y) << "\\n"; // Outputs 13
cout << (x / y) << "\\n"; // Outputs 3 (Decimal is truncated!)
cout << (x % y) << "\\n"; // Outputs 1 (Remainder of 10/3)
x++;
cout << x << "\\n";       // Outputs 11`
      },
      {
        title: "Assignment Operators",
        content: "Assignment operators are used to assign values to variables.\n\nThe basic assignment operator is `=`. However, C++ provides \"compound assignment\" operators that combine an arithmetic operation with assignment to save you typing.\n\n- `=` : Assign (x = 5)\n- `+=` : Add and assign (x += 5 is equivalent to x = x + 5)\n- `-=` : Subtract and assign (x -= 5 is equivalent to x = x - 5)\n- `*=` : Multiply and assign\n- `/=` : Divide and assign",
        code: `int x = 10;
x += 5; // x is now 15
x *= 2; // x is now 30`
      },
      {
        title: "Comparison Operators",
        content: "Comparison operators are used to compare two values (or variables). This is essential in control flow (if-statements and loops).\n\nThe returned value of a comparison is a boolean: either `1` (which means true) or `0` (which means false).\n\n- `==` : Equal to (Do not confuse with `=` which is assignment)\n- `!=` : Not equal\n- `>` : Greater than\n- `<` : Less than\n- `>=` : Greater than or equal to\n- `<=` : Less than or equal to",
        code: `int x = 5;
int y = 3;
cout << (x == y); // returns 0 (false)
cout << (x != y); // returns 1 (true)
cout << (x > y);  // returns 1 (true)`
      },
      {
        title: "Logical Operators",
        content: "Logical operators are used to determine the logic between variables or values. You use them to chain multiple conditions together.\n\n- `&&` (Logical AND): Returns true ONLY if BOTH statements are true.\n- `||` (Logical OR): Returns true if AT LEAST ONE of the statements is true.\n- `!` (Logical NOT): Reverses the result; returns false if the result is true, and true if the result is false.",
        code: `int x = 5;
// Returns 1 (true) because 5 is > 3 AND 5 is < 10
cout << (x > 3 && x < 10); 

// Returns 0 (false) because !(true) is false
cout << (!(x > 3 && x < 10)); `
      },
      {
        title: "Operator Precedence",
        content: "Operator precedence determines which operations are performed first. It's exactly like BEDMAS/PEMDAS in mathematics.\n\nMultiplication `*` and division `/` have higher precedence than substitution `+` and `-`. But you can always use parentheses `()` to explicitly define what should happen first.",
        code: `int calc1 = 100 + 50 * 3;     // 250 (Multiplication evaluated first)
int calc2 = (100 + 50) * 3;   // 450 (Parentheses evaluated first)`,
        trick: "When in doubt, always use parentheses! Even if you have the precedence rules perfectly memorized, using parentheses explicitly shows your intent to other programmers and guarantees the correct calculation."
      },
      {
        title: "Code Challenge: The ATM",
        content: "Here is a code snippet combining what we've learned so far: arithmetic and assignment operators. We start with a balance of $1000. Simulate a deposit of $200 and a withdrawal of $150. Calculate the remaining balance.",
        code: `int balance = 1000;
balance += 200; // Deposit logic
balance -= 150; // Withdrawal logic
cout << "Final balance: $" << balance;`
      }
    ]
  },
  {
    id: "conditions",
    title: "4. Conditions (If, Else If, Else)",
    description: "Decision making is foundational to programming in C++. Conditions let the program execute different code depending on whether a statement evaluates to true or false.",
    sections: [
      {
        title: "The if Statement",
        content: "Use the `if` statement to specify a block of C++ code to be executed if a condition is `true`.\n\nThe condition inside the parentheses `()` is evaluated. If it yields true, the block inside the curly braces `{}` is executed. If it yields false, the program simply skips the curly braces and continues downwards.",
        code: `int time = 20;

if (time < 18) {
  // This code will NOT execute because 20 is not less than 18
  cout << "Good day.";
}`,
        trick: "Any non-zero value evaluates to 'true' in C++. Thus, `if (5)` or `if (-1)` are both perfectly valid and will always execute! However, writing `if (x = 5)` instead of `if (x == 5)` is an extremely common beginner bug. A single '=' assigns '5' to 'x', and since '5' is true, the statement always executes regardless of what 'x' was!"
      },
      {
        title: "The else and else if Statements",
        content: "Use the `else` statement to specify a block of code to be executed if the `if` condition is `false`.\n\nIf you have multiple conditions, use the `else if` statement. This specifies a new condition to test, but ONLY if the first condition was false. The program will execute the code for the FIRST condition that becomes true, and then skip the rest.",
        code: `int time = 22;

if (time < 10) {
  cout << "Good morning.";
} else if (time < 20) {
  cout << "Good day.";
} else {
  // Since 22 is neither < 10, nor < 20, the else block runs
  cout << "Good evening.";
}`,
        trick: "If an if-statement block only contains one line of code, you can technically omit the curly braces {}. E.g. `if (x > 5) x = 0;`. But be very careful doing this: if you add a second line later without adding the braces, that second line will execute unconditionally, leading to silent logic errors."
      },
      {
        title: "Switch Statement",
        content: "Instead of writing many `if...else if` statements, you can use the `switch` statement to select one of many code blocks to be executed based on the exact value of a variable.\n\nThe `switch` expression is evaluated once. The value of the expression is compared with the values of each `case`. If there is a match, the associated block of code is executed. The `break` keyword breaks out of the switch block so it stops testing the other cases.\n\nThe `default` keyword specifies some code to run if there is no case match (like an `else` statement).",
        code: `int day = 4;
switch (day) {
  case 1:
    cout << "Monday";
    break;
  case 2:
    cout << "Tuesday";
    break;
  case 3:
    cout << "Wednesday";
    break;
  case 4:
    cout << "Thursday"; // This block will execute!
    break;
  default:
    cout << "Looking forward to the Weekend";
}`,
        trick: "Forgetting the `break` keyword causes 'fall-through'. Execution will continue to run the code in the next consecutive case regardless of whether that case condition matched! Sometimes this is useful intentionally to group cases, but usually, it's a forgotten bug."
      }
    ]
  },
  {
    id: "loops",
    title: "5. Loops",
    description: "Loops execute a block of code repeatedly as long as a specified condition is reached. They save time, reduce code duplication, and make iteration possible.",
    sections: [
      {
        title: "While Loop",
        content: "The `while` loop loops through a block of code as long as a specified condition is `true`. The condition is evaluated *before* the loop executes its block.\n\nIf you forget to increase the variable used in the condition, the loop will never end! This will crash your program (an infinite loop).",
        code: `int i = 0;
while (i < 5) {
  cout << i << "\\n"; // Prints 0, 1, 2, 3, 4
  i++;              // Don't forget to increment the variable!
}`
      },
      {
        title: "Do/While Loop",
        content: "The `do/while` loop is a variant of the `while` loop. The condition is evaluated *after* the loop block is executed. This means the loop will always execute its code block at least once, even if the condition is false to begin with.",
        code: `int j = 0;
do {
  cout << j << "\\n"; // This will definitely print '0' once
  j++;
}
while (j < 5);`,
        trick: "A do/while loop ALWAYS executes at least once! By design, use it when you are reading user input and you need to prompt them at least one time before checking if that input is actually valid."
      },
      {
        title: "For Loops",
        content: "When you know exactly how many times you want to loop through a block of code, use the `for` loop instead of a `while` loop.\n\nThe `for` loop declaration has three main statements separated by semicolons within its parentheses:\n1. **Initialization** (executed once before the loop starts)\n2. **Condition** (defines the condition for running the loop)\n3. **Update** (executed every time after the loop body runs)",
        code: `//  Init        Condition  Update
for (int i = 0; i < 5;     i++) {
  cout << i << "\\n"; // Prints 0 to 4
}`,
        trick: "You can declare multiple variables in the initialization part of a for loop, and have multiple updates in the update part, separated by commas. E.g. `for (int i = 0, j = 10; i < j; i++, j--)`. This is incredibly useful for algorithms like Two-Pointer arrays or Palindrome checking!"
      },
      {
        title: "Break and Continue",
        content: "You have already seen the `break` statement used in a `switch` statement. It can also be used to prematurely jump entirely out of a loop.\n\nThe `continue` statement breaks one specific iteration (in the loop) if a specified condition occurs, and immediately jumps to the next iteration, skipping any code below it.",
        code: `for (int i = 0; i < 10; i++) {
  if (i == 4) {
    break; // Stops the loop completely when i is 4
  }
  
  if (i == 2) {
    continue; // Skips the 'cout' safely when i is 2, moving immediately to i = 3
  }
  
  cout << i << "\\n"; // Will print 0, 1, 3
}`
      }
    ]
  },
  {
    id: "arrays",
    title: "6. Arrays",
    description: "Arrays are used to store multiple values in a single, continuous block of memory, rather than declaring separate variables for each value.",
    sections: [
      {
        title: "Declaring and Accessing Arrays",
        content: "To declare an array, define the variable type, specify the name of the array followed by square brackets `[]`, and specify the number of elements it should store.\n\nYou access an array element by referring to its index number inside the square brackets. Remember: C++ arrays are **Zero-Indexed**, meaning the first element is at `[0]`, the second is at `[1]`, and so on.",
        code: `// Array that holds 4 strings
string cars[4] = {"Volvo", "BMW", "Ford", "Mazda"};

cout << cars[0]; // Outputs "Volvo"
cars[0] = "Opel"; // Overwrites the first element
cout << cars[0]; // Outputs "Opel"`,
        trick: "C++ does NOT check out-of-bounds access by default! If you have an array of size 4 and access `cars[10]`, the compiler won't stop you. Your program will read whatever random piece of memory happens to be residing there, which could lead to bizarre bugs or crash with a Segmentation Fault."
      },
      {
        title: "Looping Through an Array",
        content: "You can seamlessly loop through all array elements using a `for` loop. To do this properly, you must know how big the array is, so you don't overshoot the bounds.",
        code: `int myNumbers[5] = {10, 20, 30, 40, 50};

for (int i = 0; i < 5; i++) {
  cout << myNumbers[i] << "\\n";
}`,
        trick: "To find the length of an array dynamically, you can use the `sizeof()` operator. E.g., `int length = sizeof(myNumbers) / sizeof(myNumbers[0]);`. However, this trick **only works** in the immediate scope where the array was declared (it fails down to '1' or '2' if you try this inside a function that the array was passed to)."
      },
      {
        title: "Multi-Dimensional Arrays",
        content: "A multi-dimensional array is simply an array composed of elements that are also arrays. The most common form is a 2-Dimensional array, which effectively represents a grid, table, or a mathematical matrix.\n\nTo declare a multi-dimensional array, define the variable type, specify the name of the array followed by square brackets which specify how many elements the main array has, followed by another set of square brackets which indicates how many elements the sub-arrays have.",
        code: `// A matrix with 2 rows and 3 columns
int matrix[2][3] = {
  {1, 4, 2},
  {3, 6, 8}
};

// Access the element in the 1st row (index 0) and 3rd column (index 2)
cout << matrix[0][2]; // Outputs 2`
      }
    ]
  },
  {
    id: "functions",
    title: "7. Functions (In-Depth)",
    description: "Functions compartmentalize your code logically. Understanding how arguments are passed and returned is non-negotiable for writing robust C++.",
    sections: [
      {
        title: "Function Declaration & Definition",
        content: "A function consists of two parts: \n- **Declaration (Prototype)**: the return type, the name of the function, and parameters (if any).\n- **Definition**: the physical body of the function (the code block).\n\nIf a user-defined function, such as `addNumbers()`, is declared after the `main()` function, an error will occur because C++ reads code from top to bottom. To avoid this, we separate the declaration and put it at the very top, while leaving the definition anywhere we want.",
        code: `// 1. Function declaration (Prototype)
int addNumbers(int x, int y);

int main() {
  int result = addNumbers(5, 3);
  cout << result;
  return 0;
}

// 2. Function definition
int addNumbers(int x, int y) {
  return x + y;
}`,
        trick: "If you define the entire function body above `main()`, you don't strictly need a separate prototype. However, as files grow into hundreds of lines, and as you split code into multiple `.h` and `.cpp` files, separating declarations from definitions becomes absolutely essential."
      },
      {
        title: "Pass by Value vs. Pass by Reference",
        content: "By default, C++ passes arguments *by value*. This means the function receives a brand-new COPY of the variable. If you change the value of this new variable inside the function, it will NOT affect the original variable in `main()`.\n\nTo change the original variable directly, you can pass arguments *by reference*. By adding an ampersand `&` to the parameter name, you are passing the exact memory address. The function now operates directly on the original variable.",
        code: `void swapValue(int x, int y) {
  int z = x; x = y; y = z; 
  // This does nothing to the original variables in main!
}

void swapReference(int &x, int &y) {
  int z = x; x = y; y = z; 
  // This modifies the original variables!
}

int main() {
  int a = 1, b = 2;
  
  // swapValue(a, b); // a is still 1, b is still 2
  
  swapReference(a, b);
  cout << a << " " << b; // a is now 2, b is now 1
}`,
        trick: "Always pass complex types (like big structs, raw Strings, or vectors) by reference to save memory and processing time—creating copies is slow! If you don't want the function to accidentally alter them, use `const int &x`. This is called 'Pass by const reference' and is highly optimal and safe."
      },
      {
        title: "Default Parameters & Function Overloading",
        content: "You can assign a default value to a parameter, making it optional when the function is called. If we call the function without an argument, it automatically uses the default value.\n\nFurthermore, C++ supports Function Overloading. You can have multiple functions with the exact same name, as long as they have a different number of parameters or different types of parameters. The compiler is smart enough to pick the right one.",
        code: `// Default parameter
void greet(string name = "Guest") {
  cout << "Hello " << name << "\\n";
}

// Function Overloading
int plusFunc(int x, int y) { 
  return x + y; 
}
double plusFunc(double x, double y) { 
  return x + y; 
}

int main() {
  greet("Alice"); // Hello Alice
  greet();        // Hello Guest
  
  cout << plusFunc(8, 5);       // Calls the int version
  cout << plusFunc(4.3, 6.26);  // Calls the double version
}`,
        trick: "Default parameters must always be at the END of the parameter list. Writing `void myFunc(int a = 5, int b)` is completely invalid and will not compile, because if you pass one argument `myFunc(10)`, the compiler won't know whether to map it to 'a' or 'b'."
      }
    ]
  },
  {
    id: "function_arrays",
    title: "8. Functions with Arrays",
    description: "Passing arrays to functions requires special care in C++ as arrays naturally degrade into pointers, losing their size information.",
    sections: [
      {
        title: "Passing Arrays to a Function",
        content: "You can pass arrays to a function just like standard variables. However, you must specify the array name without brackets when you call it. \n\nMost importantly, when you pass an array to a function, it \"decays\" into a raw pointer. It forgets how large it is! Therefore, you MUST pass the array size manually as a secondary parameter so your loop knows when to stop.",
        code: `void printArray(int arr[], int size) {
  // We MUST use the size parameter, sizeof(arr) will just give the size of a pointer!
  for (int i = 0; i < size; i++) {
    cout << arr[i] << " ";
  }
}

int main() {
  int numbers[5] = {10, 20, 30, 40, 50};
  
  // Pass the array name and its explicit size
  printArray(numbers, 5); 
  
  return 0;
}`,
        trick: "When you pass an array to a function, you are inherently passing a pointer to the first element (it is implicitly Pass-by-Reference). This means if you change `arr[0]` inside the function, the original array in `main()` is permanently changed! You do not need to use `&` or return the array to mutate it."
      }
    ]
  },
  {
    id: "structures",
    title: "9. Structures (Structs)",
    description: "Structures (structs) allow you to aggregate related disparate data. Let's delve into nested structs, initialization arrays, and modeling relationships.",
    sections: [
      {
        title: "Declaring and Using a Struct",
        content: "Unlike an array which can only hold one data type (all ints, or all strings), a structure can contain countless different data types. Each variable in the structure is known as a \"member\".\n\nTo create a structure, use the `struct` keyword, name it, and declare each of its members inside curly braces. Note the mandatory semicolon `;` at the end of the struct block!\n\nAfter declaration, you create \"instances\" of the struct and access members using the dot syntax (`.`).",
        code: `struct Car {
  string brand;
  string model;
  int year;
}; // Semicolon is mandatory!

int main() {
  Car myCar1;               // Create an instance
  myCar1.brand = "BMW";     // Access using dot syntax
  myCar1.model = "X5";
  myCar1.year = 1999;
  
  cout << myCar1.brand << " " << myCar1.model;
  return 0;
}`
      },
      {
        title: "Struct Initialization & Nesting",
        content: "You don't have to assign variables one by one. You can use an \"initializer list\" using curly braces `{}`. The values assigned must correspond directly with the order defined in the struct.\n\nYou can also place a struct inside another struct. This allows you to model complex, real-world hierarchical relationships (e.g. an Engine belongs to a Car).",
        code: `struct Engine {
  int horsepower;
  int cylinders;
};

struct Car {
  string brand;
  int year;
  Engine eng; // Nested struct
};

int main() {
  // Initializer list assigns elements top-to-bottom
  Car myCar = {"Toyota", 2022, {300, 6}};
  
  // Access a property inside the nested struct
  cout << myCar.eng.horsepower; 
  return 0;
}`,
        trick: "If you only partially initialize a struct using a list, like `Car c = {\"Ford\"};`, the remaining numeric or boolean members are automatically guaranteed to be zero-initialized. This is a very clean way to clear a struct!"
      },
      {
        title: "Arrays of Structs",
        content: "Structs are incredibly potent when put into arrays. They allow you to hold flat database-like tables of information, where every row is an index and every column is a struct member.",
        code: `struct Student {
  string name;
  float gpa;
};

int main() {
  Student classroom[3] = {
    {"Alice", 3.8},
    {"Bob", 3.2},
    {"Charlie", 4.0}
  };
  
  for(int i = 0; i < 3; i++) {
    cout << classroom[i].name << " has a GPA of " << classroom[i].gpa << "\\n";
  }
}`
      }
    ]
  },
  {
    id: "classes_objects",
    title: "10. Objects & Classes",
    description: "C++ is a powerhouse Object-Oriented Programming (OOP) language. Grasping encapsulation, constructors, and access modifiers is paramount here.",
    sections: [
      {
        title: "Classes and Access Specifiers",
        content: "A Class is basically a blueprint or a mold, and Objects are the actual instances cast from that mold. To create a class, use the `class` keyword.\n\nClasses have **Access Specifiers** that serve as a security boundary defining who can read or write the properties.\n- `public`: Accessible from anywhere outside the class.\n- `private`: Accessible ONLY from inside the class's own methods (functions).",
        code: `class Employee {
  private:
    int id; // Cannot be accessed directly from main!

  public:
    string name;
    
    // A public method inside the class
    void printDetails() {
      cout << "Employee: " << name;
    }
};`,
        trick: "Struct vs Class: In C++, they are almost exactly the same thing under the hood! The ONLY difference is that by default, everything in a `struct` is `public`, whereas everything in a `class` is inherently `private` unless you explicitly type `public:`."
      },
      {
        title: "Encapsulation & Data Hiding",
        content: "### What is Encapsulation?\n\n**Encapsulation** is one of the four key Pillars of Object-Oriented Programming (OOP). It refers to the practice of **bundling data (variables) and the methods (functions) that operate on that data into a single unit (a Class)**, while simultaneously **restricting direct access** to some of the object's components. \n\nIn C++, encapsulation is achieved by:\n1. Setting class attributes as `private` (so they cannot be accessed or modified from outside the class directly).\n2. Exposing public `get` and `set` methods (getters and setters) to view and modify the attributes in a controlled, validated manner.\n\n---\n\n### Why Does Encapsulation Matter? (The Real Benefits)\n\n1. **Total Control of Data & Validation:** By forcing developers to use setters, you can validate the incoming input. For example, if a user tries to set an age to `-10` or a bank deposit to `-500`, your code can reject the operation or display an error.\n2. **Read-Only / Write-Only Access:** If you omit a setter method entirely, the attribute becomes **Read-Only**! If you omit a getter method, the attribute becomes **Write-Only** (such as a database password field or credit card security code).\n3. **Flexibility and Robustness:** If you decide to change the internal data type of a class property (e.g., from `float` to `double` or using a string to represent currency), you only need to modify the internal code of the getter/setter functions. Any external code calling your class won't break!\n4. **Enhanced Security:** Encapsulation hides the inner workings of your program, protecting code from accidental corruption or unauthorized tampering by other programmers.",
        code: `#include <iostream>
using namespace std;

class BankAccount {
  private:
    // Hidden attributes (Not directly accessible in main)
    string ownerName;
    double balance;

  public:
    // Constructor to initialize values
    BankAccount(string name, double initialBalance) {
      ownerName = name;
      
      // Initial validation
      if (initialBalance >= 0) {
        balance = initialBalance;
      } else {
        balance = 0;
        cout << "Warning: Initial balance cannot be negative. Set to 0.\\n";
      }
    }

    // Setter for ownerName (Write)
    void setOwnerName(string name) {
      if (!name.empty()) {
        ownerName = name;
      }
    }

    // Getter for ownerName (Read)
    string getOwnerName() {
      return ownerName;
    }

    // Getter for Balance (Read-Only: No public setBalance exists!)
    double getBalance() {
      return balance;
    }

    // Business Logic Method to modify balance safely
    void deposit(double amount) {
      if (amount > 0) {
        balance += amount;
        cout << "Successfully deposited $" << amount << "\\n";
      } else {
        cout << "Error: Deposit amount must be positive!\\n";
      }
    }

    // Business Logic Method to withdraw safely
    bool withdraw(double amount) {
      if (amount <= 0) {
        cout << "Error: Withdrawal amount must be positive!\\n";
        return false;
      }
      if (amount > balance) {
        cout << "Error: Insufficient funds! Current balance: $" << balance << "\\n";
        return false;
      }
      
      balance -= amount;
      cout << "Successfully withdrew $" << amount << "\\n";
      return true;
    }
};

int main() {
  // Creating an instance
  BankAccount account("Muhammad Mahran", 1000.00);

  // Trying to access raw private attributes directly will fail to compile!
  // account.balance = -9000; // COMPILER ERROR: balance is private

  // Perform secure transactions
  account.deposit(500);
  account.withdraw(200);

  // Read the attributes safely using public getters
  cout << "Account Holder: " << account.getOwnerName() << "\\n";
  cout << "Current Balance: $" << account.getBalance() << "\\n";

  // Try to exploit negative numbers
  account.deposit(-150); // Will be caught and rejected!
  account.withdraw(5000); // Will be caught and rejected (overdraft prevention)!

  return 0;
}`,
        trick: "A great rule of thumb: ALWAYS make your member variables `private` by default. Only make them `public` if they are pure passive data elements with absolutely zero rules applied (or if you are coding a simple, direct `struct`). This keeps your architecture clean, pristine, and incredibly robust!"
      },
      {
        title: "Constructors & External Methods",
        content: "A **constructor** is a special method automatically executed the instant an object is created. It must share the exact same name as the class, and it mathematically has no return type (not even `void`).\n\nAdditionally, to keep class blueprints clean and readable, you should declare your methods inside the class, but define their logic outside the class block using the scope resolution operator `::`.",
        code: `class Car {
  public:
    string brand;
    
    // Constructor declaration
    Car(string b); 
    
    // Method declaration
    void honk(); 
};

// Constructor definition outside the class
Car::Car(string b) { 
  brand = b;
}

// Method definition outside the class
void Car::honk() {
  cout << "Beep beep!";
}

int main() {
  Car carObj("BMW");
  carObj.honk();
  return 0;
}`,
        trick: "You can overload constructors! Meaning you can have one `Car()` constructor taking no parameters, and another `Car(string b)` constructor taking a string. C++ automatically picks the correct one based on how you initialize the object in `main()`."
      }
    ]
  },
  {
    id: "pointers_references",
    title: "11. References & Pointers",
    description: "Pointers and references are C++'s superpower. Learn how to work with memory addresses directly, creating lightweight relationships between variables, structs, and objects.",
    sections: [
      {
        title: "References (&)",
        content: "A **reference variable** is an alias, that is, another name for an existing variable. Once a reference is initialized to a variable, either the variable name or the reference name may be used to refer to the variable.\n\nYou create a reference using the ampersand operator `&` in the variable type declaration.",
        code: `string food = "Pizza";
string &meal = food; // meal is a reference to food

cout << food << "\\n"; // Outputs "Pizza"
cout << meal << "\\n"; // Outputs "Pizza"

meal = "Pasta"; // Changing meal changes food!
cout << food << "\\n"; // Outputs "Pasta"`,
        trick: "References are simpler than pointers because they cannot be null and cannot be reassigned to refer to another variable after creation. They are the ideal choice for passing heavy variables, classes, and structs into functions safely."
      },
      {
        title: "Memory Address & Pointers (*)",
        content: "Every variable in your computer has a physical memory address where its data is stored. You can access this address using the address-of operator `&`.\n\nA **pointer** is a variable that stores the memory address of another variable as its value. You declare a pointer using the asterisk symbol `*` after the data type.",
        code: `string food = "Pizza";
string* ptr = &food; // Pointer declaration. Stores the address of food

cout << food << "\\n";  // Outputs "Pizza"
cout << &food << "\\n"; // Outputs the memory address (e.g. 0x7ffe536)
cout << ptr << "\\n";   // Outputs the memory address (e.g. 0x7ffe536)`,
        trick: "The asterisk `*` has two completely different uses here. In a declaration (`string* ptr`), it tells the compiler that ptr is a pointer. In an expression (`*ptr`), it performs a read/write operation on the address. Don't let this dual meaning confuse you!"
      },
      {
        title: "Dereferencing Pointers",
        content: "Once you have a pointer storing a memory address, you can access the actual value stored at that address by using the **dereference operator** `*` (asterisk). You can also use dereferencing to change the value of that original variable.",
        code: `string food = "Pizza";
string* ptr = &food;

// Dereference: Output the value of food through ptr
cout << *ptr << "\\n"; // Outputs "Pizza"

// Change the value of food through ptr
*ptr = "Hamburger";
cout << food << "\\n"; // Outputs "Hamburger"`,
        trick: "Pointer to Struct or Class: When you have a pointer to a struct or object, accessing members with `*ptr.brand` is invalid due to order of operations. You must use `(*ptr).brand` or the elegant arrow operator `ptr->brand`. This is standard in professional C++!"
      }
    ]
  },
  {
    id: "inheritance_polymorphism",
    title: "12. Inheritance & Polymorphism",
    description: "The peak of Object-Oriented Programming (OOP). Share attributes and methods across hierarchical structures and write dynamic, polymorphic code.",
    sections: [
      {
        title: "Inheritance",
        content: "In C++, it is possible to inherit attributes and methods from one class to another. This is grouped into two categories:\n- **Derived Class** (child): the class that inherits from another class.\n- **Base Class** (parent): the class being inherited from.\n\nTo inherit from a class, use the colon `:` symbol followed by an access specifier (usually `public`) and the base class name.",
        code: `// Base Class
class Vehicle {
  public:
    string brand = "Ford";
    void honk() {
      cout << "Tuut, tuut!\\n";
    }
};

// Derived Class
class Car : public Vehicle {
  public:
    string model = "Mustang";
};

int main() {
  Car myCar;
  myCar.honk(); // Call inherited method!
  cout << myCar.brand << " " << myCar.model; // Access both brand and model
  return 0;
}`,
        trick: "C++ supports MULTIPLE inheritance, meaning a child class can inherit from more than one parent! E.g. `class FlyingCar : public Car, public Airplane`. This is incredibly powerful but must be used carefully to avoid conflicts."
      },
      {
        title: "Polymorphism & Method Overriding",
        content: "Polymorphism means 'many forms', and it occurs when we have many classes that are related to each other by inheritance.\n\nFor example, if we have a base class `Animal` with a method `animalSound()`, and derived classes like `Pig` and `Dog`, we can override the parent method so that each animal speaks in its own style.",
        code: `// Base class
class Animal {
  public:
    // virtual keyword lets derived classes override this method dynamically!
    virtual void animalSound() {
      cout << "The animal makes a sound\\n";
    }
};

// Derived class
class Pig : public Animal {
  public:
    void animalSound() override {
      cout << "The pig says: wee wee\\n";
    }
};

// Derived class
class Dog : public Animal {
  public:
    void animalSound() override {
      cout << "The dog says: bow wow\\n";
    }
};

int main() {
  Animal* myAnimal = new Animal();
  Animal* myPig = new Pig();
  Animal* myDog = new Dog();

  myAnimal->animalSound();
  myPig->animalSound(); // Outputs "The pig says: wee wee"
  myDog->animalSound(); // Outputs "The dog says: bow wow"
  return 0;
}`,
        trick: "Use the `virtual` keyword in the Base Class, and the `override` keyword in the Derived Class. Without `virtual`, C++ will use compile-time binding and execute the Parent method instead of the Child method if accessed via a Parent Pointer! Always make destructors `virtual` as well."
      }
    ]
  }
];
