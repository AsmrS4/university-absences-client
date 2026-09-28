export interface ReportFilters {
    date_from: string | null;
    date_to: string | null;
    type: string | null;
    status: string | null;
    group_code: number | null;
}

export interface ReportResponse {
    url: string;
}
