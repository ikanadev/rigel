import type { YearData, ClassData, TeacherProfile } from "@app/types";

import {
	createContext,
	useContext,
	createEffect,
	Show,
	ParentComponent,
} from "solid-js";
import { log } from "@app/utils/functions";
import useClassStore, { ClassStore } from "./useSelectedClass";
import useYearData, { getEmptyYearData } from "./useYearData";
import useProfile, { getEmptyProfile } from "./useProfile";

interface AppContextData {
	year: YearData;
	profile: TeacherProfile;
	classStore: ClassStore;
}
interface AppContextActions {
	setSelectedClass: (cl: ClassData | null) => void;
	clearAll: () => void;
}
interface AppContextState extends AppContextData {
	actions: AppContextActions;
}

const AppContext = createContext<AppContextState>({
	year: getEmptyYearData(),
	profile: getEmptyProfile(),
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
	const { profile, clearProfile } = useProfile();
	const { yearData, clearYearData } = useYearData();

	createEffect(() => {
		log(
			"%c NEW STATE:",
			"font-weight:700; background:blue; color:white; border-radius:3px;",
		);
		log(
			JSON.parse(
				JSON.stringify({
					year: yearData,
					classStore,
					profile,
				}),
			),
		);
	});

	const clearAll = () => {
		clearClassStore();
		clearYearData();
		clearProfile();
	};

	return (
		<AppContext.Provider
			value={{
				year: yearData,
				profile,
				classStore,
				actions: {
					setSelectedClass,
					clearAll,
				},
			}}
		>
			<Show
				when={yearData.value !== 0 && profile.id !== ""}
				fallback={<p>Cargando...</p>}
			>
				{props.children}
			</Show>
		</AppContext.Provider>
	);
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useAppData = () => useContext(AppContext);
