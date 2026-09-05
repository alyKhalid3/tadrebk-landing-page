import Image from 'next/image';
import { appLink } from '@/lib/app-url';
import {
  IconLinkedIn,
  IconTwitter,
  IconInstagram,
  IconFacebook,
} from '@/components/icons';

const COLUMNS = [
  {
    heading: 'Student',
    links: [
      { label: 'Dashboard', href: appLink('/dashboard') },
      { label: 'My Profile', href: appLink('/profile') },
      { label: 'My Applications', href: appLink('/my-applications') },
      { label: 'Notifications', href: appLink('/notifications') },
    ],
  },
  {
    heading: 'Explore',
    links: [
      { label: 'Browse Internships', href: appLink('/internships') },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Why Tadreebak', href: '#why' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', href: appLink('/help') },
      { label: 'Contact Us', href: appLink('/contact') },
      { label: 'Privacy Policy', href: appLink('/privacy') },
      { label: 'Terms of Service', href: appLink('/terms') },
      { label: 'FAQ', href: appLink('/faq') },
    ],
  },
];

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', Icon: IconLinkedIn },
  { label: 'Twitter', href: 'https://twitter.com', Icon: IconTwitter },
  { label: 'Instagram', href: 'https://www.instagram.com', Icon: IconInstagram },
  { label: 'Facebook', href: 'https://www.facebook.com', Icon: IconFacebook },
];

export default function Footer() {
  return (
    <footer className="footer" aria-label="Footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Image
              src="/images/logoandfav@2x.webp"
              alt="Tadreebak"
              width={232}
              height={193}
              className="footer__logo"
            />
            <p className="footer__tagline">
              Connecting Egypt&rsquo;s brightest university students with the future of work. Your
              career starts here.
            </p>
            <div className="footer__socials">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a key={label} href={href} className="footer__social" aria-label={label} rel="noopener noreferrer" target="_blank">
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} className="footer__col" aria-label={col.heading}>
              <h3 className="footer__heading">{col.heading}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__bottom">
          <p>© 2026 Tadreebak. All rights reserved.</p>
          <p className="footer__made" lang="ar" dir="rtl" translate="no">
            صُنع في القاهرة <span aria-hidden="true">·</span> Made in Cairo
          </p>
        </div>
      </div>
      <span className="footer__glow" aria-hidden="true" />
      <span className="footer__watermark" aria-hidden="true">
        tadreebak
      </span>
    </footer>
  );
}
