import { motion } from 'motion/react';
import { Star, Users, TrendingUp, Shield } from 'lucide-react';

export function Clients() {
  const clientStats = [
    {
      icon: Users,
      number: '500+',
      label: 'Active Clients',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Star,
      number: '98%',
      label: 'Client Satisfaction',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      number: '15+',
      label: 'Years Experience',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      number: '24/7',
      label: 'Support Available',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const clientTestimonials = [
    {
      name: 'Rajesh Kumar',
      position: 'CTO, TechCorp India',
      company: 'Leading IT Services',
      testimonial: 'Cache Digitech transformed our entire IT infrastructure. Their expertise in system integration is unmatched.',
      rating: 5,
      avatar: 'RK'
    },
    {
      name: 'Priya Sharma',
      position: 'VP Technology, FinanceFirst',
      company: 'Banking Solutions',
      testimonial: 'Outstanding service delivery and deep understanding of BFSI requirements. Highly recommended!',
      rating: 5,
      avatar: 'PS'
    },
    {
      name: 'Michael Chen',
      position: 'Director, GlobalManufacturing',
      company: 'Manufacturing Giant',
      testimonial: 'Their Industry 4.0 solutions revolutionized our production processes. Excellent technical support.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Sarah Williams',
      position: 'Head of IT, HealthcarePlus',
      company: 'Healthcare Network',
      testimonial: 'Cache Digitech delivered secure, compliant healthcare solutions that exceeded our expectations.',
      rating: 5,
      avatar: 'SW'
    }
  ];

  const clientCategories = [
    {
      category: 'Enterprise Clients',
      description: 'Fortune 500 companies across various industries',
      count: '150+',
      color: 'bg-gradient-to-r from-red-500 to-red-600'
    },
    {
      category: 'Mid-Market Companies',
      description: 'Growing businesses seeking digital transformation',
      count: '250+',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      category: 'Government Agencies',
      description: 'Public sector digital modernization projects',
      count: '75+',
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      category: 'Startups & SMEs',
      description: 'Innovative companies building scalable solutions',
      count: '125+',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    }
  ];

  return (
    <section id="clients" className="py-20 bg-gray-50">
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
            Our <span className="text-red-600">Clients</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by organizations worldwide to deliver innovative technology solutions that drive business success.
          </p>
        </motion.div>

        {/* Client Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {clientStats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <IconComponent className="text-white" size={28} />
                </motion.div>
                
                <motion.h3
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  {stat.number}
                </motion.h3>
                
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Client Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Client <span className="text-red-600">Portfolio</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <span className="text-white font-bold text-xl">{category.count}</span>
                </div>
                
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {category.category}
                </h4>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Client <span className="text-red-600">Testimonials</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {clientTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                    >
                      <Star className="text-yellow-400 fill-current" size={20} />
                    </motion.div>
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>
                
                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.position}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}