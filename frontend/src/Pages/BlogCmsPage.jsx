import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE || '';
const fetchOpts = { credentials: 'include' };

export default function BlogCmsPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    author: '',
    date: '',
    category: '',
    readTime: '',
    image: '',
  });

  // Tab: blogs | highlights
  const [tab, setTab] = useState('blogs');
  const [highlights, setHighlights] = useState([]);
  const [highlightsLoading, setHighlightsLoading] = useState(false);
  const [highlightsError, setHighlightsError] = useState('');
  const [editingHighlightIndex, setEditingHighlightIndex] = useState(null); // null | 'new' | number
  const [highlightForm, setHighlightForm] = useState({
    image: '',
    tag: '',
    title: '',
    description: '',
    type: 'Article',
    link: '',
  });

  // Testimonials tab
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [testimonialsError, setTestimonialsError] = useState('');
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    company: '',
    logo: '',
    image: '',
    quote: '',
  });

  // Hero backgrounds tab
  const [heroBackgrounds, setHeroBackgrounds] = useState([]);
  const [heroBackgroundsLoading, setHeroBackgroundsLoading] = useState(false);
  const [heroBackgroundsError, setHeroBackgroundsError] = useState('');
  const [editingHeroBgIndex, setEditingHeroBgIndex] = useState(null); // null | 'new' | number
  const [heroBgForm, setHeroBgForm] = useState({ image_url: '' });

  // Contact submissions tab (read-only)
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [contactSubmissionsLoading, setContactSubmissionsLoading] = useState(false);
  const [contactSubmissionsError, setContactSubmissionsError] = useState('');

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch(API_BASE + '/api/auth/blog-me', fetchOpts);
      const data = await res.json();
      setLoggedIn(!!data.loggedIn);
    } catch {
      setLoggedIn(false);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const loadBlogs = useCallback(async () => {
    if (!loggedIn) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_BASE + '/api/blogs', fetchOpts);
      if (!res.ok) throw new Error('Failed to load blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) loadBlogs();
  }, [loggedIn, loadBlogs]);

  const loadHighlights = useCallback(async () => {
    setHighlightsLoading(true);
    setHighlightsError('');
    try {
      const res = await fetch(API_BASE + '/api/highlights', fetchOpts);
      const data = res.ok ? await res.json().catch(() => []) : [];
      const list = Array.isArray(data) ? data : [];
      setHighlights(list);
    } catch (e) {
      setHighlights([]);
    } finally {
      setHighlightsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn && tab === 'highlights') loadHighlights();
  }, [loggedIn, tab, loadHighlights]);

  const loadTestimonials = useCallback(async () => {
    setTestimonialsLoading(true);
    setTestimonialsError('');
    try {
      const res = await fetch(API_BASE + '/api/testimonials', fetchOpts);
      const data = res.ok ? await res.json().catch(() => []) : [];
      const list = Array.isArray(data) ? data : [];
      setTestimonials(list);
    } catch (e) {
      setTestimonials([]);
    } finally {
      setTestimonialsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn && tab === 'testimonials') loadTestimonials();
  }, [loggedIn, tab, loadTestimonials]);

  const loadHeroBackgrounds = useCallback(async () => {
    setHeroBackgroundsLoading(true);
    setHeroBackgroundsError('');
    try {
      const res = await fetch(API_BASE + '/api/hero-backgrounds', fetchOpts);
      const data = res.ok ? await res.json().catch(() => []) : [];
      const list = Array.isArray(data) ? data : [];
      setHeroBackgrounds(list);
    } catch {
      setHeroBackgrounds([]);
    } finally {
      setHeroBackgroundsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn && tab === 'hero-backgrounds') loadHeroBackgrounds();
  }, [loggedIn, tab, loadHeroBackgrounds]);

  const loadContactSubmissions = useCallback(async () => {
    setContactSubmissionsLoading(true);
    setContactSubmissionsError('');
    try {
      const res = await fetch(API_BASE + '/api/contact-submissions', fetchOpts);
      if (!res.ok) throw new Error('Failed to load contact submissions');
      const data = await res.json();
      setContactSubmissions(Array.isArray(data) ? data : []);
    } catch (e) {
      setContactSubmissionsError(e.message || 'Failed to load');
      setContactSubmissions([]);
    } finally {
      setContactSubmissionsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn && tab === 'contact') loadContactSubmissions();
  }, [loggedIn, tab, loadContactSubmissions]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(API_BASE + '/api/auth/blog-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setLoggedIn(true);
        setEmail('');
        setPassword('');
      } else {
        setLoginError(data.error || 'Invalid email or password');
      }
    } catch (e) {
      setLoginError('Network error');
    }
  };

  const handleLogout = async () => {
    await fetch(API_BASE + '/api/auth/blog-logout', { method: 'POST', ...fetchOpts });
    setLoggedIn(false);
    setEditingId(null);
  };

  const openNew = () => {
    setEditingId('new');
    setForm({
      title: '',
      excerpt: '',
      author: '',
      date: '',
      category: '',
      readTime: '',
      image: '',
    });
  };

  const openEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title || '',
      excerpt: post.excerpt || '',
      author: post.author || '',
      date: post.date || '',
      category: post.category || '',
      readTime: post.readTime || '',
      image: post.image || '',
    });
  };

  const closeForm = () => {
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId === 'new') {
        const res = await fetch(API_BASE + '/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(form),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Create failed');
        setBlogs((prev) => [...prev, data]);
        closeForm();
      } else {
        const res = await fetch(API_BASE + '/api/blogs/' + editingId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(form),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Update failed');
        setBlogs((prev) => prev.map((b) => (b.id === data.id || String(b.id) === String(editingId) ? data : b)));
        closeForm();
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    setError('');
    try {
      const res = await fetch(API_BASE + '/api/blogs/' + id, {
        method: 'DELETE',
        ...fetchOpts,
      });
      if (!res.ok) throw new Error('Delete failed');
      setBlogs((prev) => prev.filter((b) => b.id !== id && String(b.id) !== String(id)));
      if (editingId === id) closeForm();
    } catch (e) {
      setError(e.message);
    }
  };

  // Highlights CRUD
  const openNewHighlight = () => {
    setEditingHighlightIndex('new');
    setHighlightForm({ image: '', tag: '', title: '', description: '', type: 'Article', link: '' });
  };
  const openEditHighlight = (panel, index) => {
    setEditingHighlightIndex(index);
    setHighlightForm({
      image: panel.image || '',
      tag: panel.tag || '',
      title: panel.title || '',
      description: panel.description || '',
      type: panel.type || 'Article',
      link: panel.link || '',
    });
  };
  const closeHighlightForm = () => setEditingHighlightIndex(null);
  const handleHighlightSubmit = async (e) => {
    e.preventDefault();
    setHighlightsError('');
    try {
      let next = [...highlights];
      const item = {
        image: highlightForm.image.trim(),
        tag: highlightForm.tag.trim(),
        title: highlightForm.title.trim(),
        description: highlightForm.description.trim(),
        type: highlightForm.type.trim() || 'Article',
        link: highlightForm.link.trim(),
      };
      if (editingHighlightIndex === 'new') {
        next.push(item);
      } else if (typeof editingHighlightIndex === 'number') {
        next[editingHighlightIndex] = item;
      }
      const res = await fetch(API_BASE + '/api/highlights', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(next),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data.error || data.message || (res.status === 401 ? 'Unauthorized. Please log in again.' : 'Save failed');
        throw new Error(msg);
      }
      setHighlights(Array.isArray(data) ? data : next);
      closeHighlightForm();
    } catch (e) {
      setHighlightsError(e.message);
    }
  };
  const handleHighlightDelete = async (index) => {
    if (!confirm('Remove this highlight card?')) return;
    setHighlightsError('');
    try {
      const next = highlights.filter((_, i) => i !== index);
      const res = await fetch(API_BASE + '/api/highlights', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(next),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data.error || data.message || (res.status === 401 ? 'Unauthorized. Please log in again.' : 'Delete failed');
        throw new Error(msg);
      }
      setHighlights(Array.isArray(data) ? data : next);
      if (editingHighlightIndex === index) closeHighlightForm();
    } catch (e) {
      setHighlightsError(e.message);
    }
  };

  // Testimonials CRUD
  const openNewTestimonial = () => {
    setEditingTestimonialIndex('new');
    setTestimonialForm({ name: '', role: '', company: '', logo: '', image: '', quote: '' });
  };
  const openEditTestimonial = (item, index) => {
    setEditingTestimonialIndex(index);
    setTestimonialForm({
      name: item.name || '',
      role: item.role || '',
      company: item.company || '',
      logo: item.logo || '',
      image: item.image || '',
      quote: item.quote || '',
    });
  };
  const closeTestimonialForm = () => setEditingTestimonialIndex(null);
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    setTestimonialsError('');
    try {
      let next = [...testimonials];
      const item = {
        name: testimonialForm.name.trim(),
        role: testimonialForm.role.trim(),
        company: testimonialForm.company.trim(),
        logo: testimonialForm.logo.trim(),
        image: testimonialForm.image.trim(),
        quote: testimonialForm.quote.trim(),
      };
      if (editingTestimonialIndex === 'new') next.push(item);
      else if (typeof editingTestimonialIndex === 'number') next[editingTestimonialIndex] = item;
      const res = await fetch(API_BASE + '/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(next),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data.error || data.message || (res.status === 401 ? 'Unauthorized. Please log in again.' : 'Save failed');
        throw new Error(msg);
      }
      setTestimonials(Array.isArray(data) ? data : next);
      closeTestimonialForm();
    } catch (e) {
      setTestimonialsError(e.message);
      if (e.message.includes('Unauthorized')) setLoggedIn(false);
    }
  };
  const handleTestimonialDelete = async (index) => {
    if (!confirm('Remove this testimonial?')) return;
    setTestimonialsError('');
    try {
      const next = testimonials.filter((_, i) => i !== index);
      const res = await fetch(API_BASE + '/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(next),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data.error || data.message || (res.status === 401 ? 'Unauthorized. Please log in again.' : 'Delete failed');
        throw new Error(msg);
      }
      setTestimonials(Array.isArray(data) ? data : next);
      if (editingTestimonialIndex === index) closeTestimonialForm();
    } catch (e) {
      setTestimonialsError(e.message);
      if (e.message.includes('Unauthorized')) setLoggedIn(false);
    }
  };

  // Hero backgrounds CRUD
  const openNewHeroBg = () => {
    setEditingHeroBgIndex('new');
    setHeroBgForm({ image_url: '' });
  };
  const openEditHeroBg = (url, index) => {
    setEditingHeroBgIndex(index);
    setHeroBgForm({ image_url: url || '' });
  };
  const closeHeroBgForm = () => setEditingHeroBgIndex(null);
  const handleHeroBgSubmit = async (e) => {
    e.preventDefault();
    setHeroBackgroundsError('');
    try {
      let next = [...heroBackgrounds];
      const url = heroBgForm.image_url.trim();
      if (!url) return;
      if (editingHeroBgIndex === 'new') next.push(url);
      else if (typeof editingHeroBgIndex === 'number') next[editingHeroBgIndex] = url;
      const res = await fetch(API_BASE + '/api/hero-backgrounds', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(next),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || data.message || 'Save failed');
      setHeroBackgrounds(Array.isArray(data) ? data : next);
      closeHeroBgForm();
    } catch (e) {
      setHeroBackgroundsError(e.message);
    }
  };
  const handleHeroBgDelete = async (index) => {
    if (!confirm('Remove this background image?')) return;
    setHeroBackgroundsError('');
    try {
      const next = heroBackgrounds.filter((_, i) => i !== index);
      const res = await fetch(API_BASE + '/api/hero-backgrounds', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(next),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || data.message || 'Delete failed');
      setHeroBackgrounds(Array.isArray(data) ? data : next);
      if (editingHeroBgIndex === index) closeHeroBgForm();
    } catch (e) {
      setHeroBackgroundsError(e.message);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h1 className="text-xl font-semibold text-slate-800 mb-2">Admin</h1>
          <p className="text-slate-500 text-sm mb-1">Sign in to manage blogs, highlights, testimonials, and hero images.</p>
          <p className="text-xs text-slate-400 mb-6">All content is stored in the database.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <p className="text-red-600 text-sm bg-red-50 rounded-lg py-2 px-3">{loginError}</p>
            )}
            <div>
              <label htmlFor="blog-email" className="block text-sm font-medium text-slate-600 mb-1">
                Email
              </label>
              <input
                type="email"
                id="blog-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@cachedigitech.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label htmlFor="blog-password" className="block text-sm font-medium text-slate-600 mb-1">
                Password
              </label>
              <input
                type="password"
                id="blog-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700"
            >
              Sign in
            </button>
          </form>
          <p className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/insights')}
              className="text-slate-500 text-sm hover:text-slate-700"
            >
              ← Back to Insights
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar: fixed so it stays in view and Logout stays at bottom of viewport */}
      <aside className="fixed left-0 top-0 bottom-0 w-52 z-30 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <h1 className="text-lg font-semibold text-slate-800">Admin</h1>
          <p className="text-xs text-slate-500 mt-1">Content from database</p>
        </div>
        <nav className="p-2 flex flex-col gap-0.5">
          <button
            type="button"
            onClick={() => setTab('blogs')}
            className={`text-left px-3 py-2.5 text-sm rounded-lg font-medium transition-colors ${tab === 'blogs' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Blogs
          </button>
          <button
            type="button"
            onClick={() => setTab('highlights')}
            className={`text-left px-3 py-2.5 text-sm rounded-lg font-medium transition-colors ${tab === 'highlights' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Latest Highlights
          </button>
          <button
            type="button"
            onClick={() => setTab('testimonials')}
            className={`text-left px-3 py-2.5 text-sm rounded-lg font-medium transition-colors ${tab === 'testimonials' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Testimonials
          </button>
          <button
            type="button"
            onClick={() => setTab('hero-backgrounds')}
            className={`text-left px-3 py-2.5 text-sm rounded-lg font-medium transition-colors ${tab === 'hero-backgrounds' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Hero backgrounds
          </button>
          <button
            type="button"
            onClick={() => setTab('contact')}
            className={`text-left px-3 py-2.5 text-sm rounded-lg font-medium transition-colors ${tab === 'contact' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Contact submissions
          </button>
        </nav>
        <div className="mt-auto p-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-sm px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content: offset by sidebar width */}
      <div className="flex-1 flex flex-col min-w-0 ml-52">
        <header className="bg-white border-b border-slate-200 shrink-0 flex items-center justify-end gap-3 px-4 py-3 shadow-sm">
          {tab === 'blogs' && (
            <button
              type="button"
              onClick={openNew}
              className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 font-medium"
            >
              Create new blog
            </button>
          )}
          {tab === 'highlights' && (
            <button
              type="button"
              onClick={openNewHighlight}
              className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 font-medium"
            >
              Add highlight
            </button>
          )}
          {tab === 'testimonials' && (
            <button
              type="button"
              onClick={openNewTestimonial}
              className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 font-medium"
            >
              Add testimonial
            </button>
          )}
          {tab === 'hero-backgrounds' && (
            <button
              type="button"
              onClick={openNewHeroBg}
              className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 font-medium"
            >
              Add image
            </button>
          )}
          {tab === 'contact' && (
            <span className="text-sm text-slate-500">Read-only — stored in database</span>
          )}
      </header>

        <main className="flex-1 p-4 md:p-6 max-w-4xl w-full mx-auto">
        {(tab === 'blogs' ? error : tab === 'highlights' ? highlightsError : tab === 'testimonials' ? testimonialsError : tab === 'hero-backgrounds' ? heroBackgroundsError : contactSubmissionsError) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {tab === 'blogs' ? error : tab === 'highlights' ? highlightsError : tab === 'testimonials' ? testimonialsError : tab === 'hero-backgrounds' ? heroBackgroundsError : contactSubmissionsError}
          </div>
        )}

        {tab === 'highlights' && editingHighlightIndex !== null && (
          <div className="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              {editingHighlightIndex === 'new' ? 'Add highlight card' : 'Edit highlight card'}
            </h2>
            <form onSubmit={handleHighlightSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Image URL *</label>
                <input
                  type="text"
                  value={highlightForm.image}
                  onChange={(e) => setHighlightForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Tag</label>
                <input
                  type="text"
                  value={highlightForm.tag}
                  onChange={(e) => setHighlightForm((f) => ({ ...f, tag: e.target.value }))}
                  placeholder="e.g. AI and GenAI"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Title *</label>
                <input
                  type="text"
                  value={highlightForm.title}
                  onChange={(e) => setHighlightForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Card title"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
                <textarea
                  value={highlightForm.description}
                  onChange={(e) => setHighlightForm((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                  placeholder="Optional subtitle"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Type</label>
                <input
                  type="text"
                  value={highlightForm.type}
                  onChange={(e) => setHighlightForm((f) => ({ ...f, type: e.target.value }))}
                  placeholder="e.g. Article"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Link (YouTube, LinkedIn, etc.)</label>
                <input
                  type="url"
                  value={highlightForm.link}
                  onChange={(e) => setHighlightForm((f) => ({ ...f, link: e.target.value }))}
                  placeholder="https://youtube.com/... or https://linkedin.com/..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
                <p className="mt-1 text-xs text-slate-500">Card will open this URL when clicked. Leave empty for no link.</p>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700">
                  {editingHighlightIndex === 'new' ? 'Add' : 'Save'}
                </button>
                <button type="button" onClick={closeHighlightForm} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {tab === 'highlights' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 font-medium text-slate-700">
              Latest Highlights ({highlights.length}) — from database
            </div>
            {highlightsLoading ? (
              <div className="p-8 text-center text-slate-500">Loading...</div>
            ) : highlights.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-slate-500 mb-1">No highlight cards yet. They appear in the scroll gallery on the home page.</p>
                <p className="text-xs text-slate-400 mb-4">Stored in database. Changes appear on the site immediately.</p>
                <button type="button" onClick={openNewHighlight} className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700">
                  Add first card
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {highlights.map((panel, index) => (
                  <li key={index} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-800 truncate">{panel.title || 'Untitled'}</p>
                      <p className="text-sm text-slate-500">{panel.tag && `${panel.tag} · `}{panel.type}</p>
                    </div>
                    <div className="flex gap-2 ml-4 shrink-0">
                      <button type="button" onClick={() => openEditHighlight(panel, index)} className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100">
                        Edit
                      </button>
                      <button type="button" onClick={() => handleHighlightDelete(index)} className="text-sm px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'testimonials' && editingTestimonialIndex !== null && (
          <div className="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              {editingTestimonialIndex === 'new' ? 'Add testimonial' : 'Edit testimonial'}
            </h2>
            <form onSubmit={handleTestimonialSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Name *</label>
                <input
                  type="text"
                  value={testimonialForm.name}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Role</label>
                <input
                  type="text"
                  value={testimonialForm.role}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, role: e.target.value }))}
                  placeholder="e.g. Global CTO"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Company</label>
                <input
                  type="text"
                  value={testimonialForm.company}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, company: e.target.value }))}
                  placeholder="e.g. Leading Telecom Provider"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Logo URL</label>
                <input
                  type="text"
                  value={testimonialForm.logo}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, logo: e.target.value }))}
                  placeholder="/Partners/cisco.png or full URL"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Image URL</label>
                <input
                  type="text"
                  value={testimonialForm.image}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Quote *</label>
                <textarea
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, quote: e.target.value }))}
                  rows={4}
                  placeholder="Client quote"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700">
                  {editingTestimonialIndex === 'new' ? 'Add' : 'Save'}
                </button>
                <button type="button" onClick={closeTestimonialForm} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {tab === 'testimonials' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 font-medium text-slate-700">
              Testimonials ({testimonials.length}) — from database
            </div>
            {testimonialsLoading ? (
              <div className="p-8 text-center text-slate-500">Loading...</div>
            ) : testimonials.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-slate-500 mb-1">No testimonials yet. They appear in the &quot;Hear from Our Clients&quot; section on the home page.</p>
                <p className="text-xs text-slate-400 mb-4">Stored in database. Changes appear on the site immediately.</p>
                <button type="button" onClick={openNewTestimonial} className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700">
                  Add first testimonial
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {testimonials.map((item, index) => (
                  <li key={index} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-800 truncate">{item.name || 'Unnamed'}</p>
                      <p className="text-sm text-slate-500">{item.role && `${item.role} · `}{item.company || '—'}</p>
                    </div>
                    <div className="flex gap-2 ml-4 shrink-0">
                      <button type="button" onClick={() => openEditTestimonial(item, index)} className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100">
                        Edit
                      </button>
                      <button type="button" onClick={() => handleTestimonialDelete(index)} className="text-sm px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'hero-backgrounds' && editingHeroBgIndex !== null && (
          <div className="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              {editingHeroBgIndex === 'new' ? 'Add hero background image' : 'Edit image URL'}
            </h2>
            <form onSubmit={handleHeroBgSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Image URL *</label>
                <input
                  type="url"
                  value={heroBgForm.image_url}
                  onChange={(e) => setHeroBgForm((f) => ({ ...f, image_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">Used in the hero section carousel on the home page. Order is by list position.</p>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700">
                  {editingHeroBgIndex === 'new' ? 'Add' : 'Save'}
                </button>
                <button type="button" onClick={closeHeroBgForm} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {tab === 'hero-backgrounds' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 font-medium text-slate-700">
              Hero background images ({heroBackgrounds.length}) — from database
            </div>
            {heroBackgroundsLoading ? (
              <div className="p-8 text-center text-slate-500">Loading...</div>
            ) : heroBackgrounds.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-slate-500 mb-1">No images yet. They appear as the rotating carousel behind the hero on the home page.</p>
                <p className="text-xs text-slate-400 mb-4">Stored in database. Changes appear on the site immediately.</p>
                <button type="button" onClick={openNewHeroBg} className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700">
                  Add first image
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {heroBackgrounds.map((url, index) => (
                  <li key={index} className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50">
                    <div className="w-20 h-12 rounded-lg bg-slate-200 shrink-0 overflow-hidden">
                      <img src={url} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-700 truncate" title={url}>{url}</p>
                      <p className="text-xs text-slate-500">Order: {index + 1}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button type="button" onClick={() => openEditHeroBg(url, index)} className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100">
                        Edit
                      </button>
                      <button type="button" onClick={() => handleHeroBgDelete(index)} className="text-sm px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'contact' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 font-medium text-slate-700">
              Contact form submissions ({contactSubmissions.length}) — from database, read-only
            </div>
            {contactSubmissionsLoading ? (
              <div className="p-8 text-center text-slate-500">Loading from database...</div>
            ) : contactSubmissions.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-slate-500">No contact submissions yet. Submissions from the contact page are stored in the database and will appear here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {contactSubmissions.map((sub) => (
                  <li key={sub.id} className="px-4 py-4 hover:bg-slate-50/50">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <span className="font-semibold text-slate-800">{sub.name}</span>
                      <span className="text-sm text-slate-500">
                        {sub.created_at ? new Date(sub.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">
                      <span className="text-slate-500">Email:</span> {sub.email}
                      {sub.phone ? <span className="ml-3 text-slate-500">Phone:</span> : ''}
                      {sub.phone ? <span className="ml-1">{sub.phone}</span> : ''}
                    </p>
                    <p className="text-sm font-medium text-slate-700 mt-2">Subject: {sub.subject}</p>
                    <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{sub.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'blogs' && editingId && (
          <div className="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              {editingId === 'new' ? 'Create new blog' : 'Edit blog post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Date</label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    placeholder="e.g. March 15, 2025"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Read time</label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
                    placeholder="e.g. 5 min read"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="/blog/image.jpg or full URL"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700"
                >
                  {editingId === 'new' ? 'Create' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {tab === 'blogs' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 font-medium text-slate-700">
            Blog posts ({blogs.length}) — from database
          </div>
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-500 mb-1">No blog posts yet.</p>
              <p className="text-xs text-slate-400 mb-4">Stored in database. Changes appear on the site immediately.</p>
              <button
                type="button"
                onClick={openNew}
                className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700"
              >
                Create new blog
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {blogs.map((post) => (
                <li key={post.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800 truncate">{post.title}</p>
                    <p className="text-sm text-slate-500">
                      {post.author && `${post.author} · `}
                      {post.date}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEdit(post)}
                      className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="text-sm px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        )}
      </main>
      </div>
    </div>
  );
}
