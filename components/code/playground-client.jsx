import CodePlayground from "@/components/code/code-playground";
import { createPlaygroundConfig } from "@/config/playground-config";
import React from "react";

const PlaygroundClient = ({
    files,
    playgroundConfig = {},
    className = "space-y-8",
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

    const folders = Object.entries(files).map(([folderName, folderFiles]) => ({
        name: folderName,
        files: transformFilesForPlayground(folderFiles),
    }));

    return (
        <div className={className}>
            {folders.map((folder) => {
                // Create a config for each playground instance with the folder name as title
                const config = createPlaygroundConfig({
                    ...playgroundConfig,
                    title: folder.name,
                });

                return (
                    <div
                        key={`folder-${folder.name}`}
                        className="space-y-8 mb-12"
                    >
                        <CodePlayground
                            key={`playground-${folder.name}`}
                            config={config}
                            files={folder.files}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default PlaygroundClient;
