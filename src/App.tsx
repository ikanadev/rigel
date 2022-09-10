import type { Component } from 'solid-js';

import { HopeProvider } from '@hope-ui/solid';
import { Router, useRoutes } from '@solidjs/router';

import routes from './routes';
import theme from './theme';

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
