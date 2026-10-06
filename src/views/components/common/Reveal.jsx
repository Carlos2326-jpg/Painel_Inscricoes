import '../../_shared/style/components/common/Reveal.css';

/**
 * Envolve textos/campos/botões de uma etapa para dar a eles a animação de
 * introdução (entram em sequência) e de saída (somem arrastando para o lado).
 *
 * A animação é controlada pelo `data-state` do <StepPanel> pai (ver Reveal.css).
 * `index` define a ordem da sequência (cada item espera um pouco mais que o anterior).
 */
export function Reveal({ as: Tag = 'div', index = 0, className = '', style, children, ...rest }) {
  return (
    <Tag className={`reveal ${className}`.trim()} style={{ '--i': index, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
