import type { Component } from 'solid-js';

import { Show } from 'solid-js';
import { Flex, Box, Badge } from '@hope-ui/solid';
import { Title } from '@app/components';

import { useParams } from '@solidjs/router';
import { createDexieSignalQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

const Class: Component = () => {
  const { classid } = useParams();
  const classData = createDexieSignalQuery(() => db.classes.get(classid));
  return (
    <Show when={classData() !== undefined} fallback={null}>
      <Flex alignItems="start">
        <Title text={classData()!.edges.subject.name} />
        <Box flex="1" />
        <Badge fontSize="$xl" colorScheme="primary">{`${classData()!.edges.grade.name} - ${classData()!.parallel}`}</Badge>
      </Flex>
      {classData()?.edges.year.value}
    </Show>
  );
};

export default Class;
