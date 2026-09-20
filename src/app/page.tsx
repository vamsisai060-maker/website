// 'use client';

// import { useLayoutEffect, useRef, useState } from 'react';
// import Link from 'next/link';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import CountdownStrip from './CountdownStrip';
// import StaggeredMenu from '@/components/StaggeredMenu';
// import SiteHeader from '@/components/SiteHeader';
// import DecryptedText from '@/components/DecryptedText';
// import { EVENT_ENTRY_FEE, EVENTS } from '@/data/events';

// const ARROW_SVG = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDIzIDIzIiB3aWR0aD0iMjMiIGhlaWdodD0iMjMiPjxzdHlsZT4uYXtmaWxsOiMwZTBlMGV9PC9zdHlsZT48cGF0aCBjbGFzcz0iYSIgZD0ibTEwLjYgNGMtMC41IDAtMC45IDAuNC0wLjkgMC45djEuN2MwIDAuNSAwLjQgMC45IDAuOSAwLjloMS4zYzAuNSAwIDAuOCAwLjQgMC44IDAuOHYxLjRxMCAwLjEgMC4xIDAuM2gtNy41Yy0wLjYgMC0xIDAuNC0xIDF2MWMwIDAuNiAwLjQgMSAxIDFoNy4ycS0wLjIgMC4yLTAuMiAwLjZ2MS4zYzAgMC40LTAuNCAwLjgtMC45IDAuOGgtMS4zYy0wLjQgMC0wLjggMC40LTAuOCAwLjl2MS43YzAgMC41IDAuNCAwLjkgMC44IDAuOWgxLjhjMC41IDAgMC44LTAuNCAwLjgtMC45di0xLjNjMC0wLjQgMC40LTAuOCAwLjktMC44aDEuM2MwLjUgMCAwLjktMC40IDAuOS0wLjl2LTAuOWMwLTAuNCAwLjQtMC44IDAuOS0wLjhoMS43YzAuNSAwIDAuOS0wLjQgMC45LTAuOXYtMS43cTAtMC40LTAuMi0wLjZjLTAuMi0wLjItMC41LTAuNC0wLjgtMC40aC0xLjZjLTAuMy0wLjEtMC41LTAuNC0wLjUtMC44di0xLjNjMC0wLjUtMC40LTAuOS0wLjktMC45aC0xLjNjLTAuNCAwLTAuOC0wLjMtMC44LTAuOHYtMS4zYzAtMC41LTAuNC0wLjktMC45LTAuOXoiLz48L3N2Zz4=';

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const SLIDE_COUNT = EVENTS.length;
//   const [step, setStep] = useState(440);
//   const [portfolioSlide, setPortfolioSlide] = useState(1);
//   const portfolioPrev = () => setPortfolioSlide((i) => Math.max(i - 1, 0));
//   const portfolioNext = () => setPortfolioSlide((i) => Math.min(i + 1, SLIDE_COUNT - 1));
//   const TEAM_SLIDE_STEP = 291.765;
//   const TEAM_SLIDE_COUNT = 8;
//   const [teamSlide, setTeamSlide] = useState(0);
//   const teamPrev = () => setTeamSlide((i) => Math.max(i - 1, 0));
//   const teamNext = () => setTeamSlide((i) => Math.min(i + 1, TEAM_SLIDE_COUNT - 1));

//   useLayoutEffect(() => {
//     const mql = window.matchMedia('(max-width: 767px)');
//     const update = () => {
//       const slide = sliderRef.current?.querySelector('.portfolio-slide');
//       if (slide) {
//         const gap = parseFloat(getComputedStyle(slide).marginRight) || 0;
//         setStep(Math.round(slide.getBoundingClientRect().width + gap));
//       }
//       setPortfolioSlide(mql.matches ? 0 : 1);
//     };
//     update();
//     mql.addEventListener('change', update);
//     window.addEventListener('resize', update);
//     return () => {
//       mql.removeEventListener('change', update);
//       window.removeEventListener('resize', update);
//     };
//   }, []);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // Hero Entrance Animation
//       gsap.from('.gsap-hero-title', {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out',
//         stagger: 0.2,
//       });

//       // ScrollTrigger Section Animations
//       gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
//         gsap.from(el, {
//           scrollTrigger: {
//             trigger: el,
//             start: 'top 85%',
//             toggleActions: 'play none none reverse',
//           },
//           y: 40,
//           opacity: 0,
//           duration: 0.8,
//           ease: 'power2.out',
//         });
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={containerRef} className="min-h-screen bg-[var(--lightgrey)] overflow-hidden">
//       <div className="w-layout-blockcontainer page-transition-container w-container" style={{display: "none"}}>
//         <div className="page-transition-grid">
//           <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
//           </div>
//           <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
//           </div>
//           <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel"></div>
//             <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
//           </div>
//           <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
//           </div>
//           <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
//           </div>
//           <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel"></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
//             <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
//           </div>
//         </div>
//         <div className="w-embed"></div>
//       </div>
//       <div className="preloader-animation-script w-embed"></div>
//       <div id="preloader" className="w-layout-blockcontainer preload-container w-container" style={{display: "none"}}>
//         <div className="text-grid">
//           <div id="line" data-w-id="67cf7f8d-51c3-0557-3db5-7a1eb93956d7" className="col w-node-_67cf7f8d-51c3-0557-3db5-7a1eb93956d7-ef5b982d" style={{width: "39.6641px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//           </div>
//           <div id="line" data-w-id="89fb16af-e6b1-fc17-6ce6-20af0a0bb521" className="col" style={{width: "116.773px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
//             <div id="zero1" className="zero-text zero w-node-a77074df-1cd8-d36c-f0d3-7f2e657ccc2e-ef5b982d">
// 0              <br className="" />
//             </div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//           </div>
//           <div id="line" data-w-id="2c546267-2314-5a1d-5542-236e910f64dc" className="col" style={{width: "116.773px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
//             <div id="zero2" className="zero-text zero">
// 0              <br className="" />
//             </div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//           </div>
//           <div id="line" data-w-id="44f65394-95dc-5df3-4c21-cbc11ee732e2" className="col w-node-_44f65394-95dc-5df3-4c21-cbc11ee732e2-ef5b982d" style={{width: "116.773px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div id="zero3" className="zero-text zero">
// 0              <br className="" />
//             </div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//           </div>
//           <div id="line" data-w-id="6ee5ee2c-ec0b-2320-b60d-44c179b0b91d" className="col w-node-_6ee5ee2c-ec0b-2320-b60d-44c179b0b91d-ef5b982d" style={{width: "116.773px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//           </div>
//           <div id="line" data-w-id="15aa6cc3-e0c2-94c2-5ece-bf72b4df2bcc" className="col w-node-_15aa6cc3-e0c2-94c2-5ece-bf72b4df2bcc-ef5b982d" style={{width: "39.6641px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//             <div className="pixel"></div>
//           </div>
//         </div>
//       </div>
//       <div className="gtm-code w-embed w-iframe">
//         {/* Google Tag Manager (noscript) */}
//         {/* End Google Tag Manager (noscript) */}
//       </div>
//       <div className="custom-styles w-embed"></div>
//       <div className="body-lines-wrap">
//         <div className="body-line left"></div>
//         <div className="body-line left-middle"></div>
//         <div className="body-line center"></div>
//         <div className="body-line right-middle"></div>
//         <div className="body-line right"></div>
//       </div>
//       <SiteHeader />
//       <section id="hero-section" className="hero-section">
//         <div id="hero-section-container" className="w-layout-blockcontainer container hero-container w-container">
//           <div className="hero-wrapper">
//             <div className="hero-top">
//               <div className="hero-backing hero-backing-top">
//                 <div className="hero-square"></div>
//                 <div className="hero-square"></div>
//               </div>
//               <div className="hero-marquee-wrapper">
//                 <div className="hero-marquee marquee-animation-start is-animated">
// <h1 className="marquee-heading gsap-hero-title">
//  ASTRA                  </h1>
//                   <h1 className="marquee-heading gsap-hero-title">
//  2K26                  </h1>
//                 </div>
//                 <div className="hero-marquee marquee-animation-start is-animated">
// <h1 className="marquee-heading gsap-hero-title">
//  ASTRA                  </h1>
//                   <h1 className="marquee-heading gsap-hero-title">
//  2K26                  </h1>
//                 </div>
//               </div>
//               <div className="hero-top-content">
//                 <div className="graphic-block hero-graphic-small">
//                   <div className="graphic-block-decor graphic-block-decor-top-left"></div>
//                   <div className="graphic-block-decor graphic-block-decor-top-right"></div>
//                   <div className="graphic-block-decor graphic-block-decor-bottom-right"></div>
//                   <div className="graphic-block-decor graphic-block-decor-bottom-left"></div>
//                   <img src="data:image/webp;base64,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" loading="lazy" alt="" className="graphic-block-image" />
//                 </div>
//                 <div className="hero-square hero-square-top-right hero-square-mobile"></div>
//                 <div className="hero-square hero-square-top-left hero-square-mobile"></div>
//                 <div className="hero-backing">
//                   <div className="hero-square"></div>
//                   <div id="w-node-_30e76485-ae6c-05d7-60f5-023e5c311de5-ef5b982d" className="w-layout-hflex hero-backing-text">
//                     <div className="hero-backing-item">
//  ASTRA                      <br className="" />
//                     </div>
//                     <div className="hero-backing-item">
//  2K26                    </div>
//                   </div>
//                   <div id="w-node-bf49c4bc-c533-46a4-5e65-738d863c031d-ef5b982d" className="hero-square"></div>
//                 </div>
//                 <div className="hero-video w-embed">
//                   <video autoPlay loop muted playsInline className="">
//                     <source src="https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/video/Labs/LABS_hero_SAFARI_HEVC.mp4" type="video/mp4; codecs=hvc1" className="" />
//                     <source src="https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/video/Labs/LABS_hero_CHROME_VP9.webm" type="video/webm" className="" />
//                   </video>
//                 </div>
//               </div>
//             </div>
//             <div className="hero-main">
//               <div className="hero-info">
//                 <div className="hero-description">
//  Backing the very best web3 builders -transforming visionary ideas into real-world growth.                </div>
//               </div>
//               <div className="hero-bottom-space"></div>
//               <div className="graphic-block hero-graphic-block">
//                 <div className="graphic-block-decor graphic-block-decor-top-left"></div>
//                 <div className="graphic-block-decor graphic-block-decor-top-right"></div>
//                 <div className="graphic-block-decor graphic-block-decor-bottom-right"></div>
//                 <div className="graphic-block-decor graphic-block-decor-bottom-left"></div>
//                 <img src="data:image/webp;base64,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" loading="lazy" alt="" className="graphic-block-image" />
//               </div>
//             </div>
//             <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MyIgaGVpZ2h0PSI0MyIgZmlsbD0iI0Y2RjZGNiIvPgo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjQzIiBoZWlnaHQ9IjQzIiBzdHJva2U9IiM5RTlFOUUiLz4KPHBhdGggZD0iTTE4LjM4NTMgMjQuOTE3Nkw5LjAwMDA4IDM0LjMwMjlMOS42OTcxNyAzNUwxOS4wODI1IDI1LjYxNDdIMjQuOTE3NUwzNC4zMDI4IDM1TDM0Ljk5OTkgMzQuMzAyOUwyNS42MTQ3IDI0LjkxNzdWMTkuMDgyNEwzNSA5LjY5NzA5TDM0LjMwMjkgOUwyNC45MTc3IDE4LjM4NTNIMTkuMDgyM0w5LjY5NzA4IDlMOSA5LjY5NzA5TDE4LjM4NTMgMTkuMDgyNVYyNC45MTc2WiIgZmlsbD0iIzlFOUU5RSIvPgo8L3N2Zz4K" loading="lazy" width={44} height={44} alt="" id="hero-decor" className="hero-decor-1" />
//             <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MyIgaGVpZ2h0PSI0MyIgZmlsbD0iI0Y2RjZGNiIvPgo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjQzIiBoZWlnaHQ9IjQzIiBzdHJva2U9IiM5RTlFOUUiLz4KPHBhdGggZD0iTTIyLjAwMDMgMjUuOTI4NkMyNC4xNjk5IDI1LjkyODYgMjUuOTI4OCAyNC4xNjk3IDI1LjkyODggMjJDMjUuOTI4OCAxOS44MzAzIDI0LjE2OTkgMTguMDcxNCAyMi4wMDAzIDE4LjA3MTRDMTkuODMwNiAxOC4wNzE0IDE4LjA3MTcgMTkuODMwMyAxOC4wNzE3IDIyQzE4LjA3MTcgMjQuMTY5NyAxOS44MzA2IDI1LjkyODYgMjIuMDAwMyAyNS45Mjg2WiIgZmlsbD0iIzlFOUU5RSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyIDExQzE1LjkyNDkgMTEgMTEgMTUuOTI0OSAxMSAyMkMxMSAyOC4wNzUxIDE1LjkyNDkgMzMgMjIgMzNDMjguMDc1MSAzMyAzMyAyOC4wNzUxIDMzIDIyQzMzIDE1LjkyNDkgMjguMDc1MSAxMSAyMiAxMVpNMTIuMDQ3NiAyMkMxMi4wNDc2IDE2LjUwMzUgMTYuNTAzNSAxMi4wNDc2IDIyIDEyLjA0NzZDMjcuNDk2NSAxMi4wNDc2IDMxLjk1MjQgMTYuNTAzNSAzMS45NTI0IDIyQzMxLjk1MjQgMjcuNDk2NSAyNy40OTY1IDMxLjk1MjQgMjIgMzEuOTUyNEMxNi41MDM1IDMxLjk1MjQgMTIuMDQ3NiAyNy40OTY1IDEyLjA0NzYgMjJaIiBmaWxsPSIjOUU5RTlFIi8+Cjwvc3ZnPgo=" loading="lazy" width={44} height={44} alt="" id="hero-decor" className="hero-decor-2" />
//           </div>
//         </div>
//       </section>
//       <CountdownStrip />
//       <figure id="portfolio-section" className="portfolio-section">
//         <div className="container">
//           <div className="portfolio-content">
//             <div className="portfolio-top">
//               <div className="portfolio-main">
//                 <h2 anim-trigger="" className="h2 h2-lg gsap-fade-up" style={{textTransform: "uppercase", textAlign: "left", whiteSpace: "nowrap"}}>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
//                       <div style={{position: "relative", display: "inline-block"}} className="">
// O                      </div>
//                       <div style={{position: "relative", display: "inline-block"}} className="">
// u                      </div>
//                       <div style={{position: "relative", display: "inline-block"}} className="">
// r                      </div>
//                     </div>
//                     <div style={{position: "relative", display: "block"}} className="">
//                       <div style={{position: "relative", display: "inline-block"}} className="">
// e                      </div>
//                       <div style={{position: "relative", display: "inline-block"}} className="">
// v                      </div>
//                       <div style={{position: "relative", display: "inline-block"}} className="">
// e                      </div>
//                       <div style={{position: "relative", display: "inline-block"}} className="">
// n                      </div>
//                       <div style={{position: "relative", display: "inline-block"}} className="">
// t                      </div>
//                       <div style={{position: "relative", display: "inline-block"}} className="">
// s                      </div>
//                     </div>
//                 </h2>
//               </div>
//               <a href="/events" className="portfolio-all w-inline-block">
//                 <div className="portfolio-info">
//                   <div className="portfolio-projects">
// All Events                  </div>
//                   <div portfolio-count="" className="portfolio-count">
// {EVENTS.length}                  </div>
//                 </div>
//                 <address className="portfolio-link portfolio-item-link--sm">
//                   <img width={23} height={23} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY0ODQgNC41MjE3M0MxMS4xMDU1IDQuNTIxNzMgMTAuNjY1NCA0Ljk2MTgzIDEwLjY2NTQgNS41MDQ3MlY3LjQ3MDY5QzEwLjY2NTQgOC4wMTM1OCAxMS4xMDU1IDguNDUzNjggMTEuNjQ4NCA4LjQ1MzY4SDEzLjEyMjlDMTMuNjY1OCA4LjQ1MzY4IDE0LjEwNTggOC44OTM3NyAxNC4xMDU4IDkuNDM2NjZWMTAuOTExMUMxNC4xMDU4IDExLjA1MDkgMTQuMTM1IDExLjE4MzkgMTQuMTg3NiAxMS4zMDQzSDUuNjUyMTZDNS4wMjc4NCAxMS4zMDQzIDQuNTIxNzMgMTEuODEwNSA0LjUyMTczIDEyLjQzNDhWMTMuNTY1MkM0LjUyMTczIDE0LjE4OTUgNS4wMjc4NCAxNC42OTU2IDUuNjUyMTYgMTQuNjk1NkgxMy44NTAzQzEzLjcwMzIgMTQuODY3NSAxMy42MTQ0IDE1LjA5MDcgMTMuNjE0NCAxNS4zMzQ2VjE2LjgwOTFDMTMuNjE0NCAxNy4zNTIgMTMuMTc0MyAxNy43OTIxIDEyLjYzMTQgMTcuNzkyMUgxMS4xNTY5QzEwLjYxNCAxNy43OTIxIDEwLjE3MzkgMTguMjMyMSAxMC4xNzM5IDE4Ljc3NVYyMC43NDFDMTAuMTczOSAyMS4yODM5IDEwLjYxNCAyMS43MjQgMTEuMTU2OSAyMS43MjRIMTMuMTIyOUMxMy42NjU4IDIxLjcyNCAxNC4xMDU4IDIxLjI4MzkgMTQuMTA1OCAyMC43NDFWMTkuMjY2NUMxNC4xMDU4IDE4LjcyMzYgMTQuNTQ1OSAxOC4yODM1IDE1LjA4ODggMTguMjgzNUgxNi41NjMzQzE3LjEwNjIgMTguMjgzNSAxNy41NDYzIDE3Ljg0MzQgMTcuNTQ2MyAxNy4zMDA2VjE2LjMxNzZDMTcuNTQ2MyAxNS43NzQ3IDE3Ljk4NjQgMTUuMzM0NiAxOC41MjkzIDE1LjMzNDZIMjAuNDk1M0MyMS4wMzgyIDE1LjMzNDYgMjEuNDc4MyAxNC44OTQ1IDIxLjQ3ODMgMTQuMzUxNlYxMi4zODU2QzIxLjQ3ODMgMTIuMTU2MiAyMS4zOTk2IDExLjk0NTEgMjEuMjY3OCAxMS43Nzc4QzIxLjA2MjggMTEuNDkxMiAyMC43MjcxIDExLjMwNDMgMjAuMzQ3OCAxMS4zMDQzSDE4LjU5MThDMTguMjYzOSAxMS4xNDUgMTguMDM3OCAxMC44MDg3IDE4LjAzNzggMTAuNDE5NlY4Ljk0NTE3QzE4LjAzNzggOC40MDIyOCAxNy41OTc3IDcuOTYyMTggMTcuMDU0OCA3Ljk2MjE4SDE1LjU4MDNDMTUuMDM3NCA3Ljk2MjE4IDE0LjU5NzMgNy41MjIwOCAxNC41OTczIDYuOTc5MlY1LjUwNDcyQzE0LjU5NzMgNC45NjE4MyAxNC4xNTcyIDQuNTIxNzMgMTMuNjE0NCA0LjUyMTczSDExLjY0ODRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" loading="lazy" className="portfolio-item-arrow item-arrow--hover-out" />
//                   <img width={23} height={23} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY0ODQgNC41MjE3M0MxMS4xMDU1IDQuNTIxNzMgMTAuNjY1NCA0Ljk2MTgzIDEwLjY2NTQgNS41MDQ3MlY3LjQ3MDY5QzEwLjY2NTQgOC4wMTM1OCAxMS4xMDU1IDguNDUzNjggMTEuNjQ4NCA4LjQ1MzY4SDEzLjEyMjlDMTMuNjY1OCA4LjQ1MzY4IDE0LjEwNTggOC44OTM3NyAxNC4xMDU4IDkuNDM2NjZWMTAuOTExMUMxNC4xMDU4IDExLjA1MDkgMTQuMTM1IDExLjE4MzkgMTQuMTg3NiAxMS4zMDQzSDUuNjUyMTZDNS4wMjc4NCAxMS4zMDQzIDQuNTIxNzMgMTEuODEwNSA0LjUyMTczIDEyLjQzNDhWMTMuNTY1MkM0LjUyMTczIDE0LjE4OTUgNS4wMjc4NCAxNC42OTU2IDUuNjUyMTYgMTQuNjk1NkgxMy44NTAzQzEzLjcwMzIgMTQuODY3NSAxMy42MTQ0IDE1LjA5MDcgMTMuNjE0NCAxNS4zMzQ2VjE2LjgwOTFDMTMuNjE0NCAxNy4zNTIgMTMuMTc0MyAxNy43OTIxIDEyLjYzMTQgMTcuNzkyMUgxMS4xNTY5QzEwLjYxNCAxNy43OTIxIDEwLjE3MzkgMTguMjMyMSAxMC4xNzM5IDE4Ljc3NVYyMC43NDFDMTAuMTczOSAyMS4yODM5IDEwLjYxNCAyMS43MjQgMTEuMTU2OSAyMS43MjRIMTMuMTIyOUMxMy42NjU4IDIxLjcyNCAxNC4xMDU4IDIxLjI4MzkgMTQuMTA1OCAyMC43NDFWMTkuMjY2NUMxNC4xMDU4IDE4LjcyMzYgMTQuNTQ1OSAxOC4yODM1IDE1LjA4ODggMTguMjgzNUgxNi41NjMzQzE3LjEwNjIgMTguMjgzNSAxNy41NDYzIDE3Ljg0MzQgMTcuNTQ2MyAxNy4zMDA2VjE2LjMxNzZDMTcuNTQ2MyAxNS43NzQ3IDE3Ljk4NjQgMTUuMzM0NiAxOC41MjkzIDE1LjMzNDZIMjAuNDk1M0MyMS4wMzgyIDE1LjMzNDYgMjEuNDc4MyAxNC44OTQ1IDIxLjQ3ODMgMTQuMzUxNlYxMi4zODU2QzIxLjQ3ODMgMTIuMTU2MiAyMS4zOTk2IDExLjk0NTEgMjEuMjY3OCAxMS43Nzc4QzIxLjA2MjggMTEuNDkxMiAyMC43MjcxIDExLjMwNDMgMjAuMzQ3OCAxMS4zMDQzSDE4LjU5MThDMTguMjYzOSAxMS4xNDUgMTguMDM3OCAxMC44MDg3IDE4LjAzNzggMTAuNDE5NlY4Ljk0NTE3QzE4LjAzNzggOC40MDIyOCAxNy41OTc3IDcuOTYyMTggMTcuMDU0OCA3Ljk2MjE4SDE1LjU4MDNDMTUuMDM3NCA3Ljk2MjE4IDE0LjU5NzMgNy41MjIwOCAxNC41OTczIDYuOTc5MlY1LjUwNDcyQzE0LjU5NzMgNC45NjE4MyAxNC4xNTcyIDQuNTIxNzMgMTMuNjE0NCA0LjUyMTczSDExLjY0ODRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" loading="lazy" className="portfolio-item-arrow item-arrow--hover-in" />
//                 </address>
//               </a>
//             </div>
//             <div className="portfolio-background">
//               <img src="/event%20bg.webp" loading="lazy" alt="" className="image-3" />
//             </div>
//             <div className="portfolio-illustration-mobile">
//               <img src="/event%20bg.webp" loading="lazy" alt="" className="portfolio-illustration-img-mob" />
//             </div>
//           </div>
//           <div className="portfolio-bottom">
//             <div className="portfolio-buttons">
//               <div portfolio-slider-prev="" className="portfolio-button" onClick={portfolioPrev} tabIndex={0} role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-dafc49337be281068" aria-disabled={portfolioSlide === 0}>
//                 <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjMyMDggMi45MTQyOUMxNC4zMjA4IDIuNDA5MzQgMTMuOTExNSAyIDEzLjQwNjUgMkgxMS41NzhDMTEuMDczIDIgMTAuNjYzNyAyLjQwOTM0IDEwLjY2MzcgMi45MTQyOVY0LjI4NTcxQzEwLjY2MzcgNC43OTA2NiAxMC4yNTQzIDUuMiA5Ljc0OTM4IDUuMkg4LjM3Nzk1QzcuODczMDEgNS4yIDcuNDYzNjcgNS42MDkzNCA3LjQ2MzY3IDYuMTE0MjlWNy40ODU3MUM3LjQ2MzY3IDcuOTkwNjYgNy4wNTQzMyA4LjQgNi41NDkzOCA4LjRINS4xNzc5NUM0LjY3MzAxIDguNCA0LjI2MzY3IDguODA5MzQgNC4yNjM2NyA5LjMxNDI5VjExLjE0MjlDNC4yNjM2NyAxMS42NDc4IDQuNjczMDEgMTIuMDU3MSA1LjE3Nzk1IDEyLjA1NzFINy4wMDY1M0M3LjUxMTQ3IDEyLjA1NzEgNy45MjA4MSAxMi40NjY1IDcuOTIwODEgMTIuOTcxNFYxMy44ODU3QzcuOTIwODEgMTQuMzkwNyA4LjMzMDE1IDE0LjggOC44MzUxIDE0LjhIMTAuMjA2NUMxMC43MTE1IDE0LjggMTEuMTIwOCAxNS4yMDkzIDExLjEyMDggMTUuNzE0M1YxNy4wODU3QzExLjEyMDggMTcuNTkwNyAxMS41MzAyIDE4IDEyLjAzNTEgMThIMTMuODYzN0MxNC4zNjg2IDE4IDE0Ljc3OCAxNy41OTA3IDE0Ljc3OCAxNy4wODU3VjE1LjI1NzFDMTQuNzc4IDE0Ljc1MjIgMTQuMzY4NiAxNC4zNDI5IDEzLjg2MzcgMTQuMzQyOUgxMi40OTIyQzExLjk4NzMgMTQuMzQyOSAxMS41NzggMTMuOTMzNSAxMS41NzggMTMuNDI4NlYxMi4wNTcxQzExLjU3OCAxMS41NTIyIDExLjE2ODYgMTEuMTQyOSAxMC42NjM3IDExLjE0MjlIOC44MzUxQzguMzMwMTUgMTEuMTQyOSA3LjkyMDgxIDEwLjczMzUgNy45MjA4MSAxMC4yMjg2VjkuNzcxNDNDNy45MjA4MSA5LjI2NjQ4IDguMzMwMTUgOC44NTcxNCA4LjgzNTEgOC44NTcxNEgxMC4yMDY1QzEwLjcxMTUgOC44NTcxNCAxMS4xMjA4IDguNDQ3OCAxMS4xMjA4IDcuOTQyODZWNi41NzE0M0MxMS4xMjA4IDYuMDY2NDggMTEuNTMwMiA1LjY1NzE0IDEyLjAzNTEgNS42NTcxNEgxMy40MDY1QzEzLjkxMTUgNS42NTcxNCAxNC4zMjA4IDUuMjQ3OCAxNC4zMjA4IDQuNzQyODZWMi45MTQyOVoiIGZpbGw9IiMwRTBFMEUiLz4KPC9zdmc+Cg==" loading="lazy" alt="" className="portfolio-button-image" />
//               </div>
//               <div portfolio-slider-next="" className="portfolio-button portfolio-button-next" onClick={portfolioNext} tabIndex={0} role="button" aria-label="Next slide" aria-controls="swiper-wrapper-dafc49337be281068" aria-disabled={portfolioSlide === SLIDE_COUNT - 1}>
//                 <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNjc5MTkgMi45MTQyOUM1LjY3OTE5IDIuNDA5MzQgNi4wODg1MyAyIDYuNTkzNDcgMkg4LjQyMjA1QzguOTI2OTkgMiA5LjMzNjMzIDIuNDA5MzQgOS4zMzYzMyAyLjkxNDI5VjQuMjg1NzFDOS4zMzYzMyA0Ljc5MDY2IDkuNzQ1NjcgNS4yIDEwLjI1MDYgNS4ySDExLjYyMkMxMi4xMjcgNS4yIDEyLjUzNjMgNS42MDkzNCAxMi41MzYzIDYuMTE0MjlWNy40ODU3MUMxMi41MzYzIDcuOTkwNjYgMTIuOTQ1NyA4LjQgMTMuNDUwNiA4LjRIMTQuODIyQzE1LjMyNyA4LjQgMTUuNzM2MyA4LjgwOTM0IDE1LjczNjMgOS4zMTQyOVYxMS4xNDI5QzE1LjczNjMgMTEuNjQ3OCAxNS4zMjcgMTIuMDU3MSAxNC44MjIgMTIuMDU3MUgxMi45OTM1QzEyLjQ4ODUgMTIuMDU3MSAxMi4wNzkyIDEyLjQ2NjUgMTIuMDc5MiAxMi45NzE0VjEzLjg4NTdDMTIuMDc5MiAxNC4zOTA3IDExLjY2OTggMTQuOCAxMS4xNjQ5IDE0LjhIOS43OTM0N0M5LjI4ODUzIDE0LjggOC44NzkxOSAxNS4yMDkzIDguODc5MTkgMTUuNzE0M1YxNy4wODU3QzguODc5MTkgMTcuNTkwNyA4LjQ2OTg1IDE4IDcuOTY0OSAxOEg2LjEzNjMzQzUuNjMxMzkgMTggNS4yMjIwNSAxNy41OTA3IDUuMjIyMDUgMTcuMDg1N1YxNS4yNTcxQzUuMjIyMDUgMTQuNzUyMiA1LjYzMTM5IDE0LjM0MjkgNi4xMzYzMyAxNC4zNDI5SDcuNTA3NzZDOC4wMTI3MSAxNC4zNDI5IDguNDIyMDUgMTMuOTMzNSA4LjQyMjA1IDEzLjQyODZWMTIuMDU3MUM4LjQyMjA1IDExLjU1MjIgOC44MzEzOSAxMS4xNDI5IDkuMzM2MzMgMTEuMTQyOUgxMS4xNjQ5QzExLjY2OTggMTEuMTQyOSAxMi4wNzkyIDEwLjczMzUgMTIuMDc5MiAxMC4yMjg2VjkuNzcxNDNDMTIuMDc5MiA5LjI2NjQ4IDExLjY2OTggOC44NTcxNCAxMS4xNjQ5IDguODU3MTRIOS43OTM0N0M5LjI4ODUzIDguODU3MTQgOC44NzkxOSA4LjQ0NzggOC44NzkxOSA3Ljk0Mjg2VjYuNTcxNDNDOC44NzkxOSA2LjA2NjQ4IDguNDY5ODUgNS42NTcxNCA3Ljk2NDkgNS42NTcxNEg2LjU5MzQ3QzYuMDg4NTMgNS42NTcxNCA1LjY3OTE5IDUuMjQ3OCA1LjY3OTE5IDQuNzQyODZWMi45MTQyOVoiIGZpbGw9IiMwRTBFMEUiLz4KPC9zdmc+Cg==" loading="lazy" alt="" className="portfolio-button-image" />
//               </div>
//             </div>
//             <div className="portfolio-slider">
// <div portfolio-slider-init="" className="swiper swiper-portfolio w-dyn-list swiper-initialized swiper-horizontal">
//                   <div ref={sliderRef} role="list" className="swiper-wrapper w-dyn-items" id="swiper-wrapper-dafc49337be281068" aria-live="off" style={{transitionDuration: "600ms", transform: `translate3d(-${portfolioSlide * step}px, 0px, 0px)`, transitionDelay: "0ms"}}>
// {EVENTS.map((event, i) => (
//                   <div role="group" className="swiper-slide portfolio-slide w-dyn-item" aria-label={`${i + 1} / ${EVENTS.length}`} key={event.slug} style={{ width: '424px', marginRight: '16px' }}>
//                     <Link portfolio-card="" href={`/events/${event.slug}`} className="portfolio-item w-inline-block">
//                       <div className="portfolio-item-top">
//                         <div className="portfolio-item-category">
//                           {event.category}
//                         </div>
//                         <div className="events-slide-title">{event.name}</div>
//                       </div>
//                       <div className="portfolio-item-bottom">
//                         <div className="portfolio-item-list">
//                           <div className="portfolio-item-info">
//                             <div className="portfolio-item-info-title">
//                               {EVENT_ENTRY_FEE}
//                             </div>
//                             <div className="portfolio-item-info-descr">
//                               Entry Fee
//                             </div>
//                           </div>
//                           <div className="portfolio-item-info">
//                             <div className="portfolio-item-info-title">
//                               {event.teamSize}
//                             </div>
//                             <div className="portfolio-item-info-descr">
//                               Team Size
//                             </div>
//                           </div>
//                           <div className="portfolio-item-info hide-in-tablet">
//                             <div className="portfolio-item-info-title">
//                               {event.category}
//                             </div>
//                             <div className="portfolio-item-info-descr">
//                               Type
//                             </div>
//                           </div>
//                           <div className="portfolio-item-info">
//                             <div className="portfolio-item-info-title">
//                               {event.date}
//                             </div>
//                             <div className="portfolio-item-info-descr">
//                               Date
//                             </div>
//                           </div>
//                         </div>
//                         <div className="portfolio-item-link-2 portfolio-item-link">
//                           <img width={23} height={23} alt="" src={ARROW_SVG} loading="lazy" className="portfolio-item-arrow item-arrow--hover-out" />
//                           <img width={23} height={23} alt="" src={ARROW_SVG} loading="lazy" className="portfolio-item-arrow item-arrow--hover-in" />
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}

//                 </div>
//                 <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </figure>
//       <section id="team-section" className="team-section">
//         <div className="w-layout-blockcontainer container w-container">
//           <div className="team-slider-row">
//             <div className="section-heading sh-grid-2-1-1">
//               <div className="section-title st-our-team">
//                 <h2 anim-trigger="" className="h2 h2-lg gsap-fade-up" style={{textAlign: "left"}}>
//                   <div style={{position: "relative", display: "inline-block"}} className="">
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// O                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// U                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// R                    </div>
//                   </div>
//                   <div style={{position: "relative", display: "block", marginTop: "0.25em", textAlign: "left"}} className="">
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// V                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// I                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// S                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// I                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// O                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// N                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// A                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// R                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// I                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// E                    </div>
//                     <div style={{position: "relative", display: "inline-block"}} className="">
// S                    </div>
//                   </div>
//                 </h2>
//               </div>
//               <div className="section-heading-descr shd-paddings-l hide-in-tablet">
//                 <div className="section-heading-descr-inner">
//                   <div className="section-descr-info">
//                     <div className="section-descr-info-decor"></div>
//                     <h3 className="section-descr-title gsap-fade-up">
// Built by Founders                      <br className="" />
// For Founders                    </h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="section-heading-controls">
//                 <div className="team-nav">
//                   <div id="hovered-container-orange-arrow" team-slider-prev="" className={teamSlide === 0 ? "team-nav-button swiper-button-disabled" : "team-nav-button"} tabIndex={teamSlide === 0 ? -1 : 0} role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-6897a10e55610441b7" aria-disabled={teamSlide === 0} onClick={teamPrev}>
//                     <div id="hovered-orange-arrow" className="team-nav-image w-embed">
//                       <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
//                         <path d="M14.3212 2.91429C14.3212 2.40934 13.9118 2 13.4069 2H11.5783C11.0734 2 10.664 2.40934 10.664 2.91429V4.28571C10.664 4.79066 10.2547 5.2 9.74975 5.2H8.37832C7.87337 5.2 7.46404 5.60934 7.46404 6.11429V7.48571C7.46404 7.99066 7.0547 8.4 6.54975 8.4H5.17832C4.67338 8.4 4.26404 8.80934 4.26404 9.31429V11.1429C4.26404 11.6478 4.67338 12.0571 5.17832 12.0571H7.00689C7.51184 12.0571 7.92118 12.4665 7.92118 12.9714V13.8857C7.92118 14.3907 8.33052 14.8 8.83546 14.8H10.2069C10.7118 14.8 11.1212 15.2093 11.1212 15.7143V17.0857C11.1212 17.5907 11.5305 18 12.0355 18H13.864C14.369 18 14.7783 17.5907 14.7783 17.0857V15.2571C14.7783 14.7522 14.369 14.3429 13.864 14.3429H12.4926C11.9877 14.3429 11.5783 13.9335 11.5783 13.4286V12.0571C11.5783 11.5522 11.169 11.1429 10.664 11.1429H8.83546C8.33052 11.1429 7.92118 10.7335 7.92118 10.2286V9.77143C7.92118 9.26648 8.33052 8.85714 8.83546 8.85714H10.2069C10.7118 8.85714 11.1212 8.4478 11.1212 7.94286V6.57143C11.1212 6.06648 11.5305 5.65714 12.0355 5.65714H13.4069C13.9118 5.65714 14.3212 5.2478 14.3212 4.74286V2.91429Z" fill="currentColor" className=""></path>
//                       </svg>
//                     </div>
//                   </div>
//                   <div id="hovered-container-orange-arrow" team-slider-next="" className={teamSlide === TEAM_SLIDE_COUNT - 1 ? "team-nav-button swiper-button-disabled" : "team-nav-button"} tabIndex={teamSlide === TEAM_SLIDE_COUNT - 1 ? -1 : 0} role="button" aria-label="Next slide" aria-controls="swiper-wrapper-6897a10e55610441b7" aria-disabled={teamSlide === TEAM_SLIDE_COUNT - 1} onClick={teamNext}> 
//                     <div id="hovered-orange-arrow" className="team-nav-image w-embed">
//                       <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
//                         <path d="M5.67882 2.91429C5.67882 2.40934 6.08816 2 6.59311 2H8.42168C8.92663 2 9.33597 2.40934 9.33597 2.91429V4.28571C9.33597 4.79066 9.7453 5.2 10.2503 5.2H11.6217C12.1266 5.2 12.536 5.60934 12.536 6.11429V7.48571C12.536 7.99066 12.9453 8.4 13.4503 8.4H14.8217C15.3266 8.4 15.736 8.80934 15.736 9.31429V11.1429C15.736 11.6478 15.3266 12.0571 14.8217 12.0571H12.9931C12.4882 12.0571 12.0788 12.4665 12.0788 12.9714V13.8857C12.0788 14.3907 11.6695 14.8 11.1645 14.8H9.79311C9.28816 14.8 8.87882 15.2093 8.87882 15.7143V17.0857C8.87882 17.5907 8.46948 18 7.96454 18H6.13597C5.63102 18 5.22168 17.5907 5.22168 17.0857V15.2571C5.22168 14.7522 5.63102 14.3429 6.13597 14.3429H7.50739C8.01234 14.3429 8.42168 13.9335 8.42168 13.4286V12.0571C8.42168 11.5522 8.83102 11.1429 9.33597 11.1429H11.1645C11.6695 11.1429 12.0788 10.7335 12.0788 10.2286V9.77143C12.0788 9.26648 11.6695 8.85714 11.1645 8.85714H9.79311C9.28816 8.85714 8.87882 8.4478 8.87882 7.94286V6.57143C8.87882 6.06648 8.46948 5.65714 7.96454 5.65714H6.59311C6.08816 5.65714 5.67882 5.2478 5.67882 4.74286V2.91429Z" fill="currentColor" className=""></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="team-graphic">
//                 <div className="graphic-block graphic-block-alt">
//                   <div className="graphic-block-decor graphic-block-decor-top-left"></div>
//                   <div className="graphic-block-decor graphic-block-decor-top-right"></div>
//                   <div className="graphic-block-decor graphic-block-decor-bottom-right"></div>
//                   <div className="graphic-block-decor graphic-block-decor-bottom-left"></div>
//                   <img src="data:image/webp;base64,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" loading="lazy" width={364} height={364} alt="" className="graphic-block-image" />
//                   <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MyIgaGVpZ2h0PSI0MyIgZmlsbD0iI0Y2RjZGNiIvPgo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjQzIiBoZWlnaHQ9IjQzIiBzdHJva2U9IiNGNkY2RjYiLz4KPHBhdGggZD0iTTIyLjAwMDMgMjUuOTI4NkMyNC4xNjk5IDI1LjkyODYgMjUuOTI4OCAyNC4xNjk3IDI1LjkyODggMjJDMjUuOTI4OCAxOS44MzAzIDI0LjE2OTkgMTguMDcxNCAyMi4wMDAzIDE4LjA3MTRDMTkuODMwNiAxOC4wNzE0IDE4LjA3MTcgMTkuODMwMyAxOC4wNzE3IDIyQzE4LjA3MTcgMjQuMTY5NyAxOS44MzA2IDI1LjkyODYgMjIuMDAwMyAyNS45Mjg2WiIgZmlsbD0iIzlFOUU5RSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyIDExQzE1LjkyNDkgMTEgMTEgMTUuOTI0OSAxMSAyMkMxMSAyOC4wNzUxIDE1LjkyNDkgMzMgMjIgMzNDMjguMDc1MSAzMyAzMyAyOC4wNzUxIDMzIDIyQzMzIDE1LjkyNDkgMjguMDc1MSAxMSAyMiAxMVpNMTIuMDQ3NiAyMkMxMi4wNDc2IDE2LjUwMzUgMTYuNTAzNSAxMi4wNDc2IDIyIDEyLjA0NzZDMjcuNDk2NSAxMi4wNDc2IDMxLjk1MjQgMTYuNTAzNSAzMS45NTI0IDIyQzMxLjk1MjQgMjcuNDk2NSAyNy40OTY1IDMxLjk1MjQgMjIgMzEuOTUyNEMxNi41MDM1IDMxLjk1MjQgMTIuMDQ3NiAyNy40OTY1IDEyLjA0NzYgMjJaIiBmaWxsPSIjOUU5RTlFIi8+Cjwvc3ZnPgo=" loading="lazy" alt="" className="team-info-decor" />
//                 </div>
//               </div>
//             </div>
//             <div className="team-slider-row-inner team">
//               <div team-slider-init="" className="swiper team-slider swiper-initialized swiper-horizontal swiper-backface-hidden">
//                 <div className="swiper-wrapper" id="swiper-wrapper-6897a10e55610441b7" aria-live="polite" style={{transitionDuration: "600ms", transform: `translate3d(-${teamSlide * TEAM_SLIDE_STEP}px, 0px, 0px)`, transitionDelay: "0ms"}}>

//                   <div className="swiper-slide team-slide swiper-slide-active" role="group" aria-label="1 / 8" style={{width: "291.765px"}}>
//                     <div team-card="" className="team-card gsap-fade-up">
//                       <div className="team-card-head">
//                         <h3 className="team-member-name">
// Dr. N. Sesha Reddy      </h3>
//                         <div className="team-member-pos">
// Chairman                </div>
//                       </div>
//                       <div className="team-card-body">
//                         <div className="team-member-photo">
//                           <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
//                         </div>
//                       </div>
//                       <div className="team-card-footer">
                        
//                         <div className="team-card-decor"></div>
//                         <div className="team-card-decor tcd-right"></div>
//                       </div>
                      
//                     </div>
//                   </div>

//                   <div className="swiper-slide team-slide swiper-slide-next" role="group" aria-label="2 / 8" style={{width: "291.765px"}}>
//                     <div team-card="" className="team-card gsap-fade-up">
//                       <div className="team-card-head">
//                         <h3 className="team-member-name">
// Dr. N. Suguna Reddy     </h3>
//                         <div className="team-member-pos">
// Secretary               </div>
//                       </div>
//                       <div className="team-card-body">
//                         <div className="team-member-photo">
//                           <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
//                         </div>
//                       </div>
//                       <div className="team-card-footer">
                        
//                         <div className="team-card-decor"></div>
//                         <div className="team-card-decor tcd-right"></div>
//                       </div>
                      
//                     </div>
//                   </div>

//                   <div className="swiper-slide team-slide" role="group" aria-label="3 / 8" style={{width: "291.765px"}}>
//                     <div team-card="" className="team-card gsap-fade-up">
//                       <div className="team-card-head">
//                         <h3 className="team-member-name">
// Dr. B.E.V.L. Naidu      </h3>
//                         <div className="team-member-pos">
// Academic Director       </div>
//                       </div>
//                       <div className="team-card-body">
//                         <div className="team-member-photo">
//                           <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
//                         </div>
//                       </div>
//                       <div className="team-card-footer">
                        
//                         <div className="team-card-decor"></div>
//                         <div className="team-card-decor tcd-right"></div>
//                       </div>
                      
//                     </div>
//                   </div>

//                   <div className="swiper-slide team-slide" role="group" aria-label="4 / 8" style={{width: "291.765px"}}>
//                     <div team-card="" className="team-card gsap-fade-up">
//                       <div className="team-card-head">
//                         <h3 className="team-member-name">
// U. Siddarth Reddy       </h3>
//                         <div className="team-member-pos">
// Dean of AI              </div>
//                       </div>
//                       <div className="team-card-body">
//                         <div className="team-member-photo">
//                           <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
//                         </div>
//                       </div>
//                       <div className="team-card-footer">
                        
//                         <div className="team-card-decor"></div>
//                         <div className="team-card-decor tcd-right"></div>
//                       </div>
                      
//                     </div>
//                   </div>

//                   <div className="swiper-slide team-slide" role="group" aria-label="5 / 8" style={{width: "291.765px"}}>
//                     <div team-card="" className="team-card gsap-fade-up">
//                       <div className="team-card-head">
//                         <h3 className="team-member-name">
// M. Satya Prakash        </h3>
//                         <div className="team-member-pos">
// Principal (Co-Ed)       </div>
//                       </div>
//                       <div className="team-card-body">
//                         <div className="team-member-photo">
//                           <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
//                         </div>
//                       </div>
//                       <div className="team-card-footer">
                        
//                         <div className="team-card-decor"></div>
//                         <div className="team-card-decor tcd-right"></div>
//                       </div>
                      
//                     </div>
//                   </div>

//                   <div className="swiper-slide team-slide" role="group" aria-label="6 / 8" style={{width: "291.765px"}}>
//                     <div team-card="" className="team-card gsap-fade-up">
//                       <div className="team-card-head">
//                         <h3 className="team-member-name">
// P. Pradeep              </h3>
//                         <div className="team-member-pos">
// Principal (Women's)     </div>
//                       </div>
//                       <div className="team-card-body">
//                         <div className="team-member-photo">
//                           <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
//                         </div>
//                       </div>
//                       <div className="team-card-footer">
                        
//                         <div className="team-card-decor"></div>
//                         <div className="team-card-decor tcd-right"></div>
//                       </div>
                      
//                     </div>
//                   </div>

//                   <div className="swiper-slide team-slide" role="group" aria-label="7 / 8" style={{width: "291.765px"}}>
//                     <div team-card="" className="team-card gsap-fade-up">
//                       <div className="team-card-head">
//                         <h3 className="team-member-name">
// R.V.R. Patrudu          </h3>
//                         <div className="team-member-pos">
// Vice-Principal (Co-Ed)  </div>
//                       </div>
//                       <div className="team-card-body">
//                         <div className="team-member-photo">
//                           <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
//                         </div>
//                       </div>
//                       <div className="team-card-footer">
                        
//                         <div className="team-card-decor"></div>
//                         <div className="team-card-decor tcd-right"></div>
//                       </div>
                      
//                     </div>
//                   </div>

//                   <div className="swiper-slide team-slide" role="group" aria-label="8 / 8" style={{width: "291.765px"}}>
//                     <div team-card="" className="team-card gsap-fade-up">
//                       <div className="team-card-head">
//                         <h3 className="team-member-name">
// T. Sai Ratnam           </h3>
//                         <div className="team-member-pos">
// HOD of AI               </div>
//                       </div>
//                       <div className="team-card-body">
//                         <div className="team-member-photo">
//                           <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
//                         </div>
//                       </div>
//                       <div className="team-card-footer">
                        
//                         <div className="team-card-decor"></div>
//                         <div className="team-card-decor tcd-right"></div>
//                       </div>
                      
//                     </div>
//                   </div>

//                 </div>
// <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="team-custome-code w-embed w-script"></div>
//       </section>
//       <section className="footer footer-with-blog">
//         <div className="w-layout-blockcontainer container w-container">
//           <div className="footer-inner">
//             <div className="footer-top-row">
//               <div className="footer-logo-col">
//                 <Link href="/" aria-current="page" className="footer-logo w-inline-block">
//                   <img width={101} height={34} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxIiBoZWlnaHQ9IjM0IiB2aWV3Qm94PSIwIDAgMTAxIDM0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMzEuOTE3MyA2LjA3OTEyQzMyLjkxNDIgNy4wNzg5NyAzMy4wMzM5IDcuMzU4OTQgMzMuMDMzOSA4Ljc5ODczVjEzLjEzNTZDMzMuMDMzOSAxNC41NzU0IDMyLjg3NDMgMTQuNzM1NCAzMS40Mzg3IDE0LjczNTRIMjkuODQzNkMyOC40MDggMTQuNzM1NCAyOC4yNDg1IDE0LjU3NTQgMjguMjQ4NSAxMy4xMzU2VjUuNDc0OTFDMjguMjQ4NSA1LjA5NDgyIDI3Ljk0MSA0Ljc4OTc0IDI3LjU2MDkgNC43ODk3NEwyMC44Mjg0IDQuNzg5NzRDMjAuNjg0MyA0Ljc5NzMxIDIwLjUyMTUgNC43OTk5MyAyMC4zMzggNC43OTk5M0g1Ljg2NTY1QzUuNDg1NTcgNC43OTk5MyA1LjE4NDE5IDUuMTA1NTEgNS4xODQxOSA1LjQ4NTZWMjcuNTQ3MkM1LjE4NDE5IDI3LjkyNzIgNS40OTIzMSAyOC4yMzQ3IDUuODcyMzkgMjguMjM0N0gyMC4zMzhDMjAuNTA0OCAyOC4yMzQ3IDIwLjY1NDQgMjguMjM2OSAyMC43ODg1IDI4LjI0M0gyNy41NjA5QzI3Ljk0MSAyOC4yNDMgMjguMjQ4NSAyNy45MzY4IDI4LjI0ODUgMjcuNTU2N1YyMS44ODQ4QzI4LjI0ODUgMjAuNDQ1IDI4LjQwOCAyMC4yODUxIDI5Ljg0MzYgMjAuMjg1MUgzMS40Mzg3QzMyLjg3NDMgMjAuMjg1MSAzMy4wMzM5IDIwLjQ0NSAzMy4wMzM5IDIxLjg4NDhWMjQuMjM0QzMzLjAzMzkgMjUuNjczOCAzMi45MTQyIDI1Ljk1MzcgMzEuOTE3MyAyNi45NTM2TDI2Ljk3MjQgMzEuOTEyOUMyNS45NzU0IDMyLjkxMjcgMjUuNjk2MiAzMy4wMzI3IDI0LjI2MDYgMzMuMDMyN0gyMC41NDMzQzIwLjQ3NzkgMzMuMDMzNiAyMC40MDk1IDMzLjAzNCAyMC4zMzggMzMuMDM0SDguNzczMjRDNy4zMzc2MiAzMy4wMzQgNy4wNTg0NyAzMi45MTQxIDYuMDYxNTEgMzEuOTE0MkwxLjExNjU5IDI2Ljk1NDlDMC4xMTk2MzUgMjUuOTU1MSAwIDI1LjY3NTEgMCAyNC4yMzUzVjguNzk5MzVDMCA3LjM1OTU2IDAuMTE5NjM1IDcuMDc5NiAxLjExNjU5IDYuMDc5NzRMNi4wNjE1MSAxLjEyMDQ2QzcuMDU4NDcgMC4xMjA2MDUgNy4zMzc2MiAwLjAwMDYyMTc5NiA4Ljc3MzI0IDAuMDAwNjIxNzk2SDEwLjUxNjhDMTAuNTYzNSAwLjAwMDE5MTc3MiAxMC42MTE3IDAgMTAuNjYxNCAwSDI0LjI2MDZDMjUuNjk2MiAwIDI1Ljk3NTQgMC4xMTk5ODQgMjYuOTcyNCAxLjExOTg0TDMxLjkxNzMgNi4wNzkxMloiIGZpbGw9IiMwRTBFMEUiLz4KPHBhdGggZD0iTTQ2LjQ3OCAxMS4xODc1QzQ0LjUwMDUgMTEuMTg3NSA0MyA5Ljg2MTI4IDQzIDcuMzM0NTVWNi41NTcwOUM0MyA0LjAzMDM1IDQ0LjUwMDUgMi43MDQxIDQ2LjQ3OCAyLjcwNDFINDcuNDMxOEM0OC44MzkzIDIuNzA0MSA1MC4xODg2IDMuNjMwMTkgNTAuNTQ5MiA1LjMzMzc0SDQ5LjQzMjVDNDkuMTUzMyA0LjM3MzM1IDQ4LjMwNDIgMy42ODczNiA0Ni45NTQ5IDMuNjg3MzZDNDQuNzQ0OCAzLjY4NzM2IDQ0LjA0NjkgNS4wODIyMSA0NC4wNDY5IDYuNjQ4NTVWNy4yNDMwOEM0NC4wNDY5IDguODA5NDMgNDQuNzQ0OCAxMC4xNyA0Ni45NTQ5IDEwLjE3QzQ4LjQyMDUgMTAuMTcgNDkuMjY5NyA5LjM5MjUyIDQ5LjUwMjMgOC4zNDA2N0g1MC41ODQxQzUwLjMwNDkgMTAuMjE1NyA0OC45MjA3IDExLjE4NzUgNDcuNDMxOCAxMS4xODc1SDQ2LjQ3OFoiIGZpbGw9IiMwRTBFMEUiLz4KPHBhdGggZD0iTTUyLjkxNjggNi4zMTY5OUM1My4zMzU1IDUuNzMzOSA1NC4xMzgxIDUuMzMzNzQgNTQuODEyOCA1LjMzMzc0QzU1Ljc3ODIgNS4zMzM3NCA1Ni45MTgyIDUuODkzOTYgNTYuOTE4MiA3LjU5NzUxVjExLjAwNDZINTUuODcxM1Y3Ljc4MDQ0QzU1Ljg3MTMgNi43NTE0NSA1NS40NTI1IDYuMzE2OTkgNTQuNDc1NSA2LjMxNjk5QzUzLjg5MzkgNi4zMTY5OSA1Mi45MTY4IDYuNzI4NTkgNTIuOTE2OCA4LjEzNDg3VjExLjAwNDZINTEuODY5OVYyLjcwNDFINTIuOTE2OFY2LjMxNjk5WiIgZmlsbD0iIzBFMEUwRSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTYzLjQ3ODUgOS41OTgzMlY3LjU5NzUxQzYzLjQ3ODUgNS44OTM5NiA2Mi41ODI4IDUuMzMzNzQgNjEuNTQ3NiA1LjMzMzc0SDYwLjQwNzZDNTkuMjY3NyA1LjMzMzc0IDU4LjQ2NTEgNi4xNjgzNiA1OC40NjUxIDcuMDAyOThINTkuNTExOUM1OS41MTE5IDYuNjM3MTIgNTkuOTMwNyA2LjMxNjk5IDYwLjUxMjMgNi4zMTY5OUg2MS4yMTAyQzYyLjI0NTUgNi4zMTY5OSA2Mi40MDgzIDYuNzYyODkgNjIuNDMxNiA3LjUyODkxSDYwLjUzNTZDNTkuMTc0NiA3LjUyODkxIDU4LjMxMzkgOC4yMzc3NyA1OC4zMTM5IDkuMjQzODlWOS4zNjk2NkM1OC4zMTM5IDEwLjc2NDUgNTkuNDUzOCAxMS4xNzYxIDYwLjUzNTYgMTEuMTc2MUM2MS4yNTY4IDExLjE3NjEgNjIuMTI5MiAxMS4wMDQ2IDYyLjUyNDcgMTAuNDEwMUM2Mi43NTczIDEwLjk5MzIgNjMuMzk3IDExLjAwNDYgNjMuOTMyMSAxMS4wMDQ2VjEwLjAyMTNDNjMuNzIyNyAxMC4wMjEzIDYzLjQ3ODUgOS45NTI3NSA2My40Nzg1IDkuNTk4MzJaTTYwLjg3MjkgMTAuMTkyOEM1OS43Nzk1IDEwLjE5MjggNTkuMzYwNyA5Ljk2NDE4IDU5LjM2MDcgOS4zMjM5MkM1OS4zNjA3IDguOTU4MDYgNTkuNTcwMSA4LjM5NzgzIDYwLjg3MjkgOC4zOTc4M0g2Mi40MzE2VjkuMzAxMDZDNjIuNDMxNiAxMC4wMzI4IDYxLjMzODIgMTAuMTkyOCA2MC44NzI5IDEwLjE5MjhaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik02Ni40ODI0IDMuNDAxNTNDNjYuNDgyNCAzLjc3ODgyIDY2LjE2ODMgNC4wNzYwOSA2NS43ODQ0IDQuMDc2MDlDNjUuNDAwNiA0LjA3NjA5IDY1LjA4NjUgMy43Nzg4MiA2NS4wODY1IDMuNDAxNTNDNjUuMDg2NSAzLjAyNDIzIDY1LjQwMDYgMi43MDQxIDY1Ljc4NDQgMi43MDQxQzY2LjE2ODMgMi43MDQxIDY2LjQ4MjQgMy4wMjQyMyA2Ni40ODI0IDMuNDAxNTNaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik02Ni4zMDc5IDUuNTE2NjdWMTEuMDA0Nkg2NS4yNjFWNS41MTY2N0g2Ni4zMDc5WiIgZmlsbD0iIzBFMEUwRSIvPgo8cGF0aCBkPSJNNzEuMDQ1NCA1LjMzMzc0QzcwLjMzNTggNS4zMzM3NCA2OS40NzUxIDUuNzc5NjMgNjkuMDc5NiA2LjQxOTg5VjUuNTE2NjdINjguMTAyNVYxMS4wMDQ2SDY5LjE0OTRWOC4xMzQ4N0M2OS4xNDk0IDYuNzI4NTkgNzAuMTI2NSA2LjMxNjk5IDcwLjcwODEgNi4zMTY5OUM3MS42ODUyIDYuMzE2OTkgNzIuMTAzOSA2Ljc1MTQ1IDcyLjEwMzkgNy43ODA0NFYxMS4wMDQ2SDczLjE1MDhWNy41OTc1MUM3My4xNTA4IDUuODkzOTYgNzIuMDEwOCA1LjMzMzc0IDcxLjA0NTQgNS4zMzM3NFoiIGZpbGw9IiMwRTBFMEUiLz4KPHBhdGggZD0iTTc4LjUxMyA2Ljg0MjkySDgyLjMzOTlDODIuNTU3NSA4LjE5MDE4IDgyLjAyNTggOS40ODM5OSA4MS40MjEgMTAuMTU4NUM4MC44MTYxIDEwLjgzMzEgNzkuOTMyMSAxMS4xODc1IDc4LjkyMDEgMTEuMTg3NUg3Ny45NjYzQzc1Ljk4ODggMTEuMTg3NSA3NC40ODgzIDkuODYxMjggNzQuNDg4MyA3LjMzNDU1VjYuNTU3MDlDNzQuNDg4MyA0LjAzMDM1IDc1Ljk4ODggMi43MDQxIDc3Ljk2NjMgMi43MDQxSDc4LjkyMDFDODAuNTYwMiAyLjcwNDEgODEuODA0OCAzLjY1MzA2IDgyLjIxMiA1LjM3OTQ3SDgxLjEwNjlDODAuNzY5NiA0LjM5NjIxIDgwLjAyNTEgMy42ODczNiA3OC40NDMyIDMuNjg3MzZDNzYuMjMzMSAzLjY4NzM2IDc1LjUzNTIgNS4wODIyMSA3NS41MzUyIDYuNjQ4NTVWNy4yNDMwOEM3NS41MzUyIDguODA5NDMgNzYuMjMzMSAxMC4xNyA3OC40NDMyIDEwLjE3QzgwLjM2MjUgMTAuMTcgODEuMDk1MyA5LjE0MDk5IDgxLjI1ODEgNy44NDkwNFY3LjgyNjE3SDc4LjUxM1Y2Ljg0MjkyWiIgZmlsbD0iIzBFMEUwRSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTg3LjgwMzcgMi44ODcwM0g4NC4wMTE2VjExLjAwNDZIODUuMDU4NVY4LjAyMDU0SDg3LjgwMzdDODkuMTE4MSA4LjAyMDU0IDkwLjQzMjUgNy40NjAzMSA5MC40MzI1IDUuNDU5NUM5MC40MzI1IDMuNTYxNTkgODkuMTE4MSAyLjg4NzAzIDg3LjgwMzcgMi44ODcwM1pNODcuNTgyNyA3LjAzNzI4SDg1LjA1ODVWMy44ODE3Mkg4Ny41ODI3Qzg4LjkwODcgMy44ODE3MiA4OS4zMjc1IDQuNTQ0ODUgODkuMzI3NSA1LjQ1OTVDODkuMzI3NSA2LjM3NDE2IDg4LjkwODcgNy4wMzcyOCA4Ny41ODI3IDcuMDM3MjhaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik05MC44OTYzIDIuODg3MDNIOTcuMjk0VjMuODcwMjlIOTQuNjE4NlYxMS4wMDQ2SDkzLjU3MTdWMy44NzAyOUg5MC44OTYzVjIuODg3MDNaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik05LjgzMzg2IDE2LjU4MUM5LjgzMzg2IDE1LjMxMDkgMTAuODYzNSAxNC4yODEyIDEyLjEzMzYgMTQuMjgxMkMxMy40MDM3IDE0LjI4MTIgMTQuNDMzMyAxNS4zMTA5IDE0LjQzMzMgMTYuNTgxQzE0LjQzMzMgMTcuODUxMSAxMy40MDM3IDE4Ljg4MDcgMTIuMTMzNiAxOC44ODA3QzEwLjg2MzUgMTguODgwNyA5LjgzMzg2IDE3Ljg1MTEgOS44MzM4NiAxNi41ODFaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik0yMS44Mjg4IDE0LjI4MTJDMjAuNTU4NyAxNC4yODEyIDE5LjUyOTEgMTUuMzEwOSAxOS41MjkxIDE2LjU4MUMxOS41MjkxIDE3Ljg1MTEgMjAuNTU4NyAxOC44ODA3IDIxLjgyODggMTguODgwN0MyMy4wOTg5IDE4Ljg4MDcgMjQuMTI4NSAxNy44NTExIDI0LjEyODUgMTYuNTgxQzI0LjEyODUgMTUuMzEwOSAyMy4wOTg5IDE0LjI4MTIgMjEuODI4OCAxNC4yODEyWiIgZmlsbD0iIzBFMEUwRSIvPgo8cGF0aCBkPSJNODkuMDU1OSAyNi4xODYxQzg4LjMwNiAyNi4xODYxIDg4LjIyMjcgMjYuMTAyOCA4OC4yMjI3IDI1LjM1MjhWMjIuMjI4MkM4OC4yMjI3IDIxLjE0NSA4OC44MDYgMjAuNTYxNyA4OS44ODkyIDIwLjU2MTdIOTAuMDk3NUM5MC44NDc0IDIwLjU2MTcgOTAuOTMwNyAyMC40Nzg0IDkwLjkzMDcgMTkuNzI4NUM5MC45MzA3IDE4LjY0NTMgOTEuNTE0IDE4LjA2MiA5Mi41OTcyIDE4LjA2Mkg5OS44ODhDMTAwLjYzOCAxOC4wNjIgMTAwLjcyMSAxOC4xNDUzIDEwMC43MjEgMTguODk1M1YxOS43Mjg1QzEwMC43MjEgMjAuNDc4NCAxMDAuNjM4IDIwLjU2MTcgOTkuODg4IDIwLjU2MTdIOTEuNzY0QzkxLjAxNDEgMjAuNTYxNyA5MC45MzA3IDIwLjY0NTEgOTAuOTMwNyAyMS4zOTVWMjUuMzUyOEM5MC45MzA3IDI2LjEwMjggOTAuODQ3NCAyNi4xODYxIDkwLjA5NzUgMjYuMTg2MUg4OS4wNTU5WiIgZmlsbD0iIzBFMEUwRSIvPgo8cGF0aCBkPSJNODcuNTk3OCAzMS44MTA0VjMwLjk3NzJDODcuNTk3OCAzMC4yMjczIDg3LjY4MTEgMzAuMTQ0IDg4LjQzMSAzMC4xNDRIOTYuNTU1MUM5Ny4zMDUgMzAuMTQ0IDk3LjM4ODMgMzAuMDYwNiA5Ny4zODgzIDI5LjMxMDdWMjUuMzUyOEM5Ny4zODgzIDI0LjYwMjkgOTcuNDcxNiAyNC41MTk2IDk4LjIyMTYgMjQuNTE5Nkg5OS4yNjMxQzEwMC4wMTMgMjQuNTE5NiAxMDAuMDk2IDI0LjYwMjkgMTAwLjA5NiAyNS4zNTI4VjI4LjQ3NzVDMTAwLjA5NiAyOS41NjA3IDk5LjUxMzEgMzAuMTQ0IDk4LjQyOTkgMzAuMTQ0SDk4LjIyMTZDOTcuNDcxNiAzMC4xNDQgOTcuMzg4MyAzMC4yMjczIDk3LjM4ODMgMzAuOTc3MkM5Ny4zODgzIDMyLjA2MDQgOTYuODA1MSAzMi42NDM3IDk1LjcyMTggMzIuNjQzN0g4OC40MzFDODcuNjgxMSAzMi42NDM3IDg3LjU5NzggMzIuNTYwNCA4Ny41OTc4IDMxLjgxMDRaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik03My4wMTcgMzEuODEwNEM3My4wMTcgMzIuNTYwNCA3My4xMDAzIDMyLjY0MzcgNzMuODUwMiAzMi42NDM3SDgwLjMwNzhDODEuMDU3NyAzMi42NDM3IDgxLjIwMzUgMzIuNTgxMiA4MS43MjQzIDMyLjA2MDRMODQuMzA3MyAyOS40Nzc0Qzg0LjgyODEgMjguOTU2NiA4NC44OTA2IDI4LjgxMDggODQuODkwNiAyOC4wNjA5VjI3LjMzMThDODQuODkwNiAyNi41ODE5IDg0LjgwNzMgMjYuNDk4NiA4NC4wNTc0IDI2LjQ5ODZIODMuMDE1OEM4Mi4yNjU5IDI2LjQ5ODYgODIuMTgyNiAyNi40MTUyIDgyLjE4MjYgMjUuNjY1M1YyNC44MzIxQzgyLjE4MjYgMjQuMDgyMiA4Mi4yNjU5IDIzLjk5ODggODMuMDE1OCAyMy45OTg4SDg0LjA1NzRDODQuODA3MyAyMy45OTg4IDg0Ljg5MDYgMjMuOTE1NSA4NC44OTA2IDIzLjE2NTZWMjAuNzdDODQuODkwNiAxOC45MTYxIDg0LjAzNjUgMTguMDYyIDgyLjE4MjYgMTguMDYySDczLjg1MDJDNzMuMTAwMyAxOC4wNjIgNzMuMDE3IDE4LjE0NTMgNzMuMDE3IDE4Ljg5NTNWMTkuNzI4NUM3My4wMTcgMjAuNDc4NCA3My4xMDAzIDIwLjU2MTcgNzMuODUwMiAyMC41NjE3SDgxLjM0OTNDODIuMDk5MyAyMC41NjE3IDgyLjE4MjYgMjAuNjQ1MSA4Mi4xODI2IDIxLjM5NVYyMy4xNjU2QzgyLjE4MjYgMjMuOTE1NSA4Mi4wOTkzIDIzLjk5ODggODEuMzQ5MyAyMy45OTg4SDc0LjA1ODVDNzMuMzA4NiAyMy45OTg4IDczLjIyNTMgMjQuMDgyMiA3My4yMjUzIDI0LjgzMjFWMjUuNjY1M0M3My4yMjUzIDI2LjQxNTIgNzMuMzA4NiAyNi40OTg2IDc0LjA1ODUgMjYuNDk4Nkg4MS4zNDkzQzgyLjA5OTMgMjYuNDk4NiA4Mi4xODI2IDI2LjU4MTkgODIuMTgyNiAyNy4zMzE4VjI5LjMxMDdDODIuMTgyNiAzMC4wNjA2IDgyLjA5OTMgMzAuMTQ0IDgxLjM0OTMgMzAuMTQ0SDczLjg1MDJDNzMuMTAwMyAzMC4xNDQgNzMuMDE3IDMwLjIyNzMgNzMuMDE3IDMwLjk3NzJWMzEuODEwNFoiIGZpbGw9IiMwRTBFMEUiLz4KPHBhdGggZD0iTTU3LjYwNjkgMzIuNjQzN0M1Ni44NTcgMzIuNjQzNyA1Ni43NzM3IDMyLjU2MDQgNTYuNzczNyAzMS44MTA0VjMwLjk3NzJDNTYuNzczNyAzMC4yMjczIDU2Ljc5NDUgMzAuMDYwNiA1Ny4wMjM3IDI5LjM1MjRMNTkuNDQgMjEuMzUzM0M1OS42NjkyIDIwLjY0NTEgNTkuNzczMyAyMC41NjE3IDYwLjUyMzMgMjAuNTYxN0g2MS41NjQ4QzYyLjMxNDcgMjAuNTYxNyA2Mi4zOTggMjAuNDc4NCA2Mi4zOTggMTkuNzI4NVYxOC44OTUzQzYyLjM5OCAxOC4xNDUzIDYyLjQ4MTQgMTguMDYyIDYzLjIzMTMgMTguMDYySDY1LjE0NzdDNjYuMjMwOSAxOC4wNjIgNjYuOTgwOSAxOC42MjQ0IDY3LjI5MzMgMTkuNjQ1Mkw3MC4yNzIxIDI5LjM1MjRDNzAuNTAxMyAzMC4wNjA2IDcwLjUyMjEgMzAuMjI3MyA3MC41MjIxIDMwLjk3NzJWMzEuODEwNEM3MC41MjIxIDMyLjU2MDQgNzAuNDM4OCAzMi42NDM3IDY5LjY4ODkgMzIuNjQzN0g2OC42NDczQzY3Ljg5NzQgMzIuNjQzNyA2Ny44MTQxIDMyLjU2MDQgNjcuODE0MSAzMS44MTA0VjMwLjk3NzJDNjcuODE0MSAzMC4yMjczIDY3Ljc5MzMgMzAuMDYwNiA2Ny41NjQxIDI5LjM1MjRMNjUuMTQ3NyAyMS4zNTMzQzY0LjkxODYgMjAuNjQ1MSA2NC44MTQ0IDIwLjU2MTcgNjQuMDY0NSAyMC41NjE3SDYzLjIzMTNDNjIuNDgxNCAyMC41NjE3IDYyLjM3NzIgMjAuNjQ1MSA2Mi4xNDgxIDIxLjM1MzNMNTkuNzMxNyAyOS4zNTI0QzU5LjUwMjUgMzAuMDYwNiA1OS40ODE3IDMwLjIyNzMgNTkuNDgxNyAzMC45NzcyVjMxLjgxMDRDNTkuNDgxNyAzMi41NjA0IDU5LjM5ODQgMzIuNjQzNyA1OC42NDg1IDMyLjY0MzdINTcuNjA2OVoiIGZpbGw9IiMwRTBFMEUiLz4KPHBhdGggZD0iTTQ2LjYwNDkgMzIuMDYwNEM0Ny4xMjU3IDMyLjU4MTIgNDcuMjcxNSAzMi42NDM3IDQ4LjAyMTQgMzIuNjQzN0g1My44NTQxQzU0LjYwNCAzMi42NDM3IDU0LjY4NzMgMzIuNTYwNCA1NC42ODczIDMxLjgxMDRWMzAuOTc3MkM1NC42ODczIDMwLjIyNzMgNTQuNjA0IDMwLjE0NCA1My44NTQxIDMwLjE0NEg0Ni45Nzk5QzQ2LjIyOTkgMzAuMTQ0IDQ2LjE0NjYgMzAuMDYwNiA0Ni4xNDY2IDI5LjMxMDdWMTguODk1M0M0Ni4xNDY2IDE4LjE0NTMgNDYuMDYzMyAxOC4wNjIgNDUuMzEzNCAxOC4wNjJINDQuMjcxOEM0My41MjE5IDE4LjA2MiA0My40Mzg2IDE4LjE0NTMgNDMuNDM4NiAxOC44OTUzVjI4LjA2MDlDNDMuNDM4NiAyOC44MTA4IDQzLjUwMTEgMjguOTU2NiA0NC4wMjE5IDI5LjQ3NzRMNDYuNjA0OSAzMi4wNjA0WiIgZmlsbD0iIzBFMEUwRSIvPgo8L3N2Zz4K" loading="lazy" className="footer-logo-image" />
//                 </Link>
//               </div>
//               <div className="footer-form-col">
//                 <div className="subscribe-form-block w-form">
//                   <form id="wf-form-Subscription-Form" name="wf-form-Subscription-Form" data-name="Subscription Form" method="get" className="subscribe-form" data-wf-page-id="664753c2515af09bef5b982d" data-wf-element-id="12b1a94f-b7e6-6348-f4f8-87d2cb0ec46f" aria-label="Subscription Form">
//                     <div className="subscribe-input-col">
//                       <h3 className="subscribe-heading gsap-fade-up">
// Subscribe to be in touch*                      </h3>
//                       <div className="subscribe-row">
//                         <label htmlFor="email-2" className="visually-hidden">
// Your e-mail                        </label>
//                         <input className="subscribe-input-field w-input" maxLength={256} name="email-2" data-name="Email 2" placeholder="Your e-mail" type="email" id="email-2" required />
//                       </div>
//                     </div>
//                     <div className="subscribe-action-col">
//                       <div className="subscribe-note">
// *Only valuable resources                      </div>
//                       <div data-style-width="" className="button-primary subscrube-submit">
//                         <div className="button-primary-border">
//                           <input type="submit" data-wait="Please wait..." className="submit-button button-primary-text w-button" value="SUBSCRIBE" />
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                   <div className="success-message w-form-done" tabIndex={-1} role="region" aria-label="Subscription Form success">
//                     <div className="">
// Thank you! Your submission has been received!                    </div>
//                   </div>
//                   <div className="error-message w-form-fail" tabIndex={-1} role="region" aria-label="Subscription Form failure">
//                     <div className="">
// Oops! Something went wrong while submitting the form.                    </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="footer-nav-row">
//               <div className="footer-nav-col">
//                 <h4 className="footer-nav-title">
// ECOSYSTEM                </h4>
//                 <ul role="list" className="footer-nav">
//                   <li className="footer-nav-item">
//                     <a href="https://app.chaingpt.org/" target="_blank" className="footer-nav-link" rel="noreferrer noopener">
// ChainGPT AI                    </a>
//                   </li>
//                   <li className="footer-nav-item">
//                     <a href="https://pad.chaingpt.org/" target="_blank" className="footer-nav-link" rel="noreferrer noopener">
// ChainGPT Pad                    </a>
//                   </li>
//                 </ul>
//               </div>
//               <div className="footer-nav-col fnc-second">
//                 <h4 className="footer-nav-title">
// Quick Links                </h4>
//                 <ul role="list" className="footer-nav">
//                   <li className="footer-nav-item">
//                     <a href="https://labs.chaingpt.org/" className="footer-nav-link">
// Home                    </a>
//                   </li>
//                   <li className="footer-nav-item">
//                     <a href="/residency" className="footer-nav-link">
// Residency Program                    </a>
//                   </li>
//                   <li className="footer-nav-item">
//                     <a href="https://labs.chaingpt.org/apply" className="footer-nav-link">
// Apply Now                    </a>
//                   </li>
//                   <li className="footer-nav-item">
//                     <a href="http://help.chaingpt.org" target="_blank" className="footer-nav-link" rel="noreferrer noopener">
// Help Center                    </a>
//                   </li>
//                 </ul>
//               </div>
//               <div className="footer-nav-col">
//                 <h4 className="footer-nav-title">
// LEGAL                </h4>
//                 <ul role="list" className="footer-nav">
//                   <li className="footer-nav-item">
//                     <a href="/privacy-policy" className="footer-nav-link">
// Privacy Policy                    </a>
//                   </li>
//                   <li className="footer-nav-item">
//                     <a href="/cookie-policy" className="footer-nav-link">
// Cookie Policy                    </a>
//                   </li>
//                   <li className="footer-nav-item">
//                     <a href="/terms-of-service" className="footer-nav-link">
// Terms of Service                    </a>
//                   </li>
//                 </ul>
//               </div>
//               <div className="footer-nav-col">
//                 <ul role="list" className="footer-socials">
//                   <li className="footer-socials-item">
//                     <a rel="noreferer, noopener noreferrer" href="https://t.me/chaingpt" target="_blank" className="footer-socials-link w-inline-block">
//                       <div className="">
// TELEGRAM                      </div>
//                       <img width={10} height={10} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTk4ODY5IDEuMTY0MjRDLTAuMDY2Mjg5OSAxLjQyOTI1IC0wLjA2NjI4OTggMS44NTg5IDAuMTk4ODY5IDIuMTIzOTFMMS4xNTkxIDMuMDgzNThDMS40MjQyNSAzLjM0ODU4IDEuODU0MTYgMy4zNDg1OCAyLjExOTMyIDMuMDgzNThMMi44Mzk0OSAyLjM2MzgzQzMuMTA0NjUgMi4wOTg4MiAzLjUzNDU2IDIuMDk4ODIgMy43OTk3MiAyLjM2MzgzTDQuNTE5ODkgMy4wODM1OEM0LjU4ODE3IDMuMTUxODIgNC42NjczOCAzLjIwMjQ5IDQuNzUxODggMy4yMzU1OEwwLjU4Mjk2IDcuNDAyMDhDMC4yNzgwMjcgNy43MDY4MyAwLjI3ODAyNyA4LjIwMDk0IDAuNTgyOTYgOC41MDU3TDEuMTM1MDkgOS4wNTc1QzEuNDQwMDIgOS4zNjIyNiAxLjkzNDQyIDkuMzYyMjYgMi4yMzkzNSA5LjA1NzVMNi4yNDM1MSA1LjA1NTY3QzYuMjU1NTkgNS4yMTEzNiA2LjMyMTIgNS4zNjM2NyA2LjQ0MDM0IDUuNDgyNzRMNy4xNjA1MSA2LjIwMjVDNy40MjU2NyA2LjQ2NzUgNy40MjU2NyA2Ljg5NzE2IDcuMTYwNTEgNy4xNjIxNkw2LjQ0MDM0IDcuODgxOTFDNi4xNzUxOCA4LjE0NjkyIDYuMTc1MTggOC41NzY1NyA2LjQ0MDM0IDguODQxNThMNy40MDA1NyA5LjgwMTI1QzcuNjY1NzMgMTAuMDY2MyA4LjA5NTYzIDEwLjA2NjMgOC4zNjA3OSA5LjgwMTI1TDkuMzIxMDIgOC44NDE1OEM5LjU4NjE4IDguNTc2NTcgOS41ODYxOCA4LjE0NjkyIDkuMzIxMDIgNy44ODE5MUw4LjYwMDg1IDcuMTYyMTZDOC4zMzU2OSA2Ljg5NzE2IDguMzM1NjkgNi40Njc1IDguNjAwODUgNi4yMDI0OUw5LjMyMTAyIDUuNDgyNzRDOS41ODYxOCA1LjIxNzc0IDkuNTg2MTggNC43ODgwOCA5LjMyMTAyIDQuNTIzMDhMOC44NDA5IDQuMDQzMjRDOC41NzU3NSAzLjc3ODI0IDguNTc1NzUgMy4zNDg1OCA4Ljg0MDkgMy4wODM1OEw5LjgwMTEzIDIuMTIzOTFDMTAuMDY2MyAxLjg1ODkgMTAuMDY2MyAxLjQyOTI1IDkuODAxMTMgMS4xNjQyNEw4Ljg0MDkgMC4yMDQ1NzVDOC43Mjg4MyAwLjA5MjU2NTMgOC41ODczMiAwLjAyNzg5ODIgOC40NDEyNiAwLjAxMDU3NTVDOC4yMDExMSAtMC4wMjkyNTE2IDcuOTQ1OTEgMC4wNDM0MTIyIDcuNzYwNjUgMC4yMjg1NjdMNi45MDI5NyAxLjA4NTc1QzYuNjY0OTggMS4xNjgwNiA2LjM5MDMyIDEuMTE0MjUgNi4yMDAyOCAwLjkyNDMyNkw1LjQ4MDExIDAuMjA0NTc1QzUuMjE0OTUgLTAuMDYwNDI5NCA0Ljc4NTA1IC0wLjA2MDQyODkgNC41MTk4OSAwLjIwNDU3NkwzLjc5OTcyIDAuOTI0MzI2QzMuNTM0NTYgMS4xODkzMyAzLjEwNDY1IDEuMTg5MzMgMi44Mzk0OSAwLjkyNDMyNkwyLjExOTMyIDAuMjA0NTc2QzEuODU0MTYgLTAuMDYwNDI4OSAxLjQyNDI1IC0wLjA2MDQyOSAxLjE1OTEgMC4yMDQ1NzZMMC4xOTg4NjkgMS4xNjQyNFoiIGZpbGw9IiM2MzYzNjMiLz4KPC9zdmc+Cg==" loading="lazy" className="footer-socials-ico" />
//                     </a>
//                   </li>
//                   <li className="footer-socials-item">
//                     <a rel="noreferer, noopener noreferrer" href="https://x.com/ChainGPT_Labs" target="_blank" className="footer-socials-link w-inline-block">
//                       <div className="">
// X/TWITTER                      </div>
//                       <img width={10} height={10} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTk4ODY5IDEuMTY0MjRDLTAuMDY2Mjg5OSAxLjQyOTI1IC0wLjA2NjI4OTggMS44NTg5IDAuMTk4ODY5IDIuMTIzOTFMMS4xNTkxIDMuMDgzNThDMS40MjQyNSAzLjM0ODU4IDEuODU0MTYgMy4zNDg1OCAyLjExOTMyIDMuMDgzNThMMi44Mzk0OSAyLjM2MzgzQzMuMTA0NjUgMi4wOTg4MiAzLjUzNDU2IDIuMDk4ODIgMy43OTk3MiAyLjM2MzgzTDQuNTE5ODkgMy4wODM1OEM0LjU4ODE3IDMuMTUxODIgNC42NjczOCAzLjIwMjQ5IDQuNzUxODggMy4yMzU1OEwwLjU4Mjk2IDcuNDAyMDhDMC4yNzgwMjcgNy43MDY4MyAwLjI3ODAyNyA4LjIwMDk0IDAuNTgyOTYgOC41MDU3TDEuMTM1MDkgOS4wNTc1QzEuNDQwMDIgOS4zNjIyNiAxLjkzNDQyIDkuMzYyMjYgMi4yMzkzNSA5LjA1NzVMNi4yNDM1MSA1LjA1NTY3QzYuMjU1NTkgNS4yMTEzNiA2LjMyMTIgNS4zNjM2NyA2LjQ0MDM0IDUuNDgyNzRMNy4xNjA1MSA2LjIwMjVDNy40MjU2NyA2LjQ2NzUgNy40MjU2NyA2Ljg5NzE2IDcuMTYwNTEgNy4xNjIxNkw2LjQ0MDM0IDcuODgxOTFDNi4xNzUxOCA4LjE0NjkyIDYuMTc1MTggOC41NzY1NyA2LjQ0MDM0IDguODQxNThMNy40MDA1NyA5LjgwMTI1QzcuNjY1NzMgMTAuMDY2MyA4LjA5NTYzIDEwLjA2NjMgOC4zNjA3OSA5LjgwMTI1TDkuMzIxMDIgOC44NDE1OEM5LjU4NjE4IDguNTc2NTcgOS41ODYxOCA4LjE0NjkyIDkuMzIxMDIgNy44ODE5MUw4LjYwMDg1IDcuMTYyMTZDOC4zMzU2OSA2Ljg5NzE2IDguMzM1NjkgNi40Njc1IDguNjAwODUgNi4yMDI0OUw5LjMyMTAyIDUuNDgyNzRDOS41ODYxOCA1LjIxNzc0IDkuNTg2MTggNC43ODgwOCA5LjMyMTAyIDQuNTIzMDhMOC44NDA5IDQuMDQzMjRDOC41NzU3NSAzLjc3ODI0IDguNTc1NzUgMy4zNDg1OCA4Ljg0MDkgMy4wODM1OEw5LjgwMTEzIDIuMTIzOTFDMTAuMDY2MyAxLjg1ODkgMTAuMDY2MyAxLjQyOTI1IDkuODAxMTMgMS4xNjQyNEw4Ljg0MDkgMC4yMDQ1NzVDOC43Mjg4MyAwLjA5MjU2NTMgOC41ODczMiAwLjAyNzg5ODIgOC40NDEyNiAwLjAxMDU3NTVDOC4yMDExMSAtMC4wMjkyNTE2IDcuOTQ1OTEgMC4wNDM0MTIyIDcuNzYwNjUgMC4yMjg1NjdMNi45MDI5NyAxLjA4NTc1QzYuNjY0OTggMS4xNjgwNiA2LjM5MDMyIDEuMTE0MjUgNi4yMDAyOCAwLjkyNDMyNkw1LjQ4MDExIDAuMjA0NTc1QzUuMjE0OTUgLTAuMDYwNDI5NCA0Ljc4NTA1IC0wLjA2MDQyODkgNC41MTk4OSAwLjIwNDU3NkwzLjc5OTcyIDAuOTI0MzI2QzMuNTM0NTYgMS4xODkzMyAzLjEwNDY1IDEuMTg5MzMgMi44Mzk0OSAwLjkyNDMyNkwyLjExOTMyIDAuMjA0NTc2QzEuODU0MTYgLTAuMDYwNDI4OSAxLjQyNDI1IC0wLjA2MDQyOSAxLjE1OTEgMC4yMDQ1NzZMMC4xOTg4NjkgMS4xNjQyNFoiIGZpbGw9IiM2MzYzNjMiLz4KPC9zdmc+Cg==" loading="lazy" className="footer-socials-ico" />
//                     </a>
//                   </li>
//                   <li className="footer-socials-item">
//                     <a rel="noreferer, noopener noreferrer" href="https://www.linkedin.com/company/103925830/" target="_blank" className="footer-socials-link w-inline-block">
//                       <div className="">
// LINKEDIN                      </div>
//                       <img width={10} height={10} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTk4ODY5IDEuMTY0MjRDLTAuMDY2Mjg5OSAxLjQyOTI1IC0wLjA2NjI4OTggMS44NTg5IDAuMTk4ODY5IDIuMTIzOTFMMS4xNTkxIDMuMDgzNThDMS40MjQyNSAzLjM0ODU4IDEuODU0MTYgMy4zNDg1OCAyLjExOTMyIDMuMDgzNThMMi44Mzk0OSAyLjM2MzgzQzMuMTA0NjUgMi4wOTg4MiAzLjUzNDU2IDIuMDk4ODIgMy43OTk3MiAyLjM2MzgzTDQuNTE5ODkgMy4wODM1OEM0LjU4ODE3IDMuMTUxODIgNC42NjczOCAzLjIwMjQ5IDQuNzUxODggMy4yMzU1OEwwLjU4Mjk2IDcuNDAyMDhDMC4yNzgwMjcgNy43MDY4MyAwLjI3ODAyNyA4LjIwMDk0IDAuNTgyOTYgOC41MDU3TDEuMTM1MDkgOS4wNTc1QzEuNDQwMDIgOS4zNjIyNiAxLjkzNDQyIDkuMzYyMjYgMi4yMzkzNSA5LjA1NzVMNi4yNDM1MSA1LjA1NTY3QzYuMjU1NTkgNS4yMTEzNiA2LjMyMTIgNS4zNjM2NyA2LjQ0MDM0IDUuNDgyNzRMNy4xNjA1MSA2LjIwMjVDNy40MjU2NyA2LjQ2NzUgNy40MjU2NyA2Ljg5NzE2IDcuMTYwNTEgNy4xNjIxNkw2LjQ0MDM0IDcuODgxOTFDNi4xNzUxOCA4LjE0NjkyIDYuMTc1MTggOC41NzY1NyA2LjQ0MDM0IDguODQxNThMNy40MDA1NyA5LjgwMTI1QzcuNjY1NzMgMTAuMDY2MyA4LjA5NTYzIDEwLjA2NjMgOC4zNjA3OSA5LjgwMTI1TDkuMzIxMDIgOC44NDE1OEM5LjU4NjE4IDguNTc2NTcgOS41ODYxOCA4LjE0NjkyIDkuMzIxMDIgNy44ODE5MUw4LjYwMDg1IDcuMTYyMTZDOC4zMzU2OSA2Ljg5NzE2IDguMzM1NjkgNi40Njc1IDguNjAwODUgNi4yMDI0OUw5LjMyMTAyIDUuNDgyNzRDOS41ODYxOCA1LjIxNzc0IDkuNTg2MTggNC43ODgwOCA5LjMyMTAyIDQuNTIzMDhMOC44NDA5IDQuMDQzMjRDOC41NzU3NSAzLjc3ODI0IDguNTc1NzUgMy4zNDg1OCA4Ljg0MDkgMy4wODM1OEw5LjgwMTEzIDIuMTIzOTFDMTAuMDY2MyAxLjg1ODkgMTAuMDY2MyAxLjQyOTI1IDkuODAxMTMgMS4xNjQyNEw4Ljg0MDkgMC4yMDQ1NzVDOC43Mjg4MyAwLjA5MjU2NTMgOC41ODczMiAwLjAyNzg5ODIgOC40NDEyNiAwLjAxMDU3NTVDOC4yMDExMSAtMC4wMjkyNTE2IDcuOTQ1OTEgMC4wNDM0MTIyIDcuNzYwNjUgMC4yMjg1NjdMNi45MDI5NyAxLjA4NTc1QzYuNjY0OTggMS4xNjgwNiA2LjM5MDMyIDEuMTE0MjUgNi4yMDAyOCAwLjkyNDMyNkw1LjQ4MDExIDAuMjA0NTc1QzUuMjE0OTUgLTAuMDYwNDI5NCA0Ljc4NTA1IC0wLjA2MDQyODkgNC41MTk4OSAwLjIwNDU3NkwzLjc5OTcyIDAuOTI0MzI2QzMuNTM0NTYgMS4xODkzMyAzLjEwNDY1IDEuMTg5MzMgMi44Mzk0OSAwLjkyNDMyNkwyLjExOTMyIDAuMjA0NTc2QzEuODU0MTYgLTAuMDYwNDI4OSAxLjQyNDI1IC0wLjA2MDQyOSAxLjE1OTEgMC4yMDQ1NzZMMC4xOTg4NjkgMS4xNjQyNFoiIGZpbGw9IiM2MzYzNjMiLz4KPC9zdmc+Cg==" loading="lazy" className="footer-socials-ico" />
//                     </a>
//                   </li>
//                   <li className="footer-socials-item">
//                     <a rel="noreferer, noopener noreferrer" href="https://medium.com/@chaingpt" target="_blank" className="footer-socials-link w-inline-block">
//                       <div className="">
// MEDIUM                      </div>
//                       <img width={10} height={10} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTk4ODY5IDEuMTY0MjRDLTAuMDY2Mjg5OSAxLjQyOTI1IC0wLjA2NjI4OTggMS44NTg5IDAuMTk4ODY5IDIuMTIzOTFMMS4xNTkxIDMuMDgzNThDMS40MjQyNSAzLjM0ODU4IDEuODU0MTYgMy4zNDg1OCAyLjExOTMyIDMuMDgzNThMMi44Mzk0OSAyLjM2MzgzQzMuMTA0NjUgMi4wOTg4MiAzLjUzNDU2IDIuMDk4ODIgMy43OTk3MiAyLjM2MzgzTDQuNTE5ODkgMy4wODM1OEM0LjU4ODE3IDMuMTUxODIgNC42NjczOCAzLjIwMjQ5IDQuNzUxODggMy4yMzU1OEwwLjU4Mjk2IDcuNDAyMDhDMC4yNzgwMjcgNy43MDY4MyAwLjI3ODAyNyA4LjIwMDk0IDAuNTgyOTYgOC41MDU3TDEuMTM1MDkgOS4wNTc1QzEuNDQwMDIgOS4zNjIyNiAxLjkzNDQyIDkuMzYyMjYgMi4yMzkzNSA5LjA1NzVMNi4yNDM1MSA1LjA1NTY3QzYuMjU1NTkgNS4yMTEzNiA2LjMyMTIgNS4zNjM2NyA2LjQ0MDM0IDUuNDgyNzRMNy4xNjA1MSA2LjIwMjVDNy40MjU2NyA2LjQ2NzUgNy40MjU2NyA2Ljg5NzE2IDcuMTYwNTEgNy4xNjIxNkw2LjQ0MDM0IDcuODgxOTFDNi4xNzUxOCA4LjE0NjkyIDYuMTc1MTggOC41NzY1NyA2LjQ0MDM0IDguODQxNThMNy40MDA1NyA5LjgwMTI1QzcuNjY1NzMgMTAuMDY2MyA4LjA5NTYzIDEwLjA2NjMgOC4zNjA3OSA5LjgwMTI1TDkuMzIxMDIgOC44NDE1OEM5LjU4NjE4IDguNTc2NTcgOS41ODYxOCA4LjE0NjkyIDkuMzIxMDIgNy44ODE5MUw4LjYwMDg1IDcuMTYyMTZDOC4zMzU2OSA2Ljg5NzE2IDguMzM1NjkgNi40Njc1IDguNjAwODUgNi4yMDI0OUw5LjMyMTAyIDUuNDgyNzRDOS41ODYxOCA1LjIxNzc0IDkuNTg2MTggNC43ODgwOCA5LjMyMTAyIDQuNTIzMDhMOC44NDA5IDQuMDQzMjRDOC41NzU3NSAzLjc3ODI0IDguNTc1NzUgMy4zNDg1OCA4Ljg0MDkgMy4wODM1OEw5LjgwMTEzIDIuMTIzOTFDMTAuMDY2MyAxLjg1ODkgMTAuMDY2MyAxLjQyOTI1IDkuODAxMTMgMS4xNjQyNEw4Ljg0MDkgMC4yMDQ1NzVDOC43Mjg4MyAwLjA5MjU2NTMgOC41ODczMiAwLjAyNzg5ODIgOC40NDEyNiAwLjAxMDU3NTVDOC4yMDExMSAtMC4wMjkyNTE2IDcuOTQ1OTEgMC4wNDM0MTIyIDcuNzYwNjUgMC4yMjg1NjdMNi45MDI5NyAxLjA4NTc1QzYuNjY0OTggMS4xNjgwNiA2LjM5MDMyIDEuMTE0MjUgNi4yMDAyOCAwLjkyNDMyNkw1LjQ4MDExIDAuMjA0NTc1QzUuMjE0OTUgLTAuMDYwNDI5NCA0Ljc4NTA1IC0wLjA2MDQyODkgNC41MTk4OSAwLjIwNDU3NkwzLjc5OTcyIDAuOTI0MzI2QzMuNTM0NTYgMS4xODkzMyAzLjEwNDY1IDEuMTg5MzMgMi44Mzk0OSAwLjkyNDMyNkwyLjExOTMyIDAuMjA0NTc2QzEuODU0MTYgLTAuMDYwNDI4OSAxLjQyNDI1IC0wLjA2MDQyOSAxLjE1OTEgMC4yMDQ1NzZMMC4xOTg4NjkgMS4xNjQyNFoiIGZpbGw9IiM2MzYzNjMiLz4KPC9zdmc+Cg==" loading="lazy" className="footer-socials-ico" />
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="footer-copy-row">
//               <div className="footer-copy-col">
//                 <div className="footer-copyright">
//                   <div className="copyright-year">
// © 2025                  </div>
//                   <div className="copyright-text">
// All rights reserved by ChainGPTlabs.org.                  </div>
//                 </div>
//               </div>
//               <div className="footer-label-col hidden">
//                 <img loading="lazy" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA2IiBoZWlnaHQ9IjQ0IiB2aWV3Qm94PSIwIDAgMjA2IDQ0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTk3LjM0OCAwLjQwODIwM0g4LjY1MjExQzQuMTAxMjggMC40MDgyMDMgMC40MTIxMDkgNC4wNTYyNSAwLjQxMjEwOSA4LjU1NjM1VjM1LjQ0NTJDMC40MTIxMDkgMzkuOTQ1MyA0LjEwMTI4IDQzLjU5MzQgOC42NTIxMSA0My41OTM0SDE5Ny4zNDhDMjAxLjg5OSA0My41OTM0IDIwNS41ODggMzkuOTQ1MyAyMDUuNTg4IDM1LjQ0NTJWOC41NTYzNUMyMDUuNTg4IDQuMDU2MjUgMjAxLjg5OSAwLjQwODIwMyAxOTcuMzQ4IDAuNDA4MjAzWiIgZmlsbD0iIzIyMUQyMSIvPgo8cGF0aCBkPSJNNDcuOTA2NyA4LjY4NDY1SDQ0LjE4MzhWMTMuOTY0OEg0NS4zNDA3VjExLjc5OTRINDcuNTcyOVYxMC44Nzk4SDQ1LjM0MDdWOS42NTYxNUg0Ny45MDY3VjguNjg0NjVaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik01Mi41NCA4LjY4NDY1SDQ4LjU3OThWMTMuOTY0OEg1Mi41OTE5VjEyLjk5MzNINDkuNzI5M1YxMS42OTU1SDUyLjMxMDFWMTAuNzgzNEg0OS43MjkzVjkuNjMzOUg1Mi41NFY4LjY4NDY1WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNTYuMDEzOSA4LjY3NzI0SDU0LjgxOTlMNTIuODEwMiAxMy45NjQ4SDUzLjk5NjhMNTQuNDI2OSAxMi43ODU3SDU2LjM5MjFMNTYuODA3NCAxMy45NjQ4SDU4LjAyMzZMNTYuMDEzOSA4LjY3NzI0Wk01Ni4xMTAzIDExLjk0MDNINTQuNzA4N0w1NS40MTMyIDkuOTc1MDRMNTYuMTEwMyAxMS45NDAzWiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNjEuODM4MSA4LjY4NDY1SDU3LjQ5OTdWOS42NzA5OEg1OS4wODY3VjEzLjk2NDhINjAuMjUxVjkuNjcwOThINjEuODM4MVY4LjY4NDY1WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNjYuOTQyNyA4LjY4NDY1SDY1Ljc4NThWMTEuODQzOUM2NS43ODU4IDEyLjYyMjUgNjUuNjAwNCAxMy4xMTIgNjQuNzEwNSAxMy4xMTJDNjMuODA1OCAxMy4xMTIgNjMuNTc1OSAxMi42NTIyIDYzLjU3NTkgMTEuODQzOVY4LjY4NDY1SDYyLjQxOVYxMS44NDM5QzYyLjQxOSAxMy4zNDkzIDYzLjEyMzUgMTQuMDY4NyA2NC42OTU3IDE0LjA2ODdDNjYuMjM4MiAxNC4wNjg3IDY2Ljk0MjcgMTMuMzY0MSA2Ni45NDI3IDExLjg1ODdWOC42ODQ2NVoiIGZpbGw9IiNFRUYyRkYiLz4KPHBhdGggZD0iTTY3Ljk4OTkgOC42ODQ2NVYxMy45NjQ4SDY5LjEzOTRWMTEuODk1OEg3MC4xNzAyQzcwLjkyNjcgMTEuODk1OCA3MS4xNDkyIDEyLjE1NTMgNzEuMjIzMyAxMi44ODIxQzcxLjI1MyAxMy4xNzEzIDcxLjI1MyAxMy42OTc5IDcxLjM4NjUgMTMuOTY0OEg3Mi41ODc5QzcyLjM4MDIgMTMuNzcyIDcyLjM2NTQgMTMuMDQ1MyA3Mi4zMzU3IDEyLjcxMTVDNzIuMjkxMiAxMi4xOTI0IDcyLjE0MjkgMTEuNTk5MSA3MS41NTcgMTEuNDgwNUM3Mi4wODM2IDExLjI4MDMgNzIuMzk1IDEwLjc5ODIgNzIuMzk1IDEwLjE4MjdDNzIuMzk1IDkuMTIyMiA3MS41ODY3IDguNjg0NjUgNzAuNjE1MiA4LjY4NDY1SDY3Ljk4OTlaTTY5LjEzOTQgOS41OTY4Mkg3MC4yODg5QzcwLjc3ODQgOS41OTY4MiA3MS4yNjA0IDkuNzAwNjQgNzEuMjYwNCAxMC4zMDg4QzcxLjI2MDQgMTAuOTYxNCA3MC43Nzg0IDExLjA1NzggNzAuMjM3IDExLjA1NzhINjkuMTM5NFY5LjU5NjgyWiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNzcuMjU3NiA4LjY4NDY1SDczLjI5NzRWMTMuOTY0OEg3Ny4zMDk1VjEyLjk5MzNINzQuNDQ2OVYxMS42OTU1SDc3LjAyNzdWMTAuNzgzNEg3NC40NDY5VjkuNjMzOUg3Ny4yNTc2VjguNjg0NjVaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik03OC4xMTM2IDEzLjk2NDhIODAuMjQ5NUM4MS44ODg0IDEzLjk2NDggODIuODA4IDEzLjAyMyA4Mi44MDggMTEuMzI0N0M4Mi44MDggOS42MTkwNyA4MS44ODg0IDguNjg0NjUgODAuMjQ5NSA4LjY4NDY1SDc4LjExMzZWMTMuOTY0OFpNNzkuMjYzMSAxMy4wMDA4VjkuNjQ4NzNIODAuMTA4NkM4MS4xNTQyIDkuNjQ4NzMgODEuNjQzNyAxMC4yNjQzIDgxLjY0MzcgMTEuMzI0N0M4MS42NDM3IDEyLjM4NTIgODEuMTY5IDEzLjAwMDggODAuMTA4NiAxMy4wMDA4SDc5LjI2MzFaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik04OC4wNTUgOC41NTg1OEM4Ni40NzU0IDguNTU4NTggODUuNDM3MiA5LjY1NjE1IDg1LjQzNzIgMTEuMzMyMkM4NS40MzcyIDEyLjk4NTkgODYuNDgyOCAxNC4wOTA5IDg4LjA0NzYgMTQuMDkwOUM4OS41OTc1IDE0LjA5MDkgOTAuNjQzMiAxMi45Nzg1IDkwLjY0MzIgMTEuMzMyMkM5MC42NDMyIDkuNjc4NCA4OS41OTc1IDguNTU4NTggODguMDU1IDguNTU4NThaTTg4LjA0MDIgOS41MDc4M0M4OC45MjI3IDkuNTA3ODMgODkuNDcxNSAxMC4xOTc1IDg5LjQ3MTUgMTEuMzA5OUM4OS40NzE1IDEyLjQzNzEgODguOTMwMSAxMy4xMzQzIDg4LjA1NSAxMy4xMzQzQzg3LjE1NzcgMTMuMTI2OCA4Ni42MDg5IDEyLjQ0NDYgODYuNjA4OSAxMS4zMDk5Qzg2LjYwODkgMTAuMjEyMyA4Ny4xNjUxIDkuNTA3ODMgODguMDQwMiA5LjUwNzgzWiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNOTEuNDM5MSAxMy45NjQ4SDkyLjU1ODlWMTAuNDJMOTQuNzQ2NiAxMy45NjQ4SDk1LjkwMzVWOC42ODQ2NUg5NC43OTExVjEyLjIyMjFMOTIuNjE4MiA4LjY4NDY1SDkxLjQzOTFWMTMuOTY0OFoiIGZpbGw9IiNFRUYyRkYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xODcuMDUgMTguNzM5OUgxNzcuOTg0TDE4Mi41MTcgMTAuNTkxOEwxODcuMDUgMTguNzM5OVoiIGZpbGw9IiNFRUYyRkYiLz4KPHBhdGggZD0iTTE4MS40OTcgMjguNjgwNVYyOS45OThIMTc2LjAwMkMxNzYuMDM0IDI4LjI2MjcgMTc2Ljk1NiAyNy42MDkzIDE3OC4zMDUgMjYuNjk4OEMxNzguOTY5IDI2LjI0ODggMTc5LjkyMyAyNS43NjY4IDE3OS45MjMgMjQuODQ1NkMxNzkuOTIzIDI0LjE5MjEgMTc5LjQ5NCAyMy43NjM3IDE3OC44NTIgMjMuNzYzN0MxNzguMDU5IDIzLjc2MzcgMTc3LjY3MyAyNC4yODg2IDE3Ny42MyAyNS4zOTE5SDE3Ni4xNzRWMjUuMjMxMkMxNzYuMTc0IDIzLjUyOCAxNzcuMjM0IDIyLjQ0NjEgMTc4LjkwNSAyMi40NDYxQzE4MC40MTYgMjIuNDQ2MSAxODEuNDU1IDIzLjM3OCAxODEuNDU1IDI0LjczODVDMTgxLjQ1NSAyNS45NDg5IDE4MC43OSAyNi40ODQ1IDE3OS45MDEgMjcuMDk1MUMxNzkuMjU5IDI3LjUzNDMgMTc4LjM4IDI4LjAzNzggMTc3Ljk1MiAyOC42ODA1SDE4MS40OTdaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik0xODcuMDY0IDIyLjU2MzlWMjMuODYwMUgxODMuOTlMMTgzLjcwMSAyNS40ODgzQzE4NC4wNjUgMjUuMTI0MSAxODQuNDgzIDI0Ljk2MzQgMTg1LjA4MiAyNC45NjM0QzE4Ni41MTggMjQuOTYzNCAxODcuNDcxIDI1LjkzODIgMTg3LjQ3MSAyNy40MTY1QzE4Ny40NzEgMjguOTkxMSAxODYuMjkzIDMwLjExNTkgMTg0LjY0MyAzMC4xMTU5QzE4My4xMjIgMzAuMTE1OSAxODEuOTk3IDI5LjMxMjUgMTgxLjkxMiAyNy43ODA3SDE4My40MTFDMTgzLjQ3NiAyOC40MzQxIDE4My45NjggMjguODg0IDE4NC42NDMgMjguODg0QzE4NS40MDQgMjguODg0IDE4NS45MzkgMjguMjk0OCAxODUuOTM5IDI3LjQ0ODZDMTg1LjkzOSAyNi42MDIzIDE4NS40MjUgMjYuMDY2NyAxODQuNjMzIDI2LjA2NjdDMTg0LjEyOSAyNi4wNjY3IDE4My43OTcgMjYuMjQ4OCAxODMuNTA4IDI2LjY4OEgxODIuMTQ3TDE4Mi44NzYgMjIuNTYzOUgxODcuMDY0WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTM0LjYwOCAyMi40MDdDMzQuNjA4IDI5LjM4MjEgMjguODg5NyAzNS4wMzY2IDIxLjgzNiAzNS4wMzY2QzE0Ljc4MjIgMzUuMDM2NiA5LjA2Mzk2IDI5LjM4MjEgOS4wNjM5NiAyMi40MDdDOS4wNjM5NiAxNS40MzE4IDE0Ljc4MjIgOS43NzczNCAyMS44MzYgOS43NzczNEMyOC44ODk3IDkuNzc3MzQgMzQuNjA4IDE1LjQzMTggMzQuNjA4IDIyLjQwN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjMuNDI4NiAyMi43Nzc3TDE5Ljg1MjUgMjIuNzc3OFYxOC45ODg5SDIzLjQyODZDMjQuNDc0MiAxOC45ODg5IDI1LjMyMTkgMTkuODM3IDI1LjMyMTkgMjAuODgzM0MyNS4zMjE5IDIxLjkyOTUgMjQuNDc0MiAyMi43Nzc3IDIzLjQyODYgMjIuNzc3N1pNMjMuNDI4NiAxNi40NjI5SDE3LjMyODFWMjkuMDkyNUgxOS44NTI1VjI1LjMwMzdIMjMuNDI4NkMyNS44Njg0IDI1LjMwMzcgMjcuODQ2MiAyMy4zMjQ2IDI3Ljg0NjIgMjAuODgzM0MyNy44NDYyIDE4LjQ0MiAyNS44Njg0IDE2LjQ2MjkgMjMuNDI4NiAxNi40NjI5WiIgZmlsbD0iIzIyMUQyMSIvPgo8cGF0aCBkPSJNNDQuMDU5MyAyMC4xNjJINDkuMzcxNkM1Mi4wMzY0IDIwLjE2MiA1My44ODggMjEuNDA3OSA1My44ODggMjQuMTI0NkM1My44ODggMjYuODA2NyA1MS45ODQ1IDI4LjA1MjYgNDkuNTEwMSAyOC4wNTI2SDQ2Ljc0MTRWMzIuNDgyNEg0NC4wNTkzVjIwLjE2MlpNNDYuNzQxNCAyMi4zNzY5VjI1LjkyNDJINDkuMTQ2N0M1MC4zNTggMjUuOTI0MiA1MS4yNTc4IDI1LjUyNjIgNTEuMjU3OCAyNC4xNTkyQzUxLjI1NzggMjIuODQ0MSA1MC4zNTggMjIuMzc2OSA0OS4xNjQgMjIuMzc2OUg0Ni43NDE0WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNjEuMTIwOSAyMy4zOTc4VjI1LjY2NDZDNjAuNjg4MyAyNS41NzgxIDYwLjQ0NjEgMjUuNTYwOCA2MC4xNjkyIDI1LjU2MDhDNTguNDczNCAyNS41NjA4IDU3LjgxNTggMjYuNzcyMSA1Ny44MTU4IDI4LjM5ODdWMzIuNDgyNEg1NS4zNTg3VjIzLjU1MzZINTcuNjk0N1YyNS4xOTc0QzU4LjI0ODQgMjQuMDM4MSA1OS4yNTIxIDIzLjM0NTkgNjAuNTg0NSAyMy4zNDU5QzYwLjc3NDggMjMuMzQ1OSA2MC44Nzg3IDIzLjM2MzIgNjEuMTIwOSAyMy4zOTc4WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNjYuMTQwNyAyMy4yOTRDNjguODkyIDIzLjI5NCA3MC43MDkgMjUuMTgwMSA3MC43MDkgMjguMDE4QzcwLjcwOSAzMC44OTA1IDY4Ljg5MiAzMi43NTkzIDY2LjEwNjEgMzIuNzU5M0M2My4zMjAxIDMyLjc1OTMgNjEuNDg1OSAzMC44NzMxIDYxLjQ4NTkgMjguMDE4QzYxLjQ4NTkgMjUuMTgwMSA2My4zMzc0IDIzLjI5NCA2Ni4xNDA3IDIzLjI5NFpNNjYuMDcxNSAyNS4xNjI4QzY0Ljc1NjQgMjUuMTYyOCA2My45NDMxIDI2LjIzNTcgNjMuOTQzMSAyOC4wMThDNjMuOTQzMSAyOS44NTIyIDY0LjczOTEgMzAuOTA3OCA2Ni4xMDYxIDMwLjkwNzhDNjcuNDU1OCAzMC45MDc4IDY4LjI1MTggMjkuODM0OSA2OC4yNTE4IDI4LjAwMDdDNjguMjUxOCAyNi4yMTg0IDY3LjQzODUgMjUuMTYyOCA2Ni4wNzE1IDI1LjE2MjhaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik04MS4wMjc4IDMyLjQ4MjRINzguNzA5MVYzMS4zNDA0Qzc4LjEyMDcgMzIuMjU3NSA3Ny4yMzgyIDMyLjcyNDcgNzYuMDA5NyAzMi43MjQ3QzczLjUzNTIgMzIuNzI0NyA3MS45NjA1IDMwLjg3MzEgNzEuOTYwNSAyNy45ODM0QzcxLjk2MDUgMjUuMTYyOCA3My41MDA2IDIzLjMxMTMgNzUuODcxMiAyMy4zMTEzQzc2LjkyNjggMjMuMzExMyA3OC4wMTY5IDIzLjc0MzkgNzguNTg4IDI0LjY2MVYyMC4xNjJIODEuMDI3OFYzMi40ODI0Wk03OC42NzQ1IDI4LjAwMDdDNzguNjc0NSAyNi4yNzAzIDc3Ljg3ODUgMjUuMjQ5MyA3Ni41NDYxIDI1LjI0OTNDNzUuMjEzNyAyNS4yNDkzIDc0LjQzNSAyNi4yNzAzIDc0LjQzNSAyNy45ODM0Qzc0LjQzNSAyOS43MTM4IDc1LjIzMSAzMC43NTIgNzYuNTQ2MSAzMC43NTJDNzcuODk1OCAzMC43NTIgNzguNjc0NSAyOS43NDg0IDc4LjY3NDUgMjguMDAwN1oiIGZpbGw9IiNFRUYyRkYiLz4KPHBhdGggZD0iTTkxLjI3NzUgMjMuNTUzNlYzMi40ODI0SDg4Ljk0MTRWMzEuMjE5MkM4OC4yNjY2IDMyLjIwNTYgODcuMzE0OCAzMi43NDIgODYuMDM0MyAzMi43NDJDODQuMTEzNiAzMi43NDIgODIuOTE5NiAzMS42ODY0IDgyLjkxOTYgMjkuNTU4VjIzLjU1MzZIODUuMzk0MVYyOC42NTgyQzg1LjM5NDEgMjkuNzgzIDg1LjQ5NzkgMzAuNjgyOCA4Ni44OTk2IDMwLjY4MjhDODguNDM5NiAzMC42ODI4IDg4LjgzNzYgMjkuNTA2MSA4OC44Mzc2IDI4LjE1NjRWMjMuNTUzNkg5MS4yNzc1WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNMTAxLjY3MyAyOS4wMzg5QzEwMS4zNjIgMzEuMzU3NyA5OS43Njk4IDMyLjcwNzQgOTcuMzk5MiAzMi43MDc0Qzk0LjY0NzggMzIuNzA3NCA5Mi44NDgyIDMwLjg3MzEgOTIuODQ4MiAyOC4wODcyQzkyLjg0ODIgMjUuMTk3NCA5NC42NjUxIDIzLjI5NCA5Ny40MzM4IDIzLjI5NEM5OS44MjE3IDIzLjI5NCAxMDEuNDE0IDI0LjU5MTggMTAxLjYyMSAyNi42NjgzSDk5LjIxNjFDOTkuMDQzIDI1LjY4MTkgOTguNDAyOCAyNS4xMjgyIDk3LjQ1MTEgMjUuMTI4MkM5Ni4xMTg3IDI1LjEyODIgOTUuMzIyNyAyNi4yMDExIDk1LjMyMjcgMjguMDM1M0M5NS4zMjI3IDI5LjgxNzYgOTYuMDg0MSAzMC44Mzg1IDk3LjM5OTIgMzAuODM4NUM5OC40NTQ3IDMwLjgzODUgOTkuMTEyMyAzMC4yMTU2IDk5LjMwMjYgMjkuMDM4OUgxMDEuNjczWiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNMTA4LjAxIDIzLjU1MzZWMjUuMjE0N0gxMDYuMTkzVjI5LjQxOTZDMTA2LjE5MyAzMC4yODQ4IDEwNi4yMTEgMzAuNjgyOCAxMDcuMjY2IDMwLjY4MjhDMTA3LjUyNiAzMC42ODI4IDEwNy43MTYgMzAuNjgyOCAxMDguMDEgMzAuNjQ4MlYzMi41MTdDMTA3LjMzNSAzMi41Njg5IDEwNy4wNzYgMzIuNTg2MiAxMDYuNTIyIDMyLjU4NjJDMTA0LjQxMSAzMi41ODYyIDEwMy43NTQgMzIuMDMyNSAxMDMuNzU0IDI5Ljg1MjJWMjUuMjE0N0gxMDIuMjY1VjIzLjU1MzZIMTAzLjc1NFYyMC44NTQxSDEwNi4xOTNWMjMuNTUzNkgxMDguMDFaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik0xMjQuNjg5IDIwLjE2MlYzMi40ODI0SDEyMS45OVYyNy4xNzAxSDExNi45NTRWMzIuNDgyNEgxMTQuMjU1VjIwLjE2MkgxMTYuOTU0VjI0Ljc5OTRIMTIxLjk5VjIwLjE2MkgxMjQuNjg5WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNMTM1LjE5NyAyMy41NTM2VjMyLjQ4MjRIMTMyLjg2VjMxLjIxOTJDMTMyLjE4NiAzMi4yMDU2IDEzMS4yMzQgMzIuNzQyIDEyOS45NTMgMzIuNzQyQzEyOC4wMzMgMzIuNzQyIDEyNi44MzkgMzEuNjg2NCAxMjYuODM5IDI5LjU1OFYyMy41NTM2SDEyOS4zMTNWMjguNjU4MkMxMjkuMzEzIDI5Ljc4MyAxMjkuNDE3IDMwLjY4MjggMTMwLjgxOSAzMC42ODI4QzEzMi4zNTkgMzAuNjgyOCAxMzIuNzU3IDI5LjUwNjEgMTMyLjc1NyAyOC4xNTY0VjIzLjU1MzZIMTM1LjE5N1oiIGZpbGw9IiNFRUYyRkYiLz4KPHBhdGggZD0iTTE0NS40ODggMzIuNDgyNEgxNDIuOTk3VjI3LjI3MzlDMTQyLjk5NyAyNi4xNjY1IDE0Mi43ODkgMjUuMzM1OSAxNDEuNDc0IDI1LjMzNTlDMTQwLjAwMyAyNS4zMzU5IDEzOS41MzYgMjYuMzkxNCAxMzkuNTM2IDI3LjY4OTJWMzIuNDgyNEgxMzcuMDk2VjIzLjU1MzZIMTM5LjQzMlYyNC43OTk0QzE0MC4xNDIgMjMuODQ3NyAxNDEuMTI4IDIzLjMxMTMgMTQyLjM5MSAyMy4zMTEzQzE0NC4yNzcgMjMuMzExMyAxNDUuNDg4IDI0LjQzNjEgMTQ1LjQ4OCAyNi41MTI1VjMyLjQ4MjRaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik0xNTIuMjUgMjMuNTUzNlYyNS4yMTQ3SDE1MC40MzNWMjkuNDE5NkMxNTAuNDMzIDMwLjI4NDggMTUwLjQ1MSAzMC42ODI4IDE1MS41MDYgMzAuNjgyOEMxNTEuNzY2IDMwLjY4MjggMTUxLjk1NiAzMC42ODI4IDE1Mi4yNSAzMC42NDgyVjMyLjUxN0MxNTEuNTc2IDMyLjU2ODkgMTUxLjMxNiAzMi41ODYyIDE1MC43NjIgMzIuNTg2MkMxNDguNjUxIDMyLjU4NjIgMTQ3Ljk5NCAzMi4wMzI1IDE0Ny45OTQgMjkuODUyMlYyNS4yMTQ3SDE0Ni41MDVWMjMuNTUzNkgxNDcuOTk0VjIwLjg1NDFIMTUwLjQzM1YyMy41NTM2SDE1Mi4yNVoiIGZpbGw9IiNFRUYyRkYiLz4KPC9zdmc+Cg==" alt="" className="product-hunt" />
//               </div>
//             </div>
//             <div className="footer-bottom">
//               <div className="footer-decor fd-top-left"></div>
//               <div className="footer-decor fd-top-right"></div>
//               <div className="footer-decor fd-bottom-left"></div>
//               <div className="footer-decor fd-bottom-right"></div>
//               <div className="footer-bottom-divider fbd-left"></div>
//               <div className="footer-bottom-divider fbd-middle"></div>
//               <div className="footer-bottom-divider fbd-right"></div>
//               <div id="3d-footer" className="webgl-wrapper">
//                 <img
//                   src="/astra.png"
//                   alt="ChainGPT Labs"
//                   className="footer-astra-image"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="footer-bottom-gape"></div>
//       </section>
//       <div id="cookie-consent-banner" className="cookie-popup">
//         <div className="cookie-popup-body">
//           <p className="m-0-2">
// We use third-party cookies to personalize content, ads, and analyze website traffic.          </p>
//         </div>
//         <div className="cookie-popup-footer">
//           <a id="btn-accept-all" href="index.html#" className="button-outline-gradient w-inline-block w--current">
//             <div className="button-outline-gradient-border">
//               <div className="button-outline-text-2 size-small accept">
// Accept              </div>
//             </div>
//           </a>
//           <a id="btn-reject-all" href="index.html#" className="button-outline-secondary outline-grey w-inline-block w--current">
//             <div className="button-outline-secondary-border">
//               <div className="button-outline-text-2 size-small">
// Reject              </div>
//             </div>
//           </a>
//           <div className="div-block-21">
//             <a id="btn-hide-banner" href="index.html#" className="cookie-popup-close w-inline-block w--current">
//               <img width={16} height={16} alt="Icon Close Cookies Popup" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuNSAxNC41TDE0LjIyNzkgMS43NzIwOCIgc3Ryb2tlPSIjRjZGNkY2IiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTEuNSAxLjVMMTQuMjI3OSAxNC4yMjc5IiBzdHJva2U9IiNGNkY2RjYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K" loading="lazy" className="cookie-popup-close-icon" />
//             </a>
//           </div>
//         </div>
//       </div>
//       {/* Unicorn Studio */}
//       {/* Unicorn Studio End */}
//       {/* Utils */}
//       {/* Utils End */}
//       <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAkAAAEALAAAAAABAAEAAAICTAEAOw==" height={1} width={1} fetchPriority="high" style={{display: "none"}} className="" />
//       <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAkAAAEALAAAAAABAAEAAAICTAEAOw==" height={1} width={1} fetchPriority="high" style={{display: "none"}} className="" />

//     </div>
//   );
// }




'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountdownStrip from './CountdownStrip';
import StaggeredMenu from '@/components/StaggeredMenu';
import SiteHeader from '@/components/SiteHeader';
import DecryptedText from '@/components/DecryptedText';
import { EVENT_ENTRY_FEE, EVENTS } from '@/data/events';

const ARROW_SVG = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDIzIDIzIiB3aWR0aD0iMjMiIGhlaWdodD0iMjMiPjxzdHlsZT4uYXtmaWxsOiMwZTBlMGV9PC9zdHlsZT48cGF0aCBjbGFzcz0iYSIgZD0ibTEwLjYgNGMtMC41IDAtMC45IDAuNC0wLjkgMC45djEuN2MwIDAuNSAwLjQgMC45IDAuOSAwLjloMS4zYzAuNSAwIDAuOCAwLjQgMC44IDAuOHYxLjRxMCAwLjEgMC4xIDAuM2gtNy41Yy0wLjYgMC0xIDAuNC0xIDF2MWMwIDAuNiAwLjQgMSAxIDFoNy4ycS0wLjIgMC4yLTAuMiAwLjZ2MS4zYzAgMC40LTAuNCAwLjgtMC45IDAuOGgtMS4zYy0wLjQgMC0wLjggMC40LTAuOCAwLjl2MS43YzAgMC41IDAuNCAwLjkgMC44IDAuOWgxLjhjMC41IDAgMC44LTAuNCAwLjgtMC45di0xLjNjMC0wLjQgMC40LTAuOCAwLjktMC44aDEuM2MwLjUgMCAwLjktMC40IDAuOS0wLjl2LTAuOWMwLTAuNCAwLjQtMC44IDAuOS0wLjhoMS43YzAuNSAwIDAuOS0wLjQgMC45LTAuOXYtMS43cTAtMC40LTAuMi0wLjZjLTAuMi0wLjItMC41LTAuNC0wLjgtMC40aC0xLjZjLTAuMy0wLjEtMC41LTAuNC0wLjUtMC44di0xLjNjMC0wLjUtMC40LTAuOS0wLjktMC45aC0xLjNjLTAuNCAwLTAuOC0wLjMtMC44LTAuOHYtMS4zYzAtMC41LTAuNC0wLjktMC45LTAuOXoiLz48L3N2Zz4=';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const SLIDE_COUNT = EVENTS.length;
  const [step, setStep] = useState(440);
  const [portfolioSlide, setPortfolioSlide] = useState(1);
  const portfolioPrev = () => setPortfolioSlide((i) => Math.max(i - 1, 0));
  const portfolioNext = () => setPortfolioSlide((i) => Math.min(i + 1, SLIDE_COUNT - 1));
  const TEAM_SLIDE_STEP = 291.765;
  const TEAM_SLIDE_COUNT = 8;
  const [teamSlide, setTeamSlide] = useState(0);
  const [teamPerView, setTeamPerView] = useState(2);
  const [teamHover, setTeamHover] = useState(false);
  const teamPrev = () => setTeamSlide((i) => Math.max(i - 1, 0));
  const teamNext = () => setTeamSlide((i) => Math.min(i + 1, TEAM_SLIDE_COUNT - 1));

  useLayoutEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const update = () => {
      const slide = sliderRef.current?.querySelector('.portfolio-slide');
      if (slide) {
        const gap = parseFloat(getComputedStyle(slide).marginRight) || 0;
        setStep(Math.round(slide.getBoundingClientRect().width + gap));
      }
      setPortfolioSlide(mql.matches ? 0 : 1);
    };
    update();
    mql.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      mql.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useLayoutEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const update = () => setTeamPerView(mql.matches ? 1 : 2);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (teamHover) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    const id = setInterval(() => {
      setTeamSlide((i) => (i + teamPerView >= TEAM_SLIDE_COUNT ? 0 : i + teamPerView));
    }, 3500);
    return () => clearInterval(id);
  }, [teamHover, teamPerView]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance Animation
      gsap.from('.gsap-hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // ScrollTrigger Section Animations
      gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--lightgrey)] overflow-hidden">
      <div className="w-layout-blockcontainer page-transition-container w-container" style={{display: "none"}}>
        <div className="page-transition-grid">
          <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
          </div>
          <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
          </div>
          <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel"></div>
            <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
          </div>
          <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
          </div>
          <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
          </div>
          <div className="page-transition-col" style={{translate: "none", rotate: "none", scale: "none", transformOrigin: "50% 0%", transform: "scale(1, 0)"}}>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel"></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="page-transition-pixel" style={{borderColor: "rgb(255, 113, 32)", backgroundColor: "rgb(255, 113, 32)"}}></div>
            <div className="border" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0%, -100%)"}}></div>
          </div>
        </div>
        <div className="w-embed"></div>
      </div>
      <div className="preloader-animation-script w-embed"></div>
      <div id="preloader" className="w-layout-blockcontainer preload-container w-container" style={{display: "none"}}>
        <div className="text-grid">
          <div id="line" data-w-id="67cf7f8d-51c3-0557-3db5-7a1eb93956d7" className="col w-node-_67cf7f8d-51c3-0557-3db5-7a1eb93956d7-ef5b982d" style={{width: "39.6641px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
          </div>
          <div id="line" data-w-id="89fb16af-e6b1-fc17-6ce6-20af0a0bb521" className="col" style={{width: "116.773px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
            <div id="zero1" className="zero-text zero w-node-a77074df-1cd8-d36c-f0d3-7f2e657ccc2e-ef5b982d">
0              <br className="" />
            </div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
          </div>
          <div id="line" data-w-id="2c546267-2314-5a1d-5542-236e910f64dc" className="col" style={{width: "116.773px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
            <div id="zero2" className="zero-text zero">
0              <br className="" />
            </div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
          </div>
          <div id="line" data-w-id="44f65394-95dc-5df3-4c21-cbc11ee732e2" className="col w-node-_44f65394-95dc-5df3-4c21-cbc11ee732e2-ef5b982d" style={{width: "116.773px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div id="zero3" className="zero-text zero">
0              <br className="" />
            </div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
          </div>
          <div id="line" data-w-id="6ee5ee2c-ec0b-2320-b60d-44c179b0b91d" className="col w-node-_6ee5ee2c-ec0b-2320-b60d-44c179b0b91d-ef5b982d" style={{width: "116.773px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
          </div>
          <div id="line" data-w-id="15aa6cc3-e0c2-94c2-5ece-bf72b4df2bcc" className="col w-node-_15aa6cc3-e0c2-94c2-5ece-bf72b4df2bcc-ef5b982d" style={{width: "39.6641px", height: "0%", backgroundColor: "rgb(255, 113, 32)"}}>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
            <div className="pixel"></div>
          </div>
        </div>
      </div>
      <div className="gtm-code w-embed w-iframe">
        {/* Google Tag Manager (noscript) */}
        {/* End Google Tag Manager (noscript) */}
      </div>
      <div className="custom-styles w-embed"></div>
      <div className="body-lines-wrap">
        <div className="body-line left"></div>
        <div className="body-line left-middle"></div>
        <div className="body-line center"></div>
        <div className="body-line right-middle"></div>
        <div className="body-line right"></div>
      </div>
      <SiteHeader />
      <section id="hero-section" className="hero-section">
        <div id="hero-section-container" className="w-layout-blockcontainer container hero-container w-container">
          <div className="hero-wrapper">
            <div className="hero-top">
              <div className="hero-backing hero-backing-top">
                <div className="hero-square"></div>
                <div className="hero-square"></div>
              </div>
              <div className="hero-marquee-wrapper">
                <div className="hero-marquee marquee-animation-start is-animated">
<h1 className="marquee-heading gsap-hero-title">
 ASTRA                  </h1>
                  <h1 className="marquee-heading gsap-hero-title">
 2K26                  </h1>
                </div>
                <div className="hero-marquee marquee-animation-start is-animated">
<h1 className="marquee-heading gsap-hero-title">
 ASTRA                  </h1>
                  <h1 className="marquee-heading gsap-hero-title">
 2K26                  </h1>
                </div>
              </div>
              <div className="hero-top-content">
                <div className="graphic-block hero-graphic-small">
                  <div className="graphic-block-decor graphic-block-decor-top-left"></div>
                  <div className="graphic-block-decor graphic-block-decor-top-right"></div>
                  <div className="graphic-block-decor graphic-block-decor-bottom-right"></div>
                  <div className="graphic-block-decor graphic-block-decor-bottom-left"></div>
                  <img src="data:image/webp;base64,UklGRsISAABXRUJQVlA4WAoAAAAQAAAAawEAawEAQUxQSCMLAAAB8AcA1Oq0/f+dewkhaFNF18Ks7u7u7u6udPCquzFf3ec++nqtznzU3bu96u4agkNyn/NHAyQ3D+fc/4iICYAi/xf5v8j/Rf4vGm1IaPXukwe1qlc+wGIytJS2szf+fvOF5kTE3OynDy8kfzX8dV9jyqfp31noxqyLWzuX8jWcaifmoLtF1sFV3UxGUtXvs9Gz4vKMaMVIUNVSb0RZiqmKV8RcQR0++V89PwPAL6hSl2GLv/vrkj0149G9Mwf2/jB//vgoi658E1GfOadHBavMG3zpiaZhwTNOL6hdSj9TNJ0girsflVcYF52Mbhfao5UDQvVR7wXq+dmS4lyzLkJP318VqYOgc6jzG++oLGtxC3V4t7+vxz4WekPH4Sb8it6O+hQ/vemheqnohVlbIxVexdpQt48nBnrC/At659MJIYxqkYy6PljdA/2El6A4U1VhknUl6v1eebfF3EbvfTqCRz1sqP+jwW5St6E3Z74fyJ/oZPTKDWb39Mn1KsRtZZljXWRDLx3rltIX0duvNVQ40+IWeq2trTs+Qe9//o6FLdYv0JsvhxasfrYE0LE2mCmxNvTuL00FCTmMUhTrFI7USEZvfxFZAHWsUw7oXOLHDutKlOBmU/6qPEBpTlaZ0eIWyvBRuXyZdqA8c6eyIjoZJfm+kp8RmkQwY7zCh0U2lOWL0HxE3UOpZvfjQsw1lKeYkZfysZALPm3Ag3LXUaZ3Q/KoYUfZHjdzwGc7SlWMc2U6jdIVM1QGNMqSC14p5mKJJh98XIEB36BktRGv1HyCMk6ykO/tdNngSTOAOQnl3Jd8i1C6uX0BRghJ3Y8kXunH8sFjaulHKOuFxItFCed03YLSPm8mnfmyjPB6hrwyq5CuqkNKUo8lXUuNWn+plBuL1E6JpFwsuXAU5RLo9THlttErjnL76TWMcKYz5BJtCKfuIVdmRcLBNHJlhVKuQgq17vpTLugyscQMIP0yQatDwbRrr5EquyXQPuQmqT5RiAdbKHWnDFC/dgadskYD/beTSfwewIAuDirdiwEGmpKIJMYDCwc5afS7mQfm30mUXh+YOFSj0EfAxYDTBLodzgYYQ5+MbkBdS9Sg0bVLWhQ9WK+S51s/2gQ3Xn7Mjiie3PvhwynVS6oegneo86gsUDZy9aUszK8j4/SPczu95ae4r8wj2mhTgLKNrqBb7Y//SIivGam6BRbSJsmHMEqcHT2YnX4xcUWbt4MKVPoBZezVgK6hXzjR89kv9m+KbxgVrOYFaymToNKl1jHUrbDd/X7loDdKuyj3jC5XSgJZX3+Ies9KO/zV5NYxls1k0VoBWa0H0TtF2vNzZPnYRBafr5CdN0OBrLFOdjhHAFlbpyA796tkeeMSstNWDajquxPZKeYoZGmdxY8TxYGqgQeRnZnNgaxtsvmxXCWL+RSy8/8hQNYBGjscg4Cs5lPIziQ/unQW7HhQGcgasB+5qc0HutbIYseffoRZity0NQG6mk5xQ3ygEqZSLjeulALCTkZmig5AWMtZbvxgokzFLGY8rAyUjUNeOuOBsmoSM/aYSFPsCS9SqgJp62m8SCzuS5qughfixb+Jc9q/EUyVmcjR7Fu/bBpYO0xVqKFsZ8mrQnt5ede8TtUDSHGBLXnm3jm2flzjaD+FBCEPuOPSkfbvzhV9qoaohV19B4tcCvHizKbJHaIshdgo5LYz99+khEF1I9RCaQa7XArt+dlv49tHmwubhTxzLRy3/1o7vEGYRSk01nLOtTP9/N5l/cqb1cJgHf9cCnH/8MaxZaW3wSBwfaezIrlthgKmbi0ut2+NBRSnaqgy224wIGb2l5iyz3DA9ObygoPGAx4IlNceAwJXyOszI+JlDWnFGRF4wiSrTsKIcM6QVS1DAq+XkVRoiiGR00hSgdcMCVyvykndb0xcssgJthoTWkdJTTQmcIukIlOMiZuBcoLdxoRoLalRwpDAMZKKSDUmVknKlGRMJClygpGaIXFWlVTMM0PiUTFJwQynEZFZUVbWo0aEs4GsoLLNgMDx0oIPjIh4eQXtMyDmyguapxgPSyQGra4YDhNlBuEbhYEGPqNeGAuxcgOo8keaMA7EYNmBX+l28d9cvOc0BLCf9FyagqoNWvDLJbvgXvfCwbVapkns2oMPshnXujBxaQ6sOHDijxftgmNa/ULHtalk3cErku85NF6lRhRSLhXLa71jvz332MGmm76FmWtLQIP+Sw9cz9IYtAeo6BPVKu7zE/dzeLOQDC7NATUGztj1j01wZSAtXKrm4q2HbDp818EPRxWCuFZCYnrN3f6EFw+sZHEZwYwLQFplHfLyJ9p0zWHGeNIUP4u8tIeTJkEw43eFMk1SkJkzgbC+55CZ2RUoM1NwY49KmJhHyM3/AF3Vz5GbmeUJ08XJjhP+dIm6idzUBgJZfbciO0+F0KVlBjvEKCCr/1Fk5wUzXWYJdmgDgaxvpiA7L4SQJSAR2al1AKoqvbP5kexDlnIPkJ1pDYCqyufITkcskLVLDj8SgawhZ5GdZ0vQJQ7ZeacKkDX6KVW0JR/9cSdbeENWfyBr0J9I1gRQgmK6TP/vWZtDX1mzgK7jc+lyPwxeVZTQGr3f/eOfTL08Ggp0LfsACRvnIk9LaIe4b0480ISnDkQDXdWvkbJXrfl6VVHDq3RL2HM23X3OTaWAsN000uDUAuVpKtV89LoDD4UokHgyzASEtV5C2p4t6SaXavDbvRf+dMqWk5c9eVI0kHahRhzR1xMuFShdd/ji3XfSn33eJUIB2lZ7idQ9E+ipPE0lQoC86kEkr9ZXJySe56QPJlu4UPkpElhrxwR1G5L4ZxMPWgoa5TZnQdglJPKnCgPUNYJK2Y0Y0MiOZN6ikC/wMNI5pRL5FgpC4QLqVU5HSh8z0868E0md8ybtuubSSgwjXdj/kdg/mSjXQlDrbhDlRiG1RQ/KxZILF1NuFb3ep9zP9JpHOPUMvXoTDvaTSzSj3Apy5VaiXN1samWUo1zgXWrd96UcbJSYEFI6aSJdG01ef56X0nQgfYkX0korP8ghoReRtIMPZSXmguWyhD4B4r92V1InAwAmOqXzvAr1oJ+cslsBQMAt6XwO5Lf8KqWvfAEA5gjJ5DShH5RPl9DtKHi1zD3J/OHLAGWeJp9O4FJZKqTyrDVwMPCEdH6wuILXn8nENhx4WPuBZJ69CXkqCRJJjgYutrRLRcyGfJbNkMWtFsDIbikyOeabH+VTSayyAisnZcgjtSHku2quDJJrADenaNL40Cd/vtu8zzYd+Okz2SGJ6+FQwPp2b/vCCiydpUnB0RMK6vedd91qAUw1T02RwVa1QFDyvBfZFgNflfZXve9hJLix2ROvSY4G1pbdJ7xMmwFuHap5x60ewN3AtZp3HQ92j89G4Q2rrMBfn3HPvOllHXCz5Q/9JbcAHjc86z0iAdwefU5ntunA5uDN2d5yvJj7IHRjjp62W4HRPk1OCa/I6gmeVJqeFnq51QKYHdz/hjdsAg8HLLLrwrbYCvy2rszQ3f3XPAVQ+U/Nc8nRwPNGibn6yu4BOjT32ZXi9IhtBLBd6X9U6Gm9rx4AIKTrxquau8RKK3Der9PeLN1cLgW6VQNqv388LVMTKPIQ4tnjGztWNgL2V/r4hqaL1Jag89CKtVr3GRX/0brvd7wb37tBqWBFBUPQL/60w3Op8WAYK42+f6x5JCexEhjJin+Dmb/aNTel76yhgPFcpv4n59NRFCAz5a9mfmBQq1EdRs5YvXH/+csv7VcTt87sVbGMCoa3YgkIU1Uo8n+R/4v8X+T/Iv8X+V+PAFZQOCB4BwAAUF8AnQEqbAFsAT6RSJxKpb+vIabWWRvwEglpbuFxqOMtt8cPxD/Tz6p6FfxXb7C5bffb+qAxN889//eZP+B3yQm/ksXd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3WTFgJXv9S9tPEvJibHt+hAjHSn4alq54r3d3d3dOlpV2wgjPiqVto7PxTOGUCDtLl21Kk1lefvKmX2qJQ7JqAID0yfFj1voyu1RwiIiIiBZFTlA+cg0xUENY4MCvtp/PMr2FI2ILJBninlDjK6zyemU25UrTS8MzMzMyPb6CF9Np8TczU3t+HcMsEegUE0lnOppwnvrli5gnabo/qZTdi7u6rDR1wBTh6P/Ew35ehxNUgH4mkbn3iecHuY6tw6tsevUTiHM9XBlLBbEZzTgV0tQYxKqqqh46tZQk6erjSIpJB/2WIggYdDDWjAtAB0By9RLRdCRRZgGuaOB6Ke5V+pmZmYFMS1Ezp9D34YzqphDgpxnVLO6Dic/hx72x+RObMOWHWZtYxptL/ZWlfinjdgonTAqgBd419qqOJZngTmqvviqe1Rilg37+IAMZvs9ZZ7IiFfbyHXW4+X9qpcn6g57D2fSyj+NynJrgA3z9aumoOOqizTYQulhTAcQ9W/Y6AqNKMWIf12Ow3/4+yc1wiIFwFfkUPMFDNnHvW8/02PcSOHv6/IIrgrFOaxsH1IA22c2JERCv7rEpkElw7O3V0WRyrQEY/sLjibxtg1Rphf9zbAMLNBMtlI2xd3dV54KCj21Zu++4usgIbYb0yYQBF/5U4eBuLLgiZOVq04g3N3d3ZLeI7Hbw5ULWhKT2ntFGeKndDI1VRYqHDasK3VGjgtI0Wr3dPIlSp+PVW4y1lQfGNGzX+q87/Jjm7mJmoOCZC3R9I0Wr3d1Pj4MuRncn3K8cp/ceaOooxOBd1zgZ0ESPjcdNU1it5LvyIiIiIiIXnanOUX5tN3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3dkAAP7+pJdRgAAjYgx5xG5aPSbgqxdOQv1Fdakj6qBz3/cWGRkWWzVHZIPmHdK6pXhjPW5Xoev/OFvdKiiGl6ws0aCCzz6rYFKSdlA8S5FVLb5iwjDAI2G4bYxLdM0mhBO/J0YGWSTDX/PT+MmIzG4vVD+Rk56DOTx9b05JPQgAg8DLY0zhZco64fECOodMjVvZjhIZCYzYMDi7o9rVnF6/0FxVnYbGebxy3PJvuPflhMm1aMHSpLDwyPLhMRfTikWNYXVtXlzJeF9meZW+Y2sQPmyxI7c5zpU9SDfh46mUMdlc1gr8eCN0BJKgvhugegtmIUcZYN8iMTKG2ggBcBo93KfWbFoBNSjHVOaZKSCj9wZIyrarJMUa/3HzbSBls0UYbRY+JnONwQOzKqBCnfx8yHuRSLk/Zcv8y2t25ETK9DajhsxbbjPa2MKqaNaRX5IkU8LNpvdIreuvG5NdV6nt1dRGQIj4MzDW/e+RTOKtaHcGWLqGcV2kx+pXhTrmn2DcPB77eMsHFhMcJMAE+MVdgbUWjlZnkvxraIAbzcUs1rFLCrbpmgENjXhyHc95XUTaoWqao5l0lpA28dlgdEpIKnrIAq0CfVvd1+1x/j+vEzP+TFO6ZH8ah9NbPvZKyI8EEXqHm1/rDyOvXwjAFBYTl8h2/1vY/L4fE2uUBwS+iNKh4y03txA+GX64cCPb9X5m9T3bJtfLFHjDrdMSRiEh7q2YSzUzEAs9gAAGW40TOv/YXCcE0xQCi5f9owjA1lrVvT/Ou2A2Y/T6lROxDLH9vJkV50Bd83aLPnOFu0ufC2sUuV6flYubaofhsFb6bW9tq+/HP3QgtstVrA4pNb8FKA3GNsuUY9jY7bGocKztNUSDKmKacMw62sBquXYBjau9vaGvMyhpWmMtlzGHJ+xl2CECqT/NSiA+1Fl9VwrWkTSdOI04K7tuFt/d2XLn2xdr0kZyLgutFjfUL4X6fT+MdxlOdoDzFWzPUCwlxz0ZMwtpgkXg4HmyRiZPZftN2qxSV4Us2ORysOQueFBpxtajchLu3JJe2FDCJqJmG2Tb6y+NgAK1dl2a/7m9XaTPyQtAzly7vYMP8EdDFDE/0CAjk2OeGCaWFixLGYm1pheuJFwtajG2RLnmm4ib188juPxGBrKmX6uu2m54RygPXG3JNLH3mPC++MxDSlav+uuQ9+kHW+qL7xCaTo7fAYE5Bk4MZnKs+mUDSkPjJutFzxnYoRoo0eP1b6QLEw5Ib1aKtqXJutne5o0pM+AOx7zPZ7b/HrNXK822DQjY0kjugnbNJ//q8j/j3lgBwtGKKerx+Joi1XXJ5o2JJfGaQxzvhNlQBKk9UcfsgX+Z9+YeU84MEesPXSOBqyuOxDTv4sRagwt/QfoG6zbFdHWYKK5PikcygMD/DX0UYk9CfAbzLCGn2EHC4s9/wg9vIH/sti5Oc+fAsLIAsQ3apiv5aqZtl5+dnoy4rz/Av+FQ/+qY+6YgHT5RZ+1101vmACg4Dw9kgAAAAAAAAA==" loading="lazy" alt="" className="graphic-block-image" />
                </div>
                <div className="hero-square hero-square-top-right hero-square-mobile"></div>
                <div className="hero-square hero-square-top-left hero-square-mobile"></div>
                <div className="hero-backing">
                  <div className="hero-square"></div>
                  <div id="w-node-_30e76485-ae6c-05d7-60f5-023e5c311de5-ef5b982d" className="w-layout-hflex hero-backing-text">
                    <div className="hero-backing-item">
 ASTRA                      <br className="" />
                    </div>
                    <div className="hero-backing-item">
 2K26                    </div>
                  </div>
                  <div id="w-node-bf49c4bc-c533-46a4-5e65-738d863c031d-ef5b982d" className="hero-square"></div>
                </div>
                <div className="hero-video w-embed">
                  <video autoPlay loop muted playsInline className="">
                    <source src="https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/video/Labs/LABS_hero_SAFARI_HEVC.mp4" type="video/mp4; codecs=hvc1" className="" />
                    <source src="https://chaingpt-web.s3.us-east-2.amazonaws.com/assets/video/Labs/LABS_hero_CHROME_VP9.webm" type="video/webm" className="" />
                  </video>
                </div>
              </div>
            </div>
            <div className="hero-main">
              <div className="hero-info">
                <div className="hero-description">
 Backing the very best web3 builders -transforming visionary ideas into real-world growth.                </div>
              </div>
              <div className="hero-bottom-space"></div>
              <div className="graphic-block hero-graphic-block">
                <div className="graphic-block-decor graphic-block-decor-top-left"></div>
                <div className="graphic-block-decor graphic-block-decor-top-right"></div>
                <div className="graphic-block-decor graphic-block-decor-bottom-right"></div>
                <div className="graphic-block-decor graphic-block-decor-bottom-left"></div>
                <img src="data:image/webp;base64,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" loading="lazy" alt="" className="graphic-block-image" />
              </div>
            </div>
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MyIgaGVpZ2h0PSI0MyIgZmlsbD0iI0Y2RjZGNiIvPgo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjQzIiBoZWlnaHQ9IjQzIiBzdHJva2U9IiM5RTlFOUUiLz4KPHBhdGggZD0iTTE4LjM4NTMgMjQuOTE3Nkw5LjAwMDA4IDM0LjMwMjlMOS42OTcxNyAzNUwxOS4wODI1IDI1LjYxNDdIMjQuOTE3NUwzNC4zMDI4IDM1TDM0Ljk5OTkgMzQuMzAyOUwyNS42MTQ3IDI0LjkxNzdWMTkuMDgyNEwzNSA5LjY5NzA5TDM0LjMwMjkgOUwyNC45MTc3IDE4LjM4NTNIMTkuMDgyM0w5LjY5NzA4IDlMOSA5LjY5NzA5TDE4LjM4NTMgMTkuMDgyNVYyNC45MTc2WiIgZmlsbD0iIzlFOUU5RSIvPgo8L3N2Zz4K" loading="lazy" width={44} height={44} alt="" id="hero-decor" className="hero-decor-1" />
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MyIgaGVpZ2h0PSI0MyIgZmlsbD0iI0Y2RjZGNiIvPgo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjQzIiBoZWlnaHQ9IjQzIiBzdHJva2U9IiM5RTlFOUUiLz4KPHBhdGggZD0iTTIyLjAwMDMgMjUuOTI4NkMyNC4xNjk5IDI1LjkyODYgMjUuOTI4OCAyNC4xNjk3IDI1LjkyODggMjJDMjUuOTI4OCAxOS44MzAzIDI0LjE2OTkgMTguMDcxNCAyMi4wMDAzIDE4LjA3MTRDMTkuODMwNiAxOC4wNzE0IDE4LjA3MTcgMTkuODMwMyAxOC4wNzE3IDIyQzE4LjA3MTcgMjQuMTY5NyAxOS44MzA2IDI1LjkyODYgMjIuMDAwMyAyNS45Mjg2WiIgZmlsbD0iIzlFOUU5RSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyIDExQzE1LjkyNDkgMTEgMTEgMTUuOTI0OSAxMSAyMkMxMSAyOC4wNzUxIDE1LjkyNDkgMzMgMjIgMzNDMjguMDc1MSAzMyAzMyAyOC4wNzUxIDMzIDIyQzMzIDE1LjkyNDkgMjguMDc1MSAxMSAyMiAxMVpNMTIuMDQ3NiAyMkMxMi4wNDc2IDE2LjUwMzUgMTYuNTAzNSAxMi4wNDc2IDIyIDEyLjA0NzZDMjcuNDk2NSAxMi4wNDc2IDMxLjk1MjQgMTYuNTAzNSAzMS45NTI0IDIyQzMxLjk1MjQgMjcuNDk2NSAyNy40OTY1IDMxLjk1MjQgMjIgMzEuOTUyNEMxNi41MDM1IDMxLjk1MjQgMTIuMDQ3NiAyNy40OTY1IDEyLjA0NzYgMjJaIiBmaWxsPSIjOUU5RTlFIi8+Cjwvc3ZnPgo=" loading="lazy" width={44} height={44} alt="" id="hero-decor" className="hero-decor-2" />
          </div>
        </div>
      </section>
      <CountdownStrip />
      <figure id="portfolio-section" className="portfolio-section">
        <div className="container">
          <div className="portfolio-content">
            <div className="portfolio-top">
              <div className="portfolio-main">
                <h2 anim-trigger="" className="h2 h2-lg gsap-fade-up" style={{textTransform: "uppercase", textAlign: "left", whiteSpace: "nowrap"}}>
                    <div style={{position: "relative", display: "inline-block"}} className="">
                      <div style={{position: "relative", display: "inline-block"}} className="">
O                      </div>
                      <div style={{position: "relative", display: "inline-block"}} className="">
u                      </div>
                      <div style={{position: "relative", display: "inline-block"}} className="">
r                      </div>
                    </div>
                    <div style={{position: "relative", display: "block"}} className="">
                      <div style={{position: "relative", display: "inline-block"}} className="">
e                      </div>
                      <div style={{position: "relative", display: "inline-block"}} className="">
v                      </div>
                      <div style={{position: "relative", display: "inline-block"}} className="">
e                      </div>
                      <div style={{position: "relative", display: "inline-block"}} className="">
n                      </div>
                      <div style={{position: "relative", display: "inline-block"}} className="">
t                      </div>
                      <div style={{position: "relative", display: "inline-block"}} className="">
s                      </div>
                    </div>
                </h2>
              </div>
              <a href="/events" className="portfolio-all w-inline-block">
                <div className="portfolio-info">
                  <div className="portfolio-projects">
All Events                  </div>
                  <div portfolio-count="" className="portfolio-count">
{EVENTS.length}                  </div>
                </div>
                <address className="portfolio-link portfolio-item-link--sm">
                  <img width={23} height={23} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY0ODQgNC41MjE3M0MxMS4xMDU1IDQuNTIxNzMgMTAuNjY1NCA0Ljk2MTgzIDEwLjY2NTQgNS41MDQ3MlY3LjQ3MDY5QzEwLjY2NTQgOC4wMTM1OCAxMS4xMDU1IDguNDUzNjggMTEuNjQ4NCA4LjQ1MzY4SDEzLjEyMjlDMTMuNjY1OCA4LjQ1MzY4IDE0LjEwNTggOC44OTM3NyAxNC4xMDU4IDkuNDM2NjZWMTAuOTExMUMxNC4xMDU4IDExLjA1MDkgMTQuMTM1IDExLjE4MzkgMTQuMTg3NiAxMS4zMDQzSDUuNjUyMTZDNS4wMjc4NCAxMS4zMDQzIDQuNTIxNzMgMTEuODEwNSA0LjUyMTczIDEyLjQzNDhWMTMuNTY1MkM0LjUyMTczIDE0LjE4OTUgNS4wMjc4NCAxNC42OTU2IDUuNjUyMTYgMTQuNjk1NkgxMy44NTAzQzEzLjcwMzIgMTQuODY3NSAxMy42MTQ0IDE1LjA5MDcgMTMuNjE0NCAxNS4zMzQ2VjE2LjgwOTFDMTMuNjE0NCAxNy4zNTIgMTMuMTc0MyAxNy43OTIxIDEyLjYzMTQgMTcuNzkyMUgxMS4xNTY5QzEwLjYxNCAxNy43OTIxIDEwLjE3MzkgMTguMjMyMSAxMC4xNzM5IDE4Ljc3NVYyMC43NDFDMTAuMTczOSAyMS4yODM5IDEwLjYxNCAyMS43MjQgMTEuMTU2OSAyMS43MjRIMTMuMTIyOUMxMy42NjU4IDIxLjcyNCAxNC4xMDU4IDIxLjI4MzkgMTQuMTA1OCAyMC43NDFWMTkuMjY2NUMxNC4xMDU4IDE4LjcyMzYgMTQuNTQ1OSAxOC4yODM1IDE1LjA4ODggMTguMjgzNUgxNi41NjMzQzE3LjEwNjIgMTguMjgzNSAxNy41NDYzIDE3Ljg0MzQgMTcuNTQ2MyAxNy4zMDA2VjE2LjMxNzZDMTcuNTQ2MyAxNS43NzQ3IDE3Ljk4NjQgMTUuMzM0NiAxOC41MjkzIDE1LjMzNDZIMjAuNDk1M0MyMS4wMzgyIDE1LjMzNDYgMjEuNDc4MyAxNC44OTQ1IDIxLjQ3ODMgMTQuMzUxNlYxMi4zODU2QzIxLjQ3ODMgMTIuMTU2MiAyMS4zOTk2IDExLjk0NTEgMjEuMjY3OCAxMS43Nzc4QzIxLjA2MjggMTEuNDkxMiAyMC43MjcxIDExLjMwNDMgMjAuMzQ3OCAxMS4zMDQzSDE4LjU5MThDMTguMjYzOSAxMS4xNDUgMTguMDM3OCAxMC44MDg3IDE4LjAzNzggMTAuNDE5NlY4Ljk0NTE3QzE4LjAzNzggOC40MDIyOCAxNy41OTc3IDcuOTYyMTggMTcuMDU0OCA3Ljk2MjE4SDE1LjU4MDNDMTUuMDM3NCA3Ljk2MjE4IDE0LjU5NzMgNy41MjIwOCAxNC41OTczIDYuOTc5MlY1LjUwNDcyQzE0LjU5NzMgNC45NjE4MyAxNC4xNTcyIDQuNTIxNzMgMTMuNjE0NCA0LjUyMTczSDExLjY0ODRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" loading="lazy" className="portfolio-item-arrow item-arrow--hover-out" />
                  <img width={23} height={23} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY0ODQgNC41MjE3M0MxMS4xMDU1IDQuNTIxNzMgMTAuNjY1NCA0Ljk2MTgzIDEwLjY2NTQgNS41MDQ3MlY3LjQ3MDY5QzEwLjY2NTQgOC4wMTM1OCAxMS4xMDU1IDguNDUzNjggMTEuNjQ4NCA4LjQ1MzY4SDEzLjEyMjlDMTMuNjY1OCA4LjQ1MzY4IDE0LjEwNTggOC44OTM3NyAxNC4xMDU4IDkuNDM2NjZWMTAuOTExMUMxNC4xMDU4IDExLjA1MDkgMTQuMTM1IDExLjE4MzkgMTQuMTg3NiAxMS4zMDQzSDUuNjUyMTZDNS4wMjc4NCAxMS4zMDQzIDQuNTIxNzMgMTEuODEwNSA0LjUyMTczIDEyLjQzNDhWMTMuNTY1MkM0LjUyMTczIDE0LjE4OTUgNS4wMjc4NCAxNC42OTU2IDUuNjUyMTYgMTQuNjk1NkgxMy44NTAzQzEzLjcwMzIgMTQuODY3NSAxMy42MTQ0IDE1LjA5MDcgMTMuNjE0NCAxNS4zMzQ2VjE2LjgwOTFDMTMuNjE0NCAxNy4zNTIgMTMuMTc0MyAxNy43OTIxIDEyLjYzMTQgMTcuNzkyMUgxMS4xNTY5QzEwLjYxNCAxNy43OTIxIDEwLjE3MzkgMTguMjMyMSAxMC4xNzM5IDE4Ljc3NVYyMC43NDFDMTAuMTczOSAyMS4yODM5IDEwLjYxNCAyMS43MjQgMTEuMTU2OSAyMS43MjRIMTMuMTIyOUMxMy42NjU4IDIxLjcyNCAxNC4xMDU4IDIxLjI4MzkgMTQuMTA1OCAyMC43NDFWMTkuMjY2NUMxNC4xMDU4IDE4LjcyMzYgMTQuNTQ1OSAxOC4yODM1IDE1LjA4ODggMTguMjgzNUgxNi41NjMzQzE3LjEwNjIgMTguMjgzNSAxNy41NDYzIDE3Ljg0MzQgMTcuNTQ2MyAxNy4zMDA2VjE2LjMxNzZDMTcuNTQ2MyAxNS43NzQ3IDE3Ljk4NjQgMTUuMzM0NiAxOC41MjkzIDE1LjMzNDZIMjAuNDk1M0MyMS4wMzgyIDE1LjMzNDYgMjEuNDc4MyAxNC44OTQ1IDIxLjQ3ODMgMTQuMzUxNlYxMi4zODU2QzIxLjQ3ODMgMTIuMTU2MiAyMS4zOTk2IDExLjk0NTEgMjEuMjY3OCAxMS43Nzc4QzIxLjA2MjggMTEuNDkxMiAyMC43MjcxIDExLjMwNDMgMjAuMzQ3OCAxMS4zMDQzSDE4LjU5MThDMTguMjYzOSAxMS4xNDUgMTguMDM3OCAxMC44MDg3IDE4LjAzNzggMTAuNDE5NlY4Ljk0NTE3QzE4LjAzNzggOC40MDIyOCAxNy41OTc3IDcuOTYyMTggMTcuMDU0OCA3Ljk2MjE4SDE1LjU4MDNDMTUuMDM3NCA3Ljk2MjE4IDE0LjU5NzMgNy41MjIwOCAxNC41OTczIDYuOTc5MlY1LjUwNDcyQzE0LjU5NzMgNC45NjE4MyAxNC4xNTcyIDQuNTIxNzMgMTMuNjE0NCA0LjUyMTczSDExLjY0ODRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" loading="lazy" className="portfolio-item-arrow item-arrow--hover-in" />
                </address>
              </a>
            </div>
            <div className="portfolio-background">
              <img src="/event%20bg.webp" loading="lazy" alt="" className="image-3" />
            </div>
            <div className="portfolio-illustration-mobile">
              <img src="/event%20bg.webp" loading="lazy" alt="" className="portfolio-illustration-img-mob" />
            </div>
          </div>
          <div className="portfolio-bottom">
            <div className="portfolio-buttons">
              <div portfolio-slider-prev="" className="portfolio-button" onClick={portfolioPrev} tabIndex={0} role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-dafc49337be281068" aria-disabled={portfolioSlide === 0}>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjMyMDggMi45MTQyOUMxNC4zMjA4IDIuNDA5MzQgMTMuOTExNSAyIDEzLjQwNjUgMkgxMS41NzhDMTEuMDczIDIgMTAuNjYzNyAyLjQwOTM0IDEwLjY2MzcgMi45MTQyOVY0LjI4NTcxQzEwLjY2MzcgNC43OTA2NiAxMC4yNTQzIDUuMiA5Ljc0OTM4IDUuMkg4LjM3Nzk1QzcuODczMDEgNS4yIDcuNDYzNjcgNS42MDkzNCA3LjQ2MzY3IDYuMTE0MjlWNy40ODU3MUM3LjQ2MzY3IDcuOTkwNjYgNy4wNTQzMyA4LjQgNi41NDkzOCA4LjRINS4xNzc5NUM0LjY3MzAxIDguNCA0LjI2MzY3IDguODA5MzQgNC4yNjM2NyA5LjMxNDI5VjExLjE0MjlDNC4yNjM2NyAxMS42NDc4IDQuNjczMDEgMTIuMDU3MSA1LjE3Nzk1IDEyLjA1NzFINy4wMDY1M0M3LjUxMTQ3IDEyLjA1NzEgNy45MjA4MSAxMi40NjY1IDcuOTIwODEgMTIuOTcxNFYxMy44ODU3QzcuOTIwODEgMTQuMzkwNyA4LjMzMDE1IDE0LjggOC44MzUxIDE0LjhIMTAuMjA2NUMxMC43MTE1IDE0LjggMTEuMTIwOCAxNS4yMDkzIDExLjEyMDggMTUuNzE0M1YxNy4wODU3QzExLjEyMDggMTcuNTkwNyAxMS41MzAyIDE4IDEyLjAzNTEgMThIMTMuODYzN0MxNC4zNjg2IDE4IDE0Ljc3OCAxNy41OTA3IDE0Ljc3OCAxNy4wODU3VjE1LjI1NzFDMTQuNzc4IDE0Ljc1MjIgMTQuMzY4NiAxNC4zNDI5IDEzLjg2MzcgMTQuMzQyOUgxMi40OTIyQzExLjk4NzMgMTQuMzQyOSAxMS41NzggMTMuOTMzNSAxMS41NzggMTMuNDI4NlYxMi4wNTcxQzExLjU3OCAxMS41NTIyIDExLjE2ODYgMTEuMTQyOSAxMC42NjM3IDExLjE0MjlIOC44MzUxQzguMzMwMTUgMTEuMTQyOSA3LjkyMDgxIDEwLjczMzUgNy45MjA4MSAxMC4yMjg2VjkuNzcxNDNDNy45MjA4MSA5LjI2NjQ4IDguMzMwMTUgOC44NTcxNCA4LjgzNTEgOC44NTcxNEgxMC4yMDY1QzEwLjcxMTUgOC44NTcxNCAxMS4xMjA4IDguNDQ3OCAxMS4xMjA4IDcuOTQyODZWNi41NzE0M0MxMS4xMjA4IDYuMDY2NDggMTEuNTMwMiA1LjY1NzE0IDEyLjAzNTEgNS42NTcxNEgxMy40MDY1QzEzLjkxMTUgNS42NTcxNCAxNC4zMjA4IDUuMjQ3OCAxNC4zMjA4IDQuNzQyODZWMi45MTQyOVoiIGZpbGw9IiMwRTBFMEUiLz4KPC9zdmc+Cg==" loading="lazy" alt="" className="portfolio-button-image" />
              </div>
              <div portfolio-slider-next="" className="portfolio-button portfolio-button-next" onClick={portfolioNext} tabIndex={0} role="button" aria-label="Next slide" aria-controls="swiper-wrapper-dafc49337be281068" aria-disabled={portfolioSlide === SLIDE_COUNT - 1}>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNjc5MTkgMi45MTQyOUM1LjY3OTE5IDIuNDA5MzQgNi4wODg1MyAyIDYuNTkzNDcgMkg4LjQyMjA1QzguOTI2OTkgMiA5LjMzNjMzIDIuNDA5MzQgOS4zMzYzMyAyLjkxNDI5VjQuMjg1NzFDOS4zMzYzMyA0Ljc5MDY2IDkuNzQ1NjcgNS4yIDEwLjI1MDYgNS4ySDExLjYyMkMxMi4xMjcgNS4yIDEyLjUzNjMgNS42MDkzNCAxMi41MzYzIDYuMTE0MjlWNy40ODU3MUMxMi41MzYzIDcuOTkwNjYgMTIuOTQ1NyA4LjQgMTMuNDUwNiA4LjRIMTQuODIyQzE1LjMyNyA4LjQgMTUuNzM2MyA4LjgwOTM0IDE1LjczNjMgOS4zMTQyOVYxMS4xNDI5QzE1LjczNjMgMTEuNjQ3OCAxNS4zMjcgMTIuMDU3MSAxNC44MjIgMTIuMDU3MUgxMi45OTM1QzEyLjQ4ODUgMTIuMDU3MSAxMi4wNzkyIDEyLjQ2NjUgMTIuMDc5MiAxMi45NzE0VjEzLjg4NTdDMTIuMDc5MiAxNC4zOTA3IDExLjY2OTggMTQuOCAxMS4xNjQ5IDE0LjhIOS43OTM0N0M5LjI4ODUzIDE0LjggOC44NzkxOSAxNS4yMDkzIDguODc5MTkgMTUuNzE0M1YxNy4wODU3QzguODc5MTkgMTcuNTkwNyA4LjQ2OTg1IDE4IDcuOTY0OSAxOEg2LjEzNjMzQzUuNjMxMzkgMTggNS4yMjIwNSAxNy41OTA3IDUuMjIyMDUgMTcuMDg1N1YxNS4yNTcxQzUuMjIyMDUgMTQuNzUyMiA1LjYzMTM5IDE0LjM0MjkgNi4xMzYzMyAxNC4zNDI5SDcuNTA3NzZDOC4wMTI3MSAxNC4zNDI5IDguNDIyMDUgMTMuOTMzNSA4LjQyMjA1IDEzLjQyODZWMTIuMDU3MUM4LjQyMjA1IDExLjU1MjIgOC44MzEzOSAxMS4xNDI5IDkuMzM2MzMgMTEuMTQyOUgxMS4xNjQ5QzExLjY2OTggMTEuMTQyOSAxMi4wNzkyIDEwLjczMzUgMTIuMDc5MiAxMC4yMjg2VjkuNzcxNDNDMTIuMDc5MiA5LjI2NjQ4IDExLjY2OTggOC44NTcxNCAxMS4xNjQ5IDguODU3MTRIOS43OTM0N0M5LjI4ODUzIDguODU3MTQgOC44NzkxOSA4LjQ0NzggOC44NzkxOSA3Ljk0Mjg2VjYuNTcxNDNDOC44NzkxOSA2LjA2NjQ4IDguNDY5ODUgNS42NTcxNCA3Ljk2NDkgNS42NTcxNEg2LjU5MzQ3QzYuMDg4NTMgNS42NTcxNCA1LjY3OTE5IDUuMjQ3OCA1LjY3OTE5IDQuNzQyODZWMi45MTQyOVoiIGZpbGw9IiMwRTBFMEUiLz4KPC9zdmc+Cg==" loading="lazy" alt="" className="portfolio-button-image" />
              </div>
            </div>
            <div className="portfolio-slider">
<div portfolio-slider-init="" className="swiper swiper-portfolio w-dyn-list swiper-initialized swiper-horizontal">
                  <div ref={sliderRef} role="list" className="swiper-wrapper w-dyn-items" id="swiper-wrapper-dafc49337be281068" aria-live="off" style={{transitionDuration: "600ms", transform: `translate3d(-${portfolioSlide * step}px, 0px, 0px)`, transitionDelay: "0ms"}}>
{EVENTS.map((event, i) => (
                  <div role="group" className="swiper-slide portfolio-slide w-dyn-item" aria-label={`${i + 1} / ${EVENTS.length}`} key={event.slug} style={{ width: '424px', marginRight: '16px' }}>
                    <Link portfolio-card="" href={`/events/${event.slug}`} className="portfolio-item w-inline-block">
                      <div className="portfolio-item-top">
                        <div className="portfolio-item-category">
                          {event.category}
                        </div>
                        <div className="events-slide-title">{event.name}</div>
                      </div>
                      <div className="portfolio-item-bottom">
                        <div className="portfolio-item-list">
                          <div className="portfolio-item-info">
                            <div className="portfolio-item-info-title">
                              {EVENT_ENTRY_FEE}
                            </div>
                            <div className="portfolio-item-info-descr">
                              Entry Fee
                            </div>
                          </div>
                          <div className="portfolio-item-info">
                            <div className="portfolio-item-info-title">
                              {event.teamSize}
                            </div>
                            <div className="portfolio-item-info-descr">
                              Team Size
                            </div>
                          </div>
                          <div className="portfolio-item-info hide-in-tablet">
                            <div className="portfolio-item-info-title">
                              {event.category}
                            </div>
                            <div className="portfolio-item-info-descr">
                              Type
                            </div>
                          </div>
                          <div className="portfolio-item-info">
                            <div className="portfolio-item-info-title">
                              {event.date}
                            </div>
                            <div className="portfolio-item-info-descr">
                              Date
                            </div>
                          </div>
                        </div>
                        <div className="portfolio-item-link-2 portfolio-item-link">
                          <img width={23} height={23} alt="" src={ARROW_SVG} loading="lazy" className="portfolio-item-arrow item-arrow--hover-out" />
                          <img width={23} height={23} alt="" src={ARROW_SVG} loading="lazy" className="portfolio-item-arrow item-arrow--hover-in" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}

                </div>
                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
              </div>
            </div>
          </div>
        </div>
      </figure>
      <section id="team-section" className="team-section">
        <div className="w-layout-blockcontainer container w-container">
          <div className="team-slider-row">
            <div className="section-heading sh-grid-2-1-1">
              <div className="section-title st-our-team">
                <h2 anim-trigger="" className="h2 h2-lg gsap-fade-up" style={{textAlign: "left"}}>
                  <div style={{position: "relative", display: "inline-block"}} className="">
                    <div style={{position: "relative", display: "inline-block"}} className="">
O                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
U                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
R                    </div>
                  </div>
                  <div style={{position: "relative", display: "block", marginTop: "0.25em", textAlign: "left"}} className="">
                    <div style={{position: "relative", display: "inline-block"}} className="">
V                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
I                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
S                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
I                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
O                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
N                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
A                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
R                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
I                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
E                    </div>
                    <div style={{position: "relative", display: "inline-block"}} className="">
S                    </div>
                  </div>
                </h2>
              </div>
              <div className="section-heading-descr shd-paddings-l hide-in-tablet">
                <div className="section-heading-descr-inner">
                  <div className="section-descr-info">
                    <div className="section-descr-info-decor"></div>
                    <h3 className="section-descr-title gsap-fade-up">
Built by Founders                      <br className="" />
For Founders                    </h3>
                  </div>
                </div>
              </div>
              <div className="section-heading-controls">
                <div className="team-nav">
                  <div id="hovered-container-orange-arrow" team-slider-prev="" className={teamSlide === 0 ? "team-nav-button swiper-button-disabled" : "team-nav-button"} tabIndex={teamSlide === 0 ? -1 : 0} role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-6897a10e55610441b7" aria-disabled={teamSlide === 0} onClick={teamPrev}>
                    <div id="hovered-orange-arrow" className="team-nav-image w-embed">
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                        <path d="M14.3212 2.91429C14.3212 2.40934 13.9118 2 13.4069 2H11.5783C11.0734 2 10.664 2.40934 10.664 2.91429V4.28571C10.664 4.79066 10.2547 5.2 9.74975 5.2H8.37832C7.87337 5.2 7.46404 5.60934 7.46404 6.11429V7.48571C7.46404 7.99066 7.0547 8.4 6.54975 8.4H5.17832C4.67338 8.4 4.26404 8.80934 4.26404 9.31429V11.1429C4.26404 11.6478 4.67338 12.0571 5.17832 12.0571H7.00689C7.51184 12.0571 7.92118 12.4665 7.92118 12.9714V13.8857C7.92118 14.3907 8.33052 14.8 8.83546 14.8H10.2069C10.7118 14.8 11.1212 15.2093 11.1212 15.7143V17.0857C11.1212 17.5907 11.5305 18 12.0355 18H13.864C14.369 18 14.7783 17.5907 14.7783 17.0857V15.2571C14.7783 14.7522 14.369 14.3429 13.864 14.3429H12.4926C11.9877 14.3429 11.5783 13.9335 11.5783 13.4286V12.0571C11.5783 11.5522 11.169 11.1429 10.664 11.1429H8.83546C8.33052 11.1429 7.92118 10.7335 7.92118 10.2286V9.77143C7.92118 9.26648 8.33052 8.85714 8.83546 8.85714H10.2069C10.7118 8.85714 11.1212 8.4478 11.1212 7.94286V6.57143C11.1212 6.06648 11.5305 5.65714 12.0355 5.65714H13.4069C13.9118 5.65714 14.3212 5.2478 14.3212 4.74286V2.91429Z" fill="currentColor" className=""></path>
                      </svg>
                    </div>
                  </div>
                  <div id="hovered-container-orange-arrow" team-slider-next="" className={teamSlide === TEAM_SLIDE_COUNT - 1 ? "team-nav-button swiper-button-disabled" : "team-nav-button"} tabIndex={teamSlide === TEAM_SLIDE_COUNT - 1 ? -1 : 0} role="button" aria-label="Next slide" aria-controls="swiper-wrapper-6897a10e55610441b7" aria-disabled={teamSlide === TEAM_SLIDE_COUNT - 1} onClick={teamNext}> 
                    <div id="hovered-orange-arrow" className="team-nav-image w-embed">
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                        <path d="M5.67882 2.91429C5.67882 2.40934 6.08816 2 6.59311 2H8.42168C8.92663 2 9.33597 2.40934 9.33597 2.91429V4.28571C9.33597 4.79066 9.7453 5.2 10.2503 5.2H11.6217C12.1266 5.2 12.536 5.60934 12.536 6.11429V7.48571C12.536 7.99066 12.9453 8.4 13.4503 8.4H14.8217C15.3266 8.4 15.736 8.80934 15.736 9.31429V11.1429C15.736 11.6478 15.3266 12.0571 14.8217 12.0571H12.9931C12.4882 12.0571 12.0788 12.4665 12.0788 12.9714V13.8857C12.0788 14.3907 11.6695 14.8 11.1645 14.8H9.79311C9.28816 14.8 8.87882 15.2093 8.87882 15.7143V17.0857C8.87882 17.5907 8.46948 18 7.96454 18H6.13597C5.63102 18 5.22168 17.5907 5.22168 17.0857V15.2571C5.22168 14.7522 5.63102 14.3429 6.13597 14.3429H7.50739C8.01234 14.3429 8.42168 13.9335 8.42168 13.4286V12.0571C8.42168 11.5522 8.83102 11.1429 9.33597 11.1429H11.1645C11.6695 11.1429 12.0788 10.7335 12.0788 10.2286V9.77143C12.0788 9.26648 11.6695 8.85714 11.1645 8.85714H9.79311C9.28816 8.85714 8.87882 8.4478 8.87882 7.94286V6.57143C8.87882 6.06648 8.46948 5.65714 7.96454 5.65714H6.59311C6.08816 5.65714 5.67882 5.2478 5.67882 4.74286V2.91429Z" fill="currentColor" className=""></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-graphic">
                <div className="graphic-block graphic-block-alt">
                  <div className="graphic-block-decor graphic-block-decor-top-left"></div>
                  <div className="graphic-block-decor graphic-block-decor-top-right"></div>
                  <div className="graphic-block-decor graphic-block-decor-bottom-right"></div>
                  <div className="graphic-block-decor graphic-block-decor-bottom-left"></div>
                  <img src="data:image/webp;base64,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" loading="lazy" width={364} height={364} alt="" className="graphic-block-image" />
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MyIgaGVpZ2h0PSI0MyIgZmlsbD0iI0Y2RjZGNiIvPgo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjQzIiBoZWlnaHQ9IjQzIiBzdHJva2U9IiNGNkY2RjYiLz4KPHBhdGggZD0iTTIyLjAwMDMgMjUuOTI4NkMyNC4xNjk5IDI1LjkyODYgMjUuOTI4OCAyNC4xNjk3IDI1LjkyODggMjJDMjUuOTI4OCAxOS44MzAzIDI0LjE2OTkgMTguMDcxNCAyMi4wMDAzIDE4LjA3MTRDMTkuODMwNiAxOC4wNzE0IDE4LjA3MTcgMTkuODMwMyAxOC4wNzE3IDIyQzE4LjA3MTcgMjQuMTY5NyAxOS44MzA2IDI1LjkyODYgMjIuMDAwMyAyNS45Mjg2WiIgZmlsbD0iIzlFOUU5RSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyIDExQzE1LjkyNDkgMTEgMTEgMTUuOTI0OSAxMSAyMkMxMSAyOC4wNzUxIDE1LjkyNDkgMzMgMjIgMzNDMjguMDc1MSAzMyAzMyAyOC4wNzUxIDMzIDIyQzMzIDE1LjkyNDkgMjguMDc1MSAxMSAyMiAxMVpNMTIuMDQ3NiAyMkMxMi4wNDc2IDE2LjUwMzUgMTYuNTAzNSAxMi4wNDc2IDIyIDEyLjA0NzZDMjcuNDk2NSAxMi4wNDc2IDMxLjk1MjQgMTYuNTAzNSAzMS45NTI0IDIyQzMxLjk1MjQgMjcuNDk2NSAyNy40OTY1IDMxLjk1MjQgMjIgMzEuOTUyNEMxNi41MDM1IDMxLjk1MjQgMTIuMDQ3NiAyNy40OTY1IDEyLjA0NzYgMjJaIiBmaWxsPSIjOUU5RTlFIi8+Cjwvc3ZnPgo=" loading="lazy" alt="" className="team-info-decor" />
                </div>
              </div>
            </div>
            <div className="team-slider-row-inner team">
              <div team-slider-init="" className="swiper team-slider swiper-initialized swiper-horizontal swiper-backface-hidden" onMouseEnter={() => setTeamHover(true)} onMouseLeave={() => setTeamHover(false)}>
                <div className="swiper-wrapper" id="swiper-wrapper-6897a10e55610441b7" aria-live="polite" style={{transitionDuration: "600ms", transform: `translate3d(-${teamSlide * TEAM_SLIDE_STEP}px, 0px, 0px)`, transitionDelay: "0ms"}}>

                  <div className="swiper-slide team-slide swiper-slide-active" role="group" aria-label="1 / 8" style={{width: "291.765px"}}>
                    <div team-card="" className="team-card gsap-fade-up">
                      <div className="team-card-head">
                        <h3 className="team-member-name">
Dr. N. Sesha Reddy      </h3>
                        <div className="team-member-pos">
Chairman                </div>
                      </div>
                      <div className="team-card-body">
                        <div view-bio="" className="team-member-photo">
                          <img src="/Dr.%20N.%20Sesha%20Reddy.jpeg" loading="lazy" width={203} height={174} alt="Dr. N. Sesha Reddy" className="team-member-photo-image" />
                        </div>
                      </div>
                      <div className="team-card-footer">
                        <div className="team-card-action">
                          <a view-bio="" href="index.html#" className="view-bio w-inline-block w--current">
                            <div className="">
                           </div>
                            {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                          </a>
                        </div>
                        <div className="team-card-decor"></div>
                        <div className="team-card-decor tcd-right"></div>
                      </div>
                      <div className="team-card-popup">
                        <div className="team-card-popup-inner">
                          <div className="team-card-popup-info">
                            <p className="m-0">
Profile details coming soon.</p>
                            <div className="team-popup-decory team-popup-decor-top-left"></div>
                            <div className="team-popup-decory team-popup-decor-top-right"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-left"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-right"></div>
                          </div>
                          <div className="team-card-popup-footer">
                            <div className="team-card-socials"></div>
                            <a close-bio="" href="index.html#" className="view-bio vb-close w-inline-block w--current">
                              <div className="">
                             </div>
                              {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide team-slide swiper-slide-next" role="group" aria-label="2 / 8" style={{width: "291.765px"}}>
                    <div team-card="" className="team-card gsap-fade-up">
                      <div className="team-card-head">
                        <h3 className="team-member-name">
Dr. N. Suguna Reddy     </h3>
                        <div className="team-member-pos">
Secretary               </div>
                      </div>
                      <div className="team-card-body">
                        <div view-bio="" className="team-member-photo">
                          <img src="/Dr.%20N.%20Suguna%20Reddy.jpeg" loading="lazy" width={203} height={174} alt="Dr. N. Suguna Reddy" className="team-member-photo-image" />
                        </div>
                      </div>
                      <div className="team-card-footer">
                        <div className="team-card-action">
                          <a view-bio="" href="index.html#" className="view-bio w-inline-block w--current">
                            <div className="">
                            </div>
                            {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                          </a>
                        </div>
                        <div className="team-card-decor"></div>
                        <div className="team-card-decor tcd-right"></div>
                      </div>
                      <div className="team-card-popup">
                        <div className="team-card-popup-inner">
                          <div className="team-card-popup-info">
                            <p className="m-0">
Profile details coming soon.</p>
                            <div className="team-popup-decory team-popup-decor-top-left"></div>
                            <div className="team-popup-decory team-popup-decor-top-right"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-left"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-right"></div>
                          </div>
                          <div className="team-card-popup-footer">
                            <div className="team-card-socials"></div>
                            <a close-bio="" href="index.html#" className="view-bio vb-close w-inline-block w--current">
                              <div className="">
                              </div>
                              {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide team-slide" role="group" aria-label="3 / 8" style={{width: "291.765px"}}>
                    <div team-card="" className="team-card gsap-fade-up">
                      <div className="team-card-head">
                        <h3 className="team-member-name">
Dr. B.E.V.L. Naidu      </h3>
                        <div className="team-member-pos">
Academic Director       </div>
                      </div>
                      <div className="team-card-body">
                        <div view-bio="" className="team-member-photo">
                          <img src="/Dr.%20B.E.V.L.%20Naidu.jpeg" loading="lazy" width={203} height={174} alt="Dr. B.E.V.L. Naidu" className="team-member-photo-image" />
                        </div>
                      </div>
                      <div className="team-card-footer">
                        <div className="team-card-action">
                          <a view-bio="" href="index.html#" className="view-bio w-inline-block w--current">
                            <div className="">
                            </div>
                            {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                          </a>
                        </div>
                        <div className="team-card-decor"></div>
                        <div className="team-card-decor tcd-right"></div>
                      </div>
                      <div className="team-card-popup">
                        <div className="team-card-popup-inner">
                          <div className="team-card-popup-info">
                            <p className="m-0">
Profile details coming soon.</p>
                            <div className="team-popup-decory team-popup-decor-top-left"></div>
                            <div className="team-popup-decory team-popup-decor-top-right"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-left"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-right"></div>
                          </div>
                          <div className="team-card-popup-footer">
                            <div className="team-card-socials"></div>
                            <a close-bio="" href="index.html#" className="view-bio vb-close w-inline-block w--current">
                              <div className="">
                             </div>
                              {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide team-slide" role="group" aria-label="4 / 8" style={{width: "291.765px"}}>
                    <div team-card="" className="team-card gsap-fade-up">
                      <div className="team-card-head">
                        <h3 className="team-member-name">
U. Siddarth Reddy       </h3>
                        <div className="team-member-pos">
Dean of AI              </div>
                      </div>
                      <div className="team-card-body">
                        <div view-bio="" className="team-member-photo">
                          <img src="/U.%20Siddarth%20Reddy.jpeg" loading="lazy" width={203} height={174} alt="U. Siddarth Reddy" className="team-member-photo-image" />
                        </div>
                      </div>
                      <div className="team-card-footer">
                        <div className="team-card-action">
                          <a view-bio="" href="index.html#" className="view-bio w-inline-block w--current">
                            <div className="">
                            </div>
                            {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                          </a>
                        </div>
                        <div className="team-card-decor"></div>
                        <div className="team-card-decor tcd-right"></div>
                      </div>
                      <div className="team-card-popup">
                        <div className="team-card-popup-inner">
                          <div className="team-card-popup-info">
                            <p className="m-0">
Profile details coming soon.</p>
                            <div className="team-popup-decory team-popup-decor-top-left"></div>
                            <div className="team-popup-decory team-popup-decor-top-right"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-left"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-right"></div>
                          </div>
                          <div className="team-card-popup-footer">
                            <div className="team-card-socials"></div>
                            <a close-bio="" href="index.html#" className="view-bio vb-close w-inline-block w--current">
                              <div className="">
                              </div>
                              {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide team-slide" role="group" aria-label="5 / 8" style={{width: "291.765px"}}>
                    <div team-card="" className="team-card gsap-fade-up">
                      <div className="team-card-head">
                        <h3 className="team-member-name">
M. Satya Prakash        </h3>
                        <div className="team-member-pos">
Principal (Co-Ed)       </div>
                      </div>
                      <div className="team-card-body">
                        <div view-bio="" className="team-member-photo">
                          <img src="/M.%20Satya%20Prakash.jpeg" loading="lazy" width={203} height={174} alt="M. Satya Prakash" className="team-member-photo-image" />
                        </div>
                      </div>
                      <div className="team-card-footer">
                        <div className="team-card-action">
                          <a view-bio="" href="index.html#" className="view-bio w-inline-block w--current">
                            <div className="">
                            </div>
                            {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                          </a>
                        </div>
                        <div className="team-card-decor"></div>
                        <div className="team-card-decor tcd-right"></div>
                      </div>
                      <div className="team-card-popup">
                        <div className="team-card-popup-inner">
                          <div className="team-card-popup-info">
                            <p className="m-0">
Profile details coming soon.</p>
                            <div className="team-popup-decory team-popup-decor-top-left"></div>
                            <div className="team-popup-decory team-popup-decor-top-right"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-left"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-right"></div>
                          </div>
                          <div className="team-card-popup-footer">
                            <div className="team-card-socials"></div>
                            <a close-bio="" href="index.html#" className="view-bio vb-close w-inline-block w--current">
                              <div className="">
                            </div>
                              {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide team-slide" role="group" aria-label="6 / 8" style={{width: "291.765px"}}>
                    <div team-card="" className="team-card gsap-fade-up">
                      <div className="team-card-head">
                        <h3 className="team-member-name">
P. Pradeep              </h3>
                        <div className="team-member-pos">
Principal (Women's)     </div>
                      </div>
                      <div className="team-card-body">
                        <div view-bio="" className="team-member-photo">
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
                        </div>
                      </div>
                      <div className="team-card-footer">
                        <div className="team-card-action">
                          <a view-bio="" href="index.html#" className="view-bio w-inline-block w--current">
                            <div className="">
                           </div>
                            {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                          </a>
                        </div>
                        <div className="team-card-decor"></div>
                        <div className="team-card-decor tcd-right"></div>
                      </div>
                      <div className="team-card-popup">
                        <div className="team-card-popup-inner">
                          <div className="team-card-popup-info">
                            <p className="m-0">
Profile details coming soon.</p>
                            <div className="team-popup-decory team-popup-decor-top-left"></div>
                            <div className="team-popup-decory team-popup-decor-top-right"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-left"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-right"></div>
                          </div>
                          <div className="team-card-popup-footer">
                            <div className="team-card-socials"></div>
                            <a close-bio="" href="index.html#" className="view-bio vb-close w-inline-block w--current">
                              <div className="">
                            </div>
                              {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide team-slide" role="group" aria-label="7 / 8" style={{width: "291.765px"}}>
                    <div team-card="" className="team-card gsap-fade-up">
                      <div className="team-card-head">
                        <h3 className="team-member-name">
R.V.R. Patrudu          </h3>
                        <div className="team-member-pos">
Vice-Principal (Co-Ed)  </div>
                      </div>
                      <div className="team-card-body">
                        <div view-bio="" className="team-member-photo">
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
                        </div>
                      </div>
                      <div className="team-card-footer">
                        <div className="team-card-action">
                          <a view-bio="" href="index.html#" className="view-bio w-inline-block w--current">
                            <div className="">
                         </div>
                            {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                          </a>
                        </div>
                        <div className="team-card-decor"></div>
                        <div className="team-card-decor tcd-right"></div>
                      </div>
                      <div className="team-card-popup">
                        <div className="team-card-popup-inner">
                          <div className="team-card-popup-info">
                            <p className="m-0">
Profile details coming soon.</p>
                            <div className="team-popup-decory team-popup-decor-top-left"></div>
                            <div className="team-popup-decory team-popup-decor-top-right"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-left"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-right"></div>
                          </div>
                          <div className="team-card-popup-footer">
                            <div className="team-card-socials"></div>
                            <a close-bio="" href="index.html#" className="view-bio vb-close w-inline-block w--current">
                              <div className="">
Bio                              </div>
                              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide team-slide" role="group" aria-label="8 / 8" style={{width: "291.765px"}}>
                    <div team-card="" className="team-card gsap-fade-up">
                      <div className="team-card-head">
                        <h3 className="team-member-name">
T. Sai Ratnam           </h3>
                        <div className="team-member-pos">
HOD of AI               </div>
                      </div>
                      <div className="team-card-body">
                        <div view-bio="" className="team-member-photo">
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWRvZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=" loading="lazy" width={203} height={174} alt="" className="team-member-photo-image" />
                        </div>
                      </div>
                      <div className="team-card-footer">
                        <div className="team-card-action">
                          <a view-bio="" href="index.html#" className="view-bio w-inline-block w--current">
                            <div className="">
                            </div>
                            {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" /> */}
                          </a>
                        </div>
                        <div className="team-card-decor"></div>
                        <div className="team-card-decor tcd-right"></div>
                      </div>
                      <div className="team-card-popup">
                        <div className="team-card-popup-inner">
                          <div className="team-card-popup-info">
                            <p className="m-0">
Profile details coming soon.</p>
                            <div className="team-popup-decory team-popup-decor-top-left"></div>
                            <div className="team-popup-decory team-popup-decor-top-right"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-left"></div>
                            <div className="team-popup-decory team-popup-decor-bottom-right"></div>
                          </div>
                          <div className="team-card-popup-footer">
                            <div className="team-card-socials"></div>
                            <a close-bio="" href="index.html#" className="view-bio vb-close w-inline-block w--current">
                              <div className="">
Bio                              </div>
                              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTE4MzggMC40NDA3MTVDNS41MTgzOCAwLjE5NzMxNSA1LjcyMjc0IDAgNS45NzQ4NCAwSDYuMDE2MzZDNi4yNjg0NSAwIDYuNDcyODIgMC4xOTczMTUgNi40NzI4MiAwLjQ0MDcxNlY0LjYzNzc2QzYuNDcyODIgNC43NTQ1NCA2LjQ5NTg0IDQuODcwMzMgNi41NDA3MyA0Ljk3ODU4QzYuNTg1NjIgNS4wODY4NSA2LjY1MTYxIDUuMTg1NjYgNi43MzUyNiA1LjI2OTIyQzYuODE4OTMgNS4zNTI3OCA2LjkxODY1IDUuNDE5NDYgNy4wMjg5NCA1LjQ2NTA5QzcuMTM5MjQgNS41MTA3MiA3LjI1NzczIDUuNTM0MzEgNy4zNzc1NyA1LjUzNDMxSDExLjU0MzVDMTEuNzk1NiA1LjUzNDMxIDEyIDUuNzMxNjMgMTIgNS45NzUwM1Y2LjAzOThDMTIgNi4yODMyIDExLjc5NTYgNi40ODA1MiAxMS41NDM1IDYuNDgwNTJINy4zNzc1N0M3LjEzNTIyIDYuNDgwNTIgNi45MDQzMyA2LjU3Njc0IDYuNzM1MjYgNi43NDU2MUM2LjU2NjQzIDYuOTE0MjUgNi40NzI4MiA3LjE0MTUxIDYuNDcyODIgNy4zNzcwN1YxMS41NTkzQzYuNDcyODIgMTEuODAyNyA2LjI2ODQ1IDEyIDYuMDE2MzYgMTJINS45NzQ4NEM1LjcyMjc0IDEyIDUuNTE4MzggMTEuODAyNyA1LjUxODM4IDExLjU1OTNWNy4zNzcwN0M1LjUxODM4IDcuMTQxNTEgNS40MjQ3NiA2LjkxNDI1IDUuMjU1OTMgNi43NDU2MUM1LjA4Njg2IDYuNTc2NzQgNC44NTU5OCA2LjQ4MDUyIDQuNjEzNjMgNi40ODA1MkgwLjQ1NjQ1NUMwLjIwNDM2MiA2LjQ4MDUyIDAgNi4yODMyIDAgNi4wMzk4VjUuOTc1MkMwIDUuNzMxOCAwLjIwNDM2MiA1LjUzNDQ4IDAuNDU2NDU2IDUuNTM0NDhINC42MTM2M0M0Ljg1NTk4IDUuNTM0NDggNS4wODY4NiA1LjQzODI2IDUuMjU1OTMgNS4yNjkzOUM1LjQyNDc2IDUuMTAwNzUgNS41MTgzOCA0Ljg3MzQ5IDUuNTE4MzggNC42Mzc5M1YwLjQ0MDcxNVoiIGZpbGw9IiNGRjcxMjAiLz4KPC9zdmc+Cg==" loading="lazy" width={12} height={12} alt="" className="view-bio-icon" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
<span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="team-custome-code w-embed w-script"></div>
      </section>
      <section className="footer footer-with-blog">
        <div className="w-layout-blockcontainer container w-container">
          <div className="footer-inner">
            <div className="footer-top-row">
              <div className="footer-logo-col">
                <Link href="/" aria-current="page" className="footer-logo w-inline-block">
                  <img width={101} height={34} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxIiBoZWlnaHQ9IjM0IiB2aWV3Qm94PSIwIDAgMTAxIDM0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMzEuOTE3MyA2LjA3OTEyQzMyLjkxNDIgNy4wNzg5NyAzMy4wMzM5IDcuMzU4OTQgMzMuMDMzOSA4Ljc5ODczVjEzLjEzNTZDMzMuMDMzOSAxNC41NzU0IDMyLjg3NDMgMTQuNzM1NCAzMS40Mzg3IDE0LjczNTRIMjkuODQzNkMyOC40MDggMTQuNzM1NCAyOC4yNDg1IDE0LjU3NTQgMjguMjQ4NSAxMy4xMzU2VjUuNDc0OTFDMjguMjQ4NSA1LjA5NDgyIDI3Ljk0MSA0Ljc4OTc0IDI3LjU2MDkgNC43ODk3NEwyMC44Mjg0IDQuNzg5NzRDMjAuNjg0MyA0Ljc5NzMxIDIwLjUyMTUgNC43OTk5MyAyMC4zMzggNC43OTk5M0g1Ljg2NTY1QzUuNDg1NTcgNC43OTk5MyA1LjE4NDE5IDUuMTA1NTEgNS4xODQxOSA1LjQ4NTZWMjcuNTQ3MkM1LjE4NDE5IDI3LjkyNzIgNS40OTIzMSAyOC4yMzQ3IDUuODcyMzkgMjguMjM0N0gyMC4zMzhDMjAuNTA0OCAyOC4yMzQ3IDIwLjY1NDQgMjguMjM2OSAyMC43ODg1IDI4LjI0M0gyNy41NjA5QzI3Ljk0MSAyOC4yNDMgMjguMjQ4NSAyNy45MzY4IDI4LjI0ODUgMjcuNTU2N1YyMS44ODQ4QzI4LjI0ODUgMjAuNDQ1IDI4LjQwOCAyMC4yODUxIDI5Ljg0MzYgMjAuMjg1MUgzMS40Mzg3QzMyLjg3NDMgMjAuMjg1MSAzMy4wMzM5IDIwLjQ0NSAzMy4wMzM5IDIxLjg4NDhWMjQuMjM0QzMzLjAzMzkgMjUuNjczOCAzMi45MTQyIDI1Ljk1MzcgMzEuOTE3MyAyNi45NTM2TDI2Ljk3MjQgMzEuOTEyOUMyNS45NzU0IDMyLjkxMjcgMjUuNjk2MiAzMy4wMzI3IDI0LjI2MDYgMzMuMDMyN0gyMC41NDMzQzIwLjQ3NzkgMzMuMDMzNiAyMC40MDk1IDMzLjAzNCAyMC4zMzggMzMuMDM0SDguNzczMjRDNy4zMzc2MiAzMy4wMzQgNy4wNTg0NyAzMi45MTQxIDYuMDYxNTEgMzEuOTE0MkwxLjExNjU5IDI2Ljk1NDlDMC4xMTk2MzUgMjUuOTU1MSAwIDI1LjY3NTEgMCAyNC4yMzUzVjguNzk5MzVDMCA3LjM1OTU2IDAuMTE5NjM1IDcuMDc5NiAxLjExNjU5IDYuMDc5NzRMNi4wNjE1MSAxLjEyMDQ2QzcuMDU4NDcgMC4xMjA2MDUgNy4zMzc2MiAwLjAwMDYyMTc5NiA4Ljc3MzI0IDAuMDAwNjIxNzk2SDEwLjUxNjhDMTAuNTYzNSAwLjAwMDE5MTc3MiAxMC42MTE3IDAgMTAuNjYxNCAwSDI0LjI2MDZDMjUuNjk2MiAwIDI1Ljk3NTQgMC4xMTk5ODQgMjYuOTcyNCAxLjExOTg0TDMxLjkxNzMgNi4wNzkxMloiIGZpbGw9IiMwRTBFMEUiLz4KPHBhdGggZD0iTTQ2LjQ3OCAxMS4xODc1QzQ0LjUwMDUgMTEuMTg3NSA0MyA5Ljg2MTI4IDQzIDcuMzM0NTVWNi41NTcwOUM0MyA0LjAzMDM1IDQ0LjUwMDUgMi43MDQxIDQ2LjQ3OCAyLjcwNDFINDcuNDMxOEM0OC44MzkzIDIuNzA0MSA1MC4xODg2IDMuNjMwMTkgNTAuNTQ5MiA1LjMzMzc0SDQ5LjQzMjVDNDkuMTUzMyA0LjM3MzM1IDQ4LjMwNDIgMy42ODczNiA0Ni45NTQ5IDMuNjg3MzZDNDQuNzQ0OCAzLjY4NzM2IDQ0LjA0NjkgNS4wODIyMSA0NC4wNDY5IDYuNjQ4NTVWNy4yNDMwOEM0NC4wNDY5IDguODA5NDMgNDQuNzQ0OCAxMC4xNyA0Ni45NTQ5IDEwLjE3QzQ4LjQyMDUgMTAuMTcgNDkuMjY5NyA5LjM5MjUyIDQ5LjUwMjMgOC4zNDA2N0g1MC41ODQxQzUwLjMwNDkgMTAuMjE1NyA0OC45MjA3IDExLjE4NzUgNDcuNDMxOCAxMS4xODc1SDQ2LjQ3OFoiIGZpbGw9IiMwRTBFMEUiLz4KPHBhdGggZD0iTTUyLjkxNjggNi4zMTY5OUM1My4zMzU1IDUuNzMzOSA1NC4xMzgxIDUuMzMzNzQgNTQuODEyOCA1LjMzMzc0QzU1Ljc3ODIgNS4zMzM3NCA1Ni45MTgyIDUuODkzOTYgNTYuOTE4MiA3LjU5NzUxVjExLjAwNDZINTUuODcxM1Y3Ljc4MDQ0QzU1Ljg3MTMgNi43NTE0NSA1NS40NTI1IDYuMzE2OTkgNTQuNDc1NSA2LjMxNjk5QzUzLjg5MzkgNi4zMTY5OSA1Mi45MTY4IDYuNzI4NTkgNTIuOTE2OCA4LjEzNDg3VjExLjAwNDZINTEuODY5OVYyLjcwNDFINTIuOTE2OFY2LjMxNjk5WiIgZmlsbD0iIzBFMEUwRSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTYzLjQ3ODUgOS41OTgzMlY3LjU5NzUxQzYzLjQ3ODUgNS44OTM5NiA2Mi41ODI4IDUuMzMzNzQgNjEuNTQ3NiA1LjMzMzc0SDYwLjQwNzZDNTkuMjY3NyA1LjMzMzc0IDU4LjQ2NTEgNi4xNjgzNiA1OC40NjUxIDcuMDAyOThINTkuNTExOUM1OS41MTE5IDYuNjM3MTIgNTkuOTMwNyA2LjMxNjk5IDYwLjUxMjMgNi4zMTY5OUg2MS4yMTAyQzYyLjI0NTUgNi4zMTY5OSA2Mi40MDgzIDYuNzYyODkgNjIuNDMxNiA3LjUyODkxSDYwLjUzNTZDNTkuMTc0NiA3LjUyODkxIDU4LjMxMzkgOC4yMzc3NyA1OC4zMTM5IDkuMjQzODlWOS4zNjk2NkM1OC4zMTM5IDEwLjc2NDUgNTkuNDUzOCAxMS4xNzYxIDYwLjUzNTYgMTEuMTc2MUM2MS4yNTY4IDExLjE3NjEgNjIuMTI5MiAxMS4wMDQ2IDYyLjUyNDcgMTAuNDEwMUM2Mi43NTczIDEwLjk5MzIgNjMuMzk3IDExLjAwNDYgNjMuOTMyMSAxMS4wMDQ2VjEwLjAyMTNDNjMuNzIyNyAxMC4wMjEzIDYzLjQ3ODUgOS45NTI3NSA2My40Nzg1IDkuNTk4MzJaTTYwLjg3MjkgMTAuMTkyOEM1OS43Nzk1IDEwLjE5MjggNTkuMzYwNyA5Ljk2NDE4IDU5LjM2MDcgOS4zMjM5MkM1OS4zNjA3IDguOTU4MDYgNTkuNTcwMSA4LjM5NzgzIDYwLjg3MjkgOC4zOTc4M0g2Mi40MzE2VjkuMzAxMDZDNjIuNDMxNiAxMC4wMzI4IDYxLjMzODIgMTAuMTkyOCA2MC44NzI5IDEwLjE5MjhaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik02Ni40ODI0IDMuNDAxNTNDNjYuNDgyNCAzLjc3ODgyIDY2LjE2ODMgNC4wNzYwOSA2NS43ODQ0IDQuMDc2MDlDNjUuNDAwNiA0LjA3NjA5IDY1LjA4NjUgMy43Nzg4MiA2NS4wODY1IDMuNDAxNTNDNjUuMDg2NSAzLjAyNDIzIDY1LjQwMDYgMi43MDQxIDY1Ljc4NDQgMi43MDQxQzY2LjE2ODMgMi43MDQxIDY2LjQ4MjQgMy4wMjQyMyA2Ni40ODI0IDMuNDAxNTNaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik02Ni4zMDc5IDUuNTE2NjdWMTEuMDA0Nkg2NS4yNjFWNS41MTY2N0g2Ni4zMDc5WiIgZmlsbD0iIzBFMEUwRSIvPgo8cGF0aCBkPSJNNzEuMDQ1NCA1LjMzMzc0QzcwLjMzNTggNS4zMzM3NCA2OS40NzUxIDUuNzc5NjMgNjkuMDc5NiA2LjQxOTg5VjUuNTE2NjdINjguMTAyNVYxMS4wMDQ2SDY5LjE0OTRWOC4xMzQ4N0M2OS4xNDk0IDYuNzI4NTkgNzAuMTI2NSA2LjMxNjk5IDcwLjcwODEgNi4zMTY5OUM3MS42ODUyIDYuMzE2OTkgNzIuMTAzOSA2Ljc1MTQ1IDcyLjEwMzkgNy43ODA0NFYxMS4wMDQ2SDczLjE1MDhWNy41OTc1MUM3My4xNTA4IDUuODkzOTYgNzIuMDEwOCA1LjMzMzc0IDcxLjA0NTQgNS4zMzM3NFoiIGZpbGw9IiMwRTBFMEUiLz4KPHBhdGggZD0iTTc4LjUxMyA2Ljg0MjkySDgyLjMzOTlDODIuNTU3NSA4LjE5MDE4IDgyLjAyNTggOS40ODM5OSA4MS40MjEgMTAuMTU4NUM4MC44MTYxIDEwLjgzMzEgNzkuOTMyMSAxMS4xODc1IDc4LjkyMDEgMTEuMTg3NUg3Ny45NjYzQzc1Ljk4ODggMTEuMTg3NSA3NC40ODgzIDkuODYxMjggNzQuNDg4MyA3LjMzNDU1VjYuNTU3MDlDNzQuNDg4MyA0LjAzMDM1IDc1Ljk4ODggMi43MDQxIDc3Ljk2NjMgMi43MDQxSDc4LjkyMDFDODAuNTYwMiAyLjcwNDEgODEuODA0OCAzLjY1MzA2IDgyLjIxMiA1LjM3OTQ3SDgxLjEwNjlDODAuNzY5NiA0LjM5NjIxIDgwLjAyNTEgMy42ODczNiA3OC40NDMyIDMuNjg3MzZDNzYuMjMzMSAzLjY4NzM2IDc1LjUzNTIgNS4wODIyMSA3NS41MzUyIDYuNjQ4NTVWNy4yNDMwOEM3NS41MzUyIDguODA5NDMgNzYuMjMzMSAxMC4xNyA3OC40NDMyIDEwLjE3QzgwLjM2MjUgMTAuMTcgODEuMDk1MyA5LjE0MDk5IDgxLjI1ODEgNy44NDkwNFY3LjgyNjE3SDc4LjUxM1Y2Ljg0MjkyWiIgZmlsbD0iIzBFMEUwRSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTg3LjgwMzcgMi44ODcwM0g4NC4wMTE2VjExLjAwNDZIODUuMDU4NVY4LjAyMDU0SDg3LjgwMzdDODkuMTE4MSA4LjAyMDU0IDkwLjQzMjUgNy40NjAzMSA5MC40MzI1IDUuNDU5NUM5MC40MzI1IDMuNTYxNTkgODkuMTE4MSAyLjg4NzAzIDg3LjgwMzcgMi44ODcwM1pNODcuNTgyNyA3LjAzNzI4SDg1LjA1ODVWMy44ODE3Mkg4Ny41ODI3Qzg4LjkwODcgMy44ODE3MiA4OS4zMjc1IDQuNTQ0ODUgODkuMzI3NSA1LjQ1OTVDODkuMzI3NSA2LjM3NDE2IDg4LjkwODcgNy4wMzcyOCA4Ny41ODI3IDcuMDM3MjhaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik05MC44OTYzIDIuODg3MDNIOTcuMjk0VjMuODcwMjlIOTQuNjE4NlYxMS4wMDQ2SDkzLjU3MTdWMy44NzAyOUg5MC44OTYzVjIuODg3MDNaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik05LjgzMzg2IDE2LjU4MUM5LjgzMzg2IDE1LjMxMDkgMTAuODYzNSAxNC4yODEyIDEyLjEzMzYgMTQuMjgxMkMxMy40MDM3IDE0LjI4MTIgMTQuNDMzMyAxNS4zMTA5IDE0LjQzMzMgMTYuNTgxQzE0LjQzMzMgMTcuODUxMSAxMy40MDM3IDE4Ljg4MDcgMTIuMTMzNiAxOC44ODA3QzEwLjg2MzUgMTguODgwNyA5LjgzMzg2IDE3Ljg1MTEgOS44MzM4NiAxNi41ODFaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik0yMS44Mjg4IDE0LjI4MTJDMjAuNTU4NyAxNC4yODEyIDE5LjUyOTEgMTUuMzEwOSAxOS41MjkxIDE2LjU4MUMxOS41MjkxIDE3Ljg1MTEgMjAuNTU4NyAxOC44ODA3IDIxLjgyODggMTguODgwN0MyMy4wOTg5IDE4Ljg4MDcgMjQuMTI4NSAxNy44NTExIDI0LjEyODUgMTYuNTgxQzI0LjEyODUgMTUuMzEwOSAyMy4wOTg5IDE0LjI4MTIgMjEuODI4OCAxNC4yODEyWiIgZmlsbD0iIzBFMEUwRSIvPgo8cGF0aCBkPSJNODkuMDU1OSAyNi4xODYxQzg4LjMwNiAyNi4xODYxIDg4LjIyMjcgMjYuMTAyOCA4OC4yMjI3IDI1LjM1MjhWMjIuMjI4MkM4OC4yMjI3IDIxLjE0NSA4OC44MDYgMjAuNTYxNyA4OS44ODkyIDIwLjU2MTdIOTAuMDk3NUM5MC44NDc0IDIwLjU2MTcgOTAuOTMwNyAyMC40Nzg0IDkwLjkzMDcgMTkuNzI4NUM5MC45MzA3IDE4LjY0NTMgOTEuNTE0IDE4LjA2MiA5Mi41OTcyIDE4LjA2Mkg5OS44ODhDMTAwLjYzOCAxOC4wNjIgMTAwLjcyMSAxOC4xNDUzIDEwMC43MjEgMTguODk1M1YxOS43Mjg1QzEwMC43MjEgMjAuNDc4NCAxMDAuNjM4IDIwLjU2MTcgOTkuODg4IDIwLjU2MTdIOTEuNzY0QzkxLjAxNDEgMjAuNTYxNyA5MC45MzA3IDIwLjY0NTEgOTAuOTMwNyAyMS4zOTVWMjUuMzUyOEM5MC45MzA3IDI2LjEwMjggOTAuODQ3NCAyNi4xODYxIDkwLjA5NzUgMjYuMTg2MUg4OS4wNTU5WiIgZmlsbD0iIzBFMEUwRSIvPgo8cGF0aCBkPSJNODcuNTk3OCAzMS44MTA0VjMwLjk3NzJDODcuNTk3OCAzMC4yMjczIDg3LjY4MTEgMzAuMTQ0IDg4LjQzMSAzMC4xNDRIOTYuNTU1MUM5Ny4zMDUgMzAuMTQ0IDk3LjM4ODMgMzAuMDYwNiA5Ny4zODgzIDI5LjMxMDdWMjUuMzUyOEM5Ny4zODgzIDI0LjYwMjkgOTcuNDcxNiAyNC41MTk2IDk4LjIyMTYgMjQuNTE5Nkg5OS4yNjMxQzEwMC4wMTMgMjQuNTE5NiAxMDAuMDk2IDI0LjYwMjkgMTAwLjA5NiAyNS4zNTI4VjI4LjQ3NzVDMTAwLjA5NiAyOS41NjA3IDk5LjUxMzEgMzAuMTQ0IDk4LjQyOTkgMzAuMTQ0SDk4LjIyMTZDOTcuNDcxNiAzMC4xNDQgOTcuMzg4MyAzMC4yMjczIDk3LjM4ODMgMzAuOTc3MkM5Ny4zODgzIDMyLjA2MDQgOTYuODA1MSAzMi42NDM3IDk1LjcyMTggMzIuNjQzN0g4OC40MzFDODcuNjgxMSAzMi42NDM3IDg3LjU5NzggMzIuNTYwNCA4Ny41OTc4IDMxLjgxMDRaIiBmaWxsPSIjMEUwRTBFIi8+CjxwYXRoIGQ9Ik03My4wMTcgMzEuODEwNEM3My4wMTcgMzIuNTYwNCA3My4xMDAzIDMyLjY0MzcgNzMuODUwMiAzMi42NDM3SDgwLjMwNzhDODEuMDU3NyAzMi42NDM3IDgxLjIwMzUgMzIuNTgxMiA4MS43MjQzIDMyLjA2MDRMODQuMzA3MyAyOS40Nzc0Qzg0LjgyODEgMjguOTU2NiA4NC44OTA2IDI4LjgxMDggODQuODkwNiAyOC4wNjA5VjI3LjMzMThDODQuODkwNiAyNi41ODE5IDg0LjgwNzMgMjYuNDk4NiA4NC4wNTc0IDI2LjQ5ODZIODMuMDE1OEM4Mi4yNjU5IDI2LjQ5ODYgODIuMTgyNiAyNi40MTUyIDgyLjE4MjYgMjUuNjY1M1YyNC44MzIxQzgyLjE4MjYgMjQuMDgyMiA4Mi4yNjU5IDIzLjk5ODggODMuMDE1OCAyMy45OTg4SDg0LjA1NzRDODQuODA3MyAyMy45OTg4IDg0Ljg5MDYgMjMuOTE1NSA4NC44OTA2IDIzLjE2NTZWMjAuNzdDODQuODkwNiAxOC45MTYxIDg0LjAzNjUgMTguMDYyIDgyLjE4MjYgMTguMDYySDczLjg1MDJDNzMuMTAwMyAxOC4wNjIgNzMuMDE3IDE4LjE0NTMgNzMuMDE3IDE4Ljg5NTNWMTkuNzI4NUM3My4wMTcgMjAuNDc4NCA3My4xMDAzIDIwLjU2MTcgNzMuODUwMiAyMC41NjE3SDgxLjM0OTNDODIuMDk5MyAyMC41NjE3IDgyLjE4MjYgMjAuNjQ1MSA4Mi4xODI2IDIxLjM5NVYyMy4xNjU2QzgyLjE4MjYgMjMuOTE1NSA4Mi4wOTkzIDIzLjk5ODggODEuMzQ5MyAyMy45OTg4SDc0LjA1ODVDNzMuMzA4NiAyMy45OTg4IDczLjIyNTMgMjQuMDgyMiA3My4yMjUzIDI0LjgzMjFWMjUuNjY1M0M3My4yMjUzIDI2LjQxNTIgNzMuMzA4NiAyNi40OTg2IDc0LjA1ODUgMjYuNDk4Nkg4MS4zNDkzQzgyLjA5OTMgMjYuNDk4NiA4Mi4xODI2IDI2LjU4MTkgODIuMTgyNiAyNy4zMzE4VjI5LjMxMDdDODIuMTgyNiAzMC4wNjA2IDgyLjA5OTMgMzAuMTQ0IDgxLjM0OTMgMzAuMTQ0SDczLjg1MDJDNzMuMTAwMyAzMC4xNDQgNzMuMDE3IDMwLjIyNzMgNzMuMDE3IDMwLjk3NzJWMzEuODEwNFoiIGZpbGw9IiMwRTBFMEUiLz4KPHBhdGggZD0iTTU3LjYwNjkgMzIuNjQzN0M1Ni44NTcgMzIuNjQzNyA1Ni43NzM3IDMyLjU2MDQgNTYuNzczNyAzMS44MTA0VjMwLjk3NzJDNTYuNzczNyAzMC4yMjczIDU2Ljc5NDUgMzAuMDYwNiA1Ny4wMjM3IDI5LjM1MjRMNTkuNDQgMjEuMzUzM0M1OS42NjkyIDIwLjY0NTEgNTkuNzczMyAyMC41NjE3IDYwLjUyMzMgMjAuNTYxN0g2MS41NjQ4QzYyLjMxNDcgMjAuNTYxNyA2Mi4zOTggMjAuNDc4NCA2Mi4zOTggMTkuNzI4NVYxOC44OTUzQzYyLjM5OCAxOC4xNDUzIDYyLjQ4MTQgMTguMDYyIDYzLjIzMTMgMTguMDYySDY1LjE0NzdDNjYuMjMwOSAxOC4wNjIgNjYuOTgwOSAxOC42MjQ0IDY3LjI5MzMgMTkuNjQ1Mkw3MC4yNzIxIDI5LjM1MjRDNzAuNTAxMyAzMC4wNjA2IDcwLjUyMjEgMzAuMjI3MyA3MC41MjIxIDMwLjk3NzJWMzEuODEwNEM3MC41MjIxIDMyLjU2MDQgNzAuNDM4OCAzMi42NDM3IDY5LjY4ODkgMzIuNjQzN0g2OC42NDczQzY3Ljg5NzQgMzIuNjQzNyA2Ny44MTQxIDMyLjU2MDQgNjcuODE0MSAzMS44MTA0VjMwLjk3NzJDNjcuODE0MSAzMC4yMjczIDY3Ljc5MzMgMzAuMDYwNiA2Ny41NjQxIDI5LjM1MjRMNjUuMTQ3NyAyMS4zNTMzQzY0LjkxODYgMjAuNjQ1MSA2NC44MTQ0IDIwLjU2MTcgNjQuMDY0NSAyMC41NjE3SDYzLjIzMTNDNjIuNDgxNCAyMC41NjE3IDYyLjM3NzIgMjAuNjQ1MSA2Mi4xNDgxIDIxLjM1MzNMNTkuNzMxNyAyOS4zNTI0QzU5LjUwMjUgMzAuMDYwNiA1OS40ODE3IDMwLjIyNzMgNTkuNDgxNyAzMC45NzcyVjMxLjgxMDRDNTkuNDgxNyAzMi41NjA0IDU5LjM5ODQgMzIuNjQzNyA1OC42NDg1IDMyLjY0MzdINTcuNjA2OVoiIGZpbGw9IiMwRTBFMEUiLz4KPHBhdGggZD0iTTQ2LjYwNDkgMzIuMDYwNEM0Ny4xMjU3IDMyLjU4MTIgNDcuMjcxNSAzMi42NDM3IDQ4LjAyMTQgMzIuNjQzN0g1My44NTQxQzU0LjYwNCAzMi42NDM3IDU0LjY4NzMgMzIuNTYwNCA1NC42ODczIDMxLjgxMDRWMzAuOTc3MkM1NC42ODczIDMwLjIyNzMgNTQuNjA0IDMwLjE0NCA1My44NTQxIDMwLjE0NEg0Ni45Nzk5QzQ2LjIyOTkgMzAuMTQ0IDQ2LjE0NjYgMzAuMDYwNiA0Ni4xNDY2IDI5LjMxMDdWMTguODk1M0M0Ni4xNDY2IDE4LjE0NTMgNDYuMDYzMyAxOC4wNjIgNDUuMzEzNCAxOC4wNjJINDQuMjcxOEM0My41MjE5IDE4LjA2MiA0My40Mzg2IDE4LjE0NTMgNDMuNDM4NiAxOC44OTUzVjI4LjA2MDlDNDMuNDM4NiAyOC44MTA4IDQzLjUwMTEgMjguOTU2NiA0NC4wMjE5IDI5LjQ3NzRMNDYuNjA0OSAzMi4wNjA0WiIgZmlsbD0iIzBFMEUwRSIvPgo8L3N2Zz4K" loading="lazy" className="footer-logo-image" />
                </Link>
              </div>
              <div className="footer-form-col">
                <div className="subscribe-form-block w-form">
                  <form id="wf-form-Subscription-Form" name="wf-form-Subscription-Form" data-name="Subscription Form" method="get" className="subscribe-form" data-wf-page-id="664753c2515af09bef5b982d" data-wf-element-id="12b1a94f-b7e6-6348-f4f8-87d2cb0ec46f" aria-label="Subscription Form">
                    <div className="subscribe-input-col">
                      <h3 className="subscribe-heading gsap-fade-up">
Subscribe to be in touch*                      </h3>
                      <div className="subscribe-row">
                        <label htmlFor="email-2" className="visually-hidden">
Your e-mail                        </label>
                        <input className="subscribe-input-field w-input" maxLength={256} name="email-2" data-name="Email 2" placeholder="Your e-mail" type="email" id="email-2" required />
                      </div>
                    </div>
                    <div className="subscribe-action-col">
                      <div className="subscribe-note">
*Only valuable resources                      </div>
                      <div data-style-width="" className="button-primary subscrube-submit">
                        <div className="button-primary-border">
                          <input type="submit" data-wait="Please wait..." className="submit-button button-primary-text w-button" value="SUBSCRIBE" />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="success-message w-form-done" tabIndex={-1} role="region" aria-label="Subscription Form success">
                    <div className="">
Thank you! Your submission has been received!                    </div>
                  </div>
                  <div className="error-message w-form-fail" tabIndex={-1} role="region" aria-label="Subscription Form failure">
                    <div className="">
Oops! Something went wrong while submitting the form.                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-nav-row">
              <div className="footer-nav-col">
                <h4 className="footer-nav-title">
ECOSYSTEM                </h4>
                <ul role="list" className="footer-nav">
                  <li className="footer-nav-item">
                    <a href="https://app.chaingpt.org/" target="_blank" className="footer-nav-link" rel="noreferrer noopener">
ChainGPT AI                    </a>
                  </li>
                  <li className="footer-nav-item">
                    <a href="https://pad.chaingpt.org/" target="_blank" className="footer-nav-link" rel="noreferrer noopener">
ChainGPT Pad                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-nav-col fnc-second">
                <h4 className="footer-nav-title">
Quick Links                </h4>
                <ul role="list" className="footer-nav">
                  <li className="footer-nav-item">
                    <a href="https://labs.chaingpt.org/" className="footer-nav-link">
Home                    </a>
                  </li>
                  <li className="footer-nav-item">
                    <a href="/residency" className="footer-nav-link">
Residency Program                    </a>
                  </li>
                  <li className="footer-nav-item">
                    <a href="https://labs.chaingpt.org/apply" className="footer-nav-link">
Apply Now                    </a>
                  </li>
                  <li className="footer-nav-item">
                    <a href="http://help.chaingpt.org" target="_blank" className="footer-nav-link" rel="noreferrer noopener">
Help Center                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-nav-col">
                <h4 className="footer-nav-title">
LEGAL                </h4>
                <ul role="list" className="footer-nav">
                  <li className="footer-nav-item">
                    <a href="/privacy-policy" className="footer-nav-link">
Privacy Policy                    </a>
                  </li>
                  <li className="footer-nav-item">
                    <a href="/cookie-policy" className="footer-nav-link">
Cookie Policy                    </a>
                  </li>
                  <li className="footer-nav-item">
                    <a href="/terms-of-service" className="footer-nav-link">
Terms of Service                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-nav-col">
                <ul role="list" className="footer-socials">
                  <li className="footer-socials-item">
                    <a rel="noreferer, noopener noreferrer" href="https://t.me/chaingpt" target="_blank" className="footer-socials-link w-inline-block">
                      <div className="">
TELEGRAM                      </div>
                      <img width={10} height={10} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTk4ODY5IDEuMTY0MjRDLTAuMDY2Mjg5OSAxLjQyOTI1IC0wLjA2NjI4OTggMS44NTg5IDAuMTk4ODY5IDIuMTIzOTFMMS4xNTkxIDMuMDgzNThDMS40MjQyNSAzLjM0ODU4IDEuODU0MTYgMy4zNDg1OCAyLjExOTMyIDMuMDgzNThMMi44Mzk0OSAyLjM2MzgzQzMuMTA0NjUgMi4wOTg4MiAzLjUzNDU2IDIuMDk4ODIgMy43OTk3MiAyLjM2MzgzTDQuNTE5ODkgMy4wODM1OEM0LjU4ODE3IDMuMTUxODIgNC42NjczOCAzLjIwMjQ5IDQuNzUxODggMy4yMzU1OEwwLjU4Mjk2IDcuNDAyMDhDMC4yNzgwMjcgNy43MDY4MyAwLjI3ODAyNyA4LjIwMDk0IDAuNTgyOTYgOC41MDU3TDEuMTM1MDkgOS4wNTc1QzEuNDQwMDIgOS4zNjIyNiAxLjkzNDQyIDkuMzYyMjYgMi4yMzkzNSA5LjA1NzVMNi4yNDM1MSA1LjA1NTY3QzYuMjU1NTkgNS4yMTEzNiA2LjMyMTIgNS4zNjM2NyA2LjQ0MDM0IDUuNDgyNzRMNy4xNjA1MSA2LjIwMjVDNy40MjU2NyA2LjQ2NzUgNy40MjU2NyA2Ljg5NzE2IDcuMTYwNTEgNy4xNjIxNkw2LjQ0MDM0IDcuODgxOTFDNi4xNzUxOCA4LjE0NjkyIDYuMTc1MTggOC41NzY1NyA2LjQ0MDM0IDguODQxNThMNy40MDA1NyA5LjgwMTI1QzcuNjY1NzMgMTAuMDY2MyA4LjA5NTYzIDEwLjA2NjMgOC4zNjA3OSA5LjgwMTI1TDkuMzIxMDIgOC44NDE1OEM5LjU4NjE4IDguNTc2NTcgOS41ODYxOCA4LjE0NjkyIDkuMzIxMDIgNy44ODE5MUw4LjYwMDg1IDcuMTYyMTZDOC4zMzU2OSA2Ljg5NzE2IDguMzM1NjkgNi40Njc1IDguNjAwODUgNi4yMDI0OUw5LjMyMTAyIDUuNDgyNzRDOS41ODYxOCA1LjIxNzc0IDkuNTg2MTggNC43ODgwOCA5LjMyMTAyIDQuNTIzMDhMOC44NDA5IDQuMDQzMjRDOC41NzU3NSAzLjc3ODI0IDguNTc1NzUgMy4zNDg1OCA4Ljg0MDkgMy4wODM1OEw5LjgwMTEzIDIuMTIzOTFDMTAuMDY2MyAxLjg1ODkgMTAuMDY2MyAxLjQyOTI1IDkuODAxMTMgMS4xNjQyNEw4Ljg0MDkgMC4yMDQ1NzVDOC43Mjg4MyAwLjA5MjU2NTMgOC41ODczMiAwLjAyNzg5ODIgOC40NDEyNiAwLjAxMDU3NTVDOC4yMDExMSAtMC4wMjkyNTE2IDcuOTQ1OTEgMC4wNDM0MTIyIDcuNzYwNjUgMC4yMjg1NjdMNi45MDI5NyAxLjA4NTc1QzYuNjY0OTggMS4xNjgwNiA2LjM5MDMyIDEuMTE0MjUgNi4yMDAyOCAwLjkyNDMyNkw1LjQ4MDExIDAuMjA0NTc1QzUuMjE0OTUgLTAuMDYwNDI5NCA0Ljc4NTA1IC0wLjA2MDQyODkgNC41MTk4OSAwLjIwNDU3NkwzLjc5OTcyIDAuOTI0MzI2QzMuNTM0NTYgMS4xODkzMyAzLjEwNDY1IDEuMTg5MzMgMi44Mzk0OSAwLjkyNDMyNkwyLjExOTMyIDAuMjA0NTc2QzEuODU0MTYgLTAuMDYwNDI4OSAxLjQyNDI1IC0wLjA2MDQyOSAxLjE1OTEgMC4yMDQ1NzZMMC4xOTg4NjkgMS4xNjQyNFoiIGZpbGw9IiM2MzYzNjMiLz4KPC9zdmc+Cg==" loading="lazy" className="footer-socials-ico" />
                    </a>
                  </li>
                  <li className="footer-socials-item">
                    <a rel="noreferer, noopener noreferrer" href="https://x.com/ChainGPT_Labs" target="_blank" className="footer-socials-link w-inline-block">
                      <div className="">
X/TWITTER                      </div>
                      <img width={10} height={10} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTk4ODY5IDEuMTY0MjRDLTAuMDY2Mjg5OSAxLjQyOTI1IC0wLjA2NjI4OTggMS44NTg5IDAuMTk4ODY5IDIuMTIzOTFMMS4xNTkxIDMuMDgzNThDMS40MjQyNSAzLjM0ODU4IDEuODU0MTYgMy4zNDg1OCAyLjExOTMyIDMuMDgzNThMMi44Mzk0OSAyLjM2MzgzQzMuMTA0NjUgMi4wOTg4MiAzLjUzNDU2IDIuMDk4ODIgMy43OTk3MiAyLjM2MzgzTDQuNTE5ODkgMy4wODM1OEM0LjU4ODE3IDMuMTUxODIgNC42NjczOCAzLjIwMjQ5IDQuNzUxODggMy4yMzU1OEwwLjU4Mjk2IDcuNDAyMDhDMC4yNzgwMjcgNy43MDY4MyAwLjI3ODAyNyA4LjIwMDk0IDAuNTgyOTYgOC41MDU3TDEuMTM1MDkgOS4wNTc1QzEuNDQwMDIgOS4zNjIyNiAxLjkzNDQyIDkuMzYyMjYgMi4yMzkzNSA5LjA1NzVMNi4yNDM1MSA1LjA1NTY3QzYuMjU1NTkgNS4yMTEzNiA2LjMyMTIgNS4zNjM2NyA2LjQ0MDM0IDUuNDgyNzRMNy4xNjA1MSA2LjIwMjVDNy40MjU2NyA2LjQ2NzUgNy40MjU2NyA2Ljg5NzE2IDcuMTYwNTEgNy4xNjIxNkw2LjQ0MDM0IDcuODgxOTFDNi4xNzUxOCA4LjE0NjkyIDYuMTc1MTggOC41NzY1NyA2LjQ0MDM0IDguODQxNThMNy40MDA1NyA5LjgwMTI1QzcuNjY1NzMgMTAuMDY2MyA4LjA5NTYzIDEwLjA2NjMgOC4zNjA3OSA5LjgwMTI1TDkuMzIxMDIgOC44NDE1OEM5LjU4NjE4IDguNTc2NTcgOS41ODYxOCA4LjE0NjkyIDkuMzIxMDIgNy44ODE5MUw4LjYwMDg1IDcuMTYyMTZDOC4zMzU2OSA2Ljg5NzE2IDguMzM1NjkgNi40Njc1IDguNjAwODUgNi4yMDI0OUw5LjMyMTAyIDUuNDgyNzRDOS41ODYxOCA1LjIxNzc0IDkuNTg2MTggNC43ODgwOCA5LjMyMTAyIDQuNTIzMDhMOC44NDA5IDQuMDQzMjRDOC41NzU3NSAzLjc3ODI0IDguNTc1NzUgMy4zNDg1OCA4Ljg0MDkgMy4wODM1OEw5LjgwMTEzIDIuMTIzOTFDMTAuMDY2MyAxLjg1ODkgMTAuMDY2MyAxLjQyOTI1IDkuODAxMTMgMS4xNjQyNEw4Ljg0MDkgMC4yMDQ1NzVDOC43Mjg4MyAwLjA5MjU2NTMgOC41ODczMiAwLjAyNzg5ODIgOC40NDEyNiAwLjAxMDU3NTVDOC4yMDExMSAtMC4wMjkyNTE2IDcuOTQ1OTEgMC4wNDM0MTIyIDcuNzYwNjUgMC4yMjg1NjdMNi45MDI5NyAxLjA4NTc1QzYuNjY0OTggMS4xNjgwNiA2LjM5MDMyIDEuMTE0MjUgNi4yMDAyOCAwLjkyNDMyNkw1LjQ4MDExIDAuMjA0NTc1QzUuMjE0OTUgLTAuMDYwNDI5NCA0Ljc4NTA1IC0wLjA2MDQyODkgNC41MTk4OSAwLjIwNDU3NkwzLjc5OTcyIDAuOTI0MzI2QzMuNTM0NTYgMS4xODkzMyAzLjEwNDY1IDEuMTg5MzMgMi44Mzk0OSAwLjkyNDMyNkwyLjExOTMyIDAuMjA0NTc2QzEuODU0MTYgLTAuMDYwNDI4OSAxLjQyNDI1IC0wLjA2MDQyOSAxLjE1OTEgMC4yMDQ1NzZMMC4xOTg4NjkgMS4xNjQyNFoiIGZpbGw9IiM2MzYzNjMiLz4KPC9zdmc+Cg==" loading="lazy" className="footer-socials-ico" />
                    </a>
                  </li>
                  <li className="footer-socials-item">
                    <a rel="noreferer, noopener noreferrer" href="https://www.linkedin.com/company/103925830/" target="_blank" className="footer-socials-link w-inline-block">
                      <div className="">
LINKEDIN                      </div>
                      <img width={10} height={10} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTk4ODY5IDEuMTY0MjRDLTAuMDY2Mjg5OSAxLjQyOTI1IC0wLjA2NjI4OTggMS44NTg5IDAuMTk4ODY5IDIuMTIzOTFMMS4xNTkxIDMuMDgzNThDMS40MjQyNSAzLjM0ODU4IDEuODU0MTYgMy4zNDg1OCAyLjExOTMyIDMuMDgzNThMMi44Mzk0OSAyLjM2MzgzQzMuMTA0NjUgMi4wOTg4MiAzLjUzNDU2IDIuMDk4ODIgMy43OTk3MiAyLjM2MzgzTDQuNTE5ODkgMy4wODM1OEM0LjU4ODE3IDMuMTUxODIgNC42NjczOCAzLjIwMjQ5IDQuNzUxODggMy4yMzU1OEwwLjU4Mjk2IDcuNDAyMDhDMC4yNzgwMjcgNy43MDY4MyAwLjI3ODAyNyA4LjIwMDk0IDAuNTgyOTYgOC41MDU3TDEuMTM1MDkgOS4wNTc1QzEuNDQwMDIgOS4zNjIyNiAxLjkzNDQyIDkuMzYyMjYgMi4yMzkzNSA5LjA1NzVMNi4yNDM1MSA1LjA1NTY3QzYuMjU1NTkgNS4yMTEzNiA2LjMyMTIgNS4zNjM2NyA2LjQ0MDM0IDUuNDgyNzRMNy4xNjA1MSA2LjIwMjVDNy40MjU2NyA2LjQ2NzUgNy40MjU2NyA2Ljg5NzE2IDcuMTYwNTEgNy4xNjIxNkw2LjQ0MDM0IDcuODgxOTFDNi4xNzUxOCA4LjE0NjkyIDYuMTc1MTggOC41NzY1NyA2LjQ0MDM0IDguODQxNThMNy40MDA1NyA5LjgwMTI1QzcuNjY1NzMgMTAuMDY2MyA4LjA5NTYzIDEwLjA2NjMgOC4zNjA3OSA5LjgwMTI1TDkuMzIxMDIgOC44NDE1OEM5LjU4NjE4IDguNTc2NTcgOS41ODYxOCA4LjE0NjkyIDkuMzIxMDIgNy44ODE5MUw4LjYwMDg1IDcuMTYyMTZDOC4zMzU2OSA2Ljg5NzE2IDguMzM1NjkgNi40Njc1IDguNjAwODUgNi4yMDI0OUw5LjMyMTAyIDUuNDgyNzRDOS41ODYxOCA1LjIxNzc0IDkuNTg2MTggNC43ODgwOCA5LjMyMTAyIDQuNTIzMDhMOC44NDA5IDQuMDQzMjRDOC41NzU3NSAzLjc3ODI0IDguNTc1NzUgMy4zNDg1OCA4Ljg0MDkgMy4wODM1OEw5LjgwMTEzIDIuMTIzOTFDMTAuMDY2MyAxLjg1ODkgMTAuMDY2MyAxLjQyOTI1IDkuODAxMTMgMS4xNjQyNEw4Ljg0MDkgMC4yMDQ1NzVDOC43Mjg4MyAwLjA5MjU2NTMgOC41ODczMiAwLjAyNzg5ODIgOC40NDEyNiAwLjAxMDU3NTVDOC4yMDExMSAtMC4wMjkyNTE2IDcuOTQ1OTEgMC4wNDM0MTIyIDcuNzYwNjUgMC4yMjg1NjdMNi45MDI5NyAxLjA4NTc1QzYuNjY0OTggMS4xNjgwNiA2LjM5MDMyIDEuMTE0MjUgNi4yMDAyOCAwLjkyNDMyNkw1LjQ4MDExIDAuMjA0NTc1QzUuMjE0OTUgLTAuMDYwNDI5NCA0Ljc4NTA1IC0wLjA2MDQyODkgNC41MTk4OSAwLjIwNDU3NkwzLjc5OTcyIDAuOTI0MzI2QzMuNTM0NTYgMS4xODkzMyAzLjEwNDY1IDEuMTg5MzMgMi44Mzk0OSAwLjkyNDMyNkwyLjExOTMyIDAuMjA0NTc2QzEuODU0MTYgLTAuMDYwNDI4OSAxLjQyNDI1IC0wLjA2MDQyOSAxLjE1OTEgMC4yMDQ1NzZMMC4xOTg4NjkgMS4xNjQyNFoiIGZpbGw9IiM2MzYzNjMiLz4KPC9zdmc+Cg==" loading="lazy" className="footer-socials-ico" />
                    </a>
                  </li>
                  <li className="footer-socials-item">
                    <a rel="noreferer, noopener noreferrer" href="https://medium.com/@chaingpt" target="_blank" className="footer-socials-link w-inline-block">
                      <div className="">
MEDIUM                      </div>
                      <img width={10} height={10} alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTk4ODY5IDEuMTY0MjRDLTAuMDY2Mjg5OSAxLjQyOTI1IC0wLjA2NjI4OTggMS44NTg5IDAuMTk4ODY5IDIuMTIzOTFMMS4xNTkxIDMuMDgzNThDMS40MjQyNSAzLjM0ODU4IDEuODU0MTYgMy4zNDg1OCAyLjExOTMyIDMuMDgzNThMMi44Mzk0OSAyLjM2MzgzQzMuMTA0NjUgMi4wOTg4MiAzLjUzNDU2IDIuMDk4ODIgMy43OTk3MiAyLjM2MzgzTDQuNTE5ODkgMy4wODM1OEM0LjU4ODE3IDMuMTUxODIgNC42NjczOCAzLjIwMjQ5IDQuNzUxODggMy4yMzU1OEwwLjU4Mjk2IDcuNDAyMDhDMC4yNzgwMjcgNy43MDY4MyAwLjI3ODAyNyA4LjIwMDk0IDAuNTgyOTYgOC41MDU3TDEuMTM1MDkgOS4wNTc1QzEuNDQwMDIgOS4zNjIyNiAxLjkzNDQyIDkuMzYyMjYgMi4yMzkzNSA5LjA1NzVMNi4yNDM1MSA1LjA1NTY3QzYuMjU1NTkgNS4yMTEzNiA2LjMyMTIgNS4zNjM2NyA2LjQ0MDM0IDUuNDgyNzRMNy4xNjA1MSA2LjIwMjVDNy40MjU2NyA2LjQ2NzUgNy40MjU2NyA2Ljg5NzE2IDcuMTYwNTEgNy4xNjIxNkw2LjQ0MDM0IDcuODgxOTFDNi4xNzUxOCA4LjE0NjkyIDYuMTc1MTggOC41NzY1NyA2LjQ0MDM0IDguODQxNThMNy40MDA1NyA5LjgwMTI1QzcuNjY1NzMgMTAuMDY2MyA4LjA5NTYzIDEwLjA2NjMgOC4zNjA3OSA5LjgwMTI1TDkuMzIxMDIgOC44NDE1OEM5LjU4NjE4IDguNTc2NTcgOS41ODYxOCA4LjE0NjkyIDkuMzIxMDIgNy44ODE5MUw4LjYwMDg1IDcuMTYyMTZDOC4zMzU2OSA2Ljg5NzE2IDguMzM1NjkgNi40Njc1IDguNjAwODUgNi4yMDI0OUw5LjMyMTAyIDUuNDgyNzRDOS41ODYxOCA1LjIxNzc0IDkuNTg2MTggNC43ODgwOCA5LjMyMTAyIDQuNTIzMDhMOC44NDA5IDQuMDQzMjRDOC41NzU3NSAzLjc3ODI0IDguNTc1NzUgMy4zNDg1OCA4Ljg0MDkgMy4wODM1OEw5LjgwMTEzIDIuMTIzOTFDMTAuMDY2MyAxLjg1ODkgMTAuMDY2MyAxLjQyOTI1IDkuODAxMTMgMS4xNjQyNEw4Ljg0MDkgMC4yMDQ1NzVDOC43Mjg4MyAwLjA5MjU2NTMgOC41ODczMiAwLjAyNzg5ODIgOC40NDEyNiAwLjAxMDU3NTVDOC4yMDExMSAtMC4wMjkyNTE2IDcuOTQ1OTEgMC4wNDM0MTIyIDcuNzYwNjUgMC4yMjg1NjdMNi45MDI5NyAxLjA4NTc1QzYuNjY0OTggMS4xNjgwNiA2LjM5MDMyIDEuMTE0MjUgNi4yMDAyOCAwLjkyNDMyNkw1LjQ4MDExIDAuMjA0NTc1QzUuMjE0OTUgLTAuMDYwNDI5NCA0Ljc4NTA1IC0wLjA2MDQyODkgNC41MTk4OSAwLjIwNDU3NkwzLjc5OTcyIDAuOTI0MzI2QzMuNTM0NTYgMS4xODkzMyAzLjEwNDY1IDEuMTg5MzMgMi44Mzk0OSAwLjkyNDMyNkwyLjExOTMyIDAuMjA0NTc2QzEuODU0MTYgLTAuMDYwNDI4OSAxLjQyNDI1IC0wLjA2MDQyOSAxLjE1OTEgMC4yMDQ1NzZMMC4xOTg4NjkgMS4xNjQyNFoiIGZpbGw9IiM2MzYzNjMiLz4KPC9zdmc+Cg==" loading="lazy" className="footer-socials-ico" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-copy-row">
              <div className="footer-copy-col">
                <div className="footer-copyright">
                  <div className="copyright-year">
© 2025                  </div>
                  <div className="copyright-text">
All rights reserved by ChainGPTlabs.org.                  </div>
                </div>
              </div>
              <div className="footer-label-col hidden">
                <img loading="lazy" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA2IiBoZWlnaHQ9IjQ0IiB2aWV3Qm94PSIwIDAgMjA2IDQ0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTk3LjM0OCAwLjQwODIwM0g4LjY1MjExQzQuMTAxMjggMC40MDgyMDMgMC40MTIxMDkgNC4wNTYyNSAwLjQxMjEwOSA4LjU1NjM1VjM1LjQ0NTJDMC40MTIxMDkgMzkuOTQ1MyA0LjEwMTI4IDQzLjU5MzQgOC42NTIxMSA0My41OTM0SDE5Ny4zNDhDMjAxLjg5OSA0My41OTM0IDIwNS41ODggMzkuOTQ1MyAyMDUuNTg4IDM1LjQ0NTJWOC41NTYzNUMyMDUuNTg4IDQuMDU2MjUgMjAxLjg5OSAwLjQwODIwMyAxOTcuMzQ4IDAuNDA4MjAzWiIgZmlsbD0iIzIyMUQyMSIvPgo8cGF0aCBkPSJNNDcuOTA2NyA4LjY4NDY1SDQ0LjE4MzhWMTMuOTY0OEg0NS4zNDA3VjExLjc5OTRINDcuNTcyOVYxMC44Nzk4SDQ1LjM0MDdWOS42NTYxNUg0Ny45MDY3VjguNjg0NjVaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik01Mi41NCA4LjY4NDY1SDQ4LjU3OThWMTMuOTY0OEg1Mi41OTE5VjEyLjk5MzNINDkuNzI5M1YxMS42OTU1SDUyLjMxMDFWMTAuNzgzNEg0OS43MjkzVjkuNjMzOUg1Mi41NFY4LjY4NDY1WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNTYuMDEzOSA4LjY3NzI0SDU0LjgxOTlMNTIuODEwMiAxMy45NjQ4SDUzLjk5NjhMNTQuNDI2OSAxMi43ODU3SDU2LjM5MjFMNTYuODA3NCAxMy45NjQ4SDU4LjAyMzZMNTYuMDEzOSA4LjY3NzI0Wk01Ni4xMTAzIDExLjk0MDNINTQuNzA4N0w1NS40MTMyIDkuOTc1MDRMNTYuMTEwMyAxMS45NDAzWiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNjEuODM4MSA4LjY4NDY1SDU3LjQ5OTdWOS42NzA5OEg1OS4wODY3VjEzLjk2NDhINjAuMjUxVjkuNjcwOThINjEuODM4MVY4LjY4NDY1WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNjYuOTQyNyA4LjY4NDY1SDY1Ljc4NThWMTEuODQzOUM2NS43ODU4IDEyLjYyMjUgNjUuNjAwNCAxMy4xMTIgNjQuNzEwNSAxMy4xMTJDNjMuODA1OCAxMy4xMTIgNjMuNTc1OSAxMi42NTIyIDYzLjU3NTkgMTEuODQzOVY4LjY4NDY1SDYyLjQxOVYxMS44NDM5QzYyLjQxOSAxMy4zNDkzIDYzLjEyMzUgMTQuMDY4NyA2NC42OTU3IDE0LjA2ODdDNjYuMjM4MiAxNC4wNjg3IDY2Ljk0MjcgMTMuMzY0MSA2Ni45NDI3IDExLjg1ODdWOC42ODQ2NVoiIGZpbGw9IiNFRUYyRkYiLz4KPHBhdGggZD0iTTY3Ljk4OTkgOC42ODQ2NVYxMy45NjQ4SDY5LjEzOTRWMTEuODk1OEg3MC4xNzAyQzcwLjkyNjcgMTEuODk1OCA3MS4xNDkyIDEyLjE1NTMgNzEuMjIzMyAxMi44ODIxQzcxLjI1MyAxMy4xNzEzIDcxLjI1MyAxMy42OTc5IDcxLjM4NjUgMTMuOTY0OEg3Mi41ODc5QzcyLjM4MDIgMTMuNzcyIDcyLjM2NTQgMTMuMDQ1MyA3Mi4zMzU3IDEyLjcxMTVDNzIuMjkxMiAxMi4xOTI0IDcyLjE0MjkgMTEuNTk5MSA3MS41NTcgMTEuNDgwNUM3Mi4wODM2IDExLjI4MDMgNzIuMzk1IDEwLjc5ODIgNzIuMzk1IDEwLjE4MjdDNzIuMzk1IDkuMTIyMiA3MS41ODY3IDguNjg0NjUgNzAuNjE1MiA4LjY4NDY1SDY3Ljk4OTlaTTY5LjEzOTQgOS41OTY4Mkg3MC4yODg5QzcwLjc3ODQgOS41OTY4MiA3MS4yNjA0IDkuNzAwNjQgNzEuMjYwNCAxMC4zMDg4QzcxLjI2MDQgMTAuOTYxNCA3MC43Nzg0IDExLjA1NzggNzAuMjM3IDExLjA1NzhINjkuMTM5NFY5LjU5NjgyWiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNzcuMjU3NiA4LjY4NDY1SDczLjI5NzRWMTMuOTY0OEg3Ny4zMDk1VjEyLjk5MzNINzQuNDQ2OVYxMS42OTU1SDc3LjAyNzdWMTAuNzgzNEg3NC40NDY5VjkuNjMzOUg3Ny4yNTc2VjguNjg0NjVaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik03OC4xMTM2IDEzLjk2NDhIODAuMjQ5NUM4MS44ODg0IDEzLjk2NDggODIuODA4IDEzLjAyMyA4Mi44MDggMTEuMzI0N0M4Mi44MDggOS42MTkwNyA4MS44ODg0IDguNjg0NjUgODAuMjQ5NSA4LjY4NDY1SDc4LjExMzZWMTMuOTY0OFpNNzkuMjYzMSAxMy4wMDA4VjkuNjQ4NzNIODAuMTA4NkM4MS4xNTQyIDkuNjQ4NzMgODEuNjQzNyAxMC4yNjQzIDgxLjY0MzcgMTEuMzI0N0M4MS42NDM3IDEyLjM4NTIgODEuMTY5IDEzLjAwMDggODAuMTA4NiAxMy4wMDA4SDc5LjI2MzFaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik04OC4wNTUgOC41NTg1OEM4Ni40NzU0IDguNTU4NTggODUuNDM3MiA5LjY1NjE1IDg1LjQzNzIgMTEuMzMyMkM4NS40MzcyIDEyLjk4NTkgODYuNDgyOCAxNC4wOTA5IDg4LjA0NzYgMTQuMDkwOUM4OS41OTc1IDE0LjA5MDkgOTAuNjQzMiAxMi45Nzg1IDkwLjY0MzIgMTEuMzMyMkM5MC42NDMyIDkuNjc4NCA4OS41OTc1IDguNTU4NTggODguMDU1IDguNTU4NThaTTg4LjA0MDIgOS41MDc4M0M4OC45MjI3IDkuNTA3ODMgODkuNDcxNSAxMC4xOTc1IDg5LjQ3MTUgMTEuMzA5OUM4OS40NzE1IDEyLjQzNzEgODguOTMwMSAxMy4xMzQzIDg4LjA1NSAxMy4xMzQzQzg3LjE1NzcgMTMuMTI2OCA4Ni42MDg5IDEyLjQ0NDYgODYuNjA4OSAxMS4zMDk5Qzg2LjYwODkgMTAuMjEyMyA4Ny4xNjUxIDkuNTA3ODMgODguMDQwMiA5LjUwNzgzWiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNOTEuNDM5MSAxMy45NjQ4SDkyLjU1ODlWMTAuNDJMOTQuNzQ2NiAxMy45NjQ4SDk1LjkwMzVWOC42ODQ2NUg5NC43OTExVjEyLjIyMjFMOTIuNjE4MiA4LjY4NDY1SDkxLjQzOTFWMTMuOTY0OFoiIGZpbGw9IiNFRUYyRkYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xODcuMDUgMTguNzM5OUgxNzcuOTg0TDE4Mi41MTcgMTAuNTkxOEwxODcuMDUgMTguNzM5OVoiIGZpbGw9IiNFRUYyRkYiLz4KPHBhdGggZD0iTTE4MS40OTcgMjguNjgwNVYyOS45OThIMTc2LjAwMkMxNzYuMDM0IDI4LjI2MjcgMTc2Ljk1NiAyNy42MDkzIDE3OC4zMDUgMjYuNjk4OEMxNzguOTY5IDI2LjI0ODggMTc5LjkyMyAyNS43NjY4IDE3OS45MjMgMjQuODQ1NkMxNzkuOTIzIDI0LjE5MjEgMTc5LjQ5NCAyMy43NjM3IDE3OC44NTIgMjMuNzYzN0MxNzguMDU5IDIzLjc2MzcgMTc3LjY3MyAyNC4yODg2IDE3Ny42MyAyNS4zOTE5SDE3Ni4xNzRWMjUuMjMxMkMxNzYuMTc0IDIzLjUyOCAxNzcuMjM0IDIyLjQ0NjEgMTc4LjkwNSAyMi40NDYxQzE4MC40MTYgMjIuNDQ2MSAxODEuNDU1IDIzLjM3OCAxODEuNDU1IDI0LjczODVDMTgxLjQ1NSAyNS45NDg5IDE4MC43OSAyNi40ODQ1IDE3OS45MDEgMjcuMDk1MUMxNzkuMjU5IDI3LjUzNDMgMTc4LjM4IDI4LjAzNzggMTc3Ljk1MiAyOC42ODA1SDE4MS40OTdaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik0xODcuMDY0IDIyLjU2MzlWMjMuODYwMUgxODMuOTlMMTgzLjcwMSAyNS40ODgzQzE4NC4wNjUgMjUuMTI0MSAxODQuNDgzIDI0Ljk2MzQgMTg1LjA4MiAyNC45NjM0QzE4Ni41MTggMjQuOTYzNCAxODcuNDcxIDI1LjkzODIgMTg3LjQ3MSAyNy40MTY1QzE4Ny40NzEgMjguOTkxMSAxODYuMjkzIDMwLjExNTkgMTg0LjY0MyAzMC4xMTU5QzE4My4xMjIgMzAuMTE1OSAxODEuOTk3IDI5LjMxMjUgMTgxLjkxMiAyNy43ODA3SDE4My40MTFDMTgzLjQ3NiAyOC40MzQxIDE4My45NjggMjguODg0IDE4NC42NDMgMjguODg0QzE4NS40MDQgMjguODg0IDE4NS45MzkgMjguMjk0OCAxODUuOTM5IDI3LjQ0ODZDMTg1LjkzOSAyNi42MDIzIDE4NS40MjUgMjYuMDY2NyAxODQuNjMzIDI2LjA2NjdDMTg0LjEyOSAyNi4wNjY3IDE4My43OTcgMjYuMjQ4OCAxODMuNTA4IDI2LjY4OEgxODIuMTQ3TDE4Mi44NzYgMjIuNTYzOUgxODcuMDY0WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTM0LjYwOCAyMi40MDdDMzQuNjA4IDI5LjM4MjEgMjguODg5NyAzNS4wMzY2IDIxLjgzNiAzNS4wMzY2QzE0Ljc4MjIgMzUuMDM2NiA5LjA2Mzk2IDI5LjM4MjEgOS4wNjM5NiAyMi40MDdDOS4wNjM5NiAxNS40MzE4IDE0Ljc4MjIgOS43NzczNCAyMS44MzYgOS43NzczNEMyOC44ODk3IDkuNzc3MzQgMzQuNjA4IDE1LjQzMTggMzQuNjA4IDIyLjQwN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjMuNDI4NiAyMi43Nzc3TDE5Ljg1MjUgMjIuNzc3OFYxOC45ODg5SDIzLjQyODZDMjQuNDc0MiAxOC45ODg5IDI1LjMyMTkgMTkuODM3IDI1LjMyMTkgMjAuODgzM0MyNS4zMjE5IDIxLjkyOTUgMjQuNDc0MiAyMi43Nzc3IDIzLjQyODYgMjIuNzc3N1pNMjMuNDI4NiAxNi40NjI5SDE3LjMyODFWMjkuMDkyNUgxOS44NTI1VjI1LjMwMzdIMjMuNDI4NkMyNS44Njg0IDI1LjMwMzcgMjcuODQ2MiAyMy4zMjQ2IDI3Ljg0NjIgMjAuODgzM0MyNy44NDYyIDE4LjQ0MiAyNS44Njg0IDE2LjQ2MjkgMjMuNDI4NiAxNi40NjI5WiIgZmlsbD0iIzIyMUQyMSIvPgo8cGF0aCBkPSJNNDQuMDU5MyAyMC4xNjJINDkuMzcxNkM1Mi4wMzY0IDIwLjE2MiA1My44ODggMjEuNDA3OSA1My44ODggMjQuMTI0NkM1My44ODggMjYuODA2NyA1MS45ODQ1IDI4LjA1MjYgNDkuNTEwMSAyOC4wNTI2SDQ2Ljc0MTRWMzIuNDgyNEg0NC4wNTkzVjIwLjE2MlpNNDYuNzQxNCAyMi4zNzY5VjI1LjkyNDJINDkuMTQ2N0M1MC4zNTggMjUuOTI0MiA1MS4yNTc4IDI1LjUyNjIgNTEuMjU3OCAyNC4xNTkyQzUxLjI1NzggMjIuODQ0MSA1MC4zNTggMjIuMzc2OSA0OS4xNjQgMjIuMzc2OUg0Ni43NDE0WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNjEuMTIwOSAyMy4zOTc4VjI1LjY2NDZDNjAuNjg4MyAyNS41NzgxIDYwLjQ0NjEgMjUuNTYwOCA2MC4xNjkyIDI1LjU2MDhDNTguNDczNCAyNS41NjA4IDU3LjgxNTggMjYuNzcyMSA1Ny44MTU4IDI4LjM5ODdWMzIuNDgyNEg1NS4zNTg3VjIzLjU1MzZINTcuNjk0N1YyNS4xOTc0QzU4LjI0ODQgMjQuMDM4MSA1OS4yNTIxIDIzLjM0NTkgNjAuNTg0NSAyMy4zNDU5QzYwLjc3NDggMjMuMzQ1OSA2MC44Nzg3IDIzLjM2MzIgNjEuMTIwOSAyMy4zOTc4WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNNjYuMTQwNyAyMy4yOTRDNjguODkyIDIzLjI5NCA3MC43MDkgMjUuMTgwMSA3MC43MDkgMjguMDE4QzcwLjcwOSAzMC44OTA1IDY4Ljg5MiAzMi43NTkzIDY2LjEwNjEgMzIuNzU5M0M2My4zMjAxIDMyLjc1OTMgNjEuNDg1OSAzMC44NzMxIDYxLjQ4NTkgMjguMDE4QzYxLjQ4NTkgMjUuMTgwMSA2My4zMzc0IDIzLjI5NCA2Ni4xNDA3IDIzLjI5NFpNNjYuMDcxNSAyNS4xNjI4QzY0Ljc1NjQgMjUuMTYyOCA2My45NDMxIDI2LjIzNTcgNjMuOTQzMSAyOC4wMThDNjMuOTQzMSAyOS44NTIyIDY0LjczOTEgMzAuOTA3OCA2Ni4xMDYxIDMwLjkwNzhDNjcuNDU1OCAzMC45MDc4IDY4LjI1MTggMjkuODM0OSA2OC4yNTE4IDI4LjAwMDdDNjguMjUxOCAyNi4yMTg0IDY3LjQzODUgMjUuMTYyOCA2Ni4wNzE1IDI1LjE2MjhaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik04MS4wMjc4IDMyLjQ4MjRINzguNzA5MVYzMS4zNDA0Qzc4LjEyMDcgMzIuMjU3NSA3Ny4yMzgyIDMyLjcyNDcgNzYuMDA5NyAzMi43MjQ3QzczLjUzNTIgMzIuNzI0NyA3MS45NjA1IDMwLjg3MzEgNzEuOTYwNSAyNy45ODM0QzcxLjk2MDUgMjUuMTYyOCA3My41MDA2IDIzLjMxMTMgNzUuODcxMiAyMy4zMTEzQzc2LjkyNjggMjMuMzExMyA3OC4wMTY5IDIzLjc0MzkgNzguNTg4IDI0LjY2MVYyMC4xNjJIODEuMDI3OFYzMi40ODI0Wk03OC42NzQ1IDI4LjAwMDdDNzguNjc0NSAyNi4yNzAzIDc3Ljg3ODUgMjUuMjQ5MyA3Ni41NDYxIDI1LjI0OTNDNzUuMjEzNyAyNS4yNDkzIDc0LjQzNSAyNi4yNzAzIDc0LjQzNSAyNy45ODM0Qzc0LjQzNSAyOS43MTM4IDc1LjIzMSAzMC43NTIgNzYuNTQ2MSAzMC43NTJDNzcuODk1OCAzMC43NTIgNzguNjc0NSAyOS43NDg0IDc4LjY3NDUgMjguMDAwN1oiIGZpbGw9IiNFRUYyRkYiLz4KPHBhdGggZD0iTTkxLjI3NzUgMjMuNTUzNlYzMi40ODI0SDg4Ljk0MTRWMzEuMjE5MkM4OC4yNjY2IDMyLjIwNTYgODcuMzE0OCAzMi43NDIgODYuMDM0MyAzMi43NDJDODQuMTEzNiAzMi43NDIgODIuOTE5NiAzMS42ODY0IDgyLjkxOTYgMjkuNTU4VjIzLjU1MzZIODUuMzk0MVYyOC42NTgyQzg1LjM5NDEgMjkuNzgzIDg1LjQ5NzkgMzAuNjgyOCA4Ni44OTk2IDMwLjY4MjhDODguNDM5NiAzMC42ODI4IDg4LjgzNzYgMjkuNTA2MSA4OC44Mzc2IDI4LjE1NjRWMjMuNTUzNkg5MS4yNzc1WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNMTAxLjY3MyAyOS4wMzg5QzEwMS4zNjIgMzEuMzU3NyA5OS43Njk4IDMyLjcwNzQgOTcuMzk5MiAzMi43MDc0Qzk0LjY0NzggMzIuNzA3NCA5Mi44NDgyIDMwLjg3MzEgOTIuODQ4MiAyOC4wODcyQzkyLjg0ODIgMjUuMTk3NCA5NC42NjUxIDIzLjI5NCA5Ny40MzM4IDIzLjI5NEM5OS44MjE3IDIzLjI5NCAxMDEuNDE0IDI0LjU5MTggMTAxLjYyMSAyNi42NjgzSDk5LjIxNjFDOTkuMDQzIDI1LjY4MTkgOTguNDAyOCAyNS4xMjgyIDk3LjQ1MTEgMjUuMTI4MkM5Ni4xMTg3IDI1LjEyODIgOTUuMzIyNyAyNi4yMDExIDk1LjMyMjcgMjguMDM1M0M5NS4zMjI3IDI5LjgxNzYgOTYuMDg0MSAzMC44Mzg1IDk3LjM5OTIgMzAuODM4NUM5OC40NTQ3IDMwLjgzODUgOTkuMTEyMyAzMC4yMTU2IDk5LjMwMjYgMjkuMDM4OUgxMDEuNjczWiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNMTA4LjAxIDIzLjU1MzZWMjUuMjE0N0gxMDYuMTkzVjI5LjQxOTZDMTA2LjE5MyAzMC4yODQ4IDEwNi4yMTEgMzAuNjgyOCAxMDcuMjY2IDMwLjY4MjhDMTA3LjUyNiAzMC42ODI4IDEwNy43MTYgMzAuNjgyOCAxMDguMDEgMzAuNjQ4MlYzMi41MTdDMTA3LjMzNSAzMi41Njg5IDEwNy4wNzYgMzIuNTg2MiAxMDYuNTIyIDMyLjU4NjJDMTA0LjQxMSAzMi41ODYyIDEwMy43NTQgMzIuMDMyNSAxMDMuNzU0IDI5Ljg1MjJWMjUuMjE0N0gxMDIuMjY1VjIzLjU1MzZIMTAzLjc1NFYyMC44NTQxSDEwNi4xOTNWMjMuNTUzNkgxMDguMDFaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik0xMjQuNjg5IDIwLjE2MlYzMi40ODI0SDEyMS45OVYyNy4xNzAxSDExNi45NTRWMzIuNDgyNEgxMTQuMjU1VjIwLjE2MkgxMTYuOTU0VjI0Ljc5OTRIMTIxLjk5VjIwLjE2MkgxMjQuNjg5WiIgZmlsbD0iI0VFRjJGRiIvPgo8cGF0aCBkPSJNMTM1LjE5NyAyMy41NTM2VjMyLjQ4MjRIMTMyLjg2VjMxLjIxOTJDMTMyLjE4NiAzMi4yMDU2IDEzMS4yMzQgMzIuNzQyIDEyOS45NTMgMzIuNzQyQzEyOC4wMzMgMzIuNzQyIDEyNi44MzkgMzEuNjg2NCAxMjYuODM5IDI5LjU1OFYyMy41NTM2SDEyOS4zMTNWMjguNjU4MkMxMjkuMzEzIDI5Ljc4MyAxMjkuNDE3IDMwLjY4MjggMTMwLjgxOSAzMC42ODI4QzEzMi4zNTkgMzAuNjgyOCAxMzIuNzU3IDI5LjUwNjEgMTMyLjc1NyAyOC4xNTY0VjIzLjU1MzZIMTM1LjE5N1oiIGZpbGw9IiNFRUYyRkYiLz4KPHBhdGggZD0iTTE0NS40ODggMzIuNDgyNEgxNDIuOTk3VjI3LjI3MzlDMTQyLjk5NyAyNi4xNjY1IDE0Mi43ODkgMjUuMzM1OSAxNDEuNDc0IDI1LjMzNTlDMTQwLjAwMyAyNS4zMzU5IDEzOS41MzYgMjYuMzkxNCAxMzkuNTM2IDI3LjY4OTJWMzIuNDgyNEgxMzcuMDk2VjIzLjU1MzZIMTM5LjQzMlYyNC43OTk0QzE0MC4xNDIgMjMuODQ3NyAxNDEuMTI4IDIzLjMxMTMgMTQyLjM5MSAyMy4zMTEzQzE0NC4yNzcgMjMuMzExMyAxNDUuNDg4IDI0LjQzNjEgMTQ1LjQ4OCAyNi41MTI1VjMyLjQ4MjRaIiBmaWxsPSIjRUVGMkZGIi8+CjxwYXRoIGQ9Ik0xNTIuMjUgMjMuNTUzNlYyNS4yMTQ3SDE1MC40MzNWMjkuNDE5NkMxNTAuNDMzIDMwLjI4NDggMTUwLjQ1MSAzMC42ODI4IDE1MS41MDYgMzAuNjgyOEMxNTEuNzY2IDMwLjY4MjggMTUxLjk1NiAzMC42ODI4IDE1Mi4yNSAzMC42NDgyVjMyLjUxN0MxNTEuNTc2IDMyLjU2ODkgMTUxLjMxNiAzMi41ODYyIDE1MC43NjIgMzIuNTg2MkMxNDguNjUxIDMyLjU4NjIgMTQ3Ljk5NCAzMi4wMzI1IDE0Ny45OTQgMjkuODUyMlYyNS4yMTQ3SDE0Ni41MDVWMjMuNTUzNkgxNDcuOTk0VjIwLjg1NDFIMTUwLjQzM1YyMy41NTM2SDE1Mi4yNVoiIGZpbGw9IiNFRUYyRkYiLz4KPC9zdmc+Cg==" alt="" className="product-hunt" />
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-decor fd-top-left"></div>
              <div className="footer-decor fd-top-right"></div>
              <div className="footer-decor fd-bottom-left"></div>
              <div className="footer-decor fd-bottom-right"></div>
              <div className="footer-bottom-divider fbd-left"></div>
              <div className="footer-bottom-divider fbd-middle"></div>
              <div className="footer-bottom-divider fbd-right"></div>
              <div id="3d-footer" className="webgl-wrapper">
                <img
                  src="/astra.png"
                  alt="ChainGPT Labs"
                  className="footer-astra-image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom-gape"></div>
      </section>
      <div id="cookie-consent-banner" className="cookie-popup">
        <div className="cookie-popup-body">
          <p className="m-0-2">
We use third-party cookies to personalize content, ads, and analyze website traffic.          </p>
        </div>
        <div className="cookie-popup-footer">
          <a id="btn-accept-all" href="index.html#" className="button-outline-gradient w-inline-block w--current">
            <div className="button-outline-gradient-border">
              <div className="button-outline-text-2 size-small accept">
Accept              </div>
            </div>
          </a>
          <a id="btn-reject-all" href="index.html#" className="button-outline-secondary outline-grey w-inline-block w--current">
            <div className="button-outline-secondary-border">
              <div className="button-outline-text-2 size-small">
Reject              </div>
            </div>
          </a>
          <div className="div-block-21">
            <a id="btn-hide-banner" href="index.html#" className="cookie-popup-close w-inline-block w--current">
              <img width={16} height={16} alt="Icon Close Cookies Popup" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuNSAxNC41TDE0LjIyNzkgMS43NzIwOCIgc3Ryb2tlPSIjRjZGNkY2IiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTEuNSAxLjVMMTQuMjI3OSAxNC4yMjc5IiBzdHJva2U9IiNGNkY2RjYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K" loading="lazy" className="cookie-popup-close-icon" />
            </a>
          </div>
        </div>
      </div>
      {/* Unicorn Studio */}
      {/* Unicorn Studio End */}
      {/* Utils */}
      {/* Utils End */}
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAkAAAEALAAAAAABAAEAAAICTAEAOw==" height={1} width={1} fetchPriority="high" style={{display: "none"}} className="" />
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAkAAAEALAAAAAABAAEAAAICTAEAOw==" height={1} width={1} fetchPriority="high" style={{display: "none"}} className="" />

    </div>
  );
}
