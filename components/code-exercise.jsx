import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CheckCheck, ChevronDown, ChevronRight, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer";
import React, { useEffect, useState } from "react";

export function CodeExercise({
    title,
    description,
    instructions,
    code,
    language = "javascript",
    hints = [],
    isOpen: defaultIsOpen = true,
    onToggle,
    index,
}) {
    const [isCopied, setIsCopied] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(defaultIsOpen);

    useEffect(() => {
        setMounted(true);
    }, []);

    const copyCode = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (onToggle) {
            onToggle(index);
        }
    };

    const currentTheme = mounted
        ? theme === "dark"
            ? themes.nightOwl
            : themes.github
        : themes.github;

    return (
        <Collapsible open={isOpen} className="w-full">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CollapsibleTrigger
                        onClick={handleToggle}
                        className="flex items-center space-x-2 hover:text-primary transition-colors"
                    >
                        {isOpen ? (
                            <ChevronDown className="size-4" />
                        ) : (
                            <ChevronRight className="size-4" />
                        )}
                        <CardTitle className="text-primary">{title}</CardTitle>
                    </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                    <CardContent className="p-6 space-y-6">
                        {/* Description Section */}
                        <div className="prose dark:prose-invert max-w-none">
                            <p>{description}</p>
                        </div>

                        {/* Instructions Section */}
                        <div className="space-y-2">
                            <h3 className="font-semibold text-muted-foreground">
                                Instructions:
                            </h3>
                            <div className="pl-4 border-l-2 border-primary/20">
                                {instructions.split("\n").map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </div>

                        {/* Code Block with Theme-Aware Syntax Highlighting */}
                        {mounted && code && (
                            <div className="relative group">
                                <div className="absolute right-2 top-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={copyCode}
                                        className="opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        {isCopied ? (
                                            <CheckCheck className="size-4 text-green-500" />
                                        ) : (
                                            <Copy className="size-4" />
                                        )}
                                    </Button>
                                </div>
                                <div className="rounded-lg overflow-hidden border">
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
                                                    theme === "dark"
                                                        ? "bg-muted/50"
                                                        : "bg-muted"
                                                }`}
                                                style={style}
                                            >
                                                {tokens.map((line, i) => (
                                                    <div
                                                        key={i}
                                                        {...getLineProps({
                                                            line,
                                                        })}
                                                        className="leading-relaxed"
                                                    >
                                                        {line.map(
                                                            (token, key) => (
                                                                <span
                                                                    key={key}
                                                                    {...getTokenProps(
                                                                        {
                                                                            token,
                                                                        }
                                                                    )}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                ))}
                                            </pre>
                                        )}
                                    </Highlight>
                                </div>
                            </div>
                        )}

                        {/* Hints Section */}
                        {hints.length > 0 && (
                            <Collapsible className="w-full">
                                <CollapsibleTrigger className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <span>💡 Show Hints</span>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pt-2">
                                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                        {hints.map((hint, index) => (
                                            <li key={index}>{hint}</li>
                                        ))}
                                    </ul>
                                </CollapsibleContent>
                            </Collapsible>
                        )}
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
}

export default CodeExercise;
