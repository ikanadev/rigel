
import type { Component } from 'solid-js';

import { IconButton, useColorMode } from '@hope-ui/solid';
import { Moon, Sun } from '@app/icons';

const ColorModeButton: Component = () => {
  const colorMode = useColorMode();
  return (
    <IconButton
      aria-label="Cambiar color"
      onClick={colorMode.toggleColorMode}
      variant="ghost"
      color={colorMode.colorMode() === 'light' ? '#04A8B3' : 'orange'}
      icon={colorMode.colorMode() === 'light' ? <Moon /> : <Sun />}
    />
  );
};

export default ColorModeButton;
