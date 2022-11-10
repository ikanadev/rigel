import { createSignal, Show } from 'solid-js';
import { Flex, Text, Button, Image } from '@hope-ui/solid';
import { Title, Alert } from '@app/components';
import { XLS } from '@app/icons';
import { OnChangeEvent, XMLData } from '@app/types';

import { parseXLS } from '@app/api';

const StudentFromXLS = () => {
  let inputRef: HTMLInputElement | undefined;
  const [isLoading, setIsLoading] = createSignal(false);
  const [errMsg, setErrMsg] = createSignal('');
  const [xmlData, setXMLData] = createSignal<XMLData | null>(null);

  const handleFileChange: OnChangeEvent = (ev) => {
    const files = ev.currentTarget.files;
    if (files === null || files.length === 0) return;
    setIsLoading(true);
    parseXLS(files[0])
      .then((res) => {
        setXMLData(res);
      })
      .catch(() => {
        setErrMsg('Error leyendo archivo');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSelectFile = () => {
    if (inputRef === undefined) return;
    inputRef.click();
  };

  return (
    <>
      <Title text="Agregar estudiantes desde Excel" />
      <input
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        style={{ display: 'none' }}
      />
      <Alert status="danger" text={errMsg()} setText={setErrMsg} />
      <Show when={xmlData() === null}>
        <Flex justifyContent="center" mt="$6">
          <Flex flexDirection="column" alignItems="center" maxW="$lg" gap="$4">
            <Text textAlign="center">
              Asegúrate que tu archivo tenga los nombres en una columna y los apellidos en otra, como se muestra en la imagen.
            </Text>
            <Image src="/xlsSample.png" shadow="$md" />
            <Button
              onClick={handleSelectFile}
              loading={isLoading()}
              loadingText="Analizando archivo"
              rightIcon={<XLS w="$5" h="$5" />}
              size="sm"
              colorScheme="success"
            >
              Seleccionar archivo
            </Button>
          </Flex>
        </Flex>
      </Show>
      <Show when={xmlData() !== null}>
        <Text>Data</Text>
      </Show>
    </>
  );
};

export default StudentFromXLS;
