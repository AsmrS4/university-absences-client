import type { AbsenceType } from '@/models/absence';
import { Table, ScrollArea } from '@mantine/core';

interface Props {
    applications: AbsenceType[];
}

export const ApplicationsTable = ({ applications }: Props) => {
    const formatPeriod = (from: string, to: string) => {
        return from === to ? from : `${from} — ${to}`;
    };

    const rows = applications.map((app) => (
        <Table.Tr key={app.id}>
            <Table.Td>{app.student_name}</Table.Td>
            <Table.Td>{app.application_type}</Table.Td>
            <Table.Td>{formatPeriod(app.date_from, app.date_to)}</Table.Td>
            <Table.Td>{app.create_time}</Table.Td>
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
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
};
