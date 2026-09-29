import { Reveal } from '../../../components/common/Reveal/Reveal.jsx';
import { ActionButton } from '../../../components/common/ActionButton/ActionButton.jsx';
import { STEP, stepTitleId } from '../../../../models/steps.js';
import './SuccessStep.css';

/** Etapa 4 · Confirmação (tela sem caixa de vidro). */
export function SuccessStep() {
  return (
    <div className="success">
      <div className="success__message">
        <Reveal as="h2" index={1} id={stepTitleId(STEP.SUCCESS)} className="success__title">
          Inscrição enviada com <span className="success__highlight">sucesso!</span>
        </Reveal>

        <Reveal as="p" index={2} className="success__text">
          Tudo certo! Sua inscrição foi registrada. Agora é só se preparar para três dias de
          conhecimento, conexões e novas experiências.
        </Reveal>
      </div>

      <Reveal index={3} className="success__action">
        <ActionButton type="submit" variant="teal">
          Finalizar
        </ActionButton>
      </Reveal>
    </div>
  );
}
