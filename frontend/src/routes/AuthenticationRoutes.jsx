import { lazy } from 'react';

// project imports
import Loadable from '@/layout/Ui-Components/Loadable.jsx';
import MinimalLayout from './../layout/MinimalLayout/index.jsx';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('@/layout/authentication/authentication/Login.jsx')));
const AuthRegister3 = Loadable(lazy(() => import('@/layout/authentication/authentication/Register.jsx')));

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin3 />,
    },
    {
      path: '/register',
      element: <AuthRegister3 />,
    },
  ],
};

export default AuthenticationRoutes;
