import type { Component } from "solid-js";

import { Icon, IconProps } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

const Plus: Component<IconProps> = (props) => {
	const iconProps = mergeProps(
		{ w: "24px", h: "24px", viewBox: "0 0 24 24", fill: "currentColor" },
		props,
	);
	return (
		<Icon {...iconProps}>
			<path
				fill-rule="evenodd"
				d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
				clip-rule="evenodd"
			/>
		</Icon>
	);
};

export default Plus;
