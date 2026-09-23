export const routes = {
    auth: {
        login: 'sign-in',
        oauth: 'oauth/login',
    },
    root: '/',
    absences: {
        home: 'absences',
        foreign: 'foreign',
        history: 'history',
        details: 'absences/:id',
    },
    errors: {
        forbidden: 'forbidden',
        internal_server: 'server-error',
        not_found: '*',
    },
};
