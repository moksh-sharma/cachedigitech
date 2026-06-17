import CampaignPromoSection from "./CampaignPromoSection";
import CoreOfferingsSection from "../AboutPageComponent/CoreOfferingsSection";
import ProfileHighlightSections from "../AboutPageComponent/ProfileHighlightSections";

export default function WhoWeArePage() {
  return (
    <div className="bg-white">
      <CampaignPromoSection />
      <CoreOfferingsSection />
      <ProfileHighlightSections />
    </div>
  );
}
