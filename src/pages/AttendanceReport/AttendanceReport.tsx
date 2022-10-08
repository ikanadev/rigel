import { Component, For, Show, createMemo } from 'solid-js';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Flex,
} from '@hope-ui/solid';
import { Title, AttendanceBox } from '@app/components';

import dayjs from 'dayjs';
import { createDexieArrayQuery } from 'solid-dexie';
import { useParams } from '@solidjs/router';
import { studentsStore } from '@app/hooks';
import { db } from '@app/db/dexie';
import { Attendance } from '@app/types';

interface AttsMap { [key: string]: Attendance }
const AttendanceReport: Component = () => {
  const params = useParams<{ classid: string }>();
  const students = studentsStore();
  const classPeriods = createDexieArrayQuery(
    () => db.classPeriods.where('class_id').equals(params.classid).sortBy('start'),
  );
  const attDays = createDexieArrayQuery(
    () => db.attendanceDays.where('class_period_id').anyOf(classPeriods.map(cp => cp.id)).sortBy('day'),
  );
  const atts = createDexieArrayQuery(
    () => db.attendances.where('attendance_day_id').anyOf(attDays.map(ad => ad.id)).toArray(),
  );

  const periodsWithAttDays = createMemo(() => {
    return classPeriods.map((classP) => ({
      ...classP,
      attDays: attDays.filter((ad) => ad.class_period_id === classP.id),
    }));
  });

  const studentsWithAtts = () => {
    return students.map((st) => ({
      ...st,
      attsMap: atts
        .filter((att) => att.student_id === st.id)
        .reduce((res: AttsMap, att) => {
          res[att.attendance_day_id] = att;
          return res;
        }, {}),
    }));
  };

  return (
    <>
      <Title text="Asistencias" />
      <Box maxW="$full" maxH="calc(100vh - 128px)" overflow="auto" mt="$2">
        <Table striped="even" dense>
          <Thead bgColor="$background" pos="sticky" top={0} zIndex={2} shadow="$md">
            <Tr>
              <Th rowSpan={2} bgColor="$background" pos="sticky" left={0} pl={0}>
                Nombre(s) y Apellido(s):
              </Th>
              <For each={periodsWithAttDays()}>{(classPeriod, i) => (
                <Th
                  py="$0_5"
                  colSpan={classPeriod.attDays.length}
                  rowSpan={classPeriod.attDays.length > 0 ? 1 : 2}
                  textAlign="center"
                  borderBottom="none"
                  bg={i() % 2 === 1 ? '$neutral3' : undefined}
                  style={{ 'white-space': 'nowrap' }}
                >
                  {classPeriod.period.name}
                </Th>
              )}</For>
            </Tr>
            <Tr>
              <For each={periodsWithAttDays()}>{(classPeriod, i) => (
                <For each={classPeriod.attDays}>{(attDay) => (
                  <Th
                    borderBottom="none"
                    pt={0} px="$1" bg={i() % 2 === 1 ? '$neutral3' : undefined}
                  >
                    <Text as="pre" textAlign="center">
                      {dayjs(attDay.day).format('ddd\nDD/MM')}
                    </Text>
                  </Th>
                )}</For>
              )}</For>
            </Tr>
          </Thead>
          <Tbody maxW="$full" overflowX="auto" zIndex={1}>
            <For each={studentsWithAtts()}>{(student, index) => (
              <Tr>
                <Td bgColor="$background" p="$0_5" pos="sticky" left={0}>
                  <Text textAlign="right" css={{ whiteSpace: 'nowrap' }}>{student.last_name}</Text>
                  <Text textAlign="right" css={{ whiteSpace: 'nowrap' }}>{student.name}</Text>
                </Td>
                <For each={periodsWithAttDays()}>{(classPeriod) => (
                  <>
                    <Show when={classPeriod.attDays.length === 0 && index() === 0}>
                      <Td rowSpan={students.length}>Sin datos</Td>
                    </Show>
                    <For each={classPeriod.attDays}>{(attDay) => (
                      <Td px="$1">
                        <Flex display="flex" justifyContent="center">
                          <AttendanceBox status={student.attsMap[attDay.id]?.value} />
                        </Flex>
                      </Td>
                    )}</For>
                  </>
                )}</For>
              </Tr>
            )}</For>
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default AttendanceReport;
