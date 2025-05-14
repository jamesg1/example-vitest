import * as ReactRouterDOM from 'react-router-dom';

export const mockNavigate = vi.fn();
export const mockedCreateBrowserRouter = vi.fn(routes => ({
  routes,
  subscribe: vi.fn(),
}));

// Create a mockable location state
export const mockLocationValue = {
  pathname: '/',
  search: '',
  hash: '',
  state: null,
  key: 'default',
};

export const mockUseLocation = vi.fn(() => mockLocationValue);
export const mockUseParams = vi.fn(() => ({}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouterDOM>('react-router-dom');
  return {
    ...actual,
    createBrowserRouter: mockedCreateBrowserRouter,
    RouterProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Navigate: () => <div>Mock Navigate</div>,
    Outlet: () => <div>Mock Outlet</div>,
    useNavigate: () => mockNavigate,
    useLocation: () => mockUseLocation(),
    useParams: () => mockUseParams(),
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});
