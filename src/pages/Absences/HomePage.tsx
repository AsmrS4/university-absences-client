import { ApplicationsTable } from '@/components/ApplicationTable';
import type { AbsenceType } from '@/models/absence';
import { Box, Select, Tabs, TextInput } from '@mantine/core';

export default function HomePage() {
    const statuses = [
        { label: 'По болезни', value: 'sick' },
        { label: 'Прием у врача', value: 'medical' },
        { label: 'Командировка', value: 'business_trip' },
        { label: 'Учебная', value: 'study' },
        { label: 'Другая', value: 'another' },
    ];
    return (
        <>
            <div className='w-full h-full flex flex-col gap-6'>
                <h1 className='text-3xl font-semibold'>Заявки</h1>
                <Box className='w-full rounded-xl bg-white'>
                    <Tabs defaultValue='requests'>
                        <Tabs.List>
                            <Tabs.Tab value='requests'>
                                <div className='py-1 text-md'>На одобрение</div>
                            </Tabs.Tab>
                            <Tabs.Tab value='extend'>
                                <div className='py-1 text-md'>На продление</div>
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel className='p-4' value='requests'>
                            <Box className='flex flex-col items-start gap-2 bg-[#f9fafc] rounded-xl py-2 px-4 max-w-80 w-full'>
                                <span className='text-md text-[#5d5d5e]'>
                                    Количество заявок на рассмотрение
                                </span>
                                <span className='text-2xl font-medium p-2 pt-0'>0</span>
                            </Box>
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
                                <TextInput
                                    label='Группа'
                                    placeholder='Введите номер группы'
                                    type='number'
                                    maxLength={6}
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
                        </Tabs.Panel>
                        <Tabs.Panel className='p-4' value='extend'>
                            <Box className='flex flex-row items-center gap-4'>
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
                                <TextInput
                                    label='Группа'
                                    placeholder='Введите номер группы'
                                    type='number'
                                    maxLength={6}
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
                        </Tabs.Panel>
                    </Tabs>
                </Box>
                <Box className='w-full rounded-xl bg-white'>
                    <ApplicationsTable applications={MOCK_ABSENCES} />
                </Box>
            </div>
        </>
    );
}

const MOCK_ABSENCES: AbsenceType[] = [
    {
        id: 1,
        student_id: 101,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Болезнь',
        application_status: 'Одобрено',
        date_from: '2024-03-10',
        date_to: '2024-03-15',
        create_time: '2024-03-09T14:30:00',
    },
    {
        id: 2,
        student_id: 102,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Семейные обстоятельства',
        application_status: 'На рассмотрении',
        date_from: '2024-03-20',
        date_to: '2024-03-22',
        create_time: '2024-03-18T09:15:00',
    },
    {
        id: 3,
        student_id: 101,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Учебная сессия',
        application_status: 'Отклонено',
        date_from: '2024-04-01',
        date_to: '2024-04-10',
        create_time: '2024-03-25T11:00:00',
    },
    {
        id: 4,
        student_id: 103,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Болезнь',
        application_status: 'Одобрено',
        date_from: '2024-03-05',
        date_to: '2024-03-07',
        create_time: '2024-03-04T18:45:00',
    },
    {
        id: 5,
        student_id: 104,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Спортивные сборы',
        application_status: 'На рассмотрении',
        date_from: '2024-04-15',
        date_to: '2024-04-20',
        create_time: '2024-04-10T08:20:00',
    },
    {
        id: 6,
        student_id: 105,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Производственная практика',
        application_status: 'Одобрено',
        date_from: '2024-05-01',
        date_to: '2024-05-30',
        create_time: '2024-04-20T10:00:00',
    },
    {
        id: 7,
        student_id: 105,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Производственная практика',
        application_status: 'Одобрено',
        date_from: '2024-05-01',
        date_to: '2024-05-30',
        create_time: '2024-04-20T10:00:00',
    },
    {
        id: 8,
        student_id: 105,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Производственная практика',
        application_status: 'Одобрено',
        date_from: '2024-05-01',
        date_to: '2024-05-30',
        create_time: '2024-04-20T10:00:00',
    },
    {
        id: 9,
        student_id: 105,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Производственная практика',
        application_status: 'Одобрено',
        date_from: '2024-05-01',
        date_to: '2024-05-30',
        create_time: '2024-04-20T10:00:00',
    },
    {
        id: 10,
        student_id: 105,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Производственная практика',
        application_status: 'Одобрено',
        date_from: '2024-05-01',
        date_to: '2024-05-30',
        create_time: '2024-04-20T10:00:00',
    },
];
