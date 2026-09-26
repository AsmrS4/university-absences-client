import { useState } from 'react';

export const useLoadingState = () => {
    const states = {
        IDLE: 'idle',
        LOADING: 'loading',
        ERROR: 'error',
        SUCCESS: 'success',
    };

    const [state, setState] = useState<string>(states.IDLE);

    const resetState = () => {
        setState(states.IDLE);
    };

    const loadingState = () => {
        setState(states.LOADING);
    };

    const errorState = () => {
        setState(states.ERROR);
    };

    const successState = () => {
        setState(states.SUCCESS);
    };

    return { state, resetState, loadingState, errorState, successState };
};
