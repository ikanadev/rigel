import type { Component } from 'solid-js';

import { For } from 'solid-js';
import { Anchor, SimpleGrid } from '@hope-ui/solid';
import { Link } from '@solidjs/router';
import { Title } from '@app/components';
import ClassItem from './ClassItem';

import { createDexieArrayQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

const Classes: Component = () => {
  const classes = createDexieArrayQuery(() => db.classes.toArray());
  return (
    <>
      <Title text="Mis cursos" />
      <SimpleGrid columns={{ '@initial': 1, '@md': 2, '@xl': 3 }} rowGap="$6" columnGap="$6">
        <For each={classes}>
          {(cl) => (
            <ClassItem item={cl} />
          )}
        </For>
      </SimpleGrid>
      <Anchor as={Link} href="/class/new">
        Nueva clase
      </Anchor>
    </>
  );
};

export default Classes;
