import { Component } from "solid-js";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	Table,
	ModalCloseButton,
	Box,
} from "@hope-ui/solid";
import { ClassPeriodWithActs, StudentWithScores, ViewMode } from "./types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

interface Props {
	classPeriods: ClassPeriodWithActs[];
	students: StudentWithScores[];
	isOpen: boolean;
	onClose: () => void;
	viewMode: ViewMode;
}
const FullModal: Component<Props> = (props) => {
	return (
		<>
			{/* eslint-disable-next-line solid/reactivity */}
			<Modal opened={props.isOpen} onClose={props.onClose} size="full">
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton
						zIndex={5}
						bgColor="$background"
						border="1px solid $neutral8"
					/>
					<Box maxW="$full" maxH="$screenH" overflow="auto">
						<Table dense css={{ borderCollapse: "separate", borderSpacing: 0 }}>
							<TableHeader
								classPeriods={props.classPeriods}
								viewMode={props.viewMode}
								sticky
							/>
							<TableBody
								classPeriods={props.classPeriods}
								students={props.students}
								viewMode={props.viewMode}
							/>
						</Table>
					</Box>
				</ModalContent>
			</Modal>
		</>
	);
};

export default FullModal;
