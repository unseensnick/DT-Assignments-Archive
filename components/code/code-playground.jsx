import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck, Copy, Play } from "lucide-react";
import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer";
import React, { useEffect, useState } from "react";

// Customizable settings
const ANIMATION_SETTINGS = {
    duration: 500, // milliseconds
    easing: "ease-in-out",
    consoleWidth: 40, // percentage (%)
};

const CodePlayground = ({
    title = "Code Playground",
    code,
    language = "javascript",
    animationDuration = ANIMATION_SETTINGS.duration,
    animationEasing = ANIMATION_SETTINGS.easing,
    consoleWidth = ANIMATION_SETTINGS.consoleWidth,
}) => {
    const [output, setOutput] = useState([]);
    const [isCopied, setIsCopied] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const copyCode = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const runCode = () => {
        setOutput([]);
        const originalLog = console.log;
        const outputs = [];

        console.log = (...args) => {
            outputs.push({
                type: "log",
                content: args
                    .map((arg) =>
                        typeof arg === "object"
                            ? JSON.stringify(arg, null, 2)
                            : String(arg)
                    )
                    .join(" "),
            });
            setOutput([...outputs]);
            originalLog.apply(console, args);
        };

        try {
            const result = new Function(code)();
            if (result !== undefined) {
                outputs.push({
                    type: "result",
                    content: String(result),
                });
            }
        } catch (error) {
            outputs.push({
                type: "error",
                content: error.toString(),
            });
        } finally {
            console.log = originalLog;
            setOutput([...outputs]);
        }
    };

    const currentTheme = mounted
        ? theme === "dark"
            ? themes.nightOwl
            : themes.github
        : themes.github;

    // Calculate grid template columns based on console width
    const gridTemplateColumns =
        output.length > 0
            ? `${100 - consoleWidth}% ${consoleWidth}%`
            : "100% 0%";

    return (
        <div className="space-y-4">
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-primary">{title}</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={copyCode}>
                            {isCopied ? (
                                <CheckCheck className="size-4 text-green-500" />
                            ) : (
                                <Copy className="size-4" />
                            )}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={runCode}>
                            <Play className="size-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div
                        className="grid"
                        style={{
                            gridTemplateColumns,
                            transition: `all ${animationDuration}ms ${animationEasing}`,
                        }}
                    >
                        {/* Code Editor */}
                        {mounted && (
                            <div className="w-full">
                                <Highlight
                                    theme={currentTheme}
                                    code={code}
                                    language={language}
                                >
                                    {({
                                        className,
                                        style,
                                        tokens,
                                        getLineProps,
                                        getTokenProps,
                                    }) => (
                                        <pre
                                            className={`p-4 overflow-x-auto ${
                                                mounted && theme === "dark"
                                                    ? "bg-muted/50"
                                                    : "bg-muted"
                                            }`}
                                            style={style}
                                        >
                                            {tokens.map((line, i) => (
                                                <div
                                                    key={i}
                                                    {...getLineProps({ line })}
                                                    className="leading-relaxed"
                                                >
                                                    <span className="text-muted-foreground mr-4">
                                                        {i + 1}
                                                    </span>
                                                    {line.map((token, key) => (
                                                        <span
                                                            key={key}
                                                            {...getTokenProps({
                                                                token,
                                                            })}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </pre>
                                    )}
                                </Highlight>
                            </div>
                        )}

                        {/* Console Output */}
                        <div
                            className="border-l"
                            style={{
                                transition: `all ${animationDuration}ms ${animationEasing}`,
                                opacity: output.length > 0 ? 1 : 0,
                                transform: `translateX(${
                                    output.length > 0 ? 0 : 100
                                }%)`,
                            }}
                        >
                            <div
                                className={`h-full ${
                                    mounted && theme === "dark"
                                        ? "bg-muted/50"
                                        : "bg-muted"
                                }`}
                            >
                                <div className="p-4">
                                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                                        Console Output
                                    </h3>
                                    <div className="font-mono text-sm">
                                        {output.length > 0 ? (
                                            output.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`leading-relaxed ${
                                                        item.type === "error"
                                                            ? "text-red-500"
                                                            : item.type ===
                                                              "result"
                                                            ? "text-green-500"
                                                            : "text-foreground"
                                                    }`}
                                                >
                                                    <span className="text-muted-foreground mr-4">
                                                        {index + 1}
                                                    </span>
                                                    {item.type === "error"
                                                        ? "❌ "
                                                        : item.type === "result"
                                                        ? "✨ "
                                                        : "> "}
                                                    {item.content}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-muted-foreground leading-relaxed">
                                                <span className="text-muted-foreground mr-4">
                                                    1
                                                </span>
                                                Run your code to see output here
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CodePlayground;
