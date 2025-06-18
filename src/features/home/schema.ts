import * as v from 'valibot';

const yyyyMMddString = v.pipe(
    v.string(),
    v.regex(/^\d{4}-\d{2}-\d{2}$/, 'The date must be in YYYY-MM-DD format.'),
    v.transform((input) => new Date(input)),
    v.date('The date string must be a valid date.')
);
export const RegisterFormFirstStep = v.object({
    first_name: v.pipe(
        v.string('First name must be a string'),
        v.minLength(3, 'first name must be at least 3 characters long'),
        v.regex(/^[a-zA-Z]+$/, 'First name must contain only letters with no spaces'),
        v.transform((input) => input.charAt(0).toUpperCase() + input.slice(1).toLowerCase())
    ),
    middle_name: v.pipe(
        v.string('Middle name must be a string'),
        v.minLength(3, 'Middle name must be at least 3 characters long'),
        v.regex(/^[a-zA-Z]+$/, 'Middle name must contain only letters with no spaces'),
        v.transform((input) => input.charAt(0).toUpperCase() + input.slice(1).toLowerCase())
    ),
    phone_number: v.pipe(
        v.string('Phone number must be a string'),
        v.regex(/^[97][0-9]{8}$/, 'Must be 9-digit Ethiopian Phone Number starting with 9 or 7'),
        v.length(9, "Phone Number Must be Exactly 9-digits")
    ),
})
export const PublicRegisterSchema = v.object({
    ...RegisterFormFirstStep.entries,
    last_name: v.optional(
        v.union([
            v.literal(''),
            v.pipe(
                v.string('Last name must be a string'),
                v.minLength(3, 'Last name must be at least 3 characters long'),
                v.regex(/^[a-zA-Z]+$/, 'Last name must contain only letters with no spaces'),
                v.transform((input) => input.charAt(0).toUpperCase() + input.slice(1).toLowerCase())
            )
        ])
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
    course_id: v.pipe(
        v.string('Course ID is required'),
        v.uuid('Invalid UUID')
    ),
    email: v.optional(v.union([
        v.literal(''),
        v.optional(v.pipe(
            v.string('Email must be a string'),
            v.email('Please enter a valid email address')
        ))
    ])),
})
export const PaymentSchema = v.object({
    package_id: v.pipe(
        v.string('Package ID is required'),
        v.uuid('Invalid UUID')
    ),
    payment_method: v.picklist([
        'telebirr',
        'cbe',
        'cbe-birr'
    ], 'Please select a valid payment method'),
    transaction: v.pipe(
        v.string('Transaction ID is required'),
        v.minLength(4, 'Transaction ID must be at least 4 characters long')
    ),
    account_number: v.optional(
        v.string()
    ),
    plan: v.picklist([
        'monthly',
        'half_year',
        'yearly'
    ], 'Please select a valid plan method')
})


export type PublicRegisterFormType = v.InferInput<typeof PublicRegisterSchema>;
export type PublicPaymentFormType = v.InferInput<typeof PaymentSchema>;
