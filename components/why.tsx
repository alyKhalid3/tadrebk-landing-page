import {
  IconPin,
  IconIdCard,
  IconTrending,
  IconClock,
  IconChat,
  IconAward,
} from '@/components/icons';

// Real platform capabilities only — no invented users, quotes, or metrics.
const FACTS = [
  {
    Icon: IconPin,
    title: 'Made for Egypt',
    copy: 'The first platform connecting Egyptian university students with internship opportunities.',
  },
  {
    Icon: IconIdCard,
    title: 'Profiles that match',
    copy: 'Add your skills, education, and preferences to get matched with the best opportunities.',
  },
  {
    Icon: IconTrending,
    title: 'One dashboard',
    copy: 'Discover opportunities, track applications, and never miss an important update.',
  },
  {
    Icon: IconClock,
    title: 'Never miss a deadline',
    copy: 'Get timely reminders and stay ahead of every single opportunity.',
  },
  {
    Icon: IconChat,
    title: 'Connect & collaborate',
    copy: 'Communicate with companies, receive tasks, and grow your network.',
  },
  {
    Icon: IconAward,
    title: 'Earn a certificate',
    copy: 'Complete your internship and earn a certificate that proves your experience.',
  },
];

function FactCard({
  Icon,
  title,
  copy,
}: {
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  title: string;
  copy: string;
}) {
  return (
    <article className="fact-card">
      <span className="fact-card__icon" aria-hidden="true">
        <Icon width={20} height={20} />
      </span>
      <h3 className="fact-card__title">{title}</h3>
      <p className="fact-card__copy">{copy}</p>
    </article>
  );
}

export default function Why() {
  return (
    <section id="why" className="section stories" aria-label="Why Tadreebak">
      <div className="container">
        <div className="section__head section__head--center" data-reveal>
          <p className="eyebrow">Why Tadreebak</p>
          <h2 className="section__title">Built to get you hired</h2>
          <p className="section__sub">
            Every feature exists for one reason — taking you from student to intern.
          </p>
        </div>
      </div>

      <div className="stories__marquee" data-marquee data-reveal>
        <ul className="stories__track">
          {FACTS.map(({ Icon, title, copy }) => (
            <li key={title}>
              <FactCard Icon={Icon} title={title} copy={copy} />
            </li>
          ))}
        </ul>
        <ul className="stories__track stories__track--clone" aria-hidden="true">
          {FACTS.map(({ Icon, title, copy }) => (
            <li key={`clone-${title}`}>
              <FactCard Icon={Icon} title={title} copy={copy} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
