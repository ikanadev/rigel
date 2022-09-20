import { Component, For } from 'solid-js';
import { Box, Flex, Button } from '@hope-ui/solid';

import { AttendanceStatus } from '@app/types';
import attendanceColor from './attendanceColors';

interface Props {
  status?: AttendanceStatus
  onSelect: (status: AttendanceStatus) => void
}
const AttendanceButtons: Component<Props> = (props) => {
  return (
    <Flex alignItems="center">
      <For each={Object.values(AttendanceStatus)}>
        {(value) => (
          <Button size="xs" variant="ghost" onClick={[props.onSelect, value]}>
            <Box
              w="$4"
              h="$4"
              borderRadius="$sm"
              bg={props.status === value ? attendanceColor[value].on : attendanceColor[value].off}
            />
          </Button>
        )}
      </For>
    </Flex>
  );
};

export default AttendanceButtons;
