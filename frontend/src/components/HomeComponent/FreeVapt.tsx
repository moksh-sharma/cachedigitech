import React from "react";

interface HeaderProps {
  className?: string;
}

const FreeVapt: React.FC<HeaderProps> = ({ className = "" }) => {
  return (
    <div className={`w-full max-w-2xl mx-auto p-6 pb-16 ${className}`}>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-3xl px-6 py-6">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
          {/* Left Section - Cache Spotlight */}
          <div className="flex-shrink-0 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-light text-gray-800 tracking-wide">
              Cache Spotlight
            </h1>
          </div>

          {/* Center Section - AI & Data solutions */}
          <div className="flex-grow flex justify-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-wide">
              <span className="underline decoration-2 underline-offset-4">
                AI & Data solutions
              </span>
            </h2>
          </div>

          {/* Right Section - Free VAPT */}
          <div className="flex-shrink-0 text-center md:text-right">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 tracking-wide">
              <span className="underline decoration-2 underline-offset-4">
                Free VAPT
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeVapt;
