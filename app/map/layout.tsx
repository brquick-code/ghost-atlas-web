import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Haunted Places Map | Ghost Atlas' },
  description: 'Explore thousands of reportedly haunted locations, paranormal hotspots, local legends, and unusual histories on the interactive Ghost Atlas map.',
  alternates: { canonical: '/map' },
};

export default function MapLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <section className="home-section" aria-labelledby="map-guide-heading">
        <div className="content-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">USING THE ATLAS</p>
              <h2 id="map-guide-heading">Every pin has a story behind it.</h2>
            </div>
            <p>The interactive map is the visual side of Ghost Atlas. Each published pin connects to a location record with place details, reported paranormal activity, historical context, and source links where available.</p>
          </div>

          <div className="gateway-grid">
            <div className="gateway-card">
              <span className="gateway-icon">⌖</span>
              <div>
                <h3>Explore by place</h3>
                <p>Zoom into a city, state, country, or road-trip route to discover haunted places nearby. Clustered markers separate as you move closer, and individual pins open the corresponding Ghost Atlas record.</p>
              </div>
            </div>
            <div className="gateway-card">
              <span className="gateway-icon">≡</span>
              <div>
                <h3>Prefer a searchable list?</h3>
                <p>The Directory presents the same published Atlas as a searchable list, making it easier to look for a particular hotel, cemetery, historic site, city, state, or region.</p>
              </div>
              <Link href="/directory"><b>Browse the directory →</b></Link>
            </div>
            <div className="gateway-card">
              <span className="gateway-icon">✦</span>
              <div>
                <h3>What does a pin mean?</h3>
                <p>A Ghost Atlas pin documents a place connected to a reported haunting, paranormal tradition, unusual history, or local legend. It does not claim that supernatural activity has been scientifically proven.</p>
              </div>
              <Link href="/editorial-policy"><b>Read our editorial policy →</b></Link>
            </div>
            <div className="gateway-card">
              <span className="gateway-icon">↗</span>
              <div>
                <h3>Visit responsibly</h3>
                <p>A map pin never grants permission to enter private property. Check current access, hours, local laws, and site rules before visiting or investigating any location shown in the Atlas.</p>
              </div>
              <Link href="/stories/exploring-haunted-places-responsibly"><b>Read the field guide →</b></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
