import { TeacherProfile } from "@app/types";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { createDexieArrayQuery } from "solid-dexie";

import { db } from "@app/db/dexie";

export const getEmptyProfile = (): TeacherProfile => ({
	id: "",
	name: "",
	last_name: "",
	email: "",
	subscriptions: [],
});

const useProfile = () => {
	const profiles = createDexieArrayQuery(() => db.teachers.toArray());
	const [profile, setProfile] = createStore<TeacherProfile>(getEmptyProfile());

	createEffect(() => {
		if (profiles.length > 0) {
			setProfile(profiles[0]);
		}
	});

	const clearProfile = () => setProfile(getEmptyProfile());

	return { profile, clearProfile };
};

export default useProfile;
