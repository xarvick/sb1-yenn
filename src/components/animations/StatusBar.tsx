import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBarProps {
  status: string;
  metrics: Array<{
    icon: keyof typeof Icons;
    value: string;
    color: 'green' | 'yellow' | 'red' | 'blue';
  }>;
}

export default function StatusBar({ status, metrics }: StatusBarProps) {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-500';
      case 'yellow': return 'text-yellow-500';
      case 'red': return 'text-red-500';
      case 'blue': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-[#2D2D2D] p-3 border-t border-gray-800">
      <div className="flex items-center justify-between text-sm text-gray-400">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Icons.Bot className="w-4 h-4 text-blue-500" />
          </motion.div>
          <span>Status: {status}</span>
        </motion.div>
        <div className="flex items-center gap-4">
          {metrics.map((metric, index) => {
            const Icon = Icons[metric.icon];
            return (
              <motion.div 
                key={index} 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon className={cn('w-4 h-4', getColorClass(metric.color))} />
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {metric.value}
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}