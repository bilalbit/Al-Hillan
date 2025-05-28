"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useFieldContext} from "@/components/form-ui/index";
type  DatePickerWithRange = React.HTMLAttributes<HTMLDivElement> & {
    label: string
}
export function DatePickerWithRange({
                                        className,
                                        label
                                    }:DatePickerWithRange) {
    // const [date, setDate] = React.useState<DateRange | undefined>({
    //     from: new Date(2022, 0, 20),
    //     to: addDays(new Date(2022, 0, 20), 20),
    // })
    const field = useFieldContext<DateRange | undefined>();
    // field.state.value = {
    //     from: new Date(2022, 0, 20),
    //     to: addDays(new Date(2022, 0, 20), 20),
    // }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !field.state.value && "text-muted-foreground"
                            // !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {field.state.value?.from ? (
                            field.state.value.to ? (
                                <>
                                    {format(field.state.value.from, "LLL dd, y")} -{" "}
                                    {format(field.state.value.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(field.state.value.from, "LLL dd, y")
                            )
                        ) : (
                            <span>{label}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={new Date()}
                        selected={field.state.value}
                        onSelect={(value)=>(field.handleChange(value))}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
