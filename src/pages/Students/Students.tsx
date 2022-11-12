import type { Component } from 'solid-js';

import {
  Flex,
  Button,
  IconButton,
  Box,
  Table,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@hope-ui/solid';
import { Show, For } from 'solid-js';
import { Title } from '@app/components';
import { Link } from '@solidjs/router';
import { Plus, Pencil, Trash, BarsArrowDown, XLS } from '@app/icons';
import CopyStudentsModal from './CopyStudentsModal';

import { useAppData } from '@app/context';
import { studentsStore, booleanSignal } from '@app/hooks';

const Students: Component = () => {
  const copyModal = booleanSignal();
  const { classStore } = useAppData();

  const students = studentsStore();

  return (
    <>
      <CopyStudentsModal opened={copyModal.isActive()} onClose={copyModal.disable} />
      <Flex justifyContent="space-between" alignItems="start" flexWrap="wrap" mb="$2">
        <Title text="Estudiantes" />
        <Flex flexWrap="wrap" gap="$2" flexDirection={{ '@initial': 'column', '@sm': 'row' }}>
          <Button
            as={Link}
            href={`/class/${classStore.class!.id}/add_from_xls`}
            colorScheme="neutral"
            size="sm"
            variant="outline"
            rightIcon={<XLS w="$6" h="$6" />}
            onClick={copyModal.enable}
          >
            Copiar de Excel
          </Button>
          <Button
            colorScheme="neutral"
            size="sm"
            variant="outline"
            rightIcon={<BarsArrowDown w="$6" h="$6" />}
            onClick={copyModal.enable}
          >
            Copiar de otra materia
          </Button>
        </Flex>
      </Flex>
      <Flex justifyContent="end" mt="$4">
        <Button
          size="sm"
          as={Link}
          href={`/class/${classStore.class!.id}/students/new`}
          colorScheme="success"
          leftIcon={<Plus w="$5" h="$5" />}
        >
          NUEVO ESTUDIANTE
        </Button>
      </Flex>
      <Show
        when={students.length > 0}
        fallback={
          <Text color="$neutral11" fontStyle="italic" textAlign="center" my="$6">
            No existen estudiantes registrados aún.
          </Text>
        }
      >
        <Box overflowX="auto" maxW="$full" mt="$2">
          <Table striped="even" dense>
            <Thead>
              <Tr>
                <Th>Apellido(s):</Th>
                <Th>Nombre(s):</Th>
                <Th>Cédula de Identidad:</Th>
                <Th numeric>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              <For each={students}>
                {(student) => (
                  <Tr>
                    <Td>{student.last_name}</Td>
                    <Td>{student.name}</Td>
                    <Td>{student.ci === '' ? '-' : student.ci}</Td>
                    <Td numeric>
                      <IconButton
                        as={Link}
                        href={`/class/${classStore.class!.id}/student/${student.id}/edit`}
                        size="xs"
                        colorScheme="info"
                        aria-label="Editar"
                        icon={<Pencil w="$4" h="$4" />}
                        mr="$2"
                      />
                      <IconButton size="xs" colorScheme="danger" aria-label="Eliminar" icon={<Trash w="$4" h="$4" />} />
                    </Td>
                  </Tr>
                )}
              </For>
            </Tbody>
          </Table>
        </Box>
      </Show>
    </>
  );
};

export default Students;
