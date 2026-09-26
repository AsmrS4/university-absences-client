import type { Attachment } from '@/models/file';
import { useEffect, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { fetchAttachments } from '@/api/api';

export const useAbsenceAttachment = (id: string | undefined) => {
    const absenceId = parseInt(id || '0');
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetch = async (): Promise<void> => {
        try {
            setLoading(true);
            const res: Attachment[] = await fetchAttachments(absenceId);
            setAttachments(res);
        } catch (error) {
            setAttachments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const init = async (): Promise<void> => {
            if (isMounted) fetch();
        };
        init();

        return () => {
            isMounted = false;
        };
    }, [absenceId]);

    return {
        attachments,
        loading,
    };
};
