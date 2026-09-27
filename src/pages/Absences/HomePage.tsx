import { ApplicationsTable } from '@/components/Table/ApplicationTable';
import { GroupCodeInput } from '@/components/GroupCodeInput';
import { SelectInput } from '@/components/SelectInput';
import { useAbsenceApplications } from '@/hooks/useAbsenceApplications';
import { useStatuses } from '@/hooks/useStatuses';
import { Box, Button, Pagination, Tabs, TextInput } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';

const TABS = {
    REQUESTS: 'requests',
    EXTEND: 'extend',
} as const;

type TabValue = (typeof TABS)[keyof typeof TABS];

const isValidTab = (value: string | null): value is TabValue =>
    value === TABS.REQUESTS || value === TABS.EXTEND;

export default function HomePage() {
    const { statuses } = useStatuses();
    const [searchParams, setSearchParams] = useSearchParams();

    const tabParam = searchParams.get('tab');
    const currentTab: TabValue = isValidTab(tabParam) ? tabParam : TABS.REQUESTS;

    const {
        applications,
        draft,
        loading,
        handleFullName,
        handleGroupCode,
        handleSelectOrder,
        handleSelectType,
        applyFilters,
        resetFilters,
        clearDraft,
        handlePageChange,
    } = useAbsenceApplications();

    const handleTabChange = (value: string | null) => {
        if (!value) return;

        clearDraft();

        const newParams = new URLSearchParams(searchParams);
        newParams.delete('full_name');
        newParams.delete('group_code');
        newParams.delete('type');
        newParams.delete('page');
        newParams.delete('size');

        if (value === TABS.REQUESTS) {
            newParams.delete('tab');
        } else {
            newParams.set('tab', value);
        }
        setSearchParams(newParams, { replace: true });
    };

    const totalPages =
        applications.size > 0 ? Math.ceil(applications.total / applications.size) : 1;

    return (
        <>
            <div className='w-full h-full flex flex-col gap-6'>
                <h1 className='text-2xl font-semibold'>Заявки</h1>
                <Box className='w-full rounded-xl bg-white'>
                    <Tabs value={currentTab} onChange={handleTabChange}>
                        <Tabs.List>
                            <Tabs.Tab value={TABS.REQUESTS}>
                                <div className='py-1 text-md'>На одобрение</div>
                            </Tabs.Tab>
                            <Tabs.Tab value={TABS.EXTEND}>
                                <div className='py-1 text-md'>На продление</div>
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel className='p-4' value={TABS.REQUESTS}>
                            <Box className='flex flex-col items-start gap-2 bg-[#f9fafc] rounded-xl py-2 px-4 w-full sm:max-w-80'>
                                <span className='text-md text-[#5d5d5e]'>
                                    Количество заявок на рассмотрение
                                </span>
                                <span className='text-2xl font-medium p-2 pt-0'>
                                    {applications.total}
                                </span>
                            </Box>

                            <Box className='mt-4 flex flex-col sm:flex-row sm:items-end gap-4'>
                                <SelectInput
                                    label={'Тип пропуска'}
                                    placeholder={'Укажите тип пропуска'}
                                    data={statuses}
                                    value={draft.type || ''}
                                    onChange={handleSelectType}
                                />
                                <GroupCodeInput
                                    value={draft.group_code || 0}
                                    onChange={handleGroupCode}
                                />
                                <Box className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
                                    <Button
                                        size='md'
                                        radius='md'
                                        color='#0061e3'
                                        onClick={applyFilters}
                                        className='w-full sm:w-auto'
                                    >
                                        Применить
                                    </Button>
                                    <Button
                                        size='md'
                                        radius='md'
                                        variant='outline'
                                        onClick={resetFilters}
                                        className='w-full sm:w-auto'
                                    >
                                        Сбросить
                                    </Button>
                                </Box>
                            </Box>

                            <Box className='mt-4 w-full'>
                                <TextInput
                                    placeholder='Введите ФИО студента'
                                    size='md'
                                    variant='filled'
                                    value={draft.full_name || ''}
                                    onChange={(e) => handleFullName(e.currentTarget.value)}
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

                        <Tabs.Panel className='p-4' value={TABS.EXTEND}>
                            <Box className='flex flex-col sm:flex-row sm:items-end gap-4'>
                                <SelectInput
                                    label={'Тип пропуска'}
                                    placeholder={'Укажите тип пропуска'}
                                    data={statuses}
                                    value={draft.type || ''}
                                    onChange={handleSelectType}
                                />
                                <GroupCodeInput
                                    value={draft.group_code || 0}
                                    onChange={handleGroupCode}
                                />
                                <Box className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
                                    <Button
                                        size='md'
                                        radius='md'
                                        color='#0061e3'
                                        onClick={applyFilters}
                                        className='w-full sm:w-auto'
                                    >
                                        Применить
                                    </Button>
                                    <Button
                                        size='md'
                                        radius='md'
                                        variant='outline'
                                        onClick={resetFilters}
                                        className='w-full sm:w-auto'
                                    >
                                        Сбросить
                                    </Button>
                                </Box>
                            </Box>

                            <Box className='mt-4 w-full'>
                                <TextInput
                                    placeholder='Введите ФИО студента'
                                    size='md'
                                    variant='filled'
                                    value={draft.full_name || ''}
                                    onChange={(e) => handleFullName(e.currentTarget.value)}
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
                <Box className='w-full rounded-xl'>
                    <ApplicationsTable
                        loading={loading}
                        applications={applications.data}
                        handleSelect={handleSelectOrder}
                    />
                    {totalPages > 1 && (
                        <Box className='flex justify-center py-4'>
                            <Pagination
                                total={totalPages}
                                value={applications.page}
                                onChange={handlePageChange}
                                size='md'
                                radius='md'
                                color='#0061e3'
                            />
                        </Box>
                    )}
                </Box>
            </div>
        </>
    );
}
