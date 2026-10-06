import { useCallback, useState } from 'react';

/**
 * Controla a etapa atual e a direção da navegação ("forward" | "back"),
 * que o componente de progresso usa para animar de forma diferente ao avançar e ao voltar.
 */
export function useStepper(totalSteps) {
  const [state, setState] = useState({ step: 0, direction: 'forward' });

  const next = useCallback(
    () =>
      setState((s) => (s.step >= totalSteps - 1 ? s : { step: s.step + 1, direction: 'forward' })),
    [totalSteps],
  );

  const back = useCallback(
    () => setState((s) => (s.step <= 0 ? s : { step: s.step - 1, direction: 'back' })),
    [],
  );

  const reset = useCallback(() => setState({ step: 0, direction: 'back' }), []);

  return { step: state.step, direction: state.direction, next, back, reset };
}
