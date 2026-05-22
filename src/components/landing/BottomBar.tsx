'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function BottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.body.scrollHeight - window.innerHeight;
      // Aparece después de 350px de scroll, desaparece en el último 10%
      setVisible(scrolled > 350 && scrolled < total * 0.90);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 'clamp(1.25rem, 4vw, 2.5rem)',
        paddingRight: 'clamp(1.25rem, 4vw, 2.5rem)',
        background: 'rgba(7,9,9,0.96)',
        borderTop: '1px solid rgba(97,211,152,0.18)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-oswald), sans-serif',
        fontSize: 'clamp(0.75rem, 2vw, 1rem)',
        fontWeight: 600,
        letterSpacing: '0.1em',
        color: '#F4F1EA',
        margin: 0,
      }}>
        TU TALLER.{' '}
        <span style={{ color: '#61D398' }}>MÁS RÁPIDO.</span>
      </p>

      <Link
        href="/login"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          height: '38px',
          padding: '0 1.25rem',
          borderRadius: '6px',
          background: '#61D398',
          color: '#070909',
          fontSize: '0.72rem',
          fontWeight: 900,
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Empezar gratis
        <ArrowIcon />
      </Link>
    </div>
  );
}
