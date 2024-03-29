import type { Component } from "solid-js";

import { Icon, IconProps } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

const ClipboardDocumentListMini: Component<IconProps> = (props) => {
	const iconProps = mergeProps(
		{ w: "20px", h: "20px", viewBox: "0 0 20 20", fill: "currentColor" },
		props,
	);
	return (
		<Icon {...iconProps}>
			<path
				fill-rule="evenodd"
				d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z"
				clip-rule="evenodd"
			/>
			<path
				fill-rule="evenodd"
				d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
				clip-rule="evenodd"
			/>
		</Icon>
	);
};

export default ClipboardDocumentListMini;
