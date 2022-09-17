import { Component } from 'solid-js';

import {
  Box,
  Container,
  Heading,
  Flex,
  IconButton,
} from '@hope-ui/solid';
import { ClassSelector } from '@app/components';
import { Bars3 } from '@app/icons';

const Home: Component<{ openDrawer: () => void }> = (props) => {
  return (
    <Box shadow="$md">
      <Container p="$4" py="$2">
        <Flex alignItems="center">
          <IconButton
            aria-label="Abrir menu"
            icon={<Bars3 />}
            variant="subtle"
            size="sm"
            onClick={() => props.openDrawer()}
          />
          <Heading color="$primary9" size="lg" ml="$2">
            Rigel
          </Heading>
          <Box flex="1" />
          <Box maxW="$96" flex="4">
            <ClassSelector />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Home;
