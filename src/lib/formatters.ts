const compactNumberFormatter = new Intl.NumberFormat(undefined, {
    notation: "compact",
})

export function formatCompactNumber(number: number) {
    return compactNumberFormatter.format(number)
}
type timestampType = number | Date | undefined | string
export const formatDateToYYYYMMDD = (timestamp:timestampType = Date.now())=> {
    if (typeof timestamp == "string") return timestamp
    return new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(timestamp).replace(/\//g, '-');
}