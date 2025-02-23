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
                                folders: ["datatypes"],
                            },
                            "variables-and-conditionals": {
                                consoleWidth: 32,
                                animationEasing: "ease-out",
                                enableRun: {
                                    html: true,
                                },
                                folders: ["variables-and-conditionals"],
                            },
                        },
                    },
                    "week-2": {
                        topics: {
                            functions: {
                                consoleWidth: 42,
                                folders: ["functions"],
                            },
                            methods: {
                                consoleWidth: 38,
                                folders: ["methods"],
                            },
                        },
                    },
                    "week-3": {
                        topics: {
                            loops: {
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
                        ],
                        /* topicConfigs: {
                            "03.2-css-flexbox": {
                                title: "Flexbox Exercise",
                            },
                        }, */
                    },
                },
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
