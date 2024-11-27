import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import ContactInfo from '../ContactInfo';

export default function DesignDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContacts, setShowContacts] = useState(false);

  const steps = [
    { label: 'Eskiz hazırlanıyor...', color: '#60A5FA' },
    { label: 'Çizim yapılıyor...', color: '#818CF8' },
    { label: 'Detaylar ekleniyor...', color: '#A78BFA' },
    { label: 'Logo tamamlanıyor...', color: '#C084FC' }
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000); // 2000ms -> 1000ms
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowContacts(true), 500); // 1000ms -> 500ms
    }
  }, [currentStep]);

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div className="bg-[#2D2D2D] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-gray-400">design_workspace.ai</div>
      </div>

      <div className="p-6">
        {/* Çizim Alanı */}
        <div className="relative h-[400px] bg-black/30 rounded-lg mb-8">
          {/* Kalem İmleci */}
          <motion.div
            className="absolute w-8 h-8 -mt-4 -ml-4 pointer-events-none z-10"
            initial={{ x: 100, y: 50 }}
            animate={[
              // E harfi
              { x: 100, y: 50 },
              { x: 100, y: 150 },
              { x: 100, y: 50 },
              { x: 160, y: 50 },
              { x: 100, y: 100 },
              { x: 140, y: 100 },
              { x: 100, y: 150 },
              { x: 160, y: 150 },
              // M harfi
              { x: 180, y: 50 },
              { x: 180, y: 150 },
              { x: 220, y: 100 },
              { x: 260, y: 150 },
              { x: 260, y: 50 },
              // C harfi
              { x: 340, y: 50 },
              { x: 280, y: 50 },
              { x: 280, y: 150 },
              { x: 340, y: 150 }
            ]}
            transition={{
              duration: 4, // 8s -> 4s
              times: [0, 0.1, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 1],
              ease: "easeInOut"
            }}
          >
            <Icons.Pen className="text-blue-400 w-full h-full" />
          </motion.div>

          {/* Logo SVG */}
          <svg
            viewBox="0 0 400 200"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' }}
          >
            <motion.path
              d="M 100 50 L 100 150 M 100 50 L 160 50 M 100 100 L 140 100 M 100 150 L 160 150"
              stroke="#60A5FA"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: currentStep >= 1 ? 1 : 0 }}
              transition={{ duration: 1 }} // 2s -> 1s
            />
            <motion.path
              d="M 180 50 L 180 150 L 220 100 L 260 150 L 260 50"
              stroke="#818CF8"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: currentStep >= 2 ? 1 : 0 }}
              transition={{ duration: 1 }} // 2s -> 1s
            />
            <motion.path
              d="M 340 50 C 280 50, 280 150, 340 150"
              stroke="#A78BFA"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: currentStep >= 3 ? 1 : 0 }}
              transition={{ duration: 1 }} // 2s -> 1s
            />
          </svg>
        </div>

        {/* Log Mesajları */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <motion.div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isActive ? 'bg-blue-500/20 text-blue-400' :
                  isComplete ? 'bg-green-500/20 text-green-400' :
                  'bg-gray-800/50 text-gray-400'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {isComplete ? (
                  <Icons.Check className="w-5 h-5 text-green-500" />
                ) : isActive ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }} // 2s -> 1s
                  >
                    <Icons.Loader2 className="w-5 h-5 text-blue-500" />
                  </motion.div>
                ) : (
                  <Icons.Circle className="w-5 h-5" />
                )}
                <span>{step.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* İletişim Bilgileri */}
        {showContacts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <ContactInfo />
          </motion.div>
        )}
      </div>
    </div>
  );
}