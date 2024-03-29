import { Component, For, Show } from "solid-js";
import { ColoredScore } from "@app/components";
import { Flex, Tbody, Tr, Td, Text } from "@hope-ui/solid";
import { StudentWithScores, ClassPeriodWithActs, ViewMode } from "./types";

interface Props {
	classPeriods: ClassPeriodWithActs[];
	students: StudentWithScores[];
	viewMode: ViewMode;
}
const TableBody: Component<Props> = (props) => {
	return (
		<Tbody>
			<For each={props.students}>
				{(student) => (
					<Tr>
						<Td
							bg={student.yearScore <= 50 ? "$danger3" : "$success3"}
							pos="sticky"
							left={0}
							color={student.yearScore <= 50 ? "$danger11" : "$success11"}
						>
							<Flex
								flexDirection={{ "@initial": "column", "@md": "row" }}
								gap={{ "@initial": 0, "@md": "$1" }}
								lineHeight={1}
							>
								<Text css={{ whiteSpace: "nowrap" }}>{student.last_name}</Text>
								<Text css={{ whiteSpace: "nowrap" }}>{student.name}</Text>
							</Flex>
						</Td>
						<For each={props.classPeriods}>
							{(classPeriod, periodIndex) => (
								<>
									<Show when={props.viewMode !== ViewMode.Period}>
										<For each={classPeriod.areas}>
											{(area, areaIndex) => (
												<>
													<Show when={props.viewMode === ViewMode.Activity}>
														<For each={area.acts}>
															{(act) => (
																<Td
																	borderLeft={
																		areaIndex() === 0
																			? "3px solid $neutral4"
																			: undefined
																	}
																>
																	<Show
																		when={student.scoresMap[act.id]}
																		fallback={<Text textAlign="center">-</Text>}
																	>
																		<ColoredScore
																			score={student.scoresMap[act.id].points}
																			fontSize="$sm"
																			fontWeight="$normal"
																			textAlign="center"
																		/>
																	</Show>
																</Td>
															)}
														</For>
													</Show>
													<Td
														borderLeft={
															props.viewMode === ViewMode.Area &&
															areaIndex() === 0
																? "3px solid $neutral4"
																: undefined
														}
													>
														<Text textAlign="center" fontWeight="$normal">
															{student.areaScores[periodIndex()][areaIndex()]}
														</Text>
													</Td>
												</>
											)}
										</For>
									</Show>
									<Td>
										<ColoredScore
											score={student.periodScores[periodIndex()]}
											fontWeight="$semibold"
											fontSize="$base"
											textAlign="center"
										/>
									</Td>
								</>
							)}
						</For>
						<Td
							borderLeft="3px solid $neutral4"
							bg={student.yearScore <= 50 ? "$danger2" : "$success2"}
						>
							<ColoredScore
								score={student.yearScore}
								fontWeight="$bold"
								fontSize="$lg"
								textAlign="center"
							/>
						</Td>
						<Td
							bg={student.yearScore <= 50 ? "$danger2" : "$success2"}
							color={student.yearScore <= 50 ? "$danger8" : "$success8"}
						>
							<Text>{student.yearScore <= 50 ? "REPROBADO" : "APROBADO"}</Text>
						</Td>
					</Tr>
				)}
			</For>
		</Tbody>
	);
};

export default TableBody;
