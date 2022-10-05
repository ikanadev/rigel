import { Component } from 'solid-js';
import { StartPeriodModal } from '@app/components';
import { Flex, Text, Button } from '@hope-ui/solid';

import { booleanSignal } from '@app/hooks';

const NonActivePeriodMessage: Component = () => {
  const modalStatus = booleanSignal();

  return (
    <>
      <StartPeriodModal isOpen={modalStatus.active()} onClose={modalStatus.disable} />
      <Flex flexDirection="column" alignItems="center" my="$6">
        <Text color="$neutral10" fontStyle="italic" textAlign="center">
          Debes iniciar un periodo para registrar asistencias.
        </Text>
        <Button onClick={modalStatus.enable} size="sm" mt="$2" colorScheme="success">
          Iniciar periodo
        </Button>
      </Flex>
    </>
  );
};

export default NonActivePeriodMessage;
