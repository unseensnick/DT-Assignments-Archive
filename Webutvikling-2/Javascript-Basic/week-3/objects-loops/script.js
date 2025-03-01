/****************************************************************************** 
1. Basic Object Creation

Task:  
- Create an object representing a game with properties:  
    - title (string)  
    - developer (string)  
    - yearPublished (number)  
    - genres (array of strings)  
    - isOnSteam (boolean)  
******************************************************************************/

console.log("--- Task 1: Basic Game Object Creation ---");
let game = {
    title: "Elden Ring",
    developer: "FromSoftware Inc.",
    yearPublished: 2022,
    genres: ["Souls-like", "Open World", "Dark Fantasy", "RPG"],
    isOnSteam: true,
};
console.log("Initial game object:", game);

/****************************************************************************** 
2. Updating an Object

Task:       
- Update the object from Task 1:  
    - Set yearPublished to 2024  
    - Set isOnSteam to false  
******************************************************************************/

console.log("\n--- Task 2: Updating Game Object ---");
game.yearPublished = 2024;
game.isOnSteam = false;
console.log("Updated game object:", game);

/****************************************************************************** 
2.1. BONUS:  
- Add a new genre to the genres array dynamically.  
******************************************************************************/

console.log("\n--- Task 2.1: Adding New Genre ---");
game.genres.push("Action role-playing game");
console.log("Updated genres:", game.genres);

/****************************************************************************** 
3. Object Arrays (List of People)

Task:   
- Create an array of 5 objects representing people, each with:  
    - name (string)  
    - age (number)  
    - isStudent (boolean)  
******************************************************************************/

console.log("\n--- Task 3: People Array Creation ---");
let people = [
    { name: "Alice", age: 25, isStudent: true },
    { name: "Bob", age: 30, isStudent: false },
    { name: "Charlie", age: 22, isStudent: true },
    { name: "David", age: 28, isStudent: false },
    { name: "Emma", age: 19, isStudent: true },
];
console.log("People array:", people);

/****************************************************************************** 
4. Loop Through Object Properties (for...in)

Task:  
- Use a for...in loop to print all keys and values from the people array
******************************************************************************/

console.log("\n--- Task 4: Properties Using for...in Loop ---");
for (let index in people) {
    console.log(`\nPerson ${Number(index) + 1}:`);
    for (let key in people[index]) {
        console.log(`  Property: ${key}, Value: ${people[index][key]}`);
    }
}

/****************************************************************************** 
5. Loop Through Array of Objects (for Loop)

Task:  
- Use a for loop to print each person's name and age from the people array. 
******************************************************************************/

console.log("\n--- Task 5: People Details Using for Loop ---");
for (let i = 0; i < people.length; i++) {
    console.log(`Person ${i + 1}: ${people[i].name}, Age: ${people[i].age}`);
}

/****************************************************************************** 
5.1. BONUS:  
- Modify the loop to stop when it finds someone over 30 years old.  
******************************************************************************/

console.log("\n--- Task 5.1: People Under 30 ---");
function listPeopleUntilAge(years) {
    for (let i = 0; i < people.length; i++) {
        if (people[i].age >= years) {
            console.log(
                `Stopping at ${people[i].name} who is ${people[i].age}`
            );
            return;
        }
        console.log(
            `Person ${i + 1}: ${people[i].name}, Age: ${people[i].age}`
        );
    }
}
listPeopleUntilAge(30);

/****************************************************************************** 
6. Loop Through Array of Objects (for...of)

Task:  
- Use a for...of loop to print a message introducing each person
******************************************************************************/

console.log("\n--- Task 6: Introductions Using for...of Loop ---");
for (let person of people) {
    console.log(`Meet ${person.name}, who is ${person.age} years old.`);
}

/****************************************************************************** 
6.1. BONUS:  
- Modify the loop to only print introductions for students
******************************************************************************/

console.log("\n--- Task 6.1: Student Introductions ---");
for (let person of people) {
    if (person.isStudent) {
        console.log(`Meet ${person.name}, a ${person.age}-year-old student.`);
    }
}
