import { appLink } from '@/lib/app-url';
import { IconCheck, IconArrowRight, IconClock } from '@/components/icons';

const BENEFITS = [
  {
    title: 'Stay Organized',
    copy: 'All your applications and updates in one central, easy-to-use dashboard.',
  },
  {
    title: 'Find Better Matches',
    copy: 'Personalised recommendations based on your student profile and skills.',
  },
  {
    title: 'Never Miss a Deadline',
    copy: 'Get timely reminders and stay ahead of every single opportunity.',
  },
];

const RECENT = [
  { company: 'Nile Labs', role: 'Frontend Intern', status: 'In review', tone: 'amber' },
  { company: 'Delta Fintech', role: 'Growth Intern', status: 'Accepted', tone: 'green' },
  { company: 'Cairo Pixels', role: 'Design Intern', status: 'New', tone: 'blue' },
];

const RECOMMENDED = [
  { title: 'Marketing Intern', location: 'On-site', tone: 'green' },
  { title: 'Data Analyst Intern', location: 'Remote', tone: 'blue' },
  { title: 'Finance Intern', location: 'On-site', tone: 'amber' },
];

export default function DashboardPreview() {
  return (
    <section className="section dash" aria-label="Manage your internship journey">
      <div className="container dash__grid">
        <div className="dash__copy">
          <p className="eyebrow eyebrow--dark" data-reveal>
            Student dashboard
          </p>
          <h2 className="section__title dash__title" data-reveal>
            Manage your <em>internship journey</em> in one place
          </h2>
          <p className="dash__body" data-reveal>
            Discover opportunities, track applications and never miss an important update. Join
            thousands of students launching their careers today.
          </p>

          <ul className="dash__benefits" data-reveal-group>
            {BENEFITS.map((b) => (
              <li key={b.title} className="dash__benefit">
                <span className="dash__check" aria-hidden="true">
                  <IconCheck width={18} height={18} />
                </span>
                <span>
                  <strong>{b.title}</strong>
                  <span className="dash__benefit-copy">{b.copy}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="dash__actions" data-reveal>
            <a href={appLink('/register')} className="btn btn--primary">
              Start Your Journey
              <IconArrowRight width={18} height={18} />
            </a>
            <a href="#how-it-works" className="btn btn--ghost-dark">
              Learn More
            </a>
          </div>
        </div>

        <div
          className="dash__stage"
          role="img"
          aria-label="Preview of the Tadreebak student dashboard showing applications and recommendations"
        >
          <span className="dash__float dash__float--one" aria-hidden="true">
            <span className="dash__float-icon dash__float-icon--green">
              <IconCheck width={16} height={16} />
            </span>
            Application accepted
          </span>
          <span className="dash__float dash__float--two" aria-hidden="true">
            <span className="dash__float-icon dash__float-icon--amber">
              <IconClock width={16} height={16} />
            </span>
            Interview reminder
          </span>
          <div className="dash__tilt" data-dash-card>
            <div className="dash__idle">
              <div className="dash-card">
                <div className="dash-card__chrome" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <header className="dash-card__head">
                  <div>
                    <p className="dash-card__greeting">Good morning, Aly</p>
                    <p className="dash-card__sub">You have 3 pending updates today.</p>
                  </div>
                  <span className="dash-card__avatar" aria-hidden="true">
                    A
                  </span>
                </header>

                <div className="dash-card__stats">
                  <div className="dash-card__stat">
                    <strong>12</strong>
                    <span>Applications Sent</span>
                  </div>
                  <div className="dash-card__stat">
                    <strong>2</strong>
                    <span>Active Interviews</span>
                  </div>
                </div>

                <div className="dash-card__row">
                  <p className="dash-card__label">Recent Applications</p>
                  <span className="dash-card__link">View All</span>
                </div>
                <ul className="dash-card__list">
                  {RECENT.map((r) => (
                    <li key={r.role} className="dash-card__item">
                      <span className={`dash-card__chip dash-card__chip--${r.tone}`} aria-hidden="true">
                        {r.company[0]}
                      </span>
                      <span className="dash-card__item-text">
                        <strong>{r.role}</strong>
                        <span>{r.company}</span>
                      </span>
                      <span className={`dash-card__status dash-card__status--${r.tone}`}>{r.status}</span>
                    </li>
                  ))}
                </ul>

                <div className="dash-card__row">
                  <p className="dash-card__label">Recommended for you</p>
                  <span className="dash-card__link">Browse All</span>
                </div>
                <div className="dash-card__recs">
                  {RECOMMENDED.map((rec) => (
                    <div key={rec.title} className="dash-card__rec">
                      <span className={`dash-card__rec-top dash-card__rec-top--${rec.tone}`} aria-hidden="true" />
                      <strong>{rec.title}</strong>
                      <span className="dash-card__rec-loc">{rec.location}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
