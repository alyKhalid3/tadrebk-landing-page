import { appLink } from '@/lib/app-url';
import { IconArrowRight } from '@/components/icons';

export default function CTA() {
  return (
    <section className="cta" aria-label="Get started with Tadreebak">
      <div className="container cta__inner">
        <div className="cta__copy" data-reveal>
          <h2 className="cta__title">Ready to accelerate your career?</h2>
          <p className="cta__sub">
            Join Tadreebak today and get access to exclusive internship opportunities tailored for
            your growth.
          </p>
        </div>
        <div className="cta__actions" data-reveal>
          <a href={appLink('/register')} className="btn btn--white btn--lg">
            Get Started Free
            <IconArrowRight width={18} height={18} />
          </a>
          <a href={appLink('/internships')} className="btn btn--outline-white btn--lg">
            View Opportunities
          </a>
        </div>
      </div>
      <span className="cta__torus" aria-hidden="true" />
      <span className="cta__torus cta__torus--inner" aria-hidden="true" />
      <span className="cta__grain" aria-hidden="true" />
    </section>
  );
}
