import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import './globals.css';
import './visual-polish.css';
import './home-fixes.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  metadataBase: new URL('https://ghostatlas.app'),
  title: {
    default: 'Ghost Atlas | Haunted Places. Mapped.',
    template: '%s | Ghost Atlas',
  },
  description: 'Explore thousands of haunted places, paranormal hotspots, eerie legends, and mysterious locations on the Ghost Atlas map and directory.',
  applicationName: 'Ghost Atlas',
  openGraph: {
    title: 'Ghost Atlas | Haunted Places. Mapped.',
    description: 'Explore haunted places around the world with Ghost Atlas.',
    url: 'https://ghostatlas.app',
    siteName: 'Ghost Atlas',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div>
            <img src="/ghost-atlas-logo.png" alt="" />
            <p><strong>GHOST ATLAS</strong><span>Haunted Places. Mapped.</span></p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="mailto:support@blacktidessoftware.com">Support</a>
            <a href="https://apps.apple.com/us/app/ghost-atlas-haunted-places/id6791018674" target="_blank" rel="noreferrer">iOS App</a>
            <a href="https://play.google.com/store/apps/details?id=com.blacktidesoftware.ghostatlas" target="_blank" rel="noreferrer">Android App</a>
          </nav>
          <small>© 2026 Black Tides Software LLC. Always respect private property and local laws.</small>
        </footer>
      </body>
    </html>
  );
}
