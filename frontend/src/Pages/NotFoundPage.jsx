import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* Animated 404 Image */}
      <div className="mb-8">
        <svg
          width="300"
          height="200"
          viewBox="0 0 300 200"
          className="animate-pulse"
        >
          <text
            x="150"
            y="100"
            fontSize="80"
            fontWeight="bold"
            fill="#333"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            404
          </text>
          <circle cx="80" cy="100" r="8" fill="#666" className="animate-bounce" />
          <circle cx="220" cy="100" r="8" fill="#666" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
        </svg>
      </div>

      {/* Text Content */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h1>
      
      <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Simple Link */}
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      >
        Go back to home
      </a>
    </div>
  );
}