import React from 'react';
import {CheckCircle, Images} from "lucide-react";
import Link from 'next/link';

export const AboutUs = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <Images
                            href="/images/bg-2.jpg"
                            className="rounded-lg shadow-xl"/>
                            <div
                                className="absolute -right-6 -bottom-6 bg-gold text-white p-6 rounded-lg shadow-lg hidden md:block">
                                <p className="font-heading text-xl font-bold">Est. 2010</p><p>12+ years of
                                excellence</p></div>
                        </div>
                    </div>
                    <div className="lg:w-1/2"><h2
                        className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">About <span
                        className="text-gold">Al Hilal</span> Quran Academy</h2><p
                        className="text-gray-600 mb-6 leading-relaxed">Founded in 2010, Al Hilal Quran Academy was
                        established with a mission to provide high-quality Quranic education in a nurturing and
                        supportive environment. Our name &#34;Al Hilal,&quot; meaning &quot;The
                        Crescent,&quot; symbolizes the light of
                        guidance that the Quran brings to our lives.</p><p
                        className="text-gray-600 mb-6 leading-relaxed">What began as a small community initiative has
                        grown into a renowned institution serving students from diverse backgrounds and age groups.
                        Throughout our journey, we have remained committed to our founding principles of excellence,
                        authenticity, and compassion.</p><h3 className="text-xl font-bold text-primary mb-4">Our Core
                        Values</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-gold"/>
                                <span className="text-gray-700">Excellence in Quranic education</span></div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-gold"/>
                                <span className="text-gray-700">Nurturing spiritual growth</span></div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-gold"/>
                                <span className="text-gray-700">Inclusive and supportive environment</span></div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-gold"/>
                                <span className="text-gray-700">Respect for Islamic traditions</span></div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-gold"/>
                                <span className="text-gray-700">Continuous improvement and innovation</span></div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-gold"/>
                                <span className="text-gray-700">Building a strong Muslim community</span></div>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-4">Our Mission</h3><p
                            className="text-gray-600 mb-6 leading-relaxed">At Al Hilal, our mission is to inspire a deep
                            love for the Quran while providing the knowledge and skills necessary for proper recitation,
                            understanding, and application in daily life. We strive to create an environment where
                            students can connect with the Quran in a meaningful and personal way.</p>
                        <Link href="/contacts" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold rounded-full px-8 py-3 transition-all duration-300">
                            Learn More About Us</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
