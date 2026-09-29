import './ActionButton.css';

/**
 * variant: "primary" (vermelho) | "teal" (turquesa, usado no "Finalizar")
 * icon: elemento opcional exibido depois do texto
 */
export function ActionButton({ variant = 'primary', icon = null, className = '', children, type = 'button', ...rest }) {
  return (
    <button type={type} className={`btn btn--${variant} ${className}`.trim()} {...rest}>
      <span className="btn__label">{children}</span>
      {icon}
    </button>
  );
}
