import { Component, createSignal, splitProps } from 'solid-js';
import {
  Modal,
  ModalProps,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Text,
  Button,
} from '@hope-ui/solid';
import { Alert } from '@app/components';
import { Student } from '@app/types';

import { deleteStudent } from '@app/db/student';

const DeleteModal: Component<ModalProps & { student: Student | null }> = (props) => {
  const [studentProp, modalProps] = splitProps(props, ['student']);
  const [errMsg, setErrMsg] = createSignal('');

  const handleDelete = () => {
    if (studentProp.student === null) return;
    deleteStudent(studentProp.student.id)
      .then(() => {
        props.onClose();
      })
      .catch(() => {
        setErrMsg('Error borrando estudiante');
      });
  };

  return (
    <Modal {...modalProps} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>¿Borrar estudiante {studentProp.student?.name}?</ModalHeader>
        <ModalBody>
          <Alert text={errMsg()} setText={setErrMsg} status="danger" />
          <Text>Se eliminarán todas las asistencias y notas del estudiante.</Text>
        </ModalBody>
        <ModalFooter>
          {/* eslint-disable-next-line solid/reactivity */}
          <Button colorScheme="neutral" size="sm" onClick={modalProps.onClose}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} colorScheme="success" size="sm" ml="$2">
            Borrar estudiante
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
