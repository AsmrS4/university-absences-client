import { CommentModal } from '@/components/Modal';
import { useAbsenceAttachment } from '@/hooks/useAbsenceAttachment';
import { useAbsenceDetails } from '@/hooks/useAbsenceDetails';
import { useUserDetails } from '@/hooks/useUserDetails';
import type { Attachment } from '@/models/file';
import { formatDate } from '@/utils/date';
import {
    Anchor,
    Badge,
    Box,
    Button,
    DataList,
    EmptyState,
    Group,
    List,
    Skeleton,
    Text,
    useModalsStack,
} from '@mantine/core';
import { CloudXIcon, FileIcon } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const AbsencePage = () => {
    const { id } = useParams();
    const stack = useModalsStack(['reject-action', 'confirm-action']);

    const { absence, loading, errorMessage, handleApproveAbsence, handleRejectAbsence } =
        useAbsenceDetails(id);
    const { attachments, loading: attachmentsLoading } = useAbsenceAttachment(id);
    const { userDetails, state } = useUserDetails(absence?.student_id);
    const formatPeriod = (from: string, to: string) => {
        return from === to ? from : `${from} — ${to}`;
    };
    const btnAreVisible = absence?.application_status == 'pending';

    if (id == undefined || absence == null) {
        return (
            loading == false && (
                <EmptyState
                    icon={<CloudXIcon size={32} />}
                    title='Ресурс не найден'
                    description='Не удалось получить данные по запрашиваемому ресурсу. Данные удалены или перемещены в другое место.'
                    color='red'
                />
            )
        );
    }

    return (
        <div className='max-w-180 w-full h-full flex flex-col gap-5'>
            <div className='flex flex-row items-center justify-between'>
                <h1 className='text-2xl font-semibold'>Детали пропуска</h1>
                {btnAreVisible && (
                    <Box className='flex flex-row items-center justify-between gap-3'>
                        <Button
                            variant='light'
                            color='blue'
                            size='xs'
                            radius='sm'
                            onClick={() => {
                                handleApproveAbsence();
                            }}
                        >
                            Одобрить
                        </Button>
                        <Button
                            variant='light'
                            color='red'
                            size='xs'
                            radius='sm'
                            onClick={() => stack.open('reject-action')}
                        >
                            Отклонить
                        </Button>
                    </Box>
                )}
            </div>
            <Box className='w-full rounded-xl bg-white p-6'>
                <Skeleton visible={loading}>
                    <DataList
                        size='md'
                        withDivider
                        orientation='horizontal'
                        styles={{
                            itemLabel: {
                                marginRight: 100,
                            },
                        }}
                    >
                        <DataList.Item>
                            <DataList.ItemLabel>Статус заявки</DataList.ItemLabel>
                            <DataList.ItemValue>
                                <Badge variant='light' color='blue' size='lg' radius='md'>
                                    {absence.application_status}
                                </Badge>
                            </DataList.ItemValue>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.ItemLabel>ФИО</DataList.ItemLabel>
                            <DataList.ItemValue>{absence.student_name}</DataList.ItemValue>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.ItemLabel>Гражданство</DataList.ItemLabel>
                            <DataList.ItemValue>{userDetails?.nationality_type}</DataList.ItemValue>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.ItemLabel>Группа</DataList.ItemLabel>
                            <DataList.ItemValue>{userDetails?.group_code}</DataList.ItemValue>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.ItemLabel>Факультет</DataList.ItemLabel>
                            <DataList.ItemValue>{userDetails?.faculty_name}</DataList.ItemValue>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.ItemLabel>Тип заявки</DataList.ItemLabel>
                            <DataList.ItemValue>{absence.application_type}</DataList.ItemValue>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.ItemLabel>Даты отсутствия</DataList.ItemLabel>
                            <DataList.ItemValue>
                                <span>{formatPeriod(absence.date_from, absence.date_to)}</span>
                            </DataList.ItemValue>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.ItemLabel>Дата обращения</DataList.ItemLabel>
                            <DataList.ItemValue>{absence.create_time}</DataList.ItemValue>
                        </DataList.Item>
                    </DataList>
                </Skeleton>
            </Box>
            <Box className='w-full rounded-xl bg-white p-4 flex flex-col'>
                <Skeleton visible={loading}>
                    <span className='text-lg font-semibold text-[#3d3d3d] mb-2'>Комментарий</span>
                    <p className='text-md font-light text-[#5d5d5e] italic'>{absence.comment}</p>
                </Skeleton>
            </Box>
            {!attachmentsLoading && attachments.length > 0 && (
                <Box className='w-full rounded-xl bg-white p-4 flex flex-col'>
                    <span className='text-lg font-semibold text-[#3d3d3d] mb-2'>
                        Приложенные документы
                    </span>
                    {renderAttachments(attachments)}
                </Box>
            )}
            <CommentModal stack={stack} callback={handleRejectAbsence} />
        </div>
    );
};

const renderAttachments = (attachments: Attachment[]) => {
    return (
        <List>
            {attachments.map((att, idx) => (
                <List.Item key={att.id}>
                    <Group gap='md'>
                        <FileIcon size={16} />
                        <Text size='sm'>{att.file_name + '_' + idx + 1}</Text>
                        <Text size='xs' c='dimmed'>
                            ({att.file_type})
                        </Text>
                        {att.file_url && (
                            <Badge
                                variant='light'
                                color='blue'
                                className='inline-flex items-center gap-1 px-2 py-1'
                            >
                                <Anchor
                                    href={att.file_url}
                                    target='_blank'
                                    size='sm'
                                    className='flex items-center gap-1 text-xs'
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <span className='text-xs !important'>Скачать</span>
                                </Anchor>
                            </Badge>
                        )}
                        <Text size='xs' c='dimmed'>
                            Загружено: {formatDate(att.uploaded_at)}
                        </Text>
                    </Group>
                </List.Item>
            ))}
        </List>
    );
};
