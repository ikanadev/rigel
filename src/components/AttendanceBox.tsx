import { AttendanceStatus } from '@app/types';
import { Component, Show } from 'solid-js';
import { Box } from '@hope-ui/solid';

import { attendanceColors } from '@app/utils/constants';
import { coloredAttendancesSignal } from '@app/hooks';

const AttendanceBox: Component<{ status?: AttendanceStatus, active: boolean }> = (props) => {
  const { coloredAtts } = coloredAttendancesSignal;
  return (
    <Show
      when={props.status !== undefined}
      fallback={<Box textAlign="center">-</Box>}
    >
      <Box
        borderRadius="$xs"
        opacity={props.active ? 1 : 0.4}
        color={coloredAtts() ? attendanceColors[props.status!].on : '$neutral12'}
        borderWidth={1}
        borderColor={coloredAtts() ? attendanceColors[props.status!].on : '$neutral12'}
        bgColor={coloredAtts() ? attendanceColors[props.status!].off : '$neutral2'}
        fontSize="$xs"
        as="pre"
        px="$0_5"
        lineHeight={1.2}
        fontWeight="$semibold"
      >
        {props.status!.substring(0, 1)}
      </Box>
    </Show>
  );
};

export default AttendanceBox;
