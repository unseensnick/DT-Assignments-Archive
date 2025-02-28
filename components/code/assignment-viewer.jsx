"use client";
import CodePlayground from "@/components/code/code-playground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseConfig } from "@/config/courses";
import {
    DEFAULT_PLAYGROUND_CONFIG,
    getTopicConfig,
} from "@/config/playground-config";
import { useApiData } from "@/lib/api-data-provider";
import { getTopicFolder } from "@/lib/file-mapping";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

const AssignmentViewer = ({
    courseSlug,
    moduleSlug,
    sectionSlug,
    topicSlug,
}) => {
    const [files, setFiles] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [activeFile, setActiveFile] = useState(null);
    const [componentLoading, setComponentLoading] = useState(true);
    const { resolvedTheme } = useTheme();
    const iframeRef = useRef(null);
    const processedFiles = useRef(false);

    // Get API context
    const { getFilesByFolders, loading: apiLoading } = useApiData();

    // Get configuration for this topic
    const playgroundConfig =
        getTopicConfig(courseConfig, {
            course: courseSlug,
            module: moduleSlug,
            section: sectionSlug,
            topic: topicSlug,
        }) || DEFAULT_PLAYGROUND_CONFIG;

    // Get folders from topic config
    const topicConfig =
        courseConfig[courseSlug]?.modules[moduleSlug]?.weeks?.[sectionSlug]
            ?.topics?.[topicSlug];
    const folders = topicConfig?.folders || [topicSlug];

    useEffect(() => {
        setMounted(true);
    }, []);

    // Load files only once
    useEffect(() => {
        if (!topicSlug || processedFiles.current) return;

        const loadFiles = async () => {
            setComponentLoading(true);

            try {
                // Use the folders from config or default to topicSlug
                const fileList = await getFilesByFolders(folders);

                if (fileList) {
                    processFiles(fileList);
                    processedFiles.current = true;
                }
            } catch (error) {
                console.error("Error loading files:", error);
            } finally {
                setComponentLoading(false);
            }
        };

        loadFiles();
    }, [topicSlug, folders, getFilesByFolders]);

    // Process files from API response
    const processFiles = (fileList) => {
        // Find the folder with content
        let allFiles = [];

        // Loop through all returned folders
        for (const folderName of Object.keys(fileList)) {
            const folderFiles = fileList[folderName];

            // Skip empty folders
            if (!folderFiles || Object.keys(folderFiles).length === 0) {
                continue;
            }

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
                        name:
                            file.name === "javascript.js"
                                ? "script.js"
                                : file.name,
                        content: file.content,
                        language: "javascript",
                    }))
                );
            }
        }

        console.log(
            "Processed files:",
            allFiles.map((f) => f.name)
        );
        setFiles(allFiles);

        // Set the active file to index.html if it exists, otherwise the first HTML file
        // If no HTML files, just use the first file
        const indexFile = allFiles.find((f) => f.name === "index.html");
        const firstHtmlFile = allFiles.find((f) => f.language === "html");
        const firstJsFile = allFiles.find((f) => f.language === "javascript");

        setActiveFile(indexFile || firstHtmlFile || firstJsFile || allFiles[0]);
    };

    // Effect to inject script directly into iframe after it loads
    useEffect(() => {
        if (!iframeRef.current || !files.length) return;

        // Get JavaScript files
        const jsFiles = files.filter((file) => file.language === "javascript");
        if (jsFiles.length === 0) return;

        const iframe = iframeRef.current;
        const handleLoad = () => {
            try {
                // Wait a brief moment for the iframe to fully initialize
                setTimeout(() => {
                    const iframeDocument =
                        iframe.contentDocument || iframe.contentWindow.document;

                    // Inject each JavaScript file as a script element
                    jsFiles.forEach((jsFile) => {
                        const scriptElement =
                            iframeDocument.createElement("script");
                        scriptElement.textContent = jsFile.content;
                        iframeDocument.body.appendChild(scriptElement);
                    });

                    console.log("Scripts injected into iframe");
                }, 100);
            } catch (error) {
                console.error("Error injecting scripts:", error);
            }
        };

        iframe.addEventListener("load", handleLoad);

        return () => {
            iframe.removeEventListener("load", handleLoad);
        };
    }, [iframeRef.current, files]);

    if (!mounted || !resolvedTheme) return null;
    if (componentLoading || apiLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg animate-pulse">
                    Loading assignment content...
                </div>
            </div>
        );
    }
    if (!activeFile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">
                    No files found for this assignment
                </div>
            </div>
        );
    }

    // Only show files that have content
    const validFiles = files.filter((file) => file.content);

    // Get all JavaScript files
    const jsFiles = validFiles.filter((file) => file.language === "javascript");
    const cssFiles = validFiles.filter((file) => file.language === "css");

    // Get title from config
    const previewTitle = playgroundConfig.previewTitle || "Preview";

    // For iframe type topics, show both preview and code
    if (topicConfig?.type === "iframe") {
        // Create HTML content WITHOUT JavaScript initially
        // We'll inject the JavaScript after the iframe loads
        const htmlContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>${topicSlug}</title>
                    ${cssFiles
                        .map((file) => `<style>${file.content}</style>`)
                        .join("")}
                </head>
                <body style="margin:0;background:${
                    resolvedTheme === "dark" ? "#fff" : "#fff"
                }">
                ${activeFile.content}
                </body>
            </html>
        `;

        return (
            <div className="min-h-screen pb-20">
                <div className="container mx-auto py-6">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-accent-foreground">
                                    {previewTitle}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Preview iframe with enhanced sandbox permissions */}
                                    <div
                                        className="rounded-lg border overflow-hidden bg-background"
                                        style={{
                                            height: `${playgroundConfig.previewHeight}px`,
                                        }}
                                    >
                                        <iframe
                                            ref={iframeRef}
                                            srcDoc={htmlContent}
                                            className="w-full h-full"
                                            sandbox="allow-scripts allow-forms allow-same-origin allow-modals allow-popups"
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
    }

    // For regular playground topics, only show the code playground (no preview)
    return (
        <div className="min-h-screen pb-20">
            <div className="container mx-auto py-6">
                <div className="space-y-6">
                    <CodePlayground
                        config={{
                            ...playgroundConfig,
                            initialExpanded: playgroundConfig.codeExpanded,
                        }}
                        files={validFiles}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignmentViewer;
