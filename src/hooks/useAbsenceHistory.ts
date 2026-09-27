import { useEffect, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { useHistoryFilters } from './useHistoryFilters';
import type { AbsenceApplications } from '@/models/absence';
import { fetchHistory } from '@/api/api';

export const useHistoryApplications = () => {
    const [applications, setApplications] = useState<AbsenceApplications>({
        data: [],
        page: 1,
        size: 10,
        total: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);

    const { errorMessage, handleError, clearError } = useErrorHandler();
    const {
        params,
        draft,
        handleFullName,
        handleSelectType,
        handleDateFrom,
        handleDateTo,
        applyFilters,
        resetFilters,
        handlePageChange,
    } = useHistoryFilters();

    const fetch = async (): Promise<void> => {
        clearError();
        setLoading(true);
        try {
            const res = await fetchHistory(params);
            setApplications((prev) => ({ ...prev, ...res }));
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const init = async (): Promise<void> => {
            if (isMounted) {
                await fetch();
            }
        };
        init();
        return () => {
            isMounted = false;
        };
    }, [params]);

    return {
        applications,
        loading,
        errorMessage,
        draft,
        handleFullName,
        handleSelectType,
        handleDateFrom,
        handleDateTo,
        applyFilters,
        resetFilters,
        handlePageChange,
    };
};
