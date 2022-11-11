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
  SelectContent,
  SelectListbox,
  SelectOption,
  SelectOptionIndicator,
  SelectOptionText,
} from '@hope-ui/solid';
import { School } from '@app/types';
import { MagnifyingGlass, XMark } from '@app/icons';

interface Props {
  schools: Resource<School[]>
}
const SchoolSelector: Component<Props & SelectProps> = (props) => {
  const [filter, setFilter] = createSignal('');
  const [{ schools }, selectProps] = splitProps(props, ['schools']);

  createEffect(() => {
    if (props.value === null) {
      setFilter('');
    }
  });

  const filteredSchools = () => {
    if (filter() === '') return schools();
    return schools()?.filter((sc) => sc.name.toLowerCase().includes(filter().toLowerCase().trim()));
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
              value={filter()}
              onInput={(ev) => {
                setFilter(ev.currentTarget.value);
              }}
              onKeyDown={ev => ev.stopPropagation()}
              onBlur={ev => ev.stopPropagation()}
              onFocus={ev => ev.stopPropagation()}
            />
          </SelectPlaceholder>
          <SelectValue />
          {props.value === null
            ? <MagnifyingGlass />
            : <XMark
              onClick={e => {
                e.stopPropagation();
                props.onChange?.(null);
              }}
              onKeyDown={e => e.stopPropagation()}
            />
          }
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
