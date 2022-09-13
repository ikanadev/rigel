import { getYears, getGradesAndSubjects } from '@app/api';
import { db } from '@app/db/dexie';

export const syncStaticData = async (): Promise<void> => {
  const years = await getYears();
  const gradesAndSubjects = await getGradesAndSubjects();
  const localYears = await db.years.toArray();
  const localGrades = await db.grades.toArray();
  const localSubjects = await db.subjects.toArray();

  const yearsToSave = years.filter((year) => {
    return !localYears.some((ly) => ly.id === year.id);
  });
  const gradesToSave = gradesAndSubjects.grades.filter((grade) => {
    return !localGrades.some((lg) => lg.id === grade.id);
  });
  const subjectsToSave = gradesAndSubjects.subjects.filter((subject) => {
    return !localSubjects.some((ls) => ls.id === subject.id);
  });

  if (yearsToSave.length > 0) {
    void db.years.bulkAdd(yearsToSave);
  }
  if (gradesToSave.length > 0) {
    void db.grades.bulkAdd(gradesToSave);
  }
  if (subjectsToSave.length > 0) {
    void db.subjects.bulkAdd(subjectsToSave);
  }
};
