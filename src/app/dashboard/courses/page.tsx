import React from "react";
import {CourseCardList} from "@/features/courses/components/course-card-list";
import {AddOrEditCourseDialog} from "@/features/courses/components/add-or-edit-course-dialog";
import {filterQueryType} from "@/lib/cache/types";


const PackagesPage = async ({searchParams}: { searchParams: filterQueryType }) => {
    const query = (await searchParams)
    return (
        <section>
            <AddOrEditCourseDialog form_type="add"/>
            <CourseCardList searchParams={query}/>
        </section>
    )
}

export default PackagesPage;