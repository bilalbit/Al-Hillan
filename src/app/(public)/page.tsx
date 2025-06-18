import {PrayerTime} from "@/features/home/layouts/prayer-time";
import {IntroLayout} from "@/features/home/layouts/intro-layout";
import {WhySectionLayout} from "@/features/home/layouts/why-section-layout";
import {CoursesLayout} from "@/features/home/layouts/courses-layout";
import {AboutUs} from "@/features/home/layouts/about-us";

export default function HomePage() {
    return (
        <>
            <IntroLayout />
            <WhySectionLayout />
            <CoursesLayout />
            <AboutUs />
            <PrayerTime />
        </>
    )
}