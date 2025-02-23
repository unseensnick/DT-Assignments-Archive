// Utility functions for checking assignment completion status
import { courseConfig } from "@/config/courses";

export function getAssignmentCounts(course) {
    let totalAssignments = 0;

    if (course.modules) {
        Object.values(course.modules).forEach((module) => {
            if (module.weeks) {
                Object.values(module.weeks).forEach((week) => {
                    totalAssignments += Object.keys(week.topics || {}).length;
                });
            }
            if (module.sections) {
                Object.values(module.sections).forEach((section) => {
                    totalAssignments += section.topics?.length || 0;
                });
            }
        });
    }

    return totalAssignments;
}

export async function getModuleCompletionStatus(courseConfig) {
    const moduleStatuses = {};

    for (const [courseKey, course] of Object.entries(courseConfig)) {
        moduleStatuses[courseKey] = {};

        for (const [moduleKey, module] of Object.entries(
            course.modules || {}
        )) {
            let totalPaths = 0;
            let completedPaths = 0;

            if (module.type === "playground") {
                // Handle playground-type modules with weeks structure
                for (const [weekKey, week] of Object.entries(
                    module.weeks || {}
                )) {
                    for (const [topicKey, topic] of Object.entries(
                        week.topics || {}
                    )) {
                        totalPaths++;

                        // Check if folder exists for this topic's folders
                        try {
                            const response = await fetch(
                                `/api/assignments/files?folders=${topic.folders.join(
                                    ","
                                )}`
                            );
                            if (response.ok) {
                                const data = await response.json();
                                // Check if any of the requested folders have files
                                if (
                                    Object.keys(data).some((folder) =>
                                        Object.values(data[folder]).some(
                                            (files) => files.length > 0
                                        )
                                    )
                                ) {
                                    completedPaths++;
                                }
                            }
                        } catch (error) {
                            console.error(
                                `Error checking path: ${topicKey}`,
                                error
                            );
                        }
                    }
                }
            } else if (module.type === "iframe") {
                // Handle iframe-type modules with sections structure
                for (const [sectionKey, section] of Object.entries(
                    module.sections || {}
                )) {
                    for (const topic of section.topics || []) {
                        totalPaths++;

                        // Check if folder exists for this topic
                        try {
                            const response = await fetch(
                                `/api/assignments/files?folders=${topic}`
                            );
                            if (response.ok) {
                                const data = await response.json();
                                // Check if the folder has any files
                                if (
                                    Object.keys(data).length > 0 &&
                                    Object.values(data).some((typeFiles) =>
                                        Object.values(typeFiles).some(
                                            (files) => files.length > 0
                                        )
                                    )
                                ) {
                                    completedPaths++;
                                }
                            }
                        } catch (error) {
                            console.error(
                                `Error checking path: ${topic}`,
                                error
                            );
                        }
                    }
                }
            }

            moduleStatuses[courseKey][moduleKey] = {
                totalPaths,
                completedPaths,
                completionRate:
                    totalPaths > 0 ? (completedPaths / totalPaths) * 100 : 0,
            };
        }
    }

    return moduleStatuses;
}

export function getCourseCompletionRate(moduleStatuses, courseKey) {
    const courseModules = moduleStatuses[courseKey] || {};
    let totalPaths = 0;
    let completedPaths = 0;

    Object.values(courseModules).forEach((module) => {
        totalPaths += module.totalPaths;
        completedPaths += module.completedPaths;
    });

    return totalPaths > 0 ? (completedPaths / totalPaths) * 100 : 0;
}

export function getOverallCompletionRate(moduleStatuses) {
    let totalPaths = 0;
    let completedPaths = 0;

    Object.values(moduleStatuses).forEach((course) => {
        Object.values(course).forEach((module) => {
            totalPaths += module.totalPaths;
            completedPaths += module.completedPaths;
        });
    });

    return totalPaths > 0 ? (completedPaths / totalPaths) * 100 : 0;
}

export function isModuleComplete(moduleStatuses, courseKey, moduleKey) {
    const moduleStatus = moduleStatuses[courseKey]?.[moduleKey];
    return moduleStatus?.completionRate === 100;
}
