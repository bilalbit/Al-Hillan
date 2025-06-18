export type Payment = {
    payment_id: string
    student_id: string
    first_name: string
    middle_name: string
    last_name?: string
    phone_number: string
    account_number: string
    payment_method: "telebirr" | "cbe" | "cbe-birr"
    tin_number: string
    amount: number
    status: "verified" | "un-verified" | "failed"
    payment_date: string
}
