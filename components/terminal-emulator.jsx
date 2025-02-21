"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import { useState } from "react";
import JSONPretty from "react-json-pretty";

const jsonTheme = {
    light: {
        main: "line-height:1.3;color:var(--foreground);background:var(--background);overflow:auto;",
        key: "color:var(--primary);",
        string: "color:var(--chart-2);",
        value: "color:var(--chart-4);",
        boolean: "color:var(--chart-1);",
    },
    dark: {
        main: "line-height:1.3;color:var(--foreground);background:transparent;overflow:auto;",
        key: "color:var(--primary);",
        string: "color:var(--chart-2);",
        value: "color:var(--chart-4);",
        boolean: "color:var(--chart-1);",
    },
};

export function Terminal({ title, content, isOpen = false, onToggle, index }) {
    const [copiedStates, setCopiedStates] = useState({});

    const copyContent = async (content, itemIndex) => {
        const textContent =
            typeof content === "object"
                ? JSON.stringify(content, null, 2)
                : String(content);

        await navigator.clipboard.writeText(textContent);

        setCopiedStates((prev) => ({ ...prev, [itemIndex]: true }));
        setTimeout(() => {
            setCopiedStates((prev) => ({ ...prev, [itemIndex]: false }));
        }, 2000);
    };

    return (
        <Collapsible open={isOpen} className="w-full">
            <Card className="bg-card text-card-foreground border border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CollapsibleTrigger
                        onClick={() => onToggle(index)}
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
                    <CardContent className="space-y-4">
                        {content.map((item, i) => (
                            <div key={i} className="space-y-2 relative group">
                                <div className="text-primary font-mono flex justify-between items-center">
                                    <span>{item.label}:</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            copyContent(
                                                item.value,
                                                `${index}-${i}`
                                            )
                                        }
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        {copiedStates[`${index}-${i}`] ? (
                                            <span className="text-xs text-muted-foreground">
                                                Copied!
                                            </span>
                                        ) : (
                                            <Copy className="size-4" />
                                        )}
                                    </Button>
                                </div>
                                <div className="pl-4 font-mono">
                                    {typeof item.value === "object" ? (
                                        <JSONPretty
                                            data={item.value}
                                            theme={jsonTheme.dark}
                                        />
                                    ) : (
                                        <span className="text-chart-4">
                                            {String(item.value)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
}

export default Terminal;
