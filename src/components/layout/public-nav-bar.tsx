'use client';
import React from 'react';
import {Book, BookOpen, Info, Menu, PhoneCall, School, X} from "lucide-react";
import Link from "next/link";

export const PublicNavBar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(true);
    return (
        <header className="fixed w-full z-50 transition-all duration-300 bg-tertiary text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href='/' className="flex items-center gap-2 text-white">
                        <School/>
                        <div><span className="font-heading font-bold text-xl">አል ሂላል</span><span
                            className="block text-xs font-medium">የቁርአን አካዳሚ</span></div>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/#home"
                           className="font-medium transition-colors duration-200 flex items-center gap-1 text-white hover:text-gold">
                            <Book/>
                            መነሻ</Link>
                        <Link href="/#courses" className="
                  font-medium transition-colors duration-200
                  flex items-center gap-1
                  text-white hover:text-gold
                ">
                            <BookOpen/>
                            ኮርሶች
                        </Link>
                        <Link href="/#about" className="font-medium transition-colors duration-200
                  flex items-center gap-1
                  text-white hover:text-gold
                ">
                            <Info/>
                            ስለ እኛ
                        </Link>
                        <Link href="/contacts"
                              className="font-medium transition-colors duration-200 flex items-center gap-1 text-white hover:text-gold">
                            <PhoneCall/>
                            አግኙን
                        </Link>
                        <Link href="/register"
                              className="bg-gold hover:bg-gold-dark text-white rounded-full px-6 py-2 font-bold transition-colors duration-200">
                            ይመዝገቡ
                        </Link>
                    </nav>
                    <button className="md:hidden text-current"
                            aria-label="Toggle menu"
                            onClick={() => setMobileMenuOpen(val => !val)}
                    >
                        <Menu className={`${!isMobileMenuOpen && "hidden"}`}/>
                        <X className={`${isMobileMenuOpen && "hidden"}`}/>
                    </button>
                </div>
            </div>
            <nav className={`md:hidden ${isMobileMenuOpen && "hidden"} bg-white shadow-lg`}>
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-col space-y-3"><Link href="/#home"
                                                                className="text-primary hover:text-gold py-2 flex items-center gap-2">
                        <Book/>
                        መነሻ</Link>
                        <Link href="/#courses" className="text-primary hover:text-gold py-2 flex items-center gap-2">
                        <BookOpen/>

                        ኮርሶች</Link>
                        <Link href="/#about"
                           className="text-primary hover:text-gold py-2 flex items-center gap-2">
                            <Info/>
                            ስለ እኛ</Link>
                        <Link href="/contacts"
                              className="text-primary hover:text-gold py-2 flex items-center gap-2">
                            <PhoneCall/>
                            አግኙን</Link>
                        <Link href="/register"
                              className="bg-gold hover:bg-gold-dark text-white rounded-full px-6 py-2 font-bold transition-colors duration-200 inline-block text-center mt-2">ይመዝገቡ</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};
