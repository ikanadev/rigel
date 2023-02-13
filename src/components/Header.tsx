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

import { APP_NAME } from '@app/utils/constants';

const Home: Component<{ openDrawer: () => void }> = (props) => {
  return (
    <Box shadow="$md">
      <Container px={{ '@initial': '$2', '@md': '$4' }} py="$2">
        <Flex alignItems="center" flexWrap="wrap">
          <IconButton
            aria-label="Abrir menu"
            icon={<Bars3 />}
            variant="subtle"
            size="sm"
            minW="$8"
            onClick={() => props.openDrawer()}
          />
          <Heading color="$primary9" size="lg" ml="$2" display={{ '@initial': 'none', '@md': 'block' }}>
            {APP_NAME}
          </Heading>
          <Flex flex="1" justifyContent="end">
            <Box>
              <ClassSelector />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Home;
