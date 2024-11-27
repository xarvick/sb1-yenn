import { motion } from 'framer-motion';
import { ContactData } from '@/types';

interface ContactButtonProps {
  contact: ContactData;
  index: number;
}

export function ContactButton({ contact, index }: ContactButtonProps) {
  const { icon: Icon, label, href } = contact;
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3 px-4 py-3 rounded-lg bg-black/20 border border-white/5 hover:border-white/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon */}
      <div className="p-2 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors">
        <Icon className="w-4 h-4" />
      </div>

      {/* Label */}
      <span className="text-sm font-medium">{label}</span>

      {/* Arrow */}
      <motion.div
        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
        initial={false}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-45 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
      </motion.div>
    </motion.a>
  );
}