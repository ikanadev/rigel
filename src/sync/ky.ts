import { StudentTransaction } from '@app/types';

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

interface SyncStatusResp {
  last_sync_id: string
}

export const studentSync = async (): Promise<SyncStatusResp> => {
  const resp = await api.get('auth/student/sync');
  return await resp.json();
};
export const saveStudents = async (students: StudentTransaction[]): Promise<SyncStatusResp> => {
  const resp = await api.post('auth/students', { json: students });
  return await resp.json();
};
