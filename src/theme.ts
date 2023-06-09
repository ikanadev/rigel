import type { HopeThemeConfig } from "@hope-ui/solid";

const config: HopeThemeConfig = {
	lightTheme: {},
	darkTheme: {
		shadows: {
			md: "0 4px 6px -1px rgb(255 255 255 / 0.15), 0 2px 4px -2px rgb(255 255 255 / 0.4)",
		},
	},
	components: {
		Table: {
			baseStyle: {
				td: {
					px: "$1_5",
					py: "$1",
				},
				th: {
					px: "$1_5",
					py: "$1",
				},
			},
		},
	},
};

export default config;
