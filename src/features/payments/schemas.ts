import * as v from 'valibot';


const PaymentSchema = v.object({
    id: v.optional(
        v.pipe(v.string(), v.uuid('The UUID is badly formatted.')),""),
    course_type: v.pipe(v.string(), v.uuid('The UUID is badly formatted.')),
    month_price: v.pipe(v.number(), v.minValue(1)),
    half_year_price: v.pipe(v.number(), v.minValue(1)),
    year_price: v.pipe(v.number(), v.minValue(1)),
})