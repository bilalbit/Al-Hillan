import React from "react";
import { useFieldContext } from ".";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldErrors } from "./field-errors";
import { LoaderCircle } from "lucide-react";

type TextFieldProps = {
    label: string
    placeholder?:string
    className?:string
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextFieldWithLoader = ({ label,placeholder, className,...inputProps }: TextFieldProps) => {
    const field = useFieldContext<string>();

    return (
        <div className="space-y-2">
            <div className="space-y-1 relative">
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
                {field.getMeta().isValidating && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <LoaderCircle className="animate-spin mr-3" />
                    </div>
                )}
            </div>
            <FieldErrors meta={field.state.meta} />
        </div>
    );
};