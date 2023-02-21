import { Show } from 'solid-js';
import {
  Box,
  Flex,
  Text,
  Button,
  Modal,
  Anchor,
  Heading,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@hope-ui/solid';
import { User } from '@app/icons';
import { Title, Plan } from '@app/components';

import booleanSignal from '@app/hooks/booleanSignal';
import { useAppData } from '@app/context';
import { STANDARD_MAX_CLASSES, APP_NAME, TELEGRAM_LINK } from '@app/utils/constants';
import dayjs from 'dayjs';

const Profile = () => {
  const infoModal = booleanSignal(false);
  const { profile } = useAppData();
  const thisYear = dayjs().get('year');
  const hasPremium = profile.subscriptions.some((sub) => sub.year.value === thisYear);
  return (
    <Box>
      <Modal opened={infoModal.isActive()} onClose={infoModal.disable} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Adquirir Premium</ModalHeader>
          <ModalBody mb="$4">
            <Heading textAlign="center" color="$primary10" size="2xl" fontWeight="$semibold">
              {APP_NAME}
            </Heading>
            <Flex justifyContent="center">
              <Plan premium />
            </Flex>
            <Text mt="$4">Encuentra las instrucciones para obtener {APP_NAME} premium en el{' '}
              <Anchor
                href={TELEGRAM_LINK}
                textDecoration="underline"
                fontWeight={500}
                color="$primary10"
                target="_blank"
                rel="noreferrer"
              >
                canal de Telegram
              </Anchor>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Title text='Mi perfil' />
      <Box maxW="$md" mx="auto">
        <Flex justifyContent="center">
          <User w="$16" h="$16" />
        </Flex>
        <Text textAlign="center" fontSize="$lg">
          {profile.name} {profile.last_name}
        </Text>
        <Text textAlign="center" fontSize="$sm" fontStyle="italic">
          {profile.email}
        </Text>
        <Text textAlign="center" fontSize="$lg">
          <Plan premium={hasPremium} />
        </Text>
        <Show
          when={!hasPremium}
          fallback={
            <Text textAlign="center" fontWeight={300} mt="$8" color="$neutral10">
              Gracias por adquirir la versi&oacute;n Premium.
            </Text>
          }
        >
          <Text textAlign="center" fontWeight={300} mt="$8">
            ¿Necesitas más de {STANDARD_MAX_CLASSES} materias?. ¡Activa el plan premium!.
          </Text>
          <Flex justifyContent="center">
            <Button size="md" mt="$2" colorScheme="success" onClick={infoModal.enable}>
              Activar Premium
            </Button>
          </Flex>
        </Show>
      </Box>
    </Box>
  );
};

export default Profile;
