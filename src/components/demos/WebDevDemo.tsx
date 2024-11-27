import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import ContactInfo from '../ContactInfo';

export default function WebDevDemo() {
  const [currentLine, setCurrentLine] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const htmlCode = [
    '<!DOCTYPE html>',
    '<html lang="tr">',
    '<head>',
    '    <meta charset="UTF-8">',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '    <title>EMC Digital</title>',
    '    <link href="styles.css" rel="stylesheet">',
    '</head>',
    '<body class="bg-gradient-to-br from-gray-900 to-black min-h-screen">',
    '    <header class="container mx-auto px-4 py-20">',
    '        <nav class="flex justify-between items-center mb-16">',
    '            <div class="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500">',
    '                EMC Digital',
    '            </div>',
    '            <ul class="flex space-x-8">',
    '                <li><a href="#services">Hizmetler</a></li>',
    '                <li><a href="#portfolio">Portfolyo</a></li>',
    '                <li><a href="#contact">İletişim</a></li>',
    '            </ul>',
    '        </nav>',
    '        <div class="text-center max-w-4xl mx-auto">',
    '            <h1 class="text-6xl font-bold mb-6">',
    '                Dijital Dünyada',
    '                <span class="text-gradient">Profesyonel Çözümler</span>',
    '            </h1>',
    '            <p class="text-xl text-gray-400">',
    '                Modern ve yenilikçi web teknolojileri ile',
    '                işinizi büyütün',
    '            </p>',
    '        </div>',
    '    </header>',
    '</body>',
    '</html>'
  ];

  useEffect(() => {
    if (currentLine < htmlCode.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 50); // 50ms per line for faster typing
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowPreview(true), 500);
    }
  }, [currentLine]);

  const features = [
    { 
      icon: Icons.Layers,
      title: 'Modern Tasarım',
      description: 'En son tasarım trendleri',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Icons.Zap,
      title: 'Hızlı Performans',
      description: 'Optimize edilmiş kod yapısı',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Icons.Smartphone,
      title: 'Mobil Uyumlu',
      description: 'Tüm cihazlarda mükemmel görünüm',
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      icon: Icons.Search,
      title: 'SEO Dostu',
      description: 'Arama motorları için optimize',
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div className="bg-[#2D2D2D] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-gray-400">index.html</div>
      </div>

      <div className="relative">
        {/* Code Editor */}
        <motion.div
          className={`p-6 font-mono text-sm transition-opacity duration-300 ${showPreview ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundColor: '#1E1E1E' }} // VS Code dark theme background
        >
          {htmlCode.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: index <= currentLine ? 1 : 0,
                x: index <= currentLine ? 0 : -20 
              }}
              transition={{ duration: 0.1 }}
              className="flex"
            >
              <span className="text-gray-600 mr-4 select-none">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className={
                line.includes('<!DOCTYPE') ? 'text-gray-500' :
                line.includes('<') ? 'text-[#569CD6]' : // HTML tags
                line.includes('class=') ? 'text-[#9CDCFE]' : // Attributes
                line.includes('"') ? 'text-[#CE9178]' : // Strings
                'text-[#D4D4D4]' // Default text
              }>
                {line}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black p-6 overflow-auto"
          >
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Hero Section */}
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                    EMC Digital
                  </span>
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-400 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Modern web teknolojileri ile dijital varlığınızı güçlendirin
                </motion.p>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {features.map(({ icon: Icon, title, description, gradient }, i) => (
                  <motion.div
                    key={title}
                    className="relative group text-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
                      <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${gradient} p-2.5`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{title}</h3>
                      <p className="text-gray-400">{description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Info */}
              <ContactInfo className="mt-12" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}