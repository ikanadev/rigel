import { Text, Anchor } from '@hope-ui/solid';
import { Link } from '@solidjs/router';

import { useAppData } from '@app/context';

const NoStudentsMessage = () => {
  const { classStore } = useAppData();
  return (
    <>
      <Text textAlign="center" fontStyle="italic" my="$6">
        <Text color="$neutral10" as="span">
          No hay estudiantes registrados en esta materia, agrega estudiantes desde el menu de:
        </Text>
        <Anchor as={Link} href={`/class/${classStore.class!.id}/students`} color="$primary10">
          {' '}Administrar Estudiantes
        </Anchor>
      </Text>
    </>
  );
};

export default NoStudentsMessage;
