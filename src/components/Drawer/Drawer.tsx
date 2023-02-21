import type { Component } from 'solid-js';

import {
  Drawer as HopeDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  IconButton,
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
  Telegram,
  Whatsapp,
  User,
} from '@app/icons';
import { Show } from 'solid-js';
import { StartPeriodModal, FinishPeriodModal, Plan } from '@app/components';
import LinkButton from './LinkButton';
import AboutModal from './AboutModal';
import ContactModal from './ContactModal';
import LogoutModal from './LogoutModal';
import SettingsModal from './SettingsModal';

import { APP_VERSION, APP_NAME, LANDING_PAGE } from '@app/utils/constants';
import { useNavigate } from '@solidjs/router';
import { useAppData } from '@app/context';
import { booleanSignal } from '@app/hooks';
import dayjs from 'dayjs';

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
  const { classStore, year, profile, actions: { setSelectedClass } } = useAppData();

  const thisYear = dayjs().get('y');
  const isPremium = profile.subscriptions.some((s) => s.year.value === thisYear);

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
          <DrawerHeader pb={0}>
            <Flex justifyContent="space-between" alignItems="start" pr="$10">
              <Heading color="$primary9" size="xl" fontWeight="$bold">
                {APP_NAME} - {year.value}
              </Heading>
              <Plan premium={isPremium} />
            </Flex>
            <Divider mt="$2" />
          </DrawerHeader>

          <DrawerBody>
            <Text fontWeight={500} fontSize="$lg" textAlign="right" mb="$5">
              {profile.name} {profile.last_name}
            </Text>
            <Show
              when={classStore.class !== null}
              fallback={
                <Text fontStyle="italic" color="$neutral11" fontSize="$sm" my="$4">
                  Seleccione una materia para administrar
                </Text>
              }
            >
              <Flex justifyContent="end" alignItems="center" gap="$2">
                <Text size="sm">Compartir planilla:</Text>
                <IconButton
                  as="a"
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${LANDING_PAGE}/class/${classStore.class!.id}\n${classStore.class!.subject.name
                    } - ${classStore.class!.grade.name
                    }, Par. ${classStore.class!.parallel}`,
                  )
                    }`}
                  target="_blank"
                  rel="noreferrer"
                  compact
                  variant="outline"
                  colorScheme="neutral"
                  aria-label="Compartir por Whatsapp"
                  icon={<Whatsapp color="#25d366" w="$5" h="$5" />}
                />
                <IconButton
                  as="a"
                  href={
                    `https://t.me/share/url?url=${encodeURIComponent(`${LANDING_PAGE}/class/${classStore.class!.id}`)
                    }&text=${encodeURIComponent(`${classStore.class!.subject.name} - ${classStore.class!.grade.name}, Par. ${classStore.class!.parallel}`)
                    }`
                  }
                  target="_blank"
                  rel="noreferrer"
                  compact
                  variant="outline"
                  colorScheme="neutral"
                  aria-label="Compartir por Telegram"
                  icon={<Telegram w="$5" h="$5" />}
                />
                <Button compact variant="outline" colorScheme="neutral" fontSize="$xs" onClick={() => {
                  void navigator.clipboard.writeText(`${LANDING_PAGE}/class/${classStore.class!.id}`);
                }}>
                  Copiar URL
                </Button>
              </Flex>
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
                      size="md"
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
                    size="md"
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
              <LinkButton
                text="Mi perfil"
                colorScheme="neutral"
                // eslint-disable-next-line solid/reactivity
                onClick={props.onClose}
                icon={<User w={20} h={20} />}
                href="/profile"
              />
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
