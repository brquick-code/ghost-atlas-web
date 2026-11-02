import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Ghost Atlas Researches Haunted Locations',
  description: 'How Ghost Atlas turns haunted-place stories, historical records, sources, and community submissions into curated map entries.',
  alternates: { canonical: '/stories/how-ghost-atlas-researches-haunted-locations' },
};

export default function ResearchGuidePage() {
  return (
    <main className="app-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">BEHIND THE ATLAS</p>
        <h1>How Ghost Atlas Researches Haunted Locations</h1>
        <p>A haunted-place database is easy to make badly. The useful part is figuring out what the place actually is, what happened there, what people really report, and how confidently each part of the story can be stated.</p>
      </section>

      <section className="content-shell">
        <article className="panel location-story">
          <p>Ghost Atlas started with a simple idea: put reportedly haunted places on a map so people could discover the stories around them. The difficult part came immediately. Haunted-place information is messy. The same location can appear under several names. A hotel may have changed businesses three times. A story can be repeated by dozens of websites that all trace back to one unsourced paragraph. A dramatic legend may be easy to find while the actual history of the building is harder to establish.</p>
          <p>That is why a Ghost Atlas entry is more than a latitude and longitude. The goal is to turn scattered information into a record that is useful for discovery while still being clear about what is documented and what is reported.</p>

          <h2>Step 1: Identify the place</h2>
          <p>Before the haunting story matters, the location has to be identifiable. Ghost Atlas looks for a usable place name and enough geographic information to distinguish the location from similarly named properties. Depending on the site, that may be a street address, a historic property name, a cemetery, a road, a park, a battlefield, a hotel, a public building, or a broader area when an exact pin would be misleading or inappropriate.</p>
          <p>Names change. A building might be known by its current business name, an older hotel name, a historic family name, or the nickname used in local ghost lore. Alternate names are useful because someone searching the Atlas may know only one version.</p>

          <h2>Step 2: Check for duplicates</h2>
          <p>Large location databases naturally attract duplicates. One source may call a property by its modern name while another uses the name it had twenty years ago. A community submission might describe the same place already in the Atlas but with a slightly different address or spelling.</p>
          <p>Duplicate review matters because two weak records are less useful than one strong record. When entries clearly refer to the same place, the better approach is usually to combine the useful information, preserve alternate names when appropriate, and keep one location record that can be improved over time.</p>

          <h2>Step 3: Separate the history from the haunting</h2>
          <p>This is one of the most important parts of the process. “The building opened in 1895” and “a woman in white is seen on the staircase” are not the same kind of statement. The first may be verifiable through property records, historical organizations, museums, archives, newspapers, or official site histories. The second is a paranormal report, a tradition, a witness account, or folklore.</p>
          <p>Ghost Atlas does not need to decide whether a ghost exists in order to document that a ghost story exists. What matters is describing the claim accurately. If a story is local legend, it should read like local legend. If several named witnesses or investigations have reported similar activity, the entry can describe those reports without turning them into scientific proof.</p>

          <h2>Step 4: Follow the source trail</h2>
          <p>Not every source is useful for every claim. An official historic-site page can be excellent for dates, ownership, architecture, and known events. A local newspaper may document when a ghost story entered public discussion. A paranormal group may be useful for understanding what investigators reported at a site. A tourism page can show that a legend is part of the public identity of a place, even if it is not evidence that the supernatural claim is true.</p>
          <p>The key question is not simply “Is this source trustworthy?” It is “What does this source actually support?” A source can reliably prove that a legend is widely told without proving the legend itself.</p>

          <h2>Step 5: Find a defensible map point</h2>
          <p>Ghost Atlas is a map, so location accuracy matters. When a public address is known, the pin can usually be placed at or near the property. For roads, large parks, battlefields, forests, abandoned sites, and stories tied to a broad area, false precision can be worse than an approximate point. A map pin should help someone understand where the story belongs without pretending the source material is more exact than it really is.</p>
          <p>Private property requires extra care. A location appearing on the map never means the public has permission to enter it. The Atlas can document a story while still warning readers about access, privacy, danger, or restrictions.</p>

          <h2>Step 6: Write for clarity, not drama</h2>
          <p>Paranormal stories are already interesting. They do not need to be made more certain or more sensational than the sources justify. Ghost Atlas summaries aim to answer a few practical questions quickly: What is this place? What is said to happen here? Is there a named spirit or recurring phenomenon? What part of the story is historical, and what part belongs to folklore or paranormal reporting?</p>
          <p>That is also why wording matters. Phrases such as “is said to,” “visitors have reported,” and “local legend connects” are not evasive language. They are useful labels for the kind of information being presented.</p>

          <h2>Step 7: Review community submissions</h2>
          <p>Some of the best local stories never make it into major books or national websites. Community submissions help surface those places. But submissions still need review. A useful submission identifies the location, tells the story in enough detail to understand it, and ideally supplies a source or enough context to research further.</p>
          <p>Some submissions are ready quickly. Others need a better address, clearer sourcing, a duplicate check, or a way to distinguish documented history from family or neighborhood tradition. A story can still be valuable as a local legend as long as it is presented that way.</p>

          <h2>Step 8: Keep improving the record</h2>
          <p>Ghost Atlas is not a finished encyclopedia. Thousands of records were gathered from different types of sources, at different times, with different amounts of information available. New sources appear. Businesses close. Properties change names. Historical claims get corrected. Better coordinates become available. Community members provide details that were missing before.</p>
          <p>The Atlas is built to be revised. An entry that begins as a short record can later gain better history, additional sources, reported activity tags, access notes, alternate names, or a more precise summary.</p>

          <h2>What “verified” means in Ghost Atlas</h2>
          <p>A verified Ghost Atlas entry means the record has received additional review and the location/story connection has been checked more closely. It does not mean Ghost Atlas has scientifically verified paranormal activity. That distinction is important: the Atlas can verify the identity of the place, the documented history, the existence of reported accounts, and the quality of the record without claiming to prove a supernatural explanation.</p>

          <h2>The goal</h2>
          <p>The best Ghost Atlas entry should leave a reader better informed than when they arrived. It should make the place easy to find, summarize the story without overstating it, show where the information came from, and give the reader enough context to continue researching independently.</p>
          <p>That balance—curiosity without pretending certainty—is what turns a collection of ghost stories into an atlas.</p>

          <p><Link className="text-link" href="/editorial-policy">Read the full Editorial &amp; Sourcing Policy →</Link></p>
          <p><Link className="text-link" href="/stories">Back to Stories &amp; Guides →</Link></p>
        </article>
      </section>
    </main>
  );
}
