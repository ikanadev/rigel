import { Component, For } from "solid-js";
import { Flex, Text } from "@hope-ui/solid";

import { AttendanceStatus } from "@app/types";
import { AttendanceBox } from "@app/components";

const AttendanceLabels: Component = () => {
	return (
		<Flex gap={{ "@initial": "$2", "@md": "$4" }} alignItems="center">
			<For each={Object.values(AttendanceStatus)}>
				{(value) => (
					<Flex alignItems="center">
						<AttendanceBox status={value} active />
						<Text ml="$1" size="sm">
							{value}
						</Text>
					</Flex>
				)}
			</For>
		</Flex>
	);
};

export default AttendanceLabels;
