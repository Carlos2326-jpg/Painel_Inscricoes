import { useCallback, useState } from 'react';
import { INITIAL_VALUES } from '../models/registration.js';
import { STEP } from '../models/steps.js';
import { maskCpf, maskPhone } from '../utils/masks.js';
import { validateActivities, validatePersonalData } from '../models/validators.js';

/** Máscara aplicada enquanto o usuário digita. */
const FIELD_MASKS = { cpf: maskCpf, phone: maskPhone };

/** Validador de cada etapa (etapas sem validação simplesmente não aparecem aqui). */
const STEP_VALIDATORS = {
  [STEP.PERSONAL_DATA]: validatePersonalData,
  [STEP.ACTIVITIES]: validateActivities,
};

/**
 * Estado único do formulário de inscrição (todas as etapas compartilham os mesmos valores).
 */
export function useRegistrationForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});

  const clearError = useCallback((field) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const { [field]: _removed, ...rest } = current;
      return rest;
    });
  }, []);

  const setField = useCallback(
    (field, rawValue) => {
      const mask = FIELD_MASKS[field];
      setValues((current) => ({ ...current, [field]: mask ? mask(rawValue) : rawValue }));
      clearError(field);
    },
    [clearError],
  );

  const toggleActivity = useCallback(
    (id) => {
      setValues((current) => ({
        ...current,
        activities: current.activities.includes(id)
          ? current.activities.filter((activityId) => activityId !== id)
          : [...current.activities, id],
      }));
      clearError('activities');
    },
    [clearError],
  );

  /** Valida a etapa, atualiza os erros na tela e devolve o objeto de erros ({} = válida). */
  const validateStep = useCallback(
    (step) => {
      const found = STEP_VALIDATORS[step]?.(values) ?? {};
      setErrors(found);
      return found;
    },
    [values],
  );

  const reset = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors({});
  }, []);

  return { values, errors, setField, toggleActivity, validateStep, reset };
}
