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
  Badge,
  Text,
} from '@hope-ui/solid';
import { Link, useNavigate } from '@solidjs/router';
import { Show } from 'solid-js';
import { StartPeriodModal, FinishPeriodModal } from '@app/components';

import { JWT_KEY, DEFAULT_CLASS_KEY } from '@app/utils/constants';
import { useAppData } from '@app/context';
import { booleanSignal } from '@app/hooks';
import { db } from '@app/db/dexie';

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Drawer: Component<Props> = (props) => {
  const navigate = useNavigate();
  const newPeriodModal = booleanSignal();
  const finishPeriodModal = booleanSignal();
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
    <>
      <StartPeriodModal isOpen={newPeriodModal.active()} onClose={newPeriodModal.disable} />
      <FinishPeriodModal isOpen={finishPeriodModal.active()} onClose={finishPeriodModal.disable} />
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
            <Text>{' '}</Text>
          </DrawerHeader>

          <DrawerBody>
            <Show
              when={appState.selectedClass !== null}
              fallback={
                <Text fontStyle="italic" color="$neutral11" textAlign="center" my="$6">
                  Selecciona una materia para administrar
                </Text>
              }
            >
              <Text size="lg" fontWeight="$semibold" color="$primary10">{appState.selectedClass!.edges.subject.name}</Text>
              <Text>{appState.selectedClass!.edges.grade.name}</Text>
              <Text size="lg">Paralelo: <Badge colorScheme="primary" fontSize="$lg">{appState.selectedClass!.parallel}</Badge></Text>
              <Text size="lg">
                Periodo:{' '}
                <Text as="span" fontWeight="$semibold" color={appState.activePeriod !== null ? undefined : '$warning10'}>
                  {appState.activePeriod !== null ? appState.activePeriod.period.name : 'No iniciado'}
                </Text>
              </Text>
              <Text size="lg">Gestión: <Text as="span" fontWeight="$semibold">{appState.selectedClass!.edges.year.value}</Text></Text>
              <Flex direction="column" mt="$6">
                <Show
                  when={appState.activePeriod !== null}
                  fallback={
                    <Text fontStyle="italic" color="$neutral11" textAlign="center" my="$6">
                      Debe iniciar un periodo para administrar asistencias y tareas.
                    </Text>
                  }
                >
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
                  <Button as={Link} href="/" variant="ghost" colorScheme="neutral" justifyContent="start">
                    Tareas / Actividades
                  </Button>
                </Show>
                <Button
                  as={Link}
                  onClick={() => props.onClose()}
                  href={`/class/${appState.selectedClass!.id}/students`}
                  variant="ghost"
                  colorScheme="neutral"
                  justifyContent="start"
                >
                  Administrar Estudiantes
                </Button>

                <Show
                  when={appState.activePeriod === null}
                  fallback={
                    <Button
                      mt="$4"
                      size="sm"
                      colorScheme="danger"
                      onClick={() => {
                        finishPeriodModal.enable();
                        props.onClose();
                      }}
                    >
                      Finalizar periodo
                    </Button>
                  }
                >
                  <Button
                    mt="$4"
                    size="sm"
                    colorScheme="accent"
                    onClick={() => {
                      newPeriodModal.enable();
                      props.onClose();
                    }}
                  >
                    Iniciar nuevo periodo
                  </Button>
                </Show>

              </Flex>
              <Divider mb="$4" mt="$4" />
            </Show>
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
    </>
  );
};

export default Drawer;
