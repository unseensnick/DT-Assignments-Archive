"use client";

import AssignmentViewer from "@/components/code/assignment-viewer";
import PlaygroundClient from "@/components/code/playground-client";

export default function TopicPageClient({
    type,
    codeFiles,
    playgroundConfig,
    params,
}) {
    if (type === "playground") {
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
