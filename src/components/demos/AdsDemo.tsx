import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import ContactInfo from '../ContactInfo';

export default function AdsDemo() {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [showContacts, setShowContacts] = useState(false);

  const metrics = [
    { 
      icon: Icons.Target, 
      label: 'Hedef Kitle Erişimi', 
      value: '2.5M+',
      change: '+15%',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Icons.MousePointerClick, 
      label: 'Tıklama Oranı', 
      value: '4.8%',
      change: '+0.6%',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: Icons.TrendingUp, 
      label: 'Dönüşüm Oranı', 
      value: '12.3%',
      change: '+2.1%',
      color: 'from-purple-500 to-violet-500'
    },
    { 
      icon: Icons.DollarSign, 
      label: 'Yatırım Getirisi', 
      value: '320%',
      change: '+45%',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      icon: Icons.BarChart2, 
      label: 'Etkileşim Oranı', 
      value: '18.7%',
      change: '+3.2%',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      icon: Icons.Users, 
      label: 'Hedef Kitle Büyümesi', 
      value: '85K',
      change: '+12K',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  useEffect(() => {
    if (currentMetric < metrics.length) {
      const timer = setTimeout(() => {
        setCurrentMetric(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowContacts(true), 1000);
    }
  }, [currentMetric]);

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div className="bg-[#2D2D2D] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-gray-400">analytics_dashboard.js</div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const isVisible = index <= currentMetric;

            return (
              <motion.div
                key={index}
                className="relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5`} />
                  
                  {/* Icon */}
                  <motion.div
                    className="mb-4"
                    animate={isVisible ? {
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <Icon className={`w-8 h-8 bg-gradient-to-br ${metric.color} rounded-lg p-1.5`} />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-gray-400 text-sm">{metric.label}</h3>
                    <div className="flex items-end gap-2">
                      <motion.div
                        className="text-3xl font-bold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {metric.value}
                      </motion.div>
                      <motion.div
                        className="text-green-400 text-sm mb-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {metric.change}
                      </motion.div>
                    </div>
                  </div>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
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