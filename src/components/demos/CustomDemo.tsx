import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import ContactInfo from '../ContactInfo';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CustomDemo() {
  const [showContacts, setShowContacts] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const steps = [
    { label: '🔍 Sistem taranıyor...', progress: 0 },
    { label: '🔑 Erişim sağlanıyor...', progress: 25 },
    { label: '📡 Veri analizi yapılıyor...', progress: 50 },
    { label: '⚡ Optimizasyon başlatıldı...', progress: 75 },
    { label: '✨ İşlem tamamlanıyor...', progress: 100 }
  ];

  const code = [
    'sudo nmap -sS -sV -O target',
    'ssh-keygen -t rsa -b 4096',
    'openssl enc -aes-256-cbc -salt',
    'tcpdump -i any -w capture.pcap',
    'python3 analyzer.py --deep',
    './optimize --all --force'
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowContacts(true), 500);
    }
  }, [currentStep]);

  const handleSubmit = () => {
    console.log('Form data:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const features = [
    { icon: Icons.Zap, title: 'Hızlı Teslimat', description: '7/24 Destek' },
    { icon: Icons.Shield, title: 'Güvenli Altyapı', description: 'SSL Korumalı' },
    { icon: Icons.Award, title: 'Kalite Garantisi', description: 'Memnuniyet Odaklı' }
  ];

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div className="bg-[#2D2D2D] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-gray-400">terminal_session.sh</div>
      </div>

      <div className="p-6 space-y-6">
        {/* Terminal Output */}
        <div className="font-mono text-sm bg-black/50 rounded-lg p-4 h-[300px] overflow-hidden">
          {code.slice(0, currentStep + 1).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="text-green-500">$</span>
              <span className="text-gray-300">{line}</span>
            </motion.div>
          ))}

          {/* Random Code Matrix Effect */}
          <div className="mt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.25,
                  delay: i * 0.05,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="text-green-500/50"
              >
                {Array.from({ length: 50 }).map(() => 
                  String.fromCharCode(33 + Math.floor(Math.random() * 94))
                ).join('')}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  {isComplete ? (
                    <Icons.CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                    >
                      <Icons.Loader2 className="w-4 h-4 text-blue-500" />
                    </motion.div>
                  ) : (
                    <Icons.Circle className="w-4 h-4 text-gray-500" />
                  )}
                  <span className={`text-sm ${
                    isActive ? 'text-blue-400' :
                    isComplete ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>

                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                    initial={{ width: '0%' }}
                    animate={{ width: isComplete ? '100%' : isActive ? '100%' : '0%' }}
                    transition={{ duration: isActive ? 0.5 : 0 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid */}
        {showContacts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-xl bg-black/20 p-6 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Icon className="w-8 h-8 mb-4 text-blue-500" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Quote Button and Form */}
        {showContacts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <Dialog>
              <DialogTrigger asChild>
                <motion.button
                  className="group relative px-8 py-6 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Parlama Efekti */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                  </motion.div>

                  {/* İçerik */}
                  <div className="relative flex items-center gap-3 text-lg font-medium text-white">
                    <Icons.Sparkles className="w-6 h-6" />
                    <span>Özel Teklif Al</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Icons.ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-[#1E1E1E] border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold mb-4">Proje Detayları</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-black/30 border-gray-700 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-black/30 border-gray-700 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-black/30 border-gray-700 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Projenizi Anlatın</Label>
                    <Textarea
                      id="message"
                      placeholder="Projenizin detaylarını buraya yazabilirsiniz..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="h-40 bg-black/30 border-gray-700 focus:border-blue-500"
                    />
                  </div>
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-6 text-lg"
                  >
                    <Icons.Send className="w-5 h-5 mr-2" />
                    Gönder
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <ContactInfo />
          </motion.div>
        )}
      </div>
    </div>
  );
}