import React from 'react';
import {ChevronRight} from "lucide-react";
import Link from 'next/link';

export const IntroLayout = () => {
    return (
        <section id="home" className="relative bg-tertiary/80 text-white min-h-screen flex items-center pt-16">
            <div className="absolute inset-0 bg-[url(/images/bg-2.jpg)]"></div>
            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-3xl"><h1
                    className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"><span
                    className="text-gold font-extrabold">የእውቀት</span> መንገድዎን በቁርአን ያብራሩ</h1><p
                    className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">አል ሂላል የቁርአን አካዳሚ ሁሉን አቀፍ የእስልምና
                    ትምህርት፣ የቁርአን ንባብ፣ ማስታወስ እና መረዳትን በምቹ አካባቢ ያቀርባል።</p>
                    <div className="flex flex-col sm:flex-row gap-4"><Link href="/#courses"
                                                                        className="bg-gold hover:bg-gold-dark text-white font-bold rounded-full px-8 py-4 transition-all duration-300 text-center group">ኮርሶችን
                        ይመልከቱ
                        <ChevronRight className="inline-block ml-1 transition-transform group-hover:translate-x-1" />
                    </Link><Link href="/contacts"
                           className="border-2 border-white hover:bg-white hover:text-primary text-white font-bold rounded-full px-8 py-4 transition-all duration-300 text-center">ያግኙን</Link>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-gold">12+</p><p
                            className="text-sm opacity-80">ዓመታት ልምድ</p></div>
                        <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-gold">50+</p><p
                            className="text-sm opacity-80">ብቁ መምህራን</p></div>
                        <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-gold">1000+</p><p
                            className="text-sm opacity-80">የተማሩ ተማሪዎች</p></div>
                        <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-gold">8+</p><p
                            className="text-sm opacity-80">ልዩ ኮርሶች</p></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
