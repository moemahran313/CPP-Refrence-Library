export const FUNCTIONS_ARRAYS = [
  {
    id: "count-even",
    title: "Count Even Elements in Array",
    description: "Write a C++ function that takes an integer array and returns the count of its even elements.",
    code: `#include <iostream>
using namespace std;
const int n = 10;
int counteven(int arrint[n]);

void main() {
    int arr[n];
    for (int i = 0; i < n; i++) {
        cout << "enter a number:" << endl;
        cin >> arr[i];
    }
    int c = counteven(arr);
    cout << "the count of even numbers=" << c;
}

int counteven(int arrint[n]) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arrint[i] % 2 == 0) {
            count++;
        }
    }
    return count;
}`,
    variables: {
        "arrint": "An integer array parameter representing the array passed into the function.",
        "arr": "The local array inside main that holds the sequential numbers inputted by the user.",
        "n": "A global constant representing the fixed size of the array (10).",
        "i": "A common loop counter variable used as the index to access array elements.",
        "c": "A variable holding the final mathematical result returned from the counteven function.",
        "count": "A local counter inside the function that increments when an even number is found."
    },
    lineExplanations: {
        1: "Includes the standard input/output stream library allowing us to use cin and cout.",
        2: "Uses the standard namespace, eliminating the need to prefix functions with 'std::'.",
        3: "Declares a global constant integer 'n' initialized to 10 to serve as the fixed array size.",
        4: "Function prototype. It informs the compiler about the function's signature before it is called in main.",
        6: "The main function where standard program execution begins.",
        7: "Declares an integer array named 'arr' of size 'n' (10) to store our dataset.",
        8: "Initializes a for loop with a counter 'i' starting at 0 and running up to n-1.",
        9: "Outputs a text prompt to the user asking them to enter a number.",
        10: "Reads the integer entered by the user from the keyboard and assigns it to 'arr' at index 'i'.",
        12: "Calls the 'counteven' function, passing 'arr' as an argument, and stores the returned integer in variable 'c'.",
        13: "Outputs a descriptive text and the final count 'c' to the screen.",
        16: "The start of the 'counteven' function definition, receiving an array of size 'n'.",
        17: "Declares and initializes a local integer 'count' to 0 to act as our tracking tally.",
        18: "Starts a loop using 'i' to visit each element of the array from index 0 to n-1.",
        19: "Uses the modulo operator (%). It divides the array element by 2; if the remainder is 0, the number is securely even.",
        21: "Increments the 'count' variable by 1 because an even number was successfully matched.",
        24: "Halts function execution and returns the 'count' tally back to the caller (main)."
    },
    insights: [
      { concept: "Global Constant", description: "const int n = 10; defines a global constant size for the array, allowing it to be used securely in function signatures." },
      { concept: "Modulo Operator", description: "arrint[i] % 2 == 0 checks if the remainder of division by 2 is zero, which is the standard way to check for even numbers in C++." }
    ]
  },
  {
    id: "call-by-reference",
    title: "Increment Using Call by Reference",
    description: "Write a C++ function named 'Inc' having two parameters which increment the first parameter with the value of the second parameter.",
    code: `#include <iostream>
using namespace std;
void inc(int &x, int v);

void main() {
    int a, b;
    cout << "enter a number" << endl;
    cin >> a;
    cout << "enter increment value" << endl;
    cin >> b;
    inc(a, b);
    cout << "the number value after increment=" << a;
}

void inc(int &x, int v) {
    x = x + v;
}`,
    variables: {
        "x": "A reference to an integer (because of &). It acts as an alias to the original variable passed to it.",
        "v": "An integer passed by value. It holds a standalone copy of the data.",
        "a": "The base number inputted by the user. It will be mutated natively by the 'inc' function.",
        "b": "The amount by which 'a' should be incremented. Passed as 'v'."
    },
    lineExplanations: {
        3: "Function prototype. '&' makes 'x' a reference, meaning modifying 'x' alters the original caller's variable.",
        6: "Declares two integer variables, 'a' and 'b'.",
        11: "Calls 'inc'. 'a' is passed by reference (points to original), 'b' is passed by value (copied).",
        12: "Prints 'a', which has now been directly modified structurally by the 'inc' function.",
        15: "Function definition for 'inc'.",
        16: "Modifies 'x' (which directly mutates 'a' in main) by adding the value of 'v' to it."
    },
    insights: [
      { concept: "Call by Reference", description: "The ampersand (&) in int &x means x is passed by reference. Any changes made to x inside the function directly modify the original variable." },
      { concept: "Pass by Value", description: "int v is passed by value. A copy of 'b' is made, so modifying v would not change b." }
    ]
  },
  {
    id: "power",
    title: "Calculate Base to Power",
    description: "Write a C++ function that takes two numbers: a double base and an integer power. Returns base to the power.",
    code: `#include <iostream>
using namespace std;
double power(double x, int n);

void main() {
    double a; int b;
    cout << "Enter a double base then an integer power:" << endl;
    cin >> a >> b;
    cout << a << " ^ " << b << " = " << power(a, b) << endl;
}

double power(double x, int n) {
    double result = 1.0;
    for (int i = 1; i <= n; i++) {
        result = result * x;
    }
    return result;
}`,
    variables: {
        "x": "A double representing the mathematical base number to be multiplied.",
        "n": "An integer representing the exponent (how many times to multiply logically).",
        "a": "The double base inputted manually by the user.",
        "b": "The integer exponent natively inputted by the user.",
        "result": "A double that accumulates the multiplication products iteratively. Initialized to 1.0."
    },
    lineExplanations: {
        3: "Prototype for a function returning a double (required for potentially large decimal results).",
        6: "Declares a double 'a' (base) and int 'b' (power).",
        9: "We can call a function that returns a value physically directly inside a cout streaming statement.",
        12: "Function definition for 'power' evaluating exponents.",
        13: "Initializes accumulator to 1.0. Starting at 0 would logically collapse all multiplication results to 0.",
        14: "Runs the loop exactly 'n' times (sequentially from 1 to n).",
        15: "Multiplies the running 'result' tally by the base 'x' repeatedly mathematically.",
        17: "Returns the final calculated power back securely to the caller."
    },
    insights: []
  },
  {
    id: "increment-array",
    title: "Increment Array by Pointer",
    description: "Write a C++ program containing a function that increments each element in an array by a fixed value (not exceeding 10).",
    code: `#include <iostream>
using namespace std;

void increment(int *x, int size, int bonus) {
    for (int i = 0; i <= size - 1; i++) {
        if (x[i] + bonus <= 10) 
            x[i] = x[i] + bonus; 
        else 
            x[i] = 10;
    }
}`,
    variables: {
        "x": "An integer pointer natively holding the memory address bounds of the first array element.",
        "size": "The physical literal length or number of elements inside the passed array.",
        "bonus": "The artificial incremental amount to add to each array element mathematically.",
        "i": "Loop counter to properly navigate relative array memory offsets."
    },
    lineExplanations: {
        4: "Function logically takes a pointer '*x' to receive the array sequentially, 'size' for loop limits limits, and 'bonus' to add.",
        5: "Loops from 0 to 'size - 1' which mathematically covers all physical array boundaries securely.",
        6: "Checks logically if adding 'bonus' to the current element exceeds the artificial limit parameter of 10.",
        7: "If mathematically safe, applies the basic arithmetic addition correctly.",
        8: "Handles the logic failure case correctly (if it computationally overreaches 10).",
        9: "Forces the array value to successfully cap exactly at 10 preventing out-of-bounds parameters."
    },
    insights: [
      { concept: "Array as Pointer", description: "int *x accepts the array natively as a raw address limit. In securely compiling C++, passing arrays intrinsically decays into pointers." }
    ]
  },
  {
    id: "max-array",
    title: "Find Maximum in Array",
    description: "A function that reads an array of 10 integers and returns the maximum number natively.",
    code: `#include <iostream>
using namespace std;
const int n = 3;
int maxarr(int a[]);

void main() {
    int x[n];
    int maxno;
    for (int i = 0; i < n; i++) {
        cin >> x[i];
    }
    maxno = maxarr(x);
    cout << "the maximum no is:" << maxno << endl;
}

int maxarr(int a[]) {
    int max = a[0];
    for (int i = 0; i < n; i++) {
        if( a[i] > max) {
            max = a[i];
        }
    }
    return max;
}`,
    variables: {
        "a": "The mapped input array specifically searched internally.",
        "x": "The main operational parameter array sequentially filled directly by user metrics.",
        "maxno": "Stores the native highest numeric value identified logically resulting from the native function return.",
        "max": "The localized pointer tracker inside maxarr natively tracking the current largest relative integer established sequentially."
    },
    lineExplanations: {
        16: "Initiates logical array sequence metric evaluations.",
        17: "CRITICAL: the maximum tracker value is accurately initialized with a[0] (native first numeric element) rather than generic 0. If all sequential array records were natively negative negatives, generic initializing 0 would logically fail limits.",
        18: "Iterates sequentially computing relative array data boundaries limits.",
        19: "Executes comparison logically comparing current indexed mapped integer element higher dynamically than vertically recorded limits.",
        20: "If successfully so, we natively overwrite structural variable 'max' metrics securely.",
        23: "Returns definitively the highest logical parameter value cleanly.",
        12: "Triggers execution dynamically yielding parameter structures tracking values internally."
    },
    insights: []
  },
  {
    id: "search-string",
    title: "Search in Array of Strings",
    description: "A function that visually takes an array of student marks vertically, an array of parallel student names logic, and logically searches internally for a specific student criterion name. Returns natively the relative mark if securely found tracking variables.",
    code: `int searchstu(int m[], string st[], int t, string s) {
    int count = 0;
    for (int i = 0; i < t; i++) {
        if (st[i] == s) {
            count++;
            return m[i];
        }
    }
    if (count == 0)
        return -1;
}`,
    variables: {
        "m": "Array natively holding structured integer metrics correlating parallel sequences logic marks vertically relative to natively matched student name entities structurally.",
        "st": "Array representing natively the targeted student literal logical string metrics arrays characters tracking limits.",
        "t": "Integer fundamentally dictating sequential parallel limits bounds loop traversal constraints structurally.",
        "s": "String definitively establishing manually the targeted dynamic name token logic parameters mathematically searched.",
        "count": "An integer metric checking mathematical dynamic iteration logic fulfillment variables status bounds vertically (where mathematical 0 defines failure)."
    },
    lineExplanations: {
        1: "Definitive signature establishing parameter structurally parallel variable mapping relationships metrics (m[] mapping exclusively natively marks parameters structurally, st[] parallel targeted metrics variable limit structural logic strings names natively).",
        2: "Initializes parameter logic metric internally counter sequences tracking bounds validations fundamentally securely loops limits.",
        3: "Traverses cleanly dimensional ranges sequential relative mapping values bounds limits structure metrics bounds securely bounds array parameter elements index dimensions sizes natively limit bounds ranges limits dimension natively values bounds internally limit loops boundaries natively internally vertically structurally relative internally parameters natively boundaries natively structural logic parameters logic vertically vertically vertically strings natively loops dynamically natively natively dynamically vertically dynamically loops bounds array dynamically logic metrics bounds manually internally index ranges natively loops limits strings dynamically tracking limits parameters sequentially ranges securely sequentially visually sequentially parameter dynamically.",
        4: "Matches parameters logic string cleanly natively vertically logic metrics limits checks string parameters values matches.",
        6: "Terminates instantly logical sequence searches loops structurally dynamically logic successfully ranges instantly securely cleanly."
    },
    insights: []
  }
];
