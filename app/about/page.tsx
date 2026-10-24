import type { Metadata } from 'next';
import './about.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Ghost Atlas, the haunted places map and directory from Black Tides Software LLC.',
};

export default function AboutPage() {
  return (
    <main className="app-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">ABOUT GHOST ATLAS</p>
        <h1>Haunted Places. Mapped.</h1>
        <p>Ghost Atlas is a growing guide to reportedly haunted locations, paranormal hotspots, eerie legends, and unusual histories around the world.</p>
      </section>

      <section className="content-shell about-grid">
        <article className="panel about-card about-intro">
          <img src="/ghost-atlas-logo.png" alt="Ghost Atlas lantern logo" />
          <div>
            <p className="eyebrow">THE PROJECT</p>
            <h2>Built for exploring strange history.</h2>
            <p>Ghost Atlas brings haunted places together in one searchable map and directory. Entries may include historical context, reported entities, paranormal activity, access information, sources, and coordinates so users can research a location before visiting.</p>
            <p>Paranormal stories are presented as reports, folklore, legends, or firsthand accounts unless the underlying historical facts are independently documented.</p>
          </div>
        </article>

        <article className="panel about-card">
          <p className="eyebrow">EXPLORE RESPONSIBLY</p>
          <h2>A map pin is not permission.</h2>
          <p>Ghost Atlas does not grant access to private, closed, abandoned, dangerous, or restricted property. Always obey posted signs, property owners, local laws, operating hours, and safety guidance.</p>
        </article>

        <article className="panel about-card">
          <p className="eyebrow">HELP BUILD THE ATLAS</p>
          <h2>Know somewhere we missed?</h2>
          <p>Community submissions go into a review queue before publication. The most useful submissions include a clear location, a detailed haunting story, and credible source links whenever possible.</p>
          <a className="primary-button" href="/submit">Submit a Location</a>
        </article>

        <article className="panel about-card">
          <p className="eyebrow">BLACK TIDES SOFTWARE LLC</p>
          <h2>Independent software, built in South Carolina.</h2>
          <p>Ghost Atlas is developed and maintained by Black Tides Software LLC. The mobile app and ghostatlas.app share the same published location database, so newly approved locations can appear across the Atlas without maintaining separate catalogs.</p>
          <a className="secondary-button" href="mailto:support@blacktidessoftware.com">Contact Support</a>
        </article>

        <article className="panel about-card app-download-card">
          <div>
            <p className="eyebrow">MOBILE APP</p>
            <h2>Take Ghost Atlas on the road.</h2>
            <p>Use the web for research and browsing, then keep the mobile app handy while you travel.</p>
          </div>
          <div className="store-buttons">
            <a href="https://apps.apple.com/us/app/ghost-atlas-haunted-places/id6791018674" target="_blank" rel="noreferrer"><img src="/black.svg" alt="Download Ghost Atlas on the App Store" /></a>
            <a href="https://play.google.com/store/apps/details?id=com.blacktidesoftware.ghostatlas" target="_blank" rel="noreferrer"><img src="/GetItOnGooglePlay_Badge_Web_color_English.svg" alt="Get Ghost Atlas on Google Play" /></a>
          </div>
        </article>
      </section>
    </main>
  );
}
