import { getYears, getGradesAndSubjects } from '@app/api';
import { db } from '@app/db/dexie';

const saveStaticData = async (): Promise<void> => {
  const years = await getYears();
  const gradesAndSubjects = await getGradesAndSubjects();
  await db.years.clear();
  await db.subjects.clear();
  await db.grades.clear();
  await db.years.bulkAdd(years);
  await db.subjects.bulkAdd(gradesAndSubjects.subjects);
  await db.grades.bulkAdd(gradesAndSubjects.grades);
};

export default saveStaticData;
