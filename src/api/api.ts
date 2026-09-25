import type { AbsenceApplicationsFilterParams, AbsenceType } from '@/models/absence';
import axios from 'axios';
import { data } from 'react-router-dom';

const BASE_URI = '/api/triggers/http/absences_plugin/api/absences';

const MOCK_ABSENCES: AbsenceType[] = [
    {
        id: 1,
        student_id: 101,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Болезнь',
        application_status: 'Одобрено',
        date_from: '2024-03-10',
        date_to: '2024-03-15',
        create_time: '2024-03-09T14:30:00',
    },
    {
        id: 2,
        student_id: 102,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Семейные обстоятельства',
        application_status: 'На рассмотрении',
        date_from: '2024-03-20',
        date_to: '2024-03-22',
        create_time: '2024-03-18T09:15:00',
    },
    {
        id: 3,
        student_id: 101,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Учебная сессия',
        application_status: 'Отклонено',
        date_from: '2024-04-01',
        date_to: '2024-04-10',
        create_time: '2024-03-25T11:00:00',
    },
    {
        id: 4,
        student_id: 103,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Болезнь',
        application_status: 'Одобрено',
        date_from: '2024-03-05',
        date_to: '2024-03-07',
        create_time: '2024-03-04T18:45:00',
    },
    {
        id: 5,
        student_id: 104,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Спортивные сборы',
        application_status: 'На рассмотрении',
        date_from: '2024-04-15',
        date_to: '2024-04-20',
        create_time: '2024-04-10T08:20:00',
    },
    {
        id: 6,
        student_id: 105,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Производственная практика',
        application_status: 'Одобрено',
        date_from: '2024-05-01',
        date_to: '2024-05-30',
        create_time: '2024-04-20T10:00:00',
    },
    {
        id: 7,
        student_id: 105,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Производственная практика',
        application_status: 'Одобрено',
        date_from: '2024-05-01',
        date_to: '2024-05-30',
        create_time: '2024-04-20T10:00:00',
    },
    {
        id: 8,
        student_id: 105,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Производственная практика',
        application_status: 'Одобрено',
        date_from: '2024-05-01',
        date_to: '2024-05-30',
        create_time: '2024-04-20T10:00:00',
    },
    {
        id: 9,
        student_id: 105,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Производственная практика',
        application_status: 'Одобрено',
        date_from: '2024-05-01',
        date_to: '2024-05-30',
        create_time: '2024-04-20T10:00:00',
    },
    {
        id: 10,
        student_id: 105,
        student_name: 'Иванов Иван Иванович',
        application_type: 'Производственная практика',
        application_status: 'Одобрено',
        date_from: '2024-05-01',
        date_to: '2024-05-30',
        create_time: '2024-04-20T10:00:00',
    },
];

const MOCK_RES = {
    data: MOCK_ABSENCES,
    page: 1,
    size: 10,
    total: MOCK_ABSENCES.length,
};

const MOCK_ABSENCE = {
    id: 1,
    student_id: 101,
    student_name: 'Иванов Иван Иванович',
    application_type: 'Болезнь',
    application_status: 'Одобрено',
    date_from: '2024-03-10',
    date_to: '2024-03-15',
    create_time: '2024-03-09T14:30:00',
    comment: 'Добрый день, я пропустил занятия из-за простуды. Справку прилагаю',
    related_to: '',
    rejection_reason: '',
};

export const fetchAbsences = async (params: AbsenceApplicationsFilterParams) => {
    return MOCK_RES;
};

export const fetchDetails = async (id: number) => {
    return MOCK_ABSENCE;
};
