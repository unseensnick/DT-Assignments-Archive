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
    const [files, setFiles] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [activeFile, setActiveFile] = useState(null);
    const { resolvedTheme } = useTheme();

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
                // First try to get the directory listing
                const listResponse = await fetch(
                    `/api/assignments/files?folders=${topicSlug}`
                );

                if (!listResponse.ok) {
                    throw new Error("Failed to fetch file listing");
                }

                const fileList = await listResponse.json();
                const folderFiles = fileList[topicSlug] || {};

                // Transform the files into the format we need
                let allFiles = [];

                // Process HTML files
                if (folderFiles.html) {
                    allFiles.push(
                        ...folderFiles.html.map((file) => ({
                            name: file.name,
                            content: file.content,
                            language: "html",
                        }))
                    );
                }

                // Process CSS files
                if (folderFiles.css) {
                    allFiles.push(
                        ...folderFiles.css.map((file) => ({
                            name: file.name,
                            content: file.content,
                            language: "css",
                        }))
                    );
                }

                // Process JavaScript files
                if (folderFiles.javascript) {
                    allFiles.push(
                        ...folderFiles.javascript.map((file) => ({
                            name: file.name,
                            content: file.content,
                            language: "javascript",
                        }))
                    );
                }

                setFiles(allFiles);

                // Set the active file to index.html if it exists, otherwise the first HTML file
                const indexFile = allFiles.find((f) => f.name === "index.html");
                const firstHtmlFile = allFiles.find(
                    (f) => f.language === "html"
                );
                setActiveFile(indexFile || firstHtmlFile || allFiles[0]);
            } catch (error) {
                console.error("Error fetching assignment:", error);
            }
        };

        fetchAssignmentContent();
    }, [topicSlug]);

    if (!mounted || !resolvedTheme) return null;
    if (!topicSlug || !activeFile) return null;

    // Only show files that have content
    const validFiles = files.filter((file) => file.content);

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
                                                        validFiles.find(
                                                            (f) =>
                                                                f.language ===
                                                                "css"
                                                        )?.content || ""
                                                    }</style>
                                                    <base href="/assignments/tipsy-troll/${topicSlug}/" />
                                                </head>
                                                <body style="margin:0;background:${
                                                    resolvedTheme === "dark"
                                                        ? "#fff"
                                                        : "#fff"
                                                }">${activeFile.content}</body>
                                                <script>${
                                                    validFiles.find(
                                                        (f) =>
                                                            f.language ===
                                                            "javascript"
                                                    )?.content || ""
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
                                    files={validFiles}
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
