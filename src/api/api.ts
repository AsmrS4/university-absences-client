import type {
    AbsenceApplication,
    AbsenceApplications,
    AbsenceApplicationsFilterParams,
    AbsenceHistoryParams,
    AbsenceStatus,
    AbsenceType,
} from '@/models/absence';
import type { Attachment } from '@/models/file';
import type { UserDetails } from '@/models/user';
import axios, { type AxiosResponse } from 'axios';

const BASE_URI = 'https://superbot.staziss-tech.ru/api/triggers/http/absence-plugin/api';

export const fetchAbsences = async (params: AbsenceApplicationsFilterParams) => {
    try {
        const res: AxiosResponse<AbsenceApplications> = await axios.get(`${BASE_URI}/absence/all`, {
            withCredentials: false,
            params: { ...params },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const fetchHistory = async (params: AbsenceHistoryParams) => {
    try {
        const res: AxiosResponse<AbsenceApplications> = await axios.get(
            `${BASE_URI}/absence/history`,
            {
                withCredentials: false,
                params: { ...params },
            },
        );
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAbsencesToExtend = async (params: AbsenceApplicationsFilterParams) => {
    try {
        const res: AxiosResponse<AbsenceApplications> = await axios.get(
            `${BASE_URI}/absence/extend`,
            {
                withCredentials: false,
                params: { ...params },
            },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const fetchDetails = async (id: number) => {
    try {
        const res: AxiosResponse<AbsenceApplication> = await axios.get(
            `${BASE_URI}/absence/details`,
            {
                withCredentials: false,
                params: { absence_id: id },
            },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const approveAbsence = async (id: number | undefined): Promise<boolean> => {
    if (id == undefined) return false;
    try {
        const res: AxiosResponse<boolean> = await axios.post(
            `${BASE_URI}/absence/approve?absence_id=${id}`,
            {
                withCredentials: false,
            },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const rejectAbsence = async (id: number | undefined, message: string): Promise<boolean> => {
    if (id == undefined) return false;
    try {
        const res: AxiosResponse<boolean> = await axios.delete(
            `${BASE_URI}/absence/reject?absence_id=${id}`,
            {
                withCredentials: false,
                data: { reason: message },
            },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAttachments = async (id: number): Promise<Attachment[]> => {
    try {
        const res: AxiosResponse<Attachment[]> = await axios.get(
            `${BASE_URI}/absence/attachments`,
            {
                withCredentials: false,
                params: { absence_id: id },
            },
        );
        return res.data;
    } catch (error) {
        return [];
    }
};

export const fetchStudentDetails = async (id: number | undefined): Promise<UserDetails> => {
    try {
        const res: AxiosResponse<UserDetails> = await axios.get(`${BASE_URI}/absence/student`, {
            withCredentials: false,
            params: { student_id: id },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const fetchStatuses = async (): Promise<AbsenceStatus[]> => {
    try {
        const res: AxiosResponse<AbsenceStatus[]> = await axios.get(
            `${BASE_URI}/absence/statuses`,
            {
                withCredentials: false,
            },
        );
        return res.data;
    } catch (error) {
        return [
            { label: 'На рассмотрении', value: 'pending' },
            { label: 'Одобрена', value: 'approved' },
            { label: 'Отклонена', value: 'rejected' },
            { label: 'Отозвана', value: 'recalled' },
        ];
    }
};

export const fetchTypes = async (): Promise<AbsenceType[]> => {
    try {
        const res: AxiosResponse<AbsenceStatus[]> = await axios.get(`${BASE_URI}/absence/types`, {
            withCredentials: false,
        });
        return res.data;
    } catch (error) {
        return [
            { label: 'По болезни', value: 'sick' },
            { label: 'Прием у врача', value: 'medical' },
            { label: 'Командировка', value: 'business_trip' },
            { label: 'Учебная', value: 'study' },
            { label: 'Другая', value: 'another' },
        ];
    }
};
