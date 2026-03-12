import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

// No backend: form opens default email client (mailto).
const CONTACT_EMAIL = 'contact@cachedigitech.com';
const initialFormState = { name: '', email: '', phone: '', subject: '', message: '' };

const ContactUsPage = () => {
  const location = useLocation();
  const [form, setForm] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    const subject = encodeURIComponent(form.subject || 'Contact from website');
    const body = encodeURIComponent(
      [form.name && `Name: ${form.name}`, form.email && `Email: ${form.email}`, form.phone && `Phone: ${form.phone}`, form.message && `Message:\n${form.message}`].filter(Boolean).join('\n\n')
    );
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setForm(initialFormState);
    setSubmitted(true);
    setSubmitting(false);
  };

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8" id="contact-main">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Contact Us</h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our team. We're here to help you with any questions or concerns.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <section className="bg-white rounded-2xl shadow-lg p-8 lg:p-10" aria-labelledby="get-in-touch-heading">
              <h2 id="get-in-touch-heading" className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600" aria-hidden>
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Email</p>
                    <a href="mailto:info@cachedigitech.com" className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded">
                      info@cachedigitech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600" aria-hidden>
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Phone</p>
                    <a href="tel:+18003094333" className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded">
                      +1 (800) 309-4333
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600" aria-hidden>
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Delhi Office</p>
                    <p className="text-gray-600 leading-relaxed">
                      CRC2 Building Cache Digitech Sultanpur, Delhi 110030
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600" aria-hidden>
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Mumbai Office</p>
                    <p className="text-gray-600 leading-relaxed">
                      404, C-Wing, Eastern Court Junction, Tejapal & Parleshwar Road, Vile Parle East, Mumbai, Maharashtra, India (400057)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600" aria-hidden>
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Dubai Office</p>
                    <p className="text-gray-600 leading-relaxed">
                      Compass building - Al Hulaila, AL Hulaila Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Form */}
            <section className="bg-white rounded-2xl shadow-lg p-8 lg:p-10" aria-labelledby="form-heading">
              <h2 id="form-heading" className="text-2xl font-bold text-gray-900 mb-2">Send a message</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you shortly.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center" role="status" aria-live="polite">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10 text-red-600" aria-hidden />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message sent</h3>
                  <p className="text-gray-600 max-w-sm mb-6">
                    Thank you for reaching out. We'll respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-red-600 font-medium hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded px-3 py-1.5"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 "
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Subject <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-y min-h-[120px]"
                    />
                  </div>
                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2" role="alert">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 disabled:bg-red-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  >
                    {submitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;