/******************************************************************************
1. Create a Simple Function

Task:
- Write a function called `greet` that logs `"Hello, world!"` to the console. Call the function to test it.
******************************************************************************/

function greet() {
    console.log("Hello, World!");
}

console.log("--- Task 1: Simple function ---");
greet();

/******************************************************************************
2. Function with Parameters

Task:
- Write a function called `greetUser` that takes a name as a parameter and logs `"Hello, [name]!"` to the console.
******************************************************************************/

function greetUser(name) {
    console.log(`Hello, ${name}`);
}

console.log("\n--- Task 2: Function with parameter ---");
console.log('Calling greetUser("John") →');
greetUser("John");

/******************************************************************************
3. Function with a Return Value

Task:
- Write a function called `addNumbers` that takes two numbers as parameters, adds them, and returns the result.
******************************************************************************/

function addNumbers(a, b) {
    return a + b;
}

console.log("\n--- Task 3: Function with a return value ---");
console.log("Adding 2 and 3: Result =", addNumbers(2, 3));

/******************************************************************************
3.1. BONUS: Modify the function to subtract, multiply or divide based on a third parameter
******************************************************************************/

function calculateNumbers(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return "Invalid operator";
    }
}

console.log("\n--- Task 3.1: Calculate Numbers with a third parameter ---");
console.log("2 + 3 =", calculateNumbers(2, 3, "+"));
console.log("2 - 3 =", calculateNumbers(2, 3, "-"));
console.log("2 * 3 =", calculateNumbers(2, 3, "*"));
console.log("2 / 3 =", calculateNumbers(2, 3, "/"));
console.log("Invalid operator '=' →", calculateNumbers(2, 3, "="));

/******************************************************************************
4. Convert a Function to an Arrow Function

Task:
- Convert this regular function to an arrow function.
******************************************************************************/

/* 
function multiply(a, b) {
    return a * b;
}
console.log(a, b); 
*/
const multiply = (a, b) => a * b;

console.log("\n--- Task 4: Arrow Function ---");
console.log(
    "Multiplying 2 and 3 using arrow function: Result =",
    multiply(2, 3)
);
console.log(
    "Multiplying 4 and 5 using arrow function: Result =",
    multiply(4, 5)
);

/******************************************************************************
5. Create a Higher-Order Function

Task:
- Write a higher-order function called `createMultiplier` that takes a number and returns a function that multiplies any number by that number.
******************************************************************************/

function createMultiplier(multiplier) {
    return function (a) {
        return a * multiplier;
    };
}
const double = createMultiplier(2);

console.log("\n--- Task 5: Higher Order Function ---");
console.log("Doubling 3: Result =", double(3));

/******************************************************************************
5.1. BONUS: Modify the function to log the result to the console directly
******************************************************************************/

function createMultiplierLog(multiplier) {
    return function (a) {
        const result = a * multiplier;
        console.log(`Multiplying ${a} by ${multiplier}: Result =`, result);
        return result;
    };
}

const triple = createMultiplierLog(3);

console.log("\n--- Task 5.1: CreateMultiplierLog function ---");
console.log("Calling triple(5) →");
triple(5);

/******************************************************************************
5.2. EXTRA CHALLENGE: FizzBuzz Function  

Task:  
- Create a function named `fizzBuzz` that takes a number as input and follows these rules:  

- If the number is divisible by 3, return `"Fizz"`.  
- If the number is divisible by 5, return `"Buzz"`.  
- If the number is divisible by both 3 and 5, return `"FizzBuzz"`.  
- Otherwise, return the number itself.
******************************************************************************/

function fizzBuzz(number) {
    if (number % 3 === 0 && number % 5 === 0) {
        return "FizzBuzz";
    } else if (number % 3 === 0) {
        return "Fizz";
    } else if (number % 5 === 0) {
        return "Buzz";
    } else {
        return number;
    }
}
console.log("\n--- Task 5.2: FizzBuzz ---");
console.log("FizzBuzz test for 3:", fizzBuzz(3));
console.log("FizzBuzz test for 5:", fizzBuzz(5));
console.log("FizzBuzz test for 15:", fizzBuzz(15));
console.log("FizzBuzz test for 7:", fizzBuzz(7));

/******************************************************************************
5.3. BONUS: Modify fizzbuzz into a higher order function that takes a callback function
******************************************************************************/

const fizzBuzzCallback = (number, callback) => callback(number);

console.log("\n--- Task 5.3: FizzBuzz with Callback ---");
console.log("FizzBuzz with callback for 3:", fizzBuzzCallback(3, fizzBuzz));
console.log("FizzBuzz with callback for 5:", fizzBuzzCallback(5, fizzBuzz));
console.log("FizzBuzz with callback for 15:", fizzBuzzCallback(15, fizzBuzz));
console.log("FizzBuzz with callback for 7:", fizzBuzzCallback(7, fizzBuzz));
