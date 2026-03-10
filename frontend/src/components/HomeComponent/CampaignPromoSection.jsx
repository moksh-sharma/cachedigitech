import React from "react";
import { Link } from "react-router-dom";
import { usePlacement } from "../../context/PlacementsContext";
import { ArrowRight } from "lucide-react";

export default function CampaignPromoSection() {
  const bannerImageUrl = usePlacement("home", "banner", "image") || "/banner2.jpeg";

  return (
    <section className="w-full pt-6 pb-6 sm:pt-8 sm:pb-8 bg-white" aria-labelledby="campaign-promo-heading">
      <Link
        to="/campaigns"
        className="block w-full rounded-none overflow-hidden border-0 border-y border-gray-200/80 bg-white hover:border-red-100 transition-all duration-300 group relative"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-start gap-0 relative">
          <div className="w-full md:min-w-0 md:flex-2 md:mr-[260px] lg:mr-[280px] overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={bannerImageUrl}
              alt="Current promotion"
              className="block w-full h-auto max-h-[240px] sm:max-h-[280px] md:max-h-none object-contain"
            />
          </div>
          <div className="flex-1 flex items-center justify-between gap-4 p-4 sm:p-5 min-w-0 md:max-w-[260px] lg:max-w-[280px] shrink-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-[260px] lg:w-[280px] md:h-full overflow-visible">
            <div className="min-w-0 flex-1">
              <h2 id="campaign-promo-heading" className="text-lg sm:text-xl font-semibold text-(--apple-black) group-hover:text-red-600 transition-colors break-words">
                Explore offers and solutions
              </h2>
            </div>
            <span className="shrink-0 flex items-center gap-1 text-sm font-medium text-red-600 group-hover:gap-2 transition-all">
              View <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
