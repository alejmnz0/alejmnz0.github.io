import { useEffect } from 'react';

/** Marks every [data-reveal] element with data-in once it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-in', ''));
      return;
    }
    // A fully clipped element (the "wipe" reveal) never intersects, so observe its parent instead.
    const targetOf = (el: HTMLElement) => (el.dataset.reveal === 'wipe' && el.parentElement ? el.parentElement : el);
    const waiting = new Map<Element, HTMLElement[]>();
    els.forEach((el) => {
      const t = targetOf(el);
      waiting.set(t, [...(waiting.get(t) ?? []), el]);
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          waiting.get(e.target)?.forEach((el) => el.setAttribute('data-in', ''));
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );
    waiting.forEach((_, t) => io.observe(t));
    return () => io.disconnect();
  }, []);
}

/** Writes scroll progress through the first viewport (0 → 1) to --hero on <html>. */
export function useHeroScroll() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      document.documentElement.style.setProperty('--hero', p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}
