/**
 * Atividades disponíveis. São dados de EXEMPLO: troque pelos reais ou carregue de uma API.
 *
 * capacity = total de vagas | filled = vagas já preenchidas
 * (vagas disponíveis = capacity - filled; quando chega a 0 a atividade aparece como esgotada)
 */
export const ACTIVITIES = [
  {
    id: 'react-intro',
    type: 'Curso',
    time: '13:00',
    title: 'Introdução ao React',
    description: 'Componentes, estado e props para montar sua primeira interface.',
    capacity: 30,
    filled: 18,
  },
  {
    id: 'ia-pratica',
    type: 'Palestra',
    time: '14:00',
    title: 'IA na prática',
    description: 'Como usar inteligência artificial generativa no dia a dia de quem desenvolve.',
    capacity: 80,
    filled: 52,
  },
  {
    id: 'git-github',
    type: 'Minicurso',
    time: '15:00',
    title: 'Git e GitHub',
    description: 'Versionamento e colaboração: commits, branches e pull requests.',
    capacity: 30,
    filled: 30,
  },
  {
    id: 'sql-essencial',
    type: 'Curso',
    time: '13:00',
    title: 'SQL essencial',
    description: 'Modelagem de dados e consultas com exemplos práticos.',
    capacity: 25,
    filled: 11,
  },
  {
    id: 'carreira-ti',
    type: 'Palestra',
    time: '16:00',
    title: 'Carreira em tecnologia',
    description: 'Primeiros passos no mercado: estágio, portfólio e networking.',
    capacity: 100,
    filled: 67,
  },
  {
    id: 'redes-seguranca',
    type: 'Minicurso',
    time: '14:00',
    title: 'Redes e segurança',
    description: 'Noções de redes, ameaças comuns e boas práticas de proteção.',
    capacity: 30,
    filled: 24,
  },
];
