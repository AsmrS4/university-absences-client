import { useAbsenceTypes } from '@/hooks/useAbsenceTypes';
import { Box, Button, Modal, Select, Stack, type ComboboxItem } from '@mantine/core';
import { useState } from 'react';
import { PeriodDatePicker } from '../DatePicker';
import type { ReportFilters } from '@/models/report';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { generateReport } from '@/api/api';
import { GroupCodeInput } from '../GroupCodeInput';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ReportModal = ({ isOpen, onClose }: ReportModalProps) => {
    const [groupCode, setCode] = useState<number | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [dateFrom, setDateFrom] = useState<string | null>(null);
    const [dateTo, setDateTo] = useState<string | null>(null);

    const statuses = [
        { label: 'Одобрена', value: 'approved' },
        { label: 'Отклонена', value: 'rejected' },
    ];
    const { types } = useAbsenceTypes();
    const { handleError } = useErrorHandler();

    const resetFilters = () => {
        setCode(null);
        setType(null);
        setStatus(null);
        setDateFrom(null);
        setDateTo(null);
    };

    const handleApplyFilters = async () => {
        const filters: ReportFilters = {
            date_from: dateFrom,
            date_to: dateTo,
            status: status,
            type: type,
            group_code: groupCode,
        };
        try {
            const res: string = await generateReport(filters);
            window.location.href = res;
        } catch (error) {
            handleError(error);
        }
    };

    const handleSelectType = (value: string | null, _option: ComboboxItem<string>): void => {
        setType(value);
    };

    const handleSelectStatus = (value: string | null, _option: ComboboxItem<string>): void => {
        setStatus(value);
    };

    const handleDateFrom = (value: string): void => {
        setDateFrom(value);
    };

    const handleDateTo = (value: string): void => {
        setDateTo(value);
    };

    const handleGroupCode = (value: number): void => {
        const num = typeof value === 'string' ? Number(value) : value;
        setCode(num > 0 ? num : null);
    };

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title={'Параметры генерации отчета'}
            size='lg'
            padding='md'
            styles={{
                title: {
                    fontSize: '24px',
                    fontWeight: 600,
                },
            }}
        >
            <Stack gap='md'>
                <Box className='w-full h-12 flex flex-col items-start justify-center rounded-lg p-2 pl-4 bg-[#cce1fc]'>
                    <p className='text-md font-light m-0 p-0'>
                        Выберите параметры для генерации отчета.
                    </p>
                </Box>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 px-2'>
                    <GroupCodeInput value={groupCode || 0} onChange={handleGroupCode} />
                </div>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 px-2'>
                    <Select
                        label='Статус пропуска'
                        placeholder='Выберите статус'
                        className='w-full'
                        data={statuses}
                        size='md'
                        value={status}
                        onChange={handleSelectStatus}
                        styles={{
                            label: {
                                fontSize: '18px',
                                fontWeight: 600,
                                color: '#575859',
                                marginBottom: '4px',
                            },
                        }}
                        comboboxProps={{
                            transitionProps: { transition: 'pop', duration: 100 },
                            shadow: 'sm',
                        }}
                        clearable
                    />
                    <Select
                        label='Тип пропуска'
                        placeholder='Выберите тип'
                        className='w-full'
                        size='md'
                        data={types}
                        value={type}
                        onChange={handleSelectType}
                        styles={{
                            label: {
                                fontSize: '18px',
                                fontWeight: 600,
                                color: '#575859',
                                marginBottom: '4px',
                            },
                        }}
                        comboboxProps={{
                            transitionProps: { transition: 'pop', duration: 100 },
                            shadow: 'sm',
                        }}
                        clearable
                    />
                    <PeriodDatePicker
                        dates={[dateFrom || null, dateTo || null]}
                        setDates={(dates) => {
                            handleDateFrom(dates[0] || '');
                            handleDateTo(dates[1] || '');
                        }}
                    />
                </div>
                <div className='flex flex-col sm:flex-row items-stretch gap-2 px-2 mt-2'>
                    <Button
                        className='w-full sm:flex-1'
                        variant='outline'
                        color='#0061e3'
                        size='md'
                        radius='md'
                        onClick={resetFilters}
                    >
                        Сбросить
                    </Button>
                    <Button
                        className='w-full sm:flex-1'
                        onClick={handleApplyFilters}
                        color='#0061e3'
                        size='md'
                        radius='md'
                    >
                        Применить
                    </Button>
                </div>
            </Stack>
        </Modal>
    );
};
