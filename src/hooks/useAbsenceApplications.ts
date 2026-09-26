import type { AbsenceApplications } from '@/models/absence';
import { useEffect, useState } from 'react';
import { useApplicationFilters } from './useApplicationFilter';
import { useErrorHandler } from './useErrorHandler';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/router/routes';
import { fetchAbsences } from '@/api/api';

export const useAbsenceApplications = () => {
    const [applications, setApplications] = useState<AbsenceApplications>({
        data: [],
        page: 1,
        size: 0,
        total: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [hasAbsences, setHasAbsences] = useState<boolean>(false);

    const { errorMessage, handleError, clearError } = useErrorHandler();
    const { params, handleFullName, handleGroupCode, handleSelectType } = useApplicationFilters();

    const navigate = useNavigate();
    const handleSelectOrder = (id: number): void => {
        navigate(`/${routes.absences.home}/${id}`, { replace: true });
    };

    const handleApplications = (data: AbsenceApplications): void => {
        setApplications((prev) => ({ ...prev, ...data }));
    };

    const fetch = async (): Promise<void> => {
        clearError();
        setLoading(true);

        try {
            const res: AbsenceApplications = await fetchAbsences(params);
            handleApplications(res);
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

    useEffect(() => {
        setHasAbsences(applications.data.length != 0);
    }, [applications.data.length]);

    return {
        loading,
        hasAbsences,
        errorMessage,
        params,
        applications,
        handleSelectOrder,
        handleFullName,
        handleGroupCode,
        handleSelectType,
    };
};
