import type { AbsenceApplication } from '@/models/absence';
import { useEffect, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { approveAbsence, fetchDetails, rejectAbsence } from '@/api/api';
import { useNotification } from './useNotification';

export const useAbsenceDetails = (id: string | undefined) => {
    const absenceId = parseInt(id || '0');

    const [absence, setAbsence] = useState<AbsenceApplication | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { errorMessage, handleError, clearError } = useErrorHandler();
    const { handleErrorNotification, handleSuccessNotification } = useNotification();

    const handleAbsence = (abs: AbsenceApplication): void => {
        absence == null ? setAbsence(abs) : setAbsence((prev) => ({ ...prev, ...abs }));
    };

    const handleChangeStatus = (status: string): void => {
        absence && setAbsence((prev) => ({ ...prev!, application_status: status }));
    };

    const handleRejectAbsence = async (message: string): Promise<void> => {
        clearError();
        if (absence?.application_status != 'pending') return;
        try {
            const res: boolean = await rejectAbsence(absence?.id, message);
            if (res) handleChangeStatus('rejected');
            handleSuccessNotification('Заявка успешно отклонена');
        } catch (error) {
            handleError(error);
            handleErrorNotification(
                'Не удалось обработать запрос.\n\nОтклонить заявку не получилось.',
            );
        }
    };

    const handleApproveAbsence = async (): Promise<void> => {
        clearError();
        try {
            const res: boolean = await approveAbsence(absence?.id);
            if (res) handleChangeStatus('approved');
            handleSuccessNotification('Заявка одобрена.');
        } catch (error) {
            handleError(error);
            handleErrorNotification(
                'Не удалось обработать запрос.\n\nОдобрить заявку не получилось.',
            );
        }
    };

    const fetch = async (): Promise<void> => {
        clearError();
        setLoading(true);
        try {
            const res: AbsenceApplication = await fetchDetails(absenceId);
            handleAbsence(res);
        } catch (error) {
            handleError(error);
            handleErrorNotification('Произошла ошибка.\n\nНе удалось получить данные');
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

    return { absence, loading, errorMessage, handleRejectAbsence, handleApproveAbsence };
};
