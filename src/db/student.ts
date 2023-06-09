import {
	Student,
	StudentUpdate,
	StudentTransaction,
	DbOperation,
} from "@app/types";

import { nanoid } from "nanoid";
import { db } from "./dexie";

export const addStudent = (student: Student) => {
	return db.transaction(
		"rw",
		[db.students, db.studentTransactions],
		async () => {
			const transaction: StudentTransaction = {
				id: nanoid(),
				type: DbOperation.Insert,
				data: student,
				date_time: Date.now(),
			};
			await db.students.add(student);
			await db.studentTransactions.add(transaction);
		},
	);
};

export const updateStudent = (studentUpdate: StudentUpdate) => {
	return db.transaction(
		"rw",
		[db.students, db.studentTransactions],
		async () => {
			const transaction: StudentTransaction = {
				id: nanoid(),
				type: DbOperation.Update,
				data: studentUpdate,
				date_time: Date.now(),
			};
			const { id, ...changes } = studentUpdate;
			await db.students.update(id, changes);
			await db.studentTransactions.add(transaction);
		},
	);
};

export const addStudents = (students: Student[]) => {
	const txs: StudentTransaction[] = [];
	students.forEach((st) => {
		txs.push({
			id: nanoid(),
			type: DbOperation.Insert,
			data: st,
			date_time: Date.now(),
		});
	});
	return db.transaction(
		"rw",
		[db.students, db.studentTransactions],
		async () => {
			await db.students.bulkAdd(students);
			await db.studentTransactions.bulkAdd(txs);
		},
	);
};

export const deleteStudent = (id: string) => {
	return db.transaction(
		"rw",
		[db.students, db.studentTransactions, db.attendances, db.scores],
		async () => {
			const tx: StudentTransaction = {
				id: nanoid(),
				type: DbOperation.Delete,
				data: { id },
				date_time: Date.now(),
			};
			await db.attendances.where({ student_id: id }).delete();
			await db.scores.where({ student_id: id }).delete();
			await db.students.delete(id);
			await db.studentTransactions.add(tx);
		},
	);
};
