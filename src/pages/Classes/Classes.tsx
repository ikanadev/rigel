import type { Component } from 'solid-js';

import { Anchor } from '@hope-ui/solid';
import { Link } from '@solidjs/router';
import { Title } from '@app/components';

const Classes: Component = () => {
  return (
    <>
      <Title text="Mis cursos" />
      <Anchor as={Link} href="/class/new">
        Nueva clase
      </Anchor>
    </>
  );
};

export default Classes;
