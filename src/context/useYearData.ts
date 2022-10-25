import type { YearData } from '@app/types';

import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createDexieArrayQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';
import worker from '@app/utils/worker';
import { log } from '@app/utils/functions';
import {
  SET_DATA_MSG,
  SYNC_DATA_MSG,
  DOWNLOAD_AND_SYNC_MSG,
  JWT_KEY,
} from '@app/utils/constants';

const getEmptyYearData = (): YearData => ({
  id: '',
  value: 0,
  periods: [],
  areas: [],
});

export const useYearData = () => {
  const localYears = createDexieArrayQuery(() => db.years.toArray());
  const [yearData, setYearData] = createStore<YearData>(getEmptyYearData());

  createEffect(() => {
    if (yearData.value > 0) {
      log('Working with year: ', yearData.value);
      worker.postMessage({
        type: SET_DATA_MSG,
        jwt: localStorage.getItem(JWT_KEY),
        yearId: yearData.id,
      });
      worker.postMessage({ type: SYNC_DATA_MSG });
      worker.postMessage({ type: DOWNLOAD_AND_SYNC_MSG });
    }
  });

  // set year periods and areas
  createEffect(() => {
    if (localYears.length > 0) {
      const currentYear = new Date().getFullYear();
      let year = localYears.find((y) => y.value === currentYear);
      // if can't find current year, use the last one
      if (year === undefined) {
        year = localYears[localYears.length - 1];
      }
      setYearData(year);
    }
  });

  const clearYearData = () => setYearData(getEmptyYearData());

  return { yearData, clearYearData };
};

export default useYearData;
