import type { RouteDefinition } from "@solidjs/router";

import Home from "@app/pages/Home";
import Profile from "@app/pages/Profile";
import SignIn from "@app/pages/SignIn";
import SignUp from "@app/pages/SignUp";
import Classes from "@app/pages/Classes";
import NewClass from "@app/pages/NewClass";
import Class from "@app/pages/Class";
import Attendance from "@app/pages/Attendance";
import AttendanceReport from "@app/pages/AttendanceReport";
import Students from "@app/pages/Students";
import NewStudent from "@app/pages/NewStudent";
import EditStudent from "@app/pages/EditStudent";
import Activities from "@app/pages/Activities";
import Activity from "@app/pages/Activity";
import ScoresReport from "@app/pages/ScoresReport";
import StudentsFromXLS from "@app/pages/StudentsFromXLS";

const routes: RouteDefinition[] = [
	{
		path: "/",
		component: Home,
		children: [
			{ path: "/", component: Classes },
			{ path: "/profile", component: Profile },
			{ path: "/class/new", component: NewClass },
			{
				path: "/class/:classid",
				component: Class,
				children: [
					{ path: "/attendance", component: Attendance },
					{ path: "/add_from_xls", component: StudentsFromXLS },
					{ path: "/attendance/report", component: AttendanceReport },
					{ path: "/students", component: Students },
					{ path: "/students/new", component: NewStudent },
					{ path: "/student/:studentid/edit", component: EditStudent },
					{ path: "/activities", component: Activities },
					{ path: "/activity/:activityid", component: Activity },
					{ path: "/scores/report", component: ScoresReport },
				],
			},
		],
	},
	{
		path: "/signin",
		component: SignIn,
	},
	{
		path: "/signup",
		component: SignUp,
	},
];

export default routes;
