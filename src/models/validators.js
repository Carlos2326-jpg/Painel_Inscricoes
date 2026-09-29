import { onlyDigits } from '../utils/masks.js';

/** Nome e sobrenome, só letras (aceita acentos, apóstrofo, hífen e ponto). */
export function isValidFullName(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (
    parts.length >= 2 &&
    parts.every((part) => part.length >= 2) &&
    /^[\p{L}][\p{L}'.\- ]*$/u.test(name.trim())
  );
}

/** Valida CPF pelos dígitos verificadores (rejeita 111.111.111-11 etc.). */
export function isValidCpf(cpf = '') {
  const digits = onlyDigits(cpf);
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  const checkDigit = (length) => {
    const sum = digits
      .slice(0, length)
      .split('')
      .reduce((acc, digit, index) => acc + Number(digit) * (length + 1 - index), 0);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return checkDigit(9) === Number(digits[9]) && checkDigit(10) === Number(digits[10]);
}

/** Telefone brasileiro: DDD válido + 8 dígitos (fixo) ou 9 dígitos começando com 9 (celular). */
export function isValidPhone(phone = '') {
  const digits = onlyDigits(phone);
  if (digits.length < 10 || digits.length > 11) return false;
  if (Number(digits.slice(0, 2)) < 11) return false;
  if (digits.length === 11 && digits[2] !== '9') return false;
  return true;
}

/* ---------- Validação por etapa: devolvem { campo: 'mensagem' } (vazio = tudo ok) ---------- */

export function validatePersonalData(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Informe seu nome completo.';
  else if (!isValidFullName(values.name)) errors.name = 'Digite nome e sobrenome.';

  if (!values.cpf) errors.cpf = 'Informe seu CPF.';
  else if (!isValidCpf(values.cpf)) errors.cpf = 'CPF inválido. Confira os números.';

  if (!values.phone) errors.phone = 'Informe seu telefone.';
  else if (!isValidPhone(values.phone)) errors.phone = 'Telefone inválido. Use DDD + número.';

  if (!values.isStudent) errors.isStudent = 'Escolha uma opção.';
  if (!values.period) errors.period = 'Selecione o período.';

  return errors;
}

export function validateActivities(values) {
  return values.activities.length === 0
    ? { activities: 'Selecione pelo menos uma atividade para continuar.' }
    : {};
}
