export const courseConfig = {
    "webutvikling-2": {
        title: "Webutvikling 2",
        modules: {
            "javascript-basic": {
                title: "JavaScript Basics",
                type: "playground",
                weeks: {
                    "week-1": {
                        topics: {
                            datatypes: {
                                consoleWidth: 26,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                folders: ["datatypes"],
                            },
                            "variables-and-conditionals": {
                                consoleWidth: 32,
                                animationDuration: 500,
                                animationEasing: "ease-out",
                                folders: ["variables-and-conditionals"],
                            },
                        },
                    },
                    "week-2": {
                        topics: {
                            functions: {
                                consoleWidth: 42,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                folders: ["functions"],
                            },
                            methods: {
                                consoleWidth: 38,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                folders: ["methods"],
                            },
                        },
                    },
                    "week-3": {
                        topics: {
                            loops: {
                                consoleWidth: 30,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                folders: ["loops"],
                            },
                        },
                    },
                },
            },
        },
    },
    "webutvikling-kiki": {
        title: "Webutvikling Kiki",
        modules: {
            "web1-html-javascript": {
                title: "Web1 HTML & JavaScript",
                type: "iframe",
                sections: {
                    "tipsy-troll": {
                        title: "Tipsy Troll",
                        viewerConfig: {
                            previewHeight: 800,
                            codeHeight: 640,
                            cssCardWidth: 500,
                            htmlExpanded: false,
                            cssExpanded: false,
                            animation: {
                                duration: 500,
                                easing: "ease-in-out",
                            },
                        },
                        topics: [
                            "01-html-structure",
                            "02.1-html-css-selectors",
                            "02.2-css-color-font",
                            "03.1-css-box-model",
                            "03.2-css-flexbox",
                            "04.1-html-links-images",
                            "04.2-css-grid",
                        ],
                        topicConfigs: {
                            "03.2-css-flexbox": {
                                title: "Flexbox Exercise",
                                cssCardWidth: 500,
                                htmlExpanded: true,
                                cssExpanded: true,
                                playground: {
                                    enabled: true,
                                    title: "Interactive JavaScript",
                                    language: "javascript",
                                    fileName: "script.js",
                                    consoleWidth: 40,
                                    animationDuration: 500,
                                    animationEasing: "ease-in-out",
                                },
                            },
                            "04.2-css-grid": {
                                cssCardWidth: 700,
                                htmlExpanded: true,
                                cssExpanded: true,
                            },
                        },
                    },
                },
            },
        },
    },
};

{
    /* 
playgroundConfig = {
    title: "My Code Playground", // Custom title (default is "Code Playground")
    files: [
        {
            name: "index.js",
            language: "javascript",
            content: "console.log('Hello, World!');"
        },
        {
            name: "styles.css",
            language: "css",
            content: "body { background-color: #f0f0f0; }"
        }
    ],
    previewHeight: 600, // Height of the code/output area (default is 600)
    codeHeight: 600, // Height of the code/output area (default is 600)
    consoleWidth: 40, // Percentage width of the console/output area (default is 40)
    initialExpanded: false, // Initial state of code expansion (default is false)
    animationDuration: 500, // Animation duration in milliseconds (default is 500)
    animationEasing: "ease-in-out" // Animation easing function (default is "ease-in-out")
};
*/
}
