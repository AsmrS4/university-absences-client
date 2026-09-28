import { Paper } from '@mantine/core';
import { ProhibitIcon } from '@phosphor-icons/react';

export const PermissionDeniedPage = () => {
    return (
        <Paper withBorder shadow='xs' p='xl' className='box-border p-2 max-w-lg w-full min-h-48'>
            <div className='flex flex-col justify-between h-full w-full'>
                <div className='flex flex-col items-center justify-between gap-1'>
                    <ProhibitIcon size={48} />
                    <h1 className='font-semibold text-3xl'>Доступ запрещен</h1>
                    <p className='font-light text-lg text-center'>
                        У вас нет прав на использование этого сервиса. Если вы считаете, что
                        произошла какая-то ошибка, то свяжитесь с разработчиками сервиса.
                    </p>
                </div>
            </div>
        </Paper>
    );
};
