import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { RootPage } from './pages/RootPage';
import { Options } from './pages/Options';
import { Menu } from './pages/Menu';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: 'btg-game-preview/',
        element: <Menu />,
      },
      {
        path: 'btg-game-preview/options',
        element: <Options />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
