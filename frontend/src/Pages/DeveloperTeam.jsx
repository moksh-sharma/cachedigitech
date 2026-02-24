import React from 'react';
import { useEffect } from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const DeveloperTeam = () => {

   useEffect(() => {
      window.scrollTo(0, 0); // scroll to top when page loads
    }, []);
  

  const developers = [
    {
      id: 1,
      name: "Anil Kumar",
      role: "FUll Stack Developer",
      photo: "/Developer/anil1.jpg",
      linkedin: "https://linkedin.com/in/anil-kumar85",
      github: "https://github.com/anil29717",
      email: "anilkumar.gugm@gmail.com",
      skills: ["MongoDb", "ReactJs", "Cloud GCP"]
    },
    
    {
      id: 3,
      name: "Devender Singh",
      role: "Full Stack & DevOps Engineer",
      photo: "/Developer/devender.jpg",
      linkedin: "https://linkedin.com/in/davidkim",
      github: "https://github.com/davidkim",
      email: "david@company.com",
      skills: ["ReactJs Vite", "AWS", "Azure"]
    },
    
    {
      id: 4,
      name: "Rishabh ",
      role: "Lead Full-Stack Developer",
      photo: "/Developer/rishabh.JPG",
      linkedin: "#",
      github: "#",
      email: "#",
      skills: ["React", "Node.js", "TypeScript"]
    },
    {
      id: 5,
      name: "Vanshdeep",
      role: "Full Stack & AI Developer",
      photo: "/Developer/vanshdeep.jpg",
      linkedin: "https://linkedin.com/in/michaelchen",
      github: "https://github.com/michaelchen",
      email: "michael@company.com",
      skills: ["Vue.js", "Tailwind", "JavaScript"]
    },
    {
      id: 6,
      name: "Kritika Verma",
      role: "Frontend Developer",
      photo: "/Developer/kritika3.jpg",
      linkedin: "https://linkedin.com/in/jessicathompson",
      github: "https://github.com/jessicathompson",
      email: "jessica@company.com",
      skills: ["React Js", "Tailwind Css", "Wordpress"]
    }, 
    {
      id: 2,
      name: "Aman Raj",
      role: "Cloud & DevOps Engineer",
      photo: "/Developer/Aman.jpg",
      linkedin: "https://www.linkedin.com/in/aman-raj-34252526a",
      github: "https://github.com/amangithub2003",
      email: "amanrajdss1516@gmail.com",
      skills: ["AWS", "Docker", "Swift"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-6 relative">
            Our Developer Team
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet the talented individuals behind our innovative web solutions. 
            Our diverse team of developers brings expertise in cutting-edge technologies 
            to deliver exceptional digital experiences.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((dev) => (
            <div 
              key={dev.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-red-100 hover:border-red-200"
            >
              {/* Profile Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={dev.photo} 
                  alt={dev.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Social Links Overlay */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-8 group-hover:translate-x-0">
                  <a 
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/90 hover:bg-red-600 hover:text-white p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <Linkedin size={18} />
                  </a>
                  {/* <a 
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/90 hover:bg-red-600 hover:text-white p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <Github size={18} />
                  </a> */}
                  <a 
                    href={`mailto:${dev.email}`}
                    className="bg-white/90 hover:bg-red-600 hover:text-white p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-200">
                  {dev.name}
                </h3>
                <p className="text-red-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                  {dev.role}
                </p>
                
                {/* Skills */}
                {/* <div className="flex flex-wrap gap-2 mb-4">
                  {dev.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium hover:bg-red-200 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div> */}

                {/* Contact Links */}
                <div className="flex space-x-4 pt-4 border-t border-gray-100">
                  <a 
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                  >
                    <Linkedin size={20} />
                  </a>
                  {/* <a 
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                  >
                    <Github size={20} />
                  </a> */}
                  <a 
                    href={`mailto:${dev.email}`}
                    className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to work with us?
            </h3>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              We're always looking for talented developers to join our team. 
              If you're passionate about creating amazing web experiences, we'd love to hear from you.
            </p>
            <button className="bg-white text-red-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Join Our Team
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DeveloperTeam;