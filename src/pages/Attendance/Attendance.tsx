import type { Component } from 'solid-js';

import { Show } from 'solid-js';
import { Flex, Box } from '@hope-ui/solid';
import { Title, ClassSelector } from '@app/components';

import { useParams } from '@solidjs/router';
import { createDexieSignalQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

const Attendance: Component = () => {
  const params = useParams<{classid: string}>();
  const classData = createDexieSignalQuery(() => db.classes.get(params.classid));

  return (
    <Show when={classData() !== undefined} fallback={null}>
      <Flex justifyContent="space-between" alignItems="end">
        <Title text="Asistencia" />
        <Box flex="1" maxW={{ '@initial': '$full', '@md': '$72' }}>
          <ClassSelector />
        </Box>
      </Flex>
    </Show>
  );
};

export default Attendance;
