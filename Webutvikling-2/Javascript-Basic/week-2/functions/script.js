///// 1. Create a simple function /////

function greet() {
    console.log("Hello, World!");
}
console.log("---Testing simple function---");
greet();

///// 2. Create a function with parameters /////

function greetUser(name) {
    console.log(`Hello, ${name}`);
}

greetUser("John");

///// 3. Create a function with a return value /////

function addNumbers(a, b) {
    return a + b;
}
console.log("\n---Testing a function with a return value---");
console.log(addNumbers(2, 3));

///// BONUS: Modify the function to subtract, multiply or divide based on a third parameter /////

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
console.log("\n---Testing Calculate Numbers with a third parameter---");
console.log(calculateNumbers(2, 3, "+"));
console.log(calculateNumbers(2, 3, "-"));
console.log(calculateNumbers(2, 3, "*"));
console.log(calculateNumbers(2, 3, "/"));
console.log(calculateNumbers(2, 3, "="));

///// 4. Convert a function to an arrow function /////

/* 
function multiply(a, b) {
    return a * b;
}
console.log(a, b); 
*/

const multiply = (a, b) => a * b;

console.log("\n---Testing Arrow Function---");
console.log(multiply(2, 3));
console.log(multiply(4, 5));

///// 5. Create a higher order function /////

function createMultiplier(multiplier) {
    return function (a) {
        return a * multiplier;
    };
}

const double = createMultiplier(2);
console.log("\n---Testing Higher order function---");
console.log(double(3));

///// BONUS: Modify the function to log the result to the console directly /////

function createMultiplierLog(multiplier) {
    return function (a) {
        const result = a * multiplier;
        console.log(result);
        return result;
    };
}

const triple = createMultiplierLog(3);
triple(5);

///// EXTRA CHALLENGE: Write a function called fizzBuzz that takes a number and returns "Fizz" if the number is divisible by 3, "Buzz" if the number is divisible by 5, "FizzBuzz" if the number is divisible by both 3 and 5, or the number itself if it is not divisible by 3 or 5. /////

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

console.log("\n---Testing Regular FizzBuzz---");
console.log(fizzBuzz(3));
console.log(fizzBuzz(5));
console.log(fizzBuzz(15));
console.log(fizzBuzz(7));

///// BONUS: Modify fizzbuzz into a higher order function that takes a callback function /////

const fizzBuzzCallback = (number, callback) => callback(number);

console.log("\n---Testing FizzBuzz with Callback---");
console.log(fizzBuzzCallback(3, fizzBuzz));
console.log(fizzBuzzCallback(5, fizzBuzz));
console.log(fizzBuzzCallback(15, fizzBuzz));
console.log(fizzBuzzCallback(7, fizzBuzz));
