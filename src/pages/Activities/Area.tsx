import { Component, For, Show } from 'solid-js';
import { Activity, Area as IArea } from '@app/types';
import { Heading, Text, Box, Flex, IconButton } from '@hope-ui/solid';
import { Link } from '@solidjs/router';
import { ArrowLongRight, Pencil } from '@app/icons';

import { db } from '@app/db/dexie';
import { useAppData } from '@app/context';
import { createDexieArrayQuery } from 'solid-dexie';

interface Props {
  area: IArea
  onEditActivity: (activity: Activity) => void
}
const Area: Component<Props> = (props) => {
  const { classStore } = useAppData();
  const activities = createDexieArrayQuery(() => db.activities.where(
    { area_id: props.area.id, class_period_id: classStore.classPeriod?.id ?? '' },
  ).toArray());
  return (
    <Box my="$4">
      <Heading size="lg" textTransform="uppercase">{props.area.name}</Heading>
      <Show
        when={activities.length > 0}
        fallback={
          <Text color="$neutral11" fontStyle="italic">Sin actividades</Text>
        }
      >
        <For each={activities}>{(activity) => (
          <Flex alignItems="center" p="$1" mt="$1" rounded="$sm" _hover={{ background: '$neutral2' }}>
            <Link href={`/class/${classStore.class!.id}/activity/${activity.id}`}>
              <Flex alignItems="center" color="$primary10">
                <ArrowLongRight mr="$2" />
                <Text as="span">{activity.name}</Text>
              </Flex>
            </Link>
            <Flex flex="1" />
            <IconButton
              onClick={[props.onEditActivity, activity]}
              variant="ghost"
              aria-label="Editar actividad"
              colorScheme="info"
              icon={<Pencil w="$4" h="$4" />}
              size="xs"
            />
          </Flex>
        )}</For>
      </Show>
    </Box>
  );
};

export default Area;
