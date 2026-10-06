/** Índices das etapas do fluxo de inscrição. */
export const STEP = Object.freeze({
  PERSONAL_DATA: 0,
  ACTIVITIES: 1,
  PAYMENT: 2,
  SUCCESS: 3,
});

export const TOTAL_STEPS = 4;

/** A partir desta etapa as caixas de vidro saem de cena (tela final não tem caixa). */
export const FINAL_STEP = STEP.SUCCESS;

/** id do título de cada etapa (usado em aria-labelledby). */
export const stepTitleId = (step) => `step-${step}-title`;
