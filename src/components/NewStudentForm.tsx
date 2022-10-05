import type { Component, JSX } from 'solid-js';
import { Student, InputState, FormSubmitHandler } from '@app/types';

import { Show, createEffect } from 'solid-js';
import { SimpleGrid, Button, Input, Flex, Text } from '@hope-ui/solid';

import { nonEmptyValidator } from '@app/utils/functions';
import { createStore } from 'solid-js/store';

export interface NewStudentFormData {
  name: InputState
  last_name: InputState
  ci: InputState
}
const validators: { [key in keyof NewStudentFormData]: Array<(val: string) => string> } = {
  name: [nonEmptyValidator],
  last_name: [nonEmptyValidator],
  ci: [],
};

interface Props {
  student?: Student
  onSubmit: (data: NewStudentFormData) => void
}
const NewStudentForm: Component<Props> = (props) => {
  const [formData, setFormData] = createStore<NewStudentFormData>({
    name: { value: '', errorMsg: '', isTouched: false },
    last_name: { value: '', errorMsg: '', isTouched: false },
    ci: { value: '', errorMsg: '', isTouched: false },
  });

  createEffect(() => {
    if (props.student !== undefined) {
      setFormData('name', 'value', props.student.name);
      setFormData('last_name', 'value', props.student.last_name);
      setFormData('ci', 'value', props.student.ci);
    }
  });

  const isDisabled = (): boolean => {
    return Object.keys(formData)
      .filter((key) => validators[key as keyof NewStudentFormData].length > 0)
      .some(
        (key) => formData[key as keyof NewStudentFormData].errorMsg !== '' ||
          formData[key as keyof NewStudentFormData].value === '',
      );
  };

  const onChange: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (ev) => {
    const el = ev.currentTarget;
    const field = el.name as keyof NewStudentFormData;
    if (!formData[field].isTouched) {
      setFormData(field, 'isTouched', true);
    }
    setFormData(field, 'value', el.value);
    let errorStr = '';
    for (const validator of validators[field]) {
      const err = validator(el.value);
      if (err !== '') {
        errorStr = err;
        break;
      }
    }
    setFormData(field, 'errorMsg', errorStr);
  };

  const onSubmit: FormSubmitHandler = (ev) => {
    ev.preventDefault();
    props.onSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <SimpleGrid columns={{ '@initial': 1, '@md': 2, '@lg': 3 }} rowGap="$4" columnGap="$4" mt="$4">
        <Flex flexDirection="column">
          <Text size="sm">Nombre(s):</Text>
          <Input
            name="name"
            placeholder="Nombre"
            value={formData.name.value}
            onInput={onChange}
            invalid={formData.name.isTouched && formData.name.errorMsg !== ''}
            autocomplete="off"
            autofocus
          />
          <Show when={formData.name.isTouched && formData.name.errorMsg !== ''}>
            <Text color="$danger10" size="sm">{formData.name.errorMsg}</Text>
          </Show>
        </Flex>

        <Flex flexDirection="column">
          <Text size="sm">Apellido(s):</Text>
          <Input
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name.value}
            onInput={onChange}
            invalid={formData.last_name.isTouched && formData.last_name.errorMsg !== ''}
            autocomplete="off"
          />
          <Show when={formData.last_name.isTouched && formData.last_name.errorMsg !== ''}>
            <Text color="$danger10" size="sm">{formData.last_name.errorMsg}</Text>
          </Show>
        </Flex>

        <Flex flexDirection="column">
          <Text size="sm">Cédula de Identidad (Opcional):</Text>
          <Input
            name="ci"
            type="number"
            placeholder="Ej. 111111"
            value={formData.ci.value}
            onInput={onChange}
            autocomplete="off"
          />
        </Flex>
      </SimpleGrid>
      <SimpleGrid
        columns={{ '@initial': 1, '@md': 2, '@lg': 3 }}
        rowGap="$4"
        columnGap="$4"
        mt="$4"
      >
        <Button disabled={isDisabled()} type="submit">
          {props.student !== undefined ? 'Guardar cambios' : 'Registrar estudiante'}
        </Button>
      </SimpleGrid>
    </form>
  );
};

export default NewStudentForm;
