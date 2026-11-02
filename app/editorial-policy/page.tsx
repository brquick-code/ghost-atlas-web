import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial & Sourcing Policy',
  description: 'How Ghost Atlas researches, reviews, sources, and presents haunted-location history, folklore, and paranormal reports.',
  alternates: { canonical: '/editorial-policy' },
};

export default function EditorialPolicyPage() {
  return (
    <main className="app-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">HOW THE ATLAS IS BUILT</p>
        <h1>Editorial &amp; Sourcing Policy</h1>
        <p>Ghost Atlas treats documented history, paranormal reports, folklore, and local legend as different kinds of information—and tries to make that distinction clear.</p>
      </section>

      <section className="content-shell">
        <article className="panel location-story">
          <h2>What Ghost Atlas is</h2>
          <p>Ghost Atlas is a curated map and directory of reportedly haunted locations, paranormal hotspots, unusual histories, and place-based folklore. A location appearing in the Atlas means that a relevant story, tradition, report, or historical connection has been identified. It does not mean that a paranormal claim has been proven.</p>

          <h2>History and haunting claims are not treated the same</h2>
          <p>When an entry includes a historical date, event, person, building use, or other factual claim, Ghost Atlas aims to support that information with credible historical or institutional sources when they are available. A ghost sighting, local legend, paranormal investigation account, or oral tradition is presented as a report or belief rather than as established fact.</p>
          <p>Language such as “reportedly,” “local legend says,” “visitors have described,” or “the property is said to be haunted” is intentional. It tells the reader what kind of claim is being presented.</p>

          <h2>Sources</h2>
          <p>Sources can include official historic-site pages, museums, government or archival resources, established news organizations, books and historical publications, local historical organizations, property or tourism pages, paranormal investigation material, and community accounts. The usefulness of a source depends on the claim it is being used to support. An official archive may be strong evidence for a construction date, while a local ghost-tour account may be useful for documenting the existence of a local legend without proving the legend itself.</p>
          <p>Location records include source links where available so readers can continue researching beyond the summary presented by Ghost Atlas.</p>

          <h2>Community submissions</h2>
          <p>Community submissions enter a review process before publication. A submission is stronger when it identifies a specific place, explains the reported activity clearly, provides enough detail to understand the story, and includes source links when possible. Submission does not guarantee publication.</p>
          <p>Some stories are highly local and have little independent documentation. When a geographically specific story is useful but primarily exists as community folklore, Ghost Atlas may treat it as a local legend rather than presenting it as verified history.</p>

          <h2>Review and curation</h2>
          <p>Ghost Atlas entries are reviewed for usability, location identity, duplicate records, obvious factual conflicts, sourcing, and the way claims are framed. Records may be corrected, expanded, merged, placed on hold, or removed as better information becomes available.</p>
          <p>Because the Atlas contains thousands of locations and grows continuously, individual records can vary in depth. Older entries may be expanded over time as additional history, sources, or clearer paranormal accounts are found.</p>

          <h2>Ratings and labels</h2>
          <p>A haunting rating is an editorial feature of Ghost Atlas. It is not a scientific measurement and should not be read as proof that paranormal activity exists at a location. Labels describing activity, entities, phenomena, access, or danger are intended to help organize reported information and practical visiting considerations.</p>

          <h2>Private property and sensitive locations</h2>
          <p>A pin on Ghost Atlas never grants permission to enter a property. Visitors are expected to follow posted rules, operating hours, local law, and instructions from property owners or site managers. The Atlas may withhold, generalize, or revise location information when precision would create an unnecessary privacy, trespassing, safety, or preservation concern.</p>

          <h2>Corrections</h2>
          <p>Ghost Atlas is meant to improve as better information becomes available. If you find an incorrect historical fact, a broken source, a duplicate entry, an outdated access note, or a paranormal account that is being framed too strongly, email <a href="mailto:support@blacktidessoftware.com">support@blacktidessoftware.com</a> with the location name and supporting information.</p>

          <h2>Editorial independence</h2>
          <p>Advertising does not determine whether a location is included, how a haunting is rated, or how historical and paranormal claims are described. The purpose of Ghost Atlas editorial content is to help people discover and research unusual places while preserving the distinction between documented history and reported supernatural experience.</p>
        </article>
      </section>
    </main>
  );
}
