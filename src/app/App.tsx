import { router } from '@/router/router';
import { RouterProvider } from 'react-router-dom';

export const App = () => {
    return (
        <main className='h-dvh w-full box-border flex flex-col items-center justify-center'>
            <RouterProvider router={router} />
        </main>
    );
};

export default App;
