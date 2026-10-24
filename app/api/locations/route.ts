import { supabaseRest } from '@/lib/supabase-rest';

export const revalidate = 300;

const batchSize = 1000;

async function fetchBatch(start: number, select: string, withCount = false) {
  const headers = new Headers();
  headers.set('Range', `${start}-${start + batchSize - 1}`);
  if (withCount) headers.set('Prefer', 'count=exact');

  const response = await supabaseRest(
    `haunted_locations?select=${select}&is_published=eq.true&order=title.asc`,
    {
      headers,
      next: { revalidate: 300 },
    } as RequestInit
  );

  if (!response.ok) {
    throw new Error(`Ghost Atlas locations request failed: ${response.status}`);
  }

  const rows = (await response.json()) as unknown[];
  const contentRange = response.headers.get('content-range');
  const total = contentRange ? Number(contentRange.split('/')[1]) : NaN;

  return { rows, total };
}

export async function GET() {
  try {
    const select = [
      'id','title','slug','city','state','country','latitude','longitude',
      'location_type','category','haunting_rating','legend_summary','short_address',
      'is_private_property','access_status'
    ].join(',');

    const first = await fetchBatch(0, select, true);
    const total = Number.isFinite(first.total) ? first.total : first.rows.length;
    const starts: number[] = [];

    for (let start = batchSize; start < total; start += batchSize) {
      starts.push(start);
    }

    const remaining = await Promise.all(starts.map((start) => fetchBatch(start, select)));
    const rows = [first.rows, ...remaining.map((batch) => batch.rows)].flat();

    return Response.json(rows, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Ghost Atlas directory feed failed', error);
    return Response.json({ error: 'Unable to load Ghost Atlas locations.' }, { status: 502 });
  }
}
