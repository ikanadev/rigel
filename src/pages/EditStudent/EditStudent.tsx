import type { Component } from "solid-js";

import { createSignal } from "solid-js";
import { Title, Alert, NewStudentForm } from "@app/components";
import { NewStudentFormData } from "@app/components/NewStudentForm";

import { useNavigate, useParams } from "@solidjs/router";
import { useAppData } from "@app/context";
import { db } from "@app/db/dexie";
import { createDexieSignalQuery } from "solid-dexie";
import { updateStudent } from "@app/db/student";

const EditStudent: Component = () => {
	const params = useParams<{ studentid: string }>();
	const navigate = useNavigate();
	const { classStore } = useAppData();
	const [errorMsg, setErrorMsg] = createSignal("");
	const student = createDexieSignalQuery(() =>
		db.students.get(params.studentid),
	);

	const onSubmit = (data: NewStudentFormData) => {
		const studentData = student();
		if (studentData === undefined) return;
		updateStudent({
			id: studentData.id,
			name: data.name.value,
			last_name: data.last_name.value,
			ci: data.ci.value,
		})
			.then(() => {
				navigate(`/class/${classStore.class!.id}/students`);
			})
			.catch(() => {
				setErrorMsg("Error registrando estudiante.");
			});
	};

	return (
		<>
			<Title
				text="Editar estudiante"
				backTo={`/class/${classStore.class!.id}/students`}
			/>
			<Alert status="danger" text={errorMsg()} setText={setErrorMsg} />
			<NewStudentForm onSubmit={onSubmit} student={student()} />
		</>
	);
};

export default EditStudent;
