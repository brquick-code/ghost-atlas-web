import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FavoriteButton from '@/components/FavoriteButton';
import { getLocationBySlugOrId } from '@/lib/supabase-rest';

type Props = { params: Promise<{ slug: string }> };

function placeLine(location: Awaited<ReturnType<typeof getLocationBySlugOrId>>) {
  if (!location) return '';
  return [location.city, location.state, location.country].filter(Boolean).join(', ');
}

function safeLinks(values: Array<string | null | undefined>) {
  const links = new Set<string>();
  for (const value of values) {
    if (!value) continue;
    try {
      const url = new URL(value);
      if (url.protocol === 'http:' || url.protocol === 'https:') links.add(url.toString());
    } catch {
      // Ignore malformed source links rather than rendering unsafe URLs.
    }
  }
  return Array.from(links);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocationBySlugOrId(slug);
  if (!location) return { title: 'Location Not Found | Ghost Atlas' };

  const place = placeLine(location);
  const summary = location.legend_summary || location.description || `Explore ${location.title} in Ghost Atlas.`;
  return {
    title: `${location.title}${place ? ` — ${place}` : ''} | Ghost Atlas`,
    description: summary.slice(0, 160),
    alternates: { canonical: `/location/${location.slug || location.id}` },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = await getLocationBySlugOrId(slug);
  if (!location) notFound();

  const place = placeLine(location);
  const sources = safeLinks([location.source_url, ...(location.source_urls || [])]);
  const directions = location.latitude != null && location.longitude != null
    ? `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`
    : location.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.address}, ${place}`)}`
      : null;

  const facts = [
    ['Location type', location.location_type || location.category],
    ['Haunting rating', location.haunting_rating ? `${location.haunting_rating} / 5` : null],
    ['Access', location.access_status],
    ['Danger level', location.danger_level],
    ['Private property', location.is_private_property ? 'Yes' : null],
    ['Last investigated', location.last_investigated],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <main className="app-page location-page">
      <section className="location-hero">
        <div className="location-hero-copy">
          <p className="eyebrow">GHOST ATLAS LOCATION</p>
          <h1>{location.title}</h1>
          {place && <p className="location-place">{place}</p>}
          {(location.address || location.short_address) && (
            <p className="location-address">{location.address || location.short_address}</p>
          )}
          <div className="location-actions">
            <FavoriteButton location={{
              id: location.id,
              title: location.title,
              slug: location.slug,
              city: location.city,
              state: location.state,
              country: location.country,
              location_type: location.location_type,
            }} />
            {directions && <a className="secondary-button" href={directions} target="_blank" rel="noreferrer">Get Directions</a>}
          </div>
        </div>
        <div className="rating-panel">
          <span>Haunting Rating</span>
          <strong>{location.haunting_rating ? '★'.repeat(location.haunting_rating) : '—'}</strong>
          {location.verified && <small>✓ Verified entry</small>}
        </div>
      </section>

      <section className="content-shell location-grid">
        <article className="panel location-story">
          <p className="eyebrow">THE STORY</p>
          <h2>Reported Haunting</h2>
          {location.legend_summary && <p className="legend-summary">{location.legend_summary}</p>}
          {location.description ? (
            <p className="story-copy">{location.description}</p>
          ) : (
            <p className="story-copy">Ghost Atlas has a published record for this location, but a full narrative has not yet been added.</p>
          )}
        </article>

        <aside className="location-sidebar">
          {facts.length > 0 && (
            <div className="panel fact-panel">
              <h2>Location Details</h2>
              <dl>
                {facts.map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </div>
          )}

          {(location.reported_entities?.length || location.activity_types?.length || location.phenomenon_types?.length) ? (
            <div className="panel tag-panel">
              <h2>Reported Activity</h2>
              {location.reported_entities?.length ? <TagGroup label="Entities" values={location.reported_entities} /> : null}
              {location.activity_types?.length ? <TagGroup label="Activity" values={location.activity_types} /> : null}
              {location.phenomenon_types?.length ? <TagGroup label="Phenomena" values={location.phenomenon_types} /> : null}
            </div>
          ) : null}

          {(sources.length > 0 || location.official_website) && (
            <div className="panel source-panel">
              <h2>Sources & Links</h2>
              {location.official_website && safeLinks([location.official_website]).map((url) => (
                <a key={url} href={url} target="_blank" rel="noreferrer">Official website ↗</a>
              ))}
              {sources.map((url, index) => (
                <a key={url} href={url} target="_blank" rel="noreferrer">Source {index + 1} ↗</a>
              ))}
            </div>
          )}
        </aside>
      </section>

      <section className="content-shell responsibility-note">
        <p><strong>Explore responsibly.</strong> A location appearing in Ghost Atlas does not grant permission to enter private, restricted, abandoned, or closed property. Paranormal accounts are presented as reported experiences, folklore, or legend unless otherwise documented.</p>
      </section>
    </main>
  );
}

function TagGroup({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="tag-group">
      <h3>{label}</h3>
      <div className="tags">{values.map((value) => <span key={value}>{value}</span>)}</div>
    </div>
  );
}
