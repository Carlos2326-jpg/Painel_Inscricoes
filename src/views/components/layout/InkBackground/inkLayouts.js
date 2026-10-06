/**
 * Layout das "manchas de tinta" do fundo em cada etapa.
 *
 * Cada mancha tem uma posição por etapa. Quando a etapa muda, o CSS anima a
 * transição entre um layout e o outro (a tinta "escorre" até a nova posição).
 *
 *  x, y     → centro da mancha, em % da largura/altura da tela
 *  sx, sy   → escala horizontal/vertical (1 = 40vmax)
 *  rot      → rotação em graus
 *  opacity  → 0 esconde a mancha naquela etapa
 *  r        → border-radius (o formato "orgânico" também é animado)
 */

const R1 = '58% 42% 62% 38% / 48% 56% 44% 52%';
const R2 = '44% 56% 40% 60% / 60% 42% 58% 40%';
const R3 = '62% 38% 46% 54% / 40% 60% 40% 60%';
const R4 = '50% 50% 58% 42% / 56% 44% 56% 44%';

const blob = (x, y, sx, sy, rot, opacity, r) => ({ x, y, sx, sy, rot, opacity, r });

/** Ordem = ordem de pintura (a última fica por cima). */
export const INK_BLOBS = [
  { id: 'violet', color: '#6a4b96', drift: 26, delay: -4 },
  { id: 'navy', color: '#12052b', drift: 22, delay: -9 },
  { id: 'tealB', color: '#6bc5c9', drift: 21, delay: -6 },
  { id: 'teal', color: '#6bc5c9', drift: 18, delay: -2 },
  { id: 'yellow', color: '#fbb92b', drift: 20, delay: -7 },
  { id: 'orange', color: '#f0743e', drift: 24, delay: -11 },
  { id: 'pink', color: '#e11559', drift: 19, delay: -5 },
];

/** Estado inicial (antes da 1ª animação): a tinta nasce no centro e se espalha. */
export const INK_SEED = Object.fromEntries(
  INK_BLOBS.map(({ id }) => [id, blob(50, 50, 0.12, 0.12, 0, 0, R1)]),
);

/** Um layout por etapa (0 = dados, 1 = atividades, 2 = pagamento, 3 = sucesso). */
export const INK_LAYOUTS = [
  // 0 · Dados
  {
    teal: blob(12, 1, 0.85, 0.42, -8, 1, R1),
    tealB: blob(108, 108, 0.5, 0.5, 0, 0, R2),
    yellow: blob(30, 101, 1.2, 0.5, 4, 1, R2),
    orange: blob(52, 103, 0.55, 0.4, 0, 0.95, R3),
    pink: blob(90, 100, 0.95, 0.7, -6, 1, R4),
    navy: blob(-3, 48, 0.5, 1.3, 0, 1, R1),
    violet: blob(62, 58, 1.1, 0.8, 20, 0.45, R3),
  },
  // 1 · Atividades
  {
    teal: blob(8, 0, 0.6, 0.28, 10, 0.85, R3),
    tealB: blob(101, 102, 0.6, 0.6, 0, 1, R1),
    yellow: blob(101, 22, 0.45, 0.95, 8, 1, R4),
    orange: blob(100, 42, 0.35, 0.45, 0, 0.7, R2),
    pink: blob(3, 78, 0.65, 1.05, 6, 1, R2),
    navy: blob(86, 74, 0.7, 0.75, -10, 1, R3),
    violet: blob(48, 42, 1.1, 0.8, -10, 0.4, R1),
  },
  // 2 · Pagamento
  {
    teal: blob(18, 102, 1.0, 0.5, 0, 1, R4),
    tealB: blob(-8, 112, 0.5, 0.5, 0, 0, R1),
    yellow: blob(10, -1, 0.85, 0.42, -4, 1, R3),
    orange: blob(46, 0, 0.75, 0.38, 6, 1, R1),
    pink: blob(93, 20, 0.8, 1.05, -8, 1, R2),
    navy: blob(72, 102, 1.3, 0.55, 0, 1, R4),
    violet: blob(50, 50, 1.1, 0.8, 0, 0.4, R2),
  },
  // 3 · Sucesso
  {
    teal: blob(36, 1, 1.0, 0.35, 0, 1, R2),
    tealB: blob(30, -8, 0.5, 0.4, 0, 0, R3),
    yellow: blob(88, 12, 0.9, 1.15, 12, 1, R1),
    orange: blob(100, 42, 0.45, 1.0, 0, 0.9, R4),
    pink: blob(20, 92, 1.6, 0.8, -6, 1, R3),
    navy: blob(2, 44, 0.55, 1.1, 0, 1, R2),
    violet: blob(60, 45, 1.1, 0.8, 0, 0.35, R1),
  },
];
