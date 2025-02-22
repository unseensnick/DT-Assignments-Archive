/******************************************************************************
1. Connecting JavaScript to HTML  

Task: 
- <-- Locate the index.html file in the file explorer. Connect it to this file (javascript.js). 
******************************************************************************/

// Complete this task in index.html.

/******************************************************************************
2. Working with Different Data Types  

Task:
- Create variables using the following data types:  
	- String (text)  
	- Number (numeric value)  
	- Boolean (true/false)  
	- Array (list)  
	
Choose any content for the variables. Use both `let` and `const` when defining them.  
******************************************************************************/

const firstName = "John";
let age = 18;
let isAnAdult = age >= 18;
let cars = ["Toyota", "BMW", "Tesla", "Ford"];

console.log("--- Task 2: Working with Data Types ---");
console.log(`Name: "${firstName}" (String)`);
console.log(`Age: ${age} (Number)`);
console.log(`Is an adult: ${isAnAdult} (Boolean)`);
console.log(`Cars owned: [${cars.join(", ")}] (Array)`);

/******************************************************************************
3. Testing Operators  

Task:
- Try out some of the operators we discussed in the previous lecture:  
	- Mathematical operators: +, -, /, *  
	- Increment and decrement operators: ++, --, +=, -=  
	
Write some examples where you test these operators.  
******************************************************************************/

let a = 10;
let b = 5;

console.log("\n--- Task 3: Testing Operators ---");
console.log(`A = ${a}, B = ${b}`);
console.log(`Addition (A + B): ${a + b}`);
console.log(`Subtraction (A - B): ${a - b}`);
console.log(`Multiplication (A * B): ${a * b}`);
console.log(`Division (A / B): ${a / b}`);

let x = 5;

console.log(`\nInitial x: ${x}`);

x++;
console.log(`After x++ (increment): ${x}`);

x--;
console.log(`After x-- (decrement): ${x}`);

x += 3;
console.log(`After x += 3: ${x}`);

x -= 2;
console.log(`After x -= 2: ${x}`);

let num = 10;
console.log(`\nInitial num: ${num}`);

num *= 2;
console.log(`After num *= 2: ${num}`);

num /= 4;
console.log(`After num /= 4: ${num}`);

/******************************************************************************
4. IF/ELSE Condition  

Task: 
- Write an IF/ELSE condition that checks the following:  
	1. That userName is not empty ("").  
	2. That userAge is 18 or older.  
	3. That userIsBlocked is false.  
	
(TIP: Use && (logical AND) to check all three conditions in one IF statement.)  

- If all these conditions are met, set the variable userIsLoggedIn to true and goToPage to "/home". Then, output a welcome message with console.log.  
- If any of the conditions are NOT met, output an error message with console.log.  

Try changing the values of the variables to ensure that your IF/ELSE statement handles all cases correctly.
******************************************************************************/

let userName = "";
let userAge = 18;
let userIsLoggedIn = false;
let userIsBlocked = false;
let goToPage = "";

console.log("\n--- Task 4: IF/ELSE Condition ---");

if (userName !== "" && userAge >= 18 && userIsBlocked === false) {
    userIsLoggedIn = true;
    goToPage = "/home";
    console.log(
        `✅ Access Granted! Welcome, "${userName}". Redirecting to: ${goToPage}`
    );
} else {
    console.log("❌ Access Denied! User does not meet login requirements.");
}

/******************************************************************************
5. Ternary Conditional  

Task: 
- Create a variable called userTitle and set its value to:  
	- "Mr." if userMale is true, or  
	- "Mrs." if userMale is false.  
	
Use a ternary conditional for this:  

const variable = condition ? "if true" : "if false"; 

Try changing userMale to both true and false and use console.log to check that your condition works as expected. 
******************************************************************************/

const userMale = false;

const userTitle = userMale ? "Mr." : "Mrs.";

console.log("\n--- Task 5: Ternary Conditional ---");
console.log(`User is male: ${userMale} → Assigned Title: "${userTitle}"`);

function getUserTitle(userMale) {
    return userMale ? "Mr." : "Mrs.";
}

console.log("\nFunction Testing:");
console.log(`getUserTitle(true) → "${getUserTitle(true)}"`);
console.log(`getUserTitle(false) → "${getUserTitle(false)}"`);
