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

const AppErrorModal: Component = () => {
	const { errMsg, clearError } = errorSignal;
	return (
		<Modal centered opened={errMsg().length > 0} onClose={clearError} size="sm">
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalHeader>Error Inesperado</ModalHeader>
				<ModalBody>
					<Alert status="danger" text={errMsg()} />
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="neutral" size="sm" onClick={clearError}>
						Cerrar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AppErrorModal;
