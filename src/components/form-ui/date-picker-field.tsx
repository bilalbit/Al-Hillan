"use client"

import * as React from "react"

import {ChevronDownIcon} from "lucide-react"
import {Button} from "@/components/ui/button"

import {Calendar} from "@/components/ui/calendar"
import {Label} from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {format} from "date-fns";

import {useFieldContext} from "@/components/form-ui/index"
import {formatDateToYYYYMMDD} from "@/lib/formatters";
import { cn } from "@/lib/utils"

type DatePickerType = {
    label: string
    className?: string
}
export const DatePicker = ({label, className}: DatePickerType) => {
    const [open, setOpen] = React.useState(false)
    const field = useFieldContext<Date | undefined>()

    return (
        <div className={cn("flex flex-col gap-3",className)}>
            <Label htmlFor={field.name} className="px-1">
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id={field.name}
                        className="w-48 justify-between font-normal"
                    >
                        {field.state.value ? format(new Date(field.state.value), "PPP") : <span>{label}</span>}
                        <ChevronDownIcon/>
                        <input
                            value={formatDateToYYYYMMDD(field.state.value)}
                            name={field.name}
                            className="hidden"
                            type="hidden"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.state.value ? new Date(field.state.value) : undefined}
                        captionLayout="dropdown"
                        onSelect={(value) => (field.handleChange(value))}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

