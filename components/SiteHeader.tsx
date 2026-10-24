import Link from "next/link";

const links = [
  ["Map", "/map"],
  ["Directory", "/directory"],
  ["Favorites", "/favorites"],
  ["About", "/about"],
  ["Submit", "/submit"],
] as const;

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-link" aria-label="Ghost Atlas home">
        <img src="/ghost-atlas-logo.png" alt="" className="brand-logo" />
        <span className="brand-text">
          <strong>GHOST ATLAS</strong>
          <small>HAUNTED PLACES. MAPPED.</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Link key={href} href={href}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
