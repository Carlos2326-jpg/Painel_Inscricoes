import { useCallback, useEffect, useRef, useState } from 'react';

/** Plano B para navegadores sem a Clipboard API (ou fora de HTTPS). */
function legacyCopy(text) {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(area);
  if (!ok) throw new Error('copy failed');
}

export function useCopyToClipboard(resetAfterMs = 2200) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  const copy = useCallback(
    async (text) => {
      try {
        if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
        else legacyCopy(text);
        setCopied(true);
      } catch {
        try {
          legacyCopy(text);
          setCopied(true);
        } catch {
          setCopied(false);
          return;
        }
      }
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetAfterMs);
    },
    [resetAfterMs],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return { copied, copy };
}
