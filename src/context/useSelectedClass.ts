import type { ClassData, ClassPeriod } from '@app/types';

import { createDexieArrayQuery } from 'solid-dexie';
import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { DEFAULT_CLASS_KEY } from '@app/utils/constants';
import { db } from '@app/db/dexie';

export interface ClassStore {
  class: null | ClassData
  classPeriod: null | ClassPeriod
}
const getEmptyClassStore = (): ClassStore => ({
  class: null,
  classPeriod: null,
});

const useClassStore = () => {
  const [classStore, setClassStore] = createStore<ClassStore>(
    getEmptyClassStore(),
  );
  const classes = createDexieArrayQuery(() => db.classes.toArray());
  const classPeriods = createDexieArrayQuery(() => db.classPeriods.toArray());

  // period changes
  createEffect(() => {
    if (classStore.class === null) {
      setClassStore({ classPeriod: null });
      return;
    }
    const period = classPeriods.find(
      cp => cp.class_id === classStore.class!.id && !cp.finished,
    );
    setClassStore({ classPeriod: period ?? null });
  });

  createEffect(() => {
    const classId = localStorage.getItem(DEFAULT_CLASS_KEY);
    if (classId !== null) {
      const classFound = classes.find(c => c.id === classId);
      if (classFound !== undefined) {
        setClassStore({ class: classFound });
      }
    }
  });

  const setSelectedClass = (classData: ClassData | null) => {
    if (classData === null) {
      localStorage.removeItem(DEFAULT_CLASS_KEY);
    } else {
      localStorage.setItem(DEFAULT_CLASS_KEY, classData.id);
    }
    setClassStore({ class: classData });
  };

  const clearClassStore = () => setClassStore(getEmptyClassStore());

  return { classStore, setSelectedClass, clearClassStore };
};

export default useClassStore;
