import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Stories & Guides',
  description: 'Original Ghost Atlas guides about haunted-place research, folklore, paranormal reports, and responsible exploration.',
  alternates: { canonical: '/stories' },
};

const guides = [
  {
    href: '/stories/how-ghost-atlas-researches-haunted-locations',
    kicker: 'BEHIND THE ATLAS',
    title: 'How Ghost Atlas Researches Haunted Locations',
    description: 'A look at how a place moves from a story or submission into a useful map entry—and why history and haunting claims require different kinds of evidence.',
  },
  {
    href: '/stories/history-folklore-and-reported-hauntings',
    kicker: 'READING THE STORIES',
    title: 'History, Folklore & Reported Hauntings: What’s the Difference?',
    description: 'A practical guide to separating documented history from local legend, witness reports, paranormal tradition, and later retellings.',
  },
  {
    href: '/stories/exploring-haunted-places-responsibly',
    kicker: 'FIELD GUIDE',
    title: 'Exploring Haunted Places Responsibly',
    description: 'How to use Ghost Atlas without turning curiosity into trespassing, unsafe exploration, or disrespect for the people and places behind the stories.',
  },
] as const;

export default function StoriesPage() {
  return (
    <main className="app-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">GHOST ATLAS STORIES &amp; GUIDES</p>
        <h1>Go beyond the pin.</h1>
        <p>The map tells you where. These guides explain how Ghost Atlas researches strange places, evaluates stories, and approaches the history behind them.</p>
      </section>

      <section className="content-shell">
        <div className="latest-grid">
          {guides.map((guide) => (
            <Link className="latest-card panel" href={guide.href} key={guide.href}>
              <span className="card-kicker">{guide.kicker}</span>
              <h2>{guide.title}</h2>
              <span className="latest-summary">{guide.description}</span>
              <b>Read guide →</b>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
