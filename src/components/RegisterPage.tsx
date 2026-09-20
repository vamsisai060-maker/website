import SiteHeader from '@/components/SiteHeader';
import RegisterForm from '@/components/RegisterForm';
import { EVENTS } from '@/data/events';

export default function RegisterPage({
  slug,
  locked,
}: {
  slug?: string;
  locked?: boolean;
}) {
  const event = slug ? EVENTS.find((item) => item.slug === slug) : undefined;

  return (
    <div className="register-page">
      <div className="body-lines-wrap">
        <div className="body-line left"></div>
        <div className="body-line left-middle"></div>
        <div className="body-line center"></div>
        <div className="body-line right-middle"></div>
        <div className="body-line right"></div>
      </div>
      <SiteHeader />
      <div className="page-wrapper">
        <div className="w-layout-blockcontainer container w-container">
          <div className="page-heading">
            <img
              width={44}
              height={44}
              src="/register/decor.svg"
              alt=""
              loading="lazy"
              className="page-heading-decor"
            />
            <div className="page-heading-title-col">
              <div className="marquee">
                <div className="marquee-content scroll apply-scroll">
                  <h1 className="page-heading-title apply-title">REGISTER</h1>
                </div>
                <div className="marquee-content scroll">
                  <div className="page-heading-title">REGISTER</div>
                </div>
              </div>
            </div>
            <div className="featured-block-info underscore">
              <div className="featured-block-descr-wrap">
                <div className="page-heading-descr">
                  <div className="page-heading-title">_</div>
                </div>
              </div>
            </div>
            <div className="page-heading-descr-col">
              <div className="page-heading-descr">
                <div className="page-heading-descr-text">Register your team for ASTRA 2K26</div>
                <div className="page-heading-descr-decor"></div>
              </div>
            </div>
          </div>
          <RegisterForm initialEventSlug={event?.slug} locked={locked} />
        </div>
      </div>
    </div>
  );
}