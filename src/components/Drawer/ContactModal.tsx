import { Component } from 'solid-js';
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
} from '@hope-ui/solid';
import { Gmail, Telegram } from '@app/icons';

interface Props {
  isOpen: boolean
  onClose: () => void
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
            👋{' '}
            Hola, soy Kevin, el desarrollador de la WebApp, si tienes algún problema, duda o sugerencia, puedes contactarme por:
          </Text>
          <Flex flexDirection="column" alignItems="center" gap="$4" my="$4">
            <Anchor target="_blank" href="https://t.me/vmkevv" display="flex" alignItems="end">
              <Telegram w="$6" h="$6" />
              <Text ml="$1_5" textDecoration="underline">Telegram</Text>
            </Anchor>
            <Anchor target="_blank" href="mailto:vargaskevv@gmail.com" display="flex" alignItems="end">
              <Gmail w="$6" h="$6" />
              <Text ml="$1_5" textDecoration="underline">Gmail</Text>
            </Anchor>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ContactModal;
