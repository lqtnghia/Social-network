import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from "./configs/muiConfig.js";


const HomePage = lazy(() => import('@pages/HomePage.jsx'));
const RootLayout = lazy(() => import('@pages/RootLayout.jsx'));
const RegisterPage = lazy(() => import('@pages/RegisterPage'))
const ModalProvider = lazy(() => import('@context/ModalProvider'));

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/register',
          element: <RegisterPage />
        }
      ],
    },
  ],
);

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <ModalProvider>
    <RouterProvider router={router}></RouterProvider>
  </ModalProvider>
  </ThemeProvider>
);
