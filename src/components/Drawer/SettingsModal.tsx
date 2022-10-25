import { Component, Show } from 'solid-js';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Switch,
  RadioGroup,
  Radio,
  useColorMode,
} from '@hope-ui/solid';
import { ColoredScore, ColorModeButton, AttendanceBox } from '@app/components';
import { AttendanceStatus } from '@app/types';

import { coloredScoresSignal, coloredAttendancesSignal, fontSizeStore } from '@app/hooks';

interface Props {
  isOpen: boolean
  onClose: () => void
}
const SettingsModal: Component<Props> = (props) => {
  const { coloredScores, toggle } = coloredScoresSignal;
  const { fontStore, setFontSize } = fontSizeStore;
  const { coloredAtts, toggle: toggleAtts } = coloredAttendancesSignal;
  const { colorMode } = useColorMode();
  return (
    // eslint-disable-next-line solid/reactivity
    <Modal opened={props.isOpen} onClose={props.onClose} size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Opciones</ModalHeader>
        <ModalBody>
          <Flex mt="$4" pl="$2" flexDirection="column" gap="$5" maxW="$sm">

            <Flex flexDirection="column" alignItems="end">
              <Switch fontWeight="$semibold" checked={coloredScores()} onChange={toggle} size="sm">
                Notas coloridas
              </Switch>
              <Flex gap="$2">
                <Text fontSize="$sm">Ej.</Text>
                <ColoredScore score={40} />
                <ColoredScore score={50} />
                <ColoredScore score={60} />
                <ColoredScore score={70} />
                <ColoredScore score={80} />
                <ColoredScore score={90} />
                <ColoredScore score={100} />
              </Flex>
            </Flex>

            <Flex flexDirection="column" alignItems="end">
              <Switch fontWeight="$semibold" checked={coloredAtts()} onChange={toggleAtts} size="sm">
                Asistencias coloridas
              </Switch>
              <Flex gap="$2" alignItems="end">
                <Text fontSize="$sm">Ej.</Text>
                <AttendanceBox status={AttendanceStatus.P} active />
                <AttendanceBox status={AttendanceStatus.F} active />
                <AttendanceBox status={AttendanceStatus.A} active />
                <AttendanceBox status={AttendanceStatus.L} active />
              </Flex>
            </Flex>

            <Show when={fontStore.valid}>
              <Flex flexDirection="column" alignItems="end">
                <Text fontSize="$sm" fontWeight="$semibold">Tamaño de texto</Text>
                <RadioGroup value={fontStore.activeSize} onChange={val => setFontSize(parseInt(val))} size="sm">
                  <Flex flexDirection="column" gap="$1">
                    <Radio value={fontStore.sizes.sm} labelPlacement="start">Pequeño</Radio>
                    <Radio value={fontStore.sizes.md} labelPlacement="start">Mediano</Radio>
                    <Radio value={fontStore.sizes.lg} labelPlacement="start">Grande</Radio>
                    <Radio value={fontStore.sizes.xl} labelPlacement="start">Extra Grande</Radio>
                  </Flex>
                </RadioGroup>
              </Flex>
            </Show>

            <Flex alignItems="center" justifyContent="end" mb="$4">
              <Text fontSize="$sm" mr="$2" fontWeight="$semibold">
                {colorMode() === 'dark' ? 'Tema oscuro' : 'Tema claro'}
              </Text>
              <ColorModeButton />
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
