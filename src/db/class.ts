import type { ClassData } from "@app/types";

import { db } from "./dexie";
import { getClasses } from "@app/api";

/**
 * Compares classesToSync items against local items and saves the missing ones
 */
export const syncClasses = async (
	classesToSync: ClassData[],
): Promise<void> => {
	const localClasses = await db.classes.toArray();
	const toDelete = localClasses
		.filter((cl) => classesToSync.find((c) => c.id === cl.id) === undefined)
		.map((c) => c.id);
	if (toDelete.length > 0) {
		await db.classes.bulkDelete(toDelete);
	}

	const classesToAdd = classesToSync.filter((cl) => {
		const found = localClasses.find((localCl) => localCl.id === cl.id);
		if (found === undefined) return true;
		if (
			found.parallel !== cl.parallel ||
			found.year.id !== cl.year.id ||
			found.year.value !== cl.year.value ||
			found.grade.id !== cl.grade.id ||
			found.grade.name !== cl.grade.name ||
			found.subject.id !== cl.subject.id ||
			found.subject.name !== cl.subject.name
		)
			return true;
		return false;
	});
	if (classesToAdd.length > 0) {
		void db.classes.bulkPut(classesToAdd);
	}
};

/** Fetchs provided year classes and save them in local data */
export const fetchAndSyncClasses = async (yearId: string): Promise<void> => {
	const classes = await getClasses(yearId);

	// Delete classes of other year
	const localClasses = db.classes.toCollection();
	const localClassesToDelete = localClasses.filter((c) => c.year.id !== yearId);
	await localClassesToDelete.delete();

	// sync with local data
	await syncClasses(classes);
};
