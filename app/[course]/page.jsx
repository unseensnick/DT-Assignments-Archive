import CourseContent from "@/components/code/course-content-client";
import { courseConfig } from "@/config/courses";

export default function CoursePage({ params }) {
    const courseData = courseConfig[params.course];

    if (!courseData) {
        return <div>Course not found</div>;
    }

    return <CourseContent courseKey={params.course} courseData={courseData} />;
}
