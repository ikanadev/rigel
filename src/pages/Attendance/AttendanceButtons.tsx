import { Component, For } from "solid-js";
import { Flex, Button } from "@hope-ui/solid";
import { AttendanceBox } from "@app/components";

import { AttendanceStatus } from "@app/types";

interface Props {
	status?: AttendanceStatus;
	onSelect: (status: AttendanceStatus) => void;
}
const AttendanceButtons: Component<Props> = (props) => {
	return (
		<Flex alignItems="center" gap="$3">
			<For each={Object.values(AttendanceStatus)}>
				{(value) => (
					<Button
						size="xs"
						variant="ghost"
						onClick={[props.onSelect, value]}
						_hover={{ background: "$neutral2" }}
						_focus={{ boxShadow: "none" }}
						transform={value === props.status ? "scale(1.3)" : "scale(1)"}
						transition="all 0.5s"
						px={0}
					>
						<AttendanceBox status={value} active={value === props.status} />
					</Button>
				)}
			</For>
		</Flex>
	);
};

export default AttendanceButtons;
