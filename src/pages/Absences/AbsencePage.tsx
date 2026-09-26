import { Badge, Box, Button, DataList } from '@mantine/core';

export const AbsencePage = () => {
    const formatPeriod = (from: string, to: string) => {
        return from === to ? from : `${from} — ${to}`;
    };

    return (
        <div className='max-w-180 w-full h-full flex flex-col gap-5'>
            <div className='flex flex-row items-center justify-between'>
                <h1 className='text-2xl font-semibold'>Детали пропуска</h1>
                <Box className='flex flex-row items-center justify-between gap-3'>
                    <Button variant='light' color='blue' size='xs' radius='sm'>
                        Одобрить
                    </Button>
                    <Button variant='light' color='red' size='xs' radius='sm'>
                        Отклонить
                    </Button>
                </Box>
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
                            <Badge variant='light' color='blue' size='lg' radius='md'>
                                На рассмотрении
                            </Badge>
                        </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>ФИО</DataList.ItemLabel>
                        <DataList.ItemValue>Иванов Иван Иванович</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Тип заявки</DataList.ItemLabel>
                        <DataList.ItemValue>Медицинская</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Даты отсутствия</DataList.ItemLabel>
                        <DataList.ItemValue>
                            <span>{formatPeriod('2026-09-26', '2026-09-29')}</span>
                        </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Группа</DataList.ItemLabel>
                        <DataList.ItemValue>972303</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Гражданство</DataList.ItemLabel>
                        <DataList.ItemValue>РФ</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Дата обращения</DataList.ItemLabel>
                        <DataList.ItemValue>2026-09-26</DataList.ItemValue>
                    </DataList.Item>
                </DataList>
            </Box>
            <Box className='w-full rounded-xl bg-white p-4 flex flex-col'>
                <span className='text-lg font-semibold text-[#3d3d3d] mb-2'>Комментарий</span>
                <p className='text-md font-light text-[#5d5d5e] italic'>
                    Я заболел, Я заболел, Я заболел, Я заболел, Я заболел, Я заболел, Я заболел, Я
                    заболел, Я заболел, Я заболел, Я заболел, Я заболел,Я заболел, Я заболел, Я
                    заболел, Я заболел, Я заболел, Я заболел, Я заболел, Я заболел, Я заболел, Я...
                </p>
            </Box>
            <Box className='w-full rounded-xl bg-white p-4 flex flex-col'>
                <span className='text-lg font-semibold text-[#3d3d3d] mb-2'>
                    Приложенные документы
                </span>
            </Box>
        </div>
    );
};
