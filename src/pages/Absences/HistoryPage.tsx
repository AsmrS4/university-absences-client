import { PeriodDatePicker } from '@/components/DatePicker';
import { useStatuses } from '@/hooks/useStatuses';
import { Box, Select, TextInput } from '@mantine/core';
import { useState } from 'react';

export default function HistoryPage() {
    const { statuses } = useStatuses();
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
                        <PeriodDatePicker dates={dates} setDates={setDates} />
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
