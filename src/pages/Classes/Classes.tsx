import type { Component } from 'solid-js';

import { Heading, Anchor } from '@hope-ui/solid';
import { Link } from '@solidjs/router';

const Classes: Component = () => {
  return (
    <>
      <Heading color="$primary10">My Classes</Heading>
      <Anchor as={Link} href="/class/new">Volver</Anchor>
    </>
  );
};

export default Classes;
