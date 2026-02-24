// Removed motion and custom UI imports to prevent module load errors
import { usePlacement } from "../../context/PlacementsContext";

export function CEOSection() {
  const ceoImageUrl = usePlacement('about', 'leadership', 'ceoImage') || '/team/prarthna.jpg';
  return (
    <section className="py-16 lg:py-24 bg-white scroll-mt-20" id="LeadershipVision" aria-labelledby="ceo-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
              <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent mb-2 tracking-wide">
                Prarthana Gupta
              </h3>
              <div className="space-y-1 mb-6">
                <p className="text-red-600">Founder & Chairperson, Cache Digitech Pvt. Ltd.</p>
                <p className="text-red-600">Managing Director, Calipers Consulting Pvt. Ltd.</p>
                <p className="text-red-600">Founder, CIO Digital Foundation (CIDIF)</p>
              </div>

              <div className="border-l-4 border-red-600 pl-6 mb-8">
                <p className="text-xl italic text-gray-700">
                  "When you lead with purpose, innovation finds its direction."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">34+</div>
                  <div className="text-sm text-gray-600">Years Journey</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">Global</div>
                  <div className="text-sm text-gray-600">Technology Partner</div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-gray-50 rounded-lg border-l-4 border-red-600">
                <p className="text-center italic text-gray-800">
                  "Rooted in values and driven by innovation where technology built on trust transforms lives with purpose and empathy."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Block 2 and Block 3 */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Block 2: Journey and Foundation */}
          <div className="space-y-4">
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h4 className="text-xl font-bold text-red-600 mb-4 border-b border-gray-200 pb-2">The Beginning</h4>
              <div className="space-y-4 text-gray-700">
                <p>
                  When I began this journey more than three decades ago, I didn't have a large team or endless resources just a deep conviction to create something meaningful, built on values, hard work, and trust. That conviction gave birth to Cache Digitech Pvt. Ltd., which has today evolved into a trusted global technology partner empowering organizations across the world.
                </p>

                <p>
                  From day one, our attitude has been simple yet unwavering always put the customer first. Every milestone we've achieved is the result of relentless effort, sleepless nights, and a firm belief that trust must be earned, not claimed.
                </p>

                <p>
                  Today, as we see that trust growing with customers placing their confidence in us year after year it fills me with both pride and gratitude. It reaffirms that when you lead with honesty, consistency, and care, success becomes a shared journey.
                </p>
              </div>
            </div>
          </div>

          {/* Block 3: Vision and Mission */}
          <div className="space-y-4">
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