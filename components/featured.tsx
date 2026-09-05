'use client';

import { useMemo, useRef } from 'react';
import { useSearch } from '@/lib/search-store';
import { appLink } from '@/lib/app-url';
import { IconPin, IconClock, IconSearch, IconGlobe, IconArrowRight } from '@/components/icons';

type Internship = {
  id: number;
  title: string;
  company: string;
  initial: string;
  color: 'blue' | 'red' | 'violet' | 'orange' | 'yellow' | 'pink';
  mode: 'On-site' | 'Remote';
  type: string;
  duration: string;
  location: string;
  field: string;
  keywords: string;
  isNew?: boolean;
};

const INTERNSHIPS: Internship[] = [
  {
    id: 1,
    title: 'Frontend Engineer Intern',
    company: 'Nile Labs',
    initial: 'N',
    color: 'blue',
    mode: 'On-site',
    type: 'Full-time',
    duration: '3 months',
    location: 'Cairo, Egypt',
    field: 'Software Engineering',
    keywords: 'software engineering react frontend typescript development web',
    isNew: true,
  },
  {
    id: 2,
    title: 'Growth Marketing Intern',
    company: 'Delta Fintech',
    initial: 'D',
    color: 'red',
    mode: 'Remote',
    type: 'Part-time',
    duration: '6 months',
    location: 'Remote',
    field: 'Marketing & Sales',
    keywords: 'marketing growth sales social media campaigns fintech',
  },
  {
    id: 3,
    title: 'Product Design Intern',
    company: 'Cairo Pixels',
    initial: 'C',
    color: 'violet',
    mode: 'On-site',
    type: 'Full-time',
    duration: '4 months',
    location: 'Giza, Egypt',
    field: 'UI/UX Design',
    keywords: 'design ui ux product figma prototype design systems',
  },
  {
    id: 4,
    title: 'Digital Marketing Intern',
    company: 'Sahara Retail Group',
    initial: 'S',
    color: 'orange',
    mode: 'On-site',
    type: 'Part-time',
    duration: '2 months',
    location: 'Alexandria, Egypt',
    field: 'Digital Marketing',
    keywords: 'digital marketing seo ads content ecommerce',
  },
  {
    id: 5,
    title: 'Financial Analyst Intern',
    company: 'Obelisk Capital',
    initial: 'O',
    color: 'yellow',
    mode: 'On-site',
    type: 'Full-time',
    duration: '3 months',
    location: 'Cairo, Egypt',
    field: 'Finance & Accounting',
    keywords: 'finance accounting analyst banking data fintech',
  },
  {
    id: 6,
    title: 'People & HR Intern',
    company: 'Misr Analytics',
    initial: 'M',
    color: 'pink',
    mode: 'Remote',
    type: 'Part-time',
    duration: '6 months',
    location: 'Remote',
    field: 'Human Resources',
    keywords: 'hr human resources recruiting people operations talent',
    isNew: true,
  },
];

function Card({ internship }: { internship: Internship }) {
  const cardRef = useRef<HTMLElement>(null);
  const raf = useRef(0);

  // Cheap 3D micro-detail: cursor-driven parallax via CSS custom properties.
  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--px', `${px * 8}px`);
      el.style.setProperty('--py', `${py * 8}px`);
      el.style.setProperty('--ry', `${px * 4}deg`);
    });
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--px', '0px');
    el.style.setProperty('--py', '0px');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={cardRef}
      className="job-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="job-card__inner">
        <div className="job-card__top">
          <span className={`job-card__logo job-card__logo--${internship.color}`} aria-hidden="true">
            {internship.initial}
          </span>
          <div className="job-card__tags">
            {internship.isNew && <span className="tag tag--new">New</span>}
            <span className={`tag tag--${internship.mode === 'On-site' ? 'onsite' : 'remote'}`}>
              {internship.mode === 'On-site' ? (
                <IconPin width={13} height={13} />
              ) : (
                <IconGlobe width={13} height={13} />
              )}
              {internship.mode}
            </span>
            <span className="tag tag--plain">
              <IconClock width={13} height={13} />
              {internship.type}
            </span>
          </div>
        </div>
        <p className="job-card__company">{internship.company}</p>
        <h3 className="job-card__title">{internship.title}</h3>
        <p className="job-card__meta">
          <span>{internship.location}</span>
          <span aria-hidden="true">·</span>
          <span>{internship.duration}</span>
        </p>
        <a
          href={appLink(`/internships/${internship.id}`)}
          className="btn btn--outline-green btn--sm job-card__apply"
          aria-label={`Apply for ${internship.title} at ${internship.company}`}
        >
          Apply
          <IconArrowRight width={16} height={16} />
        </a>
      </div>
    </article>
  );
}

export default function Featured() {
  const { query, location } = useSearch();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    return INTERNSHIPS.filter((job) => {
      const matchesQuery =
        !q ||
        [job.title, job.company, job.field, job.keywords, job.location]
          .join(' ')
          .toLowerCase()
          .includes(q);
      const matchesLocation = !loc || job.location.toLowerCase().includes(loc);
      return matchesQuery && matchesLocation;
    });
  }, [query, location]);

  return (
    <section id="internships" className="section featured" aria-label="Featured internships">
      <div className="container">
        <div className="section__head" data-reveal>
          <div>
            <p className="eyebrow">Fresh opportunities</p>
            <h2 className="section__title">Featured internships</h2>
            <p className="section__sub">
              Fresh opportunities from top companies in Egypt.
            </p>
          </div>
        </div>

        <p className="featured__count" role="status" aria-live="polite">
          {query || location
            ? `${filtered.length} of ${INTERNSHIPS.length} internships shown`
            : `${INTERNSHIPS.length} open roles — updated weekly`}
        </p>

        {(query || location) && (
          <p className="featured__filter-note">
            <IconSearch width={15} height={15} />
            Filtering for &ldquo;{[query, location].filter(Boolean).join(' + ')}&rdquo;
          </p>
        )}

        {filtered.length > 0 ? (
          <div className="featured__grid">
            {filtered.map((job) => (
              <Card key={job.id} internship={job} />
            ))}
          </div>
        ) : (
          <div className="featured__empty" role="status">
            <p>No internships match that search — yet.</p>
            <p className="featured__empty-sub">
              New opportunities are posted every week. Try another keyword or check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
