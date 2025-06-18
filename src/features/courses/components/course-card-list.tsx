import React from 'react';
import {CourseCard} from "@/features/courses/components/course-card";
import {PaginationWithLinks} from "@/components/ui+/pagination-with-links";
import {getCourses} from "@/features/courses/server/api";
import {filterQueryType} from "@/lib/cache/types";


export const CourseCardList = async ({searchParams}: { searchParams: filterQueryType }) => {
    const {data: courses, total} = await getCourses(searchParams);
    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                <div className='grid grid-cols-3 gap-6'>
                    {
                        courses.length != 0
                            ?
                        courses.map((course, index) => (
                            <CourseCard key={index} data={course}/>
                        )) :
                        <div>
                            there is no course
                        </div>
                    }
                </div>
            </div>
            {
                total > 3 &&
                <PaginationWithLinks pageSizeSelectOptions={{
                    pageSizeSearchParam: "limit",
                    pageSizeOptions: [3, 6, 9, 15, 18]
                }} pageSearchParam="page" page={Number(searchParams?.page || 1)} limit={Number(searchParams?.limit || 3)} totalCount={total}/>
            }
        </section>
    );
};
