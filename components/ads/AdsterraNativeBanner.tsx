'use client';
import { useEffect, useRef } from 'react';

export function AdsterraNativeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const s = document.createElement('script');
    s.async = true; s.setAttribute('data-cfasync', 'false');
    s.src = 'https://pl29147383.profitablecpmratenetwork.com/8bf0d54590ff5222f520fe744883a419/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} id="container-8bf0d54590ff5222f520fe744883a419" style={{ margin: '1.5rem 0', minHeight: '90px' }} />;
}
