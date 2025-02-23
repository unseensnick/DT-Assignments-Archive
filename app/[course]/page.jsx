import CourseContent from "@/components/code/course-content-client";
import { courseConfig } from "@/config/courses";
import { notFound } from "next/navigation";

// Generate static params for all available courses
export function generateStaticParams() {
    return Object.keys(courseConfig).map((course) => ({
        course,
    }));
}

export default async function CoursePage({ params }) {
    // Await and resolve the params before using them
    const resolvedParams = await Promise.resolve(params);
    const course = resolvedParams.course;

    if (!course) {
        return <div>Invalid course parameters</div>;
    }

    const courseData = courseConfig[course];

    if (!courseData) {
        notFound();
    }

    return <CourseContent courseKey={course} courseData={courseData} />;
}

// Disable dynamic route generation
export const dynamic = "error";
export const dynamicParams = false;
