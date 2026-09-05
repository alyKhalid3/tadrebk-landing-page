import type Lenis from 'lenis';

/** Ref so CTA/anchor clicks can use Lenis smooth scrolling when available. */
export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToId(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(el as HTMLElement, { offset: -88, duration: 1.1 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
