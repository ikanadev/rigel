import { Component, For, Show, createMemo } from "solid-js";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@hope-ui/solid";
import { Title, NoStudentsMessage } from "@app/components";
import { Score } from "@app/types";
import ScoreCell from "./ScoreCell";

import { useParams } from "@solidjs/router";
import { studentsStore } from "@app/hooks";
import { db } from "@app/db/dexie";
import { createDexieArrayQuery, createDexieSignalQuery } from "solid-dexie";

interface ScoresMap {
	[key: string]: Score;
}

const Activity: Component = () => {
	const params = useParams<{ activityid: string; classid: string }>();
	const activity = createDexieSignalQuery(() =>
		db.activities.get(params.activityid),
	);
	const students = studentsStore();
	const scores = createDexieArrayQuery(() =>
		db.scores.where({ activity_id: params.activityid }).toArray(),
	);

	const scoresMap = createMemo(() =>
		scores.reduce((result: ScoresMap, score) => {
			result[score.student_id] = score;
			return result;
		}, {}),
	);

	return (
		<Box maxW="$lg">
			<Title
				text={activity()?.name ?? ""}
				backTo={`/class/${params.classid}/activities`}
			/>
			<Show when={students.length > 0} fallback={<NoStudentsMessage />}>
				<Table striped="odd" highlightOnHover dense mt="$4">
					<Thead>
						<Tr>
							<Th>Estudiante</Th>
							<Th numeric>Nota / 100</Th>
						</Tr>
					</Thead>
					<Tbody>
						<For each={students}>
							{(student) => (
								<Tr>
									<Td>{`${student.last_name} ${student.name}`}</Td>
									<Td numeric>
										<ScoreCell
											score={scoresMap()[student.id]}
											student_id={student.id}
										/>
									</Td>
								</Tr>
							)}
						</For>
					</Tbody>
				</Table>
			</Show>
		</Box>
	);
};

export default Activity;
