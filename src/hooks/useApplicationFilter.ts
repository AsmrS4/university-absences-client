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
        const trimmedValue = value.trim();
        if (trimmedValue) setParams((prev) => ({ ...prev, full_name: value }));
    };

    const handleGroupCode = (value: number): void => {
        if (value > 0) setParams((prev) => ({ ...prev, group_code: value }));
    };

    const handleSelectType = (value: string | null, option: ComboboxItem<string>): void => {
        const trimmedValue = value != null ? value.trim() : '';
        console.log('selected type: ', value);
        if (trimmedValue) setParams((prev) => ({ ...prev, type: value }));
    };

    const resetFilters = (): void => {
        setParams(defaultParams);
    };

    return {
        params,
        handleFullName,
        handleGroupCode,
        handleSelectType,
        resetFilters,
    };
};
