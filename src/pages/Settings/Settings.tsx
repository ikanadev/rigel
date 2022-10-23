import { Component } from 'solid-js';
import { Flex, Text, Switch, useColorMode } from '@hope-ui/solid';
import { Title, ColoredScore, ColorModeButton, AttendanceBox } from '@app/components';
import { AttendanceStatus } from '@app/types';

import { coloredScoresSignal, coloredAttendancesSignal } from '@app/hooks';

const Settings: Component = () => {
  const { coloredScores, toggle } = coloredScoresSignal;
  const { coloredAtts, toggle: toggleAtts } = coloredAttendancesSignal;
  const { colorMode } = useColorMode();

  return (
    <>
      <Title text="Opciones" />
      <Flex mt="$6" pl="$2" flexDirection="column" gap="$4" maxW="$sm">

        <Flex flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center">
            <Text>Notas coloridas</Text>
            <Switch checked={coloredScores()} onChange={toggle} size="sm">
              {coloredScores() ? 'Activo' : 'Inactivo'}
            </Switch>
          </Flex>
          <Flex justifyContent="end" gap="$2">
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

        <Flex flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center">
            <Text>Asistencias coloridas</Text>
            <Switch checked={coloredAtts()} onChange={toggleAtts} size="sm">
              {coloredAtts() ? 'Activo' : 'Inactivo'}
            </Switch>
          </Flex>
          <Flex justifyContent="end" gap="$2" alignItems="end">
            <Text fontSize="$sm">Ej.</Text>
            <AttendanceBox status={AttendanceStatus.P} active />
            <AttendanceBox status={AttendanceStatus.F} active />
            <AttendanceBox status={AttendanceStatus.A} active />
            <AttendanceBox status={AttendanceStatus.L} active />
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center">
          <Text>Tema</Text>
          <Flex justifyContent="space-between" alignItems="center" gap="$2">
            <Text fontSize="$sm">{colorMode() === 'dark' ? 'Oscuro' : 'Claro'}</Text>
            <ColorModeButton />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Settings;
