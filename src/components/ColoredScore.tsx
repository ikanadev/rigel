import { Component, createMemo } from 'solid-js';
import { Text, TextProps } from '@hope-ui/solid';

const ColoredScore: Component<{ score: number } & TextProps> = (props) => {
  const getColor = createMemo(() => {
    switch (true) {
      case props.score < 51:
        return '$danger9';
      case props.score < 64:
        return '$warning10';
      case props.score < 80:
        return '$info10';
      case props.score <= 100:
        return '$success10';
      default:
        return '$neutral10';
    }
  });
  return (
    <Text color={getColor()} {...props} fontWeight="$semibold" size="base">
      {props.score}
    </Text>
  );
};

export default ColoredScore;
