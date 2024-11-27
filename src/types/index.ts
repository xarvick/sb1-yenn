import { LucideIcon } from 'lucide-react';

export type ServiceType = 'website' | 'indicator' | 'bot' | 'mobile' | 'design' | 'ads' | 'custom';

export interface ServiceInfo {
  title: string;
  description: string;
  icon: keyof typeof import('lucide-react');
  bgGradient: string;
}

export const SERVICES: Record<ServiceType, ServiceInfo> = {
  website: {
    title: 'Web Geliştirme',
    description: 'Modern ve Responsive Web Siteleri',
    icon: 'Globe',
    bgGradient: 'from-blue-600 to-indigo-600'
  },
  indicator: {
    title: 'Trading İndikatörleri',
    description: 'Profesyonel Teknik Analiz Araçları',
    icon: 'LineChart',
    bgGradient: 'from-emerald-600 to-teal-600'
  },
  bot: {
    title: 'Bot & Otomasyon',
    description: 'Akıllı Otomasyon Çözümleri',
    icon: 'Bot',
    bgGradient: 'from-purple-600 to-pink-600'
  },
  mobile: {
    title: 'Mobil Bot',
    description: 'Mobil Uygulamalar için Otomasyon',
    icon: 'Smartphone',
    bgGradient: 'from-orange-600 to-red-600'
  },
  design: {
    title: 'Grafik Tasarım',
    description: 'Markanız için Yaratıcı Çözümler',
    icon: 'Palette',
    bgGradient: 'from-pink-600 to-rose-600'
  },
  ads: {
    title: 'Reklam Yönetimi',
    description: 'Stratejik Dijital Reklam Çözümleri',
    icon: 'Target',
    bgGradient: 'from-violet-600 to-indigo-600'
  },
  custom: {
    title: 'Özel Çözümler',
    description: 'İhtiyaçlarınıza Özel Yazılımlar',
    icon: 'Sparkles',
    bgGradient: 'from-amber-600 to-yellow-600'
  }
};

export const SERVICE_INFO = SERVICES;

export interface ContactData {
  icon: LucideIcon;
  label: string;
  href: string;
  gradient: string;
  hoverGradient: string;
  description: string;
}