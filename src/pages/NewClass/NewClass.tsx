import type { Component } from 'solid-js';
import type { FormSubmitHandler } from '@app/types';

import { Show, For, createResource, createEffect, createSignal } from 'solid-js';
import { Title, Alert } from '@app/components';
import {
  Text,
  SimpleGrid,
  Box,
  Stack,
  Button,
  SimpleSelect,
  SimpleOption,
  Input,
} from '@hope-ui/solid';

import { createDexieArrayQuery } from 'solid-dexie';
import { createStore } from 'solid-js/store';
import { getDepartamentos, getProvincias, getMunicipios, getSchools } from '@app/api';
import { useAppData } from '@app/context';
import { isOnline } from '@app/hooks';
import { db } from '@app/db/dexie';

interface FormData {
  dpto: string | null
  prov: string | null
  mun: string | null
  school: string | null
  subject: string | null
  grade: string | null
  parallel: string
}

const NewClass: Component = () => {
  const { year } = useAppData();
  const [serverErr, setServerErr] = createSignal('');
  const [formData, setFormData] = createStore<FormData>({
    dpto: null,
    prov: null,
    mun: null,
    school: null,
    subject: null,
    grade: null,
    parallel: 'A',
  });
  const [deps] = createResource(getDepartamentos);
  const [provs] = createResource(() => formData.dpto, getProvincias);
  const [muns] = createResource(() => formData.prov, getMunicipios);
  const [schools] = createResource(() => formData.mun, getSchools);
  const subjects = createDexieArrayQuery(() => db.subjects.toArray());
  const grades = createDexieArrayQuery(() => db.grades.toArray());

  createEffect(() => {
    if (formData.dpto !== null) {
      setFormData('prov', null);
      setFormData('mun', null);
      setFormData('school', null);
    }
  });
  createEffect(() => {
    if (formData.prov !== null) {
      setFormData('mun', null);
      setFormData('school', null);
    }
  });
  createEffect(() => {
    if (formData.mun !== null) {
      setFormData('school', null);
    }
  });

  const isFormInvalid = () => Object.keys(formData).some((key) => {
    const value = formData[key as keyof FormData];
    if (value === null || value === '') return true;
    return false;
  });

  const handleSubmit: FormSubmitHandler = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <Title text={`Nuevo curso ${year.value}`} backTo="/" />
      <Show when={isOnline()} fallback={<Alert status="warning" text="Lo sentimos, pero esta sección requiere conexión a Internet." />}>
        <SimpleGrid columns={{ '@initial': 1, '@md': 2 }}>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" gap="$4">
              <Text>Luego de crear un curso podrá registrar estudiantes, controlar asistencia, actividades y notas.</Text>
              <Alert status="danger" title="Error inesperado!" text={serverErr()} setText={setServerErr} />

              <Box>
                <Text size="sm" mb="$1">Departamento:</Text>
                <SimpleSelect
                  disabled={deps.loading}
                  placeholder="Seleccione departamento"
                  value={formData.dpto}
                  onChange={(val) => setFormData('dpto', val)}
                >
                  <For each={deps()}>
                    {(dep) => <SimpleOption value={dep.id}>{dep.name}</SimpleOption>}
                  </For>
                </SimpleSelect>
              </Box>

              <Box>
                <Text size="sm" mb="$1">Provincia:</Text>
                <SimpleSelect
                  disabled={provs.loading}
                  placeholder="Seleccione provincia"
                  value={formData.prov}
                  onChange={(val) => setFormData('prov', val)}
                >
                  <For each={provs()}>
                    {(prov) => <SimpleOption value={prov.id}>{prov.name}</SimpleOption>}
                  </For>
                </SimpleSelect>
              </Box>

              <Box>
                <Text size="sm" mb="$1">Municipio:</Text>
                <SimpleSelect
                  disabled={muns.loading}
                  placeholder="Seleccione municipio"
                  value={formData.mun}
                  onChange={(val) => setFormData('mun', val)}
                >
                  <For each={muns()}>
                    {(mun) => <SimpleOption value={mun.id}>{mun.name}</SimpleOption>}
                  </For>
                </SimpleSelect>
              </Box>

              <Box>
                <Text size="sm" mb="$1">Establecimiento educativo:</Text>
                <SimpleSelect
                  disabled={schools.loading}
                  placeholder="Seleccione colegio"
                  value={formData.school}
                  onChange={(val) => setFormData('school', val)}
                >
                  <For each={schools()}>
                    {(school) => <SimpleOption value={school.id}>{school.name}</SimpleOption>}
                  </For>
                </SimpleSelect>
              </Box>

              <Box>
                <Text size="sm" mb="$1">Materia:</Text>
                <SimpleSelect
                  placeholder="Seleccione materia"
                  value={formData.subject}
                  onChange={(val) => setFormData('subject', val)}
                >
                  <For each={subjects}>
                    {(subject) => <SimpleOption value={subject.id}>{subject.name}</SimpleOption>}
                  </For>
                </SimpleSelect>
              </Box>

              <Box>
                <Text size="sm" mb="$1">Curso:</Text>
                <SimpleSelect
                  placeholder="Seleccione curso"
                  value={formData.grade}
                  onChange={(val) => setFormData('grade', val)}
                >
                  <For each={grades}>
                    {(grade) => <SimpleOption value={grade.id}>{grade.name}</SimpleOption>}
                  </For>
                </SimpleSelect>
              </Box>

              <Box>
                <Text size="sm" mb="$1">Paralelo:</Text>
                <Input
                  value={formData.parallel}
                  onInput={(ev) => setFormData('parallel', ev.currentTarget.value)}
                />
              </Box>

              <Button disabled={isFormInvalid()} type="submit" mt="$4">
                Registrar
              </Button>
            </Stack>
          </form>
          <Box />
        </SimpleGrid>
      </Show>
    </>
  );
};

export default NewClass;
