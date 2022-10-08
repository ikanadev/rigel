import { Component, Show, For } from 'solid-js';
import { Title, AttendanceBox } from '@app/components';
import {
  Button,
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Anchor,
  Td,
  Tr,
} from '@hope-ui/solid';
import { Link } from '@solidjs/router';
import { AttendanceStatus, Student } from '@app/types';
import AttendanceLabels from './AttendanceLabels';
import AttendanceButtons from './AttendanceButtons';
import NonActivePeriodMessage from './NonActivePeriodMessage';

import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useAppData } from '@app/context';
import { studentsStore, periodAttendanceStore, errorSignal } from '@app/hooks';
import { addAttendanceDay } from '@app/db/attendanceDay';
import { addAttendance, updateAttendance } from '@app/db/attendance';

const Attendance: Component = () => {
  const { reportError } = errorSignal;
  const { appState } = useAppData();
  const students = studentsStore();
  const { todayAttendanceDay, pastAttendancesDay } = periodAttendanceStore();

  const startTodaysAttendance = () => {
    if (appState.activePeriod === null) return;
    addAttendanceDay({
      id: nanoid(),
      day: Date.now(),
      class_period_id: appState.activePeriod.id,
    }).catch((err) => {
      void reportError('Starting attendance (new attendance day)', err);
    });
  };

  const takeAttendance = (status: AttendanceStatus, student: Student) => {
    addAttendance({
      id: nanoid(),
      value: status,
      student_id: student.id,
      attendance_day_id: todayAttendanceDay()!.id,
    }).catch((err) => {
      void reportError('Taking attendance', err);
    });
  };
  const setNewAttendance = (attId: string, status: AttendanceStatus) => {
    updateAttendance({
      id: attId,
      value: status,
    }).catch((err) => {
      void reportError('Updating attendance', err);
    });
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" mb="$4" gap="$2">
        <Title text="Asistencia" />
        <AttendanceLabels />
      </Flex>
      <Show
        when={appState.activePeriod !== null}
        fallback={<NonActivePeriodMessage />}
      >
        <Show
          when={students.length > 0}
          fallback={
            <Text textAlign="center" fontStyle="italic" my="$6">
              <Text color="$neutral10" as="span">
                No hay estudiantes registrados en esta materia, agrega estudiantes desde el menu de:
              </Text>
              <Anchor as={Link} href={`/class/${appState.selectedClass!.id}/students`} color="$primary10">
                {' '}Administrar Estudiantes
              </Anchor>
            </Text>
          }
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
                      <Td>
                        <Flex flexDirection="column" alignItems="center">
                          <Text>{dayjs(att.day).format('dddd')}</Text>
                          <Text>{dayjs(att.day).format('DD [de] MMM')}</Text>
                        </Flex>
                      </Td>
                    )}
                  </For>
                </Tr>
              </Thead>
              <Tbody>
                <For each={students}>
                  {(student, index) => (
                    <Tr>
                      <Td w="$1" pl={0} css={{ whiteSpace: 'nowrap' }}>
                        <Text>{`${student.last_name} ${student.name}`}</Text>
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
                          <Flex justifyContent="center">
                            <AttendanceBox status={att.attendances[student.id]?.value} />
                          </Flex>
                        </Td>
                      )}</For>
                    </Tr>
                  )}
                </For>
              </Tbody>
            </Table>
          </Box>
        </Show>
      </Show>
    </>
  );
};

export default Attendance;
