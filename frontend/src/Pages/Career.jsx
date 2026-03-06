// src/pages/Careers.jsx
import { Briefcase, Shield, Network, Server, AlertTriangle, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { usePlacement } from '../context/PlacementsContext';
const jobs = [
    {
        title: 'Inside Sales Executive',
        location: 'India | New Delhi',
        business: 'Technology',
        icon: Briefcase,
    },
    {
        title: 'Security Engineer',
        location: 'India | New Delhi',
        business: 'Technology',
        icon: Shield,
    },
    {
        title: 'Networking Engineer',
        location: 'India | New Delhi',
        business: 'Technology',
        icon: Network,
    },
    {
        title: 'IT Infrastructure Engineer',
        location: 'India | New Delhi',
        business: 'Technology',
        icon: Server,
    },
    {
        title: 'MIM',
        location: 'India | New Delhi',
        business: 'Technology',
        icon: AlertTriangle,
    },
    {
        title: 'Business Development Manager',
        location: 'India | New Delhi',
        business: 'Technology',
        icon: TrendingUp,
    },
];



export default function Careers() {
     const heroImageUrl = usePlacement('careers', 'main', 'heroImage') || '/oppportunites.jpg';

     useEffect(() => {
        window.scrollTo(0, 0); // scroll to top when page loads
      }, []);
    

    return (
        <div className="min-h-screen bg-white font-black w-full ">
            <section className="py-16 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">

                <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative top-8 mb-4">
                    {/* Left: Text Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl  text-black mb-4">
                            Explore New Opportunities
                        </h2>
                        <p className="text-gray-700 text-lg mb-2">
                            Years from now you will be more disappointed by the things you didn’t do than by the ones you did.
                        </p>
                        <p className="text-gray-700 text-lg mb-6">
                            Move away from fear, choose the right path to your career.
                        </p>
                        <p className="text-2xl font-bold text-red-500">
                            Explore. Dream. Discover.
                        </p>
                    </div>
                    {/* Right: Image */}
                    <div className="flex justify-center">
                        <img
                            src={heroImageUrl}
                            alt="Opportunities Illustration"
                            className="w-full max-w-md rounded-xl shadow-lg"
                        />
                    </div>
                </div>

                <h1 className='w-full h-0.5 bg-red-600 mt-8'></h1>

                <div className='font-glacial'>
                    <div className="text-center mb-12 mt-10">
                        <h1 className="text-4xl font-extrabold text-black mb-2">Latest Jobs</h1>
                        <p className="text-lg text-black font-medium">At Cache, we combine human ingenuity with breakthrough technology and foster innovation for an inclusive workplace.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {jobs.map(({ title, location, business, icon: Icon }) => (
                            <div key={title} className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-start transition-shadow hover:shadow-xl">
                                <Icon color="#B91C1C" size={36} className="mr-4" />
                                <div>
                                    <h2 className="text-xl font-bold text-red-700">{title}</h2>
                                    <p className="text-sm text-red-600 font-semibold">{location}</p>
                                    <p className="text-xs text-gray-600">Business Area: {business}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
