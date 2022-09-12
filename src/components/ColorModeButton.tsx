
import type { Component } from 'solid-js';

import { IconButton, IconButtonProps, useColorMode } from '@hope-ui/solid';
import { Moon, Sun } from '@app/icons';

const ColorModeButton: Component<Omit<IconButtonProps, 'aria-label' | 'icon'>> = (props) => {
  const colorMode = useColorMode();
  return (
    <IconButton
      {...props}
      aria-label="Cambiar color"
      onClick={colorMode.toggleColorMode}
      variant="ghost"
      color={colorMode.colorMode() === 'light' ? '#04A8B3' : 'orange'}
      icon={colorMode.colorMode() === 'light' ? <Moon /> : <Sun />}
    />
  );
};

export default ColorModeButton;
