"use client";

import { Progress } from "@/components/ui/progress";
import { courseConfig } from "@/config/courses";
import {
    getAssignmentCounts,
    getCourseCompletionRate,
    getModuleCompletionStatus,
    isModuleComplete,
} from "@/lib/completion-utils";
import { getCodeFiles } from "@/lib/script-utils";
import {
    AlertCircle,
    Book,
    Calendar,
    ChevronRight,
    Code,
    Layout,
} from "lucide-react";
import { useEffect, useState } from "react";

function ModuleCard({
    moduleKey,
    moduleData,
    courseKey,
    type = "playground",
    moduleStatuses,
}) {
    const isPlayground = type === "playground";
    const weeks = moduleData.weeks || {};
    const sections = moduleData.sections || {};

    const totalTopics = isPlayground
        ? Object.values(weeks).reduce(
              (acc, week) => acc + Object.keys(week.topics || {}).length,
              0
          )
        : Object.values(sections).reduce(
              (acc, section) => acc + (section.topics?.length || 0),
              0
          );

    const moduleStatus = moduleStatuses?.[courseKey]?.[moduleKey] || {
        completionRate: 0,
    };
    const completionRate = Math.round(moduleStatus.completionRate);

    return (
        <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-6">
                <div
                    className={`p-3 ${
                        isPlayground ? "bg-blue-100" : "bg-purple-100"
                    } rounded-lg`}
                >
                    {isPlayground ? (
                        <Code size={24} className="text-blue-600" />
                    ) : (
                        <Layout size={24} className="text-purple-600" />
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-semibold">
                        {moduleData.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {isPlayground
                            ? "Interactive Code Playground"
                            : "Visual Layout Exercises"}
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                {isPlayground
                    ? Object.entries(weeks).map(([weekKey, weekData]) => (
                          <div key={weekKey} className="space-y-3">
                              <div className="flex items-center gap-2">
                                  <Calendar
                                      size={16}
                                      className="text-muted-foreground"
                                  />
                                  <h3 className="font-medium capitalize">
                                      {weekKey.replace("-", " ")}
                                  </h3>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {Object.entries(weekData.topics || {}).map(
                                      ([topicKey, topicData]) => (
                                          <a
                                              key={topicKey}
                                              href={`/${courseKey}/${moduleKey}/${weekKey}/${topicKey}`}
                                              className="group p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                                          >
                                              <div className="flex items-center justify-between">
                                                  <span className="font-medium">
                                                      {topicKey.replace(
                                                          /-/g,
                                                          " "
                                                      )}
                                                  </span>
                                                  <ChevronRight
                                                      size={16}
                                                      className="text-muted-foreground"
                                                  />
                                              </div>
                                          </a>
                                      )
                                  )}
                              </div>
                          </div>
                      ))
                    : Object.entries(sections).map(
                          ([sectionKey, sectionData]) => (
                              <div key={sectionKey} className="space-y-3">
                                  <h3 className="font-medium">
                                      {sectionData.title}
                                  </h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {sectionData.topics?.map((topic) => (
                                          <a
                                              key={topic}
                                              href={`/${courseKey}/${moduleKey}/${sectionKey}/${topic}`}
                                              className="group p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                                          >
                                              <div className="flex items-center justify-between">
                                                  <span className="font-medium">
                                                      {sectionData
                                                          .topicConfigs?.[topic]
                                                          ?.title || topic}
                                                  </span>
                                                  <ChevronRight
                                                      size={16}
                                                      className="text-muted-foreground"
                                                  />
                                              </div>
                                          </a>
                                      ))}
                                  </div>
                              </div>
                          )
                      )}
            </div>

            <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                        Progress
                    </span>
                    <span className="text-sm font-medium">
                        {moduleStatuses ? (
                            `${completionRate}%`
                        ) : (
                            <span className="text-muted-foreground animate-pulse">
                                Checking...
                            </span>
                        )}
                    </span>
                </div>
                <Progress
                    value={moduleStatuses ? completionRate : null}
                    className={`h-2 ${!moduleStatuses && "animate-pulse"}`}
                />
            </div>
        </div>
    );
}

export default function CourseContent({ courseKey, courseData }) {
    const [fileStats, setFileStats] = useState(null);
    const [moduleStatuses, setModuleStatuses] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const files = await getCodeFiles();
                setFileStats(files);

                // Get completion status for all modules
                const statuses = await getModuleCompletionStatus(courseConfig);
                setModuleStatuses(statuses);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    const totalModules = Object.keys(courseData.modules || {}).length;
    const totalAssignments = Object.values(courseData.modules || {}).reduce(
        (acc, module) => {
            if (module.weeks) {
                return (
                    acc +
                    Object.values(module.weeks).reduce(
                        (weekAcc, week) =>
                            weekAcc + Object.keys(week.topics || {}).length,
                        0
                    )
                );
            }
            if (module.sections) {
                return (
                    acc +
                    Object.values(module.sections).reduce(
                        (sectionAcc, section) =>
                            sectionAcc + (section.topics?.length || 0),
                        0
                    )
                );
            }
            return acc;
        },
        0
    );

    return (
        <div className="h-full overflow-y-auto">
            <div className="container py-6 space-y-8 mx-auto">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            {courseData.title}
                        </h1>
                        <p className="text-muted-foreground">
                            Explore modules and assignments for{" "}
                            {courseData.title}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {Object.entries(courseData.modules || {}).map(
                            ([moduleKey, moduleData]) => (
                                <ModuleCard
                                    key={moduleKey}
                                    moduleKey={moduleKey}
                                    moduleData={moduleData}
                                    courseKey={courseKey}
                                    type={moduleData.type}
                                    moduleStatuses={moduleStatuses}
                                />
                            )
                        )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-4 bg-card rounded-lg border">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <Book size={16} />
                                <span>Modules</span>
                            </div>
                            <div className="text-2xl font-semibold">
                                {totalModules}
                            </div>
                        </div>
                        <div className="p-4 bg-card rounded-lg border">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <AlertCircle size={16} />
                                <span>Assignments</span>
                            </div>
                            <div className="text-2xl font-semibold">
                                {totalAssignments}
                            </div>
                        </div>
                        <div className="p-4 bg-card rounded-lg border">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <Layout size={16} />
                                <span>Completion</span>
                            </div>
                            <div className="text-2xl font-semibold">
                                {moduleStatuses ? (
                                    `${Math.round(
                                        getCourseCompletionRate(
                                            moduleStatuses,
                                            courseKey
                                        )
                                    )}%`
                                ) : (
                                    <span className="animate-pulse">
                                        Calculating...
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
