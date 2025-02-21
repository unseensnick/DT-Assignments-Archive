import PlaygroundClient from "@/components/code/playground-client";
import { getJavaScriptFiles } from "@/lib/script-utils";

export default async function PlaygroundPage() {
    const jsFiles = await getJavaScriptFiles();

    // Configure playground settings
    const playgroundConfig = {
        title: "Datatypes:",
        consoleWidth: 35,
        animationDuration: 500,
        animationEasing: "ease-in-out",
        language: "javascript",
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="container w-full px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 px-4 text-primary">
                    JavaScript Playground
                </h1>
                <PlaygroundClient
                    files={jsFiles}
                    playgroundConfig={playgroundConfig}
                    className="max-w-full overflow-auto"
                />
            </div>
        </div>
    );
}
