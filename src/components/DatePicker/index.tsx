import { DatePickerInput, type DatePickerPreset } from '@mantine/dates';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

dayjs.extend(quarterOfYear);

interface DatePickerProps {
    dates: [string | null, string | null];
    setDates: React.Dispatch<React.SetStateAction<[string | null, string | null]>>;
}

export const PeriodDatePicker = ({ dates, setDates }: DatePickerProps) => {
    const presets: DatePickerPreset<'range'>[] = [
        {
            label: 'Тек. неделя',
            value: [
                dayjs().subtract(0, 'week').startOf('week').format('YYYY-MM-DD'),
                dayjs().subtract(0, 'week').endOf('week').format('YYYY-MM-DD'),
            ],
        },
        {
            label: 'Тек. месяц',
            value: [
                dayjs().subtract(0, 'month').startOf('month').format('YYYY-MM-DD'),
                dayjs().subtract(0, 'month').endOf('month').format('YYYY-MM-DD'),
            ],
        },
        {
            label: 'Тек. квартал',
            value: [
                dayjs().subtract(0, 'quarter').startOf('quarter').format('YYYY-MM-DD'),
                dayjs().subtract(0, 'quarter').endOf('quarter').format('YYYY-MM-DD'),
            ],
        },
        {
            label: 'Тек. год',
            value: [
                dayjs().subtract(0, 'year').startOf('year').format('YYYY-MM-DD'),
                dayjs().subtract(0, 'year').endOf('year').format('YYYY-MM-DD'),
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

export const DatePicker = ({ dates, setDates }: DatePickerProps) => {
    return (
        <DatePickerInput
            type='range'
            label='Период'
            placeholder='Укажите период'
            className='max-w-80 w-full'
            size='md'
            value={dates}
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
