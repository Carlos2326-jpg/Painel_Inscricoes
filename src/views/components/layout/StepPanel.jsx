import { useEffect, useRef } from 'react';
import { Reveal } from '../common/Reveal.jsx';
import { BackButton } from '../common/BackButton.jsx';
import { getPanelState } from './StepPanel/getPanelState.js';
import '../../_shared/style/components/layout/StepPanel.css';

/**
 * Uma etapa do formulário. Todas as etapas ficam montadas ao mesmo tempo (uma sobre a outra)
 * e o CSS anima a transição de acordo com o `data-state` calculado aqui.
 *
 * variant        "glass" → caixa de vidro (etapas 1 a 3) | "plain" → sem caixa (tela final)
 * onBack         se informado, mostra o botão de voltar (desabilitado com `backDisabled`)
 * onHeightChange (index, altura) → informa a altura natural do conteúdo, para o pai
 *                ajustar a altura do "baralho" à etapa atual
 */
export function StepPanel({
  index,
  current,
  variant = 'glass',
  labelledBy,
  onBack,
  backDisabled = false,
  onHeightChange,
  children,
}) {
  const { state, depth } = getPanelState(index, current);
  const isActive = state === 'active';
  const panelRef = useRef(null);
  const contentRef = useRef(null);

  // Leva o foco para a etapa que acabou de aparecer (leitores de tela e teclado).
  useEffect(() => {
    if (isActive) panelRef.current?.focus({ preventScroll: true });
  }, [isActive]);

  // Mede a altura natural do conteúdo (muda com fonte, largura da tela, textos quebrando etc.).
  useEffect(() => {
    const node = contentRef.current;
    if (!node || !onHeightChange) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      onHeightChange(index, Math.ceil(height));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [index, onHeightChange]);

  return (
    <section
      ref={panelRef}
      tabIndex={-1}
      role="group"
      aria-labelledby={labelledBy}
      inert={!isActive}
      className={`step-panel step-panel--${variant}`}
      data-state={state}
      style={{ '--depth': depth }}
    >
      {variant === 'glass' && <span className="step-panel__tint" aria-hidden="true" />}

      <div className="step-panel__body">
        {onBack && (
          <Reveal index={0} className="step-panel__back">
            <BackButton onClick={onBack} disabled={backDisabled} />
          </Reveal>
        )}
        <div ref={contentRef} className="step-panel__content">
          {children}
        </div>
      </div>
    </section>
  );
}
