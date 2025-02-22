import PlaygroundClient from "@/components/code/playground-client";
import { getCodeFiles } from "@/lib/script-utils";
import { notFound } from "next/navigation";
import { playgroundConfigs } from "../../config";

export async function generateStaticParams() {
    const weeks = Object.keys(playgroundConfigs);
    const paths = [];

    weeks.forEach((week) => {
        Object.keys(playgroundConfigs[week]).forEach((topic) => {
            paths.push({
                week,
                topic,
            });
        });
    });

    return paths;
}

export default async function PlaygroundPage({ params }) {
    const resolvedParams = await Promise.resolve(params);
    const week = resolvedParams.week;
    const topic = resolvedParams.topic;

    if (!playgroundConfigs[week]?.[topic]) {
        notFound();
    }

    const config = playgroundConfigs[week][topic];
    const codeFiles = await getCodeFiles("assignments", {
        folders: config.folders,
    });

    const playgroundConfig = {
        consoleWidth: config.consoleWidth,
        animationDuration: config.animationDuration,
        animationEasing: config.animationEasing,
    };

    return (
        <div className="h-full flex flex-col overflow-auto">
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
