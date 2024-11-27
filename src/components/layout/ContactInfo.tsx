import { motion } from 'framer-motion';
import { ContactButton } from './ContactButton';
import { contactData } from '@/config/contact';

interface ContactInfoProps {
  className?: string;
}

export default function ContactInfo({ className }: ContactInfoProps) {
  return (
    <div className={className}>
      <motion.div 
        className="flex flex-col gap-2 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {contactData.map((contact, i) => (
          <ContactButton 
            key={contact.label}
            contact={contact}
            index={i}
          />
        ))}
      </motion.div>
    </div>
  );
}