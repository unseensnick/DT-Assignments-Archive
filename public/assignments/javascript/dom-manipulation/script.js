/*-----------------------------------------dark mode------------------------------------------ */
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
} else if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
} else {
    const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDarkMode) {
        document.documentElement.classList.add("dark");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeToggleText = document.getElementById("theme-toggle-text");

    const isDarkMode = document.documentElement.classList.contains("dark");
    themeToggleText.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

    themeToggleBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");

        const isDarkNow = document.documentElement.classList.contains("dark");

        themeToggleText.textContent = isDarkNow ? "Light Mode" : "Dark Mode";

        localStorage.setItem("theme", isDarkNow ? "dark" : "light");
    });

    const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );

    darkModeMediaQuery.addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            document.documentElement.classList.toggle("dark", e.matches);

            const isDarkMode =
                document.documentElement.classList.contains("dark");
            themeToggleText.textContent = isDarkMode
                ? "Light Mode"
                : "Dark Mode";
        }
    });
});
/*-------------------------------------end dark mode------------------------------------------ */
