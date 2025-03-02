/*-----------------------------------------
 * ICON SETUP
 * Initialize all Lucide icons and animations
 *------------------------------------------ */

// Setup all icons we'll use in the application
function setupIcons() {
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
}

// Add animation styles to document
function addAnimationStyles() {
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
            
            @keyframes chevron-flip-down {
                0% { transform: rotate(0deg); opacity: 1; }
                50% { transform: rotate(90deg); opacity: 0.5; }
                100% { transform: rotate(180deg); opacity: 1; }
            }
            @keyframes chevron-flip-up {
                0% { transform: rotate(180deg); opacity: 1; }
                50% { transform: rotate(90deg); opacity: 0.5; }
                100% { transform: rotate(0deg); opacity: 1; }
            }
            .dropdown .select.open .caret-icon[data-lucide="chevron-up"] {
                animation: chevron-flip-down 0.2s ease forwards;
            }
            .dropdown .select:not(.open) .caret-icon[data-lucide="chevron-down"] {
                animation: chevron-flip-up 0.2s ease forwards;
            }
            .chevron-animating {
                opacity: 0.5;
            }
        `,
        })
    );
}

/*-----------------------------------------
 * UTILITY FUNCTIONS
 * Reusable functions for common tasks
 *------------------------------------------ */

// Change icon with animation
function animateIconChange(iconElement, newIconName, duration = 500) {
    iconElement.classList.add("icon-rotating");

    setTimeout(() => {
        iconElement.setAttribute("data-lucide", newIconName);
        lucide.createIcons();
    }, duration / 3);

    setTimeout(() => {
        iconElement.classList.remove("icon-rotating");
    }, duration);
}

// Add dot icon to list items
function addDotIconToElement(element) {
    if (!element.querySelector(".list-bullet-icon")) {
        const iconElement = document.createElement("i");
        iconElement.setAttribute("data-lucide", "dot");
        iconElement.classList.add("list-bullet-icon");
        element.insertBefore(iconElement, element.firstChild);
    }
}

/*-----------------------------------------
 * THEME MANAGER
 * Handles dark/light mode functionality
 *------------------------------------------ */

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
            animateIconChange(themeIcon, isDark ? "sun" : "moon");
        }
    },

    init() {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            this.setTheme(savedTheme === "dark");
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
 * TEXT CHANGE COMPONENT
 * Handles dynamic text update functionality
 *------------------------------------------ */

function setupTextChange() {
    const textChangeBtn = document.getElementById("text-change-btn");
    const dynamicParagraph = document.getElementById("dynamic-paragraph");

    if (textChangeBtn && dynamicParagraph) {
        // Store original text for reset functionality
        const originalParagraphText = dynamicParagraph.textContent;

        textChangeBtn.addEventListener("click", () => {
            dynamicParagraph.textContent =
                "This text has been updated dynamically!";
        });

        // Return data needed for reset
        return {
            element: dynamicParagraph,
            originalText: originalParagraphText,
        };
    }

    return null;
}

/*-----------------------------------------
 * LIST COMPONENT
 * Handles interactive list with add/remove functionality
 *------------------------------------------ */

function setupList() {
    const addListItemBtn = document.getElementById("add-list-item-btn");
    const removeListItemBtn = document.getElementById("remove-list-item-btn");
    const interactiveList = document.getElementById("interactive-list");

    if (!(addListItemBtn && removeListItemBtn && interactiveList)) {
        return null;
    }

    // Store original list for reset functionality
    const originalListContent = interactiveList.cloneNode(true);

    // Initialize remove button state
    updateRemoveButtonState();

    // Add icons to existing list items
    updateListIcons();

    // Add new item to list
    addListItemBtn.addEventListener("click", () => {
        const newItem = document.createElement("li");
        newItem.className = "list-item";
        newItem.textContent =
            "New Item " + (interactiveList.children.length + 1);
        interactiveList.appendChild(newItem);

        updateListIcons();
        updateRemoveButtonState();
    });

    // Remove last item from list
    removeListItemBtn.addEventListener("click", () => {
        if (interactiveList.children.length > 0) {
            interactiveList.removeChild(interactiveList.lastElementChild);
            updateRemoveButtonState();
        }
    });

    // Helper function to update list icons
    function updateListIcons() {
        document.querySelectorAll(".list-item").forEach((item) => {
            addDotIconToElement(item);
        });
        lucide.createIcons();
    }

    // Helper function to update remove button state
    function updateRemoveButtonState() {
        removeListItemBtn.disabled = interactiveList.children.length === 0;
    }

    // Return data needed for reset
    return {
        element: interactiveList,
        originalContent: originalListContent,
        updateIcons: updateListIcons,
        updateButton: updateRemoveButtonState,
    };
}

/*-----------------------------------------
 * INPUT COMPONENT
 * Handles form input submission
 *------------------------------------------ */

function setupInput() {
    const userInput = document.getElementById("user-input");
    const submitInputBtn = document.getElementById("submit-input-btn");

    if (userInput && submitInputBtn) {
        submitInputBtn.addEventListener("click", () => {
            if (userInput.value.trim() !== "") {
                alert("You submitted: " + userInput.value);
                userInput.value = "";
            }
        });

        // Return data needed for reset
        return { element: userInput };
    }

    return null;
}

/*-----------------------------------------
 * DROPDOWN COMPONENT
 * Handles custom dropdown functionality
 *------------------------------------------ */

function setupDropdown() {
    const dropdown = document.querySelector(".dropdown");

    if (!dropdown) {
        return null;
    }

    const select = dropdown.querySelector(".select");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    // Setup dropdown caret icon
    const caretDiv = select.querySelector(".caret");

    if (caretDiv) {
        const caretIcon = document.createElement("i");
        caretIcon.setAttribute("data-lucide", "chevron-down");
        caretIcon.classList.add("caret-icon");
        caretDiv.innerHTML = "";
        caretDiv.appendChild(caretIcon);
        lucide.createIcons();
    }

    // Add dot icons to menu items
    options.forEach((option) => {
        if (!option.querySelector(".menu-item-icon")) {
            const menuIcon = document.createElement("i");
            menuIcon.setAttribute("data-lucide", "dot");
            menuIcon.classList.add("menu-item-icon");
            option.insertBefore(menuIcon, option.firstChild);
            lucide.createIcons();
        }
    });

    // Toggle dropdown when select is clicked
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

    // Handle option selection
    options.forEach((option) => {
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

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            if (select.classList.contains("open")) {
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
            }
        }
    });

    // Return data needed for reset
    return {
        element: dropdown,
        select,
        options,
        selected,
    };
}

/*-----------------------------------------
 * COUNTER COMPONENT
 * Handles counter with increment/decrement
 *------------------------------------------ */

function setupCounter() {
    const counterValue = document.querySelector(".counter-value");
    const increaseBtn = document.getElementById("counter-btn");
    const decreaseBtn = document.getElementById("decrement-btn");
    const resetCounterBtn = document.getElementById("reset-counter-btn");

    if (!(counterValue && increaseBtn && decreaseBtn)) {
        return null;
    }

    let clickCount = 0;

    // Initialize counter state
    updateCounterState();

    // Increment counter
    increaseBtn.addEventListener("click", () => {
        clickCount++;
        updateCounterState();
    });

    // Decrement counter
    decreaseBtn.addEventListener("click", () => {
        if (clickCount > 0) {
            clickCount--;
            updateCounterState();
        }
    });

    // Reset counter with dedicated button
    if (resetCounterBtn) {
        resetCounterBtn.addEventListener("click", () => {
            resetCounter();
        });
    }

    // Helper function to update counter state
    function updateCounterState() {
        counterValue.textContent = clickCount;
        decreaseBtn.disabled = clickCount === 0;
    }

    // Helper function to reset counter
    function resetCounter() {
        clickCount = 0;
        updateCounterState();
    }

    // Return data needed for reset
    return {
        reset: resetCounter,
    };
}

/*-----------------------------------------
 * RESET FUNCTIONALITY
 * Handles reset for all components
 *------------------------------------------ */

function setupReset(components) {
    const resetBtn = document.getElementById("reset-btn");

    if (!resetBtn) {
        return;
    }

    resetBtn.addEventListener("click", () => {
        // Reset text component
        if (components.text) {
            components.text.element.textContent = components.text.originalText;
        }

        // Reset list component
        if (components.list) {
            const list = components.list.element;
            const originalContent = components.list.originalContent;

            // Clear current list
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            // Add original items back
            const freshListCopy = originalContent.cloneNode(true);
            while (freshListCopy.firstChild) {
                list.appendChild(freshListCopy.firstChild);
            }

            components.list.updateIcons();
            components.list.updateButton();
        }

        // Reset input component
        if (components.input) {
            components.input.element.value = "";
        }

        // Reset counter component
        if (components.counter) {
            components.counter.reset();
        }

        // Reset dropdown component
        if (components.dropdown) {
            const options = components.dropdown.options;
            const selected = components.dropdown.selected;

            options.forEach((opt) => {
                opt.classList.remove("active");
            });

            options[0].classList.add("active");
            selected.textContent = options[0].textContent.trim();
        }
    });
}

/*-----------------------------------------
 * INITIALIZATION
 * Main setup function that runs on page load
 *------------------------------------------ */

function initializeApp() {
    // Setup icons and animations
    setupIcons();
    addAnimationStyles();

    // Initialize theme manager
    themeManager.init();

    // Setup interactive components
    const components = {
        text: setupTextChange(),
        list: setupList(),
        input: setupInput(),
        dropdown: setupDropdown(),
        counter: setupCounter(),
    };

    // Setup reset functionality
    setupReset(components);
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
