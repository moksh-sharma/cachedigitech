import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { usePlacement } from "../../context/PlacementsContext";

export default function SanachalanIntroModal({ loading = false }: { loading?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const bannerImageUrl = usePlacement('home', 'banner', 'image') || '/banner2.jpeg';
  const [open, setOpen] = useState(false);
  const [closedForSession, setClosedForSession] = useState(false);
  // Animation handled via CSS keyframes
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-open after loader ends when user lands on homepage
  useEffect(() => {
    if (location.pathname === "/") {
      if (!closedForSession && !loading) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
      setClosedForSession(false); // reset when leaving home
    }
  }, [location.pathname, closedForSession, loading]);

  // No JS animation state needed

  // Close on click outside and Escape
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeForSession();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeForSession();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const closeForSession = () => {
    setClosedForSession(true);
    setOpen(false);
  };

  const handleImageClick = () => {
    navigate("/campaigns");
    closeForSession();
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed top-20 right-4 pb-[-30] md:right-0 left-4 sm:left-auto sm:right-6 z-[2500]">
      <div
        ref={containerRef}
        className="relative rounded-xl shadow-2xl w-full sm:w-[450px] md:h-auto animate-[slideFromRight_.4s_ease-out] box-border overflow-hidden cursor-pointer"
        onClick={handleImageClick}
      >
        <button
          aria-label="Close"
          className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 rounded-full w-7 h-7 flex items-center justify-center text-lg leading-none z-10 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            closeForSession();
          }}
        >
          ×
        </button>
        <img
          src={bannerImageUrl}
          alt="Campaign Banner"
          className="w-full h-auto object-contain rounded-xl"
          onClick={handleImageClick}
        />
      </div>
    </div>,
    document.body
  );
}