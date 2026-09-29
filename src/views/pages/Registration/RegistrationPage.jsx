import { useState } from 'react';
import '@fontsource-variable/inter';
import { InkBackground } from '../../components/layout/InkBackground/InkBackground.jsx';
import { ACTIVITIES } from '../../../models/activities.js';
import { EVENT } from '../../../models/event.js';
import { STEP, TOTAL_STEPS } from '../../../models/steps.js';
import { useRegistrationForm } from '../../../controllers/useRegistrationForm.js';
import { useStepper } from '../../../controllers/useStepper.js';
import { buildReceiptMessage, buildWhatsappUrl } from '../../../utils/whatsapp.js';
import { RegistrationDeck } from './RegistrationDeck.jsx';
import './RegistrationTheme.css';
import './RegistrationPage.css';

/**
 * Página de inscrição. Um único <form> controla as 4 etapas:
 * o botão principal de cada etapa é o "submit" e decide o que fazer conforme a etapa atual.
 */
export default function RegistrationPage() {
  const { step, direction, next, back, reset: resetStepper } = useStepper(TOTAL_STEPS);
  const form = useRegistrationForm();
  const [session, setSession] = useState(0); // muda ao finalizar, para replay da animação de entrada

  const focusField = (field) => document.getElementById(`field-${field}`)?.focus();

  const openWhatsappWithReceipt = () => {
    const message = buildReceiptMessage({
      eventName: EVENT.name,
      fee: EVENT.fee,
      values: form.values,
      activities: ACTIVITIES,
    });
    window.open(buildWhatsappUrl(EVENT.whatsapp.number, message), '_blank', 'noopener,noreferrer');
  };

  const finish = () => {
    form.reset();
    resetStepper();
    setSession((s) => s + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    switch (step) {
      case STEP.PERSONAL_DATA:
      case STEP.ACTIVITIES: {
        const errors = form.validateStep(step);
        const [firstInvalid] = Object.keys(errors);
        if (firstInvalid) focusField(firstInvalid);
        else next();
        break;
      }
      case STEP.PAYMENT:
        openWhatsappWithReceipt();
        next();
        break;
      default:
        finish();
    }
  };

  return (
    <main className="registration">
      <h1 className="sr-only">Inscrição na {EVENT.name}</h1>

      <InkBackground step={step} />

      <form className="registration__form" onSubmit={handleSubmit} noValidate>
        <RegistrationDeck
          key={session}
          step={step}
          direction={direction}
          values={form.values}
          errors={form.errors}
          onFieldChange={form.setField}
          onToggleActivity={form.toggleActivity}
          onBack={back}
        />
      </form>
    </main>
  );
}
