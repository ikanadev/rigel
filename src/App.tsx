import type { Component } from 'solid-js';

import { HopeProvider, Container, Button } from '@hope-ui/solid';

const App: Component = () => {
  return (
    <HopeProvider>
      <Container>
        <Button>Hello world!</Button>
      </Container>
    </HopeProvider>
  );
};

export default App;
