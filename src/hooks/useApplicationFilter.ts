import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ComboboxItem } from '@mantine/core';
import type { AbsenceApplicationsFilterParams } from '@/models/absence';

const defaultParams: AbsenceApplicationsFilterParams = {
    full_name: null,
    group_code: null,
    type: null,
    page: 1,
    size: 10,
};

const readFromUrl = (searchParams: URLSearchParams): AbsenceApplicationsFilterParams => ({
    full_name: searchParams.get('full_name') || null,
    group_code: searchParams.get('group_code') ? Number(searchParams.get('group_code')) : null,
    type: searchParams.get('type') || null,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    size: searchParams.get('size') ? Number(searchParams.get('size')) : 10,
});

const clearFilterParams = (searchParams: URLSearchParams): URLSearchParams => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('full_name');
    newParams.delete('group_code');
    newParams.delete('type');
    newParams.delete('page');
    newParams.delete('size');
    return newParams;
};

export const useApplicationFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [draft, setDraft] = useState<AbsenceApplicationsFilterParams>(() =>
        readFromUrl(searchParams),
    );

    const params = useMemo(() => readFromUrl(searchParams), [searchParams]);

    const handleFullName = (value: string): void => {
        const trimmed = value.trim();
        setDraft((prev) => ({ ...prev, full_name: trimmed || null }));
    };

    const handleGroupCode = (value: number): void => {
        const num = typeof value === 'string' ? Number(value) : value;
        setDraft((prev) => ({ ...prev, group_code: num > 0 ? num : null }));
    };

    const handleSelectType = (value: string | null, _option: ComboboxItem<string>): void => {
        setDraft((prev) => ({ ...prev, type: value?.trim() || null }));
    };

    const clearDraft = (): void => {
        setDraft({ ...defaultParams });
    };

    const applyFilters = (): void => {
        const newParams = clearFilterParams(searchParams);

        if (draft.full_name) newParams.set('full_name', draft.full_name);
        if (draft.group_code) newParams.set('group_code', String(draft.group_code));
        if (draft.type) newParams.set('type', draft.type);

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
        applyFilters,
        resetFilters,
        clearDraft,
        handlePageChange,
    };
};
