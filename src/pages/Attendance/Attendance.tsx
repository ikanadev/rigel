import { Component, Show, For, createMemo, createEffect } from 'solid-js';
import { Title } from '@app/components';
import {
  Button,
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
} from '@hope-ui/solid';
import { AttendanceStatus, Student, AttendanceDay, Attendance as AttendanceT } from '@app/types';
import AttendanceLabels from './AttendanceLabels';
import AttendanceButtons from './AttendanceButtons';
import NonActivePeriodMessage from './NonActivePeriodMessage';

import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useAppData } from '@app/context';
import { studentsStore, attendanceDaysStore } from '@app/hooks';
import { addAttendanceDay } from '@app/db/attendanceDay';
import { addAttendance, updateAttendance } from '@app/db/attendance';
import { db } from '@app/db/dexie';
import { createDexieArrayQuery } from 'solid-dexie';
import attendanceColors from './attendanceColors';

interface AttMapByStudentKey {[key: string]: AttendanceT}
interface AttDayWithAtts extends AttendanceDay {
  attendances: AttMapByStudentKey
}
const Attendance: Component = () => {
  const { appState } = useAppData();
  const students = studentsStore();
  const attendanceDays = attendanceDaysStore();
  const attendances = createDexieArrayQuery(() => db.attendances.where('attendance_day_id').anyOf(attendanceDays.map(a => a.id)).toArray());

  createEffect(() => {
    console.log(pastAttendancesDay());
  });

  const getDayAttds = (attDayId: string): AttMapByStudentKey => {
    const attds: AttMapByStudentKey = {};
    attendances
      .filter((att) => att.attendance_day_id === attDayId)
      .forEach((att) => {
        attds[att.student_id] = att;
      });
    return attds;
  };
  const todayAttendanceDay = createMemo((): AttDayWithAtts | null => {
    const found = attendanceDays.find((ad) => dayjs().isSame(dayjs(ad.day), 'day'));
    if (found === undefined) return null;
    return {
      ...found,
      attendances: getDayAttds(found.id),
    };
  });
  const pastAttendancesDay = createMemo((): AttDayWithAtts[] => {
    const today = dayjs();
    return attendanceDays
      .filter((ad) => today.isAfter(dayjs(ad.day), 'day'))
      .map((ad) => ({
        ...ad,
        attendances: getDayAttds(ad.id),
      }));
  });

  const startTodaysAttendance = () => {
    if (appState.activePeriod === null) return;
    addAttendanceDay({
      id: nanoid(),
      day: new Date().toISOString(),
      class_period_id: appState.activePeriod.id,
    }).catch((err) => {
      // TODO: handle err
      console.log('Err starting att day: ', err);
    });
  };

  const takeAttendance = (status: AttendanceStatus, student: Student) => {
    addAttendance({
      id: nanoid(),
      value: status,
      student_id: student.id,
      attendance_day_id: todayAttendanceDay()!.id,
    }).catch((err) => {
      // TODO: handle err
      console.log('Err adding att: ', err);
    });
  };
  const setNewAttendance = (attId: string, status: AttendanceStatus) => {
    updateAttendance({
      id: attId,
      value: status,
    }).catch((err) => {
      // TODO: handle err
      console.log('Err editing att: ', err);
    });
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="start">
        <Title text="Asistencias" />
        <AttendanceLabels />
      </Flex>
      <Show
        when={appState.activePeriod !== null}
        fallback={<NonActivePeriodMessage />}
      >
        <Box width="$full" overflowX="auto">
          <Table dense>
            <Thead>
              <Tr fontWeight="$semibold">
                <Td w="$1" pl={0} css={{ whiteSpace: 'nowrap' }}>Estudiante:</Td>
                <Td>
                  <Flex flexDirection="column" alignItems="center">
                    <Text>Hoy</Text>
                    <Text>{dayjs().format('ddd DD [de] MMM')}</Text>
                  </Flex>
                </Td>
                <For each={pastAttendancesDay()}>
                  {(att) => (
                    <Td>{dayjs(att.day).format('ddd DD [de] MMM')}</Td>
                  )}
                </For>
              </Tr>
            </Thead>
            <Tbody>
              <For each={students}>
                {(student, index) => (
                  <Tr>
                    <Td w="$1" pl={0} css={{ whiteSpace: 'nowrap' }}>
                      <Text>{student.last_name}</Text>
                      <Text>{student.name}</Text>
                    </Td>
                    <Show
                      when={todayAttendanceDay() !== null}
                      fallback={
                        <Show when={index() === 0}>
                          <Td rowSpan={students.length}>
                            <Flex justifyContent="center" alignItems="center" flexDirection="column">
                              <Text color="$neutral10" fontStyle="italic" textAlign="center" mb="$2">
                                Hoy no se ha tomado asistencia.
                              </Text>
                              <Button onClick={startTodaysAttendance} size="sm" colorScheme="success">
                                Tomar asistencia
                              </Button>
                            </Flex>
                          </Td>
                        </Show>
                      }
                    >
                      <Td>
                        <Flex justifyContent="center">
                          <AttendanceButtons
                            status={
                              todayAttendanceDay()!.attendances[student.id] !== undefined
                                ? todayAttendanceDay()!.attendances[student.id].value
                                : undefined
                            }
                            onSelect={(status) => {
                              const studentAtt = todayAttendanceDay()!.attendances[student.id];
                              if (studentAtt === undefined) {
                                takeAttendance(status, student);
                              } else {
                                setNewAttendance(studentAtt.id, status);
                              }
                            }}
                          />
                        </Flex>
                      </Td>
                    </Show>
                    <For each={pastAttendancesDay()}>{(att) => (
                      <Td>
                        <Show
                          when={att.attendances[student.id] !== undefined}
                          fallback={'-'}
                        >
                          <Box
                            w="$4"
                            h="$4"
                            borderRadius="$sm"
                            mr="$1"
                            bg={attendanceColors[att.attendances[student.id].value].on}
                          />
                        </Show>
                      </Td>
                    )}</For>
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

export default Attendance;
