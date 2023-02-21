import type { Component } from 'solid-js';

import { Icon, IconProps } from '@hope-ui/solid';
import { mergeProps } from 'solid-js';

const User: Component<IconProps> = (props) => {
  const iconProps = mergeProps(
    { w: '24px', h: '24px', viewBox: '0 0 24 24', fill: 'currentColor' },
    props,
  );
  return (
    <Icon {...iconProps}>
      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0zM3.8 20.1a8.3 8.3 0 0 1 16.4 0 .8.8 0 0 1-.4.7 18.7 18.7 0 0 1-7.8 1.7c-2.8 0-5.4-.6-7.8-1.7a.8.8 0 0 1-.4-.7z" clip-rule="evenodd" />
    </Icon>

  );
};

export default User;
