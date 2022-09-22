import { AttendanceStatus } from '@app/types';

const attendanceColor: {[key in AttendanceStatus]: { on: string, off: string }} = {
  [AttendanceStatus.P]: { on: '$success10', off: '$success5' },
  [AttendanceStatus.F]: { on: '$danger10', off: '$danger5' },
  [AttendanceStatus.A]: { on: '$warning10', off: '$warning5' },
  [AttendanceStatus.L]: { on: '$info10', off: '$info5' },
};

export default attendanceColor;
