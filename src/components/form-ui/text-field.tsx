import React from "react";
import { useFieldContext } from ".";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldErrors } from "./field-errors";

type TextFieldProps = {
    label: string
    className?:string
    placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({ label,placeholder, className,...inputProps }: TextFieldProps) => {
    const field = useFieldContext<string>();

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <Label htmlFor={field.name}>{label}</Label>
                <Input
                    id={field.name}
                    name={field.name}
                    placeholder={placeholder}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={className || ""}
                    {...inputProps}
                />
            </div>
            <FieldErrors meta={field.state.meta}/>
        </div>
    );
};