import type { Metadata } from 'next';
import DirectoryClient, { type LocationRow } from './DirectoryClient';
import { supabaseRest } from '@/lib/supabase-rest';

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: 'Haunted Places Directory | Ghost Atlas' },
  description: 'Browse thousands of haunted locations, paranormal hotspots, eerie legends, and strange histories in the Ghost Atlas directory.',
  alternates: { canonical: '/directory' },
};

async function getInitialLocations(): Promise<LocationRow[]> {
  const select = [
    'id',
    'title',
    'slug',
    'city',
    'state',
    'country',
    'location_type',
    'haunting_rating',
    'legend_summary',
    'short_address',
  ].join(',');

  const headers = new Headers();
  headers.set('Range', '0-49');

  const response = await supabaseRest(
    `haunted_locations?select=${select}&is_published=eq.true&order=title.asc`,
    {
      headers,
      next: { revalidate: 300 },
    } as RequestInit
  );

  if (!response.ok) return [];
  return (await response.json()) as LocationRow[];
}

export default async function DirectoryPage() {
  const initialLocations = await getInitialLocations();
  return <DirectoryClient initialLocations={initialLocations} />;
}
