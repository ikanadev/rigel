import { Component, JSX } from "solid-js";
import { Button } from "@hope-ui/solid";
import { Link } from "@solidjs/router";

interface Props {
	href: string;
	icon?: JSX.Element;
	text: JSX.Element;
	onClick?: () => void;
	colorScheme?:
		| "info"
		| "primary"
		| "accent"
		| "neutral"
		| "success"
		| "warning"
		| "danger";
}
const LinkButton: Component<Props> = (props) => {
	return (
		<Button
			as={Link}
			compact
			// eslint-disable-next-line solid/reactivity
			onClick={props.onClick}
			href={props.href}
			variant="ghost"
			colorScheme={props.colorScheme}
			justifyContent="start"
			leftIcon={props.icon}
		>
			{props.text}
		</Button>
	);
};

export default LinkButton;
