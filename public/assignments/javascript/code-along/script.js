const container = document.querySelector(".container");
const title = document.getElementById("title");
const description = document.querySelector("#description");
const buttons = document.getElementsByClassName("Btn");
const listItems = document.querySelectorAll(".item");
const inputField = document.getElementById("nameInput");
const submiteBtn = document.getElementById("submitBtn");
const changeColorBtn = document.getElementById("changeColor");

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

///////////////////////////// 28.02 //////////////////////////////////////////////

const counterDiv = document.createElement("div");

const counterBtn = document.createElement("button");
counterBtn.textContent = "Click me!";
counterBtn.style.padding = "20px 25px";
counterBtn.style.margin = "20px";
counterBtn.style.fontSize = "16px";
counterBtn.style.border = "none";
counterBtn.style.backgroundColor = "darkblue";

const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset";
resetBtn.style.padding = "20px 25px";
resetBtn.style.margin = "20px";
resetBtn.style.fontSize = "16px";
resetBtn.style.border = "none";
resetBtn.style.backgroundColor = "darkblue";

const counterDisplay = document.createElement("p");

counterDisplay.textContent = "You have clicked me 0 times";
counterDisplay.style.color = "red";

let clickCount = 0;
counterBtn.addEventListener("click", () => {
    clickCount++;
    counterDisplay.textContent = `You have clicked me ${clickCount} times`;

    if (clickCount % 5 === 0) {
        counterBtn.style.backgroundColor = getRandomColor();
    }
});

resetBtn.addEventListener("click", () => {
    counterDisplay.textContent = `You have clicked me 0 times`;
    counterBtn.style.backgroundColor = "darkblue";
});

document.body.appendChild(counterDiv);
counterDiv.appendChild(counterBtn);
counterDiv.appendChild(resetBtn);
counterDiv.appendChild(counterDisplay);

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

resetBtn.addEventListener("click", () => {
    resetBtn.style.position = "relative";

    let counter = 0;
    let interval = setInterval(() => {
        const offset = counter % 2 === 0 ? 5 : 5;
        resetBtn.style.left = `${offset}px`;
        counter++;
        if (counter > 6) {
            clearInterval(interval);
            resetBtn.style.left = "0px";
        }
    }, 50);
});

changeColorBtn.addEventListener("click", () => {
    document.body.style.backgroundColor = getRandomColor();
});

function createConfetti() {
    for (i = 0; i < 75; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.backgroundColor = getRandomColor();
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

counterBtn.addEventListener("click", () => {
    if (clickCount % 10 === 0) {
        createConfetti();
    }
});
