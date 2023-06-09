import { createSignal } from "solid-js";

const booleanSignal = (defaultState?: boolean) => {
	const [isActive, setActive] = createSignal(defaultState ?? false);
	const enable = () => setActive(true);
	const disable = () => setActive(false);
	const toggle = () => setActive((prev) => !prev);
	return { isActive, enable, disable, toggle };
};

export default booleanSignal;
