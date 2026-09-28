import { useErrorHandler } from '@/hooks/useErrorHandler';
import { AppShell, Box, Burger, Button, Group, NavLink, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CertificateIcon, SignOutIcon, ArchiveIcon, UserCircleIcon } from '@phosphor-icons/react';
import { useNotification } from '@/hooks/useNotification';

import { useEffect, useState } from 'react';
import { routes } from '@/router/routes';
import { logoutUser } from '@/api/auth';
import { errors } from '@/constants/messages';
import { useProfile } from '@/hooks/useProfile';

const navItems = [
    {
        icon: CertificateIcon,
        label: 'Заявки',
        id: routes.absences.home,
        link: routes.absences.home,
        description: 'запросы на одобрение пропуска',
    },
    {
        icon: ArchiveIcon,
        label: 'Архив заявок',
        id: 'history',
        link: routes.absences.history,
        description: 'обработанные заявки',
    },
];

export const AppLayout = () => {
    const [opened, { toggle }] = useDisclosure();
    const [active, setActive] = useState('absences');
    const { errorMessage, handleError, clearError } = useErrorHandler();
    const { handleErrorNotification } = useNotification();
    const { fullName } = useProfile();

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (link: string, id: string) => {
        setActive(id);
        navigate(link);
    };

    const handleLogout = async () => {
        try {
            clearError();
            const res = await logoutUser();
            if (res) navigate(routes.auth.login);
        } catch (error) {
            handleError(error);
        }
    };

    const logoutButton = (fullWidth = false) => (
        <Button
            leftSection={<SignOutIcon size={16} />}
            variant='light'
            color='red'
            size='xs'
            radius='sm'
            onClick={handleLogout}
            fullWidth={fullWidth}
        >
            Выйти
        </Button>
    );

    useEffect(() => {
        const currentPath = location.pathname.split('/').pop() || 'absences';
        setActive(currentPath);
    }, [location]);

    useEffect(() => {
        if (errorMessage) handleErrorNotification(errorMessage || errors.default);
    }, [errorMessage]);

    const items = navItems.map((item, _) => (
        <NavLink
            href={item.link}
            key={item.id}
            active={item.id === active}
            label={item.label}
            description={item.description}
            leftSection={<item.icon size={16} />}
            onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.link, item.id);
            }}
            className='rounded-md'
            color='#0061e3'
        />
    ));

    return (
        <AppShell
            header={{ height: 64, offset: true }}
            navbar={{ width: 256, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            layout='default'
            className='w-full'
        >
            <AppShell.Header>
                <Group h='100%' px='md'>
                    <div className='flex flex-row items-center w-full'>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom='sm'
                            size='sm'
                            lineSize={1}
                        />
                        <div className='mx-2 w-full flex flex-row justify-between items-center'>
                            <h1 className='font-semibold text-lg'>Табель учета пропусков ВИТШ</h1>
                            <Box visibleFrom='sm'>{logoutButton()}</Box>
                        </div>
                    </div>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='xs'>
                <div className='flex flex-col h-full items-center justify-between box-border'>
                    <nav className='flex flex-col gap-2 box-border w-full'>{items}</nav>
                    <Box
                        visibleFrom='sm'
                        className='w-full p-2 flex flex-row items-center gap-2 text-md text-[#575859]'
                    >
                        <UserCircleIcon size={20} />
                        <Text truncate className='flex-1 min-w-0'>
                            {fullName}
                        </Text>
                    </Box>
                    <Box hiddenFrom='sm' className='w-full'>
                        {logoutButton(true)}
                    </Box>
                </div>
            </AppShell.Navbar>
            <AppShell.Main className='overflow-y-auto h-dvh box-border bg-[#f0f3fa]'>
                <main className='w-full h-full p-3 sm:p-6'>
                    <Outlet />
                </main>
            </AppShell.Main>
        </AppShell>
    );
};
