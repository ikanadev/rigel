import type { Component } from 'solid-js';

import {
  Container,
  Flex,
  Box,
  Text,
  Heading,
  IconButton,
  Select,
  SelectTrigger,
  SelectPlaceholder,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectListbox,
  SelectOption,
  SelectOptionText,
  SelectOptionIndicator,
  useColorMode,
} from '@hope-ui/solid';
import { Logo, Moon, Sun } from '@app/icons';

const SignUp: Component = () => {
  const colorMode = useColorMode();
  return (
    <Container p="$4" pos="relative">
      <Box pos="absolute" top="$3" right="$3">
        <IconButton
          aria-label="Cambiar color"
          onClick={colorMode.toggleColorMode}
          variant="ghost"
          color={colorMode.colorMode() === 'light' ? 'orange' : 'aqua'}
          icon={colorMode.colorMode() === 'light' ? <Sun /> : <Moon />}
        />
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

      <Flex flexDirection="column" mt="$8">
        <Heading level="3" size="xl" color="$primary9" mb="$4">
          Registrate para iniciar:
        </Heading>
        <Select>
          <SelectTrigger>
            <SelectPlaceholder>
              Departamento
            </SelectPlaceholder>
            <SelectValue />
            <SelectIcon />
          </SelectTrigger>
          <SelectContent>
            <SelectListbox>
              <SelectOption value="lp">
                <SelectOptionText>La Paz</SelectOptionText>
                <SelectOptionIndicator />
              </SelectOption>
              <SelectOption value="cbba">
                <SelectOptionText>Cochabamba</SelectOptionText>
                <SelectOptionIndicator />
              </SelectOption>
            </SelectListbox>
          </SelectContent>
        </Select>
      </Flex>
    </Container>
  );
};

export default SignUp;
