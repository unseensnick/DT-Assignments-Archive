// hooks/use-exercises.js
export const useExercises = () => {
    const exercises = [
        {
            type: "code",
            title: "OPPGAVE 1",
            description:
                "In this exercise, you'll learn how to connect JavaScript files to HTML documents.",
            instructions: `Din første oppgave er å koble denne JavaScript-filen til index.html-filen
ved å bruke en av metodene vi viste i første forelesning.

<-- Finn index.html-filen i filutforskeren og koble den til denne filen,
javascript.js`,
            code: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <--! Example of how to connect a JavaScript file in Html document -->
        
        <script src="javascript.js" defer></script>

        <--!                        End of example                        -->
        <title>JavaScript Basic - Variables & Conditionals</title>
    </head>
    <body>
        <h1>JavaScript Basic - Variables & Conditionals</h1>
    </body>
</html>`,
            hints: [
                "Remember to use the <script> tag",
                "The script tag can be placed in either the <head> or <body> section",
                "Don't forget to specify the correct path to your JavaScript file",
            ],
            language: "html",
        },
        /* {
            type: "terminal",
            section: "Variables",
            content: [
                {
                    label: "Example String",
                    value: "Hello World"
                },
                {
                    label: "Example Number",
                    value: 42
                }
            ]
        } */
    ];

    return { exercises };
};
