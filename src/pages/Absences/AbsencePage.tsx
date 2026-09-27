import {
    Anchor,
    Badge,
    Box,
    Button,
    DataList,
    EmptyState,
    Group,
    List,
    Text,
    useModalsStack,
} from '@mantine/core';
import { CloudXIcon, FileIcon } from '@phosphor-icons/react';
import { useParams } from 'react-router-dom';

import { CommentModal } from '@/components/Modal';
import { useAbsenceAttachment } from '@/hooks/useAbsenceAttachment';
import { useAbsenceDetails } from '@/hooks/useAbsenceDetails';
import { useUserDetails } from '@/hooks/useUserDetails';
import type { Attachment } from '@/models/file';
import { formatDate, formatDisplayDate, formatDisplayPeriod } from '@/utils/date';
import { useAbsenceApplications } from '@/hooks/useAbsenceApplications';
import {
    AbsencePageSkeleton,
    AttachmentsSkeleton,
    UserDetailsSkeleton,
} from '@/components/Skeleton/AbsencePageSkeleton';
import { useStatuses } from '@/hooks/useStatuses';
import { getStatusLabel } from '@/utils/status';
import { getTypeLabel } from '@/utils/type';
import { useAbsenceTypes } from '@/hooks/useAbsenceTypes';

const getStatusColor = (status: string): string => {
    switch (status) {
        case 'pending':
            return 'gray';
        case 'rejected':
            return 'red';
        case 'approved':
            return 'blue';
        default:
            return 'gray';
    }
};

export const AbsencePage = () => {
    const { id } = useParams();
    const stack = useModalsStack(['reject-action', 'confirm-action']);

    const { absence, loading, handleApproveAbsence, handleRejectAbsence } = useAbsenceDetails(id);
    const { attachments, loading: attachmentsLoading } = useAbsenceAttachment(id);
    const { userDetails, state: userDetailsState } = useUserDetails(absence?.student_id);
    const { handleSelectOrder } = useAbsenceApplications('');
    const { statuses } = useStatuses();
    const { types } = useAbsenceTypes();

    if (loading) {
        return <AbsencePageSkeleton />;
    }

    if (id == undefined || absence == null) {
        return (
            <EmptyState
                icon={<CloudXIcon size={32} />}
                title='Ресурс не найден'
                description='Не удалось получить данные по запрашиваемому ресурсу. Данные удалены или перемещены в другое место.'
                color='red'
            />
        );
    }

    const buttonsVisible = absence.application_status == 'pending';

    return (
        <div className='max-w-180 w-full h-full flex flex-col gap-5'>
            <div className='flex flex-row items-center justify-between'>
                <h1 className='text-3xl font-semibold'>Детали пропуска</h1>
                {buttonsVisible && (
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
                            <Badge
                                variant='light'
                                color={getStatusColor(absence.application_status)}
                                size='lg'
                                radius='md'
                            >
                                {getStatusLabel(statuses, absence.application_status)}
                            </Badge>
                        </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>ФИО</DataList.ItemLabel>
                        <DataList.ItemValue>{absence.student_fullname}</DataList.ItemValue>
                    </DataList.Item>

                    {userDetailsState === 'loading' && <UserDetailsSkeleton />}

                    {userDetailsState === 'success' && (
                        <>
                            <DataList.Item>
                                <DataList.ItemLabel>Гражданство</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    {userDetails?.nationality_type == 'domestic' ? 'РФ' : 'Иностр.'}
                                </DataList.ItemValue>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.ItemLabel>Группа</DataList.ItemLabel>
                                <DataList.ItemValue>{userDetails?.group_code}</DataList.ItemValue>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.ItemLabel>Факультет</DataList.ItemLabel>
                                <DataList.ItemValue>{userDetails?.faculty_name}</DataList.ItemValue>
                            </DataList.Item>
                        </>
                    )}

                    <DataList.Item>
                        <DataList.ItemLabel>Тип заявки</DataList.ItemLabel>
                        <DataList.ItemValue>
                            {getTypeLabel(types, absence.application_type)}
                            {absence.related_to ? ' (Продление)' : ''}
                        </DataList.ItemValue>
                    </DataList.Item>

                    {absence.related_to ? (
                        <DataList.Item>
                            <DataList.ItemLabel>Ссылка на </DataList.ItemLabel>
                            <DataList.ItemValue
                                className='cursor-pointer text-blue-600 underline'
                                onClick={() => {
                                    handleSelectOrder(absence.related_to);
                                }}
                            >
                                {'Продлеваемый пропуск'}
                            </DataList.ItemValue>
                        </DataList.Item>
                    ) : null}
                    <DataList.Item>
                        <DataList.ItemLabel>Даты отсутствия</DataList.ItemLabel>
                        <DataList.ItemValue>
                            <span>{formatDisplayPeriod(absence.date_from, absence.date_to)}</span>
                        </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Дата обращения</DataList.ItemLabel>
                        <DataList.ItemValue>
                            {formatDisplayDate(absence.create_time)}
                        </DataList.ItemValue>
                    </DataList.Item>
                </DataList>
            </Box>
            {absence.comment && (
                <Box className='w-full rounded-xl bg-white p-4 flex flex-col'>
                    <span className='text-lg font-semibold text-[#3d3d3d] mb-2'>Комментарий</span>
                    <p className='text-md font-light text-[#5d5d5e] italic'>{absence.comment}</p>
                </Box>
            )}
            {attachmentsLoading ? (
                <AttachmentsSkeleton />
            ) : attachments.length > 0 ? (
                <Box className='w-full rounded-xl bg-white p-4 flex flex-col'>
                    <span className='text-lg font-semibold text-[#3d3d3d] mb-2'>
                        Приложенные документы
                    </span>
                    {renderAttachments(attachments)}
                </Box>
            ) : null}

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
                            Загружено: {formatDate(att.uploaded_at)}
                        </Text>
                        {att.storage_url && (
                            <Badge
                                variant='light'
                                color='blue'
                                className='inline-flex items-center gap-1 px-2 py-1'
                            >
                                <Anchor
                                    href={att.storage_url}
                                    target='_blank'
                                    size='sm'
                                    className='flex items-center gap-1 text-xs'
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <span className='text-xs !important'>Скачать</span>
                                </Anchor>
                            </Badge>
                        )}
                    </Group>
                </List.Item>
            ))}
        </List>
    );
};
