import React from 'react';
import {CourseCard} from "@/features/courses/components/course-card";
import {AddOrEditCourseDialog} from "@/features/courses/components/add-or-edit-course-dialog";

export const CourseCardList = () => {
    return (
        <section className="grid grid-cols-3 gap-6 px-4 py-6">
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </section>
    );
};
