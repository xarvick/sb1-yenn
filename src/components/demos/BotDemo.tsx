import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import ContactInfo from '../ContactInfo';

export default function BotDemo() {
  const [currentLine, setCurrentLine] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 100, y: 100 });
  const [actions, setActions] = useState<string[]>([]);
  const [showContacts, setShowContacts] = useState(false);

  const pythonCode = [
    'from selenium import webdriver',
    'from selenium.webdriver.common.by import By',
    'import pyautogui',
    'import time',
    '',
    'class AutomationBot:',
    '    def __init__(self):',
    '        """Bot başlatılıyor..."""',
    '        self.driver = webdriver.Chrome()',
    '        self.driver.maximize_window()',
    '',
    '    def click_element(self, x: int, y: int):',
    '        """Belirtilen koordinata tıkla"""',
    '        pyautogui.moveTo(x, y, duration=0.5)',
    '        pyautogui.click()',
    '        time.sleep(0.5)',
    '',
    '    def automate_process(self):',
    '        """Otomasyonu başlat"""',
    '        try:',
    '            # Ana menüyü aç',
    '            self.click_element(100, 200)',
    '            time.sleep(1)',
    '',
    '            # Ayarları seç',
    '            self.click_element(150, 300)',
    '            time.sleep(1)',
    '',
    '            # İşlemi tamamla',
    '            self.click_element(200, 400)',
    '            print("✨ İşlem başarıyla tamamlandı!")',
    '',
    '        except Exception as e:',
    '            print(f"❌ Hata: {str(e)}")',
    '',
    'if __name__ == "__main__":',
    '    bot = AutomationBot()',
    '    bot.automate_process()'
  ];

  useEffect(() => {
    if (currentLine < pythonCode.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 25); // 50ms -> 25ms
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setShowDemo(true);
        startAutomation();
      }, 250); // 500ms -> 250ms
    }
  }, [currentLine]);

  const startAutomation = () => {
    const automationSteps = [
      { pos: { x: 100, y: 100 }, action: '🚀 Bot başlatılıyor...' },
      { pos: { x: 200, y: 150 }, action: '🔍 Arayüz taranıyor...' },
      { pos: { x: 150, y: 250 }, action: '🖱️ Menü açılıyor...' },
      { pos: { x: 250, y: 200 }, action: '⚙️ Ayarlar seçiliyor...' },
      { pos: { x: 200, y: 300 }, action: '✨ İşlem tamamlanıyor...' }
    ];

    automationSteps.forEach((step, index) => {
      setTimeout(() => {
        setMousePos(step.pos);
        setActions(prev => [...prev, step.action]);
        if (index === automationSteps.length - 1) {
          setTimeout(() => setShowContacts(true), 500); // 1000ms -> 500ms
        }
      }, index * 750); // 1500ms -> 750ms
    });
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div className="bg-[#2D2D2D] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-gray-400">automation_bot.py</div>
      </div>

      <div className="p-6">
        {/* Kod Editörü */}
        <div className={`font-mono text-sm transition-opacity duration-300 ${showDemo ? 'hidden' : 'block'}`}>
          {pythonCode.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: index <= currentLine ? 1 : 0,
                x: index <= currentLine ? 0 : -20 
              }}
              transition={{ duration: 0.05 }} // 0.1s -> 0.05s
              className="flex"
            >
              <span className="text-gray-500 mr-4 select-none">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className={
                line.startsWith('from') || line.startsWith('import') ? 'text-purple-400' :
                line.startsWith('class') ? 'text-blue-400' :
                line.startsWith('    def') ? 'text-yellow-400' :
                line.includes('self') ? 'text-blue-300' :
                line.includes('"') ? 'text-green-300' :
                'text-gray-300'
              }>
                {line}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Otomasyon Demo */}
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }} // 0.3s -> 0.2s
            className="space-y-8"
          >
            {/* Simüle Edilmiş Arayüz */}
            <div className="relative h-[300px] bg-black/30 rounded-lg">
              {/* Mouse İmleci */}
              <motion.div
                className="absolute w-6 h-6 pointer-events-none z-50"
                animate={{ x: mousePos.x, y: mousePos.y }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }} // Daha hızlı hareket
              >
                <Icons.MousePointer className="text-white" />
              </motion.div>

              {/* Arayüz Elemanları */}
              <div className="grid grid-cols-3 gap-4 p-4">
                <div className="h-20 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" />
                <div className="h-20 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" />
                <div className="h-20 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" />
                <div className="h-20 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" />
                <div className="h-20 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" />
                <div className="h-20 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" />
              </div>
            </div>

            {/* Log Mesajları */}
            <div className="space-y-2 bg-black/30 p-4 rounded-lg">
              {actions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }} // 0.3s -> 0.2s
                  className="flex items-center gap-2 text-sm font-mono"
                >
                  <span className="text-gray-400">{action}</span>
                </motion.div>
              ))}
            </div>

            {/* İletişim Bilgileri */}
            {showContacts && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }} // 0.3s -> 0.2s
              >
                <ContactInfo />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}