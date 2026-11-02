import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the Ghost Atlas website operated by Black Tides Software LLC.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="app-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">GHOST ATLAS</p>
        <h1>Privacy Policy</h1>
        <p>How Ghost Atlas handles information when you browse the website, save favorites, or submit a haunted location.</p>
      </section>

      <section className="content-shell">
        <article className="panel location-story">
          <p><strong>Effective date:</strong> November 2, 2026</p>
          <p>Ghost Atlas is operated by Black Tides Software LLC. This policy applies to the Ghost Atlas website at ghostatlas.app. It explains the information the website may receive, why it is used, and the choices available to visitors.</p>

          <h2>Information you choose to provide</h2>
          <p>You can browse Ghost Atlas without creating an account. If you submit a haunted location, the submission form may include the location name, address or general location, the haunting story, source links, and optional contact information such as your name and email address. Submitted information is used to review, research, approve, reject, or improve Ghost Atlas entries and to contact a submitter when clarification is useful.</p>
          <p>Please do not submit private personal information about another person, confidential information, or material you do not have permission to share.</p>

          <h2>Favorites and browser storage</h2>
          <p>The website allows visitors to save favorite locations in their browser. This feature is intended to keep a personal list on the device or browser being used. Clearing browser storage may remove that list.</p>

          <h2>Technical information</h2>
          <p>Like most websites, Ghost Atlas is delivered through hosting and infrastructure providers that may process routine technical information needed to serve and secure the site. This can include an IP address, browser or device information, request timing, requested pages, and diagnostic or security logs.</p>

          <h2>Advertising and Google services</h2>
          <p>Ghost Atlas may use Google advertising services, including Google AdSense. Google and its advertising partners may use cookies, device identifiers, or similar technologies to serve, measure, personalize, or limit advertising in accordance with their own policies and applicable law. Visitors can learn about how Google uses information from sites and apps that use its services through Google&apos;s privacy and advertising resources.</p>
          <p>Advertising preferences and controls may also be available through Google and through browser or device settings. Where consent is legally required for advertising technologies, Ghost Atlas will use the consent mechanisms required for the applicable region.</p>

          <h2>External links and directions</h2>
          <p>Location records can contain links to outside sources, official websites, app stores, and map or directions services. When you follow an external link, the destination service receives the request and its own privacy policy applies. Ghost Atlas does not control the privacy practices of third-party websites.</p>

          <h2>How information is used</h2>
          <p>Information handled by Ghost Atlas is used to operate and secure the website, maintain the haunted-location database, review community submissions, respond to support requests, improve site functionality, diagnose technical problems, and support advertising where enabled.</p>

          <h2>Data sharing</h2>
          <p>Ghost Atlas does not sell a submitter&apos;s name or email address. Information may be processed by service providers that help host, operate, secure, or support the website. Information may also be disclosed when reasonably necessary to comply with law, protect users or the public, investigate abuse, or protect the rights and property of Black Tides Software LLC.</p>

          <h2>Published submissions</h2>
          <p>A submission may be used to create or improve a public Ghost Atlas location record. The location, haunting account, and source information provided for that purpose may therefore become public after review. Contact information is not intended to be published as part of a location record unless a submitter specifically provided material for public attribution and that attribution is appropriate.</p>

          <h2>Children&apos;s privacy</h2>
          <p>Ghost Atlas is not designed to collect personal information from children through account registration because the website does not require visitor accounts. If a parent or guardian believes a child has submitted personal information that should be removed, they may contact us.</p>

          <h2>Corrections, questions, and removal requests</h2>
          <p>If you have a privacy question, believe a submission contains personal information that should not be public, or want to request correction or deletion of information you provided, contact <a href="mailto:support@blacktidessoftware.com">support@blacktidessoftware.com</a>. Requests may require enough information to identify the relevant submission or record.</p>

          <h2>Changes to this policy</h2>
          <p>This policy may be updated as Ghost Atlas adds features, providers, or legal requirements. The effective date at the top of this page will be updated when the policy materially changes.</p>
        </article>
      </section>
    </main>
  );
}
