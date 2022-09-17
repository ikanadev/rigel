import type { Component } from 'solid-js';
import type { Class } from '@app/types';

import { Flex, Heading, Text, Badge, Box } from '@hope-ui/solid';
import { Link } from '@solidjs/router';

import { DEFAULT_CLASS_KEY } from '@app/utils/constants';

const ClassItem: Component<{item: Class}> = (props) => {
  return (
    <Link
      href={`/class/${props.item.id}/attendance`}
      onClick={() => localStorage.setItem(DEFAULT_CLASS_KEY, props.item.id)}
    >
      <Flex
        borderRadius="$sm"
        py="$3"
        px="$4"
        bgColor="$neutral1"
        borderWidth="thin"
        borderColor="$neutral7"
        transition="all 0.5s"
        _hover={{ shadow: 'none', bgColor: '$neutral4' }}
        direction="column"
      >
        <Flex alignItems="start">
          <Heading color="$primary10">
            {props.item.edges.subject.name}
          </Heading>
          <Box flex="1" />
          <Badge colorScheme="primary" fontSize="$lg">{props.item.parallel}</Badge>
        </Flex>
        <Text size="sm">
          {props.item.edges.grade.name}
        </Text>
      </Flex>
    </Link>
  );
};

export default ClassItem;
