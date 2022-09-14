import type { Component } from 'solid-js';

import { Show } from 'solid-js';
import { Alert as HopeAlert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@hope-ui/solid';

interface Props {
  status: 'danger' | 'info' | 'warning' | 'success'
  title?: string
  text: string
  setText?: (newText: string) => void
}
const Alert: Component<Props> = (props) => {
  const handleClose = () => {
    props.setText?.('');
  };
  return (
    <Show when={props.text.length > 0}>
      <HopeAlert status={props.status}>
        <AlertIcon mr="$2" />

        <Show when={props.title !== undefined}>
          <AlertTitle mr="$2">{props.title}</AlertTitle>
        </Show>
        <AlertDescription flex="1">{props.text}</AlertDescription>
        <Show when={props.setText !== undefined}>
          <CloseButton onClick={handleClose} />
        </Show>
      </HopeAlert>
    </Show>
  );
};

export default Alert;
