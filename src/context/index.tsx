import type { Year, YearData, Period, Area, ClassData, ClassPeriod } from '@app/types';

import { createContext, useContext, createEffect, ParentComponent } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createDexieArrayQuery } from 'solid-dexie';
import { fetchAndSyncClasses } from '@app/db/class';
import { db } from '@app/db/dexie';
import worker from '@app/utils/worker';
import { DEFAULT_CLASS_KEY, DOWNLOAD_AND_SYNC_MSG, JWT_KEY, SET_DATA_MSG, SYNC_DATA_MSG } from '@app/utils/constants';
import { log } from '@app/utils/functions';

export interface AppContextData {
  year: Year
  periods: Period[]
  areas: Area[]
  selectedClass: ClassData | null
  activePeriod: ClassPeriod | null
}
export interface AppContextActions {
  setYear: (year: YearData) => void
  setSelectedClass: (cl: ClassData | null) => void
  clearAll: () => void
}
export interface AppContextState {
  appState: AppContextData
  actions: AppContextActions
}

const getDefaultState = (): AppContextData => ({
  year: { id: '', value: 0 },
  periods: [],
  areas: [],
  selectedClass: null,
  activePeriod: null,
});
const AppContext = createContext<AppContextState>({
  appState: getDefaultState(),
  actions: {
    setYear: () => undefined,
    setSelectedClass: () => undefined,
    clearAll: () => undefined,
  },
});

export const AppProvider: ParentComponent = (props) => {
  const localYears = createDexieArrayQuery(() => db.years.toArray());
  const classes = createDexieArrayQuery(() => db.classes.toArray());
  const classPeriods = createDexieArrayQuery(() => db.classPeriods.toArray());
  const [data, setData] = createStore<AppContextData>(getDefaultState());

  createEffect(() => {
    log('%c NEW STATE:', 'font-weight:700; background:blue; color:white; border-radius:3px;');
    log(JSON.parse(JSON.stringify(data)));
  });
  createEffect(() => {
    if (data.year.value > 0) {
      log('Working with year: ', data.year.value);
      worker.postMessage({ type: SET_DATA_MSG, jwt: localStorage.getItem(JWT_KEY), yearId: data.year.id });
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

  // set selected class
  createEffect(() => {
    const classId = localStorage.getItem(DEFAULT_CLASS_KEY);
    if (classId !== null) {
      const classFound = classes.find((c) => c.id === classId);
      if (classFound !== undefined) {
        setSelectedClass(classFound);
      }
    }
  });

  // set selected classPeriod
  createEffect(() => {
    if (classPeriods.length > 0) {
      checkAndSetClassPeriod();
    }
  });

  const checkAndSetClassPeriod = () => {
    const classId = localStorage.getItem(DEFAULT_CLASS_KEY);
    if (classId === null) {
      setData({ activePeriod: null });
      return;
    }
    const found = classPeriods.find((cp) => cp.class_id === classId && !cp.finished);
    if (found !== undefined) {
      setData({ activePeriod: found });
    } else {
      setData({ activePeriod: null });
    }
  };

  const setYearData = (year: YearData) => {
    setData({
      year: { id: year.id, value: year.value },
      periods: year.periods,
      areas: year.areas,
    });
    void fetchAndSyncClasses(year.id);
  };

  const setSelectedClass = (cl: ClassData | null) => {
    if (cl === null) {
      localStorage.removeItem(DEFAULT_CLASS_KEY);
    } else {
      localStorage.setItem(DEFAULT_CLASS_KEY, cl.id);
    }
    checkAndSetClassPeriod();
    setData({ selectedClass: cl });
  };

  const clearAll = () => {
    setData(getDefaultState());
  };

  return (
    <AppContext.Provider value={{ appState: data, actions: { setSelectedClass, setYear: setYearData, clearAll } }}>
      {props.children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useAppData = () => useContext(AppContext);
