import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import MainLayout from 'src/layouts/MainLayout';

export const TasksPage = lazy(() => import('src/pages/tasks'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <MainLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </MainLayout>
      ),
      children: [
        { element: <TasksPage />, index: true },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
