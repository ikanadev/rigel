import type { Component } from 'solid-js';
import type { ClassData } from '@app/types';

import { Flex, Heading, Text, Badge } from '@hope-ui/solid';
import { Link } from '@solidjs/router';

import { useAppData } from '@app/context';

const ClassItem: Component<{ item: ClassData }> = (props) => {
  const { actions: { setSelectedClass } } = useAppData();
  return (
    <Link
      href={`/class/${props.item.id}/attendance`}
      onClick={() => setSelectedClass(props.item)}
    >
      <Flex
        borderRadius="$sm"
        p={{ '@initial': '$2', '@md': '$3' }}
        bgColor="$neutral1"
        borderWidth="thin"
        borderColor="$neutral7"
        transition="all 0.5s"
        _hover={{ shadow: 'none', bgColor: '$neutral4' }}
        direction="column"
      >
        <Heading color="$primary10">
          {props.item.subject.name}
        </Heading>
        <Flex alignItems="end">
          <Text size="sm" flex="1">
            {props.item.grade.name}
          </Text>
          <Badge colorScheme="primary" fontSize="$base">{props.item.parallel}</Badge>
        </Flex>
      </Flex>
    </Link>
  );
};

export default ClassItem;
