import Link from 'next/link';
import { getLatestLocations } from '@/lib/supabase-rest';

export const revalidate = 300;

export default async function Home() {
  const latest = await getLatestLocations(6);

  return (
    <main className="home-page">
      <section className="web-hero">
        <div className="hero-mist" aria-hidden="true" />
        <div className="web-hero-inner">
          <img src="/ghost-atlas-logo.png" alt="Ghost Atlas" className="hero-logo" />
          <p className="eyebrow">THE ATLAS IS NOW ON THE WEB</p>
          <h1>Haunted Places.<br /><span>Mapped.</span></h1>
          <p className="hero-lede">Explore thousands of haunted locations, eerie legends, paranormal hotspots, and strange histories from Ghost Atlas—right in your browser.</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/map">Explore the Map</Link>
            <Link className="secondary-button" href="/directory">Browse the Directory</Link>
          </div>
          <div className="hero-stat-row">
            <div><strong>6,500+</strong><span>published locations</span></div>
            <div><strong>Worldwide</strong><span>US + international haunts</span></div>
            <div><strong>Growing</strong><span>community submissions</span></div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="content-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">START EXPLORING</p>
              <h2>The Ghost Atlas, on any screen.</h2>
            </div>
            <p>Search by name or place, roam the map, save haunts in this browser, and open full location records with sources and reported activity.</p>
          </div>

          <div className="gateway-grid">
            <Link href="/map" className="gateway-card map-gateway">
              <span className="gateway-icon">⌖</span>
              <div><h3>Interactive Map</h3><p>See published Ghost Atlas locations plotted around the world.</p></div>
              <b>Open map →</b>
            </Link>
            <Link href="/directory" className="gateway-card">
              <span className="gateway-icon">⌕</span>
              <div><h3>Search the Directory</h3><p>Filter by US, international, state or region, and search thousands of entries.</p></div>
              <b>Browse →</b>
            </Link>
            <Link href="/favorites" className="gateway-card">
              <span className="gateway-icon">♡</span>
              <div><h3>Favorites</h3><p>Build a personal list of locations you want to visit or investigate.</p></div>
              <b>View favorites →</b>
            </Link>
            <Link href="/submit" className="gateway-card">
              <span className="gateway-icon">＋</span>
              <div><h3>Submit a Haunt</h3><p>Know a place we missed? Send it directly into the Ghost Atlas review queue.</p></div>
              <b>Submit location →</b>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section latest-section">
        <div className="content-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">FROM THE DATABASE</p>
              <h2>Recently Added</h2>
            </div>
            <Link href="/directory" className="text-link">View full directory →</Link>
          </div>
          <div className="latest-grid">
            {latest.map((location) => (
              <Link href={`/location/${location.slug || location.id}`} className="latest-card panel" key={location.id}>
                <span className="card-kicker">{location.location_type || 'Haunted Location'}</span>
                <h3>{location.title}</h3>
                <p>{[location.city, location.state, location.country].filter(Boolean).join(', ')}</p>
                {location.legend_summary && <span className="latest-summary">{location.legend_summary}</span>}
                <b>{location.haunting_rating ? `${'★'.repeat(location.haunting_rating)} ` : ''}View location →</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section mobile-app-section">
        <div className="content-shell app-promo">
          <div>
            <p className="eyebrow">TAKE THE ATLAS WITH YOU</p>
            <h2>Ghost hunting works better in the field.</h2>
            <p>The web gives you the full atlas for browsing and research. For exploring on the road, keep Ghost Atlas on your phone too.</p>
            <div className="store-buttons">
              <a href="https://apps.apple.com/us/app/ghost-atlas-haunted-places/id6791018674" target="_blank" rel="noreferrer"><img src="/black.svg" alt="Download Ghost Atlas on the App Store" /></a>
              <a href="https://play.google.com/store/apps/details?id=com.blacktidesoftware.ghostatlas" target="_blank" rel="noreferrer"><img src="/GetItOnGooglePlay_Badge_Web_color_English.svg" alt="Get Ghost Atlas on Google Play" /></a>
            </div>
          </div>
          <img src="/ghost-atlas-logo.png" alt="" className="app-promo-logo" />
        </div>
      </section>
    </main>
  );
}
