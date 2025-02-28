import AssignmentsViewerClient from "@/components/code/assignments-viewer-client";
import { courseConfig } from "@/config/courses";
import { getTopicConfig } from "@/config/playground-config";
import { notFound } from "next/navigation";

// Generate all possible route combinations from courseConfig
export function generateStaticParams() {
    const paths = [];

    Object.entries(courseConfig).forEach(([course, courseData]) => {
        Object.entries(courseData.modules).forEach(([module, moduleData]) => {
            if (moduleData.type === "playground") {
                Object.entries(moduleData.weeks).forEach(
                    ([section, weekData]) => {
                        Object.keys(weekData.topics).forEach((topic) => {
                            paths.push({ course, module, section, topic });
                        });
                    }
                );
            } else if (moduleData.type === "iframe") {
                Object.entries(moduleData.sections).forEach(
                    ([section, sectionData]) => {
                        sectionData.topics.forEach((topic) => {
                            paths.push({ course, module, section, topic });
                        });
                    }
                );
            }
        });
    });

    return paths;
}

// This function is used to validate params based on courseConfig
function validateParams(searchParams) {
    const { course, module, section, topic } = searchParams;
    const moduleConfig = courseConfig[course]?.modules[module];

    if (!moduleConfig) return null;

    if (moduleConfig.type === "playground") {
        const topicConfig = moduleConfig.weeks[section]?.topics[topic];
        if (!topicConfig) return null;

        // Check if the topic has its own type specified
        if (topicConfig.type === "iframe") {
            return { type: "iframe", config: topicConfig };
        }

        return { type: "playground", config: topicConfig };
    }

    if (moduleConfig.type === "iframe") {
        const sectionConfig = moduleConfig.sections[section];
        if (!sectionConfig || !sectionConfig.topics.includes(topic))
            return null;
        return { type: "iframe", config: sectionConfig };
    }

    return null;
}

export default async function TopicPage({ params }) {
    // Await the params before using them
    const resolvedParams = await Promise.resolve(params);

    // Get the dynamic path segments
    const searchParams = {
        course: resolvedParams.course,
        module: resolvedParams.module,
        section: resolvedParams.section,
        topic: resolvedParams.topic,
    };

    // Validate the params against our config
    const validatedParams = validateParams(searchParams);
    if (!validatedParams) notFound();

    // Get centralized playground configuration
    const playgroundConfig = getTopicConfig(courseConfig, searchParams);
    if (!playgroundConfig) notFound();

    if (validatedParams.type === "playground") {
        return (
            <AssignmentsViewerClient
                type="playground"
                folderConfig={validatedParams.config.folders}
                playgroundConfig={playgroundConfig}
            />
        );
    }

    if (validatedParams.type === "iframe") {
        return (
            <AssignmentsViewerClient
                type="iframe"
                params={{
                    courseSlug: searchParams.course,
                    moduleSlug: searchParams.module,
                    sectionSlug: searchParams.section,
                    topicSlug: searchParams.topic,
                }}
                playgroundConfig={playgroundConfig}
            />
        );
    }

    notFound();
}

export const dynamic = "error";
export const dynamicParams = false;
