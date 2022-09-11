import type { Component, JSX } from 'solid-js';
import type { InputState } from '@app/types';

import { Show, createSignal } from 'solid-js';
import {
  Container,
  Flex,
  Box,
  Text,
  Heading,
  Input,
  Button,
  Anchor,
} from '@hope-ui/solid';
import { Logo } from '@app/icons';
import { ColorModeButton } from '@app/components';

import { createStore } from 'solid-js/store';
import { useNavigate, Link } from '@solidjs/router';
import { nonEmptyValidator, emailValidator, minLenValidator, getErrorMsg } from '@app/utils/functions';
import { signIn } from '@app/api';

interface FormData {
  email: InputState
  password: InputState
}
const validators: {[key in keyof FormData]: Array<(val: string) => string> } = {
  email: [nonEmptyValidator, emailValidator],
  password: [nonEmptyValidator, minLenValidator(6)],
};
const emptyField: () => InputState = () => ({ value: '', errorMsg: '', isTouched: false });

const SignIn: Component = () => {
  const navigate = useNavigate();
  const [serverErr, setServerErr] = createSignal('');
  const [formData, setFormData] = createStore<FormData>({
    email: emptyField(),
    password: emptyField(),
  });

  const isDisabled = (): boolean => {
    return Object.keys(formData).some(
      (key) => formData[key as keyof FormData].errorMsg !== '' ||
      formData[key as keyof FormData].value === '',
    );
  };

  const onChange: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (ev) => {
    const el = ev.currentTarget;
    const field = el.name as keyof FormData;
    if (serverErr() !== '') {
      setServerErr('');
    }
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

  const handleSubmit: JSX.EventHandlerUnion<HTMLFormElement, Event> = (ev) => {
    ev.preventDefault();
    signIn({
      email: formData.email.value,
      password: formData.password.value,
    }).then((resp) => {
      // TODO: save to indexedDb and redirect
      console.log(navigate);
      console.log(resp);
    }).catch((err) => {
      getErrorMsg(err).then((msg) => {
        setServerErr(msg);
      }).catch((err) => {
        // TODO: handle 500 errors
        console.log(err);
      });
    });
  };

  return (
    <Container p="$4" pos="relative">
      <Box pos="absolute" top="$3" right="$3">
        <ColorModeButton />
      </Box>

      <Flex flexDirection="column" mt="$16">
        <Flex flexDirection="column" alignItems="center">
          <Box maxW="$24" mb="$6">
            <Logo width="100%" height="100%" />
          </Box>
          <Heading level="1" size="4xl" color="$primary9">Rigel</Heading>
          <Text textAlign="center" mt="$2">
            La WebApp de los profesores de 🇧🇴 Bolivia.
          </Text>
        </Flex>
      </Flex>

      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" mt="$8">
          <Heading level="3" size="xl" color="$primary9" mb="$4">
            Iniciar sesión:
          </Heading>
          <Text color="$danger10" size="sm" textAlign="center">{serverErr()}</Text>
          <Input
            onInput={onChange}
            value={formData.email.value}
            name="email"
            placeholder="Correo"
            invalid={formData.email.isTouched && formData.email.errorMsg !== ''}
            mt="$4"
          />
          <Show when={formData.email.isTouched && formData.email.errorMsg !== ''}>
            <Text color="$danger10" size="sm">{formData.email.errorMsg}</Text>
          </Show>
          <Input
            onInput={onChange}
            value={formData.password.value}
            name="password"
            placeholder="Contraseña"
            invalid={formData.password.isTouched && formData.password.errorMsg !== ''}
            mt="$4"
            type="password"
          />
          <Show when={formData.password.isTouched && formData.password.errorMsg !== ''}>
            <Text color="$danger10" size="sm">{formData.password.errorMsg}</Text>
          </Show>
          <Button disabled={isDisabled()} mt="$8" type="submit">
            Iniciar
          </Button>
          <Text color="$neutral11" textAlign="right" size="sm" mt="$2">
            ¿Aún no tienes una cuenta?{' '}
            <Anchor as={Link} href="/signup" fontWeight="$bold" color="$primary11">
              Registrarme
            </Anchor>
          </Text>
        </Flex>
      </form>
    </Container>
  );
};

export default SignIn;
