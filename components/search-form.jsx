"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";
import { courseConfig } from "@/config/courses";

function getAllSearchPaths() {
    const paths = [];

    Object.entries(courseConfig).forEach(([courseId, course]) => {
        paths.push({
            title: course.title,
            path: `/${courseId}`,
            type: "course",
            location: course.title,
        });

        Object.entries(course.modules).forEach(([moduleId, module]) => {
            paths.push({
                title: module.title,
                path: `/${courseId}/${moduleId}`,
                type: "module",
                location: `${course.title} • ${module.title}`,
            });

            if (module.type === "playground") {
                Object.entries(module.weeks || {}).forEach(([weekId, week]) => {
                    Object.keys(week.topics || {}).forEach((topicId) => {
                        paths.push({
                            title: topicId
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase()),
                            path: `/${courseId}/${moduleId}/${weekId}/${topicId}`,
                            type: "topic",
                            location: `${course.title} • ${
                                module.title
                            } • ${weekId
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}`,
                        });
                    });
                });
            } else if (module.type === "iframe") {
                Object.entries(module.sections || {}).forEach(
                    ([sectionId, section]) => {
                        paths.push({
                            title: section.title,
                            path: `/${courseId}/${moduleId}/${sectionId}`,
                            type: "section",
                            location: `${course.title} • ${module.title}`,
                        });

                        (section.topics || []).forEach((topicId) => {
                            paths.push({
                                title: topicId
                                    .replace(/-/g, " ")
                                    .replace(/\b\w/g, (l) => l.toUpperCase()),
                                path: `/${courseId}/${moduleId}/${sectionId}/${topicId}`,
                                type: "topic",
                                location: `${course.title} • ${module.title} • ${section.title}`,
                            });
                        });
                    }
                );
            }
        });
    });

    return paths;
}

export function SearchForm({ ...props }) {
    const router = useRouter();
    const [searchResults, setSearchResults] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const allPaths = useMemo(() => getAllSearchPaths(), []);

    const handleSearch = useCallback(
        (e) => {
            const searchTerm = e.target.value;
            setInputValue(searchTerm);

            if (searchTerm.length < 2) {
                setSearchResults([]);
                return;
            }

            const results = allPaths
                .filter(
                    (item) =>
                        item.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        item.location
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                )
                .slice(0, 5);

            setSearchResults(results);
        },
        [allPaths]
    );

    const handleSelect = useCallback(
        (path) => {
            setInputValue("");
            setSearchResults([]);
            router.push(path);
        },
        [router]
    );

    return (
        <form {...props}>
            <div className="relative">
                <Label htmlFor="search" className="sr-only">
                    Search
                </Label>
                <SidebarInput
                    id="search"
                    placeholder="Type to search..."
                    className="h-8 pl-7"
                    value={inputValue}
                    onChange={handleSearch}
                />
                <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
                {searchResults.length > 0 && (
                    <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
                        {searchResults.map((result) => (
                            <button
                                key={result.path}
                                type="button"
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => handleSelect(result.path)}
                            >
                                <div className="font-medium">
                                    {result.title}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    {result.location}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
}
