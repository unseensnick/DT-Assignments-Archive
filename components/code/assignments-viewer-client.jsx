"use client";

import AssignmentViewer from "@/components/code/assignment-viewer";
import PlaygroundClient from "@/components/code/playground-client";
import { useApiData } from "@/lib/api-data-provider";
import { useEffect, useState } from "react";

export default function AssignmentsViewerClient({
    type,
    folderConfig,
    playgroundConfig,
    params,
}) {
    const [codeFiles, setCodeFiles] = useState(null);
    const [error, setError] = useState(null);
    const { getFilesByFolders, loading } = useApiData();

    useEffect(() => {
        if (type === "playground" && folderConfig) {
            const loadFiles = async () => {
                try {
                    // Use the context function to get files
                    const files = await getFilesByFolders(folderConfig);
                    setCodeFiles(files);
                } catch (err) {
                    console.error("Failed to load files:", err);
                    setError(err.message);
                }
            };

            loadFiles();
        }
    }, [type, folderConfig, getFilesByFolders]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">
                    Failed to load files: {error}
                </div>
            </div>
        );
    }

    if (loading || (type === "playground" && !codeFiles)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-muted-foreground animate-pulse">
                    Loading files...
                </div>
            </div>
        );
    }

    if (type === "playground") {
        return (
            <div className="min-h-screen overflow-auto">
                <div className="w-full p-14 flex flex-col items-center">
                    <div className="w-full max-w-6xl">
                        <PlaygroundClient
                            files={codeFiles}
                            playgroundConfig={playgroundConfig}
                            className="w-full"
                            topicSlug={params?.topic}
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (type === "iframe") {
        return (
            <div className="min-h-screen overflow-auto">
                <AssignmentViewer
                    courseSlug={params.courseSlug}
                    moduleSlug={params.moduleSlug}
                    sectionSlug={params.sectionSlug}
                    topicSlug={params.topicSlug}
                />
            </div>
        );
    }

    return null;
}
