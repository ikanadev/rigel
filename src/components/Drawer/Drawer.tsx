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

import { JWT_KEY, DEFAULT_CLASS_KEY } from '@app/utils/constants';
import { useAppData } from '@app/context';
import { db } from '@app/db/dexie';

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Drawer: Component<Props> = (props) => {
  const navigate = useNavigate();
  const { appState, actions: { setSelectedClass } } = useAppData();

  const handleLogout = () => {
    const clearAll = async (): Promise<void> => {
      await Promise.all(db.tables.map((table) => table.clear()));
      localStorage.removeItem(JWT_KEY);
      localStorage.removeItem(DEFAULT_CLASS_KEY);
    };
    clearAll().finally(() => {
      props.onClose();
      navigate('/signin');
    });
  };
  const handleGoToClasses = () => {
    localStorage.removeItem(DEFAULT_CLASS_KEY);
    setSelectedClass(null);
    props.onClose();
    navigate('/');
  };

  return (
    <HopeDrawer
      size="md"
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
          <Show when={appState.selectedClass !== null}>
            <Flex direction="column" mt="$4">
              <Button
                as={Link}
                onClick={() => props.onClose()}
                href={`/class/${appState.selectedClass!.id}/attendance`}
                variant="ghost"
                colorScheme="neutral"
                justifyContent="start"
              >
                Asistencia
              </Button>
              <Button
                as={Link}
                onClick={() => props.onClose()}
                href={`/class/${appState.selectedClass!.id}/students`}
                variant="ghost"
                colorScheme="neutral"
                justifyContent="start"
              >
                Estudiantes
              </Button>
              <Button as={Link} href="/" variant="ghost" colorScheme="neutral" justifyContent="start">
                Tareas / Actividades
              </Button>
            </Flex>
          </Show>
          <Divider mb="$4" mt="$4" />
          <Flex flexDirection="column">
            <Button onClick={handleGoToClasses} variant="ghost" colorScheme="neutral" justifyContent="start">
              Ver todas mis materias
            </Button>
            <Button onClick={handleLogout} variant="ghost" colorScheme="danger" justifyContent="start">
              Cerrar sesión
            </Button>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Text>Some body text</Text>
        </DrawerFooter>
      </DrawerContent>
    </HopeDrawer>
  );
};

export default Drawer;
