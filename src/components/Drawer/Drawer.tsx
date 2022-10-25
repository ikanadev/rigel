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
  Cog6Mini,
  ClipboardDocumentCheckMini,
  ClipboardDocumentListMini,
} from '@app/icons';
import { Show } from 'solid-js';
import { StartPeriodModal, FinishPeriodModal } from '@app/components';
import LinkButton from './LinkButton';
import AboutModal from './AboutModal';
import ContactModal from './ContactModal';
import LogoutModal from './LogoutModal';
import SettingsModal from './SettingsModal';

import { APP_VERSION } from '@app/utils/constants';
import { useNavigate } from '@solidjs/router';
import { useAppData } from '@app/context';
import { booleanSignal } from '@app/hooks';

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Drawer: Component<Props> = (props) => {
  const navigate = useNavigate();
  const aboutModal = booleanSignal();
  const logoutModal = booleanSignal();
  const contactModal = booleanSignal();
  const settingsModal = booleanSignal();
  const newPeriodModal = booleanSignal();
  const finishPeriodModal = booleanSignal();
  const { classStore, actions: { setSelectedClass } } = useAppData();

  const openLogout = () => {
    props.onClose();
    logoutModal.enable();
  };
  const openAbout = () => {
    props.onClose();
    aboutModal.enable();
  };
  const openContact = () => {
    props.onClose();
    contactModal.enable();
  };
  const openSettings = () => {
    props.onClose();
    settingsModal.enable();
  };

  const handleGoToClasses = () => {
    setSelectedClass(null);
    props.onClose();
    navigate('/');
  };

  return (
    <>
      <StartPeriodModal isOpen={newPeriodModal.isActive()} onClose={newPeriodModal.disable} />
      <FinishPeriodModal isOpen={finishPeriodModal.isActive()} onClose={finishPeriodModal.disable} />
      <AboutModal isOpen={aboutModal.isActive()} onClose={aboutModal.disable} />
      <ContactModal isOpen={contactModal.isActive()} onClose={contactModal.disable} />
      <LogoutModal isOpen={logoutModal.isActive()} onClose={logoutModal.disable} />
      <SettingsModal isOpen={settingsModal.isActive()} onClose={settingsModal.disable} />

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
              when={classStore.class !== null}
              fallback={
                <Text fontStyle="italic" color="$neutral11" fontSize="$sm" my="$4">
                  Ninguna materia seleccionada
                </Text>
              }
            >
              <Text size="base" fontWeight="$semibold">{classStore.class!.subject.name}</Text>
              <Flex justifyContent="space-between" alignItems="start" flexWrap="wrap">
                <Text size="sm">{classStore.class!.grade.name}</Text>
                <Badge colorScheme="primary">{classStore.class!.parallel}</Badge>
              </Flex>
              <Text size="sm">
                Periodo:{' '}
                <Text as="span" fontWeight="$semibold" color={classStore.classPeriod !== null ? undefined : '$neutral10'}>
                  {classStore.classPeriod !== null ? classStore.classPeriod.period.name : 'No iniciado'}
                </Text>
              </Text>
              <Text size="sm">Gestión: <Text as="span" fontWeight="$semibold">{classStore.class!.year.value}</Text></Text>
              <Flex justifyContent="end">
                <Show
                  when={classStore.classPeriod === null}
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
                      {`Finalizar ${classStore.classPeriod!.period.name}`}
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
                  when={classStore.classPeriod !== null}
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
                    href={`/class/${classStore.class!.id}/attendance`}
                  />
                  <LinkButton
                    text="Tareas / Actividades"
                    colorScheme="neutral"
                    // eslint-disable-next-line solid/reactivity
                    onClick={props.onClose}
                    icon={<DocumentDuplicateMini />}
                    href={`/class/${classStore.class!.id}/activities`}
                  />
                </Show>
                <LinkButton
                  text="Estudiantes"
                  colorScheme="neutral"
                  // eslint-disable-next-line solid/reactivity
                  onClick={props.onClose}
                  icon={<UsersMini />}
                  href={`/class/${classStore.class!.id}/students`}
                />
                <LinkButton
                  text="Reporte de Asistencias"
                  colorScheme="neutral"
                  // eslint-disable-next-line solid/reactivity
                  onClick={props.onClose}
                  icon={<ClipboardDocumentCheckMini />}
                  href={`/class/${classStore.class!.id}/attendance/report`}
                />
                <LinkButton
                  text="Reporte de Notas"
                  colorScheme="neutral"
                  // eslint-disable-next-line solid/reactivity
                  onClick={props.onClose}
                  icon={<ClipboardDocumentListMini />}
                  href={`/class/${classStore.class!.id}/scores/report`}
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
                onClick={openSettings}
                compact
                variant="ghost"
                colorScheme="neutral"
                justifyContent="start"
                leftIcon={<Cog6Mini />}
              >
                Opciones
              </Button>
              <Button
                onClick={openLogout}
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

          <DrawerFooter alignItems="end">
            <Text size="sm" fontWeight="$semibold">{APP_VERSION}</Text>
            <Box flex="1" />
            <Button variant="ghost" colorScheme="primary" size="sm" compact onClick={openAbout}>Acerca</Button>
            <Text mx="$1" size="xs">{' '}</Text>
            <Button variant="ghost" colorScheme="primary" size="sm" compact onClick={openContact}>Contacto</Button>
          </DrawerFooter>
        </DrawerContent>
      </HopeDrawer>
    </>
  );
};

export default Drawer;
