/**
 * Gera o "Pix copia e cola" (BR Code estático, padrão EMV® do Banco Central).
 * O resultado é o texto que vai dentro do QR Code.
 */

/** Monta um campo TLV: id + tamanho (2 dígitos) + valor. */
const tlv = (id, value) => `${id}${String(value.length).padStart(2, '0')}${value}`;

/** O padrão exige ASCII, sem acentos, e limita o tamanho dos campos. */
const sanitize = (text, maxLength) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\x20-\x7E]/g, '')
    .toUpperCase()
    .slice(0, maxLength);

/** CRC16/CCITT-FALSE (polinômio 0x1021, início 0xFFFF). */
export function crc16(payload) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i += 1) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function buildPixPayload({ key, receiverName, city, amount, txid = '***' }) {
  const merchantAccount = tlv('26', tlv('00', 'br.gov.bcb.pix') + tlv('01', key));

  const payload =
    tlv('00', '01') + // versão do payload
    merchantAccount +
    tlv('52', '0000') + // categoria do comerciante
    tlv('53', '986') + // moeda: BRL
    (amount ? tlv('54', Number(amount).toFixed(2)) : '') +
    tlv('58', 'BR') +
    tlv('59', sanitize(receiverName, 25)) +
    tlv('60', sanitize(city, 15)) +
    tlv('62', tlv('05', txid)) +
    '6304'; // o CRC é calculado incluindo o id "63" e o tamanho "04"

  return payload + crc16(payload);
}
