import type { Component } from 'solid-js';

import { Show, onMount } from 'solid-js';
import { Container } from '@hope-ui/solid';
import { Header } from '@app/components';
import { AppProvider } from '@app/context';

import { useNavigate, Outlet } from '@solidjs/router';
import { syncStaticData } from '@app/db/static';
import { JWT_KEY } from '@app/utils/constants';

const Home: Component = () => {
  const jwt = localStorage.getItem(JWT_KEY);
  const navigate = useNavigate();

  onMount(() => {
    if (jwt === null) {
      navigate('/signin');
      return;
    }
    void syncStaticData();
  });

  return (
    <Show when={jwt !== null}>
      <AppProvider>
        <Header />
        <Container p="$4">
          <Outlet />
        </Container>
      </AppProvider>
    </Show>
  );
};

export default Home;
