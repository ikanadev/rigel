import { createRoot, onMount, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getDefaultFontSize } from '@app/utils/functions';

interface FontSizes {
  sm: number
  md: number
  lg: number
  xl: number
}
interface Store {
  valid: boolean
  activeSize: number
  sizes: FontSizes
}
const GROW_FACTOR = 2;
const FONT_SIZE_KEY = 'FONT_SIZE_KEY';

const fontSizeStore = () => {
  const [fontStore, setFontStore] = createStore<Store>({
    valid: false,
    activeSize: 0,
    sizes: {
      sm: 0,
      md: 0,
      lg: 0,
      xl: 0,
    },
  });
  const htmlEl = document.querySelector('html');

  createEffect(() => {
    if (fontStore.activeSize > 0 && fontStore.valid && htmlEl !== null) {
      localStorage.setItem(FONT_SIZE_KEY, fontStore.activeSize.toString());
      htmlEl.style.fontSize = `${fontStore.activeSize}px`;
      console.log('Setting font size: ', fontStore.activeSize);
    }
  });

  onMount(() => {
    if (htmlEl === null) return;
    const baseSize = getDefaultFontSize();
    // if can't get default size, don't provide change font option
    if (baseSize === 0) return;
    setFontStore({
      valid: true,
      sizes: {
        sm: baseSize - GROW_FACTOR,
        md: baseSize,
        lg: baseSize + GROW_FACTOR,
        xl: baseSize + 2 * GROW_FACTOR,
      },
    });
    const savedSizeStr = localStorage.getItem(FONT_SIZE_KEY);
    if (savedSizeStr === null) {
      setFontStore('activeSize', baseSize);
      return;
    }
    const savedSize = parseInt(savedSizeStr);
    const isValidSize = Object.values(fontStore.sizes).some(size => size === savedSize);
    if (isValidSize) {
      setFontStore('activeSize', savedSize);
    } else {
      setFontStore('activeSize', baseSize);
    }
    console.log('Using fontSize: ', fontStore.activeSize);
  });

  const setSm = () => setFontStore('activeSize', fontStore.sizes.sm);
  const setMd = () => setFontStore('activeSize', fontStore.sizes.md);
  const setLg = () => setFontStore('activeSize', fontStore.sizes.lg);
  const setXl = () => setFontStore('activeSize', fontStore.sizes.xl);
  const setFontSize = (n: number) => setFontStore('activeSize', n);

  return { fontStore, setSm, setMd, setLg, setXl, setFontSize };
};

export default createRoot(fontSizeStore);
