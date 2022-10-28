import { Component, For, createSignal } from 'solid-js';
import {
  Modal,
  ModalProps,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  SimpleSelect,
  SimpleOption,
  Text,
  Flex,
} from '@hope-ui/solid';

import { useAppData } from '@app/context';
import { createDexieArrayQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

const CopyStudentsModal: Component<ModalProps> = (props) => {
  const [classId, setClassId] = createSignal('');
  const { classStore } = useAppData();
  const classes = createDexieArrayQuery(() => db.classes.toArray());
  const otherClasses = () => classes.filter(c => c.id !== classStore.class?.id);

  return (
    <Modal {...props} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Copias estudiantes de otra materia</ModalHeader>
        <ModalBody>
          <Text>Copiar de:</Text>
          <SimpleSelect value={classId} onChange={setClassId} size="sm" placeholder="Selecciona materia">
            <For each={otherClasses()}>{cl => (
              <SimpleOption value={cl.id} textValue={`${cl.subject.name}, ${cl.grade.name} - ${cl.parallel}`}>
                <Flex flexDirection="column" fontSize="$sm" lineHeight={1.2}>
                  <Text>{cl.subject.name}</Text>
                  <Text>{cl.grade.name} - {cl.parallel}</Text>
                </Flex>
              </SimpleOption>
            )}</For>
          </SimpleSelect>
          <Text>{classId()}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CopyStudentsModal;
