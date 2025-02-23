// lib/nav-utils.js
import { courseConfig } from "@/config/courses";
import { BookOpen, Code, PlayCircle } from "lucide-react";

function hasProjectContent(moduleData) {
    // Check if module itself is a project
    if (moduleData.isProject === true) return true;

    if (moduleData.type === "playground") {
        // Check weeks and their topics
        return Object.values(moduleData.weeks || {}).some(
            (week) =>
                // Check if week is a project
                week.isProject === true ||
                // Check if any topic in the week is a project
                Object.values(week.topics || {}).some(
                    (topic) => topic.isProject === true
                )
        );
    } else if (moduleData.type === "iframe") {
        // Check sections and their topics
        return Object.values(moduleData.sections || {}).some(
            (section) =>
                // Check if section is a project
                section.isProject === true ||
                // Check if any topic in the section is a project
                (section.topics || []).some((topicId) => {
                    const topic = moduleData.sections[topicId];
                    return topic?.isProject === true;
                })
        );
    }

    return false;
}

export function generateNavigation() {
    const mainNavItems = [];
    const projectItems = [];

    Object.entries(courseConfig).forEach(([courseId, course]) => {
        const courseItem = {
            title: course.title,
            url: `/${courseId}`,
            icon: BookOpen,
            isActive: false,
            items: [],
        };

        for (const [moduleId, module] of Object.entries(course.modules)) {
            const moduleItem = {
                title: module.title,
                url: `/${courseId}/${moduleId}`,
            };

            if (module.type === "playground") {
                moduleItem.icon = PlayCircle;
                // Add weeks as sub-items
                Object.entries(module.weeks || {}).forEach(([weekId, week]) => {
                    const weekTopics = Object.keys(week.topics || {}).map(
                        (topicId) => ({
                            title: topicId
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase()),
                            url: `/${courseId}/${moduleId}/${weekId}/${topicId}`,
                        })
                    );
                    if (weekTopics.length) {
                        moduleItem.items = [
                            ...(moduleItem.items || []),
                            ...weekTopics,
                        ];
                    }
                });
            } else if (module.type === "iframe") {
                moduleItem.icon = Code;
                // Add sections as sub-items
                Object.entries(module.sections || {}).forEach(
                    ([sectionId, section]) => {
                        const topics = (section.topics || []).map(
                            (topicId) => ({
                                title: topicId
                                    .replace(/-/g, " ")
                                    .replace(/\b\w/g, (l) => l.toUpperCase()),
                                url: `/${courseId}/${moduleId}/${sectionId}/${topicId}`,
                            })
                        );
                        if (topics.length) {
                            moduleItem.items = [
                                ...(moduleItem.items || []),
                                ...topics,
                            ];
                        }
                    }
                );
            }

            courseItem.items.push(moduleItem);

            // Check if this module or any of its content is marked as a project
            if (hasProjectContent(module)) {
                projectItems.push({
                    name: `${module.title}`,
                    url: `/${courseId}/${moduleId}`,
                    icon: Code,
                });
            }
        }

        mainNavItems.push(courseItem);
    });

    return {
        mainNavItems,
        projectItems,
    };
}

export function generateBreadcrumbs(params) {
    const breadcrumbs = [
        {
            title: "Home",
            href: "/",
            current: !params?.course,
        },
    ];

    if (!params) return breadcrumbs;

    const { course, module, section, topic } = params;

    if (course && courseConfig[course]) {
        breadcrumbs.push({
            title: courseConfig[course].title || course,
            href: `/${course}`,
            current: !module,
        });

        if (module && courseConfig[course].modules[module]) {
            const moduleTitle =
                courseConfig[course].modules[module].title || module;
            breadcrumbs.push({
                title: moduleTitle,
                href: `/${course}/${module}`,
                current: !section,
            });

            if (section) {
                const moduleData = courseConfig[course].modules[module];
                let sectionTitle = section;

                if (moduleData.type === "playground") {
                    // Handle playground type modules
                    const week = moduleData.weeks?.[section];
                    if (week) {
                        sectionTitle = section
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase());
                    }
                } else if (
                    moduleData.type === "iframe" &&
                    moduleData.sections?.[section]
                ) {
                    // Handle iframe type modules
                    sectionTitle =
                        moduleData.sections[section].title || section;
                }

                breadcrumbs.push({
                    title: sectionTitle,
                    href: `/${course}/${module}/${section}`,
                    current: !topic,
                });

                if (topic) {
                    breadcrumbs.push({
                        title: topic
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase()),
                        href: `/${course}/${module}/${section}/${topic}`,
                        current: true,
                    });
                }
            }
        }
    }

    return breadcrumbs;
}
