import { Component, For } from "solid-js";
import { Tbody, Tr, Td, Text, Flex } from "@hope-ui/solid";
import { AttendanceBox } from "@app/components";

import { StudentWithAtts, ClassPeriodWithAttDays } from "./types";

interface Props {
	showDays: boolean;
	students: StudentWithAtts[];
	classPeriods: ClassPeriodWithAttDays[];
}
const TableBody: Component<Props> = (ps) => {
	return (
		<Tbody>
			<For each={ps.students}>
				{(student) => (
					<Tr>
						<Td bgColor="$background" p="$0_5" pos="sticky" left={0}>
							<Flex
								lineHeight={1}
								flexDirection={{ "@initial": "column", "@md": "row" }}
							>
								<Text textAlign="right" css={{ whiteSpace: "nowrap" }} mr="$1">
									{student.last_name}
								</Text>
								<Text textAlign="right" css={{ whiteSpace: "nowrap" }}>
									{student.name}
								</Text>
							</Flex>
						</Td>
						<For each={ps.classPeriods}>
							{(classPeriod, classPeriodIndex) => (
								<>
									<For each={classPeriod.attDays}>
										{(attDay, attDayIndex) => (
											<Td
												px="$1"
												borderLeft={
													attDayIndex() === 0
														? "3px solid $neutral4"
														: undefined
												}
												display={!ps.showDays ? "none" : undefined}
											>
												<Flex display="flex" justifyContent="center">
													<AttendanceBox
														status={student.attsMap[attDay.id]?.value}
														active
													/>
												</Flex>
											</Td>
										)}
									</For>
									<Td
										textAlign="center"
										borderLeft={
											classPeriod.attDays.length === 0 || !ps.showDays
												? "3px solid $neutral4"
												: undefined
										}
									>
										{student.periodAtts[classPeriodIndex()].Presente}
									</Td>
									<Td textAlign="center">
										{student.periodAtts[classPeriodIndex()].Falta}
									</Td>
									<Td textAlign="center">
										{student.periodAtts[classPeriodIndex()].Atraso}
									</Td>
									<Td textAlign="center">
										{student.periodAtts[classPeriodIndex()].Licencia}
									</Td>
								</>
							)}
						</For>
						<Td
							fontWeight="$bold"
							bg="$success2"
							color="$success10"
							textAlign="center"
							borderLeft="3px solid $neutral4"
						>
							{student.yearAtts.Presente}
						</Td>
						<Td
							fontWeight="$bold"
							bg="$danger2"
							color="$danger10"
							textAlign="center"
						>
							{student.yearAtts.Falta}
						</Td>
						<Td
							fontWeight="$bold"
							bg="$warning2"
							color="$warning10"
							textAlign="center"
						>
							{student.yearAtts.Atraso}
						</Td>
						<Td
							fontWeight="$bold"
							bg="$info2"
							color="$info10"
							textAlign="center"
						>
							{student.yearAtts.Licencia}
						</Td>
					</Tr>
				)}
			</For>
		</Tbody>
	);
};

export default TableBody;
