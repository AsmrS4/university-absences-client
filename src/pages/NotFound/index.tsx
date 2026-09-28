import { Button, Paper } from '@mantine/core';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <Paper withBorder shadow='xs' p='xl' className='box-border p-2 max-w-lg w-full min-h-48'>
            <div className='flex flex-col justify-between h-full w-full'>
                <div className='flex flex-col items-center justify-between gap-1'>
                    <MagnifyingGlassIcon size={48} />
                    <h1 className='font-semibold text-3xl'>Страница не найдена</h1>
                    <p className='font-light text-lg text-center'>
                        Ресурс был удален или перемещен в другое место.
                    </p>
                </div>
                <Button
                    justify='center'
                    fullWidth
                    size='lg'
                    color='#0061e3'
                    variant='filled'
                    mt='lg'
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Назад
                </Button>
            </div>
        </Paper>
    );
};
