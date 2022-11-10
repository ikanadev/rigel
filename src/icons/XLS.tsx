import type { Component } from 'solid-js';

import { Icon, IconProps } from '@hope-ui/solid';
import { mergeProps } from 'solid-js';

const XLS: Component<IconProps> = (props) => {
  const iconProps = mergeProps(
    { width: '48px', height: '48px', viewBox: '0 0 48 48', fill: 'currentColor' },
    props,
  );
  return (
    <Icon {...iconProps}>
      <path d="m23.6 4-.8.1-14.2 3C6.5 7.6 5 9.4 5 11.5v25c0 2 1.5 4 3.6 4.4l14.2 3c2.1.4 4.2-1.3 4.2-3.5V7.6c0-2-1.6-3.5-3.4-3.5zM30 8v33h8.5c2.5 0 4.5-2 4.5-4.5v-24C43 10 41 8 38.5 8H30zm4.5 7h3a1.5 1.5 0 1 1 0 3h-3a1.5 1.5 0 1 1 0-3zm-22 2c.5 0 1 .3 1.3.7l2.2 3.5 2.2-3.5c.5-.7 1.4-1 2.1-.5.7.5 1 1.4.5 2.1l-3 4.7 3 4.7c.4.7.2 1.6-.5 2-.2.2-.5.3-.8.3-.5 0-1-.2-1.3-.7L16 26.8l-2.2 3.5a1.5 1.5 0 0 1-2.1.5c-.7-.5-1-1.4-.5-2.1l3-4.7-3-4.7c-.4-.7-.2-1.6.5-2 .3-.2.5-.3.8-.3zm22 6h3a1.5 1.5 0 1 1 0 3h-3a1.5 1.5 0 1 1 0-3zm0 8h3a1.5 1.5 0 1 1 0 3h-3a1.5 1.5 0 1 1 0-3z" />
    </Icon>
  );
};

export default XLS;
