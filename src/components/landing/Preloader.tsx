'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [count, setCount]   = useState(0);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const duration = 1600;
    const start    = Date.now();

    const tick = () => {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setHidden(true), 650);
        }, 250);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (hidden) return null;

  const radius       = 88;
  const circumference = 2 * Math.PI * radius;
  const dashOffset   = circumference * (1 - count / 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#070909',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.65s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Arc SVG */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Track */}
          <circle
            cx="110" cy="110" r={radius}
            fill="none"
            stroke="rgba(97,211,152,0.1)"
            strokeWidth="1"
          />
          {/* Progress */}
          <circle
            cx="110" cy="110" r={radius}
            fill="none"
            stroke="#61D398"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>

        {/* Center text */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
        }}>
          <span style={{
            fontFamily: 'var(--font-oswald), sans-serif',
            fontSize: '0.58rem',
            fontWeight: 600,
            letterSpacing: '0.32em',
            color: '#61D398',
            textTransform: 'uppercase',
          }}>
            MECARAPID
          </span>
          <span style={{
            fontFamily: 'var(--font-oswald), sans-serif',
            fontSize: '3rem',
            fontWeight: 700,
            color: '#F4F1EA',
            lineHeight: 1,
          }}>
            {count}
          </span>
          <span style={{
            fontSize: '0.6rem',
            color: 'rgba(244,241,234,0.25)',
            letterSpacing: '0.18em',
          }}>
            %
          </span>
        </div>
      </div>

      {/* Bottom label */}
      <p style={{
        marginTop: '2.5rem',
        fontFamily: 'var(--font-jakarta), sans-serif',
        fontSize: '0.7rem',
        letterSpacing: '0.22em',
        color: 'rgba(244,241,234,0.3)',
        textTransform: 'uppercase',
      }}>
        Cargando sistema
      </p>
    </div>
  );
}
