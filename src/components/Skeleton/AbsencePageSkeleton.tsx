import { Box, DataList, Skeleton, Stack } from '@mantine/core';

export const AbsencePageSkeleton = () => (
    <div className='max-w-180 w-full h-full flex flex-col gap-5'>
        <div className='flex flex-row items-center justify-between'>
            <Skeleton height={32} width={200} radius='md' />
            <Box className='flex flex-row gap-3'>
                <Skeleton height={28} width={80} radius='sm' />
                <Skeleton height={28} width={80} radius='sm' />
            </Box>
        </div>
        <Box className='w-full rounded-xl bg-white p-6'>
            <Stack gap='lg'>
                <Skeleton height={24} width='40%' radius='sm' />
                <Skeleton height={24} width='60%' radius='sm' />
                <Skeleton height={24} width='50%' radius='sm' />
                <Skeleton height={24} width='70%' radius='sm' />
                <Skeleton height={24} width='45%' radius='sm' />
                <Skeleton height={24} width='55%' radius='sm' />
            </Stack>
        </Box>
        <Box className='w-full rounded-xl bg-white p-4 flex flex-col gap-3'>
            <Skeleton height={24} width='20%' radius='sm' />
            <Skeleton height={16} width='90%' radius='sm' />
            <Skeleton height={16} width='70%' radius='sm' />
        </Box>
        <Box className='w-full rounded-xl bg-white p-4 flex flex-col gap-3'>
            <Skeleton height={24} width='30%' radius='sm' />
            <Skeleton height={20} width='80%' radius='sm' />
            <Skeleton height={20} width='65%' radius='sm' />
        </Box>
    </div>
);

export const UserDetailsSkeleton = () => (
    <>
        <DataList.Item>
            <DataList.ItemLabel>Гражданство</DataList.ItemLabel>
            <DataList.ItemValue>
                <Skeleton height={20} width={120} radius='sm' />
            </DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
            <DataList.ItemLabel>Группа</DataList.ItemLabel>
            <DataList.ItemValue>
                <Skeleton height={20} width={100} radius='sm' />
            </DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
            <DataList.ItemLabel>Факультет</DataList.ItemLabel>
            <DataList.ItemValue>
                <Skeleton height={20} width={220} radius='sm' />
            </DataList.ItemValue>
        </DataList.Item>
    </>
);

export const AttachmentsSkeleton = () => (
    <Box className='w-full rounded-xl bg-white p-4 flex flex-col gap-3'>
        <Skeleton height={24} width='30%' radius='sm' />
        <Skeleton height={20} width='80%' radius='sm' />
        <Skeleton height={20} width='70%' radius='sm' />
    </Box>
);
