import { createDexieArrayQuery } from 'solid-dexie';
import { useAppData } from '@app/context';
import { db } from '@app/db/dexie';

const attendanceDaysStore = () => {
  const { appState } = useAppData();
  return createDexieArrayQuery(
    () => db.attendanceDays.where('class_period_id').equals(appState.activePeriod?.id ?? '').reverse().sortBy('day'),
  );
};

export default attendanceDaysStore;
