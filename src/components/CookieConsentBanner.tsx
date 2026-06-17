'use client';

import { getCookieConsent, setCookieConsent } from '@/lib/cookie-consent';
import { useEffect, useState } from 'react';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const accept = () => { setCookieConsent('accepted'); setVisible(false); };
  const reject = () => { setCookieConsent('rejected'); setVisible(false); };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-mr-bg border-t border-mr-border px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <p className="text-sm text-mr-text">
        Usamos cookies propias y de terceros (Google Fonts) para mejorar tu experiencia.{' '}
        <a href="/cookies" className="underline text-mr-accent hover:opacity-80">Politica de cookies</a>
      </p>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={reject}
          className="px-4 py-1.5 text-sm border border-mr-border rounded text-mr-text hover:bg-mr-bg transition-colors"
        >
          Rechazar
        </button>
        <button
          onClick={accept}
          className="px-4 py-1.5 text-sm bg-mr-accent text-white rounded hover:opacity-90 transition-opacity"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
