import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {DeleteDialog} from "@/components/ui+/delete-Dialog";
import {AddOrEditCourseDialog} from "@/features/courses/components/add-or-edit-course-dialog";
import {Button} from "@/components/ui/button";
import {Eye} from "lucide-react";
import {CourseType} from "@/features/courses/schemas";
import Image from "next/image";
import {getImageUrl} from "@/lib/youtube";

// startDate: "በየስድስት ወሩ ምዝገባ",
// duration: "24 ሳምንታት",
export const CourseCard = ({data}: { data: CourseType }) => {
    const image_url = getImageUrl(data.youtube_url);
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
                        <Image
                            src={image_url}
                            width={500}
                            height={300}
                            alt={data.title}
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                            <Eye className="h-8 w-8 text-white"/>
                        </div>
                    </Button>
                </div>
                <CardTitle className="mt-2">{data.title}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="space-y-2">
                    <p className="text-sm font-medium">
                        <span className="font-bold">መደብ:</span> {data.category}
                    </p>
                    <p className="text-sm font-medium">
                        <span className="font-bold">ቆይታ:</span> {data.duration?.toDateString()}
                    </p>
                    <p className="text-sm font-medium">
                        <span className="font-bold">ተማሪዎች:</span> {data.num_of_students}
                    </p>
                    <p className="text-sm font-medium">
                        <span className="font-bold">መጀመሪያ ቀን:</span> {data.startDate?.toDateString()}
                    </p>
                </div>
            </CardContent>
            <CardFooter>
                <AddOrEditCourseDialog defaultValues={data} form_type="edit"/>
            </CardFooter>
        </Card>
    );
};
