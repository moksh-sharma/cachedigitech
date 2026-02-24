import { motion } from 'motion/react';
import { Award, Globe, Handshake, Target } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Partners() {
  const partnerLogos = [
    { name: 'Microsoft', logo: 'MS' },
    { name: 'Amazon AWS', logo: 'AWS' },
    { name: 'Google Cloud', logo: 'GCP' },
    { name: 'Oracle', logo: 'ORC' },
    { name: 'SAP', logo: 'SAP' },
    { name: 'IBM', logo: 'IBM' },
    { name: 'Cisco', logo: 'CSC' },
    { name: 'VMware', logo: 'VM' },
    { name: 'Dell', logo: 'DELL' },
    { name: 'HPE', logo: 'HPE' },
    { name: 'Salesforce', logo: 'SF' },
    { name: 'Adobe', logo: 'ADB' }
  ];

  const partnershipBenefits = [
    {
      icon: Award,
      title: 'Certified Excellence',
      description: 'Gold and platinum partnerships with leading technology vendors',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access to worldwide resources and latest technology innovations',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Handshake,
      title: 'Strategic Alliances',
      description: 'Deep partnerships enabling comprehensive solution delivery',
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: Target,
      title: 'Focused Solutions',
      description: 'Industry-specific solutions through specialized partnerships',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-red-600">Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strategic partnerships with industry leaders enable us to deliver world-class solutions and maintain technological excellence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Partnership Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Partnership <span className="text-red-600">Benefits</span>
            </h3>
            
            {partnershipBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <IconComponent className="text-white" size={24} />
                  </motion.div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Partnership Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBhcnRuZXJzaGlwJTIwaGFuZHNoYWtlfGVufDF8fHx8MTc1NzI5NjU5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Business Partnership"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Partner Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-12">
            Trusted by Industry Leaders
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {partnerLogos.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:from-red-50 group-hover:to-red-100">
                  <span className="font-bold text-gray-700 group-hover:text-red-600 text-sm">
                    {partner.logo}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {partner.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}