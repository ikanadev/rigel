import { createSignal, onCleanup } from 'solid-js';

const windowWidthToColumns = (w: number) => {
  switch (true) {
    case w < 640:
      return 0;
    case w < 768:
      return 2;
    case w < 1024:
      return 3;
    case w < 1280:
      return 5;
    case w < 1536:
      return 7;
    case w >= 1536:
      return 9;
    default:
      return 1;
  }
};

const attendanceColumnsSignal = () => {
  const [columns, setColumns] = createSignal(windowWidthToColumns(window.innerWidth));

  const resizeHandler = () => {
    setColumns(windowWidthToColumns(window.innerWidth));
  };

  window.addEventListener('resize', resizeHandler);

  onCleanup(() => {
    window.removeEventListener('resize', resizeHandler);
  });

  return columns;
};

export default attendanceColumnsSignal;
