import TopicPageClient from "@/components/code/assignments-viewer-client";
import { courseConfig } from "@/config/courses";
import { getCodeFiles } from "@/lib/script-utils";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const paths = [];

    Object.entries(courseConfig).forEach(([course, courseData]) => {
        Object.entries(courseData.modules).forEach(([module, moduleData]) => {
            if (moduleData.type === "playground") {
                Object.entries(moduleData.weeks).forEach(([week, weekData]) => {
                    Object.keys(weekData.topics).forEach((topic) => {
                        paths.push({
                            course,
                            module,
                            section: week,
                            topic,
                        });
                    });
                });
            } else if (moduleData.type === "iframe") {
                Object.entries(moduleData.sections).forEach(
                    ([section, sectionData]) => {
                        sectionData.topics.forEach((topic) => {
                            paths.push({
                                course,
                                module,
                                section,
                                topic,
                            });
                        });
                    }
                );
            }
        });
    });

    return paths;
}

export default async function TopicPage({ params: paramsPromise }) {
    const params = await Promise.resolve(paramsPromise);
    const course = await Promise.resolve(params.course);
    const module = await Promise.resolve(params.module);
    const section = await Promise.resolve(params.section);
    const topic = await Promise.resolve(params.topic);

    const moduleConfig = courseConfig[course]?.modules[module];
    if (!moduleConfig) notFound();

    if (moduleConfig.type === "playground") {
        const topicConfig = moduleConfig.weeks[section]?.topics[topic];
        if (!topicConfig) notFound();

        const codeFiles = await getCodeFiles("assignments", {
            folders: topicConfig.folders,
        });

        const playgroundConfig = {
            consoleWidth: topicConfig.consoleWidth,
            animationDuration: topicConfig.animationDuration,
            animationEasing: topicConfig.animationEasing,
        };

        return (
            <TopicPageClient
                type="playground"
                codeFiles={codeFiles}
                playgroundConfig={playgroundConfig}
            />
        );
    }

    if (moduleConfig.type === "iframe") {
        const sectionConfig = moduleConfig.sections[section];
        if (!sectionConfig || !sectionConfig.topics.includes(topic)) notFound();

        return (
            <TopicPageClient
                type="iframe"
                params={{
                    courseSlug: course,
                    moduleSlug: module,
                    sectionSlug: section,
                    topicSlug: topic,
                }}
            />
        );
    }

    notFound();
}
