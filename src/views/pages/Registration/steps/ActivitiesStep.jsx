import { ActivityOption } from '../../../components/registration/ActivityOption/ActivityOption.jsx';
import { Reveal } from '../../../components/common/Reveal/Reveal.jsx';
import { ActionButton } from '../../../components/common/ActionButton/ActionButton.jsx';
import { STEP, stepTitleId } from '../../../../models/steps.js';
import './ActivitiesStep.css';

/** Etapa 2 · Escolha das atividades (com vagas disponíveis/preenchidas). */
export function ActivitiesStep({ activities, selectedIds, error, onToggle }) {
  return (
    <div className="activities">
      <Reveal as="h2" index={1} id={stepTitleId(STEP.ACTIVITIES)} className="activities__title">
        Escolha suas atividades
      </Reveal>

      <Reveal as="p" index={2} className="activities__subtitle">
        Selecione as palestras e minicursos que você deseja participar durante o evento.
      </Reveal>

      <div
        id="field-activities"
        className="activities__grid"
        role="group"
        aria-labelledby={stepTitleId(STEP.ACTIVITIES)}
        aria-describedby="activities-error"
        tabIndex={-1}
      >
        {activities.map((activity, i) => (
          <Reveal key={activity.id} index={3 + i * 0.6}>
            <ActivityOption
              activity={activity}
              checked={selectedIds.includes(activity.id)}
              onToggle={onToggle}
            />
          </Reveal>
        ))}
      </div>

      <p id="activities-error" className="activities__error" data-visible={Boolean(error)} role={error ? 'alert' : undefined}>
        {error}
      </p>

      <Reveal index={7} className="activities__action">
        <ActionButton type="submit">Continuar</ActionButton>
      </Reveal>
    </div>
  );
}
