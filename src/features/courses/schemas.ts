import * as v from 'valibot';

export const CourseCategory = ["beginner", "intermediate", "advanced", "special"] as const;

export const CourseCategoryOptions = CourseCategory.map((value) => {
    return {value: value, label: value};
})
const yyyyMMddString = v.pipe(
    v.string(),
    v.regex(/^\d{4}-\d{2}-\d{2}$/, 'The date must be in YYYY-MM-DD format.'),
    v.transform((input) => new Date(input)),
    v.date('The date string must be a valid date.')
);

export const CourseSchema = v.object({
    id: v.optional(v.string(), ""), // Add id field, optional with default empty string
    title: v.pipe(
        v.string(),
        v.minLength(1, "Title is required."),
        v.maxLength(100, "Title must be 100 characters or less.")
    ),
    category: v.picklist(CourseCategory, "Category must be beginner, intermediate, or advanced."),
    youtube_url: v.pipe(
        v.string(),
        v.url('YouTube URL must be a valid URL.'),
        v.regex(
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
            'URL must be a valid YouTube URL.'
        ),
        v.maxLength(2048, 'YouTube URL must be 2048 characters or less.')
    ),
    num_of_students: v.optional(
        v.pipe(
            v.optional(v.number(), 0),
            v.integer(),
            v.minValue(0, 'Students must be a non-negative integer.')
        )
    )
    ,
    startDate: v.pipe(
        v.union([
            v.date('The input must be a valid Date object.'),
            yyyyMMddString,
        ]),
        v.transform((date) => date.toISOString().split('T')[0]), // Output as YYYY-MM-DD
        v.isoDate('The date is badly formatted.')
    ),
    duration: v.pipe(
        v.union([
            v.date('The input must be a valid Date object.'),
            yyyyMMddString,
        ]),
        v.transform((date) => date.toISOString().split('T')[0]), // Output as YYYY-MM-DD
        v.isoDate('The date is badly formatted.')
    ),
    description: v.pipe(
        v.string(),
        v.minLength(1, "Description is required."),
        v.maxLength(500, "Description must be 500 characters or less.")
    ),
});

export type CourseType = v.InferInput<typeof CourseSchema>

export const courseDefaultValue: CourseType = {
    id: "",
    title: "",
    category: "beginner",
    youtube_url: "",
    duration: "",
    num_of_students: 0,
    startDate: new Date(),
    description: "",
}