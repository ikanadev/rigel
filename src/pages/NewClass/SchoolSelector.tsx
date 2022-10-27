import { Component, For, Resource, splitProps, createSignal, createEffect } from 'solid-js';
import {
  Box,
  Text,
  Input,
  Select,
  SelectProps,
  SelectTrigger,
  SelectPlaceholder,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectListbox,
  SelectOption,
  SelectOptionIndicator,
  SelectOptionText,
} from '@hope-ui/solid';
import { School } from '@app/types';

interface Props {
  schools: Resource<School[]>
}
const SchoolSelector: Component<Props & SelectProps> = (props) => {
  const [filter, setFilter] = createSignal('');
  const [{ schools }, selectProps] = splitProps(props, ['schools']);

  createEffect(() => {
    if (props.value !== null) setFilter('');
  });

  const filteredSchools = () => {
    if (filter() === '') return schools();
    return schools()?.filter((sc) => sc.name.toLowerCase().includes(filter().toLowerCase()));
  };

  return (
    <Box>
      <Text size="sm" mb="$1">Establecimiento educativo:</Text>
      <Select {...selectProps}>
        <SelectTrigger>
          <SelectPlaceholder>
            <Input
              variant="unstyled"
              placeholder="Selecciona colegio"
              disabled={selectProps.disabled}
              onInput={(ev) => setFilter(ev.currentTarget.value)}
            />
          </SelectPlaceholder>
          <SelectValue />
          <SelectIcon />
        </SelectTrigger>
        <SelectContent>
          <SelectListbox>
            <For each={filteredSchools()}>
              {school => (
                <SelectOption value={school.id}>
                  <SelectOptionText>{school.name}</SelectOptionText>
                  <SelectOptionIndicator />
                </SelectOption>
              )}
            </For>
          </SelectListbox>
        </SelectContent>
      </Select>
    </Box>
  );
};

export default SchoolSelector;
