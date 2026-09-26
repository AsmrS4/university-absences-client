import { fetchStatuses } from '@/api/api';
import type { AbsenceStatus } from '@/models/absence';
import { useEffect, useState } from 'react';

export const useStatuses = () => {
    const [statuses, setStatuses] = useState<AbsenceStatus[]>([]);
    const fetch = async () => {
        try {
            const res: AbsenceStatus[] = await fetchStatuses();
            setStatuses(res);
        } catch (error) {
            if (statuses.length > 0) return;
            setStatuses([]);
        }
    };
    useEffect(() => {
        let isMounted = true;
        const init = async () => {
            if (isMounted) {
                await fetch();
            }
        };
        init();
        return () => {
            isMounted = false;
        };
    }, []);

    return { statuses };
};
