import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ComboboxItem } from '@mantine/core';
import type { AbsenceHistoryParams } from '@/models/absence';

const defaultParams: AbsenceHistoryParams = {
    group_code: null,
    type: null,
    full_name: null,
    date_from: null,
    date_to: null,
    page: 1,
    size: 10,
};

const readFromUrl = (searchParams: URLSearchParams): AbsenceHistoryParams => ({
    group_code: searchParams.get('group_code') ? Number(searchParams.get('group_code')) : null,
    type: searchParams.get('type') || null,
    full_name: searchParams.get('full_name') || null,
    date_from: searchParams.get('date_from') || null,
    date_to: searchParams.get('date_to') || null,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    size: searchParams.get('size') ? Number(searchParams.get('size')) : 10,
});

const clearFilterParams = (searchParams: URLSearchParams): URLSearchParams => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('full_name');
    newParams.delete('group_code');
    newParams.delete('type');
    newParams.delete('date_from');
    newParams.delete('date_to');
    newParams.delete('page');
    newParams.delete('size');
    return newParams;
};

export const useHistoryFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [draft, setDraft] = useState<AbsenceHistoryParams>(() => readFromUrl(searchParams));

    const params = useMemo(() => readFromUrl(searchParams), [searchParams]);

    const handleFullName = (value: string): void => {
        setDraft((prev) => ({ ...prev, full_name: value }));
    };

    const handleGroupCode = (value: number): void => {
        const num = typeof value === 'string' ? Number(value) : value;
        setDraft((prev) => ({ ...prev, group_code: num > 0 ? num : null }));
    };

    const handleSelectType = (value: string | null, _option: ComboboxItem<string>): void => {
        setDraft((prev) => ({ ...prev, type: value?.trim() || null }));
    };

    const handleDateFrom = (value: string): void => {
        setDraft((prev) => ({ ...prev, date_from: value }));
    };

    const handleDateTo = (value: string): void => {
        setDraft((prev) => ({ ...prev, date_to: value }));
    };

    const clearDraft = (): void => {
        setDraft({ ...defaultParams });
    };

    const applyFilters = (): void => {
        const newParams = clearFilterParams(searchParams);

        if (draft.full_name) newParams.set('full_name', draft.full_name);
        if (draft.group_code) newParams.set('group_code', String(draft.group_code));
        if (draft.type) newParams.set('type', draft.type);
        if (draft.date_from) newParams.set('date_from', draft.date_from);
        if (draft.date_to) newParams.set('date_to', draft.date_to);

        newParams.set('page', '1');
        setSearchParams(newParams, { replace: true });
    };

    const resetFilters = (): void => {
        clearDraft();
        setSearchParams(clearFilterParams(searchParams), { replace: true });
    };

    const handlePageChange = (page: number): void => {
        const newParams = new URLSearchParams(searchParams);
        if (page === 1) {
            newParams.delete('page');
        } else {
            newParams.set('page', String(page));
        }
        setSearchParams(newParams, { replace: true });
    };

    return {
        params,
        draft,
        handleFullName,
        handleGroupCode,
        handleSelectType,
        handleDateFrom,
        handleDateTo,
        applyFilters,
        resetFilters,
        clearDraft,
        handlePageChange,
    };
};
