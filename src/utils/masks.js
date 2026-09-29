export const onlyDigits = (value = '') => String(value).replace(/\D/g, '');

/** 12345678901 → 123.456.789-01 */
export function maskCpf(value) {
  const d = onlyDigits(value).slice(0, 11);
  let out = d.slice(0, 3);
  if (d.length > 3) out += `.${d.slice(3, 6)}`;
  if (d.length > 6) out += `.${d.slice(6, 9)}`;
  if (d.length > 9) out += `-${d.slice(9, 11)}`;
  return out;
}

/** 18999998888 → (18) 99999-8888 | 1833334444 → (18) 3333-4444 */
export function maskPhone(value) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;

  const area = d.slice(0, 2);
  const rest = d.slice(2);
  const split = rest.length > 8 ? 5 : 4;
  const head = rest.slice(0, split);
  const tail = rest.slice(split);
  return `(${area}) ${head}${tail ? `-${tail}` : ''}`;
}
