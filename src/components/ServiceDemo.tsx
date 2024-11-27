import { motion } from 'framer-motion';
import { ServiceType } from '@/types';
import WebDevDemo from './demos/WebDevDemo';
import TradingDemo from './demos/TradingDemo';
import BotDemo from './demos/BotDemo';
import CustomDemo from './demos/CustomDemo';

interface ServiceDemoProps {
  service: ServiceType;
}

export default function ServiceDemo({ service }: ServiceDemoProps) {
  const getDemoComponent = () => {
    switch (service) {
      case 'website':
        return <WebDevDemo />;
      case 'indicator':
        return <TradingDemo />;
      case 'bot':
        return <BotDemo />;
      case 'other':
        return <CustomDemo />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-black/50 rounded-xl overflow-hidden shadow-2xl"
    >
      {getDemoComponent()}
    </motion.div>
  );
}