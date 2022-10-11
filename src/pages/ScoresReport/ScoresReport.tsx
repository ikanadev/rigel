import { Component, For, Show, createMemo, createEffect } from 'solid-js';
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
    }));
  };

  createEffect(() => {
    console.log(classPeriodsWithActs());
  });

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
                    Final
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
                <Td p="$0_5">
                  <Flex flexDirection={{ '@initial': 'column', '@md': 'row' }} gap={{ '@initial': 0, '@md': '$1' }}>
                    <Text css={{ whiteSpace: 'nowrap' }}>
                      {student.name}
                    </Text>
                    <Text css={{ whiteSpace: 'nowrap' }}>
                      {student.last_name}
                    </Text>
                  </Flex>
                </Td>
                <For each={classPeriodsWithActs()}>{(classPeriod) => (
                  <>
                    <For each={classPeriod.areas}>{(area, j) => {
                      const sum = area.acts.reduce((res, act) => {
                        if (student.scoresMap[act.id] !== undefined) res += student.scoresMap[act.id].points;
                        return res;
                      }, 0);
                      const average = (sum * area.points) / (area.acts.length * 100);
                      return (
                        <>
                          <Show when={area.acts.length === 0 && index() === 0}>
                            <Td rowSpan={students.length} borderLeft="1.5px solid $neutral4" color="$neutral9" textAlign="center" px="$1_5">
                              Sin tareas
                            </Td>
                          </Show>
                          <For each={area.acts}>{(act) => (
                            <Td borderLeft={j() === 0 ? '1.5px solid $neutral4' : undefined} p="$0_5">
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
                              <Text textAlign="center">{Math.round(average)}</Text>
                            </Td>
                          </Show>
                        </>
                      );
                    }}</For>
                    <Td>100</Td>
                  </>
                )}</For>
              </Tr>
            )}</For>
          </Tbody>
        </Table>
      </Box >
    </>
  );
};

export default ScoresReport;
