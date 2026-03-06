import { motion } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router-dom";
import { usePlacement } from "../../context/PlacementsContext";

export function HeroSection() {
  const heroImageUrl = usePlacement('insights', 'hero', 'image') || '/blog/insight.jpg';
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <ImageWithFallback
        src={heroImageUrl}
        alt="Modern Technology Building"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-red-600">Cache</span> Digitech
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Leading System Integrator & Digital Innovation Partner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Explore Our Insight Page
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white hover:bg-white hover:text-black rounded-lg transition-colors"
            >
              <Link
                to="/contactus"
              // className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-colors duration-200 inline-block"
              >
                Contact Us
              </Link>

            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}