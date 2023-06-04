import { Component } from "solid-js";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@hope-ui/solid";
import { Alert } from "@app/components";

import { errorSignal } from "@app/hooks";
import { useAppData } from "@app/context";
import { finishClassPeriod } from "@app/db/classPeriod";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}
const FinishPeriodModal: Component<Props> = (props) => {
	const { reportError } = errorSignal;
	const { classStore } = useAppData();

	const onFinish = () => {
		const activePeriod = classStore.classPeriod;
		if (activePeriod === null) return;
		finishClassPeriod({
			id: activePeriod.id,
			finished: true,
			end: Date.now(),
		})
			.then(() => {
				props.onClose();
			})
			.catch((err) => {
				void reportError("Finishing period", err);
			});
	};

	return (
		<Modal
			centered
			opened={props.isOpen}
			onClose={() => props.onClose()}
			size="sm"
		>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalHeader>¿Finalizar periodo?</ModalHeader>
				<ModalBody>
					<Alert
						status="warning"
						text="Luego de finalizar el periodo, ya no podrá modificar notas ni registrar asistencias."
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="neutral"
						size="sm"
						mr="$2"
						onClick={() => props.onClose()}
					>
						Cancelar
					</Button>
					<Button colorScheme="danger" size="sm" onClick={onFinish}>
						Finalizar Periodo
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default FinishPeriodModal;
