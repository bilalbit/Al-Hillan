import {CourseCardList} from "@/features/courses/components/course-card-list";
import {AddOrEditCourseDialog} from "@/features/courses/components/add-or-edit-course-dialog";
import React from "react";

const PackagesPage = () => {
    return (
        <>
            <AddOrEditCourseDialog form_type="add" />
            <CourseCardList/>
        </>
    )
}

export default PackagesPage;