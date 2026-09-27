import { fetchProfile } from '@/api/auth';
import { useEffect, useState } from 'react';

export const useProfile = () => {
    const [fullName, setFullName] = useState<string | null>(null);

    const fetch = async () => {
        try {
            const res: string = await fetchProfile();
            setFullName(res);
        } catch (error) {
            setFullName('Не авторизован');
        }
    };
    useEffect(() => {
        let isMounted = true;
        const init = async () => {
            if (isMounted) await fetch();
        };
        init();

        return () => {
            isMounted = false;
        };
    }, []);

    return { fullName };
};
