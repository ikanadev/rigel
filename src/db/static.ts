import { getYears, getGradesAndSubjects } from '@app/api';
import { db } from '@app/db/dexie';

export const syncStaticData = async (): Promise<void> => {
  const serverYears = await getYears();
  const gradesAndSubjects = await getGradesAndSubjects();

  const localYears = await db.years.toArray();
  const yearsToSave = serverYears.filter((year) => {
    const found = localYears.find(y => y.id === year.id && y.value === year.value);
    if (found === undefined) {
      return true;
    }
    // check areas
    const areAreasDiff = found.areas.some((area, i) => {
      const serverArea = year.areas[i];
      return serverArea === undefined || serverArea.name !== area.name || serverArea.id !== area.id || serverArea.points !== area.points;
    });
    if (areAreasDiff) {
      return true;
    }
    // check periods
    const arePeriodsDiff = found.periods.some((period, i) => {
      const serverPeriod = year.periods[i];
      return serverPeriod === undefined || serverPeriod.id !== period.id || serverPeriod.name !== period.name;
    });
    if (arePeriodsDiff) {
      return true;
    }
    return false;
  });

  void db.years.bulkPut(yearsToSave);
  // TODO: probably we're gonna change the subjects to be related to year
  void db.grades.bulkPut(gradesAndSubjects.grades);
  void db.subjects.bulkPut(gradesAndSubjects.subjects);
};
