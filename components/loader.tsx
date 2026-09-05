'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const FLAG = 'tbk-loader';

/**
 * Brand intro: the wordmark draws in, fills with the brand gradient, then
 * swaps to the cap logo — which flies home into its exact navbar slot
 * (FLIP handoff to the real header logo). Plays once per tab session;
 * skipped for reduced-motion users and repeat visits.
 */
export default function Loader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(FLAG) === '1';
    } catch {
      /* private mode — just play it */
    }
    if (reduce || seen) {
      setDone(true);
      return;
    }
    html.classList.add('is-loading');

    // FLIP targets, measured before any transforms are applied
    const brandEl = brandRef.current;
    const logoEl = document.querySelector<HTMLElement>('.header__logo');
    let dx = 0;
    let dy = -140;
    let scale = 0.4;
    if (brandEl && logoEl) {
      const from = brandEl.getBoundingClientRect();
      const to = logoEl.getBoundingClientRect();
      dx = to.left + to.width / 2 - (from.left + from.width / 2);
      dy = to.top + to.height / 2 - (from.top + from.height / 2);
      scale = to.height / from.height;
    }

    const finish = () => {
      html.classList.remove('is-loading');
      try {
        sessionStorage.setItem(FLAG, '1');
      } catch {
        /* ignore */
      }
      setDone(true);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish });
      tl.fromTo(markRef.current, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.45 })
        .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'none' }, 0)
        .fromTo(
          fillRef.current,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power3.inOut' },
          0.45
        )
        // the wordmark condenses into the cap logo
        .add('swap', '+=0.12')
        .to(markRef.current, { scale: 0.6, autoAlpha: 0, y: -14, duration: 0.3, ease: 'power2.in' }, 'swap')
        .fromTo(brandRef.current, { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.35 }, 'swap+=0.08')
        // the logo flies home to its navbar slot as the curtain lifts
        .add('fly', '+=0.05')
        .add(() => html.classList.remove('is-loading'), 'fly')
        .to(brandRef.current, { x: dx, y: dy, scale, duration: 0.85, ease: 'power4.inOut' }, 'fly')
        .to(rootRef.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 'fly+=0.1')
        .to(lineRef.current, { autoAlpha: 0, duration: 0.25 }, 'fly')
        .to(brandRef.current, { autoAlpha: 0, duration: 0.2, ease: 'power1.out' }, 'fly+=0.68')
        .fromTo(
          logoEl,
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(1.8)' },
          'fly+=0.72'
        );
    }, rootRef);

    // hard fallback: never trap the visitor behind the loader
    const fallback = window.setTimeout(finish, 4000);

    return () => {
      window.clearTimeout(fallback);
      html.classList.remove('is-loading');
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div className="loader" ref={rootRef} aria-hidden="true">
      <div className="loader__inner">
        <div className="loader__mark" ref={markRef}>
          <span className="loader__stroke">tadreebak</span>
          <span className="loader__fill" ref={fillRef}>
            tadreebak
          </span>
        </div>
        <div className="loader__brand" ref={brandRef}>
          <Image
            src="/images/logoandfav@2x.webp"
            alt=""
            width={232}
            height={193}
            priority
            style={{ height: 120, width: 'auto' }}
          />
        </div>
        <span className="loader__line" ref={lineRef} />
      </div>
    </div>
  );
}
