import type { RouteDefinition } from '@solidjs/router';

import Home from '@app/pages/Home';
import SignIn from '@app/pages/SignIn';
import SignUp from '@app/pages/SignUp';
import Classes from '@app/pages/Classes';
import NewClass from '@app/pages/NewClass';
import Class from '@app/pages/Class';
import Attendance from '@app/pages/Attendance';
import Students from '@app/pages/Students';
import NewStudent from '@app/pages/NewStudent';
import EditStudent from '@app/pages/EditStudent';
import Activities from '@app/pages/Activities';

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '/', component: Classes },
      { path: '/class/new', component: NewClass },
      {
        path: '/class/:classid',
        component: Class,
        children: [
          { path: '/attendance', component: Attendance },
          { path: '/students', component: Students },
          { path: '/students/new', component: NewStudent },
          { path: '/student/:studentid/edit', component: EditStudent },
          { path: '/activities', component: Activities },
        ],
      },
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
