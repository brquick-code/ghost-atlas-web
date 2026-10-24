'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readFavorites, type FavoriteLocation } from '@/components/FavoriteButton';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  useEffect(() => setFavorites(readFavorites()), []);

  function remove(id: string) {
    const next = favorites.filter((item) => item.id !== id);
    localStorage.setItem('ghost-atlas-favorites-v1', JSON.stringify(next));
    setFavorites(next);
  }

  return (
    <main className="app-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">YOUR ATLAS</p>
        <h1>Favorites</h1>
        <p>Keep a browser-based list of haunted places you want to remember.</p>
      </section>

      <section className="content-shell">
        {favorites.length === 0 ? (
          <div className="empty-state panel">
            <h2>No favorites yet</h2>
            <p>Open a haunted location and choose “Add to Favorites.”</p>
            <Link href="/directory" className="primary-button">Browse the Directory</Link>
          </div>
        ) : (
          <div className="favorite-grid">
            {favorites.map((location) => (
              <article className="panel favorite-card" key={location.id}>
                <div>
                  <span className="card-kicker">{location.location_type || 'Haunted Location'}</span>
                  <h2><Link href={`/location/${location.slug || location.id}`}>{location.title}</Link></h2>
                  <p>{[location.city, location.state, location.country].filter(Boolean).join(', ')}</p>
                </div>
                <div className="favorite-card-actions">
                  <Link href={`/location/${location.slug || location.id}`}>View location →</Link>
                  <button type="button" onClick={() => remove(location.id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
        )}
        <p className="browser-note">For this first web release, favorites are stored in this browser. Your mobile app favorites are not changed.</p>
      </section>
    </main>
  );
}
