import { getYears, getGradesAndSubjects } from '@app/api';
import { db } from '@app/db/dexie';

export const syncStaticData = async (): Promise<void> => {
  const years = await getYears();
  const gradesAndSubjects = await getGradesAndSubjects();

  void db.years.bulkPut(years);
  void db.grades.bulkPut(gradesAndSubjects.grades);
  void db.subjects.bulkPut(gradesAndSubjects.subjects);
};
