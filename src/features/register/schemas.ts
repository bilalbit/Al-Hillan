import * as v from 'valibot';

export const RegisterSchema = v.object({
    first_name: v.pipe(
        v.string('First name must be a string'),
        v.minLength(3, 'first name must be at least 3 characters long'),
        v.regex(/^[a-zA-Z]+$/, 'First name must contain only letters with no spaces'),
        v.transform((input) => input.charAt(0).toUpperCase() + input.slice(1).toLowerCase())
    ),
    middle_name: v.pipe(
        v.string('Last name must be a string'),
        v.minLength(3, 'Last name must be at least 3 characters long'),
        v.regex(/^[a-zA-Z]+$/, 'Last name must contain only letters with no spaces'),
        v.transform((input) => input.charAt(0).toUpperCase() + input.slice(1).toLowerCase())
    ),
    last_name: v.optional(v.pipe(
        v.string('Last name must be a string'),
        v.minLength(3, 'Last name must be at least 3 characters long'),
        v.regex(/^[a-zA-Z]+$/, 'Last name must contain only letters with no spaces'),
        v.transform((input) => input.charAt(0).toUpperCase() + input.slice(1).toLowerCase())
    )),
    phone_number: v.pipe(
        v.string('Account number must be a string'),
        v.regex(/^[97][0-9]{8}$/, 'Must be 9-digit Ethiopian Phone Number starting with 9 or 7'),
        v.length(9, "Phone Number Must be Exactly 9-digits")
    ),
    course_title: v.string(),
    student_id: v.optional(v.string()),
});
export type RegisterType = v.InferInput<typeof RegisterSchema> & { id: string }