import type { RouteDefinition } from '@solidjs/router';

import Home from '@app/pages/Home';
import SignIn from '@app/pages/SignIn';
import SignUp from '@app/pages/SignUp';
import Classes from '@app/pages/Classes';
import NewClass from '@app/pages/NewClass';
import Class from '@app/pages/Class';

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '/', component: Classes },
      { path: '/class/new', component: NewClass },
      { path: '/class/:classid', component: Class },
    ],
  },
  {
    path: '/signin',
    component: SignIn,
  },
  {
    path: '/signup',
    component: SignUp,
  },
];

export default routes;
