import PlaygroundClient from "@/components/code/playground-client";
import { getJavaScriptFiles } from "@/lib/script-utils";

export default async function PlaygroundPage() {
    const jsFiles = await getJavaScriptFiles();

    const playgroundConfig = {
        title: "JavaScript:",
        consoleWidth: 35,
        animationDuration: 500,
        animationEasing: "ease-in-out",
        language: "javascript",
    };

    return (
        <div className="h-full flex flex-col overflow-auto">
            <div className="w-full p-14 flex flex-col items-center">
                <div className="w-full max-w-6xl">
                    <h1 className="text-3xl font-bold mb-6 text-primary">
                        JavaScript Playground
                    </h1>
                    <PlaygroundClient
                        files={jsFiles}
                        playgroundConfig={playgroundConfig}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}
