import {
  Student,
  StudentTransaction,
  ClassPeriod,
  ClassPeriodTransaction,
  AttendanceDay,
  AttendanceDayTransaction,
  Attendance,
  AttendanceTransaction,
  Activity,
  ActivityTransaction,
  Score,
  ScoreTransaction,
} from '@app/types';

import ky from 'ky';
import { API_URL } from '@app/utils/constants';
import useStore from './store';

const { store } = useStore;
const api = ky.extend({
  prefixUrl: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Authorization', store.jwt);
      },
    ],
  },
});

export const saveStudents = async (students: StudentTransaction[]): Promise<void> => {
  await api.post('auth/students', { json: students });
};
export const getStudents = async (yearId: string): Promise<Student[]> => {
  const resp = await api.get(`auth/students/year/${yearId}`);
  return await resp.json();
};

export const saveClassPeriods = async (classPeriods: ClassPeriodTransaction[]): Promise<void> => {
  await api.post('auth/classperiods', { json: classPeriods });
};
export const getClassPeriods = async (yearId: string): Promise<ClassPeriod[]> => {
  const resp = await api.get(`auth/classperiods/year/${yearId}`);
  return await resp.json();
};

export const saveAttendanceDays = async (attDays: AttendanceDayTransaction[]): Promise<void> => {
  await api.post('auth/attendancedays', { json: attDays });
};
export const getAttendanceDays = async (yearId: string): Promise<AttendanceDay[]> => {
  const resp = await api.get(`auth/attendancedays/year/${yearId}`);
  return await resp.json();
};

export const saveAttendances = async (atts: AttendanceTransaction[]): Promise<void> => {
  await api.post('auth/attendances', { json: atts });
};
export const getAttendances = async (yearId: string): Promise<Attendance[]> => {
  const resp = await api.get(`auth/attendances/year/${yearId}`);
  return await resp.json();
};

export const saveActivities = async (acts: ActivityTransaction[]): Promise<void> => {
  await api.post('auth/activities', { json: acts });
};
export const getActivities = async (yearId: string): Promise<Activity[]> => {
  const resp = await api.get(`auth/activities/year/${yearId}`);
  return await resp.json();
};

export const saveScores = async (scores: ScoreTransaction[]): Promise<void> => {
  await api.post('auth/scores', { json: scores });
};
export const getScores = async (yearId: string): Promise<Score[]> => {
  const resp = await api.get(`auth/scores/year/${yearId}`);
  return await resp.json();
};
