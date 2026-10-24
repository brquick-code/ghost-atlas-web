'use client';

import { useEffect, useRef, useState } from 'react';

type LocationRow = {
  id: string;
  title: string;
  slug: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  location_type: string | null;
  haunting_rating: number | null;
};

type MapInstance = {
  addControl: (...args: unknown[]) => void;
  on: (...args: unknown[]) => void;
  addSource: (...args: unknown[]) => void;
  addLayer: (...args: unknown[]) => void;
  getCanvas: () => HTMLCanvasElement;
};

type PopupInstance = {
  setLngLat: (coords: [number, number]) => PopupInstance;
  setDOMContent: (node: HTMLElement) => PopupInstance;
  addTo: (map: MapInstance) => PopupInstance;
};

type MapLibreNamespace = {
  Map: new (options: Record<string, unknown>) => MapInstance;
  NavigationControl: new (options?: Record<string, unknown>) => unknown;
  Popup: new (options?: Record<string, unknown>) => PopupInstance;
};

declare global {
  interface Window { maplibregl?: MapLibreNamespace }
}

function loadMapLibre() {
  return new Promise<MapLibreNamespace>((resolve, reject) => {
    if (window.maplibregl) return resolve(window.maplibregl);

    if (!document.querySelector('link[data-maplibre]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/maplibre-gl@6.15.0/dist/maplibre-gl.css';
      link.dataset.maplibre = 'true';
      document.head.appendChild(link);
    }

    const existing = document.querySelector('script[data-maplibre]') as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => window.maplibregl ? resolve(window.maplibregl) : reject(new Error('Map library unavailable')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/maplibre-gl@6.15.0/dist/maplibre-gl.js';
    script.async = true;
    script.dataset.maplibre = 'true';
    script.onload = () => window.maplibregl ? resolve(window.maplibregl) : reject(new Error('Map library unavailable'));
    script.onerror = () => reject(new Error('Map library unavailable'));
    document.head.appendChild(script);
  });
}

export default function MapPage() {
  const mapNode = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [status, setStatus] = useState('Loading haunted locations…');

  useEffect(() => {
    if (!mapNode.current || initialized.current) return;
    initialized.current = true;

    Promise.all([
      loadMapLibre(),
      fetch('/api/locations').then((res) => {
        if (!res.ok) throw new Error('Locations unavailable');
        return res.json() as Promise<LocationRow[]>;
      }),
    ])
      .then(([maplibre, locations]) => {
        const mapped = locations.filter((item) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude));
        setStatus(`${mapped.length.toLocaleString()} haunted locations mapped`);

        const geojson = {
          type: 'FeatureCollection',
          features: mapped.map((item) => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [item.longitude, item.latitude] },
            properties: {
              id: item.id,
              title: item.title,
              slug: item.slug || item.id,
              place: [item.city, item.state, item.country].filter(Boolean).join(', '),
              locationType: item.location_type || '',
              rating: item.haunting_rating || 0,
            },
          })),
        };

        const map = new maplibre.Map({
          container: mapNode.current as HTMLDivElement,
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [-98.5, 39.5],
          zoom: 3.2,
          attributionControl: true,
        });
        map.addControl(new maplibre.NavigationControl(), 'top-right');

        map.on('load', () => {
          map.addSource('haunts', {
            type: 'geojson',
            data: geojson,
            cluster: true,
            clusterMaxZoom: 12,
            clusterRadius: 48,
          });

          map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'haunts',
            filter: ['has', 'point_count'],
            paint: {
              'circle-color': '#6d3ba7',
              'circle-stroke-color': '#c69aff',
              'circle-stroke-width': 2,
              'circle-radius': ['step', ['get', 'point_count'], 18, 25, 23, 100, 29],
            },
          });

          map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'haunts',
            filter: ['has', 'point_count'],
            layout: { 'text-field': ['get', 'point_count_abbreviated'], 'text-size': 12 },
            paint: { 'text-color': '#ffffff' },
          });

          map.addLayer({
            id: 'haunt-points',
            type: 'circle',
            source: 'haunts',
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-color': '#9d63d2',
              'circle-radius': 7,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#24102f',
            },
          });

          map.on('click', 'haunt-points', (event: { features?: Array<{ geometry?: { coordinates?: [number, number] }; properties?: Record<string, string> }> }) => {
            const feature = event.features?.[0];
            const coords = feature?.geometry?.coordinates;
            const props = feature?.properties;
            if (!coords || !props) return;

            const card = document.createElement('div');
            card.className = 'map-popup-card';
            const title = document.createElement('strong');
            title.textContent = props.title || 'Haunted location';
            const place = document.createElement('span');
            place.textContent = props.place || '';
            const link = document.createElement('a');
            link.href = `/location/${props.slug}`;
            link.textContent = 'View location →';
            card.append(title, place, link);
            new maplibre.Popup({ offset: 12 }).setLngLat(coords).setDOMContent(card).addTo(map);
          });

          map.on('mouseenter', 'haunt-points', () => { map.getCanvas().style.cursor = 'pointer'; });
          map.on('mouseleave', 'haunt-points', () => { map.getCanvas().style.cursor = ''; });
        });
      })
      .catch(() => setStatus('The haunted map could not be loaded right now.'));
  }, []);

  return (
    <main className="map-page">
      <div className="map-toolbar">
        <div>
          <p className="eyebrow">GHOST ATLAS MAP</p>
          <h1>Explore Haunted Places</h1>
        </div>
        <span>{status}</span>
      </div>
      <div ref={mapNode} className="atlas-map" aria-label="Interactive map of Ghost Atlas haunted locations" />
    </main>
  );
}
