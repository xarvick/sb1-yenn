import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ServiceType, SERVICES } from '@/types';
import { cn } from '@/lib/utils';
import MouseTrail from './MouseTrail';
import ContactInfo from './ContactInfo';
import Quote from './Quote';

interface HomeProps {
  onServiceSelect: (service: ServiceType) => void;
}

export default function Home({ onServiceSelect }: HomeProps) {
  const mainServices = ['website', 'indicator', 'bot', 'mobile', 'design', 'ads'] as ServiceType[];
  const customService = 'custom' as ServiceType;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <MouseTrail />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        {/* Logo ve Başlık */}
        <motion.div 
          className="relative inline-block mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Arka Plan Efekti */}
          <motion.div
            className="absolute -inset-10 rounded-full opacity-30 blur-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* EMC Digital Yazısı */}
          <motion.h1 
            className="text-7xl md:text-8xl font-bold relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
              EMC Digital
            </span>
            
            {/* Dekoratif Çizgi */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </motion.h1>
        </motion.div>

        {/* Slogan */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 font-light"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Dijital Dünyada
            <span className="relative mx-2">
              <span className="relative z-10 font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Profesyonel
              </span>
              <motion.span
                className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </span>
            Çözümler
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full relative z-10 mb-6">
        {mainServices.map((key, index) => {
          const service = SERVICES[key];
          const IconComponent = Icons[service.icon] as React.FC<{ className?: string }>;
          return (
            <motion.button
              key={key}
              onClick={() => onServiceSelect(key)}
              className={cn(
                "group relative p-8 rounded-xl bg-black/20 border border-white/10",
                "hover:border-white/20 transition-all duration-300",
                "flex flex-col items-center text-center"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                "bg-gradient-to-br",
                service.bgGradient
              )} />
              
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20",
                  "transition-opacity duration-300 blur-xl",
                  "bg-gradient-to-br",
                  service.bgGradient
                )}
              />
              
              <motion.div
                className="relative mb-6 p-6 rounded-full bg-black/30 border border-white/10"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <IconComponent className="w-10 h-10" />
              </motion.div>
              
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>

              <motion.div
                className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Icons.ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Custom Solutions */}
      <motion.button
        onClick={() => onServiceSelect(customService)}
        className={cn(
          "group relative p-8 rounded-xl bg-black/20 border border-white/10",
          "hover:border-white/20 transition-all duration-300",
          "flex flex-col items-center text-center w-full max-w-7xl mb-16"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
          "bg-gradient-to-br",
          SERVICES[customService].bgGradient
        )} />
        
        <motion.div
          className="relative mb-6 p-6 rounded-full bg-black/30 border border-white/10"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Icons.Sparkles className="w-10 h-10" />
        </motion.div>
        
        <h3 className="text-xl font-semibold mb-3">{SERVICES[customService].title}</h3>
        <p className="text-gray-400 text-sm">{SERVICES[customService].description}</p>

        <motion.div
          className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Icons.ArrowRight className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center space-y-8 max-w-7xl w-full"
      >
        <ContactInfo />
      </motion.div>

      {/* Quote Section */}
      <Quote />
    </div>
  );
}