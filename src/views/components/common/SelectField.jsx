import { ChevronDownIcon } from './Icons/Icons.jsx';
import '../../_shared/style/components/common/TextField/TextField.css';
import '../../_shared/style/components/common/SelectField.css';

/**
 * Select nativo (acessível e com o seletor do próprio celular) com visual customizado.
 * options: [{ value, label }]
 */
export function SelectField({ id, label, error, options, placeholder = 'Selecione', value, ...selectProps }) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <div className="select">
        <select
          id={id}
          className="field__control select__control"
          value={value}
          data-empty={value === ''}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...selectProps}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="select__icon" />
      </div>
      <p id={errorId} className="field__error" data-visible={Boolean(error)} role={error ? 'alert' : undefined}>
        {error}
      </p>
    </div>
  );
}
