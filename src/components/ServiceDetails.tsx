import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceType, SERVICE_INFO } from '@/types';
import { useState } from 'react';

interface ServiceDetailsProps {
  service: ServiceType;
  onBack: () => void;
}

export default function ServiceDetails({ service, onBack }: ServiceDetailsProps) {
  const [showDemo, setShowDemo] = useState(false);
  const serviceInfo = SERVICE_INFO[service];
  const Icon = Icons[serviceInfo.icon as keyof typeof Icons];

  return (
    <div className="min-h-screen bg-black/90 p-8">
      <motion.button
        onClick={onBack}
        className="fixed top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2"
        whileHover={{ x: -5 }}
      >
        <Icons.ArrowLeft className="w-5 h-5" />
        Back
      </motion.button>

      <div className="max-w-6xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-block p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">{serviceInfo.title}</h1>
          <p className="text-xl text-gray-400">{serviceInfo.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Button
            size="lg"
            className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            onClick={() => setShowDemo(true)}
          >
            <Icons.PlayCircle className="mr-2 h-5 w-5" />
            View Demo
          </Button>
        </motion.div>

        {showDemo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-lg overflow-hidden shadow-2xl"
          >
            {service === 'bot' && (
              <div className="bg-black p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                  />
                  <div className="text-blue-500 font-mono">Initializing Facebook Account Creator Bot...</div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { step: 'Loading browser instance...', progress: 100 },
                    { step: 'Navigating to registration page...', progress: 80 },
                    { step: 'Filling form data...', progress: 60 },
                    { step: 'Handling captcha verification...', progress: 30 },
                    { step: 'Creating account...', progress: 10 }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.5 }}
                    >
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">{item.step}</span>
                        <span className="text-blue-400">{item.progress}%</span>
                      </div>
                      <motion.div
                        className="h-2 bg-gray-800 rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.5, delay: index * 0.5 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          initial={{ width: '0%' }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 2, delay: index * 0.5 }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {[
            { icon: 'Mail', label: 'Email', value: 'contact@devcraft.com' },
            { icon: 'MessageCircle', label: 'Discord', value: '@devcraft' },
            { icon: 'Phone', label: 'Phone', value: '+1 (555) 123-4567' }
          ].map(({ icon, label, value }) => {
            const ContactIcon = Icons[icon as keyof typeof Icons];
            return (
              <motion.div
                key={label}
                className="bg-gray-900/50 p-6 rounded-lg border border-gray-800"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gray-800">
                    <ContactIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}