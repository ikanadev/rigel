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
  Heading,
  Flex,
  Button,
  Badge,
  Text,
  Box,
} from '@hope-ui/solid';
import {
  CheckCircleMini,
  UsersMini,
  DocumentDuplicateMini,
  ArrowLeftOnRectMini,
  RectangleStackMini,
} from '@app/icons';
import { Show } from 'solid-js';
import { StartPeriodModal, FinishPeriodModal, ColorModeButton } from '@app/components';
import LinkButton from './LinkButton';

import { JWT_KEY, DEFAULT_CLASS_KEY, EXIT_MESSAGE, APP_VERSION } from '@app/utils/constants';
import { useNavigate } from '@solidjs/router';
import { useAppData } from '@app/context';
import { booleanSignal } from '@app/hooks';
import worker from '@app/utils/worker';
import { db } from '@app/db/dexie';

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Drawer: Component<Props> = (props) => {
  const navigate = useNavigate();
  const newPeriodModal = booleanSignal();
  const finishPeriodModal = booleanSignal();
  const { appState, actions: { setSelectedClass, clearAll } } = useAppData();

  const handleLogout = () => {
    worker.postMessage({ type: EXIT_MESSAGE });
    const clearDb = async (): Promise<void> => {
      await Promise.all(db.tables.map((table) => table.clear()));
      localStorage.removeItem(JWT_KEY);
      localStorage.removeItem(DEFAULT_CLASS_KEY);
    };
    clearDb().finally(() => {
      clearAll();
      props.onClose();
      navigate('/signin');
    });
  };
  const handleGoToClasses = () => {
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
            <Heading color="$primary9" size="xl" fontWeight="$bold">
              RIGEL
            </Heading>
            <Divider mt="$2" />
          </DrawerHeader>

          <DrawerBody>
            <Show
              when={appState.selectedClass !== null}
              fallback={
                <Text fontStyle="italic" color="$neutral11" fontSize="$sm" my="$4">
                  Ninguna materia seleccionada
                </Text>
              }
            >
              <Text size="base" fontWeight="$semibold">{appState.selectedClass!.edges.subject.name}</Text>
              <Flex justifyContent="space-between" alignItems="start" flexWrap="wrap">
                <Text size="sm">{appState.selectedClass!.edges.grade.name}</Text>
                <Badge colorScheme="primary">{appState.selectedClass!.parallel}</Badge>
              </Flex>
              <Text size="sm">
                Periodo:{' '}
                <Text as="span" fontWeight="$semibold" color={appState.activePeriod !== null ? undefined : '$neutral10'}>
                  {appState.activePeriod !== null ? appState.activePeriod.period.name : 'No iniciado'}
                </Text>
              </Text>
              <Text size="sm">Gestión: <Text as="span" fontWeight="$semibold">{appState.selectedClass!.edges.year.value}</Text></Text>
              <Flex justifyContent="end">
                <Show
                  when={appState.activePeriod === null}
                  fallback={
                    <Button
                      compact
                      size="sm"
                      colorScheme="neutral"
                      variant="subtle"
                      onClick={() => {
                        finishPeriodModal.enable();
                        props.onClose();
                      }}
                    >
                      {`Finalizar ${appState.activePeriod!.period.name}`}
                    </Button>
                  }
                >
                  <Button
                    size="sm"
                    colorScheme="success"
                    variant="subtle"
                    compact
                    onClick={() => {
                      newPeriodModal.enable();
                      props.onClose();
                    }}
                  >
                    Iniciar nuevo periodo
                  </Button>
                </Show>
              </Flex>

              <Flex direction="column" mt="$2" gap="$2">
                <Show
                  when={appState.activePeriod !== null}
                  fallback={
                    <Text fontStyle="italic" color="$neutral11" textAlign="center" my="$6">
                      Debe iniciar un periodo para administrar asistencias y tareas.
                    </Text>
                  }
                >
                  <LinkButton
                    text="Asistencia"
                    colorScheme="neutral"
                    // eslint-disable-next-line solid/reactivity
                    onClick={props.onClose}
                    icon={<CheckCircleMini />}
                    href={`/class/${appState.selectedClass!.id}/attendance`}
                  />
                  <LinkButton
                    text="Tareas / Actividades"
                    colorScheme="neutral"
                    // eslint-disable-next-line solid/reactivity
                    onClick={props.onClose}
                    icon={<DocumentDuplicateMini />}
                    href={`/class/${appState.selectedClass!.id}/activities`}
                  />
                </Show>
                <LinkButton
                  text="Estudiantes"
                  colorScheme="neutral"
                  // eslint-disable-next-line solid/reactivity
                  onClick={props.onClose}
                  icon={<UsersMini />}
                  href={`/class/${appState.selectedClass!.id}/students`}
                />
              </Flex>
            </Show>

            <Flex flexDirection="column" gap="$2">
              <Divider my="$3" />
              <Button
                onClick={handleGoToClasses}
                compact
                variant="ghost"
                colorScheme="neutral"
                justifyContent="start"
                leftIcon={<RectangleStackMini />}
              >
                Mis materias
              </Button>
              <Button
                onClick={handleLogout}
                compact
                variant="ghost"
                colorScheme="danger"
                justifyContent="start"
                leftIcon={<ArrowLeftOnRectMini />}
              >
                Cerrar sesión
              </Button>
            </Flex>
          </DrawerBody>

          <DrawerFooter alignItems="center">
            <ColorModeButton />
            <Box flex="1" />
            <Text size="sm" fontWeight="$semibold">{APP_VERSION}</Text>
          </DrawerFooter>
        </DrawerContent>
      </HopeDrawer>
    </>
  );
};

export default Drawer;
