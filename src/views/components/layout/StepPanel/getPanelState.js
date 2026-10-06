import { FINAL_STEP } from '../../../../models/steps.js';

/**
 * Traduz "qual etapa sou eu" + "qual etapa está ativa" em um estado visual:
 *
 *  upcoming → ainda não chegou: espera fora da tela, à direita
 *  active   → etapa atual, no centro
 *  stacked  → etapa já vista: vira uma "aba" empilhada à esquerda (depth = 1, 2…)
 *  gone     → na tela final as abas saem de cena
 */
export function getPanelState(index, current) {
  if (index === current) return { state: 'active', depth: 0 };
  if (index > current) return { state: 'upcoming', depth: 0 };
  return { state: current >= FINAL_STEP ? 'gone' : 'stacked', depth: current - index };
}
