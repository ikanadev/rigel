import { AttendanceStatus } from '@app/types';
import { Component } from 'solid-js';
import { Box } from '@hope-ui/solid';

import { attendanceColors } from '@app/utils/constants';

const AttendanceBox: Component<{ status?: AttendanceStatus }> = (props) => {
  return (
    <Box
      w="$4"
      h="$4"
      borderRadius="$sm"
      mr="$1"
      bg={props.status !== undefined ? attendanceColors[props.status].on : undefined}
    >
      {props.status === undefined ? '-' : null}
    </Box>
  );
};

export default AttendanceBox;
