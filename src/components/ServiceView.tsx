import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ServiceType, SERVICES } from '@/types';
import LoadingAnimation from './LoadingAnimation';

interface ServiceViewProps {
  service: ServiceType;
  onBack: () => void;
}

export default function ServiceView({ service, onBack }: ServiceViewProps) {
  const serviceInfo = SERVICES[service];
  const Icon = Icons[serviceInfo.icon as keyof typeof Icons];

  return (
    <div className="min-h-screen bg-black/90">
      {/* Geri Butonu */}
      <motion.button
        onClick={onBack}
        className="fixed top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 z-50 group"
        whileHover={{ x: -5 }}
      >
        <motion.div
          className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"
          whileHover={{ rotate: -180 }}
          transition={{ duration: 0.3 }}
        >
          <Icons.ArrowLeft className="w-5 h-5" />
        </motion.div>
        <span className="font-medium">Geri Dön</span>
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 pt-24">
        {/* Başlık Bölümü */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          {/* Arka Plan Efekti */}
          <motion.div 
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <motion.div
              className={`absolute inset-0 opacity-20 bg-gradient-to-br ${serviceInfo.bgGradient} blur-3xl`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>

          {/* İkon Animasyonu */}
          <motion.div 
            className="relative inline-block mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div 
              className={`p-6 rounded-2xl bg-gradient-to-br ${serviceInfo.bgGradient}`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-2xl"
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

          {/* Başlık ve Açıklama */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${serviceInfo.bgGradient}`}>
              {serviceInfo.title}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {serviceInfo.description}
          </motion.p>
        </motion.div>

        {/* Animasyon Bölümü */}
        <LoadingAnimation service={service} />
      </div>
    </div>
  );
}