"use client";

import CodePlayground from "@/components/code/code-playground";
import React from "react";

const PlaygroundClient = ({
    files,
    playgroundConfig = {},
    className = "space-y-8",
}) => {
    const {
        consoleWidth,
        animationDuration,
        animationEasing,
        language,
        title,
    } = playgroundConfig;

    return (
        <div className={className}>
            {files.map((file, index) => (
                <CodePlayground
                    key={index}
                    title={title || file.name}
                    code={file.content}
                    language={language}
                    consoleWidth={consoleWidth}
                    animationDuration={animationDuration}
                    animationEasing={animationEasing}
                />
            ))}
        </div>
    );
};

export default PlaygroundClient;
