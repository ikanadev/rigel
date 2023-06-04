import type { Component } from "solid-js";

import { Icon, IconProps } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

const Whatsapp: Component<IconProps> = (props) => {
	const iconProps = mergeProps(
		{ w: "30px", h: "30px", viewBox: "0 0 30 30", fill: "currentColor" },
		props,
	);
	return (
		<Icon {...iconProps}>
			<path d="M4.8 20.84 3.11 27l6.3-1.66z" />
			<path d="M15 3a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.92 16.14c-.24.7-1.46 1.37-2 1.41-.55.05-1.06.25-3.57-.74-3.02-1.19-4.93-4.29-5.08-4.49a5.76 5.76 0 0 1-1.2-3.07c0-1.46.76-2.18 1.03-2.48.27-.3.6-.37.8-.37l.56.01c.21 0 .45.02.67.51.27.59.84 2.06.92 2.2.07.16.12.33.02.53-.1.2-.15.32-.3.5-.14.17-.3.38-.44.51-.15.15-.3.32-.13.61s.77 1.27 1.65 2.06c1.14 1.01 2.1 1.32 2.4 1.47s.46.13.63-.07c.18-.2.75-.87.95-1.16.2-.3.4-.25.66-.15.28.1 1.74.82 2.04.96s.49.23.56.35c.08.12.08.72-.17 1.41z" />
		</Icon>
	);
};

export default Whatsapp;
