/******************************************************************************
1. Oppgaven er å bli kjent med de ulike datatypene.

Task: 
- Lag 3 string datatyper
- Lag 2 number datatyper
- Lag 2 objects som inneholder tre parameter (for eksempel navn, alder, by)
- Lag 2 array som inneholder 4 parameter (for eksempel frukt, bilmerker eller spill)
******************************************************************************/

let name = "Ola";
let city = "Oslo";
let hobby = "Fotball";

let age = 25;
let height = 180;

let person1 = {
    name: "John",
    age: 28,
    city: "Oslo",
};

let person2 = {
    name: "Kari",
    age: 30,
    city: "Bergen",
};

let fruits = ["Eple", "Banan", "Appelsin", "Druer"];
let cars = ["Toyota", "BMW", "Tesla", "Ford"];

console.log("--- String Examples ---");
console.log(`Name: ${name}`);
console.log(`City: ${city}`);
console.log(`Hobby: ${hobby}`);

console.log("\n--- Number Examples ---");
console.log(`Age: ${age} years`);
console.log(`Height: ${height} cm`);

console.log("\n--- Object Examples ---");
console.log("Person 1:");
console.log(`- Name: ${person1.name}`);
console.log(`- Age: ${person1.age}`);
console.log(`- City: ${person1.city}`);

console.log("\nPerson 2:");
console.log(`- Name: ${person2.name}`);
console.log(`- Age: ${person2.age}`);
console.log(`- City: ${person2.city}`);

console.log("\n--- Array Examples ---");
console.log("Fruits:");
fruits.forEach((fruit, index) => {
    console.log(`${index + 1}. ${fruit}`);
});

console.log("\nCars:");
cars.forEach((car, index) => {
    console.log(`${index + 1}. ${car}`);
});
