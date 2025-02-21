/******************************************************************************
1. Count the Characters

Task:
- Create a variable `sentence` and assign it a string.
- Use a string method to print the number of characters in the string.
******************************************************************************/

let characterCount = "This is a sentence";

console.log("--- Task 1: Count the Characters ---");
console.log(`The sentence is: "${characterCount}"`);
console.log(`Number of characters in the sentence: ${characterCount.length}`);

/******************************************************************************
2. Make It Loud!

Task:
- Store a sentence in a variable.
- Convert the entire sentence to uppercase and log the result.
******************************************************************************/

let sentenceToUpperCase = "this is a sentence";

console.log("\n--- Task 2: Make It Loud! ---");
console.log(`Original sentence: "${sentenceToUpperCase}"`);
console.log(`Uppercase version: "${sentenceToUpperCase.toUpperCase()}"`);

/******************************************************************************
3. Fix the Spacing

Task:
- Create a variable with extra spaces at the start and end.
- Use a method to remove the spaces and log the result.
******************************************************************************/

let extraSpaces = "    This is a sentence    ";

console.log("\n--- Task 3: Fix the Spacing ---");
console.log(`Original sentence: "${extraSpaces}"`);
console.log(`Trimmed version: "${extraSpaces.trim()}"`);

/******************************************************************************
4. Extract a Word

Task:
- Create a sentence, extract a word, and log it.
******************************************************************************/

let extractWord = "This is a sentence";

console.log("\n--- Task 4: Extract a Word ---");
console.log(`Original sentence: "${extractWord}"`);
console.log(`Extracted word: "${extractWord.slice(5, 7)}"`);

/******************************************************************************
5. Replace a Word

Task:
- Create a sentence, replace `"aWord"` with `"anotherWord"`, and print it.
******************************************************************************/

let replaceWord = "This is a sentence";

console.log("\n--- Task 5: Replace a Word ---");
console.log(`Original sentence: "${replaceWord}"`);
console.log(
    `Modified sentence: "${replaceWord.replace(
        "a sentence",
        "another sentence"
    )}"`
);

/******************************************************************************
6. Split a Sentence

Task:
- Create a sentence, split it into words, and log the array.
- Hint: Decide whether to split by whitespace, commas, or another character.
******************************************************************************/

let splitSentence = "This is a sentence";

console.log("\n--- Task 6: Split a Sentence ---");
console.log(`Original sentence: "${splitSentence}"`);
console.log("Split into words:", splitSentence.split(" "));

/******************************************************************************
7. Add to a List

Task:
- Create an empty array.
- Add 3-4 items to the array.
- Log the final array.
******************************************************************************/

let emptyArray = [];

/* 
emptyArray.push("item1");
emptyArray.push("item2");
emptyArray.push("item3");
emptyArray.push("item4");
*/

emptyArray.push("item1", "item2", "item3", "item4");
console.log("\n--- Task 7: Add to a List ---");
console.log("Final array:", emptyArray);

/******************************************************************************
8. Remove the Last Item

Task:
- Create an array with 3-4 items.
- Remove the last item and log the new array.
******************************************************************************/

let arrayWithItems = ["item1", "item2", "item3", "item4"];

arrayWithItems.pop();

console.log("\n--- Task 8: Remove the Last Item ---");
console.log("Updated array after removing last item:", arrayWithItems);

/******************************************************************************
9. Find an Item’s Position

Task:
- Create an array, find the index of two of the items, and log them.
******************************************************************************/

let arrayWithItems2 = ["item1", "item2", "item3", "item4"];

console.log("\n--- Task 9: Find an Item’s Position ---");
console.log(`Index of "item1": ${arrayWithItems2.indexOf("item1")}`);
console.log(`Index of "item3": ${arrayWithItems2.indexOf("item3")}`);
