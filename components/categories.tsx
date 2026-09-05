import { appLink } from '@/lib/app-url';
import {
  IconCode,
  IconMegaphone,
  IconPen,
  IconTrending,
  IconDollar,
  IconUsers,
  IconArrowRight,
} from '@/components/icons';

const CATEGORIES = [
  { name: 'Software Engineering', count: 42, color: 'blue', slug: 'software', Icon: IconCode },
  { name: 'Marketing & Sales', count: 28, color: 'red', slug: 'marketing', Icon: IconMegaphone },
  { name: 'UI/UX Design', count: 19, color: 'violet', slug: 'design', Icon: IconPen },
  { name: 'Digital Marketing', count: 24, color: 'orange', slug: 'digital', Icon: IconTrending },
  { name: 'Finance & Accounting', count: 15, color: 'yellow', slug: 'finance', Icon: IconDollar },
  { name: 'Human Resources', count: 13, color: 'pink', slug: 'hr', Icon: IconUsers },
];

export default function Categories() {
  return (
    <section id="categories" className="section categories" aria-label="Browse by category">
      <div className="container">
        <div className="section__head section__head--row" data-reveal>
          <div>
            <p className="eyebrow">Explore fields</p>
            <h2 className="section__title">Browse by category</h2>
          </div>
          <a href={appLink('/internships')} className="btn btn--dark">
            View All Internships
            <IconArrowRight width={18} height={18} />
          </a>
        </div>

        <div className="categories__grid" data-reveal-group data-pop-group>
          {CATEGORIES.map(({ name, count, color, slug, Icon }) => (
            <a
              key={slug}
              href={appLink(`/internships?title=${slug}`)}
              className={`cat-card cat-card--${color}`}
            >
              <span className="cat-card__tile" data-pop aria-hidden="true">
                <Icon width={26} height={26} />
              </span>
              <span className="cat-card__text">
                <span className="cat-card__name">{name}</span>
                <span className="cat-card__count">{count} opportunities</span>
              </span>
              <span className="cat-card__arrow" aria-hidden="true">
                <IconArrowRight width={18} height={18} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
