'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { setSearch } from '@/lib/search-store';
import { scrollToId } from '@/lib/lenis-ref';
import { heroPointer } from '@/lib/hero-state';
import { IconSearch, IconPin, IconChevronDown } from '@/components/icons';

// The 3D layer is its own lazy chunk, client-only, never rendered on the server.
const Scene = dynamic(() => import('@/components/scene'), { ssr: false });

const H1_LINE_1 = ['Find', 'internships', 'that'];
const H1_LINE_2 = ['launch', 'your', 'career'];

const QUICK_TAGS = ['Software', 'Fintech', 'Design', 'Data', 'Marketing'];

const UNIVERSITIES = ['Cairo University', 'Ain Shams', 'Alexandria', 'GUC', 'BUE'];

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  // Mount the 3D scene only when: motion allowed + WebGL ok + browser idle.
  // The chunk prefetch starts immediately (network, not CPU) so the canvas
  // can mount the moment the browser goes idle — no fetch gap, no pop:
  // the scene fades in on its first rendered frame instead.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!webglAvailable()) return;
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let mounted = true;
    const load = import('@/components/scene');
    const go = () => {
      load.then(() => {
        if (mounted) setReady(true);
      }).catch(() => {});
    };
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(go, { timeout: 350 })
      : window.setTimeout(go, 200);
    return () => {
      mounted = false;
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  // Cursor parallax targets for the scene (lerped inside the canvas).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: PointerEvent) => {
      heroPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      heroPointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch({ query, location });
    scrollToId('#internships');
  };

  const onQuickTag = (tag: string) => {
    setQuery(tag);
    setSearch({ query: tag });
    scrollToId('#internships');
  };

  return (
    <section id="hero" ref={heroRef} className="hero" aria-label="Find internships">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__canvas" data-hero-canvas aria-hidden="true">
        {ready ? <Scene heroRef={heroRef} /> : null}
      </div>

      <div className="container hero__inner">
        <p className="eyebrow hero__eyebrow">
          <span className="hero__pulse" aria-hidden="true" />
          Trusted by students from 5+ universities
        </p>

        <h1 className="hero__title">
          <span className="hero__line">
            {H1_LINE_1.map((word, i) => (
              <span key={word} className="hero__word" style={{ ['--i' as string]: i }}>
                {word}
              </span>
            ))}
          </span>
          <span className="hero__line hero__line--grad">
            {H1_LINE_2.map((word, i) => (
              <span key={word} className="hero__word" style={{ ['--i' as string]: i + H1_LINE_1.length }}>
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero__sub">
          Egypt&rsquo;s first platform connecting university students with top internship
          opportunities — all in one organized, professional place.
        </p>

        <form className="hero__search" role="search" aria-label="Search internships" onSubmit={onSubmit}>
          <div className="hero__field">
            <IconSearch className="hero__field-icon" width={18} height={18} />
            <input
              type="search"
              name="q"
              placeholder="Search internships…"
              aria-label="Search internships by keyword"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearch({ query: e.target.value });
              }}
            />
          </div>
          <div className="hero__divider" aria-hidden="true" />
          <div className="hero__field">
            <IconPin className="hero__field-icon" width={18} height={18} />
            <input
              type="text"
              name="location"
              placeholder="Location"
              aria-label="Filter by location"
              list="hero-locations"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setSearch({ location: e.target.value });
              }}
            />
            <datalist id="hero-locations">
              <option value="Cairo, Egypt" />
              <option value="Giza, Egypt" />
              <option value="Alexandria, Egypt" />
              <option value="Remote" />
            </datalist>
          </div>
          <button type="submit" className="btn btn--primary hero__submit">
            Search
          </button>
        </form>

        <div className="hero__tags">
          <span className="hero__tags-label">Quick search:</span>
          {QUICK_TAGS.map((tag) => (
            <button key={tag} type="button" className="pill" onClick={() => onQuickTag(tag)}>
              {tag}
            </button>
          ))}
        </div>

        <div className="hero__trust">
          <p className="hero__trust-label">
            <IconBuildingInline />
            Trusted by students from
          </p>
          <ul className="hero__unis" aria-label="Partner universities">
            {UNIVERSITIES.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hero__scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <IconChevronDown width={16} height={16} />
      </div>
    </section>
  );
}

function IconBuildingInline() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9.5 21v-5h5v5" />
    </svg>
  );
}
