import * as v from 'valibot';

const StudentStatus = ["active", "inactive", "suspended"] as const;
export const StudentStatusOptions = StudentStatus.map((value) => ({
    value: value,
    label: value
}))

export const StudentSchema = v.object({
    id: v.optional(
        v.pipe(v.string(), v.uuid('The UUID is badly formatted.')),""
    ),
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
    account_number: v.optional(
        v.pipe(
            v.string('Account number must be a string'),
            v.regex(/^[0-9]{13}$/, 'Must be 13-digit CBE Account Number')
        )
    ),
    phone_number: v.pipe(
        v.string('Account number must be a string'),
        v.regex(/^[97][0-9]{8}$/, 'Must be 9-digit Ethiopian Phone Number starting with 9 or 7'),
        v.length(9, "Phone Number Must be Exactly 9-digits")
    ),
    date_of_birth: v.optional(v.pipe(
        v.date()
    )),
    status: v.picklist(StudentStatus, "\"Category must be active, inactive, or suspended.\""),

});
export type StudentType = v.InferInput<typeof StudentSchema>