/**
 * Configuração do evento. É aqui que você troca os dados reais antes de publicar.
 */
export const EVENT = {
  name: 'Semana de Tecnologia',

  /** Valor da taxa de inscrição em reais. */
  fee: 15,

  whatsapp: {
    /** Número que recebe o comprovante: DDI + DDD + número, só dígitos. (Exemplo fictício!) */
    number: '5518900000000',
  },

  pix: {
    /** Chave Pix que aparece na tela e dentro do QR Code. (Exemplo fictício!) */
    key: 'chavepixdasilvapereira',
    /** Nome exibido para o recebedor. */
    receiverName: 'Empresa júnior FATEC',
    /** Cidade do recebedor (o padrão Pix limita a 15 caracteres, sem acentos). */
    city: 'Pres. Prudente',
    /**
     * true  = QR Code com módulos brancos sobre fundo roxo (igual ao layout).
     * false = QR Code convencional (escuro sobre fundo claro), lido por qualquer app de banco.
     */
    invertedQr: true,
  },
};
