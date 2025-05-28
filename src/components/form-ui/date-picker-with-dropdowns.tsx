"use client";

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i)

export default function DatePickerWithDropdowns() {
    const [date, setDate] = React.useState<Date>()
    const [month, setMonth] = React.useState<string>(new Date().getMonth().toString())
    const [year, setYear] = React.useState<string>(currentYear.toString())
    const [open, setOpen] = React.useState(false)

    // Update the calendar when month or year changes
    const calendarMonth = new Date(Number.parseInt(year), Number.parseInt(month))

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate)
            setOpen(false)
        }
    }

    const handleMonthChange = (newMonth: string) => {
        setMonth(newMonth)
    }

    const handleYearChange = (newYear: string) => {
        setYear(newYear)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold text-center">Date Picker with Dropdowns</h1>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-3 border-b">
                            <div className="flex gap-2">
                                <Select value={month} onValueChange={handleMonthChange}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {months.map((monthName, index) => (
                                            <SelectItem key={index} value={index.toString()}>
                                                {monthName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={year} onValueChange={handleYearChange}>
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((yearValue) => (
                                            <SelectItem key={yearValue} value={yearValue.toString()}>
                                                {yearValue}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            month={calendarMonth}
                            onMonthChange={(newMonth) => {
                                setMonth(newMonth.getMonth().toString())
                                setYear(newMonth.getFullYear().toString())
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {date && (
                    <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Selected date:</p>
                        <p className="font-medium">{format(date, "EEEE, MMMM do, yyyy")}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
