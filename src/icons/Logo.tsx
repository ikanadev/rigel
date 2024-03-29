import type { Component } from "solid-js";

import { Icon, IconProps } from "@hope-ui/solid";
import { mergeProps } from "solid-js";

const Logo: Component<IconProps> = (props) => {
	const iconProps = mergeProps(
		{ w: "512px", h: "512px", viewBox: "0 0 512 512" },
		props,
	);
	return (
		<Icon {...iconProps}>
			<defs>
				<linearGradient id="a">
					<stop
						style={{ "stop-color": "#0894b3", "stop-opacity": "1" }}
						offset="0"
					/>
					<stop
						style={{ "stop-color": "#086483", "stop-opacity": "1" }}
						offset="1"
					/>
				</linearGradient>
				<linearGradient
          // @ts-ignore
					href="#a"
					id="b"
					x1="132.4"
					y1="56"
					x2="379.6"
					y2="456"
					gradientUnits="userSpaceOnUse"
					gradientTransform="matrix(1.209 0 0 1.209 -23.7 -53.3)"
				/>
			</defs>
			<path
				style={{
					fill: "url(#b)",
					"fill-rule": "evenodd",
					"stroke-width": "1.11107",
				}}
				d="M187.3 14.4h197a50.8 50.8 0 0 1 51 50.9V447a50.8 50.8 0 0 1-51 50.9h-197a50.8 50.8 0 0 1-51-50.9V65.3a50.8 50.8 0 0 1 51-50.9z"
			/>
			<path
				style={{ fill: "#333", "stroke-width": "1.14713" }}
				d="M132.2 115.4h39.3a12.6 12.6 0 1 1 0 25.3h-39.3a12.6 12.6 0 1 1 0-25.3zM132.2 236.5h39.3a12.6 12.6 0 1 1 0 25.3h-39.3a12.6 12.6 0 1 1 0-25.3zM132.2 357.6h39.3a12.6 12.6 0 1 1 0 25.3h-39.3a12.6 12.6 0 1 1 0-25.3z"
			/>
			<g>
				<path
					d="m254.5 137.5-6.9-1.5q-4-.8-8.5-.8-2 0-5 .4-2.7.3-4.2.7v59H208v-73q6-2.1 13.8-3.9 8.1-1.9 18-1.9 1.7 0 4.2.3l5 .6q2.5.3 5 .9 2.4.4 4.2 1.2z"
					style={{ fill: "#f9f9f9" }}
					transform="matrix(1.3292 0 0 1.3292 -64.3 -65.4)"
					aria-label="r"
				/>
			</g>
			<g>
				<path
					d="M330.4 394.1q-9.5-.1-15.5-2-5.9-2-9.4-5.3-3.4-3.5-4.7-8.3-1.2-5-1.2-11.2v-85l21.9-3.4v84q0 3 .4 5.3.5 2.3 1.6 4 1.4 1.6 3.7 2.6 2.4 1 6.3 1.3z"
					style={{ fill: "#f9f9f9" }}
					transform="translate(-84.4 -133) scale(1.36274)"
					aria-label="l"
				/>
			</g>
		</Icon>
	);
};

export default Logo;
