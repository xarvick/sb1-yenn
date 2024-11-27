import { motion } from 'framer-motion';

export default function Quote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="text-center max-w-3xl mx-auto px-4 mt-8 text-sm text-gray-500"
    >
      <motion.blockquote 
        className="relative p-4"
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="italic"
          >
            "Ey Türk istikbalinin evladı! Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur!"
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-1"
          >
            - Mustafa Kemal Atatürk
          </motion.div>
        </div>
      </motion.blockquote>
    </motion.div>
  );
}