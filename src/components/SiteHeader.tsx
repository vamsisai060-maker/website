'use client';

import Link from 'next/link';
import DecryptedText from '@/components/DecryptedText';
import StaggeredMenu from '@/components/StaggeredMenu';

const BURGER_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExIDE0SDI5IiBzdHJva2U9IiM0RTRFNEUiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMTEgMjBMMjkgMjAiIHN0cm9rZT0iIzRFNEU0RSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xMSAyNkgyOSIgc3Ryb2tlPSIjNEU0RTRFIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==';
const CLOSE_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0IDI3TDI2LjcyNzkgMTQuMjcyMSIgc3Ryb2tlPSIjNEU0RTRFIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE0IDE0TDI2LjcyNzkgMjYuNzI3OSIgc3Ryb2tlPSIjNEU0RTRFIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==';

export default function SiteHeader() {
  return (
    <>
      <div className="portfolio-apply-header">
        <div className="page-custom-styles w-embed">
          <svg style={{visibility: 'hidden', position: 'absolute'}} width={0} height={0} xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="rounded-corners">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag"></feColorMatrix>
                <feComposite in="SourceGraphic" in2="flt_tag" operator="atop"></feComposite>
              </filter>
            </defs>
          </svg>
        </div>
        <div className="header-clip-wrapper header-clip-wrapper-left">
          <div className="header-clip header-clip-left"></div>
        </div>
        <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="header-navbar w-nav">
          <div className="header-container w-container">
            <div className="header-inner">
              <div className="brand-wrap">
                <Link href="/" className="brand w-nav-brand" aria-label="home">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM0IiBoZWlnaHQ9IjQ1IiB2aWV3Qm94PSIwIDAgMTM0IDQ1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNDQuMjM2OSAxMS43ODI3QzQ0LjIzNjkgOS44NTQ2NCA0NC4wNzY3IDkuNDc5NzMgNDIuNzQxNiA4LjE0MDc5TDM2LjExOTcgMS40OTk2MkMzNC43ODQ2IDAuMTYwNjc1IDM0LjQxMDggMCAzMi40ODgzIDBIMTQuMjc3MUMxNC4yNDAyIDAgMTQuMjAzOCA3LjkxMDQ5ZS0wNSAxNC4xNjgyIDAuMDAwMjQ3OTU1SDExLjc0ODZDOS44MjYxIDAuMDAwMjQ3OTU1IDkuNDUyMjggMC4xNjA5MjEgOC4xMTcyMSAxLjQ5OTg3TDEuNDk1MjggOC4xNDEwNEMwLjE2MDIwOCA5LjQ3OTk4IDAgOS44NTQ4OSAwIDExLjc4M1YzMi40NTRDMCAzNC4zODIgMC4xNjAyMDggMzQuNzU3IDEuNDk1MjggMzYuMDk1OUw4LjExNzIxIDQyLjczNzFDOS40NTIyOCA0NC4wNzYgOS44MjYxIDQ0LjIzNjcgMTEuNzQ4NiA0NC4yMzY3SDI3LjIzNTRDMjcuMzE3MSA0NC4yMzY3IDI3LjM5NTggNDQuMjM2MyAyNy40NzE1IDQ0LjIzNTRIMzIuNDg4M0MzNC40MTA4IDQ0LjIzNTQgMzQuNzg0NiA0NC4wNzQ3IDM2LjExOTcgNDIuNzM1OEw0Mi43NDE2IDM2LjA5NDZDNDQuMDc2NyAzNC43NTU3IDQ0LjIzNjkgMzQuMzgwOCA0NC4yMzY5IDMyLjQ1MjdWMjkuMzA2OEM0NC4yMzY5IDI3LjM3ODcgNDQuMDIzMyAyNy4xNjQ1IDQyLjEwMDggMjcuMTY0NUgzOS45NjQ3QzM4LjA0MjIgMjcuMTY0NSAzNy44Mjg2IDI3LjM3ODcgMzcuODI4NiAyOS4zMDY4VjM2LjkwMjNDMzcuODI4NiAzNy40MTEzIDM3LjQxNjggMzcuODIxMyAzNi45MDc4IDM3LjgyMTNIMjcuODQ5NkMyNy42NjcyIDM3LjgxMjggMjcuNDYzMyAzNy44MDk4IDI3LjIzNTQgMzcuODA5OEg3Ljg2Mzk1QzcuMzU0OTYgMzcuODA5OCA2Ljk0MjM1IDM3LjM5OCA2Ljk0MjM1IDM2Ljg4OVY3LjM0NTM5QzYuOTQyMzUgNi44MzY0MSA3LjM0NTk0IDYuNDI3MTkgNy44NTQ5MyA2LjQyNzE5SDI3LjIzNTRDMjcuNDc2NCA2LjQyNzE5IDI3LjY5MDYgNi40MjM4MiAyNy44ODA5IDYuNDE0MTNMM2YuOTA3OCA2LjQxNDEzQzM3LjQxNjggNi40MTQxMyAzNy44Mjg2IDYuODIyNjggMzcuODI4NiA3LjMzMTY2TDM3LjgyODYgMTcuNTkwNEMzNy44Mjg2IDE5LjUxODUgMzguMDQyMiAxOS43MzI3IDM5Ljk2NDcgMTkuNzMyN0g0Mi4xMDA4QzQ0LjAyMzMgMTkuNzMyNyA0NC4yMzY5IDE5LjUxODUgNDQuMjM2OSAxNy41OTA0VjExLjc4MjdaIiBmaWxsPSIjRkY2MDAxIi8+PC9zdmc+" loading="lazy" width={134} height={44} alt="" className="brand-image" />
                </Link>
              </div>
              <div className="header-main-nav">
                <nav role="navigation" className="nav-menu w-nav-menu">
                  <ul id="w-node-_25add9ba-5160-246b-6d87-3ffd945c5436-945c542c" role="list" className="header-menu">
                    <li className="header-menu-item">
                      <Link href="/events" className="header-menu-link w-inline-block">
                        <div className="header-menu-link-wrapper">
                          <div scramble-text="" className="header-menu-link-text">
                            <DecryptedText text="Our Events" animateOn="hover" encryptedClassName="header-menu-encrypted-char" />
                          </div>
                          <div className="header-menu-link-dekor header-menu-link-dekor-right"></div>
                          <div className="header-menu-link-dekor header-menu-link-dekor-left"></div>
                        </div>
                      </Link>
                    </li>
                    <li className="header-menu-item">
                      <Link href="/#team-section" className="header-menu-link w-inline-block">
                        <div className="header-menu-link-wrapper">
                          <div scramble-text="" className="header-menu-link-text">
                            <DecryptedText text="Our Visionaries" animateOn="hover" encryptedClassName="header-menu-encrypted-char" />
                          </div>
                          <div className="header-menu-link-dekor header-menu-link-dekor-right"></div>
                          <div className="header-menu-link-dekor header-menu-link-dekor-left"></div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="menu-button w-nav-button" style={{WebkitUserSelect: 'text'}} aria-label="menu" role="button" tabIndex={0} aria-controls="w-nav-overlay-0" aria-haspopup="menu" aria-expanded="false">
                  <img src={BURGER_SVG} loading="lazy" alt="" className="menu-icon-burger" />
                  <img src={CLOSE_SVG} loading="lazy" alt="" className="menu-icon-burger-close" />
                </div>
              </div>
              <div className="header-actions" style={{justifyContent: 'flex-end'}}>
                <a scramble-link="" data-style-width="" href="/apply" className="button-primary w-inline-block">
                  <div className="button-primary-border">
                    <div scramble-text="" className="button-primary-text">Apply now</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="body-line left-middle"></div>
            <div className="body-line right-middle"></div>
          </div>
          <div className="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
        </div>
        <div className="header-clip-wrapper header-clip-wrapper-right">
          <div className="header-clip header-clip-right"></div>
        </div>
      </div>
      <div className="mobile-staggered-menu">
        <StaggeredMenu
          position="right"
          colors={['#0e0e0e', '#1b1b1b']}
          items={[
            { label: 'Our Events', link: '/events' },
            { label: 'Our Visionaries', link: '/#team-section' },
          ]}
          accentColor="#ff7120"
          menuButtonColor="#0e0e0e"
          openMenuButtonColor="#0e0e0e"
          displaySocials={false}
          displayItemNumbering={true}
          isFixed={true}
          logoUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        />
      </div>
    </>
  );
}
