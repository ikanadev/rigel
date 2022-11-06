import { Component, For, Show, createSignal } from 'solid-js';
import {
  Modal,
  ModalProps,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  SimpleSelect,
  SimpleOption,
  Text,
  Flex,
  Button,
} from '@hope-ui/solid';
import { Alert } from '@app/components';

import { useAppData } from '@app/context';
import { createDexieArrayQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';
import { addStudents } from '@app/db/student';

const CopyStudentsModal: Component<ModalProps> = (props) => {
  const [classId, setClassId] = createSignal('');
  const [errMsg, setErrMsg] = createSignal('');
  const { classStore } = useAppData();
  const classes = createDexieArrayQuery(() => db.classes.toArray());
  const students = createDexieArrayQuery(() => db.students.where({ class_id: classId() }).toArray());
  const otherClasses = () => classes.filter(c => c.id !== classStore.class?.id);

  const handleAdd = () => {
    if (classStore.class === null) return;
    addStudents(students, classStore.class.id)
      .then(() => {
        props.onClose();
      })
      .catch(() => {
        setErrMsg('Error registrando estudiantes');
      });
  };

  return (
    <Modal {...props} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Copias estudiantes de otra materia</ModalHeader>
        <ModalBody>
          <Text mb="$1">Copiar de:</Text>
          <SimpleSelect value={classId} onChange={setClassId} size="sm" placeholder="Selecciona materia" mb="$2">
            <For each={otherClasses()}>{cl => (
              <SimpleOption value={cl.id} textValue={`${cl.subject.name}, ${cl.grade.name} - ${cl.parallel}`}>
                <Flex flexDirection="column" fontSize="$sm" lineHeight={1.2}>
                  <Text>{cl.subject.name}</Text>
                  <Text>{cl.grade.name} - {cl.parallel}</Text>
                </Flex>
              </SimpleOption>
            )}</For>
          </SimpleSelect>
          <Alert status="danger" text={errMsg()} setText={setErrMsg} />
          <Show when={students.length === 0 && classId().length > 0}>
            <Alert status="warning" text="No hay estudiantes en esta materia." />
          </Show>
        </ModalBody>
        <ModalFooter>
          {/* eslint-disable-next-line solid/reactivity */}
          <Button colorScheme="neutral" size="sm" onClick={props.onClose}>
            Cancelar
          </Button>
          <Show when={students.length > 0 && classId().length > 0}>
            <Button onClick={handleAdd} colorScheme="success" size="sm" ml="$2">
              Copiar {students.length} estudiantes
            </Button>
          </Show>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CopyStudentsModal;
