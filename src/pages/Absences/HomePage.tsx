import { fetchStatuses } from '@/api/api';
import { ApplicationsTable } from '@/components/ApplicationTable';
import { DatePicker } from '@/components/DatePicker';
import { GroupCodeInput } from '@/components/GroupCodeInput';
import { SelectInput } from '@/components/SelectInput';
import { useAbsenceApplications } from '@/hooks/useAbsenceApplications';
import { useStatuses } from '@/hooks/useStatuses';
import { Box, Tabs, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const { statuses } = useStatuses();
    const [dates, setDates] = useState<[string | null, string | null]>([null, null]);
    const {
        applications,
        params,
        loading,
        errorMessage,
        handleFullName,
        handleGroupCode,
        handleSelectOrder,
        handleSelectType,
    } = useAbsenceApplications();

    useEffect(() => {
        console.log(params);
    }, [params]);

    return (
        <>
            <div className='w-full h-full flex flex-col gap-6'>
                <h1 className='text-2xl font-semibold'>Заявки</h1>
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
                                <SelectInput
                                    label={'Тип пропуска'}
                                    placeholder={'Укажите тип пропуска'}
                                    data={statuses}
                                    value={params.type || ''}
                                    onChange={handleSelectType}
                                />
                                <GroupCodeInput
                                    value={params.group_code || 0}
                                    onChange={handleGroupCode}
                                />
                                <DatePicker dates={dates} setDates={setDates} />
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
                                <SelectInput
                                    label={'Тип пропуска'}
                                    placeholder={'Укажите тип пропуска'}
                                    data={statuses}
                                    value={params.type || ''}
                                    onChange={handleSelectType}
                                />
                                <GroupCodeInput
                                    value={params.group_code || 0}
                                    onChange={handleGroupCode}
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
                    <ApplicationsTable
                        applications={applications.data}
                        handleSelect={handleSelectOrder}
                    />
                </Box>
            </div>
        </>
    );
}
