'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { appLink } from '@/lib/app-url';
import { scrollToId } from '@/lib/lenis-ref';
import { IconMenu, IconX } from '@/components/icons';

const NAV = [
  { label: 'Internships', href: '#internships' },
  { label: 'Categories', href: '#categories' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why Tadreebak', href: '#why' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(hash);
  };

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__pill container">
        <a href="#top" className="header__brand" aria-label="Tadreebak home" onClick={go('#hero')}>
          <Image
            src="/images/logoandfav@2x.webp"
            alt="Tadreebak — graduation cap and connection logo"
            width={232}
            height={193}
            priority
            className="header__logo"
          />
        </a>

        <nav className="header__nav" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="header__link" onClick={go(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a href={appLink('/login')} className="btn btn--ghost btn--sm">
            Sign in
          </a>
          <a href={appLink('/register')} className="btn btn--primary btn--sm">
            Get started
          </a>
          <button
            type="button"
            className="header__burger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconX width={22} height={22} /> : <IconMenu width={22} height={22} />}
          </button>
        </div>
      </div>

      <div className="header__backdrop" onClick={() => setOpen(false)} aria-hidden="true" />

      <div id="mobile-nav" className="header__mobile" aria-hidden={!open}>
        {NAV.map((item) => (
          <a key={item.href} href={item.href} className="header__mobile-link" onClick={go(item.href)}>
            {item.label}
          </a>
        ))}
        <div className="header__mobile-cta">
          <a href={appLink('/login')} className="btn btn--ghost">
            Sign in
          </a>
          <a href={appLink('/register')} className="btn btn--primary">
            Get started free
          </a>
        </div>
      </div>
    </header>
  );
}
