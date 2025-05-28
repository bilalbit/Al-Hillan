import * as v from 'valibot';
export const PackageSchema = v.pipe(
    v.object({
        id: v.optional(
            v.pipe(v.string(), v.uuid('The UUID is badly formatted.')),""),
        course_type: v.pipe(v.string(), v.uuid('The UUID is badly formatted.')),
        month_price: v.pipe(v.number(), v.minValue(1)),
        half_year_price: v.pipe(v.number(), v.minValue(1)),
        year_price: v.pipe(v.number(), v.minValue(1)),
    }),
    v.forward(
        v.partialCheck(
            [["month_price"],["half_year_price"]],
            (input)=>input.month_price * 6 > input.half_year_price,
            "Half-year price must be less than 6 times the monthly price."
        ),
        ["half_year_price"]
    ),
    v.forward(
        v.partialCheck(
            [["month_price"],["year_price"]],
            (input)=>input.month_price * 12 > input.year_price,
            "year price must be less than 12 times the monthly price."
        ),
        ["year_price"]
    )
)

export type PackagesType = v.InferInput<typeof PackageSchema>