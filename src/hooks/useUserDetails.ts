import type { UserDetails } from '@/models/user';
import { useEffect, useState } from 'react';
import { useLoadingState } from './useStateMachine';
import { fetchStudentDetails } from '@/api/api';

export const useUserDetails = (id: number | undefined) => {
    const [userDetails, setDetails] = useState<UserDetails | null>(null);
    const { state, resetState, loadingState, errorState, successState } = useLoadingState();

    const fetch = async (): Promise<void> => {
        resetState();
        try {
            loadingState();
            const res: UserDetails = await fetchStudentDetails(id);
            setDetails((prev) => ({ ...prev, ...res }));
            successState();
        } catch (error) {
            errorState();
        }
    };
    useEffect(() => {
        let isMounted = true;
        const init = async (): Promise<void> => {
            isMounted && (await fetch());
        };
        init();
        return () => {
            isMounted = false;
        };
    }, [id]);

    return { userDetails, state };
};
