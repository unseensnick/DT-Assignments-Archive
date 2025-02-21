"use client";

import CodePlayground from "@/components/code/code-playground";
import React from "react";

const PlaygroundClient = ({
    files,
    playgroundConfig = {},
    className = "space-y-8",
}) => {
    const { consoleWidth, animationDuration, animationEasing } =
        playgroundConfig;

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

    const folders = Object.entries(files).map(([folderName, folderFiles]) => ({
        name: folderName,
        files: transformFilesForPlayground(folderFiles),
    }));

    return (
        <div className={className}>
            {folders.map((folder) => (
                <div key={`folder-${folder.name}`} className="space-y-8 mb-12">
                    <CodePlayground
                        key={`playground-${folder.name}`}
                        title={folder.name}
                        files={folder.files}
                        consoleWidth={consoleWidth}
                        animationDuration={animationDuration}
                        animationEasing={animationEasing}
                    />
                </div>
            ))}
        </div>
    );
};

export default PlaygroundClient;
