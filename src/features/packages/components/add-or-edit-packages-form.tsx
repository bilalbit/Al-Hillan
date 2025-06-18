import React from 'react';
import {useAppForm} from "@/components/form-ui";
import {PackageSchema, PackagesType} from "@/features/packages/schemas";
import {addPackagesAction, editPackageAction} from "@/features/packages/server/actions";
import {initialFormState} from '@tanstack/react-form/nextjs';
import {mergeForm, useTransform} from '@tanstack/react-form';
import {toast} from "sonner";
import {getCourseWithoutPackage} from "@/features/courses/server/api";


type AddOrEditPackagesFormProps = {
    form_type: "add" | "edit"
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
    defaultValues?: PackagesType
}
export const AddOrEditPackagesForm = ({
                                          form_type,
                                          closeModal,
                                          defaultValues
                                      }: AddOrEditPackagesFormProps) => {
    const [add_state, addAction] = React.useActionState(addPackagesAction, initialFormState)
    const [edit_state, editAction] = React.useActionState(editPackageAction, initialFormState)
    const [courseValue, setCourseValue] = React.useState<{ value: string, label: string }[] | null>(null);

    const form = useAppForm({
        defaultValues: defaultValues,
        validators: {
            onChangeAsync: PackageSchema,
            onChangeAsyncDebounceMs: 2000,
        },
        // @ts-expect-error form type fix
        transform: useTransform((baseForm) => mergeForm(baseForm, form_type == "add" ? add_state! : edit_state!), [form_type == "add" ? add_state : edit_state]),

    })
    React.useEffect(() => {
        // @ts-expect-error unknown
        if (add_state.success) {
            toast("Course has been created.");
            closeModal(false); // Close modal on successful add
        }
        // @ts-expect-error unknown
        if (edit_state.success) {
            toast("Course has been edited.");
            closeModal(false); // Close modal on successful edit
        }
        // @ts-expect-error unknown
    }, [add_state.success, edit_state.success, closeModal]);
    React.useEffect(() => {
        async function fetchCourse() {
            const fetchedCourses = await getCourseWithoutPackage();
            setCourseValue(fetchedCourses);
        }

        fetchCourse()
    }, []);
    return (
        <form
            action={form_type == "add" ? (addAction as never) : (editAction as never)}
            className="grid gap-4 py-4"
            onSubmit={() => form.handleSubmit()}
        >
            <form.AppField name="id">
                {(field) => <field.HiddenInput/>}
            </form.AppField>
            {
                form_type == "add" && courseValue ? (
                    <form.AppField name='course_type'>
                        {
                            (field) => (
                                <field.SelectField
                                    label="Course type"
                                    options={courseValue}
                                    placeholder="Course Type"
                                />
                            )
                        }
                    </form.AppField>
                ) : null
            }

            <form.AppField name="month_price">
                {(field) => <field.NumberField type="number" min={1} label="Monthly Price"/>}
            </form.AppField>
            <form.AppField name="half_year_price">
                {(field) => <field.NumberField type="number" min={1} label="Half Year Price"/>}
            </form.AppField>
            <form.AppField name="year_price">
                {(field) => <field.NumberField type="number" min={1} label="Year Price"/>}
            </form.AppField>

            <form.AppForm>
                <form.SubmitButton>
                    {
                        form_type == "add" ? "Add" : "Edit"
                    }
                </form.SubmitButton>
            </form.AppForm>
        </form>
    );
};
