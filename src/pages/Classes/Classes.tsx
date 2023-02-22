import type { Component } from 'solid-js';

import { For, Show, createEffect } from 'solid-js';
import { SimpleGrid, Button, Text, Anchor } from '@hope-ui/solid';
import { Link, useNavigate } from '@solidjs/router';
import { Title, Alert } from '@app/components';
import { Plus } from '@app/icons';
import ClassItem from './ClassItem';

import { MAX_CLASSES_STANDARD, MAX_CLASSES_PREMIUM, APP_NAME, TELEGRAM_LINK } from '@app/utils/constants';
import { isPremium } from '@app/hooks';
import { useAppData } from '@app/context';
import { createDexieArrayQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

const Classes: Component = () => {
  const premium = isPremium();
  const navigate = useNavigate();
  const { classStore } = useAppData();
  const classes = createDexieArrayQuery(() => db.classes.toArray());

  let maxClasses = MAX_CLASSES_STANDARD;
  if (premium) {
    maxClasses = MAX_CLASSES_PREMIUM;
  }

  createEffect(() => {
    if (classStore.class !== null) {
      navigate(`/class/${classStore.class.id}/attendance`);
    }
  });

  return (
    <>
      <Title text="Mis materias" />
      <Show when={classes.length === 0}>
        <Text color="$neutral11" fontStyle="italic" textAlign="center" my="$6">
          No existen materias registradas, crea una con el botón de abajo.
        </Text>
      </Show>
      <SimpleGrid mt="$4" columns={{ '@initial': 1, '@md': 2, '@xl': 3 }} rowGap="$6" columnGap="$6">
        <For each={classes}>
          {(cl) => (
            <ClassItem item={cl} />
          )}
        </For>
      </SimpleGrid>

      <Show when={classes.length < maxClasses}>
        <Button
          as={Link}
          href="/class/new"
          mt="$6"
          colorScheme="success"
          leftIcon={<Plus />}
          fullWidth={{ '@initial': true, '@md': false }}
        >
          Nueva materia
        </Button>
      </Show>
      <Show when={classes.length >= maxClasses && !premium}>
        <Text mt="$4" />
        <Alert status="info" text="Limite gratuito alcanzado." />
        <Text mt="$1" color="$neutral10">
          Con {APP_NAME} premium puedes crear hasta {MAX_CLASSES_PREMIUM} materias, encuentra las instrucciones en el {' '}
          <Anchor
            href={TELEGRAM_LINK}
            textDecoration="underline"
            fontWeight={500}
            color="$primary10"
            target="_blank"
            rel="noreferrer"
          >
            canal de Telegram.
          </Anchor>
        </Text>
      </Show>
      <Show when={classes.length >= maxClasses && premium}>
        <Text mt="$4" />
        <Alert status="info" text="Limite de creación de materias alcanzado." />
        <Text mt="$1" color="$neutral10">
          {APP_NAME} sólo permite hasta un máximo de {MAX_CLASSES_PREMIUM} materias en la versión premium.
        </Text>
      </Show>
    </>
  );
};

export default Classes;
