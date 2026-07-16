import "./page.css";

export default function Home() {
  return (
    <main className="site">
      {/* HERO */}
      <section className="hero">
        <div className="moon-glow" />
        <div className="fog fog-one" />
        <div className="fog fog-two" />

        <div className="hero-content">
          <img
            src="/ghost-atlas-logo.png"
            alt="Ghost Atlas"
            className="logo"
          />

          <h1>GHOST ATLAS</h1>
          <p className="tagline">HAUNTED PLACES. MAPPED.</p>

          <div className="ornament">
            <span />
            <b>✦</b>
            <span />
          </div>

          <p className="intro">
            Your free interactive guide to haunted places, paranormal hotspots,
            eerie legends, and locations with stories that refuse to die.
          </p>

          <div className="store-buttons">
            <a className="store-button disabled" aria-disabled="true">
              <small>Download on the</small>
              <strong>App Store</strong>
            </a>

            <a className="store-button disabled" aria-disabled="true">
              <small>GET IT ON</small>
              <strong>Google Play</strong>
            </a>
          </div>

          <p className="store-note">Download links coming soon.</p>

          {/* Lantern centerpiece — cropped from existing Ghost Atlas artwork */}
          <div className="lantern-stage" aria-hidden="true">
            <div className="lantern-glow" />
            <div className="lantern-art" />
          </div>
        </div>

        <div className="scroll-cue">
          <span>EXPLORE THE ATLAS</span>
          <span className="scroll-arrow">⌄</span>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="section explore-section">
        <div className="section-inner narrow">
          <p className="eyebrow">THE UNKNOWN IS CLOSER THAN YOU THINK</p>
          <h2>Explore the Haunted</h2>

          <div className="ornament">
            <span />
            <b>✦</b>
            <span />
          </div>

          <p className="section-copy">
            Ghost Atlas brings haunted locations together on one interactive
            map. Discover historic homes, abandoned hospitals, cemeteries,
            hotels, theaters, battlefields, mysterious roads, ghost towns, and
            other places tied to paranormal stories and unexplained legends.
          </p>

          <p className="section-copy">
            Search close to home or explore across the country and uncover the
            strange history hiding in the places around us.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section">
        <div className="section-inner">
          <p className="eyebrow">DISCOVER. EXPLORE. REMEMBER.</p>
          <h2>Built for the Curious</h2>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">⌖</div>
              <h3>Interactive Haunted Map</h3>
              <p>
                Explore haunted locations plotted across an interactive map and
                discover what may be hiding nearby.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">⌕</div>
              <h3>Search &amp; Directory</h3>
              <p>
                Search for specific locations or browse the growing Ghost Atlas
                directory.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">☾</div>
              <h3>Haunting Stories</h3>
              <p>
                Read summaries of reported hauntings, paranormal activity, and
                the legends connected to each place.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">↗</div>
              <h3>Sources &amp; Directions</h3>
              <p>
                Dig deeper with source links and get directions to publicly
                accessible locations you want to explore.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">♡</div>
              <h3>Save Your Favorites</h3>
              <p>
                Keep track of the haunted places that interest you most and
                build your own list of places to investigate.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">＋</div>
              <h3>Help Grow the Atlas</h3>
              <p>
                Know a haunted place we missed? Submit locations for
                consideration and help uncover stories others may not know.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SUBMISSION */}
      <section className="section submit-section">
        <div className="section-inner narrow">
          <div className="callout">
            <p className="eyebrow">EVERY TOWN HAS A STORY</p>
            <h2>Know Somewhere Haunted?</h2>

            <div className="ornament">
              <span />
              <b>✦</b>
              <span />
            </div>

            <p>
              Some of the best ghost stories never make it into books. Maybe
              it&apos;s an old house everyone in town knows about, a forgotten
              cemetery, a strange stretch of road, or a place with a story
              passed down for generations.
            </p>

            <p>
              Ghost Atlas lets users submit haunted locations for consideration
              in our growing database.
            </p>
          </div>
        </div>
      </section>

      {/* RESPONSIBILITY */}
      <section className="section responsibility-section">
        <div className="section-inner narrow">
          <p className="eyebrow">RESPECT THE LIVING — AND THE DEAD</p>
          <h2>Explore Responsibly</h2>

          <p className="section-copy">
            Some locations featured in Ghost Atlas are privately owned,
            abandoned, restricted, or otherwise not open to the public.
            Inclusion in Ghost Atlas does not grant permission to enter any
            property.
          </p>

          <p className="section-copy">
            Always respect private property, posted rules, and local laws.
            Obtain permission before entering private property and never
            trespass in pursuit of the paranormal.
          </p>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="section support-section" id="support">
        <div className="section-inner narrow">
          <p className="eyebrow">GHOST ATLAS SUPPORT</p>
          <h2>Need Help?</h2>

          <p className="section-copy">
            Have a question, found an issue, or need assistance with Ghost
            Atlas? Contact Black Tides Software and we&apos;ll be happy to help.
          </p>

          <a
            href="mailto:support@ghostatlas.app"
            className="contact-button"
          >
            Contact Support
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <img
          src="/ghost-atlas-logo.png"
          alt=""
          className="footer-logo"
        />

        <p className="footer-brand">GHOST ATLAS</p>
        <p className="footer-tagline">HAUNTED PLACES. MAPPED.</p>

        <div className="footer-links">
          <a href="#support">Support</a>
          <span>•</span>
          <a href="mailto:support@ghostatlas.app">Contact</a>
        </div>

        <p className="copyright">
          © 2026 Black Tides Software LLC. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
