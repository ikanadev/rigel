import type { YearData, ClassData } from '@app/types';

import { createContext, useContext, createEffect, ParentComponent } from 'solid-js';
import { log } from '@app/utils/functions';
import useClassStore, { ClassStore } from './useSelectedClass';
import useYearData from './useYearData';

interface AppContextData {
  year: YearData
  classStore: ClassStore
}
interface AppContextActions {
  setSelectedClass: (cl: ClassData | null) => void
  clearAll: () => void
}
interface AppContextState extends AppContextData {
  actions: AppContextActions
}

const AppContext = createContext<AppContextState>({
  year: {
    id: '',
    value: 0,
    periods: [],
    areas: [],
  },
  classStore: {
    class: null,
    classPeriod: null,
  },
  actions: {
    setSelectedClass: () => undefined,
    clearAll: () => undefined,
  },
});

export const AppProvider: ParentComponent = (props) => {
  const { classStore, setSelectedClass, clearClassStore } = useClassStore();
  const { yearData, clearYearData } = useYearData();

  createEffect(() => {
    log(
      '%c NEW STATE:',
      'font-weight:700; background:blue; color:white; border-radius:3px;',
    );
    log(JSON.parse(JSON.stringify({
      year: yearData,
      classStore,
    })));
  });

  const clearAll = () => {
    clearClassStore();
    clearYearData();
  };

  return (
    <AppContext.Provider value={{
      year: yearData,
      classStore,
      actions: {
        setSelectedClass,
        clearAll,
      },
    }}>
      {props.children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useAppData = () => useContext(AppContext);
