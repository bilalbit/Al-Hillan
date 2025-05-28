import React from 'react';
import {CourseCard} from "@/features/courses/components/course-card";
import {CourseSchemaType} from "@/features/courses/schemas";
import {PaginationWithLinks} from "@/components/ui+/pagination-with-links";

const courseMock = async () => {
    return (
        [
            {
                id: "0d854f16-bad4-46ff-a406-62ce89774900",
                title: "(የቁርአን ትርጓሜ)",
                category: "advanced",
                youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
                num_of_students: 45,
                description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
                duration: new Date(2020, 3, 1),
                startDate: new Date(2020, 3, 1),

            },
            {
                id: "0d854f16-bad4-46ff-a406-62ce89774900",
                title: "ተፍሲር (የቁርአን ትርጓሜ)",
                category: "advanced",
                youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
                num_of_students: 45,
                description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
                duration: new Date(2020, 3, 1),
                startDate: new Date(2020, 3, 1),

            },
            {
                id: "0d854f16-bad4-46ff-a406-62ce89774900",
                title: "ተፍሲር (የቁርአን ትርጓሜ)",
                category: "advanced",
                youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
                num_of_students: 45,
                description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
                duration: new Date(2020, 3, 1),
                startDate: new Date(2020, 3, 1),

            }, {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",
            title: "ተፍሲር (የቁርአን ትርጓሜ)",
            category: "advanced",
            youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
            num_of_students: 45,
            description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
            duration: new Date(2020, 3, 1),
            startDate: new Date(2020, 3, 1),

        }, {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",
            title: "ተፍሲር (የቁርአን ትርጓሜ)",
            category: "advanced",
            youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
            num_of_students: 45,
            description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
            duration: new Date(2020, 3, 1),
            startDate: new Date(2020, 3, 1),

        }, {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",
            title: "ተፍሲር (የቁርአን ትርጓሜ)",
            category: "advanced",
            youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
            num_of_students: 45,
            description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
            duration: new Date(2020, 3, 1),
            startDate: new Date(2020, 3, 1),

        }, {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",
            title: "ተፍሲር (የቁርአን ትርጓሜ)",
            category: "advanced",
            youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
            num_of_students: 45,
            description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
            duration: new Date(2020, 3, 1),
            startDate: new Date(2020, 3, 1),

        }, {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",
            title: "ተፍሲር (የቁርአን ትርጓሜ)",
            category: "advanced",
            youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
            num_of_students: 45,
            description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
            duration: new Date(2020, 3, 1),
            startDate: new Date(2020, 3, 1),

        }, {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",
            title: "ተፍሲር (የቁርአን ትርጓሜ)",
            category: "advanced",
            youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
            num_of_students: 45,
            description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
            duration: new Date(2020, 3, 1),
            startDate: new Date(2020, 3, 1),

        }, {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",
            title: "ተፍሲር (የቁርአን ትርጓሜ)",
            category: "advanced",
            youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
            num_of_students: 45,
            description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
            duration: new Date(2020, 3, 1),
            startDate: new Date(2020, 3, 1),

        }, {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",
            title: "ተፍሲር (የቁርአን ትርጓሜ)",
            category: "advanced",
            youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
            num_of_students: 45,
            description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
            duration: new Date(2020, 3, 1),
            startDate: new Date(2020, 3, 1),

        },
            {
                id: "0d854f16-bad4-46ff-a406-62ce89774900",
                title: "ተፍሲር (የቁርአን ትርጓሜ)",
                category: "advanced",
                youtube_url: "https://www.youtube.com/watch?v=pr-PzWkrif0",
                num_of_students: 45,
                description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
                duration: new Date(2020, 3, 1),
                startDate: new Date(2020, 3, 1),

            },


        ] as CourseSchemaType[]
    )
}
export const CourseCardList = async({searchParams}: {searchParams: {page: number}}) => {
    const courses = await courseMock();
    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                <div className='grid grid-cols-3 gap-6'>
                    {
                        courses.slice(0, 3).map((course, index) => (
                            <CourseCard key={index} data={course}/>
                        ))
                    }
                </div>
            </div>
            {
                courses.length > 3 &&
                <PaginationWithLinks pageSearchParam="limit" page={Number((await searchParams)?.page || 1)} limit={3} totalCount={(await courseMock()).length}/>
            }
        </section>
    );
};
