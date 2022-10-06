import { Component, createMemo } from 'solid-js';
import { Text, TextProps } from '@hope-ui/solid';

import { coloredScoresSignal } from '@app/hooks';

const ColoredScore: Component<{ score: number } & TextProps> = (props) => {
  const { coloredScores } = coloredScoresSignal;

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
    <Text color={coloredScores() ? getColor() : '$neutral12'} {...props} fontWeight="$semibold" size="base">
      {props.score}
    </Text>
  );
};

export default ColoredScore;
