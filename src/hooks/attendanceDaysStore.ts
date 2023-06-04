import { createDexieArrayQuery } from "solid-dexie";
import { useAppData } from "@app/context";
import { db } from "@app/db/dexie";

const attendanceDaysStore = () => {
	const { classStore } = useAppData();
	return createDexieArrayQuery(() =>
		db.attendanceDays
			.where("class_period_id")
			.equals(classStore.classPeriod?.id ?? "")
			.reverse()
			.sortBy("day"),
	);
};

export default attendanceDaysStore;
