import {AnyFieldMeta} from "@tanstack/react-form";
import {ValiError} from "valibot";

type FieldErrorsProps = {
    meta: AnyFieldMeta
}
export const FieldErrors = ({meta}: FieldErrorsProps) => {
    if (!meta.isTouched) return null;
    return meta.errors.map(({message}: ValiError<never>, index) => (
        <p key={index} className="text-sm font-medium text-destructive">
            {message}
        </p>
    ))
};
