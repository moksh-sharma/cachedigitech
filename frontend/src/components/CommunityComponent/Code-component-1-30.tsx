import { motion } from 'motion/react';
import { 
  Building2, 
  Car, 
  Factory, 
  ShoppingCart, 
  Network, 
  Heart, 
  Pill, 
  Plane, 
  Store, 
  Tv, 
  Monitor 
} from 'lucide-react';
import { useState } from 'react';

export function IndustryVerticals() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const industries = [
    {
      name: 'BFSI',
      fullName: 'Banking, Financial Services & Insurance',
      icon: Building2,
      description: 'Digital transformation solutions for secure financial operations',
      color: 'from-blue-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1709573360368-f53739b241f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwZmluYW5jZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU3MzMwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Automotive',
      fullName: 'Automotive Industry',
      icon: Car,
      description: 'Smart manufacturing and IoT solutions for modern vehicles',
      color: 'from-red-500 to-red-600',
      image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NTcyNTc5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Manufacturing',
      fullName: 'Manufacturing & Industrial',
      icon: Factory,
      description: 'Industry 4.0 solutions for optimized production processes',
      color: 'from-gray-500 to-gray-600',
      image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NTcyNTc5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'FMCG',
      fullName: 'Fast Moving Consumer Goods',
      icon: ShoppingCart,
      description: 'Supply chain optimization and retail technology solutions',
      color: 'from-green-500 to-green-600',
      image: 'https://images.unsplash.com/photo-1623715537863-7b1441e0e2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NzI1MTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Conglomerate',
      fullName: 'Multi-Industry Conglomerates',
      icon: Network,
      description: 'Integrated solutions for diverse business portfolios',
      color: 'from-purple-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1623715537863-7b1441e0e2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NzI1MTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Healthcare',
      fullName: 'Healthcare & Medical',
      icon: Heart,
      description: 'Digital health solutions and medical system integration',
      color: 'from-red-400 to-pink-500',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTczMTI1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Pharma',
      fullName: 'Pharmaceutical',
      icon: Pill,
      description: 'Compliance-focused solutions for pharmaceutical operations',
      color: 'from-teal-500 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTczMTI1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Aviation',
      fullName: 'Aviation & Aerospace',
      icon: Plane,
      description: 'Mission-critical systems for aviation industry',
      color: 'from-indigo-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1623715537863-7b1441e0e2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NzI1MTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Retailing',
      fullName: 'Retail & E-commerce',
      icon: Store,
      description: 'Omnichannel retail solutions and customer experience platforms',
      color: 'from-orange-500 to-red-500',
      image: 'https://images.unsplash.com/photo-1623715537863-7b1441e0e2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NzI1MTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Media & Entertainment',
      fullName: 'Media & Entertainment',
      icon: Tv,
      description: 'Content management and digital media distribution solutions',
      color: 'from-pink-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1623715537863-7b1441e0e2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NzI1MTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'IT',
      fullName: 'Information Technology',
      icon: Monitor,
      description: 'Enterprise IT infrastructure and cloud transformation services',
      color: 'from-slate-500 to-gray-600',
      image: 'https://images.unsplash.com/photo-1623715537863-7b1441e0e2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NzI1MTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <section id="industries" className="py-20 bg-gray-50">
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
            Industry <span className="text-red-600">Verticals</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We serve diverse industries with tailored technology solutions that drive digital transformation and operational excellence.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Background Image */}
                <div className="h-48 overflow-hidden">
                  <motion.div
                    animate={{ scale: hoveredCard === index ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${industry.image})` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-t ${industry.color} opacity-80`} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.div
                    animate={{ 
                      rotate: hoveredCard === index ? 360 : 0,
                      scale: hoveredCard === index ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto"
                  >
                    <IconComponent className="text-white" size={24} />
                  </motion.div>

                  <h3 className="font-bold text-gray-900 text-center mb-2">
                    {industry.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 text-center mb-3">
                    {industry.fullName}
                  </p>

                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredCard === index ? 1 : 0, 
                      height: hoveredCard === index ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-xs text-gray-600 text-center leading-relaxed overflow-hidden"
                  >
                    {industry.description}
                  </motion.p>
                </div>

                {/* Hover Indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredCard === index ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-1 bg-red-600"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}