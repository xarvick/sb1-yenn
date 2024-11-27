import { motion } from 'framer-motion';

export default function CustomAnimation() {
  return (
    <div className="bg-black/50 rounded-lg p-6 flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 border-4 border-purple-500 rounded-full border-t-transparent"
      />
    </div>
  );
}