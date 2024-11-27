import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ServiceType, SERVICE_INFO } from '@/types';

interface ServiceSelectorProps {
  onSelect: (service: ServiceType) => void;
}

export default function ServiceSelector({ onSelect }: ServiceSelectorProps) {
  const services = Object.entries(SERVICE_INFO) as [ServiceType, typeof SERVICE_INFO[ServiceType]][];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to DevCraft Solutions</h1>
        <p className="text-xl text-muted-foreground">What can we help you create today?</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map(([key, service], index) => {
          const Icon = Icons[service.icon as keyof typeof Icons];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105`}
                onClick={() => onSelect(key)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgClass} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="p-6 relative z-10">
                  <div className="mb-4">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}