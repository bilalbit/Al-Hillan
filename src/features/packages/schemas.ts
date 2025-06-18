import * as v from 'valibot';

const parseNumber = (input: string | number): number => {
    if (typeof input === 'number') return Math.floor(input); // Handle number input
    return parseInt(input, 10); // Handle string input
};
export const PackageSchema = v.pipe(
    v.object({
        id: v.optional(v.string(), ""),
        course_type: v.optional(
            v.pipe(v.string(), v.uuid('The UUID is badly formatted.'))
        ),
        month_price: v.pipe(
            v.union([v.string(), v.number()]),
            v.transform(parseNumber),
            v.number(),
            v.minValue(1),
        ),
        half_year_price: v.pipe(
            v.union([v.string(), v.number()]),
            v.transform(parseNumber),
            v.number(),
            v.minValue(1),
        ),
        year_price: v.pipe(
            v.union([v.string(), v.number()]),
            v.transform(parseNumber),
            v.number(),
            v.minValue(1),
        ),
    }),
    v.forward(
        v.partialCheck(
            [["month_price"], ["half_year_price"]],
            (input) => input.month_price * 6 > input.half_year_price,
            "Half-year price must be less than 6 times the monthly price."
        ),
        ["half_year_price"]
    ),
    v.forward(
        v.partialCheck(
            [["month_price"], ["year_price"]],
            (input) => input.month_price * 12 > input.year_price,
            "year price must be less than 12 times the monthly price."
        ),
        ["year_price"]
    )
)

export type PackagesType = v.InferInput<typeof PackageSchema>

export const defaultPackageValue: PackagesType = {
    id: "",
    course_type: "",
    year_price: 1,
    half_year_price: 1,
    month_price: 1,
}