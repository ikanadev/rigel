import { Component, For } from 'solid-js';
import { Box, Flex, Text } from '@hope-ui/solid';

import { AttendanceStatus } from '@app/types';
import { attendanceColors } from '@app/utils/constants';

const AttendanceLabels: Component = () => {
  return (
    <Flex gap={{ '@initial': '$3', '@md': '$4' }} alignItems="center">
      <For each={Object.values(AttendanceStatus)}>
        {(value) => (
          <Flex alignItems="center">
            <Box w="$4" h="$4" borderRadius="$sm" mr="$0_5" bg={attendanceColors[value].on} />
            <Text size="sm">{value}</Text>
          </Flex>
        )}
      </For>
    </Flex>
  );
};

export default AttendanceLabels;
