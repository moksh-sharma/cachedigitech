// Removed motion and custom UI imports to prevent module load errors
import { usePlacement } from "../../context/PlacementsContext";

export function CEOSection() {
  const ceoImageUrl = usePlacement('about', 'leadership', 'ceoImage') || '/team/prarthna.jpg';
  return (
    <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-white scroll-mt-20" id="LeadershipVision" aria-labelledby="ceo-heading">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 id="ceo-heading" className="text-4xl md:text-5xl font-bold text-black mb-4">
            Founder's<span className="text-red-600"> Message</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto" aria-hidden />
        </div>

        {/* Top Section: Image and Block 1 */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <div className="overflow-hidden shadow-2xl rounded-xl">
              <img
                src={ceoImageUrl}
                alt="Prarthana Gupta - Chief Executive Officer"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Block 1: Basic Info and Quote */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold text-black mb-2 tracking-wide">
                Prarthana Gupta
              </h1>
              <div className="space-y-1 mb-6">
                <p className="text-red-600 text-sm">Founder & Chairperson, Cache Digitech Pvt. Ltd.</p>
                <p className="text-red-600 text-sm">Managing Director, Calipers Consulting Pvt. Ltd.</p>
                <p className="text-red-600 text-sm">Founder, CIO Digital Foundation (CIDIF)</p>
              </div>

              <div className="border-l-4 border-red-600 pl-6 mb-8">
                <p className="text-xl italic text-gray-700">
                  "When you lead with purpose, innovation finds its direction."
                </p>
              </div>

              <div className="max-w-md font-sans mb-8">
                <h3 className="text-xl sm:text-2xl font-bold font-glacial leading-tight text-black">
                  Growth is Guaranteed
                </h3>
                <p className="text-base sm:text-lg mt-1 font-holiday text-gray-700">
                  That&apos;s Cache&apos;s Promise
                </p>
                <img className="h-3 sm:h-4 mt-2 invert mix-blend-multiply" alt="" src="/footerline.png" aria-hidden />
              </div>

              <div className="mt-6 p-6 bg-linear-to-r from-red-50 to-gray-50 rounded-lg border-l-4 border-red-600">
                <p className="text-center italic text-gray-800">
                  "Rooted in values and driven by innovation where technology built on trust transforms lives with purpose and empathy."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Image and Vision & Purpose — image height matches right div (right sets height) */}
        <div className="relative grid lg:grid-cols-2 lg:gap-12">
          {/* Image: absolute so row height comes from right column only; image matches that height */}
          <div className="rounded-lg overflow-hidden w-full lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-[calc(50%-1.5rem)]">
            <img
              src="/leadership-booth.png"
              alt="Cache Digitech team at exhibition booth with CACHE Endeavouring Perfection and DELL Technologies branding, Women Owned"
              className="block w-full h-full min-h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Block 3: Vision and Mission — in flow in column 2 so it sets row height; image matches this */}
          <div className="space-y-4 lg:col-start-2">
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h4 className="text-xl font-bold text-red-600 mb-4 border-b border-gray-200 pb-2">Vision & Purpose</h4>
              <div className="space-y-4 text-gray-700">
                <p>
                  At Cache, we continue to innovate across Cybersecurity, Artificial Intelligence, Cloud, and IT Infrastructure, helping businesses stay secure, agile, and future-ready. Yet, beyond technology, what defines us is our belief that innovation must serve people it must inspire, include, and uplift.
                </p>

                <p>
                  Through CIDIF (CIO Digital Foundation), I've extended that vision to empower young minds, bridging the gap between aspiration and opportunity, and preparing the next generation of digital leaders.
                </p>

                <p>
                  For me, technology is not just a business it's a responsibility. A responsibility to use knowledge, empathy, and creativity to make the world a more connected, secure, and compassionate place.
                </p>

                <p>
                  Every step we take at Cache reflects this purpose. And as we move forward, one thing will never change our promise to keep our customers first, always.
                </p>

                <div className="text-right mt-6 border-t border-gray-200 pt-4">
                  <p className="italic font-bold text-gray-600">Prarthana Gupta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}