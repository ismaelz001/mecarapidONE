'use client';

import { useRef } from 'react';

interface InteractiveHeaderProps {
  children: React.ReactNode;
}

export function InteractiveHeader({ children }: InteractiveHeaderProps) {
  const ref = useRef<HTMLElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty('--header-shift-x', `${(x * 10).toFixed(2)}px`);
    element.style.setProperty('--header-shift-y', `${(y * 6).toFixed(2)}px`);
    element.style.setProperty('--header-light-x', `${((x + 0.5) * 100).toFixed(1)}%`);
  }

  function handlePointerLeave() {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty('--header-shift-x', '0px');
    element.style.setProperty('--header-shift-y', '0px');
    element.style.setProperty('--header-light-x', '50%');
  }

  return (
    <header
      ref={ref}
      className="site-premium-header fixed inset-x-0 top-0 z-50"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="site-header-orbit mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-8">
        {children}
      </div>
    </header>
  );
}
