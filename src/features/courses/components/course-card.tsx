import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {DeleteDialog} from "@/components/ui+/delete-Dialog";
import {AddOrEditCourseDialog} from "@/features/courses/components/add-or-edit-course-dialog";
import {Button} from "@/components/ui/button";
import {Eye} from "lucide-react";


const course = {
    id: 4,
    title: "ተፍሲር (የቁርአን ትርጓሜ)",
    category: "advanced",
    image: "https://images.pexels.com/photos/6103192/pexels-photo-6103192.jpeg",
    duration: "24 ሳምንታት",
    students: 45,
    startDate: "በየስድስት ወሩ ምዝገባ",
    description: "የቁርአን ጥልቅ ትርጓሜና ትምህርቶችን በዝርዝር የሚያስተምር ከፍተኛ ደረጃ ኮርስ።",
}

export const CourseCard = () => {
    return (
        <Card className="relative">
            <DeleteDialog name="የተጅዊድ ህግጋት" label="Course"/>

            <CardHeader>
                <div className="relative">
                    <Button
                        variant="ghost"
                        className="w-full h-48 p-0 overflow-hidden rounded-t-lg"
                        // onClick={() => console.log(`View course ${course.id}`)} // Replace with your view logic
                    >
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                            <Eye className="h-8 w-8 text-white"/>
                        </div>
                    </Button>
                </div>
                <CardTitle className="mt-2">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="space-y-2">
                    <p className="text-sm font-medium">
                        <span className="font-bold">መደብ:</span> {course.category}
                    </p>
                    <p className="text-sm font-medium">
                        <span className="font-bold">ቆይታ:</span> {course.duration}
                    </p>
                    <p className="text-sm font-medium">
                        <span className="font-bold">ተማሪዎች:</span> {course.students}
                    </p>
                    <p className="text-sm font-medium">
                        <span className="font-bold">መጀመሪያ ቀን:</span> {course.startDate}
                    </p>
                </div>
            </CardContent>
            <CardFooter>
                <AddOrEditCourseDialog form_type="edit"/>
            </CardFooter>
        </Card>
    );
};
