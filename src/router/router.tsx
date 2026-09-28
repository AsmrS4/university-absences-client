import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import PrivateRouter from '@/app/PrivateRouter';
import { AppLayout } from '@/pages/AppLayout';
import { AbsencePage } from '@/pages/Absences/AbsencePage';
import { LoginPage } from '@/pages/Auth/LoginPage';
import { AuthLoginHandler } from '@/pages/Auth/AuthLoginHandler';
import HomePage from '@/pages/Absences/HomePage';
import HistoryPage from '@/pages/Absences/HistoryPage';
import { NotFoundPage } from '@/pages/NotFound';
import { PermissionDeniedPage } from '@/pages/Permisson';

export const router = createBrowserRouter(
    [
        {
            element: <LoginPage />,
            path: routes.auth.login,
        },
        {
            element: <AuthLoginHandler />,
            path: routes.auth.oauth,
        },
        {
            element: <PrivateRouter />,
            children: [
                {
                    element: <AppLayout />,
                    children: [
                        {
                            element: <HomePage />,
                            path: routes.root,
                        },
                        {
                            element: <HistoryPage />,
                            path: routes.absences.history,
                        },
                        {
                            element: <AbsencePage />,
                            path: routes.absences.details,
                        },
                        {
                            element: <HomePage />,
                            path: routes.absences.home,
                        },
                    ],
                },
            ],
        },
        { element: <NotFoundPage />, path: routes.errors.not_found },
        { element: <PermissionDeniedPage />, path: routes.errors.forbidden },
    ],
    {
        basename: '/plugins/absence-plugin/app',
    },
);
