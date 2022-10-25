import type { Component } from 'solid-js';

import { createSignal } from 'solid-js';
import { Title, Alert, NewStudentForm } from '@app/components';
import { NewStudentFormData } from '@app/components/NewStudentForm';

import { useNavigate } from '@solidjs/router';
import { nanoid } from 'nanoid';
import { useAppData } from '@app/context';
import { addStudent } from '@app/db/student';

const NewStudent: Component = () => {
  const navigate = useNavigate();
  const { classStore } = useAppData();
  const [errorMsg, setErrorMsg] = createSignal('');

  const onSubmit = (data: NewStudentFormData) => {
    addStudent({
      id: nanoid(),
      name: data.name.value,
      last_name: data.last_name.value,
      ci: data.ci.value,
      class_id: classStore.class!.id,
    })
      .then(() => {
        navigate(`/class/${classStore.class!.id}/students`);
      }).catch(() => {
        setErrorMsg('Error registrando estudiante.');
      });
  };

  return (
    <>
      <Title text="Registrar estudiante" backTo={`/class/${classStore.class!.id}/students`} />
      <Alert status="danger" text={errorMsg()} setText={setErrorMsg} />
      <NewStudentForm onSubmit={onSubmit} />
    </>
  );
};

export default NewStudent;
