import './TextField.css';

/**
 * Campo de texto com rótulo e mensagem de erro.
 * O espaço da mensagem é sempre reservado para o layout não "pular" quando o erro aparece.
 */
export function TextField({ id, label, error, ...inputProps }) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="field__control"
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...inputProps}
      />
      <p id={errorId} className="field__error" data-visible={Boolean(error)} role={error ? 'alert' : undefined}>
        {error}
      </p>
    </div>
  );
}
