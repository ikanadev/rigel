import type { Component } from 'solid-js';

import { Icon, IconProps } from '@hope-ui/solid';
import { mergeProps } from 'solid-js';

const ChevronDown: Component<IconProps> = (props) => {
  const iconProps = mergeProps(
    { w: '24px', h: '24px', viewBox: '0 0 24 24', fill: 'currentColor' },
    props,
  );
  return (
    <Icon {...iconProps}>
      <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
    </Icon>

  );
};

export default ChevronDown;
