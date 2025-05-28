import * as v from 'valibot';

export const CourseCategory = ["beginner", "intermediate", "advanced","special"] as const;

export const CourseCategoryOptions = CourseCategory.map((value)=>{
    return {value: value, label: value};
})

export const CourseSchema = v.object({
    id: v.optional(
        v.pipe(v.string(), v.uuid('The UUID is badly formatted.')),""),
    title: v.pipe(
        v.string(),
        v.minLength(1, "Title is required."),
        v.maxLength(100, "Title must be 100 characters or less.")
    ),
    category: v.picklist(CourseCategory,"Category must be beginner, intermediate, or advanced."),
    youtube_url: v.pipe(
        v.string(),
        v.url("YouTube URL must be a valid URL."),
        v.maxLength(2048, "Image URL must be 2048 characters or less.")
    ),
    duration: v.pipe(
        v.date(),
    ),
    num_of_students: v.nullable(
        v.pipe(
            v.number(),
            v.integer(),
            v.minValue(0, "Students must be a non-negative integer.")
        )
    ),
    startDate: v.pipe(
        v.date(),
    ),
    description: v.pipe(
        v.string(),
        v.minLength(1, "Description is required."),
        v.maxLength(500, "Description must be 500 characters or less.")
    ),
});

export type CourseSchemaType = v.InferInput<typeof CourseSchema>
export type CourseType = Omit<CourseSchemaType, "startDate" | "duration"> & Partial<Pick<CourseSchemaType, "startDate" | "duration">>
// export type CourseType = v.InferInput<Omit<typeof CourseSchema , "duration" | "startDate"> & Partial<Pick<typeof CourseSchema, "duration" | "startDate">>>