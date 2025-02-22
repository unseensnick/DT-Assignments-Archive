/******************************************************************************
1. Print Numbers with a `for` Loop  

Task: 
- Write a `for` loop that prints numbers from 1 to 10.  
******************************************************************************/

console.log("--- Task 1: Print Numbers 1-10 ---");
for (let i = 1; i <= 10; i++) {
    console.log(`Number: ${i}`);
}

/******************************************************************************
1.1. BONUS: Modify the loop to print only even numbers between 1 and 10.  
******************************************************************************/

console.log("\n--- Task 1.1: Even Numbers 1-10 ---");
for (let i = 2; i <= 10; i += 2) {
    console.log(`Even number: ${i}`);
}

/******************************************************************************
2. Reverse Counting with a `for` Loop 

Task:
- Write a `for` loop that prints numbers from 10 down to 1.
******************************************************************************/

console.log("\n--- Task 2: Reverse Counting 10-1 ---");
for (let i = 10; i >= 1; i--) {
    console.log(`Countdown: ${i}`);
}

/******************************************************************************
2.1. BONUS: Modify the loop to print only odd numbers from 10 to 1.
******************************************************************************/

console.log("\n--- Task 2.1: Odd Numbers 10-1 ---");
for (let i = 9; i >= 1; i -= 2) {
    console.log(`Odd number: ${i}`);
}

/******************************************************************************
3. Loop Through an Array (`for-of` Loop)  

Task:
- Create an array of your favourite games, write a `for-of` loop to print each game. 
******************************************************************************/

const favoriteGames = ["League of Legends", "Teamfight Tactics", "Sly Cooper"];

console.log("\n--- Task 3: Loop Through Games Array ---");
for (let game of favoriteGames) {
    console.log(`Game: ${game}`);
}

/******************************************************************************
3.1. BONUS: Modify the code to print the games in uppercase.
******************************************************************************/

console.log("\n--- Task 3.1: Games in Uppercase ---");
for (let game of favoriteGames) {
    console.log(`Game: ${game.toUpperCase()}`);
}

/******************************************************************************
4. Spell out the Letters in a Word (`for-of` Loop)  

Task:
- Write a `for-of` loop that prints each letter in "BawkuWestDistrict" on a new line.  
******************************************************************************/

const word = "BawkuWestDistrict";

console.log("\n--- Task 4: Spell Out Word ---");
for (let letter of word) {
    console.log(`Letter: ${letter}`);
}

/******************************************************************************
5. Count Down with a `while` Loop  

Task:
- Write a `while` loop that prints numbers from 5 down to 1.
******************************************************************************/

console.log("\n--- Task 5: While Loop Countdown ---");
let i = 5;
while (i >= 1) {
    console.log(`Number: ${i}`);
    i--;
}

/******************************************************************************
5.1. BONUS: Modify the loop so that it only prints odd numbers. 
******************************************************************************/

console.log("\n--- Task 5.1: Odd Numbers While Loop ---");
i = 5;
while (i >= 1) {
    console.log(`Odd number: ${i}`);
    i -= 2;
}

/******************************************************************************
6. Nested Loops  

Task:
- Write a nested loop that prints this pattern
******************************************************************************/

console.log("\n--- Task 6: Triangle Pattern ---");
let numberOfRows = 5;
for (let row = 1; row <= numberOfRows; row++) {
    let starPattern = "";
    for (let star = 1; star <= row; star++) {
        starPattern += "*";
    }
    console.log(`Row ${row}: ${starPattern}`);
}

/******************************************************************************
6.1. BONUS: Modify the loop to print a reverse triangle 
******************************************************************************/

console.log("\n--- Task 6.1: Reverse Triangle ---");
for (let row = numberOfRows; row >= 1; row--) {
    let starPattern = "";
    for (let star = 1; star <= row; star++) {
        starPattern += "*";
    }
    console.log(`Row ${numberOfRows - row + 1}: ${starPattern}`);
}
