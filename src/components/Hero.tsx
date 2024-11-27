import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ServiceType, SERVICE_INFO } from '@/types';
import MouseTrail from './MouseTrail';

interface HeroProps {
  onSelect: (service: ServiceType) => void;
}

export default function Hero({ onSelect }: HeroProps) {
  const services = Object.entries(SERVICE_INFO) as [ServiceType, typeof SERVICE_INFO[ServiceType]][];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <MouseTrail />
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0))',
              'linear-gradient(to left, rgba(0,0,0,0.2), rgba(0,0,0,0))',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24 relative z-10 px-4"
      >
        <motion.div
          className="relative inline-block"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Digital Artisan
          </motion.h1>
          <motion.div
            className="absolute -inset-4 rounded-xl opacity-50 blur-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Crafting Digital Excellence
        </motion.p>
      </motion.div>

      {/* Service Icons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 px-4 w-full max-w-7xl relative z-10">
        {services.map(([key, service], index) => {
          const IconComponent = Icons[service.icon] as React.FC<{ className?: string }>;
          return (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onSelect(key)}
              className="group cursor-pointer perspective-1000"
            >
              <motion.div 
                className="relative flex flex-col items-center transform-gpu transition-all duration-500 group-hover:rotate-y-180"
              >
                {/* Neon Glow Effect */}
                <div className={`absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-r ${service.bgGradient}`} />
                
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="relative mb-6 p-6 rounded-full bg-black/50 border border-white/10 group-hover:border-white/20 transition-all duration-500 shadow-xl"
                >
                  <IconComponent className="w-12 h-12 md:w-16 md:h-16" />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        `0 0 20px rgba(255,255,255,0.2)`,
                        `0 0 40px rgba(255,255,255,0.4)`,
                        `0 0 20px rgba(255,255,255,0.2)`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2 relative z-10">{service.title}</h3>
                  <p className="text-gray-400 text-center relative z-10 text-sm md:text-base">{service.description}</p>
                </motion.div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}