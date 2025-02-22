import TopicPageClient from "@/components/code/assignments-viewer-client";
import { courseConfig } from "@/config/courses";
import { getTopicConfig } from "@/config/playground-config";
import { getCodeFiles } from "@/lib/script-utils";
import { notFound } from "next/navigation";

export default async function TopicPage({ params: paramsPromise }) {
    const params = await Promise.resolve(paramsPromise);
    const course = await Promise.resolve(params.course);
    const module = await Promise.resolve(params.module);
    const section = await Promise.resolve(params.section);
    const topic = await Promise.resolve(params.topic);

    const moduleConfig = courseConfig[course]?.modules[module];
    if (!moduleConfig) notFound();

    // Get centralized playground configuration
    const playgroundConfig = getTopicConfig(courseConfig, {
        course,
        module,
        section,
        topic,
    });

    if (!playgroundConfig) notFound();

    if (moduleConfig.type === "playground") {
        const topicConfig = moduleConfig.weeks[section]?.topics[topic];
        if (!topicConfig) notFound();

        const codeFiles = await getCodeFiles("assignments", {
            folders: topicConfig.folders,
        });

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
                playgroundConfig={playgroundConfig}
            />
        );
    }

    notFound();
}
