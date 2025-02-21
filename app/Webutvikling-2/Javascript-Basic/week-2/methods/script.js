// 1. Count the Characters
// Create a variable called 'sentence' and assign it a string
// Then log how many characters are in the string
let characterCount = "This is a sentence";
console.log("Number of characters in the sentence: ");
console.log(characterCount.length);

// 2. Make It Loud!
// Create a variable with a sentence
// Convert it to uppercase and log the result
let sentenceToUpperCase = "this is a sentence";
console.log("\nSentence in uppercase: ");
console.log(sentenceToUpperCase.toUpperCase());

// 3. Fix the Spacing
// Create a variable with extra spaces at the start and end
// Remove the spaces and log the result
let extraSpaces = "    This is a sentence    ";
console.log("\nSentence without extra spaces: ");
console.log(extraSpaces.trim());

// 4. Extract a Word
// Create a sentence and use .slice() to extract a word
// Log the extracted word
let extractWord = "This is a sentence";
console.log("\nExtracted word: ");
console.log(extractWord.slice(5, 7));

// 5. Replace a Word
// Create a sentence and use .replace() to swap words
// Replace "aWord" with "anotherWord"
let replaceWord = "This is a sentence";
console.log("\nReplaced word: ");
console.log(replaceWord.replace("a sentence", "another sentence"));

// 6. Split a Sentence
// Create a sentence and split it into an array of words
// Remember to choose the right character to split on
let splitSentence = "This is a sentence";
console.log("\nSplit sentence: ");
console.log(splitSentence.split(" "));

// 7. Add to a List
// Create an empty array
// Add 3-4 items using .push()
// Log the final array
let emptyArray = [];
emptyArray.push("item1");
emptyArray.push("item2");
emptyArray.push("item3");
emptyArray.push("item4");
console.log("\nFinal array: ");
console.log(emptyArray);

// 8. Remove the Last Item
// Create an array with 3-4 items
// Remove the last item using .pop()
// Log the new array
let arrayWithItems = ["item1", "item2", "item3", "item4"];
arrayWithItems.pop();
console.log("\nNew array: ");
console.log(arrayWithItems);

// 9. Find an Item's Position
// Create an array
// Find and log the index of two different items
let arrayWithItems2 = ["item1", "item2", "item3", "item4"];
console.log("\nIndex of item1: ");
console.log(arrayWithItems2.indexOf("item1"));
console.log("\nIndex of item3: ");
console.log(arrayWithItems2.indexOf("item3"));
