import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Go back"
          data-testid="button-back"
        >
          <span className="text-xl" aria-hidden>←</span> Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact</h1>
        <p className="text-lg text-gray-600 mb-8">
          For inquiries and support, please use our main contact form.
        </p>
        <Link
          to="/contactus"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
        >
          Go to Contact Us
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}