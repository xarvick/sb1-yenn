import * as Icons from 'lucide-react';
import { ContactData } from '@/types';

export const contactData: ContactData[] = [
  { 
    icon: Icons.Github, 
    label: 'GitHub', 
    href: 'https://github.com/yourusername',
    gradient: 'bg-gradient-to-r from-gray-600 to-gray-800',
    hoverGradient: 'from-gray-700 to-gray-900',
    description: 'Açık Kaynak Projelerim'
  },
  { 
    icon: Icons.MessageCircle, 
    label: 'WhatsApp', 
    href: 'https://wa.me/1234567890',
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-600',
    hoverGradient: 'from-green-600 to-emerald-700',
    description: 'Hızlı İletişim'
  },
  { 
    icon: Icons.Globe, 
    label: 'Website', 
    href: 'https://yourwebsite.com',
    gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    hoverGradient: 'from-blue-600 to-indigo-700',
    description: 'Portfolyo'
  },
  { 
    icon: Icons.Mail, 
    label: 'Email', 
    href: 'mailto:contact@example.com',
    gradient: 'bg-gradient-to-r from-purple-500 to-violet-600',
    hoverGradient: 'from-purple-600 to-violet-700',
    description: 'İş Görüşmeleri'
  },
  { 
    icon: Icons.Link, 
    label: 'R10.net', 
    href: 'https://r10.net/profil',
    gradient: 'bg-gradient-to-r from-rose-500 to-red-600',
    hoverGradient: 'from-rose-600 to-red-700',
    description: 'Freelancer Profilim'
  }
];