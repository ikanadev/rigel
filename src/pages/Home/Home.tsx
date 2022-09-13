import type { Component } from 'solid-js';

import { Show, onMount } from 'solid-js';
import { Container } from '@hope-ui/solid';
import { Header } from '@app/components';

import { useNavigate, Outlet } from '@solidjs/router';
import { syncClasses } from '@app/db/class';
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
    void syncClasses();
    void syncStaticData();
  });

  return (
    <Show when={jwt !== null}>
      <Header />
      <Container p="$4">
        <Outlet />
      </Container>
    </Show>
  );
};

export default Home;
