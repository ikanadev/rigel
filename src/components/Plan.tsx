import { Component, Show } from "solid-js";
import { Text } from "@hope-ui/solid";
import { StarMini } from "@app/icons";

const Plan: Component<{ premium: boolean }> = (props) => {
	return (
		<Show
			when={props.premium}
			fallback={
				<Text
					as="span"
					bg="$neutral10"
					color="$neutral2"
					fontWeight={500}
					px="$1_5"
					py="$0_5"
					rounded="$sm"
					fontSize="$sm"
				>
					EST&Aacute;NDAR
				</Text>
			}
		>
			<Text
				as="span"
				bg="$primary9"
				color="white"
				fontWeight={500}
				px="$1_5"
				py="$0_5"
				rounded="$sm"
				fontSize="$sm"
			>
				PREMIUM
				<StarMini w="$4" h="$4" mb="$1" />
			</Text>
		</Show>
	);
};

export default Plan;
