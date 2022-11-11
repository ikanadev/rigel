import { Component, For, Show, Switch, Match, createMemo, createSignal, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Flex,
  Text,
  Checkbox,
  IconButton,
} from '@hope-ui/solid';
import { ChevronLeft, ChevronRight } from '@app/icons';

const DataSelector: Component<{ data: Array<string[] | null> }> = (ps) => {
  const [nameIdx, setNameIdx] = createSignal(0);
  const [lastNameIdx, setLastNameIdx] = createSignal(1);
  const [rowsStatus, setRowsStatus] = createStore<boolean[]>([]);

  createEffect(() => {
    if (rows().length > 0) {
      setRowsStatus((new Array(rows().length)).fill(false));
    }
  });

  const rows = createMemo(() => ps.data.filter((row): row is string[] => row !== null));

  const maxCols = createMemo(() => rows().reduce((res, row) => {
    if (row.length > res) {
      res = row.length;
    }
    return res;
  }, 0));

  return (
    <>
      <Show
        when={rows().length >= 1 && maxCols() >= 2 && rowsStatus.length === rows().length}
        fallback={
          <Text my="$4" color="$neutral10" fontStyle="italic">
            La hoja excel está vacía o no contiene información suficiente.
          </Text>
        }
      >
        <Text mb="$4">
          Selecciona las columnas correspondientes a nombres y apellidos
          usando los botones de <IconButton size="xs" aria-label="" variant="subtle" icon={<ChevronLeft w="$4" h="$4" />} /> y
          <IconButton size="xs" aria-label="" variant="subtle" icon={<ChevronRight w="$4" h="$4" />} />. Selecciona los estudiantes
          marcando el cuadro de selección de la primera columna.
        </Text>
        <Box maxW="$full" overflow="auto">
          <Table dense>
            <Tbody>
              <Tr>
                <Th border="1px solid $neutral4" textAlign="center">
                  ¿Agregar?
                </Th>
                <For each={[...(new Array(maxCols()))]}>{(_, i) => (
                  <Switch fallback={<Th border="1px solid $neutral4" />}>
                    <Match when={i() === nameIdx()}>
                      <Th border="1px solid $neutral4">
                        <Flex alignItems="center" justifyContent="space-between">
                          <IconButton
                            onClick={() => setNameIdx(
                              prev => prev - 1 === lastNameIdx() ? prev - 2 : prev - 1,
                            )}
                            disabled={nameIdx() === 0 || (lastNameIdx() === 0 && nameIdx() === 1)}
                            aria-label="Anterior"
                            variant="subtle"
                            size="xs"
                            icon={<ChevronLeft w="$4" h="$4" />}
                          />
                          <Text fontSize="$xs">Nombre(s)</Text>
                          <IconButton
                            onClick={() => setNameIdx(
                              prev => prev + 1 === lastNameIdx() ? prev + 2 : prev + 1,
                            )}
                            disabled={nameIdx() === maxCols() - 1 || (lastNameIdx() === maxCols() - 1 && nameIdx() === maxCols() - 2)}
                            aria-label="Siguiente"
                            variant="subtle"
                            size="xs"
                            icon={<ChevronRight w="$4" h="$4" />}
                          />
                        </Flex>
                      </Th>
                    </Match>
                    <Match when={i() === lastNameIdx()}>
                      <Th border="1px solid $neutral4">
                        <Flex alignItems="center" justifyContent="space-between">
                          <IconButton
                            onClick={() => setLastNameIdx(
                              prev => prev - 1 === nameIdx() ? prev - 2 : prev - 1,
                            )}
                            disabled={lastNameIdx() === 0 || (nameIdx() === 0 && lastNameIdx() === 1)}
                            aria-label="Anterior"
                            variant="subtle"
                            size="xs"
                            icon={<ChevronLeft w="$4" h="$4" />}
                          />
                          <Text fontSize="$xs">Apellido(s)</Text>
                          <IconButton
                            onClick={() => setLastNameIdx(
                              prev => prev + 1 === nameIdx() ? prev + 2 : prev + 1,
                            )}
                            disabled={lastNameIdx() === maxCols() - 1 || (nameIdx() === maxCols() - 1 && lastNameIdx() === maxCols() - 2)}
                            aria-label="Siguiente"
                            variant="subtle"
                            size="xs"
                            icon={<ChevronRight w="$4" h="$4" />}
                          />
                        </Flex>
                      </Th>
                    </Match>
                  </Switch>
                )}</For>
              </Tr>
              <For each={rows()}>{(row, rowIdx) => (
                <Tr>
                  <Td border="1px solid $neutral4" textAlign="center">
                    <Checkbox checked={rowsStatus[rowIdx()]} onChange={() => setRowsStatus(rowIdx(), prev => !prev)} />
                  </Td>
                  <For each={[...(new Array(maxCols()))]}>{(_, colIdx) => (
                    <Td
                      border="1px solid $neutral4"
                      bgColor={rowsStatus[rowIdx()] && (colIdx() === nameIdx() || colIdx() === lastNameIdx()) ? '$neutral7' : undefined}
                    >
                      <Text fontSize="$sm">
                        {row[colIdx()] ?? ''}
                      </Text>
                    </Td>
                  )}</For>
                </Tr>
              )}</For>
            </Tbody>
          </Table>
        </Box>
      </Show>
    </>
  );
};

export default DataSelector;
