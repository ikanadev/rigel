import { Component, For, Show, createMemo } from 'solid-js';
import { Title, ColoredScore } from '@app/components';
import {
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
} from '@hope-ui/solid';
import { Score } from '@app/types';

import { createDexieArrayQuery } from 'solid-dexie';
import { useParams } from '@solidjs/router';
import { studentsStore, booleanSignal } from '@app/hooks';
import { db } from '@app/db/dexie';
import { useAppData } from '@app/context';

interface ScoresMap { [key: string]: Score }
const ScoresReport: Component = () => {
  const params = useParams<{ classid: string }>();
  const { appState } = useAppData();
  const modal = booleanSignal();

  const students = studentsStore();
  const classPeriods = createDexieArrayQuery(
    () => db.classPeriods.where('class_id').equals(params.classid).sortBy('start'),
  );
  const acts = createDexieArrayQuery(
    () => db.activities.where('class_period_id').anyOf(classPeriods.map(cp => cp.id)).sortBy('date'),
  );
  const scores = createDexieArrayQuery(
    () => db.scores.where('activity_id').anyOf(acts.map(a => a.id)).toArray(),
  );

  const classPeriodsWithActs = createMemo(() => {
    return classPeriods.map((cp) => ({
      ...cp,
      areas: appState.areas.map(area => ({
        ...area,
        acts: acts.filter(act => act.class_period_id === cp.id && act.area_id === area.id),
      })),
    }));
  });

  const studentsWithScores = () => {
    return students.map((st) => ({
      ...st,
      scoresMap: scores
        .filter(s => s.student_id === st.id)
        .reduce((res: ScoresMap, score) => {
          res[score.activity_id] = score;
          return res;
        }, {}),
    })).map((st) => {
      const areaGrades = classPeriodsWithActs().map((cp) => {
        return cp.areas.map((area) => {
          if (area.acts.length === 0) return 0;
          const sum = area.acts.reduce((res, act) => {
            if (st.scoresMap[act.id] !== undefined) res += st.scoresMap[act.id].points;
            return res;
          }, 0);
          return Math.round((sum * area.points) / (area.acts.length * 100));
        });
      });
      const periodGrades = areaGrades.map((ag) => ag.reduce((res, a) => res + a, 0));
      const yearGrade = Math.round(periodGrades.reduce((res, pg) => res + pg, 0) / periodGrades.length);
      return {
        ...st,
        areaGrades,
        periodGrades,
        yearGrade,
      };
    });
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <Title text="Notas" />
        <Button size="xs" onClick={modal.enable}>Full</Button>
      </Flex>
      <Modal opened={modal.isActive()} onClose={modal.disable} size="full">
        <ModalOverlay />
        <ModalContent>
          Hey
        </ModalContent>
      </Modal>
      <Box maxW="$full" overflow="auto">
        <Table dense mt="$4">
          <Thead>
            <Tr>
              <Th rowSpan={3} pl={0}>
                Nombre(s) y Apellido(s)
              </Th>
              <For each={classPeriodsWithActs()}>{(classPeriod) => (
                <Th
                  colSpan={
                    classPeriod.areas.reduce(
                      // activities + average
                      (res, area) => res + (area.acts.length > 0 ? area.acts.length + 1 : 1),
                      0,
                      // + final
                    ) + 1
                  }
                  borderBottom="none"
                  py="$0_5"
                  textAlign="center"
                  borderLeft="1.5px solid $neutral4"
                >
                  {classPeriod.period.name}
                </Th>
              )}</For>
              <Th rowSpan={3} colSpan={2} borderLeft="1.5px solid $neutral4">
                <Text fontWeight="$bold" textAlign="center">Nota Final</Text>
              </Th>
            </Tr>
            <Tr>
              <For each={classPeriodsWithActs()}>{(classPeriod) => (
                <>
                  <For each={classPeriod.areas}>{(area) => (
                    <Th
                      colSpan={area.acts.length > 0 ? area.acts.length + 1 : 1}
                      borderBottom="none"
                      py="$0_5"
                      px="$1_5"
                      textAlign="center"
                      borderLeft="1.5px solid $neutral4"
                      fontSize="$2xs"
                      css={{ whiteSpace: 'nowrap' }}
                    >
                      {`${area.name} / ${area.points}`}
                    </Th>
                  )}</For>
                  <Th py="$0_5" px="$1_5" rowSpan={2} borderLeft="1.5px solid $neutral4">
                    Nota
                  </Th>
                </>
              )}</For>
            </Tr>
            <Tr>
              <For each={classPeriodsWithActs()}>{(classPeriod) => (
                <For each={classPeriod.areas}>{(area) => (
                  <>
                    <For each={area.acts}>{(act, i) => (
                      <Td
                        px="$1_5"
                        borderLeft={i() === 0 ? '1.5px solid $neutral4' : undefined}
                      >
                        <Tooltip label={act.name}>
                          <Text textAlign="center" noOfLines={2} size="xs">{act.name}</Text>
                        </Tooltip>
                      </Td>
                    )}</For>
                    <Show
                      when={area.acts.length > 0}
                      fallback={<Td borderLeft="1.5px solid $neutral4" />}
                    >
                      <Th borderLeft="1.5px solid $neutral4" py="$0_5" px="$1_5">
                        <Text fontSize="$2xs">Promedio</Text>
                      </Th>
                    </Show>
                  </>
                )}</For>
              )}</For>
            </Tr>
          </Thead>
          <Tbody>
            <For each={studentsWithScores()}>{(student, index) => (
              <Tr>
                <Td
                  p="$0_5"
                  bg={student.yearGrade <= 50 ? '$danger3' : '$success3'}
                >
                  <Flex
                    flexDirection={{ '@initial': 'column', '@md': 'row' }}
                    gap={{ '@initial': 0, '@md': '$1' }}
                  >
                    <Text css={{ whiteSpace: 'nowrap' }}>
                      {student.last_name}
                    </Text>
                    <Text css={{ whiteSpace: 'nowrap' }}>
                      {student.name}
                    </Text>
                  </Flex>
                </Td>
                <For each={classPeriodsWithActs()}>{(classPeriod, periodIndex) => (
                  <>
                    <For each={classPeriod.areas}>{(area, areaIndex) => (
                      <>
                        <Show when={area.acts.length === 0 && index() === 0}>
                          <Td rowSpan={students.length} borderLeft="1.5px solid $neutral4" color="$neutral9" textAlign="center" px="$1_5">
                            Sin tareas
                          </Td>
                        </Show>
                        <For each={area.acts}>{(act) => (
                          <Td borderLeft={areaIndex() === 0 ? '1.5px solid $neutral4' : undefined} p="$0_5">
                            <Show
                              when={student.scoresMap[act.id]}
                              fallback={<Text textAlign="center">-</Text>}
                            >
                              <ColoredScore score={student.scoresMap[act.id].points} fontWeight="$thin" textAlign="center" />
                            </Show>
                          </Td>
                        )}</For>
                        <Show when={area.acts.length > 0}>
                          <Td py="$0_5">
                            <Text textAlign="center" fontWeight="$normal">{student.areaGrades[periodIndex()][areaIndex()]}</Text>
                          </Td>
                        </Show>
                      </>
                    )}</For>
                    <Td px="$1_5" py="$0_5">
                      <ColoredScore score={student.periodGrades[periodIndex()]} fontWeight="$semibold" fontSize="$base" textAlign="center" />
                    </Td>
                  </>
                )}</For>
                <Td p="$0_5" px="$1_5" borderLeft="1.5px solid $neutral4" bg={student.yearGrade <= 50 ? '$danger2' : '$success2'}>
                  <ColoredScore score={student.yearGrade} fontWeight="$bold" fontSize="$lg" textAlign="center" />
                </Td>
                <Td
                  py="$0_5"
                  px="$1_5"
                  bg={student.yearGrade <= 50 ? '$danger2' : '$success2'}
                  color={student.yearGrade <= 50 ? '$danger8' : '$success8'}
                >
                  <Text>{student.yearGrade <= 50 ? 'REPROBADO' : 'APROBADO'}</Text>
                </Td>
              </Tr>
            )}</For>
          </Tbody>
        </Table>
      </Box >
    </>
  );
};

export default ScoresReport;
