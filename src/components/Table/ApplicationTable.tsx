import type { AbsenceBase } from '@/models/absence';
import { formatDisplayDate, formatDisplayPeriod } from '@/utils/date';
import { Table, ScrollArea, Text, Center, Stack, Skeleton } from '@mantine/core';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

interface Props {
    applications: AbsenceBase[];
    loading?: boolean;
    skeletonRows?: number;
    handleSelect: (id: number) => void;
}

export const ApplicationsTable = ({
    applications,
    loading = false,
    skeletonRows = 5,
    handleSelect,
}: Props) => {
    const handleRowClick = (event: React.MouseEvent<HTMLTableSectionElement>) => {
        const target = (event.target as HTMLElement).closest('tr[data-id]');
        if (!target) return;
        const id = Number(target.getAttribute('data-id'));
        if (!Number.isNaN(id)) {
            handleSelect(id);
        }
    };

    const tableStyles = {
        th: {
            color: '#575859',
            background: '#fff',
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'uppercase',
            padding: '12px 16px',
            borderBottom: '1px solid var(--mantine-color-gray-3)',
        },
        td: {
            cursor: 'pointer',
            padding: '12px 16px',
            background: '#fff',
        },
        table: {
            borderCollapse: 'separate',
            borderSpacing: 0,
            borderRadius: 10,
            overflow: 'hidden',
            border: '1px solid var(--mantine-color-gray-3)',
        },
    } as const;

    const header = (
        <Table.Thead>
            <Table.Tr>
                <Table.Th>ФИО</Table.Th>
                <Table.Th>Тип</Table.Th>
                <Table.Th>Период</Table.Th>
                <Table.Th>Создано</Table.Th>
            </Table.Tr>
        </Table.Thead>
    );

    if (loading) {
        const skeletonRowsArray = Array.from({ length: skeletonRows });

        return (
            <ScrollArea>
                <Table highlightOnHover styles={tableStyles}>
                    {header}
                    <Table.Tbody>
                        {skeletonRowsArray.map((_, idx) => (
                            <Table.Tr key={idx}>
                                <Table.Td>
                                    <Skeleton height={20} width='70%' radius='sm' />
                                </Table.Td>
                                <Table.Td>
                                    <Skeleton height={20} width='60%' radius='sm' />
                                </Table.Td>
                                <Table.Td>
                                    <Skeleton height={20} width='80%' radius='sm' />
                                </Table.Td>
                                <Table.Td>
                                    <Skeleton height={20} width='50%' radius='sm' />
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        );
    }

    if (applications.length === 0) {
        return (
            <Center py='xl'>
                <Stack align='center' gap='xs'>
                    <MagnifyingGlassIcon size={48} color='var(--mantine-color-gray-5)' />
                    <Text size='md' c='dimmed'>
                        Заявки не найдены
                    </Text>
                </Stack>
            </Center>
        );
    }

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
            <Table highlightOnHover styles={tableStyles}>
                {header}
                <Table.Tbody onClick={handleRowClick}>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
};
