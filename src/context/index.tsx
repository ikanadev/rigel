import type { Year, Period, Area } from '@app/types';

import { createContext, useContext, createEffect, Show, ParentComponent } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createDexieArrayQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

export interface AppContextValues {
  year: Omit<Year, 'edges'>
  periods: Period[]
  areas: Area[]
  setYear: (year: Year) => void
}

const AppContext = createContext<AppContextValues>({
  year: { id: '', value: 0 },
  periods: [],
  areas: [],
  setYear: () => undefined,
});

interface AppProviderStore {
  year: Omit<Year, 'edges'> | null
  periods: Period[]
  areas: Area[]
}
export const AppProvider: ParentComponent = (props) => {
  const localYears = createDexieArrayQuery(() => db.years.toArray());
  const [data, setData] = createStore<AppProviderStore>({
    year: null,
    periods: [],
    areas: [],
  });

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

  const setYearData = (year: Year) => {
    setData({
      year: { id: year.id, value: year.value },
      periods: year.edges.periods,
      areas: year.edges.areas,
    });
  };
  return (
    <Show
      when={data.year !== null && data.periods.length > 0 && data.areas.length > 0}
      fallback={<p>Loading local data</p>}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <AppContext.Provider value={{ year: data.year!, periods: data.periods, areas: data.areas, setYear: setYearData }}>
        {props.children}
      </AppContext.Provider>
    </Show>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useAppData = () => useContext(AppContext);
