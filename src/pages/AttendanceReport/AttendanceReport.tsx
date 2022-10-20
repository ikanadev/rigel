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
import { Title, AttendanceBox, AttendanceLabels } from '@app/components';

import dayjs from 'dayjs';
import { createDexieArrayQuery } from 'solid-dexie';
import { useParams } from '@solidjs/router';
import { studentsStore } from '@app/hooks';
import { db } from '@app/db/dexie';
import { Attendance, TotalAttendances, AttendanceStatus } from '@app/types';

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
    return students.map((st) => {
      return {
        ...st,
        attsMap: atts
          .filter((att) => att.student_id === st.id)
          .reduce((res: AttsMap, att) => {
            res[att.attendance_day_id] = att;
            return res;
          }, {}),
      };
    }).map((st) => {
      const yearAtts: TotalAttendances = {
        [AttendanceStatus.P]: 0,
        [AttendanceStatus.F]: 0,
        [AttendanceStatus.A]: 0,
        [AttendanceStatus.L]: 0,
      };
      const periodAtts: TotalAttendances[] = periodsWithAttDays().map((period) => {
        return period.attDays.reduce((res, attDay) => {
          if (st.attsMap[attDay.id] === undefined) return res;
          yearAtts[st.attsMap[attDay.id].value]++;
          res[st.attsMap[attDay.id].value]++;
          return res;
        }, {
          Presente: 0,
          Falta: 0,
          Atraso: 0,
          Licencia: 0,
        });
      });
      return {
        ...st,
        periodAtts,
        yearAtts,
      };
    });
  };

  return (
    <>
      <Title text="Asistencias" />
      <AttendanceLabels />
      <Box maxW="$full" maxH="calc(100vh - 128px)" overflow="auto" mt="$2">
        <Table dense>
          <Thead bgColor="$background" pos="sticky" top={0} zIndex={2} shadow="$md">
            <Tr>
              <Th rowSpan={2} bgColor="$background" pos="sticky" left={0} pl={0}>
                Nombre(s) y Apellido(s):
              </Th>
              <For each={periodsWithAttDays()}>{(classPeriod) => (
                <>
                  <Th
                    py="$0_5"
                    colSpan={classPeriod.attDays.length}
                    rowSpan={classPeriod.attDays.length > 0 ? 1 : 2}
                    textAlign="center"
                    borderBottom="none"
                    verticalAlign="bottom"
                    borderLeft="3px solid $neutral4"
                    style={{ 'white-space': 'nowrap' }}
                  >
                    {classPeriod.period.name}
                  </Th>
                  <Th rowSpan={2} borderBottom="none" bgColor="$success2" color="$success10" verticalAlign="bottom">
                    <Text textAlign="center" lineHeight={1} fontSize="$2xs" fontWeight="$normal" css={{ whiteSpace: 'pre-wrap' }}>
                      {'A\ns\ni\ns\nt\ne\nn\nc\ni\na\ns'}
                    </Text>
                  </Th>
                  <Th rowSpan={2} borderBottom="none" bgColor="$danger2" color="$danger10" verticalAlign="bottom">
                    <Text textAlign="center" lineHeight={1} fontSize="$2xs" fontWeight="$normal" css={{ whiteSpace: 'pre-wrap' }}>
                      {'F\na\nl\nt\na\ns'}
                    </Text>
                  </Th>
                  <Th rowSpan={2} borderBottom="none" bgColor="$warning2" color="$warning10" verticalAlign="bottom">
                    <Text textAlign="center" lineHeight={1} fontSize="$2xs" fontWeight="$normal" css={{ whiteSpace: 'pre-wrap' }}>
                      {'A\nt\nr\na\ns\no\ns'}
                    </Text>
                  </Th>
                  <Th rowSpan={2} borderBottom="none" bgColor="$info2" color="$info10" verticalAlign="bottom">
                    <Text textAlign="center" lineHeight={1} fontSize="$2xs" fontWeight="$normal" css={{ whiteSpace: 'pre-wrap' }}>
                      {'L\ni\nc\ne\nn\nc\ni\na\ns'}
                    </Text>
                  </Th>
                </>
              )}</For>
            </Tr>
            <Tr>
              <For each={periodsWithAttDays()}>{(classPeriod) => (
                <For each={classPeriod.attDays}>{(attDay, attDayIndex) => (
                  <Th
                    borderBottom="none"
                    fontWeight="$normal"
                    fontSize="$2xs"
                    borderLeft={attDayIndex() === 0 ? '3px solid $neutral4' : 'none'}
                    pt={0} px="$1"
                    verticalAlign="bottom"
                  >
                    <Text textAlign="center" css={{ whiteSpace: 'pre-wrap' }}>
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
                  <Flex flexDirection={{ '@initial': 'column', '@md': 'row' }}>
                    <Text textAlign="right" css={{ whiteSpace: 'nowrap' }}>{student.last_name}</Text>
                    <Text textAlign="right" css={{ whiteSpace: 'nowrap' }}>{student.name}</Text>
                  </Flex>
                </Td>
                <For each={periodsWithAttDays()}>{(classPeriod, classPeriodIndex) => (
                  <>
                    <Show when={classPeriod.attDays.length === 0 && index() === 0}>
                      <Td borderLeft="3px solid $neutral4" rowSpan={students.length}>Sin datos</Td>
                    </Show>
                    <For each={classPeriod.attDays}>{(attDay, attDayIndex) => (
                      <Td px="$1" borderLeft={attDayIndex() === 0 ? '3px solid $neutral4' : undefined}>
                        <Flex display="flex" justifyContent="center">
                          <AttendanceBox status={student.attsMap[attDay.id]?.value} active />
                        </Flex>
                      </Td>
                    )}</For>
                    <Td bg="$success2" color="$success10">
                      {student.periodAtts[classPeriodIndex()].Presente}
                    </Td>
                    <Td bg="$danger2" color="$danger10">
                      {student.periodAtts[classPeriodIndex()].Falta}
                    </Td>
                    <Td bg="$warning2" color="$warning10">
                      {student.periodAtts[classPeriodIndex()].Atraso}
                    </Td>
                    <Td bg="$info2" color="$info10">
                      {student.periodAtts[classPeriodIndex()].Licencia}
                    </Td>
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
