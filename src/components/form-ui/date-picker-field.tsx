"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useFieldContext} from "@/components/form-ui/index";
type DatePickerType = {
    label: string
}
export function DatePicker({
                               label
                           }:DatePickerType) {
    // const [date, setDate] = React.useState<Date>()
    const field = useFieldContext<Date>();


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal w-full",
                        !field.state.value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {field.state.value ? format(field.state.value, "PPP") : <span>{label}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.state.value}
                    onSelect={(value) => (field.handleChange(value as Date))}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    )
}
