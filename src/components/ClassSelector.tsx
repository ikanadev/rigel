import type { Component } from 'solid-js';

import {
  Select,
  SelectTrigger,
  SelectIcon,
  SelectContent,
  SelectListbox,
  SelectOption,
  Text,
  Flex,
  Badge,
  Box,
} from '@hope-ui/solid';

import { For, Show } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import { createDexieArrayQuery } from 'solid-dexie';
import { useAppData } from '@app/context';
import { db } from '@app/db/dexie';

/** Only call it in a class specific route component */
const ClassSelector: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = createDexieArrayQuery(() => db.classes.toArray());
  const { actions, appState } = useAppData();

  const handleChange = (classId: string) => {
    if (appState.selectedClass === null) return;
    const path = location.pathname.replace(appState.selectedClass.id, classId);
    const newClass = classes.find((c) => c.id === classId);
    actions.setSelectedClass(newClass ?? null);
    navigate(path);
  };

  return (
    <Show when={appState.selectedClass !== null}>
      <Select onChange={handleChange} value={appState.selectedClass!.id}>
        <SelectTrigger border="none" py="$0_5" px="$2">
          <Flex flexDirection="column" minW="$60">
            <Text fontWeight="$semibold" textAlign="start" size="sm" overflow="hidden" maxW="$full">
              {appState.selectedClass?.edges.subject.name}
            </Text>
            <Flex flexWrap="wrap">
              <Text size="sm" textAlign="start" flex="1">{appState.selectedClass?.edges.grade.name}</Text>
              <Badge colorScheme="primary" fontSize="$sm">{appState.selectedClass?.parallel}</Badge>
            </Flex>
          </Flex>
          <SelectIcon ml="$2" />
        </SelectTrigger>
        <SelectContent>
          <SelectListbox p="$2">
            <For each={classes}>
              {(cl) => (
                <SelectOption value={cl.id} p="$1">
                  <Flex flexDirection="column">
                    <Text fontWeight="$semibold" size="sm">
                      {cl.edges.subject.name}
                    </Text>
                    <Text size="xs">{cl.edges.grade.name}</Text>
                  </Flex>
                  <Box flex={1} />
                  <Badge colorScheme="primary">{cl.parallel}</Badge>
                </SelectOption>
              )}
            </For>
          </SelectListbox>
        </SelectContent>
      </Select>
    </Show>
  );
};

export default ClassSelector;
