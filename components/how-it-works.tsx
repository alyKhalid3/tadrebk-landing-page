import {
  IconUserPlus,
  IconIdCard,
  IconSearch,
  IconSend,
  IconChat,
  IconAward,
} from '@/components/icons';

const STEPS = [
  {
    n: '01',
    title: 'Create Account',
    copy: "Sign up as a student or a company in seconds — it's completely free.",
    color: 'green',
    Icon: IconUserPlus,
  },
  {
    n: '02',
    title: 'Build Your Profile',
    copy: 'Add your skills, education, and preferences to get matched with the best opportunities.',
    color: 'red',
    Icon: IconIdCard,
  },
  {
    n: '03',
    title: 'Explore Opportunities',
    copy: 'Browse hundreds of internships filtered by field, location, and type.',
    color: 'blue',
    Icon: IconSearch,
  },
  {
    n: '04',
    title: 'Apply & Get Hired',
    copy: 'Submit your application with one click and track every status in real time.',
    color: 'violet',
    Icon: IconSend,
  },
  {
    n: '05',
    title: 'Connect & Collaborate',
    copy: 'Communicate with companies, receive tasks, and grow your network.',
    color: 'amber',
    Icon: IconChat,
  },
  {
    n: '06',
    title: 'Earn Certificate',
    copy: 'Complete your internship and earn a certificate that proves your experience.',
    color: 'rose',
    Icon: IconAward,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section hiw" aria-label="How Tadreebak works">
      <div className="container">
        <div className="section__head section__head--center" data-reveal>
          <p className="eyebrow">Six easy steps</p>
          <h2 className="section__title">How it works</h2>
          <p className="section__sub">Six easy steps to land your next internship.</p>
        </div>

        <div className="hiw__wrap" data-timeline>
          <span className="hiw__line" data-timeline-line aria-hidden="true" />
          <ol className="hiw__grid" data-reveal-group>
            {STEPS.map(({ n, title, copy, color, Icon }) => (
              <li key={n} className={`step-card step-card--${color}`}>
                <span className="step-card__tile" aria-hidden="true">
                  <Icon width={24} height={24} />
                </span>
                <span className="step-card__ghost" aria-hidden="true">
                  {n}
                </span>
                <h3 className="step-card__title">{title}</h3>
                <p className="step-card__copy">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
