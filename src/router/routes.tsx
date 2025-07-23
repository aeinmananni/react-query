import { RouteObject, createBrowserRouter } from 'react-router';
import { Users, Home, User } from '../pages';
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Users />,
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
