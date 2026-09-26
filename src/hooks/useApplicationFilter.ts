import type { AbsenceApplicationsFilterParams } from '@/models/absence';
import type { ComboboxItem } from '@mantine/core';
import { useState } from 'react';

export const useApplicationFilters = () => {
    const defaultParams = {
        full_name: null,
        group_code: null,
        type: null,
        page: 1,
        size: 10,
    };
    const [params, setParams] = useState<AbsenceApplicationsFilterParams>(defaultParams);

    const handleFullName = (value: string): void => {
        const trimmed = value.trim();
        setParams((prev) => ({ ...prev, full_name: trimmed || null }));
    };

    const handleGroupCode = (value: number): void => {
        const num = typeof value === 'string' ? Number(value) : value;
        setParams((prev) => ({ ...prev, group_code: num > 0 ? num : null }));
    };

    const handleSelectType = (value: string | null, option: ComboboxItem<string>): void => {
        setParams((prev) => ({ ...prev, type: value?.trim() || null }));
    };

    const resetFilters = (): void => {
        setParams({ ...defaultParams });
    };

    return {
        params,
        handleFullName,
        handleGroupCode,
        handleSelectType,
        resetFilters,
    };
};
