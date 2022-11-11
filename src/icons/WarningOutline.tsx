import type { Component } from 'solid-js';

import { Icon, IconProps } from '@hope-ui/solid';
import { mergeProps } from 'solid-js';

const WarningOutline: Component<IconProps> = (props) => {
  const iconProps = mergeProps(
    { w: '24px', h: '24px', viewBox: '0 0 24 24', stroke: 'currentColor', fill: 'none', 'stroke-width': '1.5' },
    props,
  );
  return (
    <Icon {...iconProps}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </Icon>

  );
};

export default WarningOutline;
