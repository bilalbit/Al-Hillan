'use client'
import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Calendar } from '@/components/ui/calendar';
import {Button} from "@/components/ui/button";
import {CalendarIcon} from "lucide-react";
import { format } from "date-fns"

export const PopOverCalendar = () => {
    const [date, setDate] = React.useState<Date | undefined>()
    const [open, setOpen] = React.useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="w-full font-bold text-lg">
                    <CalendarIcon />
                    {date ? (
                        format(date, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(value)=>{
                        setDate(value)
                        setOpen(false)
                    }}
                    className="rounded-md border"
                />
            </PopoverContent>
        </Popover>
    );
};
