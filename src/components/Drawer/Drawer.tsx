import type { Component } from 'solid-js';

import {
  Drawer as HopeDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Divider,
  Flex,
  Button,
  Text,
//  Box,
} from '@hope-ui/solid';
import { Link, useNavigate } from '@solidjs/router';
import { Show } from 'solid-js';
import { ClassSelector } from '@app/components';

import { JWT_KEY } from '@app/utils/constants';
import { useAppData } from '@app/context';
import { db } from '@app/db/dexie';

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Drawer: Component<Props> = (props) => {
  const navigate = useNavigate();
  const { appState } = useAppData();

  const handleLogout = () => {
    const clearAll = async (): Promise<void> => {
      await Promise.all(db.tables.map((table) => table.clear()));
      localStorage.removeItem(JWT_KEY);
    };
    clearAll().finally(() => {
      navigate('/signin');
    });
  };

  return (
    <HopeDrawer
      opened={props.isOpen}
      placement="left"
      onClose={() => props.onClose()}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text color="$primary10" fontWeight="$semibold">Rigel</Text>
        </DrawerHeader>

        <DrawerBody>
          <ClassSelector />
          <Divider mb="$4" mt="$4" />
          <Show when={appState.selectedClass}>
            {JSON.stringify(appState.selectedClass).length}
          </Show>
          <Divider mb="$4" />
          <Flex direction="column">
            <Button as={Link} href="/" variant="ghost" colorScheme="neutral" justifyContent="start">
              Asistencia
            </Button>
            <Button as={Link} href="/" variant="ghost" colorScheme="neutral" justifyContent="start">
              Estudiantes
            </Button>
            <Button as={Link} href="/" variant="ghost" colorScheme="neutral" justifyContent="start">
              Tareas / Actividades
            </Button>
          </Flex>
          <Divider mb="$4" mt="$4" />
            <Button onClick={handleLogout} variant="ghost" colorScheme="danger" justifyContent="start">
              Cerrar sesión
            </Button>
        </DrawerBody>

        <DrawerFooter>
          <Text>Some body text</Text>
        </DrawerFooter>
      </DrawerContent>
    </HopeDrawer>
  );
};

export default Drawer;
