import type { Component } from 'solid-js';

import { Icon, IconProps } from '@hope-ui/solid';
import { mergeProps } from 'solid-js';

const BarsArrowDown: Component<IconProps> = (props) => {
  const iconProps = mergeProps(
    { w: '24px', h: '24px', viewBox: '0 0 24 24', fill: 'none', 'stroke-width': '1.5', stroke: 'currentColor' },
    props,
  );
  return (
    <Icon {...iconProps}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
    </Icon>

  );
};

export default BarsArrowDown;
