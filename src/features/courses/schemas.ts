import * as v from 'valibot';

export const CourseCategory = ["beginner", "intermediate", "advanced","special"] as const;

export const CourseSchema = v.object({
    id: v.pipe(v.string(), v.uuid('The UUID is badly formatted.')),
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
        v.string(),
        v.minLength(1, "Duration is required."),
        v.maxLength(50, "Duration must be 50 characters or less.")
    ),
    students: v.pipe(
        v.number(),
        v.integer(),
        v.minValue(0, "Students must be a non-negative integer.")
    ),
    startDate: v.pipe(
        v.string(),
        v.minLength(1, "Start date is required."),
        v.maxLength(100, "Start date must be 100 characters or less.")
    ),
    description: v.pipe(
        v.string(),
        v.minLength(1, "Description is required."),
        v.maxLength(500, "Description must be 500 characters or less.")
    ),
});

export type CourseType = v.InferInput<typeof CourseSchema>