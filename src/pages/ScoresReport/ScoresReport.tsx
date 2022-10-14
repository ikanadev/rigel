import { Component, createMemo, createSignal, For } from 'solid-js';
import { Title } from '@app/components';
import { Flex, Button, Table, Box, SimpleOption, SimpleSelect, Text } from '@hope-ui/solid';
import { Score } from '@app/types';
import { ViewMode } from './types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import FullModal from './FullModal';

import { createDexieArrayQuery } from 'solid-dexie';
import { useParams } from '@solidjs/router';
import { studentsStore, booleanSignal } from '@app/hooks';
import { db } from '@app/db/dexie';
import { useAppData } from '@app/context';

interface ScoresMap { [key: string]: Score }
const ScoresReport: Component = () => {
  const [viewMode, setViewMode] = createSignal<ViewMode>(ViewMode.Activity);
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
      const areaScores = classPeriodsWithActs().map((cp) => {
        return cp.areas.map((area) => {
          if (area.acts.length === 0) return 0;
          const sum = area.acts.reduce((res, act) => {
            if (st.scoresMap[act.id] !== undefined) res += st.scoresMap[act.id].points;
            return res;
          }, 0);
          return Math.round((sum * area.points) / (area.acts.length * 100));
        });
      });
      const periodScores = areaScores.map((ag) => ag.reduce((res, a) => res + a, 0));
      const yearScore = Math.round(periodScores.reduce((res, pg) => res + pg, 0) / periodScores.length);
      return {
        ...st,
        areaScores,
        periodScores,
        yearScore,
      };
    });
  };

  return (
    <>
      <Flex alignItems="center" flexWrap="wrap">
        <Title text="Notas" />
        <Box flex="1" />
        <Flex alignItems="center" >
          <Text mr="$2" fontWeight="$medium">Ver</Text>
          <Box mr="$4" minW="$48">
            <SimpleSelect value={viewMode()} onChange={setViewMode} size="sm">
              <For each={Object.values(ViewMode)}>{(level) => (
                <SimpleOption value={level}>{level}</SimpleOption>
              )}</For>
            </SimpleSelect>
          </Box>
          <Button size="sm" onClick={modal.enable} colorScheme="info">Agrandar</Button>
        </Flex>
      </Flex>
      <FullModal
        classPeriods={classPeriodsWithActs()}
        students={studentsWithScores()}
        isOpen={modal.isActive()}
        onClose={modal.disable}
        viewMode={viewMode()}
      />
      <Box maxW="$full" overflow="auto">
        <Table dense mt="$4">
          <TableHeader classPeriods={classPeriodsWithActs()} viewMode={viewMode()} />
          <TableBody classPeriods={classPeriodsWithActs()} students={studentsWithScores()} viewMode={viewMode()} />
        </Table>
      </Box>
    </>
  );
};

export default ScoresReport;
