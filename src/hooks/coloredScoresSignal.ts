import { createSignal, createRoot } from 'solid-js';

const COLORED_SCORES_KEY = 'COLORED_SCORES_KEY';

const coloredScoresSignal = () => {
  const [coloredScores, setColoredScores] = createSignal(Boolean(localStorage.getItem(COLORED_SCORES_KEY)));
  const turnOn = () => {
    setColoredScores(true);
    localStorage.setItem(COLORED_SCORES_KEY, 'true');
  };
  const turnOff = () => {
    setColoredScores(false);
    localStorage.setItem(COLORED_SCORES_KEY, '');
  };
  const toggle = () => {
    if (coloredScores()) {
      turnOff();
    } else {
      turnOn();
    }
  };
  return {
    coloredScores,
    turnOn,
    turnOff,
    toggle,
  };
};

export default createRoot(coloredScoresSignal);
