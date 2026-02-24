import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  ArrowUp
} from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@cachedigitech.com',
      link: 'mailto:info@cachedigitech.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Mumbai, Maharashtra, India',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-blue-400' },
    { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:text-blue-700' },
    { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:text-pink-600' }
  ];

  const quickLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Industry Solutions', href: '#industries' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' }
  ];

  const services = [
    { label: 'System Integration', href: '#' },
    { label: 'Cloud Solutions', href: '#' },
    { label: 'Digital Transformation', href: '#' },
    { label: 'Consulting Services', href: '#' },
    { label: 'Support & Maintenance', href: '#' }
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-gray-900" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Cache Digitech</h3>
                  <p className="text-gray-400 text-sm">System Integrator</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Leading system integrator delivering innovative technology solutions 
                across diverse industries. Transforming businesses through digital excellence.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.2, y: -2 }}
                      className={`w-10 h-10 ${social.label === 'LinkedIn' ? '' : 'bg-gray-800 hover:bg-gray-700'} rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200`}
                    >
                       {social.label === 'LinkedIn' ? (
                         <img
                           src="/linkedin-transparent.png"
                           onError={(e) => {
                             e.currentTarget.onerror = null;
                             e.currentTarget.src = '/linkedin.png';
                           }}
                           alt="LinkedIn"
                           className="w-5 h-5"
                         />
                       ) : (
                         <IconComponent size={18} />
                       )}
                     </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <a
                      href={service.href}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {service.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-bold text-lg mb-6">Contact Us</h4>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  
                  return (
                    <motion.a
                      key={contact.label}
                      href={contact.link}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 text-gray-400 hover:text-red-400 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors duration-200">
                        <IconComponent size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{contact.label}</p>
                        <p className="text-xs">{contact.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-gray-400 text-sm mb-4 md:mb-0"
              >
                © 2024 Cache Digitech. All rights reserved. | Privacy Policy | Terms of Service
              </motion.p>

              {/* Scroll to Top Button */}
              <motion.button
                onClick={scrollToTop}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors duration-200 shadow-lg"
              >
                <ArrowUp size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}