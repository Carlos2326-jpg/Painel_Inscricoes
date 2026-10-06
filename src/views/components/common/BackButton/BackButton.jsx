import { ChevronLeftIcon } from '../Icons/Icons.jsx';
import './BackButton.css';

export function BackButton({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      className="back-button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Voltar para a etapa anterior"
    >
      <ChevronLeftIcon />
    </button>
  );
}
