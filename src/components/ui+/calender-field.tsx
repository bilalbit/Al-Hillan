'use client'

import * as React from 'react'
import {ChevronDownIcon} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger,} from '@/components/ui/popover'

interface CalendarFieldProps {
    value: string;
    onChangeAction: (value: string) => void;
    label?: string;
    placeholder?: string;
}

export function CalendarField({
                                  value,
                                  onChangeAction,
                                  placeholder = 'Select date'
                              }: CalendarFieldProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex flex-col w-1/3 gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                    >
                        {value ? new Date(value).toLocaleDateString() : placeholder}
                        <ChevronDownIcon/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            if (date) {
                                onChangeAction(date.toISOString().split('T')[0])
                            }
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}