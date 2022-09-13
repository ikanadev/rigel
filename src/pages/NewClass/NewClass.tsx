import type { Component } from 'solid-js';

import { Heading, Anchor } from '@hope-ui/solid';
import { Link } from '@solidjs/router';

const NewClass: Component = () => {
  return (
    <>
      <Heading color="$primary10">Create new Class</Heading>
      <Anchor as={Link} href="/">Volver</Anchor>
    </>
  );
};

export default NewClass;
