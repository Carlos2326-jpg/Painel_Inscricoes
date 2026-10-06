import { Fragment } from 'react';
import '../../_shared/style/components/layout/ProgressBar.css';

/**
 * Barra de progresso independente das caixas: fica em posição absoluta no topo
 * e tem a própria animação (a linha vermelha preenche de ponto em ponto).
 *
 * current   → índice da etapa atual (-1 antes da animação de entrada)
 * direction → "forward" | "back" (muda a ordem: linha → ponto ao avançar; ponto → linha ao voltar)
 */
export function ProgressBar({ current, total, direction }) {
  return (
    <div
      className="progress"
      data-direction={direction}
      role="progressbar"
      aria-label="Progresso da inscrição"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={Math.max(current + 1, 1)}
      aria-valuetext={`Etapa ${Math.max(current + 1, 1)} de ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <Fragment key={i}>
          <span className="progress__dot" data-on={i <= current} data-current={i === current} />
          {i < total - 1 && (
            <span className="progress__line">
              <span className="progress__fill" data-on={i < current} />
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
