import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck, Copy, Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer";
import React, { useEffect, useState } from "react";

const ANIMATION_SETTINGS = {
    duration: 500,
    easing: "ease-in-out",
    consoleWidth: 40,
};

const CodePlayground = ({
    title = "Code Playground",
    files,
    animationDuration = ANIMATION_SETTINGS.duration,
    animationEasing = ANIMATION_SETTINGS.easing,
    consoleWidth = ANIMATION_SETTINGS.consoleWidth,
}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [output, setOutput] = useState([]);
    const [isCopied, setIsCopied] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showConsole, setShowConsole] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const copyCode = async () => {
        await navigator.clipboard.writeText(files[activeTab].content);
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
                    .join(" ")
                    .replace(/\\n/g, "\n"),
            });
            setOutput([...outputs]);
            originalLog.apply(console, args);
        };

        try {
            const currentFile = files[activeTab];
            if (currentFile.language === "html") {
                outputs.push({
                    type: "html",
                    content: currentFile.content,
                });
            } else if (currentFile.language === "css") {
                outputs.push({
                    type: "css",
                    content: currentFile.content,
                });
            } else {
                const result = new Function(currentFile.content)();
                if (result !== undefined) {
                    outputs.push({
                        type: "result",
                        content: String(result),
                    });
                }
            }
        } catch (error) {
            outputs.push({
                type: "error",
                content: error.toString(),
            });
        } finally {
            console.log = originalLog;
            setOutput([...outputs]);
            setShowConsole(true);
        }
    };

    const toggleConsole = () => {
        if (!showConsole) {
            runCode();
        } else {
            setShowConsole(false);
            setOutput([]);
        }
    };

    // Don't render prism until mounted and theme is resolved
    if (!mounted || !resolvedTheme) {
        return null;
    }

    const currentTheme =
        resolvedTheme === "dark" ? themes.nightOwl : themes.github;

    const gridTemplateColumns = showConsole
        ? `${100 - consoleWidth}% ${consoleWidth}%`
        : "100% 0%";

    const renderOutput = (item) => {
        switch (item.type) {
            case "html":
                return (
                    <div
                        className="preview-frame"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                );
            case "css":
                return (
                    <div className="preview-styles">
                        <style>{item.content}</style>
                        <div className="preview-container">CSS Preview</div>
                    </div>
                );
            default:
                return (
                    <div
                        className={`leading-relaxed whitespace-pre-wrap ${
                            item.type === "error"
                                ? "text-red-500"
                                : item.type === "result"
                                ? "text-green-500"
                                : "text-foreground"
                        }`}
                    >
                        <span className="text-muted-foreground mr-4">
                            {item.type === "error"
                                ? "❌"
                                : item.type === "result"
                                ? "✨"
                                : ">"}
                        </span>
                        {item.content}
                    </div>
                );
        }
    };

    return (
        <div className="space-y-4">
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-accent-foreground capitalize">
                        {title}
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={copyCode}>
                            {isCopied ? (
                                <CheckCheck className="size-4 text-green-500" />
                            ) : (
                                <Copy className="size-4" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleConsole}
                            className={showConsole ? "bg-muted" : ""}
                        >
                            <Terminal className="size-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="border-b">
                        <div className="flex">
                            {files.map((file, index) => (
                                <button
                                    key={file.name}
                                    onClick={() => setActiveTab(index)}
                                    className={`px-4 py-2 text-sm font-medium ${
                                        activeTab === index
                                            ? "border-b-2 border-primary text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {file.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div
                        className="grid"
                        style={{
                            gridTemplateColumns,
                            transition: `all ${animationDuration}ms ${animationEasing}`,
                        }}
                    >
                        <div className="w-full">
                            <Highlight
                                theme={currentTheme}
                                code={files[activeTab].content}
                                language={files[activeTab].language}
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
                                            resolvedTheme === "dark"
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

                        <div
                            className="border-l"
                            style={{
                                transition: `all ${animationDuration}ms ${animationEasing}`,
                                opacity: showConsole ? 1 : 0,
                                transform: `translateX(${
                                    showConsole ? 0 : 100
                                }%)`,
                            }}
                        >
                            <div
                                className={`h-full ${
                                    resolvedTheme === "dark"
                                        ? "bg-muted/50"
                                        : "bg-muted"
                                }`}
                            >
                                <div className="p-4">
                                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                                        Output
                                    </h3>
                                    <div className="font-mono text-sm space-y-2">
                                        {output.length > 0 ? (
                                            output.map((item, index) => (
                                                <div key={index}>
                                                    {renderOutput(item)}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-muted-foreground">
                                                Run code to see output
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
