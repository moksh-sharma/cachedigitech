import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext({ content: null, loading: true, error: null });

const API_BASE = import.meta.env.VITE_API_BASE || ''; // same origin in dev (proxy); set VITE_API_BASE in production if API is elsewhere

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(API_BASE + '/api/content')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load content'))))
      .then((data) => {
        if (!cancelled) setContent(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setContent({});
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, error }}>
      {children}
    </ContentContext.Provider>
  );
}

/**
 * Get section content from CMS. Returns an object of field values.
 * Use with fallback: cms.title || 'Default Title'
 */
export function useContent(pageId, sectionId) {
  const { content } = useContext(ContentContext);
  if (!content || !pageId || !sectionId) return {};
  const page = content[pageId];
  if (!page) return {};
  return page[sectionId] || {};
}

/**
 * Get a single field value. Prefer useContent when you need multiple fields.
 */
export function useContentField(pageId, sectionId, fieldId) {
  const section = useContent(pageId, sectionId);
  return section[fieldId];
}

export default ContentContext;
