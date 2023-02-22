import { TeacherProfile } from '@app/types';
import { db } from './dexie';
import { getProfile } from '@app/api';

export const saveTeacher = async (teacher: TeacherProfile): Promise<void> => {
  await db.transaction('rw', [db.teachers], async () => {
    await db.teachers.clear();
    await db.teachers.add(teacher);
  });
};

export const syncProfile = async (): Promise<void> => {
  const serverTeacher = await getProfile();
  const localTeacher = await db.teachers.get(serverTeacher.id);
  if (localTeacher === undefined) {
    await db.teachers.add(serverTeacher);
    return;
  }
  let replaceTeacher = false;
  if (
    serverTeacher.name !== localTeacher.name ||
    serverTeacher.last_name !== localTeacher.last_name ||
    serverTeacher.email !== localTeacher.email
  ) {
    replaceTeacher = true;
  }
  if (
    serverTeacher.subscriptions.length !== localTeacher.subscriptions.length
  ) {
    replaceTeacher = true;
  } else {
    for (let i = 0; i < localTeacher.subscriptions.length; i++) {
      const localSub = localTeacher.subscriptions[i];
      const serverSub = serverTeacher.subscriptions[i];
      if (
        serverSub.id !== localSub.id ||
        serverSub.date !== localSub.date ||
        serverSub.qtty !== localSub.qtty ||
        serverSub.method !== localSub.method ||
        serverSub.year.id !== localSub.year.id ||
        serverSub.year.value !== localSub.year.value
      ) {
        replaceTeacher = true;
        break;
      }
    }
  }
  if (replaceTeacher) {
    await db.teachers.put(serverTeacher);
  }
};
