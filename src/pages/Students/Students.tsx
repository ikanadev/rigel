import type { Component } from 'solid-js';

import { Show } from 'solid-js';
import { Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td } from '@hope-ui/solid';
import { Title } from '@app/components';

import { useParams } from '@solidjs/router';
import { createDexieSignalQuery } from 'solid-dexie';
import { db } from '@app/db/dexie';

const Students: Component = () => {
  const params = useParams<{ classid: string }>();
  const classData = createDexieSignalQuery(() => db.classes.get(params.classid));

  return (
    <Show when={classData() !== undefined} fallback={null}>
      <Title text="Estudiantes" />
      <Table dense>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th numeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td numeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td numeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td numeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th numeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Show>
  );
};

export default Students;
