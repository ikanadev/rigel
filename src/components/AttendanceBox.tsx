import { AttendanceStatus } from '@app/types';
import { Component, Show } from 'solid-js';
import { Box } from '@hope-ui/solid';

import { attendanceColors } from '@app/utils/constants';

const AttendanceBox: Component<{ status?: AttendanceStatus, active: boolean }> = (props) => {
  return (
    <Show
      when={props.status !== undefined}
      fallback={<Box textAlign="center">-</Box>}
    >
      <Box
        borderRadius="$xs"
        opacity={props.active ? 1 : 0.4}
        color={attendanceColors[props.status!].on}
        borderWidth={1}
        borderColor={attendanceColors[props.status!].on}
        bgColor={attendanceColors[props.status!].off}
        fontSize="$xs"
        as="pre"
        px="$0_5"
        lineHeight={1.2}
        mr="$0_5"
        fontWeight="$semibold"
      >
        {props.status!.substring(0, 1)}
      </Box>
    </Show>
  );
};

export default AttendanceBox;
