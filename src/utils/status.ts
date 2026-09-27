import type { AbsenceStatus } from '@/models/absence';

export const getStatusLabel = (statuses: AbsenceStatus[], value: string): string =>
    statuses.find((s) => s.value === value)?.label ?? value;
