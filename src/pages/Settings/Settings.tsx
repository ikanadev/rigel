import { Component } from 'solid-js';
import { Flex, Text, Switch, useColorMode } from '@hope-ui/solid';
import { Title, ColoredScore, ColorModeButton } from '@app/components';

import { coloredScoresSignal } from '@app/hooks';

const Settings: Component = () => {
  const { coloredScores, toggle } = coloredScoresSignal;
  const { colorMode } = useColorMode();

  return (
    <>
      <Title text="Opciones" />
      <Flex mt="$6" pl="$2" flexDirection="column" gap="$4" maxW="$sm">

        <Flex flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center">
            <Text size="lg">Notas coloridas</Text>
            <Switch checked={coloredScores()} onChange={toggle}>
              {coloredScores() ? 'Activado' : 'Desactivado'}
            </Switch>
          </Flex>
          <Flex justifyContent="end" gap="$2">
            <Text>Ej.</Text>
            <ColoredScore score={40} />
            <ColoredScore score={50} />
            <ColoredScore score={60} />
            <ColoredScore score={70} />
            <ColoredScore score={80} />
            <ColoredScore score={90} />
            <ColoredScore score={100} />
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center">
          <Text size="lg">Tema</Text>
          <Flex justifyContent="space-between" alignItems="center" gap="$2">
            <Text>{colorMode() === 'dark' ? 'Oscuro' : 'Claro'}</Text>
            <ColorModeButton />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Settings;
