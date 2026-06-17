export const COOKIE_CONSENT_KEY = 'mecarapid-cookie-consent';

export type CookieConsentChoice = 'accepted' | 'rejected';

export function getCookieConsent(): CookieConsentChoice | null {
  if (typeof window === 'undefined') return null;
  const val = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (val === 'accepted' || val === 'rejected') return val;
  return null;
}

export function setCookieConsent(choice: CookieConsentChoice): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COOKIE_CONSENT_KEY, choice);
}

export function clearCookieConsent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
}
