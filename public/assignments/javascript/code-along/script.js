const container = document.querySelector(".container");
const title = document.getElementById("title");
const description = document.querySelector("#description");
const buttons = document.getElementsByClassName("Btn");
const listItems = document.querySelectorAll(".item");
const inputField = document.getElementById("nameInput");
const submiteBtn = document.getElementById("submitBtn");

document.getElementById("changeTextBtn").addEventListener("click", () => {
    description.textContent = "Bob's Burgers is a great show!";
});

Array.from(buttons).forEach((btn) => {
    btn.style.backgroundColor = "pink";
});

document.getElementById("addElementBtn").addEventListener("click", () => {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = "Click me!";
    newParagraph.style.color = "green";
    newParagraph.style.cursor = "pointer";

    newParagraph.addEventListener("click", () => {
        newParagraph.textContent = "You clicked me! ow!";
        newParagraph.style.color = "red";
    });

    document.body.appendChild(newParagraph);
});

listItems.forEach((Item, index) => {
    Item.addEventListener("click", () => {
        Item.textContent = `Clicked item ${index + 1}`;
        Item.style.color = "blue";
    });
});

submiteBtn.addEventListener("click", () => {
    alert(`Hello, ${inputField.value}!`);
});

console.log("Parent of Container", container.parentNode);
console.log("First child of Container", container.firstElementChild);
