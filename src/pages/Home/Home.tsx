import type { Component } from 'solid-js';

import { Show, onMount } from 'solid-js';
import { Box, Container } from '@hope-ui/solid';
import { useNavigate } from '@solidjs/router';
import { Header } from '@app/components';

import { JWT_KEY } from '@app/utils/constants';

const Home: Component = () => {
  const jwt = localStorage.getItem(JWT_KEY);
  const navigate = useNavigate();

  onMount(() => {
    if (jwt === null) {
      navigate('/signin');
    }
  });

  return (
    <Show when={jwt !== null}>
      <Header />
      <Container p="$4">
        <Box>
          <h1>Welcome to the home page</h1>
        </Box>
      </Container>
    </Show>
  );
};

export default Home;
