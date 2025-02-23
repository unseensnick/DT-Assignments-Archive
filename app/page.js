"use client";

import { courseConfig } from "@/config/courses";
import {
    getAssignmentCounts,
    getModuleCompletionStatus,
    getOverallCompletionRate,
    isModuleComplete,
} from "@/lib/completion-utils";
import { getCodeFiles } from "@/lib/script-utils";
import { AlertCircle, Book, Code, Layout } from "lucide-react";
import { useEffect, useState } from "react";

function CourseCard({ courseKey, courseData, moduleStatuses }) {
    const totalModules = Object.keys(courseData.modules || {}).length;
    const totalAssignments = getAssignmentCounts(courseData);
    const latestModule = Object.values(courseData.modules || {})[0];
    const latestModuleKey = Object.keys(courseData.modules || {})[0];

    const IconComponent = courseKey.includes("javascript") ? Code : Layout;
    const colorClass = courseKey.includes("javascript")
        ? "text-blue-600"
        : "text-purple-600";
    const bgColorClass = courseKey.includes("javascript")
        ? "bg-blue-100"
        : "bg-purple-100";

    const isComplete = isModuleComplete(
        moduleStatuses,
        courseKey,
        latestModuleKey
    );

    return (
        <a href={`/${courseKey}`} className="group">
            <div className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 ${bgColorClass} rounded-lg`}>
                        <IconComponent className={colorClass} size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">
                            {courseData.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {courseKey.includes("javascript")
                                ? "Advanced web development"
                                : "Fundamental web development"}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Layout size={16} />
                        <span>
                            {totalModules} Module{totalModules !== 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle size={16} />
                        <span>
                            {totalAssignments} Assignment
                            {totalAssignments !== 1 ? "s" : ""}
                        </span>
                    </div>
                </div>

                {latestModule && (
                    <div className="mt-4 pt-4 border-t">
                        <div className="text-sm font-medium">
                            Latest Module:
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-muted-foreground">
                                {latestModule.title}
                            </span>
                            <span
                                className={`text-xs ${
                                    isComplete
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                } px-2 py-1 rounded`}
                            >
                                {isComplete ? "Complete" : "Incomplete"}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </a>
    );
}

export default function Home() {
    const [fileStats, setFileStats] = useState(null);
    const [moduleStatuses, setModuleStatuses] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Calculate static values that don't depend on moduleStatuses
    const totalCourses = Object.keys(courseConfig).length;
    const totalModules = Object.values(courseConfig).reduce(
        (acc, course) => acc + Object.keys(course.modules || {}).length,
        0
    );
    const totalAssignments = Object.values(courseConfig).reduce(
        (acc, course) => acc + getAssignmentCounts(course),
        0
    );

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    // Calculate completion rate only after loading is complete
    const completionRate = Math.round(getOverallCompletionRate(moduleStatuses));

    return (
        <div className="h-full overflow-y-auto">
            <div className="container py-6 space-y-8 mx-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome to DT Assignments Archive
                        </h1>
                        <p className="text-muted-foreground">
                            Browse through my completed assignments and
                            projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(courseConfig).map(([key, course]) => (
                            <CourseCard
                                key={key}
                                courseKey={key}
                                courseData={course}
                                moduleStatuses={moduleStatuses}
                            />
                        ))}
                    </div>

                    <div className="mt-8 bg-card rounded-xl border p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Quick Overview
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg dark:bg-blue-950">
                                <div className="text-sm text-muted-foreground">
                                    Total Courses
                                </div>
                                <div className="text-2xl font-semibold text-blue-600">
                                    {totalCourses}
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg dark:bg-green-950">
                                <div className="text-sm text-muted-foreground">
                                    Total Modules
                                </div>
                                <div className="text-2xl font-semibold text-green-600">
                                    {totalModules}
                                </div>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg dark:bg-purple-950">
                                <div className="text-sm text-muted-foreground">
                                    Total Assignments
                                </div>
                                <div className="text-2xl font-semibold text-purple-600">
                                    {totalAssignments}
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg dark:bg-yellow-950">
                                <div className="text-sm text-muted-foreground">
                                    Completion Rate
                                </div>
                                <div className="text-2xl font-semibold text-yellow-600">
                                    {completionRate}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
