"use client";

import IsolatedCodeEditor from "@/components/code/advanced-ide";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courseConfig } from "@/config/courses";
import { getTopicConfig } from "@/config/playground-config";
import React, { useEffect, useState } from "react";

const IsolatedAssignmentViewer = ({
    courseSlug,
    moduleSlug,
    sectionSlug,
    topicSlug,
}) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeView, setActiveView] = useState("edit"); // "edit" or "preview"

    // Get configuration for this topic
    const playgroundConfig = getTopicConfig(courseConfig, {
        course: courseSlug,
        module: moduleSlug,
        section: sectionSlug,
        topic: topicSlug,
    }) || {
        title: topicSlug,
        previewHeight: 500,
        codeHeight: 400,
        initialExpanded: true,
    };

    useEffect(() => {
        if (!topicSlug) return;

        const fetchAssignmentContent = async () => {
            setLoading(true);
            try {
                // Fetch the directory listing
                const listResponse = await fetch(
                    `/api/assignments/files?folders=${topicSlug}`
                );

                if (!listResponse.ok) {
                    throw new Error("Failed to fetch file listing");
                }

                const fileList = await listResponse.json();
                const folderFiles = fileList[topicSlug] || {};

                // Transform the files into the format our editor needs
                let allFiles = [];

                // Process HTML files
                if (folderFiles.html) {
                    allFiles.push(
                        ...folderFiles.html.map((file) => ({
                            id: `html-${file.name}`,
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
                            id: `css-${file.name}`,
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
                            id: `js-${file.name}`,
                            name: file.name,
                            content: file.content,
                            language: "javascript",
                        }))
                    );
                }

                setFiles(allFiles);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching assignment:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAssignmentContent();
    }, [topicSlug]);

    // Create config for our isolated code editor
    const editorConfig = {
        title: playgroundConfig.title || "Assignment Editor",
        height: playgroundConfig.codeHeight || 400,
        previewHeight: playgroundConfig.previewHeight || 500,
        initialExpanded: playgroundConfig.initialExpanded !== false,
        animationDuration: playgroundConfig.animation?.duration || 300,
        animationEasing: playgroundConfig.animation?.easing || "ease",
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-muted-foreground">
                    Loading assignment...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">
                    Failed to load assignment: {error}
                </div>
            </div>
        );
    }

    if (files.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-muted-foreground">
                    No files found for this assignment.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20">
            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-accent-foreground flex justify-between items-center">
                            <span>{playgroundConfig.title || topicSlug}</span>
                            <Tabs
                                value={activeView}
                                onValueChange={setActiveView}
                            >
                                <TabsList>
                                    <TabsTrigger value="edit">
                                        Editor
                                    </TabsTrigger>
                                    <TabsTrigger value="preview">
                                        Full Preview
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <TabsContent value="edit" className="mt-0">
                                {/* Isolated Code Editor */}
                                <IsolatedCodeEditor
                                    initialFiles={files}
                                    {...editorConfig}
                                />
                            </TabsContent>

                            <TabsContent value="preview" className="mt-0">
                                {/* Full page preview in an isolated iframe */}
                                <div
                                    className="rounded-lg border overflow-hidden bg-white"
                                    style={{
                                        height: `${
                                            editorConfig.previewHeight +
                                            editorConfig.height
                                        }px`,
                                    }}
                                >
                                    <iframe
                                        srcDoc={generateFullPagePreview(files)}
                                        className="w-full h-full"
                                        sandbox="allow-scripts"
                                        title="Assignment Preview"
                                    />
                                </div>
                            </TabsContent>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// Helper function to generate a completely isolated full-page preview
function generateFullPagePreview(files) {
    // Find the primary files
    const htmlFile =
        files.find((file) => file.name === "index.html") ||
        files.find((file) => file.language === "html");
    const cssFiles = files.filter((file) => file.language === "css");
    const jsFiles = files.filter((file) => file.language === "javascript");

    // Start with a base HTML template if no HTML file exists
    let html = htmlFile
        ? htmlFile.content
        : `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
      </head>
      <body>
        <h1>Preview</h1>
        <p>No HTML content available</p>
      </body>
      </html>`;

    // Ensure we have a complete HTML document
    if (!html.includes("<!DOCTYPE")) {
        html = `<!DOCTYPE html>\n<html>\n<head>\n<title>Preview</title>\n</head>\n<body>\n${html}\n</body>\n</html>`;
    }

    // Insert CSS content
    if (cssFiles.length > 0) {
        let cssContent = "";
        cssFiles.forEach((file) => {
            cssContent += `/* ${file.name} */\n${file.content}\n\n`;
        });

        // Add CSS to the head
        if (html.includes("</head>")) {
            html = html.replace(
                "</head>",
                `<style>\n${cssContent}\n</style>\n</head>`
            );
        } else {
            // Create head if it doesn't exist
            html = html.replace(
                "<html>",
                "<html>\n<head>\n<style>\n${cssContent}\n</style>\n</head>"
            );
        }
    }

    // Insert JS content
    if (jsFiles.length > 0) {
        let jsContent = "";
        jsFiles.forEach((file) => {
            jsContent += `/* ${file.name} */\n${file.content}\n\n`;
        });

        // Add JS right before body closes
        if (html.includes("</body>")) {
            html = html.replace(
                "</body>",
                `<script>\n${jsContent}\n</script>\n</body>`
            );
        } else {
            // Append to the end if no body tag
            html += `<script>\n${jsContent}\n</script>`;
        }
    }

    // Add a base target to prevent links from navigating out of the iframe
    if (html.includes("<head>")) {
        html = html.replace("<head>", '<head>\n<base target="_self">');
    }

    return html;
}

export default IsolatedAssignmentViewer;
