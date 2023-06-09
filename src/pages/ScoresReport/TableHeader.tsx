import { Component, For, Show } from "solid-js";
import { Tooltip, Thead, Tr, Th, Td, Text } from "@hope-ui/solid";
import { ClassPeriodWithActs, ViewMode } from "./types";

interface Props {
	classPeriods: ClassPeriodWithActs[];
	sticky?: boolean;
	viewMode: ViewMode;
}
const TableHeader: Component<Props> = (props) => {
	return (
		<Thead
			pos={props.sticky === true ? "sticky" : undefined}
			top={0}
			bgColor="$background"
			shadow="$sm"
			zIndex={2}
		>
			<Tr>
				<Th rowSpan={3} pos="sticky" left={0} bgColor="$background">
					Nombre(s) y Apellido(s)
				</Th>
				<For each={props.classPeriods}>
					{(classPeriod) => (
						<Th
							colSpan={
								classPeriod.areas.reduce(
									(res, area) => {
										if (props.viewMode === ViewMode.Period) {
											return res;
										}
										// average
										if (props.viewMode === ViewMode.Area) {
											return res + 1;
										}
										// activities + average
										return (
											res + (area.acts.length > 0 ? area.acts.length + 1 : 1)
										);
									},
									0,
									// + final
								) + 1
							}
							borderBottom="none"
							textAlign="center"
							borderLeft="3px solid $neutral4"
						>
							{classPeriod.period.name}
						</Th>
					)}
				</For>
				<Th rowSpan={3} colSpan={2} borderLeft="3px solid $neutral4">
					<Text fontWeight="$bold" textAlign="center">
						Nota Final
					</Text>
				</Th>
			</Tr>

			<Tr>
				<For each={props.classPeriods}>
					{(classPeriod) => (
						<>
							<Show when={props.viewMode !== ViewMode.Period}>
								<For each={classPeriod.areas}>
									{(area, areaIndex) => (
										<Th
											colSpan={
												props.viewMode === ViewMode.Activity
													? area.acts.length > 0
														? area.acts.length + 1
														: 1
													: 1
											}
											borderBottom="none"
											textAlign="center"
											borderLeft={
												areaIndex() === 0
													? "3px solid $neutral4"
													: "1.5px solid $neutral4"
											}
											fontSize="$2xs"
											fontWeight="$normal"
											lineHeight={1}
											css={{ whiteSpace: "pre-wrap" }}
										>
											{`${area.name}\n${area.points}`}
										</Th>
									)}
								</For>
							</Show>
							<Th
								rowSpan={2}
								fontSize="$xs"
								borderLeft="1.5px solid $neutral4"
								textAlign="center"
							>
								Nota
							</Th>
						</>
					)}
				</For>
			</Tr>

			<Tr>
				<Show when={props.viewMode !== ViewMode.Period}>
					<For each={props.classPeriods}>
						{(classPeriod) => (
							<For each={classPeriod.areas}>
								{(area, areaIndex) => (
									<>
										<Show when={props.viewMode === ViewMode.Activity}>
											<For each={area.acts}>
												{(act, i) => (
													<Td
														borderLeft={
															i() === 0
																? `${
																		areaIndex() === 0 ? "3" : "1.5"
																  }px solid $neutral4`
																: undefined
														}
													>
														<Tooltip label={act.name}>
															<Text textAlign="center" noOfLines={2} size="xs">
																{act.name}
															</Text>
														</Tooltip>
													</Td>
												)}
											</For>
										</Show>
										<Th borderLeft="1.5px solid $neutral4">
											<Text fontSize="$2xs">Promedio</Text>
										</Th>
									</>
								)}
							</For>
						)}
					</For>
				</Show>
			</Tr>
		</Thead>
	);
};

export default TableHeader;
