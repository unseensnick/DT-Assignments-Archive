// 1. Print Numbers with a for Loop
// Exercise 1: Print Numbers 1-10
// Your code here
console.log("Exercise 1: Print Numbers 1-10");
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

// Exercise 1 Challenge: Even Numbers 1-10
// Your code here
console.log("\nExercise 1 Challenge: Even Numbers 1-10");
for (let i = 2; i <= 10; i += 2) {
    console.log(i);
}

// 2. Reverse Counting with a for Loop
// Exercise 2: Reverse Counting 10-1
// Your code here
console.log("\nExercise 2: Reverse Counting 10-1");
for (let i = 10; i >= 1; i--) {
    console.log(i);
}

// Exercise 2 Challenge: Odd Numbers 10-1
// Your code here
console.log("\nExercise 2 Challenge: Odd Numbers 10-1");
for (let i = 9; i >= 1; i -= 2) {
    console.log(i);
}

// 3. Loop Through an Array (for-of Loop)
// Exercise 3: Favorite Games
// Create your array here
const favoriteGames = ["League of Legends", "Teamfight Tactics", "Sly Cooper"];
// Your code here
console.log("\nExercise 3 Challenge: loop through an array using for-of loop");
for (let game of favoriteGames) {
    console.log(game);
}

// Exercise 3 Challenge: Games in Uppercase
// Your code here
console.log(
    "\nExercise 3 Challenge: loop through an array using for-of loop in Uppercase"
);
for (let game of favoriteGames) {
    console.log(game.toUpperCase());
}

// 4. Count the Letters in a Word (for-of Loop)
// Problem: Write a for-of loop that prints each letter in "BawkuWestDistrict" on a new line
const word = "BawkuWestDistrict";
// Your code here
console.log(
    "\nExercise 4: Print each letter in BawkuWestDistrict on a new line using for-of loop"
);
for (let letter of word) {
    console.log(letter);
}

// 5. Count Down with a while Loop
// Exercise 5: Count Down from 5
// Your code here
console.log("\nExercise 5: Count Down from 5 using while loop");
let i = 5;
while (i >= 1) {
    console.log(i);
    i--;
}

// Exercise 5 Challenge: Odd Numbers Only
// Your code here
console.log("\nExercise 5 Challenge: Odd Numbers Only using while loop");
i = 5;
while (i >= 1) {
    console.log(i);
    i -= 2;
}

// Bonus Challenge: Nested Loops
// Bonus Challenge: Triangle Pattern
// Your code here
console.log("\nBonus Challenge: Triangle Pattern using nested loops");
let numberOfRows = 5;

for (let row = 1; row <= numberOfRows; row++) {
    let starPattern = "";
    for (let star = 1; star <= row; star++) {
        starPattern = starPattern + "*";
    }
    console.log(starPattern);
}

// Bonus Challenge: Reverse Triangle Pattern
// Your code here
console.log("\nBonus Challenge: Reverse Triangle Pattern using nested loops");
for (let row = numberOfRows; row >= 1; row--) {
    let starPattern = "";
    for (let star = 1; star <= row; star++) {
        starPattern = starPattern + "*";
    }
    console.log(starPattern);
}
