import type { Component } from 'solid-js';

import { Icon, IconProps } from '@hope-ui/solid';
import { mergeProps } from 'solid-js';

const ChevronRight: Component<IconProps> = (props) => {
  const iconProps = mergeProps(
    { w: '24px', h: '24px', viewBox: '0 0 24 24', fill: 'currentColor' },
    props,
  );
  return (
    <Icon {...iconProps}>
      <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
    </Icon>

  );
};

export default ChevronRight;
