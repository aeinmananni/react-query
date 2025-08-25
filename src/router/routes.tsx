import { RouteObject, createBrowserRouter } from 'react-router';
import { Home, User, UsersList, InfiniteUser, Form } from '../pages';
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
        path: '/infinite-user',
        element: <InfiniteUser />,
      },
      {
        path: 'user',
        element: <User />,
      },
      {
        path: 'form',
        element: <Form />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
