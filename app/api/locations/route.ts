import { supabaseRest } from '@/lib/supabase-rest';

export const revalidate = 300;

const batchSize = 1000;

type DirectoryLocation = {
  id: string;
  title: string;
  slug: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  location_type: string | null;
  category: string | null;
  haunting_rating: number | null;
  legend_summary: string | null;
  short_address: string | null;
  is_private_property: boolean | null;
  access_status: string | null;
};

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

  const rows = (await response.json()) as DirectoryLocation[];
  const contentRange = response.headers.get('content-range');
  const total = contentRange ? Number(contentRange.split('/')[1]) : NaN;

  return { rows, total };
}

export async function GET(request: Request) {
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

    const url = new URL(request.url);
    if (url.searchParams.get('summary') === '1') {
      return Response.json({
        count: rows.length,
        expectedTotal: total,
        first: rows[0] ?? null,
        last: rows.at(-1) ?? null,
      });
    }

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
