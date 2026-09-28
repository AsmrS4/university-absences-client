import type { AuthResponse, Profile } from '@/models/auth';
import { routes } from '@/router/routes';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const BASENAME = '/plugins/absence-plugin/app/';
const BASE_URI = '/api/triggers/http/absence-plugin/api';

export const loginUser = (): void => {
    const returnTo = `${BASENAME}${routes.absences.home}`;
    window.location.href = `/api/auth/tsu/start?return_to=${encodeURIComponent(returnTo)}`;
};

export const fetchSession = async (): Promise<AuthResponse> => {
    try {
        const res: AxiosResponse<AuthResponse> = await axios.get(`/api/auth/session`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async (): Promise<AxiosResponse> => {
    try {
        const res: AxiosResponse = await axios.post<AxiosResponse>(
            `/api/auth/logout`,
            {},
            {
                withCredentials: true,
            },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const fetchProfile = async (): Promise<string> => {
    try {
        const res: AxiosResponse<Profile> = await axios.get(`${BASE_URI}/user/me`, {
            withCredentials: true,
        });
        return res.data.full_name;
    } catch (error) {
        throw error;
    }
};
