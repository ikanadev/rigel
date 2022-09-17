import { Accessor, createSignal } from 'solid-js';

const useLocalStorage = (key: string): [Accessor<string>, (newValue: string) => void] => {
  const initialValue = localStorage.getItem(key) ?? '';

  const [value, setValue] = createSignal(initialValue);

  const newSetValue = (newValue: string): string => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
    return newValue;
  };

  return [value, newSetValue];
};

export default useLocalStorage;
