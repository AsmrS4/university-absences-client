import { PeriodDatePicker } from '@/components/DatePicker';
import { useAbsenceTypes } from '@/hooks/useAbsenceTypes';
import { HistoryApplicationsTable } from '@/components/Table/ApplicationTable';
import { Button, Box, Select, TextInput, Pagination } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/router/routes';
import { useHistoryApplications } from '@/hooks/useAbsenceHistory';

export default function HistoryPage() {
    const { types } = useAbsenceTypes();
    const navigate = useNavigate();

    const {
        applications,
        loading,
        draft,
        handleFullName,
        handleSelectType,
        handleDateFrom,
        handleDateTo,
        applyFilters,
        resetFilters,
        handlePageChange,
    } = useHistoryApplications();

    const totalPages =
        applications.size > 0 ? Math.ceil(applications.total / applications.size) : 1;

    const handleSelectOrder = (id: number): void => {
        navigate(`/${routes.absences.home}/${id}`);
    };

    return (
        <div className='w-full h-full flex flex-col gap-6'>
            <h1 className='text-3xl font-semibold'>Архив пропусков</h1>
            <Box className='w-full rounded-xl bg-white p-4'>
                <Box className='flex flex-col sm:flex-row sm:items-end gap-4'>
                    <Select
                        label='Тип пропуска'
                        placeholder='Укажите тип пропуска'
                        data={types}
                        value={draft.type || ''}
                        onChange={handleSelectType}
                        className='w-full sm:max-w-80'
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
                    <PeriodDatePicker
                        dates={[draft.date_from || null, draft.date_to || null]}
                        setDates={(dates) => {
                            handleDateFrom(dates[0] || '');
                            handleDateTo(dates[1] || '');
                        }}
                    />
                    <Box className='mt-4 flex flex-col sm:flex-row gap-2'>
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
            </Box>
            <Box className='w-full rounded-xl'>
                <HistoryApplicationsTable
                    applications={applications.data}
                    loading={loading}
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
    );
}
