import type { Component } from 'solid-js';

import { Icon, IconProps } from '@hope-ui/solid';
import { mergeProps } from 'solid-js';

const CheckCircleMini: Component<IconProps> = (props) => {
  const iconProps = mergeProps(
    { width: '20px', height: '20px', viewBox: '0 0 20 20', fill: 'currentColor' },
    props,
  );
  return (
    <Icon {...iconProps}>
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
    </Icon>

  );
};

export default CheckCircleMini;
