import { Component, createMemo, createSignal } from 'solid-js';
import { Table, Text, Box, Flex, Switch } from '@hope-ui/solid';
import { Title, AttendanceLabels } from '@app/components';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { createDexieArrayQuery } from 'solid-dexie';
import { useParams } from '@solidjs/router';
import { studentsStore } from '@app/hooks';
import { db } from '@app/db/dexie';
import { TotalAttendances } from '@app/types';
import { AttsMap } from './types';

const AttendanceReport: Component = () => {
  const params = useParams<{ classid: string }>();
  const [showDays, setShowDays] = createSignal(true);
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

  const toggleShowDays = () => setShowDays(prev => !prev);

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
        Presente: 0,
        Falta: 0,
        Atraso: 0,
        Licencia: 0,
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
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Title text="Asistencias" />
        <Flex alignItems="center">
          <Text fontSize="$sm">Mostrar días</Text>
          <Switch size="sm" checked={showDays()} onChange={toggleShowDays} />
        </Flex>
      </Flex>
      <Flex justifyContent="end" mt="$2">
        <AttendanceLabels />
      </Flex>
      <Box maxW="$full" overflow="auto" mt="$3">
        <Table dense>
          <TableHeader classPeriods={periodsWithAttDays()} showDays={showDays()} />
          <TableBody classPeriods={periodsWithAttDays()} students={studentsWithAtts()} showDays={showDays()} />
        </Table>
      </Box>
    </>
  );
};

export default AttendanceReport;
