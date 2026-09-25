import type { AbsenceApplication } from '@/models/absence';
import { useEffect, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { fetchDetails } from '@/api/api';

export const useAbsenceDetails = (absenceId: number) => {
    const [absence, setAbsence] = useState<AbsenceApplication | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { errorMessage, handleError, clearError } = useErrorHandler();

    const handleAbsence = (abs: AbsenceApplication): void => {
        absence == null ? setAbsence(abs) : setAbsence((prev) => ({ ...prev, ...abs }));
    };

    const fetch = async (): Promise<void> => {
        clearError();
        setLoading(true);
        try {
            const res: AbsenceApplication = await fetchDetails(absenceId);
            handleAbsence(res);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const init = async (): Promise<void> => {
            if (isMounted) await fetch();
        };
        init();
        return () => {
            isMounted = false;
        };
    }, [absenceId]);

    return { absence, loading, errorMessage };
};
