import { Component, For, Show } from 'solid-js';
import { Title } from '@app/components';
import {
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

import { useParams } from '@solidjs/router';
import { studentsStore } from '@app/hooks';
import { db } from '@app/db/dexie';
import { createDexieArrayQuery } from 'solid-dexie';

interface ScoresMap { [key: string]: Score }
const ScoresReport: Component = () => {
  const params = useParams<{ classid: string }>();
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

  const classPeriodsWithActs = () => {
    return classPeriods.map((cp) => ({
      ...cp,
      acts: acts.filter(act => act.class_period_id === cp.id),
    }));
  };

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

  return (
    <>
      <Title text="Notas" />
      <Box maxW="$full" overflow="auto">
        <Table dense mt="$4" striped="even">
          <Thead>
            <Tr>
              <Th rowSpan={2}>
                Nombre(s) y Apellido(s)
              </Th>
              <For each={classPeriodsWithActs()}>{(classPeriod, i) => (
                <Th
                  colSpan={classPeriod.acts.length}
                  rowSpan={classPeriod.acts.length > 0 ? 1 : 2}
                  borderBottom="none"
                  py="$0_5"
                  textAlign="center"
                  bg={i() % 2 === 1 ? '$neutral3' : undefined}
                >
                  {classPeriod.period.name}
                </Th>
              )}</For>
            </Tr>
            <Tr>
              <For each={classPeriodsWithActs()}>{(classPeriod, i) => (
                <For each={classPeriod.acts}>{(act) => (
                  <Td
                    borderBottom="none"
                    px="$1"
                    bg={i() % 2 === 1 ? '$neutral3' : undefined}
                  >
                    <Text textAlign="center">{act.name}</Text>
                  </Td>
                )}</For>
              )}</For>
            </Tr>
          </Thead>
          <Tbody>
            <For each={studentsWithScores()}>{(student, index) => (
              <Tr>
                <Td p="$0_5">
                  <Text textAlign="right" css={{ whiteSpace: 'nowrap' }}>
                    {student.name}
                  </Text>
                  <Text textAlign="right" css={{ whiteSpace: 'nowrap' }}>
                    {student.last_name}
                  </Text>
                </Td>
                <For each={classPeriodsWithActs()}>{(classPeriod) => (
                  <>
                    <Show when={classPeriod.acts.length === 0 && index() === 0}>
                      <Td rowSpan={students.length}>Sin datos</Td>
                    </Show>
                    <For each={classPeriod.acts}>{(act) => (
                      <Td>
                        <Text textAlign="center">
                          {student.scoresMap[act.id]?.points ?? '-'}
                        </Text>
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

export default ScoresReport;
