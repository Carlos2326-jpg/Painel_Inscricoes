import { useEffect, useState } from 'react';
import { INK_BLOBS, INK_LAYOUTS, INK_SEED } from './inkLayouts.js';
import './InkBackground.css';

/** Converte a posição de uma mancha em CSS (transition anima de um layout para o outro). */
function blobStyle({ x, y, sx, sy, rot, opacity, r }, index) {
  return {
    // --ink-pad compensa a camada ser maior que a tela (ver .ink__layer no CSS)
    transform: `translate3d(calc(${x}vw + var(--ink-pad) - 50%), calc(${y}vh + var(--ink-pad) - 50%), 0) rotate(${rot}deg) scale(${sx}, ${sy})`,
    opacity,
    borderRadius: r,
    transitionDelay: `${index * 70}ms`,
  };
}

/**
 * Fundo de "tinta". A cada mudança de etapa as manchas escorrem até a posição
 * definida em InkBackground/inkLayouts.js para aquela etapa.
 */
export function InkBackground({ step }) {
  const [ready, setReady] = useState(false);

  // Começa com a tinta "semente" no centro e, no frame seguinte, espalha até o layout da etapa.
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  const layout = INK_LAYOUTS[Math.min(step, INK_LAYOUTS.length - 1)];

  return (
    <div className="ink" aria-hidden="true">
      <div className="ink__layer">
        {INK_BLOBS.map((blob, index) => (
          <div key={blob.id} className="ink__blob" style={blobStyle(ready ? layout[blob.id] : INK_SEED[blob.id], index)}>
            <span
              className="ink__drift"
              style={{ background: blob.color, '--drift-duration': `${blob.drift}s`, '--drift-delay': `${blob.delay}s` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
