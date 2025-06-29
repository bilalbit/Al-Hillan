import React from "react";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import {Toaster} from "sonner";

import type {Metadata} from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Al-Hillan Academy",
    description: "All-Hillan Academy Online Quran Teaching School",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="scroll-smooth"
            suppressHydrationWarning
        >
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        <Toaster/>
        </body>
        </html>
    );
}
