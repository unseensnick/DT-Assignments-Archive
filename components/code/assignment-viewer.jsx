// assignment-viewer.jsx
"use client";
import CodePlayground from "@/components/code/code-playground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseConfig } from "@/config/courses";
import {
    DEFAULT_PLAYGROUND_CONFIG,
    getTopicConfig,
} from "@/config/playground-config";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

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
    const { resolvedTheme } = useTheme();

    const basePath = `tipsy-troll/${topicSlug}`;

    // Get configuration for this topic
    const playgroundConfig =
        getTopicConfig(courseConfig, {
            course: courseSlug,
            module: moduleSlug,
            section: sectionSlug,
            topic: topicSlug,
        }) || DEFAULT_PLAYGROUND_CONFIG;

    useEffect(() => {
        setMounted(true);
    }, []);

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
    }, [basePath, topicSlug]);

    if (!mounted || !resolvedTheme) return null;
    if (!topicSlug) return null;

    // Prepare files for CodePlayground
    const files = [
        {
            name: "index.html",
            content: content.html,
            language: "html",
        },
        content.css && {
            name: "style.css",
            content: content.css,
            language: "css",
        },
        content.javascript && {
            name: "script.js",
            content: content.javascript,
            language: "javascript",
        },
    ].filter(Boolean);

    return (
        <div className="min-h-screen pb-20">
            <div className="container mx-auto py-6">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-accent-foreground">
                                {playgroundConfig.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Preview iframe */}
                                <div
                                    className="rounded-lg border overflow-hidden bg-background"
                                    style={{
                                        height: `${playgroundConfig.previewHeight}px`,
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
                                                <script>${
                                                    content.javascript
                                                }</script>
                                            </html>
                                        `}
                                        className="w-full h-full"
                                        sandbox="allow-scripts"
                                        title="Assignment Preview"
                                    />
                                </div>

                                {/* Code Playground */}
                                <CodePlayground
                                    config={{
                                        ...playgroundConfig,
                                        initialExpanded:
                                            playgroundConfig.codeExpanded,
                                    }}
                                    files={files}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AssignmentViewer;
