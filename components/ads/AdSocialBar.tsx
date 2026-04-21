'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147382.profitablecpmratenetwork.com/cd/a8/ab/cda8abf09d284000c7edbbda92341b61.js", "https://pl29147385.profitablecpmratenetwork.com/fe/5a/29/fe5a2912b3b0f9e6b43995b1eaf2f9be.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
