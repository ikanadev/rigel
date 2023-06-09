import { Component } from "solid-js";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	Anchor,
	Flex,
	Text,
} from "@hope-ui/solid";
import { Gmail, Telegram } from "@app/icons";

import { TELEGRAM_LINK, APP_EMAIL } from "@app/utils/constants";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}
const ContactModal: Component<Props> = (props) => {
	return (
		// eslint-disable-next-line solid/reactivity
		<Modal opened={props.isOpen} onClose={props.onClose} size="xs">
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalHeader>Contacto</ModalHeader>
				<ModalBody>
					<Text size="sm" fontFamily="$mono">
						👋 Hola, puedes contactarte con nosotros a través del canal de
						Telegram o por Gmail:
					</Text>
					<Flex flexDirection="column" alignItems="center" gap="$4" my="$4">
						<Anchor
							target="_blank"
							href={TELEGRAM_LINK}
							display="flex"
							alignItems="end"
						>
							<Telegram w="$6" h="$6" />
							<Text ml="$1_5" textDecoration="underline">
								Telegram
							</Text>
						</Anchor>
						<Anchor
							target="_blank"
							href={`mailto:${APP_EMAIL}`}
							display="flex"
							alignItems="end"
						>
							<Gmail w="$6" h="$6" />
							<Text ml="$1_5" textDecoration="underline">
								Gmail
							</Text>
						</Anchor>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ContactModal;
