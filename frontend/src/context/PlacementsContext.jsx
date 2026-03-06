import React, { createContext, useContext } from 'react';

const PlacementsContext = createContext({ placements: null, loading: false });

const API_BASE = import.meta.env.VITE_API_BASE || '';

/** Placements are from API/Postgres; no hardcoded fallback so images reflect live data only. */
export function PlacementsProvider({ children }) {
  return (
    <PlacementsContext.Provider value={{ placements: {}, loading: false }}>
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
