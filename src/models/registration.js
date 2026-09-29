export const STUDENT_OPTIONS = [
  { value: 'sim', label: 'Sim, sou aluno(a).' },
  { value: 'nao', label: 'Não, sou visitante.' },
];

export const PERIOD_OPTIONS = [
  { value: 'manha', label: 'Manhã' },
  { value: 'noite', label: 'Noite' },
];

export const INITIAL_VALUES = Object.freeze({
  name: '',
  cpf: '',
  phone: '',
  isStudent: 'sim',
  period: '',
  activities: [],
});
