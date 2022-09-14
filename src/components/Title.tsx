import type { Component } from 'solid-js';

import { Show, onMount } from 'solid-js';
import { Heading, Anchor, Flex, IconButton } from '@hope-ui/solid';
import { Link } from '@solidjs/router';
import { ChevronLeft } from '@app/icons';

interface Props {
  text: string
  backTo?: string
}
const Title: Component<Props> = (props) => {
  onMount(() => {
    document.title = `Rigel | ${props.text}`;
  });
  return (
    <Flex alignItems="center" mb="$6">
      <Show when={props.backTo !== undefined}>
        <Anchor as={Link} href={props.backTo ?? '/'}>
          <IconButton
            aria-label="Atrás"
            variant="subtle"
            size="sm"
            mr="$2"
            icon={<ChevronLeft />}
          />
        </Anchor>
      </Show>
      <Heading color="$primary10" size="xl">{props.text}</Heading>
    </Flex>
  );
};

export default Title;
