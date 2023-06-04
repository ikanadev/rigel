import { Student, Score, ClassPeriod, Area, Activity } from "@app/types";

interface AreaWithActs extends Area {
	acts: Activity[];
}
export interface ClassPeriodWithActs extends ClassPeriod {
	areas: AreaWithActs[];
}

export interface StudentWithScores extends Student {
	areaScores: number[][];
	periodScores: number[];
	yearScore: number;
	scoresMap: { [key: string]: Score };
}

export enum ViewMode {
	Activity = "Detallado",
	Area = "Notas por Área",
	Period = "Notas por Periodo",
}
