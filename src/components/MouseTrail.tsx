import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MouseTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    const interval = setInterval(() => {
      setTrail(prevTrail => {
        const newPoint = { ...mousePosition, id: Date.now() };
        const newTrail = [...prevTrail, newPoint];
        if (newTrail.length > 20) newTrail.shift();
        return newTrail;
      });
    }, 50);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(interval);
    };
  }, [mousePosition]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm"
          style={{ 
            left: point.x - 4, 
            top: point.y - 4,
            opacity: 1 - (index / trail.length)
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 1 }}
        />
      ))}
    </div>
  );
}