import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import 'dayjs/locale/ru';

import { Notifications } from '@mantine/notifications';
import { DatesProvider } from '@mantine/dates';
import { AuthProvider } from '@/app/AuthContext';
import App from './app/App.tsx';

import '@/styles/index.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider>
            <AuthProvider>
                <DatesProvider settings={{ locale: 'ru' }}>
                    <App />
                </DatesProvider>
            </AuthProvider>
            <Notifications limit={3} autoClose={2000} />
        </MantineProvider>
    </StrictMode>,
);
