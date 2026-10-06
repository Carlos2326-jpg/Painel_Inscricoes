import { CheckIcon } from '../common/Icons/Icons.jsx';
import '../../_shared/style/components/registration/ActivityOption.css';

/**
 * Cartão de uma atividade (multi-seleção) com a situação das vagas:
 * disponíveis, preenchidas e uma barra de ocupação.
 */
export function ActivityOption({ activity, checked, onToggle }) {
  const { id, type, time, title, description, capacity, filled } = activity;

  const available = Math.max(capacity - filled, 0);
  const soldOut = available === 0;
  const ratio = Math.min(filled / capacity, 1);
  const level = soldOut ? 'full' : ratio >= 0.75 ? 'high' : 'ok';

  return (
    <label className="activity" data-checked={checked} data-disabled={soldOut}>
      <input
        className="activity__input"
        type="checkbox"
        checked={checked}
        disabled={soldOut}
        onChange={() => onToggle(id)}
      />

      <span className="activity__mark" aria-hidden="true">
        <CheckIcon />
      </span>

      <span className="activity__meta">
        <span className="activity__type">{type}</span>
        <span className="activity__time">{time}</span>
      </span>

      <span className="activity__body">
        <span className="activity__title">{title}</span>
        <span className="activity__desc">{description}</span>

        <span className="activity__seats" data-level={level}>
          <span className="activity__bar" aria-hidden="true">
            <span className="activity__bar-fill" style={{ width: `${ratio * 100}%` }} />
          </span>
          <span className="activity__seats-text">
            {soldOut ? <b>Esgotado</b> : <><b>{available}</b> disponíveis</>}
            {' · '}
            <b>{filled}</b> preenchidas
            <span className="sr-only"> de {capacity} vagas</span>
          </span>
        </span>
      </span>
    </label>
  );
}
