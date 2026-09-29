import { useEffect, useState } from 'react';

/**
 * Devolve `false` no primeiro render e `true` logo depois (2 frames).
 * Serve para o CSS enxergar o estado inicial e então animar até o estado final
 * (ex.: a caixa nasce fora da tela, à direita, e é arrastada até o centro).
 */
export function useEntrance() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  return entered;
}
