import * as v from 'valibot';

export const LoginSchema = v.object({
    username: v.pipe(
        v.string('Username must be a string'),
        v.minLength(3, 'Username must be at least 3 characters long')
    ),
    password: v.pipe(
        v.string('Password must be a string'),
        v.minLength(8, 'Password must be at least 8 characters long')
    )

});
export type LoginType = v.InferInput<typeof LoginSchema> & Partial<{file: File | null}>