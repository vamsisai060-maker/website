'use client';

import { useEffect, useRef } from 'react';
import { Circ, gsap } from 'gsap';
import { RoughEase } from 'gsap/EasePack.js';

type Cell = 'pixel' | 'zero';

const px = (n: number): Cell[] => Array.from({ length: n }, () => 'pixel' as const);

const LAYOUTS: Cell[][] = [
  px(18),
  ['zero', ...px(18)],
  ['zero', ...px(18)],
  [...px(14), 'zero', ...px(5)],
  px(18),
  px(18),
];

const ZERO_INDEX = new Map<string, number>();
{
  let sequence = 0;
  LAYOUTS.forEach((cells, colIndex) => {
    cells.forEach((cell, cellIndex) => {
      if (cell === 'zero') {
        sequence++;
        ZERO_INDEX.set(`${colIndex}-${cellIndex}`, sequence);
      }
    });
  });
}

const SESSION_KEY = 'preloadAnimationShown';
const MAX_COUNT = 9;
const COUNT_STEP_MS = 200;
const FLICKER_DELAY_MS = 1100;
const PIXELATE_DELAY_MS = 400;

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let shownBefore = false;
    try {
      shownBefore = sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      /* storage unavailable */
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || shownBefore) {
      root.style.display = 'none';
      return;
    }

    const body = document.body;
    const lockScroll = () => {
      window.__lenis?.stop();
      body.classList.add('has-preloader');
    };
    const unlockScroll = () => {
      window.__lenis?.start();
      body.classList.remove('has-preloader');
    };

    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const intervals: Array<ReturnType<typeof setInterval>> = [];
    const gsapRefs: Array<gsap.core.Tween | gsap.core.Timeline> = [];

    const storeShown = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        /* storage unavailable */
      }
    };

    const pixelate = () => {
  const columns = root.querySelectorAll('.col');
      const targets: HTMLElement[] = [];
      columns.forEach((column) => {
        const divs = Array.from(column.querySelectorAll<HTMLElement>('.pixel'));
        targets.push(...divs.filter((_div, i) => i >= 9));
      });

      if (targets.length > 0) {
        const timeline = gsap.timeline();
        gsapRefs.push(timeline);
        timeline.to(targets, {
          backgroundColor: 'transparent',
          opacity: 0,
          duration: 0.5,
          stagger: { amount: 1, from: 'random' },
          onComplete: () => {
            unlockScroll();
            root.style.display = 'none';
            storeShown();
            intervals.forEach(clearInterval);
          },
        });
      } else {
        unlockScroll();
        root.style.display = 'none';
        storeShown();
      }
    };

    const countWithLeadingZeros = (initialCount: number) => {
  let count = initialCount;
      let mainCount = 0;

      const interval = setInterval(() => {
        count++;
        const current = document.querySelector<HTMLElement>('#zeroText2');
        const main = document.querySelector<HTMLElement>('#zeroText1');
        if (!current || !main) return;

        current.innerText = count.toString().padStart(1, '0');

        if (count >= MAX_COUNT) {
          clearInterval(interval);
          count = 0;
          current.innerText = count.toString();

          mainCount++;
          main.innerText = mainCount.toString().padStart(1, '0');

          if (mainCount >= 1) {
            timers.push(setTimeout(pixelate, PIXELATE_DELAY_MS));
          }
        }
      }, COUNT_STEP_MS);
      intervals.push(interval);

      timers.push(
        setTimeout(() => {
          gsapRefs.push(
            gsap.to('#zeroText1, #zeroText2, #zeroText3', {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                document.querySelectorAll('#zero1, #zero2, #zero3').forEach((el) => {
                  (el as HTMLElement).style.display = 'none';
                });
              },
            }),
          );
        }, (MAX_COUNT + 1) * COUNT_STEP_MS),
      );
    };

    const initAnimation = () => {
  if (window.location.pathname === '/') {
    lockScroll();
  }

  const span1 = document.getElementById('zeroText1');
  const span2 = document.getElementById('zeroText2');
  const span3 = document.getElementById('zeroText3');
  if (!span1 || !span2 || !span3) return;

      const flickerEase = RoughEase.config({
        template: Circ.easeOut,
        strength: 4,
        points: 50,
        taper: 'out',
        randomize: true,
        clamp: true,
      });

      gsapRefs.push(
        gsap.from([span1, span2, span3], {
          autoAlpha: 0,
          duration: 1,
          stagger: { each: 0.05, from: 'random' },
          ease: flickerEase,
          onComplete: () => countWithLeadingZeros(0),
        }),
      );
    };

    timers.push(setTimeout(initAnimation, FLICKER_DELAY_MS));

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      gsapRefs.forEach((tween) => tween.kill());
      unlockScroll();
    };
  }, []);

  return (
    <div id="preloader" ref={rootRef} className="preload-container" aria-hidden="true">
      <div className="text-grid">
        {LAYOUTS.map((cells, colIndex) => (
          <div key={colIndex} className="preloader-line col">
            {cells.map((cell, cellIndex) => {
              const key = `${colIndex}-${cellIndex}`;
              if (cell === 'pixel') {
                return <div key={key} className="pixel" />;
              }
              const zeroNum = ZERO_INDEX.get(key);
              return (
                <div key={key} id={`zero${zeroNum}`} className="zero-text zero">
                  <span id={`zeroText${zeroNum}`}>0</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}