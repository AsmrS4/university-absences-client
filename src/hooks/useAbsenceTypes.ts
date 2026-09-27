import { fetchTypes } from '@/api/api';
import type { AbsenceType } from '@/models/absence';
import { useEffect, useState } from 'react';

export const useAbsenceTypes = () => {
    const [types, setTypes] = useState<AbsenceType[]>([]);
    const fetch = async () => {
        try {
            const res: AbsenceType[] = await fetchTypes();
            setTypes(res);
        } catch (error) {
            if (types.length > 0) return;
            setTypes([]);
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

    return { types };
};
