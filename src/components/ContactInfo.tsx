import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface ContactInfoProps {
  className?: string;
}

export default function ContactInfo({ className }: ContactInfoProps) {
  const contacts = [
    { 
      icon: Icons.Github, 
      label: 'GitHub',
      href: 'https://github.com/yourusername',
      gradient: 'from-neutral-500 to-neutral-900'
    },
    { 
      icon: Icons.MessageCircle, 
      label: 'WhatsApp',
      href: 'https://wa.me/1234567890',
      gradient: 'from-emerald-500 to-green-700'
    },
    { 
      icon: Icons.Globe, 
      label: 'Website',
      href: 'https://yourwebsite.com',
      gradient: 'from-blue-500 to-indigo-700'
    },
    { 
      icon: Icons.Mail, 
      label: 'Email',
      href: 'mailto:contact@example.com',
      gradient: 'from-violet-500 to-purple-700'
    },
    { 
      icon: Icons.Link, 
      label: 'R10.net',
      href: 'https://r10.net/profil',
      gradient: 'from-rose-500 to-red-700'
    }
  ];

  return (
    <div className={className}>
      <div className="flex flex-wrap justify-center gap-4">
        {contacts.map(({ icon: Icon, label, href, gradient }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Glow Effect */}
            <motion.div
              className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition duration-500`}
              initial={false}
            />

            {/* Button Content */}
            <motion.div
              className="relative flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 group-hover:border-white/20 transition duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`p-2 rounded-lg bg-gradient-to-r ${gradient}`}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
              
              <span className="font-medium">{label}</span>

              <motion.div
                className="absolute inset-0 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
              </motion.div>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}