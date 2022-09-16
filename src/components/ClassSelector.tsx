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

import { For } from 'solid-js';
import { useParams, useNavigate, useLocation } from '@solidjs/router';
import { createDexieArrayQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

/** Only call it in a class specific route component */
const ClassSelector: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{classid: string}>();
  const classes = createDexieArrayQuery(() => db.classes.toArray());

  const selectedClass = () => classes.find((c) => c.id === params.classid);

  const handleChange = (classId: string) => {
    const path = location.pathname.replace(params.classid, classId);
    navigate(path);
  };

  return (
    <Select onChange={handleChange} value={params.classid}>
      <SelectTrigger>
        <Flex flexDirection="column" py="$1">
          <Text fontWeight="$semibold" textAlign="start" size="sm">
            {selectedClass()?.edges.subject.name}
          </Text>
          <Text size="sm" textAlign="start">{selectedClass()?.edges.grade.name}</Text>
        </Flex>
        <Box flex={1} />
        <Badge colorScheme="primary" fontSize="$lg">{selectedClass()?.parallel}</Badge>
        <SelectIcon />
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
  );
};

export default ClassSelector;
