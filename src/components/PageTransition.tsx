'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

const COVER_DURATION = 0.6;
const REVEAL_DURATION = 0.65;
const STAGGER = 0.06;
const REVEAL_FALLBACK_MS = 1500;

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const colsRef = useRef<Array<HTMLDivElement | null>>([]);
  const awaitingReveal = useRef(false);
  const reducedMotion = useRef(false);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = query.matches;
    const onChange = () => {
      reducedMotion.current = query.matches;
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const columns = useCallback(
    () => colsRef.current.filter((el): el is HTMLDivElement => Boolean(el)),
    [],
  );

  const setOverlayVisible = useCallback((visible: boolean) => {
    if (overlayRef.current) {
      overlayRef.current.style.display = visible ? 'grid' : 'none';
    }
  }, []);

  const clearFallback = useCallback(() => {
    if (fallback.current) {
      clearTimeout(fallback.current);
      fallback.current = null;
    }
  }, []);

  const cover = useCallback(async () => {
    const cols = columns();
    if (!cols.length) return;

    setOverlayVisible(true);
    gsap.set(cols, { yPercent: -100 });

    const tl = gsap.timeline();
    tl.to(cols, {
      yPercent: 0,
      duration: COVER_DURATION,
      ease: 'power3.inOut',
      stagger: STAGGER,
    });

    await tl.then();
  }, [columns, setOverlayVisible]);

  const reveal = useCallback(async () => {
    const cols = columns();
    if (!cols.length) {
      setOverlayVisible(false);
      return;
    }

    gsap.set(cols, { yPercent: 0 });

    const tl = gsap.timeline({ onComplete: () => setOverlayVisible(false) });
    tl.to(cols, {
      yPercent: -100,
      duration: REVEAL_DURATION,
      ease: 'power4.inOut',
      stagger: STAGGER,
    });

    await tl.then();
  }, [columns, setOverlayVisible]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      event.preventDefault();

      if (reducedMotion.current) {
        router.push(href);
        return;
      }

      (document.activeElement as HTMLElement | null)?.blur?.();
      awaitingReveal.current = true;

      void cover().then(() => {
        router.push(href);
        clearFallback();
        fallback.current = setTimeout(() => {
          if (awaitingReveal.current) {
            awaitingReveal.current = false;
            void reveal();
          }
        }, REVEAL_FALLBACK_MS);
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router, cover, reveal, clearFallback]);

  useEffect(() => {
    if (!awaitingReveal.current) return;
    awaitingReveal.current = false;
    clearFallback();

    if (reducedMotion.current) {
      setOverlayVisible(false);
      return;
    }

    void reveal();
  }, [pathname, reveal, clearFallback, setOverlayVisible]);

  useEffect(() => {
    const onPopState = () => {
      if (reducedMotion.current) return;
      awaitingReveal.current = false;
      clearFallback();
      void cover().then(() => reveal());
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [cover, reveal, clearFallback]);

  useEffect(
    () => () => {
      clearFallback();
      gsap.killTweensOf(columns());
    },
    [clearFallback, columns],
  );

  return (
    <div ref={overlayRef} className="pt-overlay" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          ref={(el) => {
            colsRef.current[index] = el;
          }}
          className="pt-col"
        >
          <div className="pt-bar" />
          <div className="pt-edge" />
        </div>
      ))}
    </div>
  );
}
