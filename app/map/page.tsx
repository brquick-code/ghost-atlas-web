'use client';

import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

maplibregl.setWorkerUrl(
  new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString()
);

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
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    let disposed = false;
    let map: maplibregl.Map | null = null;

    async function initializeMap() {
      try {
        const response = await fetch('/api/map-locations', {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Locations request failed: ${response.status}`);

        const locations = (await response.json()) as LocationRow[];
        if (!Array.isArray(locations)) throw new Error('Invalid map response');
        if (disposed || !mapNode.current) return;

        const mapped = locations.filter(
          (item) =>
            typeof item.latitude === 'number' &&
            Number.isFinite(item.latitude) &&
            item.latitude >= -90 &&
            item.latitude <= 90 &&
            typeof item.longitude === 'number' &&
            Number.isFinite(item.longitude) &&
            item.longitude >= -180 &&
            item.longitude <= 180
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

        setStatus(`${mapped.length.toLocaleString()} locations loaded · drawing map…`);

        map = new maplibregl.Map({
          container: mapNode.current,
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [-98.5, 39.5],
          zoom: 3.2,
        });

        map.addControl(new maplibregl.NavigationControl(), 'top-right');

        const addGhostAtlasLayers = () => {
          if (!map || disposed) return;

          try {
            if (map.getSource('haunts')) return;

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
                'circle-color': '#7d43b5',
                'circle-stroke-color': '#e3c2ff',
                'circle-stroke-width': 2.5,
                'circle-radius': ['step', ['get', 'point_count'], 19, 25, 24, 100, 30],
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
                'circle-color': '#bc7bf1',
                'circle-radius': 7,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#25102f',
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
                // Cluster membership can change while zooming.
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
          } catch (layerError) {
            console.error('Ghost Atlas pin layer failed', layerError);
            setStatus('Basemap loaded, but Ghost Atlas pins could not be drawn.');
          }
        };

        if (map.isStyleLoaded()) {
          addGhostAtlasLayers();
        } else {
          map.once('style.load', addGhostAtlasLayers);
        }
      } catch (error) {
        if (disposed) return;
        console.error('Ghost Atlas map initialization failed', error);
        if (controller.signal.aborted) {
          setStatus('The haunted map timed out. Please refresh and try again.');
        } else {
          setStatus('The haunted map could not be loaded right now.');
        }
      } finally {
        window.clearTimeout(timeout);
      }
    }

    initializeMap();

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
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
