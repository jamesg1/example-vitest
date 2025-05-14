import { lazy, Suspense, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, Navigate, Outlet, redirect, RouterProvider } from 'react-router-dom';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 1, // 1 second cache on api calls
      retry: false,
    },
  },
});

const RootLayout = () => (
  <>
    <Outlet />
  </>
);

const router = (queryClient: QueryClient) => {
  return createBrowserRouter(
    [
      {
        path: '/',
        element: <App />,
      },
    ],
    {
      basename: '/hub',
    },
  );
};

const AppRouter = () => {
  const queryClient = useQueryClient();
  const routers = useMemo(() => router(queryClient), [queryClient]);
  return <RouterProvider future={{ v7_startTransition: true }} router={routers} />;
};

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<></>}>
          <AppRouter />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
