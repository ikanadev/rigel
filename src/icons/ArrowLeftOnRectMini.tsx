import type { Component } from "solid-js";

import { Icon, IconProps } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

const ArrowLeftOnRectMini: Component<IconProps> = (props) => {
	const iconProps = mergeProps(
		{ w: "20px", h: "20px", viewBox: "0 0 20 20", fill: "currentColor" },
		props,
	);
	return (
		<Icon {...iconProps}>
			<path
				fill-rule="evenodd"
				d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
				clip-rule="evenodd"
			/>
			<path
				fill-rule="evenodd"
				d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
				clip-rule="evenodd"
			/>
		</Icon>
	);
};

export default ArrowLeftOnRectMini;
