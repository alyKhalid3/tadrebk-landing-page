import Header from '@/components/header';
import Hero from '@/components/hero';
import Audience from '@/components/audience';
import Featured from '@/components/featured';
import Categories from '@/components/categories';
import HowItWorks from '@/components/how-it-works';
import DashboardPreview from '@/components/dashboard-preview';
import Why from '@/components/why';
import CTA from '@/components/cta';
import Footer from '@/components/footer';
import { SITE_URL } from '@/lib/app-url';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'Tadreebak',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logoandfav.png`,
      description:
        "Egypt's first platform connecting university students with internship opportunities.",
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#site`,
      url: SITE_URL,
      name: 'Tadreebak',
      publisher: { '@id': `${SITE_URL}/#org` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/internships?title={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#internships">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main id="top">
        <Hero />
        <Audience />
        <Featured />
        <Categories />
        <HowItWorks />
        <DashboardPreview />
        <Why />
        <CTA />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
