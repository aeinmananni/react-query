import { RouteObject, createBrowserRouter } from 'react-router';
import { Home, User, UsersList } from '../pages';
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <UsersList />,
      },
      {
        path: 'user',
        element: <User />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
