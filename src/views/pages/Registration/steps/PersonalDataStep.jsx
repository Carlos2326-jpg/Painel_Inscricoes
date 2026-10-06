import { Reveal } from '../../../components/common/Reveal/Reveal.jsx';
import { ActionButton } from '../../../components/common/ActionButton/ActionButton.jsx';
import { RadioGroup } from '../../../components/common/RadioGroup/RadioGroup.jsx';
import { SelectField } from '../../../components/common/SelectField/SelectField.jsx';
import { TextField } from '../../../components/common/TextField/TextField.jsx';
import { EVENT } from '../../../../models/event.js';
import { PERIOD_OPTIONS, STUDENT_OPTIONS } from '../../../../models/registration.js';
import { STEP, stepTitleId } from '../../../../models/steps.js';
import './PersonalDataStep.css';

/** Etapa 1 · Nome, CPF, telefone, vínculo com a FATEC e período. */
export function PersonalDataStep({ values, errors, onChange }) {
  const bind = (field) => ({
    value: values[field],
    error: errors[field],
    onChange: (event) => onChange(field, event.target.value),
  });

  return (
    <div className="personal">
      <div className="personal__intro">
        <Reveal as="h2" index={1} id={stepTitleId(STEP.PERSONAL_DATA)} className="personal__title">
          Vamos começar sua inscrição!
        </Reveal>
        <Reveal as="p" index={2} className="personal__subtitle">
          Para participar da {EVENT.name}, preencha seus dados ao lado.
        </Reveal>
      </div>

      <div className="personal__fields">
        <Reveal index={2}>
          <TextField
            id="field-name"
            name="name"
            label="Nome completo"
            placeholder="Nome e Sobrenome"
            autoComplete="name"
            {...bind('name')}
          />
        </Reveal>

        <Reveal index={3}>
          <TextField
            id="field-cpf"
            name="cpf"
            label="CPF"
            placeholder="XXX.XXX.XXX-XX"
            inputMode="numeric"
            autoComplete="off"
            maxLength={14}
            {...bind('cpf')}
          />
        </Reveal>

        <Reveal index={4}>
          <TextField
            id="field-phone"
            name="phone"
            type="tel"
            label="Telefone"
            placeholder="(00) 00000-0000"
            inputMode="tel"
            autoComplete="tel-national"
            maxLength={15}
            {...bind('phone')}
          />
        </Reveal>

        <Reveal index={5} className="personal__students">
          <RadioGroup
            legend="Você é aluno da FATEC?"
            name="isStudent"
            options={STUDENT_OPTIONS}
            value={values.isStudent}
            onChange={(value) => onChange('isStudent', value)}
          />
        </Reveal>

        <Reveal index={6}>
          <SelectField
            id="field-period"
            name="period"
            label="Período"
            options={PERIOD_OPTIONS}
            {...bind('period')}
          />
        </Reveal>
      </div>

      <Reveal index={3} className="personal__action">
        <ActionButton type="submit">Continuar</ActionButton>
      </Reveal>
    </div>
  );
}
