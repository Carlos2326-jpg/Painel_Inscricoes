import { PERIOD_OPTIONS, STUDENT_OPTIONS } from '../models/registration.js';
import { formatCurrency } from './format.js';
import { onlyDigits } from './masks.js';

const labelOf = (options, value) => options.find((o) => o.value === value)?.label ?? value;

/** Link "click to chat" do WhatsApp com a mensagem já preenchida. */
export function buildWhatsappUrl(number, message) {
  return `https://wa.me/${onlyDigits(number)}?text=${encodeURIComponent(message)}`;
}

/** Texto que acompanha o comprovante, para o organizador identificar a inscrição. */
export function buildReceiptMessage({ eventName, fee, values, activities }) {
  const chosen = activities.filter((a) => values.activities.includes(a.id));

  return [
    `Olá! Segue o comprovante de pagamento da minha inscrição na ${eventName}.`,
    '',
    `Nome: ${values.name.trim()}`,
    `CPF: ${values.cpf}`,
    `Telefone: ${values.phone}`,
    `Aluno da FATEC: ${labelOf(STUDENT_OPTIONS, values.isStudent).replace(/\.$/, '')}`,
    `Período: ${labelOf(PERIOD_OPTIONS, values.period)}`,
    'Atividades:',
    ...chosen.map((a) => `- ${a.type} ${a.time} · ${a.title}`),
    `Valor: ${formatCurrency(fee)}`,
  ].join('\n');
}
