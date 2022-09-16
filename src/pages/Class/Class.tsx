import type { Component } from 'solid-js';

import { Show } from 'solid-js';
import { Flex, Box } from '@hope-ui/solid';
import { Title, ClassSelector } from '@app/components';

import { useParams } from '@solidjs/router';
import { createDexieSignalQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

const Class: Component = () => {
  const params = useParams<{classid: string}>();
  const classData = createDexieSignalQuery(() => db.classes.get(params.classid));

  return (
    <Show when={classData() !== undefined} fallback={null}>
      <Flex alignItems="center">
        <Title text={classData()!.edges.subject.name} />
        <Box flex="1" />
        <Box width="$72">
          <ClassSelector />
        </Box>
      </Flex>
      {classData()?.edges.year.value}
    </Show>
  );
};

export default Class;
