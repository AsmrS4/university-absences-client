import type { AbsenceApplications, AbsenceApplicationsFilterParams } from '@/models/absence';
import { useEffect, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { fetchAbsencesToExtend } from '@/api/api';

export const useExtensionApplications = (tab: string, params: AbsenceApplicationsFilterParams) => {
    const [extensions, setApplications] = useState<AbsenceApplications>({
        data: [],
        page: 1,
        size: 0,
        total: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [hasAbsences, setHasAbsences] = useState<boolean>(false);

    const { errorMessage, handleError, clearError } = useErrorHandler();

    const handleApplications = (data: AbsenceApplications): void => {
        setApplications((prev) => ({ ...prev, ...data }));
    };

    const fetch = async (): Promise<void> => {
        clearError();
        setLoading(true);

        try {
            const res: AbsenceApplications = await fetchAbsencesToExtend(params);
            handleApplications(res);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tab != 'extend') return;
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

    useEffect(() => {
        setHasAbsences(extensions.data.length != 0);
    }, [extensions.data.length]);

    return {
        loading,
        hasAbsences,
        errorMessage,
        extensions,
    };
};
