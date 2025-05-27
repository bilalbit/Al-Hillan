import {createFormHook, createFormHookContexts} from '@tanstack/react-form'

// field imports
import {TextField} from "./text-field";
import {CheckboxField} from "./checkbox-field";
import {SelectField} from "./select-field";
import {SubmitButton} from "./submit-button";
import {TextFieldWithLoader} from "./text-field-with-loader";
import {ResetButton} from "./reset-button";
import {DatePicker} from "./date-picker-field";
import {NumberField} from "@/components/form-ui/number-field";

// export useFieldContext for use in your custom components
export const {fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

export const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField,
        CheckboxField,
        SelectField,
        TextFieldWithLoader,
        DatePicker,
        NumberField
    },
    formComponents: {
        SubmitButton,
        ResetButton
    },
    fieldContext,
    formContext,
});
