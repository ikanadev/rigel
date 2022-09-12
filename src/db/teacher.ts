import { Teacher } from '@app/types';
import { db } from './dexie';

export const saveTeacher = async (teacher: Teacher): Promise<void> => {
  await db.transaction('rw', [db.teachers], async () => {
    await db.teachers.clear();
    await db.teachers.add(teacher);
  });
};
