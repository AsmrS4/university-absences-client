import { DatePickerInput, type DatePickerPreset } from '@mantine/dates';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { useState } from 'react';

dayjs.extend(quarterOfYear);

export const PeriodDatePicker = () => {
    const [dates, setDates] = useState<[string | null, string | null]>([null, null]);
    const today = dayjs();

    const presets: DatePickerPreset<'range'>[] = [
        {
            label: 'Прошлая неделя',
            value: [
                dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
                dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD'),
            ],
        },
        {
            label: 'Прошлый месяц',
            value: [
                dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
                dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
            ],
        },
        {
            label: 'Прошлый квартал',
            value: [
                dayjs().subtract(1, 'quarter').startOf('quarter').format('YYYY-MM-DD'),
                dayjs().subtract(1, 'quarter').endOf('quarter').format('YYYY-MM-DD'),
            ],
        },
        {
            label: 'Прошлый год',
            value: [
                dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
                dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD'),
            ],
        },
    ];

    return (
        <DatePickerInput
            type='range'
            label='Период'
            placeholder='Укажите период'
            className='max-w-80 w-full'
            size='md'
            value={dates}
            presets={presets}
            onChange={setDates}
            styles={{
                label: {
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#575859',
                    marginBottom: '4px',
                },
            }}
        />
    );
};
