import { supabaseRest } from '@/lib/supabase-rest';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows: unknown[] = [];
  const batchSize = 1000;
  const select = [
    'id','title','slug','city','state','country','latitude','longitude',
    'location_type','category','haunting_rating','legend_summary','short_address',
    'is_private_property','access_status'
  ].join(',');

  for (let start = 0; start < 10000; start += batchSize) {
    const response = await supabaseRest(
      `haunted_locations?select=${select}&is_published=eq.true&order=title.asc`,
      { headers: { Range: `${start}-${start + batchSize - 1}` }, cache: 'no-store' }
    );

    if (!response.ok) {
      return Response.json({ error: 'Unable to load Ghost Atlas locations.' }, { status: 502 });
    }

    const batch = (await response.json()) as unknown[];
    rows.push(...batch);
    if (batch.length < batchSize) break;
  }

  return Response.json(rows, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
