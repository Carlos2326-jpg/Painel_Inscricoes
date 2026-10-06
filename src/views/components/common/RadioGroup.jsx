import '../../_shared/style/components/common/RadioGroup.css';

/** options: [{ value, label }] */
export function RadioGroup({ legend, name, value, onChange, options }) {
  return (
    <fieldset className="radio-group">
      <legend className="radio-group__legend">{legend}</legend>
      {options.map((option) => (
        <label key={option.value} className="radio">
          <input
            className="radio__input"
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="radio__mark" aria-hidden="true" />
          <span className="radio__label">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
