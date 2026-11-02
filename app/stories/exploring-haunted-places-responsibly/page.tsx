import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Exploring Haunted Places Responsibly',
  description: 'A Ghost Atlas field guide to researching and visiting haunted locations legally, safely, and respectfully.',
  alternates: { canonical: '/stories/exploring-haunted-places-responsibly' },
};

export default function ResponsibleExplorationPage() {
  return (
    <main className="app-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">FIELD GUIDE</p>
        <h1>Exploring Haunted Places Responsibly</h1>
        <p>Ghost Atlas can show you where a story is connected to the map. It cannot give you permission to enter a property, ignore a closure, or take unnecessary risks.</p>
      </section>

      <section className="content-shell">
        <article className="panel location-story">
          <p>Haunted places are often compelling because they feel close to the past. A historic hotel can still accept guests. A cemetery can contain generations of local history. An old road may carry a legend that everyone in town knows. A ruined building can look like the perfect place to investigate after dark.</p>
          <p>That last part is where curiosity can become a problem. The most interesting way to explore a haunted place is not necessarily the most dramatic way. Good research, legal access, and respect for the site usually produce a better experience than sneaking into somewhere you do not belong.</p>

          <h2>A map pin is not permission</h2>
          <p>This is the most important Ghost Atlas rule. A location appearing in the Atlas means it is connected to a story or report. It does not mean the property is open to the public. Some entries are active businesses, private homes, working churches, cemeteries, government properties, hospitals, schools, abandoned structures, or land with restricted access.</p>
          <p>Check current access information before visiting. Look for official hours, property rules, tour information, posted signs, gates, and local restrictions. If a property requires permission, get permission.</p>

          <h2>Do the research before the drive</h2>
          <p>A few minutes of research can completely change a visit. A building described as abandoned in a ten-year-old article may now be restored and occupied. A road may have changed names. A historic attraction may offer an official night tour. A cemetery may close its gates before dark. A property known for ghost stories may specifically prohibit paranormal investigations.</p>
          <p>Use Ghost Atlas as a starting point, then check the location&apos;s official website, current maps, local information, and the source links attached to the entry when available.</p>

          <h2>Public does not mean unrestricted</h2>
          <p>Parks, cemeteries, trails, museums, and historic sites can be publicly accessible while still having rules. Closing times matter. Areas may be roped off for preservation. Photography or equipment may be restricted. Special events may require tickets. Trails can close because of weather or maintenance.</p>
          <p>Respecting those rules protects both the site and the ability of future visitors to enjoy it.</p>

          <h2>Abandoned buildings are not automatically free to enter</h2>
          <p>“Abandoned” describes condition, not ownership. An empty structure can still be private property. It can also contain unstable floors, exposed nails, broken glass, contaminated materials, animals, electrical hazards, fire damage, or hidden drops.</p>
          <p>If a haunted story is tied to an abandoned structure, viewing it from a legal public area may be the only responsible option unless an owner or authorized operator provides access.</p>

          <h2>Cemeteries deserve extra care</h2>
          <p>Cemeteries are historical places, but they are also places where real people are buried and families may still visit. Stay on established paths where possible, follow posted hours, do not climb on monuments, do not remove objects, and avoid disrupting services or visitors.</p>
          <p>Many cemetery legends involve touching a statue, moving an object, leaving something on a grave, or performing a ritual. A story being traditional does not make damaging or interfering with a grave acceptable.</p>

          <h2>Remember the people behind tragic stories</h2>
          <p>Some haunted locations are connected to murders, accidents, disasters, war, institutional abuse, or other real suffering. Those events should not be reduced to scenery. It is possible to be interested in the paranormal story while still treating victims, descendants, employees, residents, and local communities with respect.</p>
          <p>That matters especially at locations where a tragedy is recent or where people directly affected by it are still living.</p>

          <h2>Night changes the risk</h2>
          <p>A place that is easy to navigate during the day can be very different at night. Uneven ground, traffic, wildlife, weather, water, cliffs, old structures, and unfamiliar roads become harder to judge. If you are visiting after dark, stay in legal areas, use appropriate lighting, keep track of your surroundings, and avoid going alone to isolated places.</p>
          <p>Do not let the desire for a better story or recording override basic judgment.</p>

          <h2>Do not manufacture evidence</h2>
          <p>If you investigate, record what happened as accurately as you can. Note environmental conditions, nearby people, traffic, animals, building noises, equipment behavior, and anything else that could provide context. An unexplained sound is more useful when you also know what was happening around you.</p>
          <p>Ghost Atlas is interested in the story of a place, not in forcing every odd event to have a paranormal explanation.</p>

          <h2>Leave the place as you found it</h2>
          <p>Do not break locks, move historic objects, mark walls, remove souvenirs, disturb graves, leave trash, or damage a site to create access. Preservation is especially important at older locations where seemingly small actions can permanently harm fragile structures or artifacts.</p>

          <h2>Be a good visitor</h2>
          <p>Some haunted places welcome the attention. Hotels offer haunted rooms. Historic sites run ghost tours. Museums host investigations. Restaurants embrace their resident ghost stories. Supporting those places through legal visits, tickets, tours, meals, or overnight stays helps preserve the locations that keep these stories alive.</p>

          <h2>Use Ghost Atlas as a research tool</h2>
          <p>The Atlas is meant to help you discover places, understand why they are associated with paranormal stories, find source material, and make better decisions about where to explore. The pin gets you interested. The research tells you how to approach the place.</p>
          <p>If an entry&apos;s access information looks outdated or a pin creates a safety or privacy concern, let Ghost Atlas know so the record can be reviewed.</p>

          <p><Link className="text-link" href="/directory">Find a place to research →</Link></p>
          <p><Link className="text-link" href="/stories">Back to Stories &amp; Guides →</Link></p>
        </article>
      </section>
    </main>
  );
}
