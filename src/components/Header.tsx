import { Component, Show } from 'solid-js';

import {
  Box,
  Container,
  Heading,
  Flex,
  Button,
  IconButton,
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from '@hope-ui/solid';
import { ColorModeButton } from '@app/components';
import { Bars3, ChevronDown } from '@app/icons';

import { createDexieSignalQuery } from 'solid-dexie';
import { useNavigate } from '@solidjs/router';
import { db } from '@app/db/dexie';
import { JWT_KEY } from '@app/utils/constants';

const Home: Component = () => {
  const navigate = useNavigate();
  const teacher = createDexieSignalQuery(() => db.teachers.toCollection().first());

  const handleLogout = (): void => {
    const clearAll = async (): Promise<void> => {
      await Promise.all(db.tables.map((table) => table.clear()));
      localStorage.removeItem(JWT_KEY);
    };
    clearAll().finally(() => {
      navigate('/signin');
    });
  };

  return (
    <Box shadow="$md">
      <Container p="$4" py="$2">
        <Flex alignItems="center">
          <IconButton
            aria-label="Abrir menu"
            icon={<Bars3 />}
            variant="subtle"
            size="sm"
          />
          <Heading color="$primary9" size="lg" ml="$2">
            Rigel
          </Heading>
          <Box flex="1" />
          <ColorModeButton mr="$2" size="sm" />
          <Show when={teacher() !== undefined}>
            <Menu>
              <MenuTrigger as={Button} variant="dashed" size="sm" rightIcon={<ChevronDown w="$4" h="$4" />}>
                {teacher()?.name}
              </MenuTrigger>
              <MenuContent minW="$40">
                <MenuItem onSelect={handleLogout} fontSize="$sm" p="$1">
                  Cerrar sesión
                </MenuItem>
              </MenuContent>
            </Menu>
          </Show>
        </Flex>
      </Container>
    </Box>
  );
};

export default Home;
