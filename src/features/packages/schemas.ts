import * as v from 'valibot';

export const PackageSchema = v.object({
    id: v.pipe(v.string(), v.uuid('The UUID is badly formatted.')),
    course_type: v.pipe(v.string(), v.uuid('The UUID is badly formatted.')),
    year_price: v.pipe(v.number(), v.minValue(1)),
    half_year_price: v.pipe(v.number(), v.minValue(1)),
    month_price: v.pipe(v.number(), v.minValue(1)),
})

export type PackagesType = v.InferInput<typeof PackageSchema>