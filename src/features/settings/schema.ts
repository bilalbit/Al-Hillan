import * as v from "valibot";

export const profileSchema = v.object({
    username: v.pipe(
        v.string(),
        v.minLength(3)
    ),
    email: v.pipe(
        v.string(),
        v.email()
    )
})
export const PasswordFormSchema = v.object({
    current_password: v.pipe(v.string(), v.minLength(8)),
    new_password: v.pipe(v.string(), v.minLength(8)),
    password_confirmation: v.pipe(v.string(), v.minLength(8))
});