import { Component } from 'solid-js';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@hope-ui/solid';
import { Alert } from '@app/components';

import { useAppData } from '@app/context';
import { finishClassPeriod } from '@app/db/classPeriod';

interface Props {
  isOpen: boolean
  onClose: () => void
}
const FinishPeriodModal: Component<Props> = (props) => {
  const { appState } = useAppData();

  const onFinish = () => {
    const activePeriod = appState.activePeriod;
    if (activePeriod === null) return;
    finishClassPeriod({
      id: activePeriod.id,
      finished: true,
      end: Date.now(),
    }).then(() => {
      props.onClose();
    }).catch((err) => {
      // TODO: handle fatal error
      console.log('Error: ', err);
    });
  };

  return (
    <Modal centered opened={props.isOpen} onClose={() => props.onClose()} size="sm">
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
          <Button colorScheme="neutral" size="sm" mr="$2" onClick={() => props.onClose()}>
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
