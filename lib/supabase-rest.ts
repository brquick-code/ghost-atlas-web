const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

function config() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Ghost Atlas Supabase environment variables are not configured.");
  }
  return { url: SUPABASE_URL.replace(/\/$/, ""), key: SUPABASE_KEY };
}

export async function supabaseRest(path: string, init: RequestInit = {}) {
  const { url, key } = config();
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  if (!headers.has("Content-Type") && init.body) headers.set("Content-Type", "application/json");

  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers,
  });
}

export type HauntedLocation = {
  id: string;
  title: string;
  location_name: string | null;
  description: string | null;
  category: string | null;
  latitude: number | null;
  longitude: number | null;
  source_url: string | null;
  source_urls: string[] | null;
  city: string | null;
  state: string | null;
  country: string | null;
  address: string | null;
  legend_summary: string | null;
  reported_entities: string[] | null;
  activity_types: string[] | null;
  access_status: string | null;
  danger_level: string | null;
  location_type: string | null;
  phenomenon_types: string[] | null;
  haunting_rating: number | null;
  official_website: string | null;
  image_url: string | null;
  slug: string | null;
  verified: boolean | null;
  featured: boolean | null;
  last_investigated: string | null;
  alternate_names: string[] | null;
  short_address: string | null;
  is_private_property: boolean | null;
  created_at?: string | null;
};

export async function getLocationBySlugOrId(slugOrId: string): Promise<HauntedLocation | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slugOrId);
  const filter = isUuid ? `id=eq.${encodeURIComponent(slugOrId)}` : `slug=eq.${encodeURIComponent(slugOrId)}`;
  const res = await supabaseRest(`haunted_locations?select=*&is_published=eq.true&${filter}&limit=1`, {
    next: { revalidate: 300 },
  } as RequestInit);
  if (!res.ok) return null;
  const rows = (await res.json()) as HauntedLocation[];
  return rows[0] ?? null;
}

export async function getLatestLocations(limit = 6): Promise<HauntedLocation[]> {
  const select = "id,title,slug,city,state,country,location_type,haunting_rating,legend_summary,created_at";
  const res = await supabaseRest(`haunted_locations?select=${select}&is_published=eq.true&order=created_at.desc&limit=${limit}`, {
    next: { revalidate: 300 },
  } as RequestInit);
  if (!res.ok) return [];
  return (await res.json()) as HauntedLocation[];
}
