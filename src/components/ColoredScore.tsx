import { Component, createMemo } from "solid-js";
import { Text, TextProps } from "@hope-ui/solid";

import { coloredScoresSignal } from "@app/hooks";

const ColoredScore: Component<{ score: number } & TextProps> = (props) => {
	const { coloredScores } = coloredScoresSignal;

	const getColor = createMemo(() => {
		switch (true) {
			case props.score <= 50:
				return "$danger11";
			case props.score <= 60:
				return "#d0b322";
			case props.score <= 70:
				return "#b1bd12";
			case props.score <= 80:
				return "#62a901";
			case props.score <= 90:
				return "#24a401";
			case props.score <= 100:
				return "#00a016";
			default:
				return "$neutral10";
		}
	});

	return (
		<Text
			color={coloredScores() ? getColor() : "$neutral12"}
			fontWeight="$medium"
			size="base"
			{...props}
		>
			{props.score}
		</Text>
	);
};

export default ColoredScore;
