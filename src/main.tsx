import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';

import { RootPage } from './pages/root/RootPage';
import { RootMenu } from './pages/root/RootMenu';
import { Options } from './pages/Options';
import { Menu } from './pages/Menu';

import './index.css';

const router = createHashRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '',
        element: <RootMenu />,
        children: [
          {
            path: '',
            element: <Menu />,
          },
          {
            path: 'options',
            element: <Options />,
          }
        ],
      },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

