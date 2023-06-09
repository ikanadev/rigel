import {
	ClassPeriod,
	AttendanceDay,
	TotalAttendances,
	Attendance,
	Student,
} from "@app/types";

export interface ClassPeriodWithAttDays extends ClassPeriod {
	attDays: AttendanceDay[];
}
export interface AttsMap {
	[key: string]: Attendance;
}
export interface StudentWithAtts extends Student {
	periodAtts: TotalAttendances[];
	yearAtts: TotalAttendances;
	attsMap: AttsMap;
}
