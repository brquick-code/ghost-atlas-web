import Image from "next/image";
import "./page.css";

export default function Home() {
  return (
    <main className="page">
      <div className="moon" />
      <div className="mist mist1" />
      <div className="mist mist2" />

      <section className="hero">
        <Image
          src="/ghost-atlas-logo.png"
          alt="Ghost Atlas logo"
          width={330}
          height={330}
          className="logo"
          priority
        />

        <h1>Ghost Atlas</h1>
        <h2>Haunted Places. Mapped.</h2>

        <div className="divider">◆</div>

        <p>
          Discover haunted hotels, ghost towns, cemeteries, battlefields,
          abandoned hospitals, mysterious roads, and paranormal hotspots across
          America.
        </p>

        <div className="coming">Coming Soon</div>

        <div className="death-atlas">
          From the creators of
          <br />
          <span>Death Atlas</span>
        </div>
      </section>
    </main>
  );
}
