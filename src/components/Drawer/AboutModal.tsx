import { Component } from "solid-js";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	Flex,
	Text,
	Box,
	Heading,
} from "@hope-ui/solid";
import { Logo } from "@app/icons";
import { APP_VERSION, APP_NAME } from "@app/utils/constants";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}
const AboutModal: Component<Props> = (props) => {
	return (
		// eslint-disable-next-line solid/reactivity
		<Modal opened={props.isOpen} onClose={props.onClose} size="xs">
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalHeader>Acerca de</ModalHeader>
				<ModalBody>
					<Flex flexDirection="column" alignItems="center">
						<Box maxW="$28">
							<Logo w="100%" h="auto" />
						</Box>
					</Flex>
					<Flex justifyContent="center" alignItems="end" my="$4">
						<Heading color="$primary10" size="xl" fontWeight="$semibold">
							{APP_NAME}
						</Heading>
						<Text ml="$1">{APP_VERSION}</Text>
					</Flex>
					<Text my="$2" size="sm">
						{APP_NAME} es una Aplicación Web Progresiva pensada para facilitar
						las labores académicas cotidianas de los profesores.
					</Text>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default AboutModal;
