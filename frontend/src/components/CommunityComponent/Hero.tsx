import { motion } from 'motion/react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const achievements = [
    'Leading System Integrator',
    '500+ Successful Projects',
    '24/7 Technical Support',
    'ISO Certified Solutions'
  ];

  return (
    <section id="home" className="relative min-h-screen pt-16 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium"
              >
                Premier System Integrator
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
              >
                Cache
                <span className="text-red-600"> Digitech</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                Empowering businesses across industries with cutting-edge technology solutions. 
                We integrate, innovate, and transform your digital landscape.
              </motion.p>
            </div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="text-red-600 flex-shrink-0" size={20} />
                  <span className="text-gray-700 text-sm">{achievement}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Explore Solutions</span>
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
              className="relative z-10"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623715537863-7b1441e0e2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NzI1MTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Cache Digitech Office"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                x: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-red-600 rounded-xl opacity-80"
            />
            
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                x: [0, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-900 rounded-lg opacity-60"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}