'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export type LocationRow = {
  id: string;
  title: string;
  slug: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  location_type: string | null;
  haunting_rating: number | null;
  legend_summary: string | null;
  short_address: string | null;
};

type Scope = 'all' | 'us' | 'international';

export default function DirectoryClient({ initialLocations }: { initialLocations: LocationRow[] }) {
  const [locations, setLocations] = useState<LocationRow[]>(initialLocations);
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<Scope>('all');
  const [stateFilter, setStateFilter] = useState('');
  const [page, setPage] = useState(1);
  const [loadingFullDirectory, setLoadingFullDirectory] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/locations', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Unable to load locations');
        return res.json();
      })
      .then((data: LocationRow[]) => {
        if (!Array.isArray(data)) throw new Error('Invalid directory response');
        setLocations(data);
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          setError(initialLocations.length > 0
            ? 'The full directory could not be loaded right now. Showing available locations.'
            : 'The directory could not be loaded right now.');
        }
      })
      .finally(() => setLoadingFullDirectory(false));

    return () => controller.abort();
  }, [initialLocations.length]);

  useEffect(() => setPage(1), [query, scope, stateFilter]);

  const states = useMemo(() => {
    const values = new Set<string>();
    for (const location of locations) {
      if (location.state) values.add(location.state);
    }
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [locations]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return locations.filter((location) => {
      const isUs = ['United States', 'USA', 'US'].includes(location.country || '');
      if (scope === 'us' && !isUs) return false;
      if (scope === 'international' && isUs) return false;
      if (stateFilter && location.state !== stateFilter) return false;
      if (!needle) return true;
      return [location.title, location.city, location.state, location.country, location.location_type]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle));
    });
  }, [locations, query, scope, stateFilter]);

  const pageSize = 50;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="app-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">EXPLORE THE ATLAS</p>
        <h1>Haunted Places Directory</h1>
        <p>Browse and search thousands of published Ghost Atlas locations, each with place details, reported activity, and source links where available.</p>
      </section>

      <section className="content-shell">
        <div className="directory-controls panel">
          <label className="search-field">
            <span>Search locations</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Hotel, cemetery, city, state..."
              type="search"
            />
          </label>

          <div className="scope-tabs" aria-label="Location scope">
            <button className={scope === 'us' ? 'active' : ''} onClick={() => setScope('us')}>US</button>
            <button className={scope === 'international' ? 'active' : ''} onClick={() => setScope('international')}>International</button>
            <button className={scope === 'all' ? 'active' : ''} onClick={() => setScope('all')}>All</button>
          </div>

          <label className="filter-field">
            <span>State / Region</span>
            <select value={stateFilter} onChange={(event) => setStateFilter(event.target.value)}>
              <option value="">All</option>
              {states.map((state) => <option key={state} value={state}>{state}</option>)}
            </select>
          </label>
        </div>

        <div className="result-bar">
          <strong>{`${filtered.length.toLocaleString()} locations${loadingFullDirectory ? ' shown' : ''}`}</strong>
          {loadingFullDirectory ? <span>Loading the full directory…</span> : filtered.length > 0 && <span>Page {page} of {pageCount}</span>}
        </div>

        {error && <div className="notice error-notice">{error}</div>}

        <div className="location-list">
          {visible.map((location) => (
            <Link className="location-row" key={location.id} href={`/location/${location.slug || location.id}`}>
              <div>
                <h2>{location.title}</h2>
                <p>{[location.city, location.state, location.country].filter(Boolean).join(', ')}</p>
                {location.legend_summary && <span>{location.legend_summary}</span>}
              </div>
              <div className="location-row-meta">
                {location.location_type && <small>{location.location_type}</small>}
                {location.haunting_rating && <b aria-label={`${location.haunting_rating} out of 5 haunting rating`}>{'★'.repeat(location.haunting_rating)}</b>}
                <span aria-hidden="true">›</span>
              </div>
            </Link>
          ))}
        </div>

        {!loadingFullDirectory && !error && visible.length === 0 && (
          <div className="empty-state panel">No haunted locations match those filters.</div>
        )}

        {pageCount > 1 && (
          <div className="pagination">
            <button disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button>
            <span>{page} / {pageCount}</span>
            <button disabled={page >= pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>Next</button>
          </div>
        )}
      </section>
    </main>
  );
}
