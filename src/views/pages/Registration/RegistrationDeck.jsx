import { useCallback, useState } from 'react';
import { ProgressBar } from '../../components/layout/ProgressBar/ProgressBar.jsx';
import { StepPanel } from '../../components/layout/StepPanel/StepPanel.jsx';
import { ACTIVITIES } from '../../../models/activities.js';
import { STEP, TOTAL_STEPS, stepTitleId } from '../../../models/steps.js';
import { useEntrance } from '../../../controllers/useEntrance.js';
import { ActivitiesStep } from './steps/ActivitiesStep.jsx';
import { PaymentStep } from './steps/PaymentStep.jsx';
import { PersonalDataStep } from './steps/PersonalDataStep.jsx';
import { SuccessStep } from './steps/SuccessStep.jsx';

/**
 * "Baralho" de etapas: monta todas as etapas uma sobre a outra + a barra de progresso.
 * Quando este componente é remontado (ver `key` em RegistrationPage), a animação de
 * entrada (caixa chegando da direita) acontece de novo.
 */
export function RegistrationDeck({ step, direction, values, errors, onFieldChange, onToggleActivity, onBack }) {
  const entered = useEntrance();

  // Antes da animação de entrada nenhuma etapa está "ativa": todas esperam à direita.
  const current = entered ? step : -1;

  // Altura natural de cada etapa; o baralho assume a altura da etapa atual (e anima até ela).
  const [heights, setHeights] = useState({});
  const handleHeight = useCallback(
    (index, height) => setHeights((prev) => (prev[index] === height ? prev : { ...prev, [index]: height })),
    [],
  );
  const deckHeight = heights[Math.min(Math.max(current, 0), TOTAL_STEPS - 1)];

  return (
    <div className="deck" style={{ height: deckHeight }}>
      <ProgressBar current={current} total={TOTAL_STEPS} direction={direction} />

      <StepPanel
        index={STEP.PERSONAL_DATA}
        current={current}
        labelledBy={stepTitleId(STEP.PERSONAL_DATA)}
        onBack={onBack}
        backDisabled
        onHeightChange={handleHeight}
      >
        <PersonalDataStep values={values} errors={errors} onChange={onFieldChange} />
      </StepPanel>

      <StepPanel
        index={STEP.ACTIVITIES}
        current={current}
        labelledBy={stepTitleId(STEP.ACTIVITIES)}
        onBack={onBack}
        onHeightChange={handleHeight}
      >
        <ActivitiesStep
          activities={ACTIVITIES}
          selectedIds={values.activities}
          error={errors.activities}
          onToggle={onToggleActivity}
        />
      </StepPanel>

      <StepPanel
        index={STEP.PAYMENT}
        current={current}
        labelledBy={stepTitleId(STEP.PAYMENT)}
        onBack={onBack}
        onHeightChange={handleHeight}
      >
        <PaymentStep />
      </StepPanel>

      <StepPanel
        index={STEP.SUCCESS}
        current={current}
        variant="plain"
        labelledBy={stepTitleId(STEP.SUCCESS)}
        onHeightChange={handleHeight}
      >
        <SuccessStep />
      </StepPanel>
    </div>
  );
}
