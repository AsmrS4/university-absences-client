export interface AbsenceType {
    id: number;
    student_id: number;
    student_name: string;
    application_type: string;
    application_status: string;
    date_from: string;
    date_to: string;
    create_time: string;
}

export interface AbsenceApplication extends AbsenceType {
    comment: string;
    related_to: string;
    rejection_reason: string;
}

export interface AbsenceAttachment {
    id: number;
    application_id: number;
    file_id: string;
    file_name: string;
    mime_type: string;
    file_type: string;
    storage_url: string;
    uploaded_at: string;
}

export interface AbsenceApplications {
    data: AbsenceType[];
    total: number;
    page: number;
    size: number;
}
