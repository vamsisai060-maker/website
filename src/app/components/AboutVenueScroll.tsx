'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panelText = [
  { eyebrow: 'The gathering', heading: 'About the Event' },
  { eyebrow: 'Your coordinates', heading: 'Venue' },
];

export default function AboutVenueScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[][]>([[], []]);
  const [activePanel, setActivePanel] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
      const textGroups = textRefs.current.map((group) => group.filter(Boolean) as HTMLElement[]);

      if (prefersReducedMotion) {
        gsap.set(track, { clearProps: 'all' });
        gsap.set(panels, { clearProps: 'all', opacity: 1 });
        gsap.set(textGroups.flat(), { clearProps: 'all', opacity: 1, y: 0 });
        return;
      }

      const media = gsap.matchMedia();

      media.add('(max-width: 639px)', () => {
        gsap.set(textGroups.flat(), { opacity: 0, y: 24 });
        textGroups.forEach((group, index) => {
          gsap.to(group, {
            scrollTrigger: {
              trigger: panels[index],
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
          });
        });
      });

      media.add('(min-width: 640px)', () => {
        gsap.set(textGroups[0], { opacity: 0, y: 28 });
        gsap.set(textGroups[1], { opacity: 0, y: 28 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: true,
            start: 'top top',
            end: () => `+=${window.innerWidth}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActivePanel(self.progress < 0.5 ? 0 : 1),
          },
        });

        timeline
          .to(textGroups[0], {
            opacity: 1,
            y: 0,
            duration: 0.24,
            ease: 'power2.out',
            stagger: 0.1,
          }, 0)
          .to(track, { xPercent: -50, duration: 1, ease: 'none' }, 0)
          .to(textGroups[0], {
            opacity: 0,
            y: -24,
            duration: 0.2,
            ease: 'power2.in',
            stagger: 0.08,
          }, 0.54)
          .to(textGroups[1], {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            stagger: 0.1,
          }, 0.62);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-venue" aria-label="Event and venue information">
      <div className="about-venue__inner">
        <div className="about-venue__rail">
          <span>Event details</span>
          <span aria-hidden="true">Scroll to explore</span>
        </div>
        <div ref={trackRef} className="about-venue__track">
          {panelText.map((content, panelIndex) => (
            <article
              key={content.heading}
              ref={(element) => {
                panelRefs.current[panelIndex] = element;
              }}
              className="about-venue__panel"
            >
              <div className="about-venue__copy">
                <div
                  ref={(element) => {
                    textRefs.current[panelIndex][0] = element;
                  }}
                  className="about-venue__eyebrow"
                >
                  {content.eyebrow}
                </div>
                <h2
                  ref={(element) => {
                    textRefs.current[panelIndex][1] = element;
                  }}
                  className="about-venue__heading"
                >
                  {content.heading}
                </h2>
                {panelIndex === 0 ? (
                  <p
                    ref={(element) => {
                      textRefs.current[panelIndex][2] = element;
                    }}
                    className="about-venue__body"
                  >
                    A focused gathering for the people shaping what comes next. Meet the builders, thinkers, and collaborators turning bold ideas into the next chapter of the web.
                  </p>
                ) : (
                  <div className="about-venue__venue-content">
                    <p
                      ref={(element) => {
                        textRefs.current[panelIndex][2] = element;
                      }}
                      className="about-venue__body"
                    >
                      Join us in the room where the conversation continues, with space to connect, compare notes, and make something real.
                    </p>
                    <dl
                      ref={(element) => {
                        textRefs.current[panelIndex][3] = element;
                      }}
                      className="about-venue__details"
                    >
                      <div><dt>Venue</dt><dd>Factory Berlin</dd></div>
                      <div><dt>Date</dt><dd>18 October 2026</dd></div>
                      <div><dt>Reporting time</dt><dd>09:30 AM</dd></div>
                    </dl>
                    <div
                      ref={(element) => {
                        textRefs.current[panelIndex][4] = element;
                      }}
                      className="about-venue__map"
                      role="img"
                      aria-label="Map embed placeholder"
                    >
                      <span>Map embed</span>
                      <span className="about-venue__map-cross" aria-hidden="true" />
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="about-venue__dots" aria-label={`Showing ${activePanel === 0 ? 'About the Event' : 'Venue'}`}>
          {[0, 1].map((index) => (
            <span key={index} className={`about-venue__dot${activePanel === index ? ' is-active' : ''}`} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .about-venue {
          --venue-bg: #0b0b0f;
          --venue-card: #17171d;
          --venue-border: #2a2a33;
          --venue-primary: #f5f5f7;
          --venue-muted: #9a9aa5;
          --venue-soft: #c7c7ce;
          background: var(--venue-bg);
          color: var(--venue-primary);
          overflow: hidden;
          min-height: 100svh;
          font-family: RobotoMono, monospace;
        }

        .about-venue__inner {
          min-height: 100svh;
          position: relative;
        }

        .about-venue__rail {
          display: flex;
          justify-content: space-between;
          padding: 1.5rem clamp(1.25rem, 4vw, 4rem);
          border-bottom: 1px solid var(--venue-border);
          color: var(--venue-muted);
          font-size: 0.625rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .about-venue__track {
          display: flex;
          width: 200%;
          min-height: calc(100svh - 4rem);
        }

        .about-venue__panel {
          width: 50%;
          min-height: calc(100svh - 4rem);
          flex: 0 0 50%;
          padding: clamp(4rem, 12vh, 8rem) clamp(1.25rem, 9vw, 10rem);
          display: flex;
          align-items: center;
        }

        .about-venue__copy { width: min(100%, 56rem); }
        .about-venue__eyebrow {
          margin-bottom: 1.5rem;
          color: var(--venue-muted);
          font-size: 0.6875rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .about-venue__heading {
          margin: 0;
          max-width: 11ch;
          color: var(--venue-primary);
          font-family: LabsAmiga, sans-serif;
          font-size: clamp(3rem, 8vw, 7.5rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          line-height: 0.9;
        }
        .about-venue__body {
          max-width: 62ch;
          margin: 2rem 0 0;
          color: var(--venue-soft);
          font-size: 0.875rem;
          line-height: 1.8;
        }
        .about-venue__venue-content { max-width: 44rem; }
        .about-venue__details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          margin: 2.5rem 0 1rem;
          border: 1px solid var(--venue-border);
          background: var(--venue-border);
        }
        .about-venue__details div { padding: 1rem; background: var(--venue-card); }
        .about-venue__details dt {
          color: var(--venue-muted);
          font-size: 0.625rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .about-venue__details dd { margin: 0.7rem 0 0; color: var(--venue-primary); font-size: 0.75rem; }
        .about-venue__map {
          min-height: 8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--venue-border);
          background-color: var(--venue-card);
          background-image: linear-gradient(var(--venue-border) 1px, transparent 1px), linear-gradient(90deg, var(--venue-border) 1px, transparent 1px);
          background-size: 2rem 2rem;
          color: var(--venue-muted);
          font-size: 0.625rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .about-venue__map-cross { width: 1px; height: 100%; position: absolute; background: var(--venue-border); }
        .about-venue__map-cross::after { content: ''; width: 100vw; height: 1px; position: absolute; left: -50vw; top: 50%; background: var(--venue-border); }
        .about-venue__dots {
          display: flex;
          gap: 0.5rem;
          position: absolute;
          right: clamp(1.25rem, 4vw, 4rem);
          bottom: 1.75rem;
        }
        .about-venue__dot { width: 0.45rem; height: 0.45rem; border: 1px solid var(--venue-muted); border-radius: 50%; }
        .about-venue__dot.is-active { background: var(--venue-primary); border-color: var(--venue-primary); }

        @media (max-width: 639px) {
          .about-venue { min-height: auto; }
          .about-venue__inner { min-height: auto; }
          .about-venue__rail span:last-child { display: none; }
          .about-venue__track { display: block; width: 100%; min-height: auto; }
          .about-venue__panel { width: 100%; min-height: 100svh; padding: 5rem 1.25rem 4rem; }
          .about-venue__heading { font-size: clamp(3.2rem, 16vw, 5.5rem); }
          .about-venue__details { grid-template-columns: 1fr; }
          .about-venue__dots { display: none; }
        }
      `}</style>
    </section>
  );
}