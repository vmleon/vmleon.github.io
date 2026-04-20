import { useEffect, useRef } from 'react';

const KEY_MAP = {
  KeyW: 'forward', ArrowUp: 'forward',
  KeyS: 'backward', ArrowDown: 'backward',
  KeyA: 'left', ArrowLeft: 'left',
  KeyD: 'right', ArrowRight: 'right',
};

export function useKeys() {
  const keys = useRef({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    const down = (e) => {
      const k = KEY_MAP[e.code];
      if (k) { keys.current[k] = true; e.preventDefault(); }
    };
    const up = (e) => {
      const k = KEY_MAP[e.code];
      if (k) keys.current[k] = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return keys;
}
