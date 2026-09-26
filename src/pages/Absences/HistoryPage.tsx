import { Box, Select, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

export default function HistoryPage() {
    const statuses = [
        { label: 'По болезни', value: 'sick' },
        { label: 'Прием у врача', value: 'medical' },
        { label: 'Командировка', value: 'business_trip' },
        { label: 'Учебная', value: 'study' },
        { label: 'Другая', value: 'another' },
    ];
    const [dates, setDates] = useState<[string | null, string | null]>([null, null]);
    return (
        <>
            <div className='w-full h-full flex flex-col gap-6'>
                <h1 className='text-2xl font-semibold'>Архив пропусков</h1>
                <Box className='w-full rounded-xl bg-white p-4 pt-0'>
                    <Box className='mt-4 flex flex-row items-center gap-4'>
                        <Select
                            label='Тип пропуска'
                            placeholder='Укажите тип пропуска'
                            data={statuses}
                            className='max-w-80 w-full'
                            size='md'
                            styles={{
                                label: {
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: '#575859',
                                    marginBottom: '4px',
                                },
                            }}
                        />
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
                    </Box>
                    <Box className='mt-4 w-full'>
                        <TextInput
                            placeholder='Введите ФИО студента'
                            size='md'
                            variant='filled'
                            styles={{
                                label: {
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: '#575859',
                                    marginBottom: '4px',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </div>
        </>
    );
}
