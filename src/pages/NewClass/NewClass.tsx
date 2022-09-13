import type { Component } from 'solid-js';

import { Show } from 'solid-js';
import { Text } from '@hope-ui/solid';
import { OfflineMessage, Title } from '@app/components';

import { isOnline } from '@app/hooks';

const NewClass: Component = () => {
  return (
    <>
      <Title text="Nuevo curso" backTo="/" />
      <Show when={isOnline()} fallback={<OfflineMessage />}>
        <Text>Formulario de nuevo curso</Text>
      </Show>
    </>
  );
};

export default NewClass;
