import { Component } from 'solid-js';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Table,
  ModalCloseButton,
  Box,
} from '@hope-ui/solid';
import { ClassPeriodWithAttDays, StudentWithAtts } from './types';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

interface Props {
  classPeriods: ClassPeriodWithAttDays[]
  students: StudentWithAtts[]
  isOpen: boolean
  onClose: () => void
  showDays: boolean
}
const FullModal: Component<Props> = (props) => {
  return (
    // eslint-disable-next-line solid/reactivity
    <Modal opened={props.isOpen} onClose={props.onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton zIndex={5} border="1px solid $neutral8" />
        <Box maxW="$full" maxH="$screenH" overflow="auto">
          <Table dense css={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHeader classPeriods={props.classPeriods} showDays={props.showDays} sticky />
            <TableBody classPeriods={props.classPeriods} students={props.students} showDays={props.showDays} />
          </Table>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default FullModal;
