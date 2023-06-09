import { createSignal, createRoot } from "solid-js";

const COLORED_ATT_KEY = "COLORED_ATT_KEY";

const coloredAttendancesSignal = () => {
	const [coloredAtts, setColoredAtts] = createSignal(
		Boolean(localStorage.getItem(COLORED_ATT_KEY)),
	);
	const turnOn = () => {
		setColoredAtts(true);
		localStorage.setItem(COLORED_ATT_KEY, "true");
	};
	const turnOff = () => {
		setColoredAtts(false);
		localStorage.setItem(COLORED_ATT_KEY, "");
	};
	const toggle = () => {
		if (coloredAtts()) {
			turnOff();
		} else {
			turnOn();
		}
	};
	return {
		coloredAtts,
		turnOn,
		turnOff,
		toggle,
	};
};

export default createRoot(coloredAttendancesSignal);
