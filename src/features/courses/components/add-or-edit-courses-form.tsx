import React from 'react';
import {CourseCategoryOptions, courseDefaultValue, CourseSchema, CourseType} from "@/features/courses/schemas";
import {useAppForm} from "@/components/form-ui";
import {Edit, Plus} from "lucide-react";
import {addCourseAction, editCourseAction} from "@/features/courses/server/actions";
import {initialFormState} from '@tanstack/react-form/nextjs';
import {mergeForm, useTransform} from '@tanstack/react-form';
import {toast} from 'sonner';

type AddOrEditCoursesFormType = {
    form_type: "add" | "edit"
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
    defaultValues?: CourseType,
}
export const AddOrEditCoursesForm = ({
                                         form_type,
                                         closeModal,
                                         defaultValues = courseDefaultValue
                                     }: AddOrEditCoursesFormType) => {
    const [add_state, addAction] = React.useActionState(addCourseAction, initialFormState)
    const [edit_state, editAction] = React.useActionState(editCourseAction, initialFormState)
    const form = useAppForm({
        defaultValues: defaultValues,
        validators: {
            onBlurAsync: CourseSchema,
            onBlurAsyncDebounceMs: 1500
        },
        // @ts-expect-error from typesafe error
        transform: useTransform((baseForm) => mergeForm(baseForm, add_state!), [add_state]),
    })
    // Effect to handle modal closing and toast notifications
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
    return (
        <form
            action={form_type == "add" ? addAction : editAction}
            className="flex flex-col gap-4" onSubmit={() => form.handleSubmit()}>
            <form.AppField name="id">
                {(field) => <field.HiddenInput/>}
            </form.AppField>
            <form.AppField name="title">
                {(field) => <field.TextField label="Title"/>}
            </form.AppField>
            <form.AppField name='category'>
                {
                    (field) => (
                        <field.SelectField
                            label="Course type"
                            options={CourseCategoryOptions}
                            placeholder="Course Type"
                        />
                    )
                }
            </form.AppField>

            <form.AppField name="youtube_url">
                {(field) => <field.TextField label="Course Intro Video"/>}
            </form.AppField>
            <div className="flex gap-6 my-8">
                <form.AppField name="startDate">
                    {(field) => <field.DatePicker label="Start day of The Course"/>}
                </form.AppField>
                <form.AppField name="duration">
                    {(field) => <field.DatePicker label="Duration of The Course"/>}
                </form.AppField>
            </div>
            <form.AppField name="description">
                {(field) => <field.TextAreaField label="Description"/>}
            </form.AppField>
            {
                form_type == "edit" ?
                    (
                        <form.AppForm>
                            <form.SubmitButton>
                                <Edit/> Edit
                            </form.SubmitButton>
                        </form.AppForm>
                    ) : (
                        <form.AppForm>
                            <form.SubmitButton>
                                <Plus/> Add
                            </form.SubmitButton>
                        </form.AppForm>
                    )
            }
        </form>

    );
};
