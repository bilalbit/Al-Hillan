// CourseCard.tsx
import React, {Suspense} from 'react';
import Image from "next/image";
import {CourseType} from "@/features/courses/schemas";
import {getImageUrl} from "@/lib/youtube";
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Loader} from "@/components/loader";
import {IframeVideo} from "@/components/custome-component/iframe-video";
import {Calendar, ChevronRight, Clock, ReceiptText, Users} from "lucide-react";

const categories = [
    {id: 'all', name: 'ሁሉም ኮርሶች'},
    {id: 'beginner', name: 'ለጀማሪዎች'},
    {id: 'intermediate', name: 'መካከለኛ'},
    {id: 'advanced', name: 'ከፍተኛ'},
    {id: 'specialized', name: 'ልዩ'},
];

const filterCategory = (course: CourseType) => {
    return categories.find(value => value.id === course.category) || categories[0];
}

export const CourseCard = ({course}: { course: CourseType }) => {
    const category = filterCategory(course);
    const img_url = getImageUrl(course.youtube_url);
    
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={img_url}
                    alt={`${category.name} ${course.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    width={400}
                    height={300}
                />
                <div className="absolute top-4 right-4 bg-gold text-white text-sm font-bold py-1 px-3 rounded-full">
                    {category.name}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">{course.title}</h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                    {course.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5">
                    <div className="flex items-center">
                        <Clock className="mr-1"/>
                        {String(course.duration)}
                    </div>
                    <div className="flex items-center">
                        <Users className="mr-1"/>
                        {course.num_of_students} ተማሪዎች
                    </div>
                    <div className="flex items-center">
                        <Calendar className="mr-1"/>
                        {String(course.startDate)}
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="block w-full bg-gold hover:bg-gold/70 text-white text-center py-2 rounded-md transition-colors duration-200 mt-2 group">
                            see detail
                            <ReceiptText className="inline-block ml-1 transition-transform group-hover:translate-x-1"/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-center">{course.title}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                                <Suspense fallback={<div className="w-full aspect-video flex items-center justify-center">
                                    <Loader/></div>}>
                                    <IframeVideo videoUrl={course.youtube_url}/>
                                </Suspense>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <p className="text-2xl text-gold font-extrabold">Description About the {course.title} Course </p>
                                <p className="mb-4 indent-8 last:mb-0">
                                    {course.description}
                                </p>
                            </div>
                            <Link href="/register"
                                  className="block w-full bg-tertiary hover:bg-tertiary/80 text-white text-center py-2 rounded-md transition-colors duration-200 mt-2 group">
                                አሁን ይመዝገቡ
                                <ChevronRight className="inline-block ml-1 transition-transform group-hover:translate-x-1"/>
                            </Link>
                        </div>
                    </DialogContent>
                </Dialog>
                <Link href="/register"
                      className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-2 rounded-md transition-colors duration-200 mt-2 group">
                    አሁን ይመዝገቡ
                    <ChevronRight className="inline-block ml-1 transition-transform group-hover:translate-x-1"/>
                </Link>
            </div>
        </div>
    );
};