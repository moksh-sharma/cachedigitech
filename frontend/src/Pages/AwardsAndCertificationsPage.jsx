import React from "react";
import AwardsSection from "../components/AboutPageComponent/ImageSlider";
import Certifications from "../components/AboutPageComponent/Certifications";

/**
 * Single page combining Awards & Accolades (slider) and Certifications (grid).
 * Linked as "Awards & Certifications" in navbar and footer.
 */
export default function AwardsAndCertificationsPage() {
  return (
    <>
      <AwardsSection />
      <Certifications sectionOnly />
    </>
  );
}
