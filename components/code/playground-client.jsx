import CodePlayground from "@/components/code/code-playground";
import { createPlaygroundConfig } from "@/config/playground-config";
import { getTopicFolder } from "@/lib/file-mapping";
import React from "react";

const PlaygroundClient = ({
    files,
    playgroundConfig = {},
    className = "space-y-8",
    topicSlug = "",
}) => {
    const transformFilesForPlayground = (folderFiles) => {
        const allFiles = Object.entries(folderFiles).reduce(
            (acc, [type, files]) => {
                return acc.concat(
                    files.map((file) => ({
                        name: file.name,
                        content: file.content,
                        language: file.language,
                    }))
                );
            },
            []
        );

        return allFiles;
    };

    // If there are no files, return null to prevent rendering empty components
    if (!files || Object.keys(files).length === 0) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500">
                    No files found for this assignment.
                </p>
            </div>
        );
    }

    console.log("Files to display:", Object.keys(files));

    // Try to find the folder that matches the topic slug
    let matchingFolder = null;
    if (topicSlug) {
        const mappedFolder = getTopicFolder(topicSlug);
        if (files[mappedFolder]) {
            matchingFolder = mappedFolder;
        } else if (files[topicSlug]) {
            matchingFolder = topicSlug;
        }
    }

    // If we have a matching folder, only display files from that folder
    if (matchingFolder) {
        console.log(
            `Found matching folder for ${topicSlug}: ${matchingFolder}`
        );
        const folderFiles = files[matchingFolder];
        const transformedFiles = transformFilesForPlayground(folderFiles);

        if (transformedFiles.length === 0) {
            return (
                <div className="p-6 text-center">
                    <p className="text-yellow-500">
                        Found folder {matchingFolder} but it contains no valid
                        files.
                    </p>
                </div>
            );
        }

        // Create config for the playground
        const config = createPlaygroundConfig({
            ...playgroundConfig,
            title: playgroundConfig.title || matchingFolder,
            codeTitle:
                playgroundConfig.codeTitle || `${matchingFolder} Examples`,
        });

        return (
            <div className={className}>
                <CodePlayground config={config} files={transformedFiles} />
            </div>
        );
    }

    // If no specific match, show all folders
    return (
        <div className={className}>
            {Object.entries(files).map(([folderName, folderFiles]) => {
                // Skip folders with no files
                if (!folderFiles || Object.keys(folderFiles).length === 0) {
                    return null;
                }

                // Create a config for this folder
                const config = createPlaygroundConfig({
                    ...playgroundConfig,
                    title: folderName,
                    codeTitle:
                        playgroundConfig.codeTitle || `${folderName} Examples`,
                });

                const transformedFiles =
                    transformFilesForPlayground(folderFiles);

                // Only render if we have files
                if (transformedFiles.length === 0) {
                    return null;
                }

                return (
                    <div
                        key={`folder-${folderName}`}
                        className="space-y-8 mb-12"
                    >
                        <CodePlayground
                            key={`playground-${folderName}`}
                            config={config}
                            files={transformedFiles}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default PlaygroundClient;
