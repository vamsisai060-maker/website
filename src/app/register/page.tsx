import SiteHeader from '@/components/SiteHeader';
import RegisterFormView from './RegisterForm';

const DECOR =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MyIgaGVpZ2h0PSI0MyIgZmlsbD0iI0Y2RjZGNiIvPgo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjQzIiBoZWlnaHQ9IjQzIiBzdHJva2U9IiM5RTlFOUUiLz4KPHBhdGggZD0iTTE4LjM4NTMgMjQuOTE3Nkw5LjAwMDA4IDM0LjMwMjlMOS42OTcxNyAzNUwxOS4wODI1IDI1LjYxNDdIMjQuOTE3NUwzNC4zMDI4IDM1TDM0Ljk5OTkgMzQuMzAyOUwyNS42MTQ3IDI0LjkxNzdWMTkuMDgyNEwzNSA5LjY5NzA5TDM0LjMwMjkgOUwyNC45MTc3IDE4LjM4NTNIMTkuMDgyM0w5LjY5NzA4IDlMOSA5LjY5NzA5TDE4LjM4NTMgMTkuMDgyNVYyNC45MTc2WiIgZmlsbD0iIzlFOUU5RSIvPgo8L3N2Zz4K';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[var(--lightgrey)] overflow-hidden">
      <div className="body-lines-wrap">
        <div className="body-line left" />
        <div className="body-line left-middle" />
        <div className="body-line center" />
        <div className="body-line right-middle" />
        <div className="body-line right" />
      </div>
      <SiteHeader />
      <main className="page-wrapper">
        <div className="w-layout-blockcontainer container w-container">
          <div className="page-heading">
            <img src={DECOR} loading="lazy" width={44} height={44} alt="" className="page-heading-decor" />
            <div className="page-heading-title-col">
              <div className="marquee register-page-marquee">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="marquee-content scroll apply-scroll">
                    {i === 0 ? (
                      <h1 className="page-heading-title apply-title">REGISTER </h1>
                    ) : (
                      <div className="page-heading-title apply-title">REGISTER </div>
                    )}
                    <div className="page-heading-title underscore">_</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="featured-block-info underscore">
              <div className="featured-block-descr-wrap">
                <div className="page-heading-descr">
                  <div className="page-heading-title" style={{ opacity: 0.5334 }}>
                    _
                  </div>
                </div>
              </div>
            </div>
            <div className="page-heading-descr-col">
              <div className="page-heading-descr">
                <div className="page-heading-descr-text">Pick your game and fill in the short form to secure your slot</div>
                <div className="page-heading-descr-decor" />
              </div>
            </div>
          </div>
          <RegisterFormView />
        </div>
      </main>
    </div>
  );
}