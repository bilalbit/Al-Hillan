import React from "react";
import Image from "next/image";
import {RegisterForm} from "@/features/home/layouts/register-form";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const RegisterPage = () => {

    return (
        <div className="flex flex-col gap-6 p-40 relative">
            <div className="absolute inset-0 bg-[url(/images/bg-2.jpg)]"></div>
            <div className="z-10 text-white">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-8">
                        <div
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex items-center justify-center rounded-md">
                                <Image src='/logo.svg' className="bg-tertiary size-20 md:size-60 rounded-full"
                                       width={100}
                                       height={100}
                                       alt="al~hilan Logo"/>
                            </div>
                            <span className="sr-only">Al~Hillan Inc.</span>
                        </div>
                        <h1 className="font-heading text-4xl font-extrabold leading-tight text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]">እንኳን
                            ወደ <span
                                className="text-gold">አል~ሂላን</span> የቁርአን አካዳሚ በሰላም መጡ</h1>
                        <p className="text-lg mb-6 mt-2 text-white/90">ለመመዝገብ ከስር ያለውን ፎርም በትክክል ይምሉ</p>
                    </div>
                    <Tabs defaultValue="register" className="flex flex-col justify-center items-center">
                        <TabsList
                            className="p-2 gap-2 md:w-full md:flex md:justify-center md:gap-4 md:px-6 md:py-2 bg-white dark:bg-gray-800 rounded-lg"
                        >
                            <TabsTrigger
                                className="px-6 py-3 text-white bg-emerald-500 hover:bg-emerald-600 rounded-md transition-all duration-200 data-[state=active]:bg-emerald-400 data-[state=active]:text-white dark:text-gray-100 dark:data-[state=active]:text-white"
                                value="register"
                            >
                                Register
                            </TabsTrigger>
                            <TabsTrigger
                                className="px-6 py-3 text-white bg-emerald-500 hover:bg-emerald-600 rounded-md transition-all duration-200 data-[state=active]:bg-emerald-400 data-[state=active]:text-white dark:text-gray-100 dark:data-[state=active]:text-white"
                                value="verify"
                            >
                                Verify
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent className="flex justify-center items-center min-w-screen" value="register">
                            <RegisterForm/>
                        </TabsContent>
                        <TabsContent className="flex justify-center items-center" value="verify">
                            <Card className="shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg">Register</CardTitle>
                                    <CardDescription>Verify Your Payment Detail</CardDescription>
                                </CardHeader>
                                <CardContent className="w-full">
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
)
}

export default RegisterPage;