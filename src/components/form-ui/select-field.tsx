import { useFieldContext } from ".";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { FieldErrors } from "./field-errors";

type SelectOption = {
    value: string;
    label: string;
};

type SelectFieldProps = {
    label: string;
    options: SelectOption[];
    placeholder?: string;
};

export const SelectField = ({
                                label,
                                options,
                                placeholder,
                            }: SelectFieldProps) => {
    const field = useFieldContext<string>();

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">{label}</Label>
                <Select
                    value={field.state.value}
                    name={field.name}
                    onValueChange={(value) => field.handleChange(value)}
                >
                    <SelectTrigger
                        id={field.name}
                        onBlur={field.handleBlur}
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <FieldErrors meta={field.state.meta} />
        </div>
    );
};