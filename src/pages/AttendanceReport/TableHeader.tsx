import { Component, For, mergeProps } from 'solid-js';
import { Thead, Tr, Th, Text, Flex } from '@hope-ui/solid';
import { AttendanceBox } from '@app/components';

import dayjs from 'dayjs';
import { AttendanceDay, ClassPeriod, AttendanceStatus } from '@app/types';

interface Props {
  showDays: boolean
  classPeriods: Array<ClassPeriod & { attDays: AttendanceDay[] }>
  sticky?: boolean
}
const TableHeader: Component<Props> = (props) => {
  const ps = mergeProps({ sticky: false }, props);
  return (
    <Thead bgColor="$background" shadow="$md" top={0} zIndex={2} pos={ps.sticky ? 'sticky' : undefined}>
      <Tr>
        <Th rowSpan={2} bgColor="$background" pos="sticky" left={0} borderBottom="none">
          Nombre(s) y Apellido(s):
        </Th>
        <For each={ps.classPeriods}>{(classPeriod) => (
          <Th
            py="$0_5"
            colSpan={ps.showDays ? classPeriod.attDays.length + 4 : 4}
            textAlign="center"
            borderBottom="none"
            verticalAlign="bottom"
            borderLeft="3px solid $neutral4"
            style={{ 'white-space': 'nowrap' }}
          >
            {`${classPeriod.period.name} (${classPeriod.attDays.length} días)`}
          </Th>
        )}</For>
        <Th textAlign="center" colSpan={4} borderLeft="3px solid $neutral4" borderBottom="none">
          Total
        </Th>
      </Tr>
      <Tr>
        <For each={ps.classPeriods}>{(classPeriod) => (
          <>
            <For each={classPeriod.attDays}>{(attDay, attDayIndex) => (
              <Th
                borderBottom="none"
                fontWeight="$normal"
                fontSize="$2xs"
                borderLeft={attDayIndex() === 0 ? '3px solid $neutral4' : 'none'}
                pt={0} px="$1"
                verticalAlign="bottom"
                display={!ps.showDays ? 'none' : undefined}
              >
                <Text textAlign="center" css={{ whiteSpace: 'pre-wrap' }}>
                  {dayjs(attDay.day).format('ddd\nDD/MM')}
                </Text>
              </Th>
            )}</For>
            <Th
              borderBottom="none"
              borderLeft={classPeriod.attDays.length === 0 || !ps.showDays ? '3px solid $neutral4' : undefined}
            >
              <Flex justifyContent="center">
                <AttendanceBox status={AttendanceStatus.P} active />
              </Flex>
            </Th>
            <Th borderBottom="none">
              <Flex justifyContent="center">
                <AttendanceBox status={AttendanceStatus.F} active />
              </Flex>
            </Th>
            <Th borderBottom="none">
              <Flex justifyContent="center">
                <AttendanceBox status={AttendanceStatus.A} active />
              </Flex>
            </Th>
            <Th borderBottom="none">
              <Flex justifyContent="center">
                <AttendanceBox status={AttendanceStatus.L} active />
              </Flex>
            </Th>
          </>
        )}</For>
        <Th borderBottom="none" bgColor="$success2" borderLeft="3px solid $neutral4">
          <Flex justifyContent="center">
            <AttendanceBox status={AttendanceStatus.P} active />
          </Flex>
        </Th>
        <Th borderBottom="none" bgColor="$danger2">
          <Flex justifyContent="center">
            <AttendanceBox status={AttendanceStatus.F} active />
          </Flex>
        </Th>
        <Th borderBottom="none" bgColor="$warning2">
          <Flex justifyContent="center">
            <AttendanceBox status={AttendanceStatus.A} active />
          </Flex>
        </Th>
        <Th borderBottom="none" bgColor="$info2">
          <Flex justifyContent="center">
            <AttendanceBox status={AttendanceStatus.L} active />
          </Flex>
        </Th>
      </Tr>
    </Thead>
  );
};

export default TableHeader;
