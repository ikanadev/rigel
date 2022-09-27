import {
  Student,
  StudentTransaction,
  ClassPeriod,
  ClassPeriodTransaction,
} from '@app/types';

import ky from 'ky';
import { API_URL } from '@app/utils/constants';
import useStore from './store';
import { SyncStatusResp } from './kyTypes';

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

export const studentSync = async (): Promise<SyncStatusResp> => {
  const resp = await api.get('auth/student/sync');
  return await resp.json();
};
export const saveStudents = async (students: StudentTransaction[]): Promise<SyncStatusResp> => {
  const resp = await api.post('auth/students', { json: students });
  return await resp.json();
};
export const getStudents = async (yearId: string): Promise<Student[]> => {
  const resp = await api.get(`auth/students/year/${yearId}`);
  return await resp.json();
};

export const classPeriodSync = async (): Promise<SyncStatusResp> => {
  const resp = await api.get('auth/classperiod/sync');
  return await resp.json();
};
export const saveClassPeriods = async (classPeriods: ClassPeriodTransaction[]): Promise<SyncStatusResp> => {
  const resp = await api.post('auth/classperiods', { json: classPeriods });
  return await resp.json();
};
export const getClassPeriods = async (yearId: string): Promise<ClassPeriod[]> => {
  const resp = await api.get(`auth/classperiods/year/${yearId}`);
  return await resp.json();
};
