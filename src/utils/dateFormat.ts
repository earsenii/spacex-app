import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.guess();

export const dateFormat = (date: number): string => {
    return dayjs.unix(date).format('ddd, MMMM DD, YYYY, HH:mm:ss ZZ')
}

export const dateFormatMini = (date: number): string => {
    return dayjs.unix(date).format('MMM YYYY')
}