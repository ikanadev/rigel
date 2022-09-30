import {
  Student,
  StudentTransaction,
  ClassPeriod,
  ClassPeriodTransaction,
  AttendanceDay,
  AttendanceDayTransaction,
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
