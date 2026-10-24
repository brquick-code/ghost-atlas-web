'use client';

import { useEffect, useState } from 'react';

export type FavoriteLocation = {
  id: string;
  title: string;
  slug: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  location_type: string | null;
};

const KEY = 'ghost-atlas-favorites-v1';

export function readFavorites(): FavoriteLocation[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as FavoriteLocation[];
  } catch {
    return [];
  }
}

export default function FavoriteButton({ location }: { location: FavoriteLocation }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readFavorites().some((item) => item.id === location.id));
  }, [location.id]);

  function toggle() {
    const current = readFavorites();
    const next = current.some((item) => item.id === location.id)
      ? current.filter((item) => item.id !== location.id)
      : [location, ...current];
    localStorage.setItem(KEY, JSON.stringify(next));
    setSaved(!saved);
  }

  return (
    <button type="button" className={`favorite-button ${saved ? 'saved' : ''}`} onClick={toggle}>
      <span aria-hidden="true">{saved ? '♥' : '♡'}</span>
      {saved ? 'Saved to Favorites' : 'Add to Favorites'}
    </button>
  );
}
