import { getYears, getGradesAndSubjects } from "@app/api";
import { db } from "@app/db/dexie";

export const syncStaticData = async (): Promise<void> => {
	const serverYears = await getYears();

	// check year data
	const localYears = await db.years.toArray();
	const yearsToSave = serverYears.filter((year) => {
		const found = localYears.find(
			(y) => y.id === year.id && y.value === year.value,
		);
		if (found === undefined) {
			return true;
		}
		// check areas
		const areAreasDiff = found.areas.some((area, i) => {
			const serverArea = year.areas[i];
			return (
				serverArea === undefined ||
				serverArea.name !== area.name ||
				serverArea.id !== area.id ||
				serverArea.points !== area.points
			);
		});
		if (areAreasDiff) {
			return true;
		}
		// check periods
		const arePeriodsDiff = found.periods.some((period, i) => {
			const serverPeriod = year.periods[i];
			return (
				serverPeriod === undefined ||
				serverPeriod.id !== period.id ||
				serverPeriod.name !== period.name
			);
		});
		if (arePeriodsDiff) {
			return true;
		}
		return false;
	});

	// check grades and subjects
	const gradesAndSubjects = await getGradesAndSubjects();
	const localGrades = await db.grades.toArray();
	const localSubjects = await db.subjects.toArray();
	const gradesToSave = gradesAndSubjects.grades.filter((serverGrade) => {
		const found = localGrades.find((grade) => grade.id === serverGrade.id);
		if (found === undefined) return true;
		if (found.name !== serverGrade.name) return true;
		return false;
	});
	const subjectsToSave = gradesAndSubjects.subjects.filter((serverSubject) => {
		const found = localSubjects.find(
			(subject) => subject.id === serverSubject.id,
		);
		if (found === undefined) return true;
		if (found.name !== serverSubject.name) return true;
		return false;
	});

	if (yearsToSave.length > 0) {
		void db.years.bulkPut(yearsToSave);
	}
	if (gradesToSave.length > 0) {
		void db.grades.bulkPut(gradesToSave);
	}
	if (subjectsToSave.length > 0) {
		void db.subjects.bulkPut(subjectsToSave);
	}
};
