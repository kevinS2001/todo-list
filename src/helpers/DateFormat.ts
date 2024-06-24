import { DateTime } from "luxon"

export const DateFormatFunc = (dateF: Date | string) => {
    const dt = DateTime.fromISO(typeof dateF === 'string' ? dateF : dateF.toJSON())
    return `${dt.toLocaleString(DateTime.DATETIME_SHORT).toUpperCase()}`
}