export interface UploadFileOptions {
    orderId: number;
    pluginId: string;
    file: File;
    fileType?: string;
}

export interface UploadedFile {
    id: string;
    name: string;
    mimeType: string;
    size: number;
    fileType: string;
}

export interface Attachment {
    id: number;
    application_id: number;
    file_id: string;
    file_name: string;
    mime_type: string;
    file_type: string;
    storage_url?: string;
    uploaded_at: string;
}
