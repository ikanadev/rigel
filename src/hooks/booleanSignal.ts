import { createSignal } from 'solid-js';

const booleanSignal = (defaultState?: boolean) => {
  const [active, setActive] = createSignal(defaultState ?? false);
  const enable = () => setActive(true);
  const disable = () => setActive(false);
  const toggle = () => setActive((prev) => !prev);
  return { active, enable, disable, toggle };
};

export default booleanSignal;
