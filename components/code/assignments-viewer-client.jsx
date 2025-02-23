"use client";

import AssignmentViewer from "@/components/code/assignment-viewer";
import PlaygroundClient from "@/components/code/playground-client";
import { getCodeFiles } from "@/lib/script-utils";
import { useEffect, useState } from "react";

export default function AssignmentsViewerClient({
    type,
    folderConfig,
    playgroundConfig,
    params,
}) {
    const [codeFiles, setCodeFiles] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (type === "playground" && folderConfig) {
            const loadFiles = async () => {
                try {
                    const files = await getCodeFiles("assignments", {
                        folders: folderConfig,
                    });
                    setCodeFiles(files);
                } catch (err) {
                    console.error("Failed to load files:", err);
                    setError(err.message);
                }
            };
            loadFiles();
        }
    }, [type, folderConfig]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">
                    Failed to load files: {error}
                </div>
            </div>
        );
    }

    if (type === "playground") {
        if (!codeFiles) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-muted-foreground">Loading...</div>
                </div>
            );
        }

        return (
            <div className="min-h-screen overflow-auto">
                <div className="w-full p-14 flex flex-col items-center">
                    <div className="w-full max-w-6xl">
                        <PlaygroundClient
                            files={codeFiles}
                            playgroundConfig={playgroundConfig}
                            className="w-full"
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
