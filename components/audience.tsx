import { appLink } from '@/lib/app-url';
import {
  IconUsers,
  IconBriefcase,
  IconArrowRight,
  IconCheck,
  IconCode,
  IconSend,
  IconAward,
} from '@/components/icons';

// Product facts only — every line describes a real platform capability.
const FACTS = [
  {
    Icon: IconCheck,
    title: 'Free for students',
    copy: 'Create your profile, explore internships, and apply — completely free.',
  },
  {
    Icon: IconCode,
    title: '6 career fields',
    copy: 'Software, marketing, design, digital, finance, and human resources.',
  },
  {
    Icon: IconSend,
    title: 'One-click apply',
    copy: 'Submit your application and track every status in real time.',
  },
  {
    Icon: IconAward,
    title: 'Earn a certificate',
    copy: 'Complete your internship and earn a certificate that proves your experience.',
  },
];

export default function Audience() {
  return (
    <section className="section audience" aria-label="Who Tadreebak is for">
      <div className="container">
        <div className="audience__grid" data-reveal-group>
          <div className="audience__cell">
            <article className="audience__card audience__card--students">
              <span className="audience__tile audience__tile--mint" aria-hidden="true">
                <IconUsers width={26} height={26} />
              </span>
              <h2 className="audience__title">For Students</h2>
              <p className="audience__copy">
                Create your profile, discover internships that match your skills, and launch your
                career — all for free.
              </p>
              <a href={appLink('/register')} className="btn btn--primary audience__btn">
                Get Started Free
                <IconArrowRight width={18} height={18} />
              </a>
            </article>
          </div>

          <div className="audience__cell">
            <article className="audience__card audience__card--companies" id="companies">
              <span className="audience__tile audience__tile--white" aria-hidden="true">
                <IconBriefcase width={26} height={26} />
              </span>
              <h2 className="audience__title">For Companies</h2>
              <p className="audience__copy">
                Post internship opportunities and find the best emerging talent from Egypt&rsquo;s
                top universities.
              </p>
              <a href={appLink('/register?type=company')} className="btn btn--white audience__btn">
                Post an Internship
                <IconArrowRight width={18} height={18} />
              </a>
            </article>
          </div>
        </div>

        <ul className="audience__facts" data-reveal-group>
          {FACTS.map(({ Icon, title, copy }) => (
            <li key={title} className="audience__fact">
              <span className="audience__fact-icon" aria-hidden="true">
                <Icon width={20} height={20} />
              </span>
              <strong className="audience__fact-title">{title}</strong>
              <span className="audience__fact-copy">{copy}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
