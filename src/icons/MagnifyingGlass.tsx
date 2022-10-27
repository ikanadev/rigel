import type { Component } from 'solid-js';

import { Icon, IconProps } from '@hope-ui/solid';
import { mergeProps } from 'solid-js';

const MagnifyingGlass: Component<IconProps> = (props) => {
  const iconProps = mergeProps(
    { width: '24px', height: '24px', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '1.5', fill: 'none' },
    props,
  );
  return (
    <Icon {...iconProps}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </Icon>

  );
};

export default MagnifyingGlass;
