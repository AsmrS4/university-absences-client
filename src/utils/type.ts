import type { AbsenceType } from '@/models/absence';

export const getTypeLabel = (types: AbsenceType[], value: string): string =>
    types.find((s) => s.value === value)?.label ?? value;
