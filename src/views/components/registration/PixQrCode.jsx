import { QRCodeSVG } from 'qrcode.react';
import '../../_shared/style/components/registration/PixQrCode.css';

/**
 * QR Code do Pix. `payload` é o texto "copia e cola" gerado por utils/pix.js.
 * inverted = módulos brancos sobre fundo roxo (visual do layout).
 */
export function PixQrCode({ payload, inverted = true }) {
  return (
    <div className="pix-qr" data-inverted={inverted}>
      <QRCodeSVG
        className="pix-qr__svg"
        value={payload}
        size={256}
        level="M"
        marginSize={0}
        bgColor="transparent"
        fgColor={inverted ? '#ffffff' : '#1a0a35'}
        title="QR Code Pix para pagamento da taxa de inscrição"
      />
    </div>
  );
}
