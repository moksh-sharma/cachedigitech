import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function OffersPage() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  

  useEffect(() => {
    // Check if there's a hash in the URL for section navigation
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the # symbol
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0); // scroll to top when page loads without hash
    }
  }, [location]);

  return (
    // <div className="w-full">
    //   {/* ===== Hero Section ===== */}
    //   <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-pink-900">
    //     {/* Dark Overlay */}
    //     <div className="absolute inset-0 bg-black/30"></div>
        
    //     {/* Content */}
    //     <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 text-white z-20">
    //       <h1 className="text-5xl font-bold mb-6">Special Offers</h1>
    //       <p className="max-w-2xl text-lg mb-8">
    //         Exclusive deals and limited-time offers on our premium technology services. Don't miss out on these incredible savings!
    //       </p>
    //     </div>
    //   </div>

    //   {/* ===== Featured Offers Section ===== */}
    //   <div className="py-20 px-8 md:px-20 bg-white">
    //     <div className="max-w-6xl mx-auto">
    //       <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured Offers</h2>
          
    //       <div className="grid lg:grid-cols-2 gap-12 mb-16">
    //         {/* Featured Offer 1 */}
    //         <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
    //           <div className="absolute top-4 right-4 bg-yellow-400 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
    //             LIMITED TIME
    //           </div>
    //           <h3 className="text-3xl font-bold mb-4">Complete Digital Overhaul</h3>
    //           <p className="text-lg mb-6 opacity-90">
    //             Transform your entire digital infrastructure with our comprehensive package including cloud migration, security setup, and ongoing support.
    //           </p>
    //           <div className="flex items-center mb-6">
    //             <span className="text-4xl font-bold">50% OFF</span>
    //             <span className="ml-4 text-lg opacity-75 line-through">$50,000</span>
    //             <span className="ml-2 text-2xl font-semibold">$25,000</span>
    //           </div>
    //           <button className="bg-white text-red-600 hover:bg-gray-100 py-3 px-8 rounded-lg font-semibold transition-colors">
    //             Claim Offer
    //           </button>
    //         </div>

    //         {/* Featured Offer 2 */}
    //         <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
    //           <div className="absolute top-4 right-4 bg-green-400 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
    //             NEW CLIENT
    //           </div>
    //           <h3 className="text-3xl font-bold mb-4">First Project Special</h3>
    //           <p className="text-lg mb-6 opacity-90">
    //             New to Cache Digitech? Get your first project at an unbeatable price with our welcome package for new clients.
    //           </p>
    //           <div className="flex items-center mb-6">
    //             <span className="text-4xl font-bold">40% OFF</span>
    //             <span className="ml-4 text-lg">+ Free Consultation</span>
    //           </div>
    //           <button className="bg-white text-blue-600 hover:bg-gray-100 py-3 px-8 rounded-lg font-semibold transition-colors">
    //             Get Started
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* ===== Service Offers Section ===== */}
    //   <div className="py-20 px-8 md:px-20 bg-gray-50">
    //     <div className="max-w-6xl mx-auto">
    //       <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Service-Specific Offers</h2>
          
    //       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    //         {/* Cloud Services Offer */}
    //         <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
    //           <div className="flex items-center justify-between mb-4">
    //             <h3 className="text-xl font-bold text-gray-800">Cloud Migration</h3>
    //             <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm font-medium">25% OFF</span>
    //           </div>
    //           <p className="text-gray-600 mb-4">
    //             Migrate your infrastructure to the cloud with our expert team. Includes planning, execution, and post-migration support.
    //           </p>
    //           <div className="text-2xl font-bold text-blue-600 mb-4">Starting at $7,500</div>
    //           <ul className="text-sm text-gray-600 mb-6 space-y-1">
    //             <li>✓ Free assessment</li>
    //             <li>✓ Zero downtime migration</li>
    //             <li>✓ 3 months free support</li>
    //           </ul>
    //           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
    //             Learn More
    //           </button>
    //         </div>

    //         {/* Cybersecurity Offer */}
    //         <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
    //           <div className="flex items-center justify-between mb-4">
    //             <h3 className="text-xl font-bold text-gray-800">Security Audit</h3>
    //             <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">FREE</span>
    //           </div>
    //           <p className="text-gray-600 mb-4">
    //             Comprehensive security assessment of your current infrastructure with detailed recommendations and action plan.
    //           </p>
    //           <div className="text-2xl font-bold text-red-600 mb-4">Complimentary</div>
    //           <ul className="text-sm text-gray-600 mb-6 space-y-1">
    //             <li>✓ Vulnerability assessment</li>
    //             <li>✓ Risk analysis report</li>
    //             <li>✓ Implementation roadmap</li>
    //           </ul>
    //           <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
    //             Schedule Audit
    //           </button>
    //         </div>

    //         {/* AI & Data Services Offer */}
    //         <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
    //           <div className="flex items-center justify-between mb-4">
    //             <h3 className="text-xl font-bold text-gray-800">AI Implementation</h3>
    //             <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm font-medium">30% OFF</span>
    //           </div>
    //           <p className="text-gray-600 mb-4">
    //             Implement AI solutions to automate processes and gain insights from your data with our specialized team.
    //           </p>
    //           <div className="text-2xl font-bold text-green-600 mb-4">Starting at $10,500</div>
    //           <ul className="text-sm text-gray-600 mb-6 space-y-1">
    //             <li>✓ Custom AI model development</li>
    //             <li>✓ Data pipeline setup</li>
    //             <li>✓ Training and documentation</li>
    //           </ul>
    //           <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
    //             Explore AI
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* ===== Limited Time Deals Section ===== */}
    //   <div className="py-20 px-8 md:px-20 bg-white">
    //     <div className="max-w-6xl mx-auto">
    //       <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Limited Time Deals</h2>
          
    //       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
    //         <div className="mb-6">
    //           <span className="bg-yellow-400 text-purple-600 px-4 py-2 rounded-full text-sm font-bold uppercase">
    //             Flash Sale - Ends Soon!
    //           </span>
    //         </div>
    //         <h3 className="text-3xl font-bold mb-4">Bundle Package Mega Deal</h3>
    //         <p className="text-xl mb-8 opacity-90">
    //           Get our complete technology stack including cloud services, security, AI implementation, and 12 months of support.
    //         </p>
    //         <div className="flex justify-center items-center mb-8">
    //           <span className="text-5xl font-bold">60% OFF</span>
    //           <div className="ml-8 text-left">
    //             <div className="text-lg opacity-75 line-through">Regular Price: $100,000</div>
    //             <div className="text-3xl font-bold">Special Price: $40,000</div>
    //           </div>
    //         </div>
    //         <div className="flex justify-center space-x-4">
    //           <button className="bg-white text-purple-600 hover:bg-gray-100 py-3 px-8 rounded-lg font-semibold transition-colors">
    //             Claim Deal Now
    //           </button>
    //           <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 py-3 px-8 rounded-lg font-semibold transition-colors">
    //             Learn More
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* ===== Terms and Conditions Section ===== */}
    //   <div className="py-12 px-8 md:px-20 bg-gray-100">
    //     <div className="max-w-4xl mx-auto">
    //       <h3 className="text-2xl font-bold mb-6 text-gray-800">Terms & Conditions</h3>
    //       <div className="text-sm text-gray-600 space-y-2">
    //         <p>• All offers are valid for new contracts signed before the expiration date.</p>
    //         <p>• Discounts cannot be combined with other promotional offers.</p>
    //         <p>• Minimum project value requirements may apply for certain offers.</p>
    //         <p>• Free services are subject to standard terms and conditions.</p>
    //         <p>• Cache Digitech reserves the right to modify or terminate offers at any time.</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* ===== CTA Section ===== */}
    //   {/* <div className="py-20 px-8 md:px-20 bg-gradient-to-r from-orange-600 to-red-600">
    //     <div className="max-w-4xl mx-auto text-center text-white">
    //       <h2 className="text-4xl font-bold mb-6">Ready to Save Big?</h2>
    //       <p className="text-xl mb-8">
    //         Don't let these amazing offers slip away. Contact our team today to discuss which package is right for your business.
    //       </p>
    //       <div className="flex justify-center space-x-4">
    //         <button className="bg-white text-orange-600 hover:bg-gray-100 py-3 px-8 rounded-lg font-semibold transition-colors">
    //           Contact Sales
    //         </button>
    //         <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 py-3 px-8 rounded-lg font-semibold transition-colors">
    //           Schedule Call
    //         </button>
    //       </div>
    //     </div>
    //   </div> */}
    // </div>
    <div className="min-h-screen bg-gradient-to-br bg-white flex items-center justify-center px-4">
      {/* Mystery Box */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative cursor-pointer transition-all duration-700 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="text-9xl hover:scale-110 transition-transform duration-300 animate-bounce">
          🎁
        </div>
        <p className="text-black text-xl mt-4 font-semibold">Click to reveal!</p>
      </div>

      {/* Coming Soon Text */}
      <div 
        className={`absolute transition-all duration-700 text-center ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        <div className="text-8xl mb-6 animate-bounce">
          🚀
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-black">
          Coming Soon..
        </h1>
        <button 
          onClick={() => setIsOpen(false)}
          className="mt-8 px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-black/90 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default OffersPage;