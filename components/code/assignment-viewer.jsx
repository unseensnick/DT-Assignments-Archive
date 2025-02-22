"use client";
import CodePlayground from "@/components/code/code-playground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseConfig } from "@/config/courses";
import { CheckCheck, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer";
import React, { useEffect, useState } from "react";

const DEFAULT_CONFIG = {
    title: "Assignment Preview",
    previewHeight: 600,
    codeHeight: 600,
    cssCardWidth: 500,
    htmlExpanded: false,
    cssExpanded: false,
    playground: {
        enabled: false,
    },
    animation: {
        duration: 300,
        easing: "ease-in-out",
    },
};

const AssignmentViewer = ({
    courseSlug,
    moduleSlug,
    sectionSlug,
    topicSlug,
}) => {
    const [content, setContent] = useState({
        html: "",
        css: "",
        javascript: "",
    });
    const [mounted, setMounted] = useState(false);
    const [htmlCopied, setHtmlCopied] = useState(false);
    const [cssCopied, setCssCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { resolvedTheme } = useTheme();

    const basePath = `tipsy-troll/${topicSlug}`;

    // Get configuration for this topic
    const moduleConfig = courseConfig[courseSlug]?.modules[moduleSlug];
    const sectionConfig = moduleConfig?.sections[sectionSlug];
    const defaultViewerConfig = sectionConfig?.viewerConfig || DEFAULT_CONFIG;
    const topicConfig = sectionConfig?.topicConfigs?.[topicSlug];
    const viewerConfig = { ...defaultViewerConfig, ...topicConfig };

    // Get animation settings
    const animationDuration =
        viewerConfig.animation?.duration || DEFAULT_CONFIG.animation.duration;
    const animationEasing =
        viewerConfig.animation?.easing || DEFAULT_CONFIG.animation.easing;
    const transitionStyle = `all ${animationDuration}ms ${animationEasing}`;

    useEffect(() => {
        setMounted(true);
        setIsExpanded(
            viewerConfig.htmlExpanded || viewerConfig.cssExpanded || false
        );
    }, [viewerConfig.htmlExpanded, viewerConfig.cssExpanded]);

    useEffect(() => {
        if (!topicSlug) return;

        const fetchAssignmentContent = async () => {
            try {
                const htmlResponse = await fetch(
                    `/api/assignments/${basePath}/index.html`
                );
                let htmlContent = "";
                if (htmlResponse.ok) {
                    htmlContent = await htmlResponse.text();
                }

                const cssResponse = await fetch(
                    `/api/assignments/${basePath}/style.css`
                );
                let cssContent = "";
                if (cssResponse.ok) {
                    cssContent = await cssResponse.text();
                }

                const jsResponse = await fetch(
                    `/api/assignments/${basePath}/script.js`
                );
                let jsContent = "";
                if (jsResponse.ok) {
                    jsContent = await jsResponse.text();
                }

                setContent({
                    html: htmlContent,
                    css: cssContent,
                    javascript: jsContent,
                });
            } catch (error) {
                console.error("Error fetching assignment:", error);
            }
        };

        fetchAssignmentContent();
    }, [basePath]);

    const copyCode = async (code, setCopiedState) => {
        await navigator.clipboard.writeText(code);
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2000);
    };

    if (!mounted || !resolvedTheme) return null;
    if (!topicSlug) return null;

    const currentTheme =
        resolvedTheme === "dark" ? themes.nightOwl : themes.github;

    const showPlayground =
        viewerConfig.playground?.enabled && content.javascript;

    return (
        <div className="min-h-screen pb-20">
            <div className="container mx-auto py-6">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-accent-foreground">
                                {viewerConfig.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Preview iframe */}
                                <div
                                    className="rounded-lg border overflow-hidden bg-background"
                                    style={{
                                        height: `${
                                            !isExpanded
                                                ? viewerConfig.previewHeight * 2
                                                : viewerConfig.previewHeight
                                        }px`,
                                        transition: transitionStyle,
                                    }}
                                >
                                    <iframe
                                        srcDoc={`
                                                <!DOCTYPE html>
                                                <html>
                                                    <head>
                                                        <style>${
                                                            content.css
                                                        }</style>
                                                        <base href="/assignments/${basePath}/" />
                                                    </head>
                                                    <body style="margin:0;background:${
                                                        resolvedTheme === "dark"
                                                            ? "#fff"
                                                            : "#fff"
                                                    }">${content.html}</body>
                                                </html>
                                            `}
                                        className="w-full h-full"
                                        sandbox="allow-scripts"
                                        title="Assignment Preview"
                                    />
                                </div>

                                {/* Code editors and playground container */}
                                <div className="flex flex-row gap-6 overflow-x-auto">
                                    {/* HTML Card */}
                                    <Card className="min-w-[300px] flex-1">
                                        <CardHeader
                                            className={`flex flex-row items-center justify-between ${
                                                !isExpanded
                                                    ? "h-12 py-0"
                                                    : "p-4"
                                            }`}
                                            style={{
                                                transition: transitionStyle,
                                            }}
                                        >
                                            <CardTitle className="text-sm">
                                                HTML
                                            </CardTitle>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        copyCode(
                                                            content.html,
                                                            setHtmlCopied
                                                        )
                                                    }
                                                >
                                                    {htmlCopied ? (
                                                        <CheckCheck className="size-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="size-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        setIsExpanded(
                                                            !isExpanded
                                                        )
                                                    }
                                                >
                                                    {isExpanded ? (
                                                        <ChevronUp className="size-4" />
                                                    ) : (
                                                        <ChevronDown className="size-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div
                                                className="overflow-auto"
                                                style={{
                                                    height: isExpanded
                                                        ? `${viewerConfig.codeHeight}px`
                                                        : 0,
                                                    transition: transitionStyle,
                                                }}
                                            >
                                                <Highlight
                                                    theme={currentTheme}
                                                    code={content.html}
                                                    language="html"
                                                >
                                                    {({
                                                        className,
                                                        style,
                                                        tokens,
                                                        getLineProps,
                                                        getTokenProps,
                                                    }) => (
                                                        <pre
                                                            className={`p-4 ${
                                                                resolvedTheme ===
                                                                "dark"
                                                                    ? "bg-muted/50"
                                                                    : "bg-muted"
                                                            }`}
                                                            style={style}
                                                        >
                                                            {tokens.map(
                                                                (line, i) => (
                                                                    <div
                                                                        key={i}
                                                                        {...getLineProps(
                                                                            {
                                                                                line,
                                                                            }
                                                                        )}
                                                                        className="leading-relaxed"
                                                                    >
                                                                        <span className="text-muted-foreground mr-4">
                                                                            {i +
                                                                                1}
                                                                        </span>
                                                                        {line.map(
                                                                            (
                                                                                token,
                                                                                key
                                                                            ) => (
                                                                                <span
                                                                                    key={
                                                                                        key
                                                                                    }
                                                                                    {...getTokenProps(
                                                                                        {
                                                                                            token,
                                                                                        }
                                                                                    )}
                                                                                />
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}
                                                        </pre>
                                                    )}
                                                </Highlight>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* CSS Card */}
                                    {content.css && (
                                        <Card
                                            className="min-w-[300px]"
                                            style={{
                                                flex: "0 0 auto",
                                                width: `${viewerConfig.cssCardWidth}px`,
                                                transition: transitionStyle,
                                            }}
                                        >
                                            <CardHeader
                                                className={`flex flex-row items-center justify-between ${
                                                    !isExpanded
                                                        ? "h-12 py-0"
                                                        : "p-4"
                                                }`}
                                                style={{
                                                    transition: transitionStyle,
                                                }}
                                            >
                                                <CardTitle className="text-sm">
                                                    CSS
                                                </CardTitle>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            copyCode(
                                                                content.css,
                                                                setCssCopied
                                                            )
                                                        }
                                                    >
                                                        {cssCopied ? (
                                                            <CheckCheck className="size-4 text-green-500" />
                                                        ) : (
                                                            <Copy className="size-4" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            setIsExpanded(
                                                                !isExpanded
                                                            )
                                                        }
                                                    >
                                                        {isExpanded ? (
                                                            <ChevronUp className="size-4" />
                                                        ) : (
                                                            <ChevronDown className="size-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <div
                                                    className="overflow-auto"
                                                    style={{
                                                        height: isExpanded
                                                            ? `${viewerConfig.codeHeight}px`
                                                            : 0,
                                                        transition:
                                                            transitionStyle,
                                                    }}
                                                >
                                                    <Highlight
                                                        theme={currentTheme}
                                                        code={content.css}
                                                        language="css"
                                                    >
                                                        {({
                                                            className,
                                                            style,
                                                            tokens,
                                                            getLineProps,
                                                            getTokenProps,
                                                        }) => (
                                                            <pre
                                                                className={`p-4 ${
                                                                    resolvedTheme ===
                                                                    "dark"
                                                                        ? "bg-muted/50"
                                                                        : "bg-muted"
                                                                }`}
                                                                style={style}
                                                            >
                                                                {tokens.map(
                                                                    (
                                                                        line,
                                                                        i
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            {...getLineProps(
                                                                                {
                                                                                    line,
                                                                                }
                                                                            )}
                                                                            className="leading-relaxed"
                                                                        >
                                                                            <span className="text-muted-foreground mr-4">
                                                                                {i +
                                                                                    1}
                                                                            </span>
                                                                            {line.map(
                                                                                (
                                                                                    token,
                                                                                    key
                                                                                ) => (
                                                                                    <span
                                                                                        key={
                                                                                            key
                                                                                        }
                                                                                        {...getTokenProps(
                                                                                            {
                                                                                                token,
                                                                                            }
                                                                                        )}
                                                                                    />
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </pre>
                                                        )}
                                                    </Highlight>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* JavaScript Playground */}
                                    {showPlayground && (
                                        <div className="min-w-[300px] flex-1">
                                            <CodePlayground
                                                title={
                                                    viewerConfig.playground
                                                        .title || "JavaScript"
                                                }
                                                files={[
                                                    {
                                                        name:
                                                            viewerConfig
                                                                .playground
                                                                .fileName ||
                                                            "script.js",
                                                        content:
                                                            content.javascript,
                                                        language:
                                                            viewerConfig
                                                                .playground
                                                                .language ||
                                                            "javascript",
                                                    },
                                                ]}
                                                animationDuration={
                                                    viewerConfig.playground
                                                        .animationDuration ||
                                                    500
                                                }
                                                animationEasing={
                                                    viewerConfig.playground
                                                        .animationEasing ||
                                                    "ease-in-out"
                                                }
                                                consoleWidth={
                                                    viewerConfig.playground
                                                        .consoleWidth || 40
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AssignmentViewer;
