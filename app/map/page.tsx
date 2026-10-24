'use client';

import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

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

export default function MapPage() {
  const mapNode = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('Loading haunted locations…');

  useEffect(() => {
    if (!mapNode.current) return;

    const controller = new AbortController();
    let disposed = false;
    let map: maplibregl.Map | null = null;

    async function initializeMap() {
      try {
        const response = await fetch('/api/locations', {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) throw new Error(`Locations request failed: ${response.status}`);

        const locations = (await response.json()) as LocationRow[];
        if (disposed || !mapNode.current) return;

        const mapped = locations.filter(
          (item) =>
            typeof item.latitude === 'number' &&
            Number.isFinite(item.latitude) &&
            typeof item.longitude === 'number' &&
            Number.isFinite(item.longitude)
        );

        if (!mapped.length) throw new Error('No mapped locations returned');

        const geojson = {
          type: 'FeatureCollection' as const,
          features: mapped.map((item) => ({
            type: 'Feature' as const,
            geometry: {
              type: 'Point' as const,
              coordinates: [item.longitude as number, item.latitude as number],
            },
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

        map = new maplibregl.Map({
          container: mapNode.current,
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [-98.5, 39.5],
          zoom: 3.2,
          attributionControl: true,
        });

        map.addControl(new maplibregl.NavigationControl(), 'top-right');

        map.on('load', () => {
          if (!map || disposed) return;

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
            layout: {
              'text-field': ['get', 'point_count_abbreviated'],
              'text-size': 12,
            },
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

          map.on('click', 'clusters', async (event) => {
            if (!map) return;
            const feature = event.features?.[0];
            const clusterId = feature?.properties?.cluster_id;
            const coordinates = feature?.geometry.type === 'Point' ? feature.geometry.coordinates : null;
            if (clusterId == null || !coordinates) return;

            const source = map.getSource('haunts') as maplibregl.GeoJSONSource;
            try {
              const zoom = await source.getClusterExpansionZoom(clusterId);
              map.easeTo({ center: coordinates as [number, number], zoom });
            } catch {
              // A cluster can change while the map is moving. Safe to ignore.
            }
          });

          map.on('click', 'haunt-points', (event) => {
            if (!map) return;
            const feature = event.features?.[0];
            if (!feature || feature.geometry.type !== 'Point') return;

            const coords = feature.geometry.coordinates as [number, number];
            const props = feature.properties || {};

            const card = document.createElement('div');
            card.className = 'map-popup-card';

            const title = document.createElement('strong');
            title.textContent = String(props.title || 'Haunted location');

            const place = document.createElement('span');
            place.textContent = String(props.place || '');

            const link = document.createElement('a');
            link.href = `/location/${String(props.slug || '')}`;
            link.textContent = 'View location →';

            card.append(title, place, link);
            new maplibregl.Popup({ offset: 12 })
              .setLngLat(coords)
              .setDOMContent(card)
              .addTo(map);
          });

          for (const layer of ['clusters', 'haunt-points']) {
            map.on('mouseenter', layer, () => {
              if (map) map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', layer, () => {
              if (map) map.getCanvas().style.cursor = '';
            });
          }

          setStatus(`${mapped.length.toLocaleString()} haunted locations mapped`);
        });
      } catch (error) {
        if (controller.signal.aborted || disposed) return;
        console.error('Ghost Atlas map initialization failed', error);
        setStatus('The haunted map could not be loaded right now.');
      }
    }

    initializeMap();

    return () => {
      disposed = true;
      controller.abort();
      map?.remove();
    };
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
