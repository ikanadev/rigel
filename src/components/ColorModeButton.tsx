
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
      color={colorMode.colorMode() === 'light' ? 'orange' : '#04A8B3'}
      icon={colorMode.colorMode() === 'light' ? <Sun /> : <Moon />}
    />
  );
};

export default ColorModeButton;
