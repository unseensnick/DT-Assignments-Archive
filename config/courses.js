export const courseConfig = {
    "webutvikling-2": {
        title: "Webutvikling 2",
        // Global playground settings for the entire course
        playgroundConfig: {
            consoleWidth: 30,
            animationDuration: 500,
            animationEasing: "ease-in-out",
            codeExpanded: true,
            enableRun: {
                html: false,
                css: false,
                javascript: true,
            },
        },
        modules: {
            "javascript-basic": {
                title: "JavaScript Basics",
                type: "playground",
                weeks: {
                    "week-1": {
                        topics: {
                            datatypes: {
                                consoleWidth: 26,
                                enableRun: {
                                    html: true,
                                },
                                // Use the actual folder names as they appear in the filesystem
                                folders: ["datatypes"],
                                previewTitle: "JavaScript Data Types Preview",
                                codeTitle: "Data Types Examples"
                            },
                            "variables-conditionals": {
                                consoleWidth: 32,
                                enableRun: {
                                    html: true,
                                },
                                // Use the actual folder name which is "variables-and-conditionals"
                                folders: ["variables-and-conditionals"],
                                previewTitle: "Variables & Conditionals Preview",
                                codeTitle: "Variables & Conditionals Examples"
                            },
                        },
                    },
                    "week-2": {
                        topics: {
                            functions: {
                                consoleWidth: 42,
                                folders: ["functions"],
                                previewTitle: "JavaScript Functions Preview",
                                codeTitle: "Function Examples"
                            },
                            methods: {
                                consoleWidth: 38,
                                folders: ["methods"],
                                previewTitle: "JavaScript Methods Preview",
                                codeTitle: "Method Examples"
                            },
                        },
                    },
                    "week-3": {
                        topics: {
                            loops: {
                                folders: ["loops"],
                                previewTitle: "JavaScript Loops Preview",
                                codeTitle: "Loop Examples"
                            },
                            "objects-loops": {
                                folders: ["objects-loops"],
                                previewTitle: "Objects & Loops Preview",
                                codeTitle: "Object & Loop Examples"
                            },
                        },
                    },
                    "week-4": {
                        topics: {
                            "code-along": {
                                // Change from playground type to iframe type
                                type: "iframe",  
                                viewerConfig: {
                                    previewHeight: 750,
                                    codeHeight: 600,
                                    playground: {
                                        enabled: true,
                                        consoleWidth: 40,
                                        codeExpanded: true,
                                        animationDuration: 500,
                                        animationEasing: "ease-in-out",
                                        enableRun: {
                                            html: true,
                                            css: true,
                                            javascript: true,
                                        },
                                    },
                                    animation: {
                                        duration: 500,
                                        easing: "ease-in-out",
                                    },
                                },
                                // Files are in the code-along folder
                                folders: ["code-along"],
                                previewTitle: "Interactive Demo",
                                codeTitle: "Code Along Exercise"
                            },
                            "dom-manipulation": {
                                type: "iframe",  
                                viewerConfig: {
                                    previewHeight: 750,
                                    codeHeight: 600,
                                    playground: {
                                        enabled: true,
                                        consoleWidth: 40,
                                        codeExpanded: true,
                                        animationDuration: 500,
                                        animationEasing: "ease-in-out",
                                        enableRun: {
                                            html: true,
                                            css: true,
                                            javascript: true,
                                        },
                                    },
                                    animation: {
                                        duration: 500,
                                        easing: "ease-in-out",
                                    },
                                },
                                folders: ["dom-manipulation"],
                                previewTitle: "Interactive Demo",
                                codeTitle: "Code Along Exercise"
                            },
                        },
                    },
                    "bonus-assignments": {
                        topics: {},
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
                    "html-theory": {
                        title: "HTML Theory",
                        viewerConfig: {
                            previewHeight: 750,
                            codeHeight: 600,
                            playground: {
                                enabled: true,
                                consoleWidth: 40,
                                codeExpanded: true,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                enableRun: {
                                    html: false,
                                    css: false,
                                    javascript: true,
                                },
                            },
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
                            "05-html-forms-input",
                        ],
                        /* topicConfigs: {
                            "03.2-css-flexbox": {
                                title: "Flexbox Exercise",
                            },
                        }, */
                    },
                    "html-project": {
                        title: "HTML Project",
                        viewerConfig: {
                            previewHeight: 750,
                            codeHeight: 600,
                            playground: {
                                enabled: true,
                                consoleWidth: 40,
                                codeExpanded: true,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                enableRun: {
                                    html: false,
                                    css: false,
                                    javascript: true,
                                },
                            },
                            animation: {
                                duration: 500,
                                easing: "ease-in-out",
                            },
                        },
                        topics: ["01-dev-process", "02-tipsy-troll-assignment"],
                    },
                    "javascript-theory": {
                        title: "Javascript Theory",
                        viewerConfig: {
                            previewHeight: 750,
                            codeHeight: 600,
                            playground: {
                                enabled: true,
                                consoleWidth: 40,
                                codeExpanded: true,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                enableRun: {
                                    html: false,
                                    css: false,
                                    javascript: true,
                                },
                            },
                            animation: {
                                duration: 500,
                                easing: "ease-in-out",
                            },
                        },
                        topics: [
                            "01-js-variables",
                            "02-js-datatypes",
                            "03-js-if-statements",
                            "04-js-operators",
                            "05-js-functions",
                        ],
                    },
                    "javascript-project": {
                        title: "JavaScript Project",
                        viewerConfig: {
                            previewHeight: 750,
                            codeHeight: 600,
                            playground: {
                                enabled: true,
                                consoleWidth: 40,
                                codeExpanded: true,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                enableRun: {
                                    html: false,
                                    css: false,
                                    javascript: true,
                                },
                            },
                            animation: {
                                duration: 500,
                                easing: "ease-in-out",
                            },
                        },
                        topics: [
                            "01-project-process",
                            "02-potion-recipe-assignment",
                            "03-web1-evaluation",
                        ],
                    },
                },
            },
            "web2-javascript": {
                title: "Web2 JavaScript",
                type: "iframe",
                sections: {
                    "data-structure": {
                        title: "Data Structure",
                        viewerConfig: {
                            previewHeight: 750,
                            codeHeight: 600,
                            playground: {
                                enabled: true,
                                consoleWidth: 40,
                                codeExpanded: true,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                enableRun: {
                                    html: false,
                                    css: false,
                                    javascript: true,
                                },
                            },
                            animation: {
                                duration: 500,
                                easing: "ease-in-out",
                            },
                        },
                        topics: [
                            "01-js-array",
                            "02-js-loops",
                            "03-js-events",
                            "04-js-dom-manipulation-reading",
                            "05-js-dom-manipulation-modifying",
                        ],
                    },
                    project: {
                        title: "Project",
                        viewerConfig: {
                            previewHeight: 750,
                            codeHeight: 600,
                            playground: {
                                enabled: true,
                                consoleWidth: 40,
                                codeExpanded: true,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                enableRun: {
                                    html: false,
                                    css: false,
                                    javascript: true,
                                },
                            },
                            animation: {
                                duration: 500,
                                easing: "ease-in-out",
                            },
                        },
                        topics: [
                            "01-arra-objects",
                            "02-rpg-quest-log-assignment",
                        ],
                    },
                    "object-oriented-theory": {
                        title: "Object-Oriented Theory",
                        viewerConfig: {
                            previewHeight: 750,
                            codeHeight: 600,
                            playground: {
                                enabled: true,
                                consoleWidth: 40,
                                codeExpanded: true,
                                animationDuration: 500,
                                animationEasing: "ease-in-out",
                                enableRun: {
                                    html: false,
                                    css: false,
                                    javascript: true,
                                },
                            },
                            animation: {
                                duration: 500,
                                easing: "ease-in-out",
                            },
                        },
                        topics: [
                            "01-js-multi-dimensional-arrays",
                            "02-js-advanced-functions",
                            "03-js-if-statements",
                            "04-js-object-oriented programming",
                        ],
                    },
                },
            },
            "web3-project": {
                title: "Web3 Project",
                type: "iframe",
                sections: {},
            },
        },
    },
};
/* 
// For playground type
{
  topics: {
    datatypes: {
      isExpanded: true,  // This playground starts expanded
    }
  }
}

// For iframe/viewer type
{
  sections: {
    "tipsy-troll": {
      viewerConfig: {
        playground: {
          codeExpanded: true  // Code editor starts expanded
        }
      }
    }
  }
}

// For global settings
{
  playgroundConfig: {
    codeExpanded: true,  // All code editors start expanded
    // ... other global settings
  }
}
*/
