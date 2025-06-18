import React from 'react';
import {Award, BookOpen, Clock, Globe, HeartHandshake, Users} from "lucide-react";

export const WhySectionLayout = () => {
    return (
        <section className="py-20 bg-light">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16"><h2
                    className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">ለምን <span
                    className="text-gold">አል ሂላል</span>ን መምረጥ</h2><p
                    className="text-lg text-gray-600 max-w-2xl mx-auto">አካዳሚያችን ልዩ የሆነ የቁርአን ትምህርት በግላዊ እድገት እና መንፈሳዊ
                    እድገት ላይ በማተኮር ያቀርባል።</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="mb-4">
                            <BookOpen className="h-10 w-10 text-gold"/>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">ሁሉን አቀፍ ሥርዓተ ትምህርት</h3><p
                        className="text-gray-600">የተዋቀረው ፕሮግራማችን የቁርአን ንባብ፣ ታጅዊድ፣ ማስታወስ እና ትርጉም ለሁሉም የትምህርት ደረጃዎች
                        ያካትታል።</p></div>
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="mb-4">
                            <Users className="h-10 w-10 text-gold"/>

                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">ልምድ ያላቸው መምህራን</h3><p
                        className="text-gray-600">በቁርአን ንባብ እጃዛ ያላቸው እና ሰፊ የማስተማር ልምድ ያላቸው መምህራን ያስተምራሉ።</p></div>
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="mb-4">
                            <Award className="h-10 w-10 text-gold"/>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">እውቅና ያለው ምስክር ወረቀት</h3><p
                        className="text-gray-600">ፕሮግራሞቻችንን በተሳካ ሁኔታ ሲያጠናቅቁ በዓለም አቀፍ ደረጃ እውቅና ያለው ምስክር ወረቀት ያገኛሉ።</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="mb-4">
                            <Globe className="h-10 w-10 text-gold"/>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">በአካልና መስመር ላይ</h3><p
                        className="text-gray-600">በአካል መማር ወይም በመስመር ላይ ከዓለም ማንኛውም ቦታ መማር ይችላሉ።</p></div>
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="mb-4">
                            <Clock className="h-10 w-10 text-gold"/>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">ምቹ የጊዜ ሰሌዳ</h3><p
                        className="text-gray-600">ለተማሪዎች ምቹ የሆነ ብዙ የጊዜ ሰሌዳዎች አሉን።</p></div>
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="mb-4">
                            <HeartHandshake className="h-10 w-10 text-gold"/>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">ደጋፊ ማህበረሰብ</h3><p
                        className="text-gray-600">መንፈሳዊና ትምህርታዊ እድገትዎን የሚደግፍ አስደሳች ማህበረሰብን ይቀላቀሉ።</p></div>
                </div>
            </div>
        </section>
    );
};
