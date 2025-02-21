import PlaygroundClient from "@/components/code/playground-client";
import { getCodeFiles } from "@/lib/script-utils";

export default async function PlaygroundPage() {
    const codeFiles = await getCodeFiles("code", {
        folders: ["methods"],
    });

    const playgroundConfig = {
        consoleWidth: 40,
        animationDuration: 500,
        animationEasing: "ease-in-out",
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
