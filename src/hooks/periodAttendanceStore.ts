import { Attendance, AttendanceDay } from '@app/types';

import { createMemo } from 'solid-js';
import { createDexieArrayQuery } from 'solid-dexie';
import { useAppData } from '@app/context';
import dayjs from 'dayjs';
import { db } from '@app/db/dexie';

interface AttMapByStudentKey {[key: string]: Attendance}
interface AttDayWithAtts extends AttendanceDay {
  attendances: AttMapByStudentKey
}
const periodAttendanceStore = () => {
  const { appState } = useAppData();
  // get attendanceDays from current period
  const attendanceDays = createDexieArrayQuery(
    () => db.attendanceDays.where('class_period_id').equals(appState.activePeriod?.id ?? '').reverse().sortBy('day'),
  );
  // get all attendances from all attendanceDays from this period
  const attendances = createDexieArrayQuery(
    () => db.attendances.where('attendance_day_id').anyOf(attendanceDays.map(a => a.id)).toArray(),
  );
  const getDayAttds = (attDayId: string): AttMapByStudentKey => {
    const attds: AttMapByStudentKey = {};
    attendances
      .filter((att) => att.attendance_day_id === attDayId)
      .forEach((att) => {
        attds[att.student_id] = att;
      });
    return attds;
  };
  // get today's attendance to show attendance buttons
  const todayAttendanceDay = createMemo((): AttDayWithAtts | null => {
    const found = attendanceDays.find((ad) => dayjs().isSame(dayjs(ad.day), 'day'));
    if (found === undefined) return null;
    return {
      ...found,
      attendances: getDayAttds(found.id),
    };
  });
  // get pasts attendances to show as history
  const pastAttendancesDay = createMemo((): AttDayWithAtts[] => {
    const today = dayjs();
    return attendanceDays
      .filter((ad) => today.isAfter(dayjs(ad.day), 'day'))
      .map((ad) => ({
        ...ad,
        attendances: getDayAttds(ad.id),
      }));
  });
  return { todayAttendanceDay, pastAttendancesDay };
};

export default periodAttendanceStore;
