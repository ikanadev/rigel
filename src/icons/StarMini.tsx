import type { Component } from "solid-js";

import { Icon, IconProps } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

const StarMini: Component<IconProps> = (props) => {
	const iconProps = mergeProps(
		{ w: "20px", h: "20px", viewBox: "0 0 20 20", fill: "currentColor" },
		props,
	);
	return (
		<Icon {...iconProps}>
			<path
				fill-rule="evenodd"
				d="M10.9 2.9a1 1 0 0 0-1.8 0L7.3 7.3l-4.8.4A1 1 0 0 0 2 9.3l3.6 3.1-1 4.7a1 1 0 0 0 1.3 1l4.1-2.5 4 2.5a1 1 0 0 0 1.5-1l-1.1-4.7 3.6-3a1 1 0 0 0-.5-1.7l-4.8-.4-1.8-4.4z"
				clip-rule="evenodd"
			/>
		</Icon>
	);
};

export default StarMini;
