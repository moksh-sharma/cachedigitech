import React from "react";
import { Link } from "react-router-dom";
import { usePlacement } from "../../context/PlacementsContext";
import { ArrowRight } from "lucide-react";

export default function CampaignPromoSection() {
  const bannerImageUrl = usePlacement("home", "banner", "image") || "/banner2.jpeg";

  return (
    <section className="section-container pt-4 pb-6 sm:pt-6 sm:pb-8 bg-[#fafafa]" aria-labelledby="campaign-promo-heading">
      <Link
        to="/campaigns"
        className="block max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-200/80 bg-white shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 group relative"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-0 sm:gap-0 relative">
          <div className="w-full sm:min-w-0 sm:flex-2 sm:mr-[260px] overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={bannerImageUrl}
              alt="Current promotion"
              className="block w-full h-auto max-h-[280px] sm:max-h-none object-contain group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          <div className="flex-1 flex items-center justify-between gap-4 p-4 sm:p-5 min-w-0 sm:max-w-[260px] shrink-0 sm:absolute sm:top-0 sm:right-0 sm:bottom-0 sm:w-[260px] sm:h-full">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-(--apple-black) group-hover:text-red-600 transition-colors">
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
