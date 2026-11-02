import type { MetadataRoute } from 'next';
import { supabaseRest } from '@/lib/supabase-rest';

export const revalidate = 3600;

type SitemapLocation = {
  id: string;
  slug: string | null;
  updated_at: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://ghostatlas.app';
  const rows: SitemapLocation[] = [];
  const batchSize = 1000;

  for (let start = 0; start < 10000; start += batchSize) {
    const response = await supabaseRest(
      'haunted_locations?select=id,slug,updated_at&is_published=eq.true&order=title.asc',
      { headers: { Range: `${start}-${start + batchSize - 1}` } }
    );
    if (!response.ok) break;
    const batch = (await response.json()) as SitemapLocation[];
    rows.push(...batch);
    if (batch.length < batchSize) break;
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/map`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/directory`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/stories`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/stories/how-ghost-atlas-researches-haunted-locations`, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/stories/history-folklore-and-reported-hauntings`, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/stories/exploring-haunted-places-responsibly`, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/editorial-policy`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/submit`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  return [
    ...staticRoutes,
    ...rows.map((location) => ({
      url: `${base}/location/${location.slug || location.id}`,
      lastModified: location.updated_at ? new Date(location.updated_at) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
