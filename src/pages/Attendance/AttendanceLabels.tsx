import { Component, For } from 'solid-js';
import { Box, Flex, Text } from '@hope-ui/solid';

import { AttendanceStatus } from '@app/types';
import attendanceColor from './attendanceColors';

const AttendanceLabels: Component = () => {
  return (
    <Flex gap="$4" alignItems="center">
      <For each={Object.values(AttendanceStatus)}>
        {(value) => (
          <Flex alignItems="center">
            <Box w="$4" h="$4" borderRadius="$sm" mr="$1" bg={attendanceColor[value].on} />
            <Text size="sm">{value}</Text>
          </Flex>
        )}
      </For>
    </Flex>
  );
};

export default AttendanceLabels;
