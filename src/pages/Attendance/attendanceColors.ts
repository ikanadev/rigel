import { AttendanceStatus } from '@app/types';

const attendanceColor: {[key in AttendanceStatus]: { on: string, off: string }} = {
  [AttendanceStatus.P]: { on: '$success9', off: '$success4' },
  [AttendanceStatus.F]: { on: '$danger9', off: '$danger4' },
  [AttendanceStatus.A]: { on: '$warning9', off: '$warning4' },
  [AttendanceStatus.L]: { on: '$info9', off: '$info4' },
};

export default attendanceColor;
