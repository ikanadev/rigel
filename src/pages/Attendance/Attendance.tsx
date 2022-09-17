import type { Component } from 'solid-js';

import { Show } from 'solid-js';
import { Title } from '@app/components';

import { useAppData } from '@app/context';

const Attendance: Component = () => {
  const { appState } = useAppData();

  return (
    <Show when={appState.selectedClass !== null} fallback={null}>
      <Title text="Asistencia" />
    </Show>
  );
};

export default Attendance;
