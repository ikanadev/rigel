import type { Component } from 'solid-js';

import { Show } from 'solid-js';
import { Title } from '@app/components';

import { useParams } from '@solidjs/router';
import { createDexieSignalQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

const Students: Component = () => {
  const params = useParams<{classid: string}>();
  const classData = createDexieSignalQuery(() => db.classes.get(params.classid));

  return (
    <Show when={classData() !== undefined} fallback={null}>
      <Title text="Estudiantes" />
    </Show>
  );
};

export default Students;
