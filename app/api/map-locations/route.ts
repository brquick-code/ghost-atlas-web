import { supabaseRest } from '@/lib/supabase-rest';

export const revalidate = 300;

const batchSize = 1000;
const maxRows = 12000;

async function fetchBatch(start: number, select: string) {
  const response = await supabaseRest(
    `haunted_locations?select=${select}&is_published=eq.true&latitude=not.is.null&longitude=not.is.null&order=title.asc`,
    {
      headers: { Range: `${start}-${start + batchSize - 1}` },
      next: { revalidate: 300 },
    } as RequestInit
  );

  if (!response.ok) {
    throw new Error(`Ghost Atlas map request failed: ${response.status}`);
  }

  return (await response.json()) as unknown[];
}

export async function GET() {
  try {
    const select = [
      'id','title','slug','city','state','country','latitude','longitude',
      'location_type','haunting_rating'
    ].join(',');

    const starts = Array.from({ length: maxRows / batchSize }, (_, index) => index * batchSize);
    const batches = await Promise.all(starts.map((start) => fetchBatch(start, select)));
    const rows = batches.flat();

    return Response.json(rows, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Ghost Atlas map feed failed', error);
    return Response.json({ error: 'Unable to load Ghost Atlas map locations.' }, { status: 502 });
  }
}
