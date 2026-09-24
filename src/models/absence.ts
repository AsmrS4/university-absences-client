interface AbsenceType {
    id: number;
    student_id: number;
    application_type: string;
    application_status: string;
    date_from: string;
    date_to: string;
    create_time: string;
}

interface AbsenceApplication extends AbsenceType {
    comment: string;
    related_to: string;
    rejection_reason: string;
}

interface AbsenceAttachment {
    id: number;
    application_id: number;
    file_id: string;
    file_name: string;
    mime_type: string;
    file_type: string;
    storage_url: string;
    uploaded_at: string;
}

interface AbsenceApplications {
    data: AbsenceType[];
    total: number;
    page: number;
    size: number;
}
