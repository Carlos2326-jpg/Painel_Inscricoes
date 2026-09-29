# Página de inscrição

Tudo o que a página usa está nestes arquivos (as pastas do zip já espelham o seu `src/`; é só mesclar):

```
src/
├─ models/         event.js  activities.js  registration.js  steps.js  validators.js
├─ controllers/    useRegistrationForm.js  useStepper.js  useEntrance.js  useCopyToClipboard.js
├─ utils/          masks.js  format.js  pix.js  whatsapp.js
└─ views/
   ├─ components/
   │  ├─ common/         ActionButton  BackButton  TextField  SelectField  RadioGroup  Icons  Reveal
   │  ├─ layout/         InkBackground (+ inkLayouts.js)  StepPanel  ProgressBar
   │  └─ registration/   ActivityOption  PixQrCode
   └─ pages/Registration/  RegistrationPage.jsx/.css  RegistrationDeck.jsx  RegistrationTheme.css  steps/
```

## 1. Dependências

```bash
npm install qrcode.react @fontsource-variable/inter
```

## 2. Rota

No seu `AppRoutes.jsx`:

```jsx
import RegistrationPage from '../views/pages/Registration/RegistrationPage.jsx';

<Route path="/inscricao" element={<RegistrationPage />} />
```

Nenhuma outra alteração é necessária: os imports são relativos (sem alias `@`), o tema e o reset ficam
restritos à página (`RegistrationTheme.css`, escopo `.registration`) e a fonte Inter é importada pela própria página.
Só considere que o `body` tenha `margin: 0`.

## 3. O que trocar antes de publicar

| Arquivo | O quê |
| --- | --- |
| `models/event.js` | Taxa, número do WhatsApp, chave Pix, recebedor e cidade |
| `models/activities.js` | Atividades e vagas (`capacity` = total, `filled` = preenchidas) |
| `views/components/layout/InkBackground/inkLayouts.js` | Posição e cores da tinta em cada etapa (opcional) |

Os valores atuais são de exemplo (WhatsApp e chave Pix fictícios).

## Observações

* **Enviar comprovante** abre o WhatsApp em nova aba com mensagem pronta e avança para a tela final. Não há back-end:
  para gravar a inscrição, chame sua API em `openWhatsappWithReceipt` ou `finish` (em `RegistrationPage.jsx`).
* O QR Code é um "Pix copia e cola" real (BR Code com CRC16). O layout usa QR invertido (branco sobre roxo); se algum app
  de banco não ler, defina `invertedQr: false` em `models/event.js`.
* `ActionButton` tem esse nome de propósito, para não colidir com o seu `common/button.jsx`.
