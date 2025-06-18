'use client';
import React from 'react';
import {Clock} from "lucide-react";
import useGeolocation from "@/hooks/use-geo-location";
import {getPrayerTime} from "@/features/home/server/api";

type timings = {
    Fajr: string
    Dhuhr: string
    Asr: string
    Maghrib: string
    Isha: string
}
export const PrayerTime = () => {
        const {latitude, longitude} = useGeolocation();
        const [prayerTime, setPrayerTime] = React.useState<timings>({
                Fajr: "",
                Dhuhr: "",
                Asr: "",
                Maghrib: "",
                Isha: "",
            }
        );
        React.useEffect(() => {
            const fetchData = async () => {
                const result = await getPrayerTime({latitude, longitude});
                setPrayerTime(result);
            };
            fetchData();
        }, [latitude, longitude]);
        return (
            <section className="p-8 bg-tertiary text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            {/*className="lucide lucide-clock mr-2 text-gold">*/}
                            <Clock className="mr-2 text-gold"/>
                            <div><p className="text-sm opacity-80">Current Time</p><p className="font-bold">21:13</p><p
                                className="text-xs opacity-70">Sunday, June 8, 2025</p></div>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <div className="text-center bg-white/10 bg-opacity-10 px-4 py-2 rounded-lg"><p
                                className="text-sm text-gold font-medium">Fajr</p><p className="font-bold">{prayerTime.Fajr}</p></div>
                            <div className="text-center bg-white/10 bg-opacity-10 px-4 py-2 rounded-lg"><p
                                className="text-sm text-gold font-medium">Dhuhr</p><p className="font-bold">{prayerTime.Dhuhr}</p>
                            </div>
                            <div className="text-center bg-white/10 bg-opacity-10 px-4 py-2 rounded-lg"><p
                                className="text-sm text-gold font-medium">Asr</p><p className="font-bold">{prayerTime.Asr}</p></div>
                            <div className="text-center bg-white/10 px-4 py-2 rounded-lg"><p
                                className="text-sm text-gold font-medium">Maghrib</p><p className="font-bold">{prayerTime.Maghrib}</p>
                            </div>
                            <div className="text-center bg-white/10 bg-opacity-10 px-4 py-2 rounded-lg"><p
                                className="text-sm text-gold font-medium">Isha</p><p className="font-bold">{prayerTime.Isha}</p></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
;
