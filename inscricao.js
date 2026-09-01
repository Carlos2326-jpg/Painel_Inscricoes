// =====================================================================
// SISTEMA DE INSCRIÇÃO — Funções (React / JavaScript)
// Baseado em: Documentação do Sistema — Requisitos, Entidades e Funções
// Cada função está identificada com o ID correspondente da documentação
// (FB = Função Básica, FF = Função Fundamental, FS = Função de Saída)
// =====================================================================

import { useState, useCallback, useEffect, useMemo } from "react";

// ---------------------------------------------------------------------
// CONSTANTES / CONFIGURAÇÃO
// ---------------------------------------------------------------------

export const VALOR_INSCRICAO = 15.0;
export const CHAVE_PIX = "SUA_CHAVE_PIX_AQUI"; // CNPJ, e-mail ou telefone
export const NOME_RECEBEDOR_PIX = "NOME DO RECEBEDOR";
export const CIDADE_RECEBEDOR_PIX = "SAO PAULO";

export const FORMATOS_COMPROVANTE_ACEITOS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
export const TAMANHO_MAXIMO_COMPROVANTE_MB = 5;

export const VAGAS_CAMPEONATO_NOITE = 100;

// Exemplo de estrutura de atividades (Entidade Atividade). Ajuste conforme o evento.
export const ATIVIDADES_PADRAO = [
  {
    id: "abertura",
    nome: "Abertura e PapoTec",
    periodo: "manha",
    tipo: "principal",
    capacidadeMaxima: null,
  },
  {
    id: "abertura",
    nome: "Abertura e PapoTec",
    periodo: "noite",
    tipo: "principal",
    capacidadeMaxima: null,
  },
  {
    id: "campeonato",
    nome: "Campeonato",
    periodo: "manha",
    tipo: "opcional",
    regulamentoLink: "#",
    capacidadeMaxima: null,
  },
  {
    id: "campeonato",
    nome: "Campeonato",
    periodo: "noite",
    tipo: "opcional",
    regulamentoLink: "#",
    vagasDisponiveis: VAGAS_CAMPEONATO_NOITE,
    capacidadeMaxima: VAGAS_CAMPEONATO_NOITE,
  },
];

// =====================================================================
// VALIDAÇÕES AUXILIARES (usadas por FB01 / FB06)
// =====================================================================

export function validarCPF(cpf) {
  const limpo = (cpf || "").replace(/\D/g, "");
  if (limpo.length !== 11 || /^(\d)\1{10}$/.test(limpo)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(limpo[i], 10) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(limpo[9], 10)) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(limpo[i], 10) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(limpo[10], 10);
}

export function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim());
}

export function validarWhatsApp(numero) {
  const limpo = (numero || "").replace(/\D/g, "");
  return limpo.length >= 10 && limpo.length <= 11; // DDD + número
}

// =====================================================================
// FB01 — Coletar Dados do Participante
// =====================================================================

export function coletarDadosParticipante({
  nomeCompleto,
  cpf,
  email,
  whatsapp,
  isAlunoFatec,
  ra,
  curso,
}) {
  const erros = {};

  if (!nomeCompleto || !nomeCompleto.trim()) erros.nomeCompleto = "Nome completo é obrigatório.";
  if (!validarCPF(cpf)) erros.cpf = "CPF inválido.";
  if (!validarEmail(email)) erros.email = "E-mail inválido.";
  if (!validarWhatsApp(whatsapp)) erros.whatsapp = "WhatsApp inválido.";

  if (isAlunoFatec) {
    if (!ra || !ra.trim()) erros.ra = "RA é obrigatório para alunos da Fatec.";
    if (!curso || !curso.trim()) erros.curso = "Curso é obrigatório para alunos da Fatec.";
  }

  const participante = {
    nomeCompleto: nomeCompleto?.trim() ?? "",
    cpf: cpf?.replace(/\D/g, "") ?? "",
    email: email?.trim() ?? "",
    whatsapp: whatsapp?.replace(/\D/g, "") ?? "",
    isAlunoFatec: !!isAlunoFatec,
    ra: isAlunoFatec ? ra?.trim() ?? "" : null,
    curso: isAlunoFatec ? curso?.trim() ?? "" : null,
    atividadesSelecionadas: [],
    comprovantePagamento: null,
    statusInscricao: "pendente",
  };

  return { participante, erros, valido: Object.keys(erros).length === 0 };
}

// =====================================================================
// FB03 — Exibir Atividades por Período (RF03)
// =====================================================================

export function filtrarAtividadesPorPeriodo(atividades, periodo) {
  if (!periodo) return [];
  if (periodo === "manha") return atividades.filter((a) => a.periodo === "manha");
  if (periodo === "noite") return atividades.filter((a) => a.periodo === "noite");
  // "tarde" ou "visitante" habilitam ambos os períodos
  if (periodo === "tarde" || periodo === "visitante") return atividades;
  return [];
}

// =====================================================================
// FB04 / FF02 — Habilitar/Desabilitar Checkboxes + Regra de Conflito (RF04)
// =====================================================================

// Verifica se a atividade equivalente (mesmo id) já está selecionada no outro período
function possuiEquivalenteSelecionada(atividade, atividadesSelecionadas) {
  return atividadesSelecionadas.some(
    (a) => a.id === atividade.id && a.periodo !== atividade.periodo
  );
}

export function isAtividadeHabilitada(atividade, periodo, atividadesSelecionadas) {
  // Fora do período visível, nunca habilitada
  const visiveis = filtrarAtividadesPorPeriodo([atividade], periodo);
  if (visiveis.length === 0) return false;

  // Regra de conflito só se aplica em Tarde/Visitante
  if (periodo === "tarde" || periodo === "visitante") {
    if (possuiEquivalenteSelecionada(atividade, atividadesSelecionadas)) {
      return false;
    }
  }

  // Vagas esgotadas bloqueiam a atividade (FF05)
  if (
    typeof atividade.capacidadeMaxima === "number" &&
    typeof atividade.vagasDisponiveis === "number" &&
    atividade.vagasDisponiveis <= 0
  ) {
    return false;
  }

  return true;
}

// Alterna seleção de uma atividade, aplicando a regra de conflito (FF02)
export function toggleAtividadeComConflito(atividadesSelecionadas, atividade, periodo) {
  const jaSelecionada = atividadesSelecionadas.some(
    (a) => a.id === atividade.id && a.periodo === atividade.periodo
  );

  if (jaSelecionada) {
    // Remove a atividade
    return atividadesSelecionadas.filter(
      (a) => !(a.id === atividade.id && a.periodo === atividade.periodo)
    );
  }

  if (!isAtividadeHabilitada(atividade, periodo, atividadesSelecionadas)) {
    // Não permite selecionar atividade desabilitada/conflitante
    return atividadesSelecionadas;
  }

  return [...atividadesSelecionadas, atividade];
}

// =====================================================================
// FB05 / FF06 — Upload e Validação de Comprovante
// =====================================================================

export function validarComprovante(file) {
  if (!file) return { valido: false, erro: "Nenhum arquivo selecionado." };

  if (!FORMATOS_COMPROVANTE_ACEITOS.includes(file.type)) {
    return { valido: false, erro: "Formato inválido. Envie JPG, PNG ou PDF." };
  }

  const tamanhoMB = file.size / (1024 * 1024);
  if (tamanhoMB > TAMANHO_MAXIMO_COMPROVANTE_MB) {
    return {
      valido: false,
      erro: `Arquivo excede o tamanho máximo de ${TAMANHO_MAXIMO_COMPROVANTE_MB}MB.`,
    };
  }

  return { valido: true, erro: null };
}

// =====================================================================
// FB06 — Validar Campos Obrigatórios (RF08)
// =====================================================================

export function validarCamposObrigatorios({ participante, periodo, comprovante }) {
  const erros = {};

  if (!participante?.nomeCompleto?.trim()) erros.nomeCompleto = "Nome é obrigatório.";
  if (!validarEmail(participante?.email)) erros.email = "E-mail é obrigatório e deve ser válido.";
  if (!validarWhatsApp(participante?.whatsapp)) erros.whatsapp = "WhatsApp é obrigatório.";
  if (!periodo) erros.periodo = "Selecione um período.";

  if (participante?.isAlunoFatec) {
    if (!participante?.ra?.trim()) erros.ra = "RA é obrigatório.";
    if (!participante?.curso?.trim()) erros.curso = "Curso é obrigatório.";
  }

  if (!comprovante) {
    erros.comprovante = "Comprovante de pagamento é obrigatório.";
  } else {
    const { valido, erro } = validarComprovante(comprovante);
    if (!valido) erros.comprovante = erro;
  }

  return { valido: Object.keys(erros).length === 0, erros };
}

// =====================================================================
// FB07 / FF01 — Gerar Payload Pix (Gerenciar Pagamento)
// =====================================================================

// Gera o payload EMV "copia e cola" do Pix (sem depender de libs externas).
// Para exibir o QR Code visualmente, passe este payload a uma lib como "qrcode".
function formatarCampoEMV(id, valor) {
  const tamanho = String(valor.length).padStart(2, "0");
  return `${id}${tamanho}${valor}`;
}

function crc16(payload) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function gerarPayloadPix({
  chave = CHAVE_PIX,
  valor = VALOR_INSCRICAO,
  nomeRecebedor = NOME_RECEBEDOR_PIX,
  cidade = CIDADE_RECEBEDOR_PIX,
  txId = "***",
} = {}) {
  const merchantAccount =
    formatarCampoEMV("00", "BR.GOV.BCB.PIX") + formatarCampoEMV("01", chave);

  const payloadSemCRC =
    formatarCampoEMV("00", "01") +
    formatarCampoEMV("26", merchantAccount) +
    formatarCampoEMV("52", "0000") +
    formatarCampoEMV("53", "986") +
    formatarCampoEMV("54", valor.toFixed(2)) +
    formatarCampoEMV("58", "BR") +
    formatarCampoEMV("59", nomeRecebedor.substring(0, 25)) +
    formatarCampoEMV("60", cidade.substring(0, 15)) +
    formatarCampoEMV("62", formatarCampoEMV("05", txId)) +
    "6304";

  return payloadSemCRC + crc16(payloadSemCRC);
}

export function gerenciarPagamento() {
  return {
    valor: VALOR_INSCRICAO,
    chavePix: CHAVE_PIX,
    payloadPix: gerarPayloadPix(),
  };
}

// =====================================================================
// FB08 / FS03 — Resumo da Inscrição
// =====================================================================

export function gerarResumoInscricao(atividadesSelecionadas) {
  return {
    quantidade: atividadesSelecionadas.length,
    itens: atividadesSelecionadas.map((a) => ({
      nome: a.nome,
      periodo: a.periodo,
    })),
  };
}

// =====================================================================
// FF03 — Processar Inscrição
// =====================================================================

export function processarInscricao({ participante, periodo, atividadesSelecionadas, comprovante }) {
  const { valido, erros } = validarCamposObrigatorios({ participante, periodo, comprovante });

  if (!valido) {
    return { sucesso: false, erros };
  }

  const numeroInscricao = `INS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const inscricao = {
    numeroInscricao,
    participante: { ...participante, periodo },
    atividadesSelecionadas,
    comprovantePagamento: comprovante,
    statusInscricao: "confirmada",
    dataInscricao: new Date().toISOString(),
  };

  return { sucesso: true, inscricao, erros: null };
}

// =====================================================================
// FF04 — Gerenciar Status da Inscrição
// =====================================================================

const STATUS_VALIDOS = ["pendente", "confirmada", "cancelada"];

export function atualizarStatusInscricao(inscricao, novoStatus) {
  if (!STATUS_VALIDOS.includes(novoStatus)) {
    throw new Error(`Status inválido: ${novoStatus}`);
  }
  return { ...inscricao, statusInscricao: novoStatus };
}

// =====================================================================
// FF05 — Controlar Vagas por Atividade
// =====================================================================

export function verificarDisponibilidadeVagas(atividade) {
  if (typeof atividade.vagasDisponiveis !== "number") return true; // sem limite de vagas
  return atividade.vagasDisponiveis > 0;
}

export function decrementarVaga(atividade) {
  if (typeof atividade.vagasDisponiveis !== "number") return atividade;
  return { ...atividade, vagasDisponiveis: Math.max(0, atividade.vagasDisponiveis - 1) };
}

// =====================================================================
// FF07 — Gerenciar Sessão do Usuário (persistência entre recarregamentos)
// =====================================================================

const CHAVE_SESSAO = "inscricao_sessao";

export function salvarSessao(dados) {
  try {
    sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(dados));
  } catch (e) {
    console.warn("Não foi possível salvar a sessão:", e);
  }
}

export function carregarSessao() {
  try {
    const dados = sessionStorage.getItem(CHAVE_SESSAO);
    return dados ? JSON.parse(dados) : null;
  } catch (e) {
    console.warn("Não foi possível carregar a sessão:", e);
    return null;
  }
}

export function limparSessao() {
  try {
    sessionStorage.removeItem(CHAVE_SESSAO);
  } catch (e) {
    console.warn("Não foi possível limpar a sessão:", e);
  }
}

// =====================================================================
// FF08 — Gerar Confirmação de Inscrição
// =====================================================================

export function gerarConfirmacaoInscricao(inscricao) {
  return {
    numeroInscricao: inscricao.numeroInscricao,
    mensagem: "Inscrição realizada com sucesso!",
    nome: inscricao.participante.nomeCompleto,
    atividades: inscricao.atividadesSelecionadas.map((a) => a.nome),
    dataInscricao: inscricao.dataInscricao,
  };
}

// =====================================================================
// FS01–FS04 — Funções de Saída (mensagens/textos)
// =====================================================================

export function textoStatusPeriodo(periodo) {
  if (!periodo) return "Nenhum período selecionado.";
  const nomes = { manha: "manhã", tarde: "tarde", noite: "noite", visitante: "visitante" };
  return `Período: ${nomes[periodo] ?? periodo}`;
}

export function textoAlertaConflito(periodo) {
  if (periodo !== "tarde" && periodo !== "visitante") return null;
  return "Atenção: selecionar uma atividade em um período (manhã/noite) desabilita automaticamente a atividade equivalente no outro período.";
}

export function textoResumoAtividades(atividadesSelecionadas) {
  const { quantidade, itens } = gerarResumoInscricao(atividadesSelecionadas);
  if (quantidade === 0) return "Nenhuma atividade selecionada.";
  const lista = itens.map((i) => `${i.nome} (${i.periodo})`).join(", ");
  return `${quantidade} atividade(s) selecionada(s): ${lista}`;
}

export function textoMensagemPadrao(periodo, atividadesSelecionadas) {
  if (!periodo) return "Escolha o período para visualizar as opções corretas.";
  if (!atividadesSelecionadas || atividadesSelecionadas.length === 0) {
    return "Nenhuma atividade selecionada até o momento.";
  }
  return null;
}

// =====================================================================
// HOOK PRINCIPAL: useInscricao
// Reúne todo o estado e as funções acima para uso em um componente React.
// =====================================================================

export function useInscricao(atividadesDisponiveis = ATIVIDADES_PADRAO) {
  const [participante, setParticipanteState] = useState({
    nomeCompleto: "",
    cpf: "",
    email: "",
    whatsapp: "",
    isAlunoFatec: false,
    ra: null,
    curso: null,
  });
  const [periodo, setPeriodoState] = useState(null);
  const [atividadesSelecionadas, setAtividadesSelecionadas] = useState([]);
  const [comprovante, setComprovanteState] = useState(null);
  const [statusInscricao, setStatusInscricao] = useState("pendente");
  const [erros, setErros] = useState({});
  const [inscricaoConfirmada, setInscricaoConfirmada] = useState(null);

  // Restaura sessão ao montar (FF07)
  useEffect(() => {
    const sessao = carregarSessao();
    if (sessao) {
      setParticipanteState(sessao.participante ?? participante);
      setPeriodoState(sessao.periodo ?? null);
      setAtividadesSelecionadas(sessao.atividadesSelecionadas ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Salva sessão a cada alteração relevante (FF07)
  useEffect(() => {
    salvarSessao({ participante, periodo, atividadesSelecionadas });
  }, [participante, periodo, atividadesSelecionadas]);

  // FB01 — atualizar dados do participante com validação
  const definirDadosParticipante = useCallback((dados) => {
    const { participante: novoParticipante, erros: errosValidacao } =
      coletarDadosParticipante(dados);
    setParticipanteState(novoParticipante);
    setErros((prev) => ({ ...prev, ...errosValidacao }));
    return errosValidacao;
  }, []);

  // FB02 — selecionar período (também reseta seleções conflitantes)
  const selecionarPeriodo = useCallback((novoPeriodo) => {
    setPeriodoState(novoPeriodo);
    setAtividadesSelecionadas((atuais) =>
      atuais.filter((a) => filtrarAtividadesPorPeriodo([a], novoPeriodo).length > 0)
    );
  }, []);

  // FB03 — atividades visíveis conforme período selecionado
  const atividadesVisiveis = useMemo(
    () => filtrarAtividadesPorPeriodo(atividadesDisponiveis, periodo),
    [atividadesDisponiveis, periodo]
  );

  // FB04 / FF02 — alternar seleção de atividade, respeitando regra de conflito
  const toggleAtividade = useCallback(
    (atividade) => {
      setAtividadesSelecionadas((atuais) =>
        toggleAtividadeComConflito(atuais, atividade, periodo)
      );
    },
    [periodo]
  );

  const atividadeEstaHabilitada = useCallback(
    (atividade) => isAtividadeHabilitada(atividade, periodo, atividadesSelecionadas),
    [periodo, atividadesSelecionadas]
  );

  // FB05 — anexar/validar comprovante
  const anexarComprovante = useCallback((file) => {
    const { valido, erro } = validarComprovante(file);
    if (!valido) {
      setErros((prev) => ({ ...prev, comprovante: erro }));
      setComprovanteState(null);
      return false;
    }
    setErros((prev) => ({ ...prev, comprovante: undefined }));
    setComprovanteState(file);
    return true;
  }, []);

  // FB08 / FS03 — resumo dinâmico
  const resumo = useMemo(
    () => gerarResumoInscricao(atividadesSelecionadas),
    [atividadesSelecionadas]
  );

  // FF01 — dados de pagamento (Pix)
  const dadosPagamento = useMemo(() => gerenciarPagamento(), []);

  // FS01, FS02, FS04 — textos de saída
  const textoStatus = useMemo(() => textoStatusPeriodo(periodo), [periodo]);
  const textoAlerta = useMemo(() => textoAlertaConflito(periodo), [periodo]);
  const textoPadrao = useMemo(
    () => textoMensagemPadrao(periodo, atividadesSelecionadas),
    [periodo, atividadesSelecionadas]
  );

  // FF03 — processar e enviar inscrição
  const enviarInscricao = useCallback(() => {
    const resultado = processarInscricao({
      participante,
      periodo,
      atividadesSelecionadas,
      comprovante,
    });

    if (!resultado.sucesso) {
      setErros(resultado.erros);
      return { sucesso: false };
    }

    setStatusInscricao("confirmada");
    setInscricaoConfirmada(resultado.inscricao);
    limparSessao(); // FF07 — limpa dados temporários após conclusão

    // FF08 — gera dados de confirmação
    return {
      sucesso: true,
      confirmacao: gerarConfirmacaoInscricao(resultado.inscricao),
    };
  }, [participante, periodo, atividadesSelecionadas, comprovante]);

  return {
    // estado
    participante,
    periodo,
    atividadesSelecionadas,
    atividadesVisiveis,
    comprovante,
    statusInscricao,
    erros,
    resumo,
    dadosPagamento,
    textoStatus,
    textoAlerta,
    textoPadrao,
    inscricaoConfirmada,
    // ações
    definirDadosParticipante,
    selecionarPeriodo,
    toggleAtividade,
    atividadeEstaHabilitada,
    anexarComprovante,
    enviarInscricao,
  };
}