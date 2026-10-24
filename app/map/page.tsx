'use client';

import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map-overrides.css';

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

function createGhostAtlasPin(): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = 48;
  canvas.height = 60;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Unable to create Ghost Atlas pin');

  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;

  context.clearRect(0, 0, width, height);

  context.beginPath();
  context.moveTo(centerX, height - 2);
  context.bezierCurveTo(width * 0.44, height * 0.86, width * 0.14, height * 0.61, width * 0.14, height * 0.36);
  context.bezierCurveTo(width * 0.14, height * 0.15, width * 0.30, 2, centerX, 2);
  context.bezierCurveTo(width * 0.70, 2, width * 0.86, height * 0.15, width * 0.86, height * 0.36);
  context.bezierCurveTo(width * 0.86, height * 0.61, width * 0.56, height * 0.86, centerX, height - 2);
  context.closePath();
  context.fillStyle = '#9a4dcc';
  context.fill();
  context.lineWidth = 4;
  context.strokeStyle = '#26102f';
  context.stroke();

  context.beginPath();
  context.arc(centerX, 20, 7.5, 0, Math.PI * 2);
  context.fillStyle = '#f1ddff';
  context.fill();
  context.lineWidth = 2.5;
  context.strokeStyle = '#26102f';
  context.stroke();

  return context.getImageData(0, 0, width, height);
}

export default function MapPage() {
  const mapNode = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('Loading haunted locations…');

  useEffect(() => {
    if (!mapNode.current) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    let disposed = false;
    let map: maplibregl.Map | null = null;
    let activePopup: maplibregl.Popup | null = null;
    let selectionToken = 0;

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

            if (!map.hasImage('ghost-atlas-pin')) {
              map.addImage('ghost-atlas-pin', createGhostAtlasPin(), { pixelRatio: 2 });
            }

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
              type: 'symbol',
              source: 'haunts',
              filter: ['!', ['has', 'point_count']],
              layout: {
                'icon-image': 'ghost-atlas-pin',
                'icon-anchor': 'bottom',
                'icon-size': 1,
                'icon-allow-overlap': true,
                'icon-ignore-placement': true,
              },
            });

            map.on('click', 'clusters', async (event) => {
              if (!map) return;
              activePopup?.remove();
              const feature = event.features?.[0];
              const clusterId = feature?.properties?.cluster_id;
              const coordinates = feature?.geometry.type === 'Point' ? feature.geometry.coordinates : null;
              if (clusterId == null || !coordinates) return;

              const source = map.getSource('haunts') as maplibregl.GeoJSONSource;
              try {
                const zoom = await source.getClusterExpansionZoom(clusterId);
                map.easeTo({ center: coordinates as [number, number], zoom, duration: 500 });
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
              const token = ++selectionToken;
              const currentZoom = map.getZoom();
              const targetZoom = Math.max(currentZoom, 14);

              activePopup?.remove();
              activePopup = null;
              map.stop();

              const showPopup = () => {
                if (!map || disposed || token !== selectionToken) return;

                const card = document.createElement('div');
                card.className = 'map-popup-card';

                const accent = document.createElement('div');
                accent.className = 'map-popup-accent';

                const title = document.createElement('strong');
                title.textContent = String(props.title || 'Haunted location');

                const place = document.createElement('span');
                place.className = 'map-popup-place';
                place.textContent = String(props.place || '');

                const meta = document.createElement('div');
                meta.className = 'map-popup-meta';

                const locationType = String(props.locationType || '').trim();
                const rating = Number(props.rating || 0);

                if (locationType) {
                  const type = document.createElement('span');
                  type.className = 'map-popup-type';
                  type.textContent = locationType;
                  meta.append(type);
                }

                if (rating > 0) {
                  const score = document.createElement('span');
                  score.className = 'map-popup-rating';
                  score.textContent = `★ ${rating}/5`;
                  meta.append(score);
                }

                const link = document.createElement('a');
                link.href = `/location/${String(props.slug || '')}`;
                link.textContent = 'View haunt →';

                card.append(accent, title, place);
                if (meta.childElementCount) card.append(meta);
                card.append(link);

                activePopup = new maplibregl.Popup({
                  anchor: 'bottom',
                  offset: 34,
                  closeButton: true,
                  closeOnClick: true,
                  focusAfterOpen: false,
                  maxWidth: '220px',
                })
                  .setLngLat(coords)
                  .setDOMContent(card)
                  .addTo(map);
              };

              // Keep the selected pin visibly below center so the compact popup
              // has room above it instead of sitting on top of the marker.
              map.once('moveend', showPopup);
              map.easeTo({
                center: coords,
                zoom: targetZoom,
                offset: [0, 90],
                duration: targetZoom > currentZoom + 1 ? 800 : 450,
                essential: true,
              });
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
      selectionToken += 1;
      activePopup?.remove();
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
