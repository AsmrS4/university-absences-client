import type { AbsenceBase } from '@/models/absence';
import { formatDisplayDate, formatDisplayPeriod } from '@/utils/date';
import { Table, ScrollArea } from '@mantine/core';

interface Props {
    applications: AbsenceBase[];
    handleSelect: (id: number) => void;
}

export const ApplicationsTable = ({ applications, handleSelect }: Props) => {
    const handleRowClick = (event: React.MouseEvent<HTMLTableSectionElement>) => {
        const target = (event.target as HTMLElement).closest('tr[data-id]');
        if (!target) return;
        const id = Number(target.getAttribute('data-id'));
        if (!Number.isNaN(id)) {
            handleSelect(id);
        }
    };

    const rows = applications.map((app) => (
        <Table.Tr key={app.id} data-id={app.id}>
            <Table.Td>{app.student_name}</Table.Td>
            <Table.Td>{app.application_type}</Table.Td>
            <Table.Td>{formatDisplayPeriod(app.date_from, app.date_to)}</Table.Td>
            <Table.Td>{formatDisplayDate(app.create_time)}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea>
            <Table
                highlightOnHover
                styles={{
                    th: {
                        color: '#575859',
                        fontSize: 14,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--mantine-color-gray-3)',
                    },
                    td: {
                        cursor: 'pointer',
                        padding: '12px 16px',
                    },
                    table: {
                        borderCollapse: 'separate',
                        borderSpacing: 0,
                        borderRadius: 10,
                        overflow: 'hidden',
                        border: '1px solid var(--mantine-color-gray-3)',
                    },
                }}
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>ФИО</Table.Th>
                        <Table.Th>Тип</Table.Th>
                        <Table.Th>Период</Table.Th>
                        <Table.Th>Создано</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody onClick={handleRowClick}>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
};
