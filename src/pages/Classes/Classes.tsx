import type { Component } from 'solid-js';

import { For } from 'solid-js';
import { SimpleGrid, Button } from '@hope-ui/solid';
import { Link } from '@solidjs/router';
import { Title } from '@app/components';
import { Plus } from '@app/icons';
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

      <Button as={Link} href="/class/new" mt="$6" colorScheme="success" leftIcon={<Plus />}>
        Nuevo curso
      </Button>
    </>
  );
};

export default Classes;
