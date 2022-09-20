import type { Year, Period, Area, Class, ClassPeriod } from '@app/types';

import { createContext, useContext, createEffect, ParentComponent } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createDexieArrayQuery } from 'solid-dexie';
import { fetchAndSyncClasses } from '@app/db/class';
import { db } from '@app/db/dexie';
import { DEFAULT_CLASS_KEY } from '@app/utils/constants';

export interface AppContextData {
  year: Omit<Year, 'edges'>
  periods: Period[]
  areas: Area[]
  selectedClass: Class | null
  activePeriod: ClassPeriod | null
}
export interface AppContextActions {
  setYear: (year: Year) => void
  setSelectedClass: (cl: Class | null) => void
}
export interface AppContextState {
  appState: AppContextData
  actions: AppContextActions
}

const defaultState: AppContextData = {
  year: { id: '', value: 0 },
  periods: [],
  areas: [],
  selectedClass: null,
  activePeriod: null,
};
const AppContext = createContext<AppContextState>({
  appState: defaultState,
  actions: {
    setYear: () => undefined,
    setSelectedClass: () => undefined,
  },
});

export const AppProvider: ParentComponent = (props) => {
  const localYears = createDexieArrayQuery(() => db.years.toArray());
  const classes = createDexieArrayQuery(() => db.classes.toArray());
  const classPeriods = createDexieArrayQuery(() => db.classPeriods.toArray());
  const [data, setData] = createStore<AppContextData>(defaultState);

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
    checkAndSetClassPeriod();
  });

  const checkAndSetClassPeriod = () => {
    const classId = localStorage.getItem(DEFAULT_CLASS_KEY);
    if (classId === null) {
      setData('activePeriod', null);
      return;
    }
    const found = classPeriods.find((cp) => cp.class_id === classId && !cp.finished);
    if (found !== undefined) {
      setData('activePeriod', found);
    } else {
      setData('activePeriod', null);
    }
  };

  const setYearData = (year: Year) => {
    setData({
      year: { id: year.id, value: year.value },
      periods: year.edges.periods,
      areas: year.edges.areas,
    });
    void fetchAndSyncClasses(year.id);
  };

  const setSelectedClass = (cl: Class | null) => {
    if (cl === null) {
      localStorage.removeItem(DEFAULT_CLASS_KEY);
    } else {
      localStorage.setItem(DEFAULT_CLASS_KEY, cl.id);
    }
    checkAndSetClassPeriod();
    setData({ selectedClass: cl });
  };

  return (
    <AppContext.Provider value={{ appState: data, actions: { setSelectedClass, setYear: setYearData } }}>
      {props.children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useAppData = () => useContext(AppContext);
