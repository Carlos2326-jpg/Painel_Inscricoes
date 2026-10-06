import { useMemo } from 'react';
import { PixQrCode } from '../../../components/registration/PixQrCode/PixQrCode.jsx';
import { Reveal } from '../../../components/common/Reveal/Reveal.jsx';
import { ActionButton } from '../../../components/common/ActionButton/ActionButton.jsx';
import { CheckIcon, CopyIcon, UploadIcon } from '../../../components/common/Icons/Icons.jsx';
import { EVENT } from '../../../../models/event.js';
import { STEP, stepTitleId } from '../../../../models/steps.js';
import { useCopyToClipboard } from '../../../../controllers/useCopyToClipboard.js';
import { formatCurrency } from '../../../../utils/format.js';
import { buildPixPayload } from '../../../../utils/pix.js';
import './PaymentStep.css';

/** Etapa 3 · Taxa, chave Pix (copiar), QR Code e envio do comprovante por WhatsApp. */
export function PaymentStep() {
  const { key, receiverName, city, invertedQr } = EVENT.pix;
  const { copied, copy } = useCopyToClipboard();

  const payload = useMemo(
    () => buildPixPayload({ key, receiverName, city, amount: EVENT.fee }),
    [key, receiverName, city],
  );

  return (
    <div className="payment">
      <div className="payment__info">
        <Reveal index={1}>
          <h2 id={stepTitleId(STEP.PAYMENT)} className="payment__title">
            Quase lá!
          </h2>
          <p className="payment__subtitle">
            Para concluir sua inscrição, realize o pagamento da taxa de participação.
          </p>
        </Reveal>

        <Reveal index={2} className="payment__fee">
          <span className="payment__fee-label">Taxa de inscrição</span>
          <strong className="payment__fee-value">{formatCurrency(EVENT.fee)}</strong>
        </Reveal>

        <Reveal index={3}>
          <h3 className="payment__how-title">Pagamento via Pix</h3>
          <p className="payment__how-text">
            Escaneie o QR Code abaixo ou copie a chave Pix para realizar o pagamento.
          </p>
        </Reveal>
      </div>

      <Reveal index={4} className="payment__pix">
        <div className="payment__key-row">
          <span className="payment__key">{key}</span>
          <button
            type="button"
            className="payment__copy"
            onClick={() => copy(key)}
            aria-label={copied ? 'Chave Pix copiada' : 'Copiar chave Pix'}
            data-copied={copied}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
        <span className="payment__copied" aria-live="polite" data-visible={copied}>
          {copied ? 'Chave copiada!' : ''}
        </span>

        <PixQrCode payload={payload} inverted={invertedQr} />

        <p className="payment__receiver">Recebedor: {receiverName}</p>
      </Reveal>

      <Reveal index={5} className="payment__action">
        <ActionButton type="submit" icon={<UploadIcon />}>
          Enviar comprovante
        </ActionButton>
      </Reveal>
    </div>
  );
}
