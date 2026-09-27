import dayjs from 'dayjs';

const MONTHS = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];

export const formatDate = (isoString: string | undefined): string => {
    if (!isoString) {
        return dayjs(new Date()).format('DD.MM.YYYY HH:mm');
    }
    return dayjs(isoString).format('DD.MM.YYYY HH:mm');
};

export const formatDisplayPeriod = (from: string, to: string) => {
    return from === to
        ? formatDisplayDate(from)
        : `${formatDisplayDate(from)} — ${formatDisplayDate(to)}`;
};

export const formatDisplayDate = (dateStr?: string): string => {
    if (!dateStr) return '';

    const [datePart, timePart] = dateStr.split('T');
    const [year, month, day] = datePart.split('-');

    const formattedDay = parseInt(day, 10);
    const formattedMonth = MONTHS[parseInt(month, 10) - 1];

    let result = `${formattedDay} ${formattedMonth} ${year}`;

    if (timePart && timePart != '00:00:00Z') {
        const [hours, minutes] = timePart.split(':');
        result += ` ${hours}:${minutes}`;
    }

    return result;
};
