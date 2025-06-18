import * as v from 'valibot';

const StudentStatus = ["active", "inactive", "suspended"] as const;
export const StudentStatusOptions = StudentStatus.map((value) => ({
    value: value,
    label: value
}))
const yyyyMMddString = v.pipe(
    v.string(),
    v.regex(/^\d{4}-\d{2}-\d{2}$/, 'The date must be in YYYY-MM-DD format.'),
    v.transform((input) => new Date(input)),
    v.date('The date string must be a valid date.')
);
export const StudentSchema = v.object({
    id: v.optional(v.string()),
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
    last_name: v.pipe(
        v.string('Last name must be a string'),
        v.minLength(3, 'Last name must be at least 3 characters long'),
        v.regex(/^[a-zA-Z]+$/, 'Last name must contain only letters with no spaces'),
        v.transform((input) => input.charAt(0).toUpperCase() + input.slice(1).toLowerCase())
    ),
    phone_number: v.pipe(
        v.string('Account number must be a string'),
        v.regex(/^[97][0-9]{8}$/, 'Must be 9-digit Ethiopian Phone Number starting with 9 or 7'),
        v.length(9, "Phone Number Must be Exactly 9-digits")
    ),
    date_of_birth: v.optional(v.pipe(
        v.union([
            v.nullable(v.string()),
            v.nullable(v.date('The input must be a valid Date object.')),
            yyyyMMddString,
        ]),
        v.transform((date) => {
            if (typeof date == "string") return date
            if (date) return date.toISOString().split('T')[0]
        }), // Output as YYYY-MM-DD
    )),
    status: v.optional(
        v.picklist(StudentStatus, "Category must be active, inactive, or suspended.")
    ),
    course_id: v.optional(
        v.pipe(
            v.string(), v.uuid('Invalid UUID')
        )
    )
});
// export type StudentFormType = v.InferInput<typeof StudentSchema>
export type StudentType = v.InferInput<typeof StudentSchema> & { id?: string }