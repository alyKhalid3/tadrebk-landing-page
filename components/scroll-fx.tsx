'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroScroll } from '@/lib/hero-state';

gsap.registerPlugin(ScrollTrigger);

/**
 * One client component owns every scroll-linked animation:
 * fade-up reveals, stagger groups, category pop-ins, the How-It-Works
 * timeline draw, the dashboard card entrance and the hero canvas fade.
 * Everything uses `once: true` or light scrubbing — no pinning anywhere.
 */
export default function ScrollFx() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Fade-up single elements
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });

      // Fade-up sibling groups with 70ms stagger
      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        gsap.fromTo(
          Array.from(group.children),
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.07,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          }
        );
      });

      // Category icon tiles pop in once (scale + rotate), then stay static
      gsap.utils.toArray<HTMLElement>('[data-pop-group]').forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll('[data-pop]'),
          { scale: 0.6, rotate: -8, autoAlpha: 0 },
          {
            scale: 1,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: 'top 80%', once: true },
          }
        );
      });

      // How-it-works timeline draws itself while scrolling through the section
      const timeline = document.querySelector<HTMLElement>('[data-timeline]');
      const line = document.querySelector<HTMLElement>('[data-timeline-line]');
      if (timeline && line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 70%',
              end: 'bottom 65%',
              scrub: 0.4,
            },
          }
        );
      }

      // Dashboard mockup: flies in from the right at -25deg, settles at -8deg
      const dashCard = document.querySelector<HTMLElement>('[data-dash-card]');
      if (dashCard) {
        gsap.fromTo(
          dashCard,
          { rotationY: -25, x: 90, autoAlpha: 0 },
          {
            rotationY: -8,
            x: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: dashCard, start: 'top 78%', once: true },
          }
        );
      }

      // Reading progress bar at the very top of the viewport
      const progress = document.querySelector<HTMLElement>('.scroll-progress');
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
          }
        );
      }

      // Hero 3D canvas fades out over the first 260px of scroll
      const canvasWrap = document.querySelector<HTMLElement>('[data-hero-canvas]');
      const hero = document.querySelector<HTMLElement>('#hero');
      if (canvasWrap && hero) {
        gsap.fromTo(
          canvasWrap,
          { opacity: 1 },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: '+=260',
              scrub: true,
              onUpdate: (self) => {
                heroScroll.p = self.progress;
              },
            },
          }
        );
      }

    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
