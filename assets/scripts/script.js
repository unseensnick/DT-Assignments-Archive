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
        "chevron-down": true,
        "chevron-up": true,
        dot: true,
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

    function updateListIcons() {
        document.querySelectorAll(".list-item").forEach((item) => {
            if (!item.querySelector(".list-bullet-icon")) {
                const iconElement = document.createElement("i");
                iconElement.setAttribute("data-lucide", "dot");
                iconElement.classList.add("list-bullet-icon");

                item.insertBefore(iconElement, item.firstChild);
            }
        });
        lucide.createIcons();
    }

    updateListIcons();

    if (addListItemBtn && interactiveList) {
        addListItemBtn.addEventListener("click", () => {
            const newItem = document.createElement("li");
            newItem.className = "list-item";
            newItem.textContent =
                "New Item " + (interactiveList.children.length + 1);
            interactiveList.appendChild(newItem);

            updateListIcons();

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

    const dropdown = document.querySelector(".dropdown");
    if (dropdown) {
        const select = dropdown.querySelector(".select");
        const menu = dropdown.querySelector(".menu");
        const options = dropdown.querySelectorAll(".menu li");
        const selected = dropdown.querySelector(".selected");

        const caretDiv = select.querySelector(".caret");
        if (caretDiv) {
            const caretIcon = document.createElement("i");
            caretIcon.setAttribute("data-lucide", "chevron-down");
            caretIcon.classList.add("caret-icon");
            caretDiv.innerHTML = "";
            caretDiv.appendChild(caretIcon);
            lucide.createIcons();
        }

        select.addEventListener("click", () => {
            const isCurrentlyOpen = select.classList.contains("open");
            const caretIcon = select.querySelector(".caret-icon");

            if (caretIcon) {
                caretIcon.classList.add("chevron-animating");

                if (isCurrentlyOpen) {
                    setTimeout(() => {
                        caretIcon.setAttribute("data-lucide", "chevron-down");
                        lucide.createIcons({
                            icons: {
                                "chevron-down": true,
                            },
                        });

                        select.classList.remove("open");
                        menu.classList.remove("open");
                    }, 150);
                } else {
                    select.classList.add("open");
                    menu.classList.add("open");

                    setTimeout(() => {
                        caretIcon.setAttribute("data-lucide", "chevron-up");
                        lucide.createIcons({
                            icons: {
                                "chevron-up": true,
                            },
                        });
                    }, 150);
                }

                setTimeout(() => {
                    caretIcon.classList.remove("chevron-animating");
                }, 300);
            } else {
                select.classList.toggle("open");
                menu.classList.toggle("open");
            }
        });

        options.forEach((option) => {
            if (!option.querySelector(".menu-item-icon")) {
                const menuIcon = document.createElement("i");
                menuIcon.setAttribute("data-lucide", "dot");
                menuIcon.classList.add("menu-item-icon");
                option.insertBefore(menuIcon, option.firstChild);
                lucide.createIcons();
            }

            option.addEventListener("click", () => {
                selected.textContent = option.textContent.trim();

                options.forEach((opt) => {
                    opt.classList.remove("active");
                });

                option.classList.add("active");

                const caretIcon = select.querySelector(".caret-icon");
                if (caretIcon) {
                    caretIcon.classList.add("chevron-animating");

                    setTimeout(() => {
                        caretIcon.setAttribute("data-lucide", "chevron-down");
                        lucide.createIcons({
                            icons: {
                                "chevron-down": true,
                            },
                        });

                        select.classList.remove("open");
                        menu.classList.remove("open");
                    }, 150);

                    setTimeout(() => {
                        caretIcon.classList.remove("chevron-animating");
                    }, 300);
                } else {
                    select.classList.remove("open");
                    menu.classList.remove("open");
                }
            });
        });

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                if (select.classList.contains("open")) {
                    const caretIcon = select.querySelector(".caret-icon");
                    if (caretIcon) {
                        caretIcon.classList.add("chevron-animating");

                        setTimeout(() => {
                            caretIcon.setAttribute(
                                "data-lucide",
                                "chevron-down"
                            );
                            lucide.createIcons({
                                icons: {
                                    "chevron-down": true,
                                },
                            });

                            select.classList.remove("open");
                            menu.classList.remove("open");
                        }, 150);

                        setTimeout(() => {
                            caretIcon.classList.remove("chevron-animating");
                        }, 300);
                    } else {
                        select.classList.remove("open");
                        menu.classList.remove("open");
                    }
                }
            }
        });
    }

    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn && dropdown) {
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

                updateListIcons();
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

            const originalOption =
                dropdown.querySelector(".menu li.active").textContent;
            const selected = dropdown.querySelector(".selected");

            resetBtn.addEventListener("click", () => {
                const options = dropdown.querySelectorAll(".menu li");
                options.forEach((opt) => {
                    opt.classList.remove("active");
                });

                options[0].classList.add("active");
                selected.textContent = options[0].textContent.trim();
            });
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
