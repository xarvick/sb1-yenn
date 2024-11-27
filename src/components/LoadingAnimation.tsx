import { motion } from 'framer-motion';
import { ServiceType } from '@/types';
import WebDevDemo from './demos/WebDevDemo';
import TradingDemo from './demos/TradingDemo';
import BotDemo from './demos/BotDemo';
import MobileDemo from './demos/MobileDemo';
import DesignDemo from './demos/DesignDemo';
import AdsDemo from './demos/AdsDemo';
import CustomDemo from './demos/CustomDemo';

interface LoadingAnimationProps {
  service: ServiceType;
}

export default function LoadingAnimation({ service }: LoadingAnimationProps) {
  const getAnimation = () => {
    switch (service) {
      case 'website':
        return <WebDevDemo />;
      case 'indicator':
        return <TradingDemo />;
      case 'bot':
        return <BotDemo />;
      case 'mobile':
        return <MobileDemo />;
      case 'design':
        return <DesignDemo />;
      case 'ads':
        return <AdsDemo />;
      case 'custom':
        return <CustomDemo />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="bg-black/50 rounded-xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {getAnimation()}
    </motion.div>
  );
}