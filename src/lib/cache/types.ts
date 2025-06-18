export const CACHE_TAGS = {
    students: "students",
    packages: "packages",
    payments: "payments",
    courses: "courses",
    registers: "registers",
    users: "users"
} as const;

export type tagsType = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export type FetchOptions = {
    revalidate?: number | false;
    tags?: [tagsType, ...(string | tagsType)[]] | [];
    fallbackData?: unknown;
};

export type filterQueryType = {
    limit?: number
    page?: number
    order_by?: "created_at" | "updated_at"
}