// CoursesLayout.tsx
import React from 'react';
import {CourseCard} from "@/features/home/components/course-card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Button} from '@/components/ui/button';
import {getAllCourses} from "@/features/courses/server/api";
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import {TriangleAlert} from "lucide-react";

export const CoursesLayout = async () => {
    const {data: courses} = await getAllCourses();

    // Filter courses by category
    const beginnerCourses = courses.filter(course => course.category === 'beginner');
    const intermediateCourses = courses.filter(course => course.category === 'intermediate');
    const advancedCourses = courses.filter(course => course.category === 'advanced');
    const specializedCourses = courses.filter(course => course.category === 'special');

    return (
        <section id="courses" className="p-20 bg-white">
            <div className="container mx-auto px-4">
                <Tabs defaultValue="all">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                            የእኛ <span className="text-gold">ኮርሶች</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            ለሁሉም የትምህርት ደረጃዎች የተዘጋጁ የቁርአን ትምህርት ፕሮግራሞቻችንን ይመልከቱ።
                        </p>
                    </div>

                    <TabsList className="flex flex-wrap w-full justify-center bg-white gap-2 mb-12">
                        <TabsTrigger value="all" asChild>
                            <Button
                                className="max-w-fit data-[state=active]:bg-tertiary data-[state=active]:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200">
                                ሁሉም ኮርሶች
                            </Button>
                        </TabsTrigger>
                        <TabsTrigger value="beginner" asChild>
                            <Button
                                className="max-w-fit data-[state=active]:bg-tertiary data-[state=active]:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200">
                                ለጀማሪዎች
                            </Button>
                        </TabsTrigger>
                        <TabsTrigger value="intermediate" asChild>
                            <Button
                                className="max-w-fit data-[state=active]:bg-tertiary data-[state=active]:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200">
                                መካከለኛ
                            </Button>
                        </TabsTrigger>
                        <TabsTrigger value="advanced" asChild>
                            <Button
                                className="max-w-fit data-[state=active]:bg-tertiary data-[state=active]:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200">
                                ከፍተኛ
                            </Button>
                        </TabsTrigger>
                        <TabsTrigger value="specialized" asChild>
                            <Button
                                className="max-w-fit data-[state=active]:bg-tertiary data-[state=active]:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200">
                                ልዩ
                            </Button>
                        </TabsTrigger>
                    </TabsList>

                    {/* All Courses Tab */}
                    <TabsContent value="all">
                        <ScrollArea className="w-full whitespace-nowrap rounded-md">
                            <div className="flex w-max space-x-6 p-4">
                                {courses.map((course) => (
                                    <div key={course.id} className="w-[350px] inline-block">
                                        <CourseCard course={course}/>
                                    </div>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal"/>
                        </ScrollArea>
                    </TabsContent>

                    {/* Beginner Courses Tab */}

                    <TabsContent value="beginner">
                        {
                            beginnerCourses.length != 0 ? (
                                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                                    <div className="flex w-max space-x-6 p-4">
                                        {beginnerCourses.map((course) => (
                                            <div key={course.id} className="w-[350px] inline-block">
                                                <CourseCard course={course}/>
                                            </div>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal"/>
                                </ScrollArea>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-lg text-red-500">
                                        <TriangleAlert className="inline h-20 w-20 text-gold"/>
                                        በዚህ ምድብ ውስጥ ምንም ኮርስ አልተገኘም።</p>
                                </div>
                            )
                        }
                    </TabsContent>


                    {/* Intermediate Courses Tab */}


                    <TabsContent value="intermediate">
                        {
                            intermediateCourses.length != 0 ? (
                                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                                    <div className="flex w-max space-x-6 p-4">
                                        {intermediateCourses.map((course) => (
                                            <div key={course.id} className="w-[350px] inline-block">
                                                <CourseCard course={course}/>
                                            </div>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal"/>
                                </ScrollArea>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-lg text-red-500">
                                        <TriangleAlert className="inline h-20 w-20 text-gold"/>
                                        በዚህ ምድብ ውስጥ ምንም ኮርስ አልተገኘም።</p>
                                </div>
                            )
                        }
                    </TabsContent>

                    {/* Advanced Courses Tab */}
                    <TabsContent value="advanced">
                        {
                            advancedCourses.length != 0 ? (
                                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                                    <div className="flex w-max space-x-6 p-4">
                                        {advancedCourses.map((course) => (
                                            <div key={course.id} className="w-[350px] inline-block">
                                                <CourseCard course={course}/>
                                            </div>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal"/>
                                </ScrollArea>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-lg text-red-500">
                                        <TriangleAlert className="inline h-20 w-20 text-gold"/>
                                        በዚህ ምድብ ውስጥ ምንም ኮርስ አልተገኘም።</p>
                                </div>
                            )
                        }
                    </TabsContent>
                    {/* Specialized Courses Tab */}
                    <TabsContent value="specialized">
                        {
                            specializedCourses.length != 0 ? (
                                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                                    <div className="flex w-max space-x-6 p-4">
                                        {
                                            specializedCourses.map((course) => (
                                                <div key={course.id} className="w-[350px] inline-block">
                                                    <CourseCard course={course}/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <ScrollBar orientation="horizontal"/>
                                </ScrollArea>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-lg text-red-500">
                                        <TriangleAlert className="inline h-20 w-20 text-gold"/>
                                        በዚህ ምድብ ውስጥ ምንም ኮርስ አልተገኘም።</p>
                                </div>
                            )
                        }
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};