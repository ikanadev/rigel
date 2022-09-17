import type { Component } from 'solid-js';

import { For, createEffect } from 'solid-js';
import { SimpleGrid, Button } from '@hope-ui/solid';
import { Link, useNavigate } from '@solidjs/router';
import { Title } from '@app/components';
import { Plus } from '@app/icons';
import ClassItem from './ClassItem';

import { useAppData } from '@app/context';
import { createDexieArrayQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

const Classes: Component = () => {
  const navigate = useNavigate();
  const { appState } = useAppData();
  const classes = createDexieArrayQuery(() => db.classes.toArray());

  createEffect(() => {
    if (appState.selectedClass !== null) {
      navigate(`/class/${appState.selectedClass.id}/attendance`);
    }
  });

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
