import type { Component } from 'solid-js';

import { HopeProvider } from '@hope-ui/solid';
import { Router, useRoutes } from '@solidjs/router';
import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';

import routes from './routes';
import theme from './theme';
import { db } from '@app/db/dexie';

// @ts-expect-error
window.db = db;

dayjs.locale('es-mx');

const App: Component = () => {
  const Routes = useRoutes(routes);
  return (
    <HopeProvider config={theme}>
      <Router>
        <Routes />
      </Router>
    </HopeProvider>
  );
};

export default App;
