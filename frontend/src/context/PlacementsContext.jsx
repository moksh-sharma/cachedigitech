import React, { createContext, useContext, useState, useEffect } from 'react';

const PlacementsContext = createContext({ placements: null, loading: true });

const API_BASE = import.meta.env.VITE_API_BASE || '';

export function PlacementsProvider({ children }) {
  const [placements, setPlacements] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(API_BASE + '/api/media/placements')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load placements'))))
      .then((data) => {
        if (!cancelled) setPlacements(data || {});
      })
      .catch(() => {
        if (!cancelled) setPlacements({});
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <PlacementsContext.Provider value={{ placements, loading }}>
      {children}
    </PlacementsContext.Provider>
  );
}

/**
 * Get image URL for a placement. Returns the CMS-assigned URL or undefined (use fallback in component).
 * Usage: const url = usePlacement('global', 'branding', 'logo'); <img src={url || '/logo1.jpg'} />
 */
export function usePlacement(pageId, sectionId, fieldKey) {
  const { placements } = useContext(PlacementsContext);
  if (!placements || !pageId || !sectionId || !fieldKey) return undefined;
  const key = `${pageId}.${sectionId}.${fieldKey}`;
  const url = placements[key];
  return url && typeof url === 'string' ? (url.startsWith('http') ? url : API_BASE + url) : undefined;
}

export default PlacementsContext;
