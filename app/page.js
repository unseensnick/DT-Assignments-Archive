"use client";

import { courseConfig } from "@/config/courses";
import {
    getAssignmentCounts,
    getModuleCompletionStatus,
    getOverallCompletionRate,
} from "@/lib/completion-utils";
import { getCodeFiles } from "@/lib/script-utils";
import { AlertCircle, Book, Code, Layout } from "lucide-react";
import React, { useEffect, useState } from "react";

function CourseCard({ courseKey, courseData, moduleStatuses }) {
    const totalModules = Object.keys(courseData.modules || {}).length;
    const totalAssignments = getAssignmentCounts(courseData);
    const latestModule = Object.values(courseData.modules || {})[0];
    const latestModuleKey = Object.keys(courseData.modules || {})[0];

    const IconComponent = courseKey.includes("javascript") ? Code : Layout;

    return (
        <a href={`/${courseKey}`} className="group">
            <div className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 bg-primary/10 rounded-lg`}>
                        <IconComponent className="text-primary" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">
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
                        <Layout className="text-muted-foreground" size={16} />
                        <span>
                            {totalModules} Module{totalModules !== 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle
                            className="text-muted-foreground"
                            size={16}
                        />
                        <span>
                            {totalAssignments} Assignment
                            {totalAssignments !== 1 ? "s" : ""}
                        </span>
                    </div>
                </div>

                {latestModule && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <div className="text-sm font-medium text-foreground">
                            Latest Module:
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-muted-foreground">
                                {latestModule.title}
                            </span>
                            {moduleStatuses ? (
                                <span
                                    className={`text-xs px-2 py-1 rounded ${
                                        moduleStatuses[courseKey]?.[
                                            latestModuleKey
                                        ]?.completionRate === 100
                                            ? "bg-primary/10 text-primary"
                                            : "bg-secondary text-secondary-foreground"
                                    }`}
                                >
                                    {moduleStatuses[courseKey]?.[
                                        latestModuleKey
                                    ]?.completionRate === 100
                                        ? "Complete"
                                        : "In Progress"}
                                </span>
                            ) : (
                                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded animate-pulse">
                                    Checking...
                                </span>
                            )}
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

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const files = await getCodeFiles();
                setFileStats(files);
                const statuses = await getModuleCompletionStatus(courseConfig);
                setModuleStatuses(statuses);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    const totalCourses = Object.keys(courseConfig).length;
    const totalModules = Object.values(courseConfig).reduce(
        (acc, course) => acc + Object.keys(course.modules || {}).length,
        0
    );
    const totalAssignments = Object.values(courseConfig).reduce(
        (acc, course) => acc + getAssignmentCounts(course),
        0
    );

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Fixed Header */}
            <header className="flex-none sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
                <div className="container py-6 max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-3 text-foreground bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                        Welcome to DT Assignments Archive
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Browse through my completed assignments and projects.
                    </p>
                </div>
            </header>

            {/* Main Content Wrapper */}
            <main className="flex-1 relative">
                {/* Scrollable Container */}
                <div className="absolute inset-0 overflow-auto">
                    <div className="flex justify-center w-full">
                        <div className="container max-w-6xl py-8 space-y-8">
                            {/* Course Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(courseConfig).map(
                                    ([key, course]) => (
                                        <CourseCard
                                            key={key}
                                            courseKey={key}
                                            courseData={course}
                                            moduleStatuses={moduleStatuses}
                                        />
                                    )
                                )}
                            </div>

                            {/* Quick Overview Section */}
                            <div className="bg-card rounded-xl border p-6 border-border">
                                <h2 className="text-lg font-semibold mb-4 text-foreground">
                                    Quick Overview
                                </h2>
                                <div className="grid grid-cols-2 md-grid-cols-4 gap-4">
                                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                                        <div className="text-sm text-muted-foreground">
                                            Total Courses
                                        </div>
                                        <div className="text-2xl font-semibold text-primary">
                                            {totalCourses}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-secondary rounded-lg border border-border">
                                        <div className="text-sm text-muted-foreground">
                                            Total Modules
                                        </div>
                                        <div className="text-2xl font-semibold text-secondary-foreground">
                                            {totalModules}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-accent rounded-lg border border-border">
                                        <div className="text-sm text-muted-foreground">
                                            Total Assignments
                                        </div>
                                        <div className="text-2xl font-semibold text-accent-foreground">
                                            {totalAssignments}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg border border-border">
                                        <div className="text-sm text-muted-foreground">
                                            Completion Rate
                                        </div>
                                        <div className="text-2xl font-semibold text-foreground">
                                            {moduleStatuses ? (
                                                `${Math.round(
                                                    getOverallCompletionRate(
                                                        moduleStatuses
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
                </div>
            </main>
        </div>
    );
}
