export const MCQS = [
  {
    question: "Which of the following is a legal call to the displayOutput function given void displayOutput(int total);?",
    options: ["void displayOutput(int total);", "void displayOutput(myTotal);", "displayOutput(int mytotal);", "displayOutput(myTotal);", "cout << displayOutput(myTotal);"],
    correctAnswer: 3,
    trick: "Function calls do not include return types or parameter types, only the function name and the arguments. You simply drop the 'void' and the 'int'."
  },
  {
    question: "What is wrong with the following code? float scores[10], total;",
    options: ["Cannot declare regular and array variables together.", "Arrays must be integers", "The 10 should be replaced with a variable name", "Nothing."],
    correctAnswer: 3,
    trick: "It is perfectly legal in C++ to declare arrays and regular variables of the same data type in one single statement! The array size is also valid."
  },
  {
    question: "Given an array named scores with 25 elements, what is the correct way to access the 25th element?",
    options: ["scores+25", "scores[24]", "scores[25]", "scores[last]"],
    correctAnswer: 1,
    trick: "Array indices in C++ are 0-based. The first element is at index 0, so the 25th element is at index 24 (n-1 formula)."
  },
  {
    question: "Which of the following will correctly assign all the values in one array to the other array? (Assume same type and SIZE elements)",
    options: ["array1=array2;", "array1[ ]=array2;", "for(i=0; i<SIZE ;i++) array1[i]=array2[i];", "for(i=0; i<SIZE ;i++) array1[ ]=array2[ ];"],
    correctAnswer: 2,
    trick: "You cannot assign an entire array directly using the '=' operator. You must explicitly loop through and assign element by element."
  },
  {
    question: "Which of the following will read values from the keyboard into the array? (Assume size SIZE)",
    options: ["cin >> array;", "cin >> array[];", "cin >> array[SIZE];", "for(i=0; i<SIZE; i++) cin>> array[i];"],
    correctAnswer: 3,
    trick: "Similar to arrays, you cannot read an entire array at once with 'cin'. You must loop and read input for each individual element."
  },
  {
    question: "What is the value of choice after the following statements executes? (See code snippet logic where count=3 is passed to getChoice(choice, count))",
    options: ["3", "0", "-1", "99"],
    correctAnswer: 3,
    trick: "Because count (passed as y) is 3, y is neither < 0 nor == 0. The else block assigns 99 to x. Since x is passed by reference (int& x), choice becomes 99."
  },
  {
    question: "Given structure definitions (PersonType containing DateType birthday), what is the correct way to print the birth year?",
    options: ["cout << person.birthday.year;", "cout << year;", "cout << birthday.year;", "cout << person.year;"],
    correctAnswer: 0,
    trick: "To access nested structure elements, you must chain the dot operator, starting from the outermost variable name: person.birthday.year"
  },
  {
    question: "Which of the following is the correct order of evaluation for the below expression? z = x + y * z / 4 % 2 - 1",
    options: ["* / % + -", "= * / % +", "/ * % + -", "* % / + -"],
    correctAnswer: 0, 
    trick: "First comes (*, /, %) from left to right. Then (+, -) from left to right."
  },
  {
     question: "In which order do the following get evaluated? 1. Relational 2. Arithmetic 3. Logical 4. Assignment",
     options: ["2, 1, 3, 4", "1, 2, 3, 4", "4, 3, 2, 1", "3, 2, 1, 4"],
     correctAnswer: 0,
     trick: "Order: 1) Arithmetic (*,/,%,+,-), 2) Relational (<, <=, >, >=, ==, !=), 3) Logical (!, &&, ||), 4) Assignment (=)."
  },
  {
     question: "The operator used to get value at address stored in a pointer variable is:",
     options: ["*", "&", "&&", "||"],
     correctAnswer: 0,
     trick: "The '*' operator is the dereference operator (gets value). '&' gets the memory address."
  },
  {
     question: "Which of the following cannot be checked in a switch statement?",
     options: ["Character", "Integer", "Float", "Enum"],
     correctAnswer: 2,
     trick: "Switch statements require discrete, countable values (integer-based). Floats possess precision issues, so they are not allowed."
  },
  {
     question: "How many times will the while loop get executed? int j=1; while(j <= 255) { cout<<j; j++; }",
     options: ["Infinite times", "255 times", "256 times", "254 times"],
     correctAnswer: 1,
     trick: "The loop starts at 1 and goes up to AND INCLUDING 255 because of the '<=' operator. Total iterations: 255."
  },
  {
     question: "How many times 'Welcome' is printed? (for x=-1; x<=10; x++) with if(x<5) continue; else break;",
     options: ["Infinite times", "11 times", "0 times", "10 times"],
     correctAnswer: 2,
     trick: "When x < 5, 'continue' skips printing. At x = 5, the else block runs 'break' and exists the loop completely. The print statement is never reached!"
  },
  {
     question: "The keyword used to transfer control from a function back to the calling function is:",
     options: ["Switch", "Goto", "Go back", "Return"],
     correctAnswer: 3,
     trick: "The 'return' statement terminates execution of the function and returns control (and optionally a value) to the caller."
  },
  {
     question: "What will happen if in a C++ program you assign a value to an array element whose subscript exceeds the size of array?",
     options: ["The element will be set to 0", "The compiler reports an error", "The program may crash if important data is overwritten", "The array size grows appropriately"],
     correctAnswer: 2,
     trick: "C++ does NOT check array bounds. Writing past an array overwrites adjacent memory, causing undefined behavior or crashes."
  },
  {
     question: "What does the following declaration mean? int (*ptr)[10];",
     options: ["ptr is array of pointers to 10 integers", "ptr is a pointer to an array of 10 integers", "ptr is an array of 10 integers", "ptr is a pointer to array"],
     correctAnswer: 1,
     trick: "The parentheses change precedence! (*ptr) makes it a pointer first, then [10] makes it point to an array of 10 ints."
  },
  {
     question: "In C++, if you pass an array as an argument to a function, what actually gets passed?",
     options: ["Value of elements in array", "First element of the array", "Base address of the array", "Address of the last element"],
     correctAnswer: 2,
     trick: "Arrays are implicitly passed by pointer in C++ to save memory. The 'base address' (address of index 0) is what actually gets sent."
  },
  // True / False converted to MCQ format to maintain one unified analyzer engine
  {
    question: "True or False: The 'do...while' loop tests the condition before executing the loop body.",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! A do-while loop tests the condition AFTER executing the body, ensuring the body runs at least once."
  },
  {
    question: "True or False: A function declaration tells the compiler about a function's name and return type only.",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! A function declaration must tell the compiler the name, return type, AND the parameters."
  },
  {
    question: "True or False: The array stores a fixed-size sequential collection of elements of different types.",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! Elements in a C++ array MUST be of the SAME data type (homogenous collection)."
  },
  {
    question: "True or False: You can overload function declarations that differ only by return type.",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! Function overloads MUST differ by parameter types or number of parameters. Return type alone is not enough."
  },
  {
    question: "True or False: The parameters listed in a function declaration are considered global variables.",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! Parameters are strictly local variables, scoped only to the function body."
  },
  {
    question: "True or False: In C++ all functions except main() can be called recursively.",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! Even the main function can be called recursively in standard C++ (though it's rare and not recommended)."
  },
  {
    question: "Are the expressions 'arr' and '&arr' the exact same for an array of 10 integers?",
    options: ["Yes, they are identical", "No, they are different"],
    correctAnswer: 1,
    trick: "No! 'arr' gives the address of the FIRST integer (int*), whereas '&arr' gives the address of the ENTIRE array (int (*)[10])."
  },
  {
    question: "True or False: We can use a switch statement to switch on strings.",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! You cannot switch on strings in C++. Switch only works on integral types like int, char, or enum."
  },
  {
    question: "Are the expressions *ptr++ and ++*ptr the same?",
    options: ["Yes, they do the exact same thing", "No, they are different operations"],
    correctAnswer: 1,
    trick: "No! *ptr++ increments the POINTER itself, whereas ++*ptr increments the VALUE being pointed to by the pointer."
  },
  {
    question: "True or False: The user can change the length of any array during run-time.",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! the length of static arrays is fixed at compile-time. Only dynamic arrays (allocated with 'new') can be sized at run-time."
  },
  {
    question: "True or False: The opposite condition of (x > 3) && (x < 10) is (x < 3) && (x > 10).",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! According to De Morgan's Laws, the opposite is (x <= 3) || (x >= 10)."
  },
  {
    question: "What is the equivalent of 'y = x++' if assuming x begins at 5?",
    options: ["y=5, x=6", "y=6, x=6", "y=6, x=5", "y=5, x=5"],
    correctAnswer: 0,
    trick: "Post-increment! Assign the old value of x (5) into y first, THEN increment x to 6. Correct is False if stated as y=++x."
  },
  {
    question: "If y = 6 and x = 2, then x % y = 0. True or False?",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! 2 % 6 = 2. When you modulo a smaller number by a larger number, the remainder is ALWAYS the smaller number itself."
  },
  {
    question: "True or False: The ASCII Code is used to represent numerical sets of data.",
    options: ["True", "False"],
    correctAnswer: 1,
    trick: "False! ASCII stands for American Standard Code for Information Interchange. It represents CHARACTER sets (letters, symbols), not numerical sets."
  },
  { question: "True or False: The body of the while loop may never execute.", options: ["True", "False"], correctAnswer: 0, trick: "True! If the initial condition is false, a while loop will skip its body entirely." },
  { question: "True or False: Structure is a user defined data type which allows you to combine data items of different kinds.", options: ["True", "False"], correctAnswer: 0, trick: "True! Structs group variables of mixed data types, unlike arrays which require the same type." },
  { question: "True or False: The data and function that operate on data are bundled as a unit called an object.", options: ["True", "False"], correctAnswer: 0, trick: "True! In Object-Oriented Programming (OOP) for C++, bundling them together is the core definition of an object." },
  { question: "True or False: The following is legal in a void function: return;", options: ["True", "False"], correctAnswer: 0, trick: "True! Using an empty 'return;' is perfectly legal and is used to early exit a void function." },
  { question: "True or False: The pointer should always be initialized.", options: ["True", "False"], correctAnswer: 1, trick: "False! Pointers may be uninitialized (though it's risky). References, however, MUST be initialized." },
  { question: "True or False: A function may have any number of return statements each returning different values.", options: ["True", "False"], correctAnswer: 0, trick: "True! You can have multiple return statements (e.g. inside if-else blocks), though only one executes per call." },
  { question: "True or False: Names of functions in two different files linked together must be unique.", options: ["True", "False"], correctAnswer: 0, trick: "True! C++ uses a global namespace for functions across linked files (unless namespaced/static)." },
  { question: "True or False: A function cannot be defined inside another function.", options: ["True", "False"], correctAnswer: 0, trick: "True! nested function definitions are illegal in standard C++." },
  { question: "True or False: Functions cannot return more than one value at a time.", options: ["True", "False"], correctAnswer: 0, trick: "True! C++ functions inherently return exactly one value (or one composed object/struct/tuple)." },
  { question: "True or False: If return type for a function is not specified, it defaults to int.", options: ["True", "False"], correctAnswer: 0, trick: "True! Historically in C and older C++, if no type is given, it assumes int." },
  { question: "True or False: Functions can be called either by value or reference.", options: ["True", "False"], correctAnswer: 0, trick: "True! C++ supports pass-by-value and pass-by-reference." },
  { question: "True or False: A pointer to a block of memory is effectively the same as an array.", options: ["True", "False"], correctAnswer: 0, trick: "True! In C++, array names decay into pointers pointing to their first memory block." },
  { question: "True or False: We want to test whether a value lies in the range 2 to 4 or 5 to 7. Can we do this using a switch?", options: ["True", "False"], correctAnswer: 0, trick: "True! We can simply stack cases: case 2: case 3: case 4: ... " },
  { question: "True or False: A structure can be nested inside another structure.", options: ["True", "False"], correctAnswer: 0, trick: "True! You can nest structures deeply." },
  { question: "True or False: The '.' operator can be used to access structure elements using a structure variable.", options: ["True", "False"], correctAnswer: 0, trick: "True! This is the standard member access operator." },
  { question: "True or False: A structure can contain similar or dissimilar elements.", options: ["True", "False"], correctAnswer: 0, trick: "True! A struct can hold ints, strings, and even other structs simultaneously." },
  { question: "True or False: It is not possible to create an array of pointer to structures.", options: ["True", "False"], correctAnswer: 1, trick: "False! It is entirely possible to create an array of pointers to structs." },
  { question: "True or False: In the expression a=b=5 the order of Assignment is NOT decided by Associativity of operators.", options: ["True", "False"], correctAnswer: 1, trick: "False! It IS decided by associativity, specifically Right-to-Left associativity." },
  { question: "True or False: The length of a static array should be constant.", options: ["True", "False"], correctAnswer: 0, trick: "True! The compiler must know the exact memory size needed at compile-time." },
  { question: "True or False: Loops are used when we need our program to make a choice between two or more things.", options: ["True", "False"], correctAnswer: 1, trick: "False! Making choices uses Conditional Statements (if, switch). Loops repeat code." },
  { question: "True or False: It is legal to declare more than one variable in a single statement.", options: ["True", "False"], correctAnswer: 0, trick: "True! (e.g. int x, y, z;)." },
  { question: "True or False: The opposite of less than or equal (<=) is greater than or equal (>=).", options: ["True", "False"], correctAnswer: 1, trick: "False! The strict mathematical opposite of <= is just > (strictly greater than)." },
  { question: "True or False: All switch statements can be converted into nested if-else statements.", options: ["True", "False"], correctAnswer: 0, trick: "True! An if-else chain can perfectly replicate any switch logic." },
  { question: "True or False: All nested if-else statements can be converted into switch statements.", options: ["True", "False"], correctAnswer: 1, trick: "False! Switch cannot handle ranges, float conditions, or complex booleans!" },
  { question: "True or False: A break statement in a switch stops your program.", options: ["True", "False"], correctAnswer: 1, trick: "False! It only stops the switch case and exits the switch block, not the whole program." },
  { question: "True or False: The compiler ignores comments and does not translate them into machine code.", options: ["True", "False"], correctAnswer: 0, trick: "True! Comments are for humans only." },
  { question: "True or False: A data type determines how a value is represented in computer memory.", options: ["True", "False"], correctAnswer: 0, trick: "True! It dictates the bit layout and memory required." },
  { question: "True or False: When you create a variable, you reserve some space in memory.", options: ["True", "False"], correctAnswer: 0, trick: "True! Declaring a variable assigns memory space based on its type." },
  { question: "True or False: The name of a variable can be composed of letters, digits, and special characters.", options: ["True", "False"], correctAnswer: 1, trick: "False! The only special character allowed in an identifier is the underscore (_)." },
  { question: "True or False: An if statement must be followed by an else statement.", options: ["True", "False"], correctAnswer: 1, trick: "False! Else blocks are completely optional." },
  { question: "True or False: Program comments are explanatory statements that you can include in the C++ code.", options: ["True", "False"], correctAnswer: 0, trick: "True! Helps developers read and maintain source code." },
  { question: "True or False: If integer x = 5 then x / 2 exactly equals 2.5.", options: ["True", "False"], correctAnswer: 1, trick: "False! Because it's integer division, 5 / 2 truncates the decimal and evaluates to 2." },
  { question: "True or False: The modulo (%) operator can be used with float and integer operands.", options: ["True", "False"], correctAnswer: 1, trick: "False! Modulo (%) is strictly for Integer operands only in C++." }
];
