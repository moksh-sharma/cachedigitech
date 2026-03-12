import React, { createContext, useContext } from 'react';

const PlacementsContext = createContext({ placements: null, loading: false });

/** No backend: placements empty; components use their own fallback URLs. */
export function PlacementsProvider({ children }) {
  return (
    <PlacementsContext.Provider value={{ placements: {}, loading: false }}>
      {children}
    </PlacementsContext.Provider>
  );
}

/**
 * Get image URL for a placement. No backend: placements are empty, so always return undefined (components use fallbacks).
 * Usage: const url = usePlacement('global', 'branding', 'logo'); <img src={url || '/logo1.jpg'} />
 */
export function usePlacement(pageId, sectionId, fieldKey) {
  const { placements } = useContext(PlacementsContext);
  if (!placements || !pageId || !sectionId || !fieldKey) return undefined;
  const key = `${pageId}.${sectionId}.${fieldKey}`;
  const url = placements[key];
  return url && typeof url === 'string' ? url : undefined;
}

export default PlacementsContext;
