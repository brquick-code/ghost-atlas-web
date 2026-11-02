import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'History, Folklore & Reported Hauntings: What’s the Difference?',
  description: 'A Ghost Atlas guide to distinguishing documented history, local folklore, witness reports, paranormal traditions, and later retellings.',
  alternates: { canonical: '/stories/history-folklore-and-reported-hauntings' },
};

export default function HistoryFolkloreGuidePage() {
  return (
    <main className="app-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">READING THE STORIES</p>
        <h1>History, Folklore &amp; Reported Hauntings: What’s the Difference?</h1>
        <p>A good haunted-place story often contains several layers at once. Knowing which layer you are reading makes the story more interesting—not less.</p>
      </section>

      <section className="content-shell">
        <article className="panel location-story">
          <p>Haunted places tend to collect stories the way old buildings collect additions. A documented death becomes a rumor about a ghost. A rumor gains a name. A later retelling adds a dramatic detail. A ghost tour repeats it for years. Eventually the whole thing may be presented online as though every part came from the same historical record.</p>
          <p>Ghost Atlas tries to untangle those layers. The point is not to drain the mystery out of a place. It is to let readers see what is known, what is reported, and what belongs to tradition.</p>

          <h2>Documented history</h2>
          <p>Documented history is the part of an entry that can usually be tied to records or reliable historical sources. Examples include when a building was constructed, who owned it, what it was used for, whether a fire or battle occurred there, or whether a particular person actually lived or died at the site.</p>
          <p>Historical information can still be uncertain. Records conflict, old newspapers make mistakes, names change, and local histories sometimes repeat errors. But historical claims can usually be evaluated by comparing sources and asking what evidence exists outside the paranormal story itself.</p>

          <h2>Local folklore</h2>
          <p>Folklore is different. It is a story connected to a community or place that has been repeated over time. A road may have a legend about a vanishing hitchhiker. A bridge may be associated with a woman in white. A cemetery monument may have a ritual that teenagers have performed for decades.</p>
          <p>A legend does not have to be historically literal to matter. Folklore tells us something about how people experience and remember a place. In Ghost Atlas, a clearly identified local legend can be worth preserving even when there is no strong evidence that the events described in the legend actually happened.</p>

          <h2>Reported paranormal activity</h2>
          <p>Reported activity is exactly what the phrase says: someone has reported an experience. That can include footsteps, voices, apparitions, cold spots, moving objects, unexplained lights, physical sensations, electronic anomalies, or other events interpreted as paranormal.</p>
          <p>A report may come from a visitor, employee, resident, investigator, news story, book, tour guide, or other source. Recording the report does not require Ghost Atlas to endorse a supernatural explanation. The useful information is that the account exists, where it is said to occur, and how consistently it has been described.</p>

          <h2>Paranormal tradition</h2>
          <p>Some places develop a long-running paranormal reputation without one single story being the source. Hotels, theaters, hospitals, prisons, battlefields, and historic homes can accumulate decades of accounts. Different witnesses may describe different entities, sounds, rooms, or sensations.</p>
          <p>In those cases, the “haunting” is really a collection of traditions and reports. A Ghost Atlas entry may summarize recurring themes rather than present one definitive origin story.</p>

          <h2>The named-ghost problem</h2>
          <p>One of the most common complications in haunted history is the named ghost. A location may be said to be haunted by a particular person, but the identity can be much less certain than the story makes it sound.</p>
          <p>Sometimes the person is historically documented and the connection is plausible. Sometimes a real death occurred nearby but later storytellers attached that person to the building. Sometimes a first name appears in paranormal accounts with no supporting historical record. And sometimes an identity seems to have been invented because a named spirit makes a better story.</p>
          <p>Ghost Atlas tries to preserve the story while being careful about the identification. “The spirit is locally known as Anna” is a different statement from “Anna died in this room in 1892.” The first documents the legend. The second makes a historical claim that should have evidence.</p>

          <h2>Why stories change</h2>
          <p>Ghost stories are living stories. They change because memories change, businesses market themselves differently, tours need a narrative, new owners reinterpret old reports, and online articles copy from one another. A short anecdote can grow into a detailed biography after years of retelling.</p>
          <p>This does not automatically make every later version worthless. It simply means the age and origin of a detail matter. When possible, older sources can help show which parts of the story existed early and which appeared later.</p>

          <h2>What a source can—and cannot—prove</h2>
          <p>A source should be matched to the claim. A historic preservation organization may establish that a house dates to the eighteenth century. A newspaper interview may establish that employees have reported footsteps. A paranormal investigation video may establish what investigators said they experienced during a particular visit.</p>
          <p>None of those sources automatically proves that a ghost caused the experience. This is why Ghost Atlas links to sources while still using careful language around supernatural claims.</p>

          <h2>Why “local legend” is useful</h2>
          <p>Some entries fall into a middle ground. The story is specific to a real, identifiable place and is genuinely part of local lore, but independent sourcing is limited. Rejecting every story like that would erase a huge part of haunted-place culture. Presenting it as verified history would go too far in the other direction.</p>
          <p>Calling something a local legend solves that problem. It preserves the story and its geographic connection while telling the reader what kind of information it is.</p>

          <h2>Read the wording</h2>
          <p>When you browse Ghost Atlas, pay attention to verbs and qualifiers. “Records show,” “was built,” and “served as” generally describe historical information. “Reported,” “said to,” “according to local legend,” and “visitors describe” signal paranormal or folkloric material.</p>
          <p>Those distinctions are deliberate. They let history stay history and mystery stay mystery.</p>

          <h2>Why the distinction makes the story better</h2>
          <p>A haunting does not become less interesting because part of its origin story cannot be verified. In many cases, the gap between the documented history and the legend is the most interesting part. It shows how communities create meaning around old buildings, tragedies, landscapes, and unexplained experiences.</p>
          <p>Ghost Atlas is at its best when it gives you both sides: enough history to understand the place, and enough paranormal tradition to understand why people still talk about it.</p>

          <p><Link className="text-link" href="/directory">Browse the Haunted Places Directory →</Link></p>
          <p><Link className="text-link" href="/stories">Back to Stories &amp; Guides →</Link></p>
        </article>
      </section>
    </main>
  );
}
