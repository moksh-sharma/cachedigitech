import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function NewsletterPage() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    // <div className="w-full">
    //   {/* ===== Hero Section ===== */}
    //   <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
    //     {/* Dark Overlay */}
    //     <div className="absolute inset-0 bg-black/30"></div>
        
    //     {/* Content */}
    //     <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 text-white z-20">
    //       <h1 className="text-5xl font-bold mb-6">Newsletter</h1>
    //       <p className="max-w-2xl text-lg mb-8">
    //         Stay informed with the latest technology trends, industry insights, and Cache Digitech updates delivered directly to your inbox.
    //       </p>
    //     </div>
    //   </div>

    //   {/* ===== Newsletter Subscription Section ===== */}
    //   <div className="py-20 px-8 md:px-20 bg-white">
    //     <div className="max-w-4xl mx-auto text-center">
    //       <h2 className="text-4xl font-bold mb-6 text-gray-800">Subscribe to Our Newsletter</h2>
    //       <p className="text-xl text-gray-600 mb-12">
    //         Get weekly insights on digital transformation, technology trends, and exclusive content from our experts.
    //       </p>
          
    //       <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
    //         <div className="flex flex-col sm:flex-row gap-4">
    //           <input
    //             type="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             placeholder="Enter your email address"
    //             className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
    //             required
    //           />
    //           <button
    //             type="submit"
    //             className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
    //           >
    //             Subscribe
    //           </button>
    //         </div>
    //         {subscribed && (
    //           <div className="mt-4 text-green-600 font-medium">
    //             Thank you for subscribing! Check your email for confirmation.
    //           </div>
    //         )}
    //       </form>
    //     </div>
    //   </div>

    //   {/* ===== Recent Newsletters Section ===== */}
    //   <div className="py-20 px-8 md:px-20 bg-gray-50">
    //     <div className="max-w-6xl mx-auto">
    //       <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Recent Newsletters</h2>
          
    //       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    //         {/* Newsletter 1 */}
    //         <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    //           <div className="bg-teal-600 h-2"></div>
    //           <div className="p-6">
    //             <div className="text-sm text-gray-500 mb-2">March 2024</div>
    //             <h3 className="text-xl font-bold mb-3 text-gray-800">AI Revolution in Business</h3>
    //             <p className="text-gray-600 mb-4">
    //               Discover how artificial intelligence is transforming industries and what it means for your business strategy.
    //             </p>
    //             <button className="text-teal-600 hover:text-teal-700 font-medium">
    //               Read More →
    //             </button>
    //           </div>
    //         </div>

    //         {/* Newsletter 2 */}
    //         <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    //           <div className="bg-blue-600 h-2"></div>
    //           <div className="p-6">
    //             <div className="text-sm text-gray-500 mb-2">February 2024</div>
    //             <h3 className="text-xl font-bold mb-3 text-gray-800">Cybersecurity Best Practices</h3>
    //             <p className="text-gray-600 mb-4">
    //               Essential security measures every organization should implement to protect against modern threats.
    //             </p>
    //             <button className="text-blue-600 hover:text-blue-700 font-medium">
    //               Read More →
    //             </button>
    //           </div>
    //         </div>

    //         {/* Newsletter 3 */}
    //         <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    //           <div className="bg-purple-600 h-2"></div>
    //           <div className="p-6">
    //             <div className="text-sm text-gray-500 mb-2">January 2024</div>
    //             <h3 className="text-xl font-bold mb-3 text-gray-800">Cloud Migration Success Stories</h3>
    //             <p className="text-gray-600 mb-4">
    //               Real-world examples of successful cloud migrations and the benefits they delivered to businesses.
    //             </p>
    //             <button className="text-purple-600 hover:text-purple-700 font-medium">
    //               Read More →
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* ===== Newsletter Archive Section ===== */}
    //   <div className="py-20 px-8 md:px-20 bg-white">
    //     <div className="max-w-4xl mx-auto">
    //       <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Newsletter Archive</h2>
          
    //       <div className="space-y-6">
    //         <div className="border-l-4 border-teal-600 pl-6 py-4">
    //           <div className="flex justify-between items-start">
    //             <div>
    //               <h3 className="text-lg font-semibold text-gray-800">December 2023 - Year in Review</h3>
    //               <p className="text-gray-600">A comprehensive look at the technology trends that shaped 2023.</p>
    //             </div>
    //             <button className="text-teal-600 hover:text-teal-700 font-medium whitespace-nowrap ml-4">
    //               View →
    //             </button>
    //           </div>
    //         </div>

    //         <div className="border-l-4 border-blue-600 pl-6 py-4">
    //           <div className="flex justify-between items-start">
    //             <div>
    //               <h3 className="text-lg font-semibold text-gray-800">November 2023 - Digital Transformation Guide</h3>
    //               <p className="text-gray-600">Step-by-step guide to successful digital transformation initiatives.</p>
    //             </div>
    //             <button className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap ml-4">
    //               View →
    //             </button>
    //           </div>
    //         </div>

    //         <div className="border-l-4 border-purple-600 pl-6 py-4">
    //           <div className="flex justify-between items-start">
    //             <div>
    //               <h3 className="text-lg font-semibold text-gray-800">October 2023 - Infrastructure Modernization</h3>
    //               <p className="text-gray-600">How to modernize your IT infrastructure for better performance and security.</p>
    //             </div>
    //             <button className="text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap ml-4">
    //               View →
    //             </button>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="text-center mt-12">
    //         <button className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-8 rounded-lg font-semibold transition-colors">
    //           View All Archives
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* ===== CTA Section ===== */}
    //   {/* <div className="py-20 px-8 md:px-20 bg-gradient-to-r from-teal-600 to-cyan-600">
    //     <div className="max-w-4xl mx-auto text-center text-white">
    //       <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
    //       <p className="text-xl mb-8">
    //         Join thousands of professionals who trust Cache Digitech for the latest technology insights and industry updates.
    //       </p>
    //       <div className="flex justify-center space-x-4">
    //         <button className="bg-white text-teal-600 hover:bg-gray-100 py-3 px-6 rounded-lg font-semibold transition-colors">
    //           Follow on LinkedIn
    //         </button>
    //         <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 py-3 px-6 rounded-lg font-semibold transition-colors">
    //           Contact Us
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

export default NewsletterPage;