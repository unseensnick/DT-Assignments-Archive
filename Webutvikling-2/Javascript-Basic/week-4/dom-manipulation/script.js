/*-----------------------------------------
 * Dark Mode Implementation
 * Handles theme toggle, persistence, and animations
 *------------------------------------------ */

lucide.createIcons({
    icons: {
        Moon: true,
        Sun: true,
        Plus: true,
        Minus: true,
        Send: true,
        RefreshCw: true,
        "folder-open": true,
        "rotate-ccw": true,
        "arrow-up-1-0": true,
    },
});

document.head.appendChild(
    Object.assign(document.createElement("style"), {
        textContent: `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .icon-rotating {
            animation: rotate 0.5s ease-in-out;
        }
    `,
    })
);

const themeManager = {
    isDarkMode() {
        return document.documentElement.classList.contains("dark");
    },

    setTheme(isDark) {
        document.documentElement.classList.toggle("dark", isDark);

        localStorage.setItem("theme", isDark ? "dark" : "light");

        this.updateUI();
    },

    toggleTheme() {
        this.setTheme(!this.isDarkMode());
    },

    updateUI() {
        const isDark = this.isDarkMode();
        const themeToggleBtn = document.getElementById("theme-toggle-btn");
        const themeToggleText = document.getElementById("theme-toggle-text");
        const themeIcon = themeToggleBtn?.querySelector("[data-lucide]");

        if (themeToggleText) {
            themeToggleText.textContent = isDark ? "Light Mode" : "Dark Mode";
        }

        if (themeIcon) {
            themeIcon.classList.add("icon-rotating");

            setTimeout(() => {
                themeIcon.setAttribute("data-lucide", isDark ? "sun" : "moon");
                lucide.createIcons();
            }, 150);

            setTimeout(() => {
                themeIcon.classList.remove("icon-rotating");
            }, 500);
        }
    },

    init() {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            this.setTheme(true);
        } else if (savedTheme === "light") {
            this.setTheme(false);
        } else {
            const prefersDarkMode = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            this.setTheme(prefersDarkMode);
        }

        this.setupEventListeners();
    },

    setupEventListeners() {
        const themeToggleBtn = document.getElementById("theme-toggle-btn");
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener("click", () => this.toggleTheme());
        }

        const darkModeMediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        darkModeMediaQuery.addEventListener("change", (e) => {
            if (!localStorage.getItem("theme")) {
                this.setTheme(e.matches);
            }
        });
    },
};

/*-----------------------------------------
 * Interactive Elements
 * Handles other interactive components
 *------------------------------------------ */

function setupInteractiveElements() {
    const textChangeBtn = document.getElementById("text-change-btn");
    const dynamicParagraph = document.getElementById("dynamic-paragraph");
    const originalParagraphText = dynamicParagraph.textContent;
    if (textChangeBtn && dynamicParagraph) {
        textChangeBtn.addEventListener("click", () => {
            dynamicParagraph.textContent =
                "This text has been updated dynamically!";
        });
    }

    const addListItemBtn = document.getElementById("add-list-item-btn");
    const removeListItemBtn = document.getElementById("remove-list-item-btn");
    const interactiveList = document.getElementById("interactive-list");
    const originalListContent = interactiveList.cloneNode(true);
    removeListItemBtn.disabled = false;

    if (addListItemBtn && interactiveList) {
        addListItemBtn.addEventListener("click", () => {
            const newItem = document.createElement("li");
            newItem.className = "list-item";
            newItem.textContent =
                "New Item " + (interactiveList.children.length + 1);
            interactiveList.appendChild(newItem);

            if (interactiveList.children.length > 0) {
                removeListItemBtn.disabled = false;
            }
        });
    }

    if (removeListItemBtn && interactiveList) {
        removeListItemBtn.addEventListener("click", () => {
            if (interactiveList.children.length > 0) {
                interactiveList.removeChild(interactiveList.lastElementChild);

                if (interactiveList.children.length === 0) {
                    removeListItemBtn.disabled = true;
                }
            }
        });
    }

    const userInput = document.getElementById("user-input");
    const submitInputBtn = document.getElementById("submit-input-btn");
    if (submitInputBtn && userInput) {
        submitInputBtn.addEventListener("click", () => {
            if (userInput.value.trim() !== "") {
                alert("You submitted: " + userInput.value);
                userInput.value = "";
            }
        });
    }

    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (dynamicParagraph) {
                dynamicParagraph.textContent = originalParagraphText;
            }

            if (interactiveList) {
                while (interactiveList.firstChild) {
                    interactiveList.removeChild(interactiveList.firstChild);
                }

                const freshListCopy = originalListContent.cloneNode(true);

                while (freshListCopy.firstChild) {
                    interactiveList.appendChild(freshListCopy.firstChild);
                }
            }

            if (userInput) {
                userInput.value = "";
            }

            if (counterValue) {
                clickCount = 0;
                counterValue.textContent = clickCount;

                if (decreaseBtn) {
                    decreaseBtn.disabled = true;
                }
            }

            if (interactiveList.children.length > 0) {
                removeListItemBtn.disabled = false;
            }
        });
    }

    const counterValue = document.querySelector(".counter-value");
    const increaseBtn = document.getElementById("counter-btn");
    const decreaseBtn = document.getElementById("decrement-btn");
    const resetCounterBtn = document.getElementById("reset-counter-btn");
    let clickCount = 0;
    decreaseBtn.disabled = true;
    increaseBtn.addEventListener("click", () => {
        clickCount++;
        counterValue.textContent = clickCount;

        if (clickCount === 1) {
            decreaseBtn.disabled = false;
        }
    });

    decreaseBtn.addEventListener("click", () => {
        if (clickCount > 0) {
            clickCount--;
            counterValue.textContent = clickCount;

            if (clickCount === 0) {
                decreaseBtn.disabled = true;
            }
        }
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            clickCount = 0;
            counterValue.textContent = clickCount;
            decreaseBtn.disabled = true;
        });
    }

    if (resetCounterBtn) {
        resetCounterBtn.addEventListener("click", () => {
            clickCount = 0;
            counterValue.textContent = clickCount;
            decreaseBtn.disabled = true;
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    themeManager.init();
    setupInteractiveElements();
});
