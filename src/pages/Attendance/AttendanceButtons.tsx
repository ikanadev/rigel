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
          <Button
            size="xs"
            variant="ghost"
            onClick={[props.onSelect, value]}
            _hover={{ background: '$neutral2' }}
            _focus={{ boxShadow: 'none' }}
            px="$1"
          >
            <Box
              w={props.status === value ? '$5' : '$4'}
              h={props.status === value ? '$5' : '$4'}
              transition="all 0.5s"
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
