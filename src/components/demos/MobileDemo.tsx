import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import ContactInfo from '../ContactInfo';

export default function MobileDemo() {
  const [currentLine, setCurrentLine] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [currentAction, setCurrentAction] = useState(0);
  const [showContacts, setShowContacts] = useState(false);

  const code = [
    'from appium import webdriver',
    'from appium.webdriver.common.touch_action import TouchAction',
    'import time',
    '',
    'class MobileBot:',
    '    def __init__(self):',
    '        self.caps = {',
    '            "platformName": "Android",',
    '            "deviceName": "Pixel 6",',
    '            "automationName": "UiAutomator2"',
    '        }',
    '        self.driver = webdriver.Remote("http://localhost:4723", self.caps)',
    '',
    '    def start_automation(self):',
    '        """Başlat otomasyonu"""',
    '        try:',
    '            self.click_element("login_button")',
    '            self.type_text("username_field", "test@example.com")',
    '            self.type_text("password_field", "********")',
    '            self.click_element("submit_button")',
    '            print("✨ Otomasyon başarıyla tamamlandı!")',
    '        except Exception as e:',
    '            print(f"❌ Hata: {str(e)}")',
    '',
    'if __name__ == "__main__":',
    '    bot = MobileBot()',
    '    bot.start_automation()'
  ];

  const automationSteps = [
    { action: 'Uygulamayı Başlat', icon: Icons.Power },
    { action: 'Giriş Butonuna Tıkla', icon: Icons.MousePointerClick },
    { action: 'Email Gir', icon: Icons.Mail },
    { action: 'Şifre Gir', icon: Icons.Lock },
    { action: 'Onayla', icon: Icons.Check },
    { action: 'İşlem Tamamlandı', icon: Icons.CheckCircle }
  ];

  useEffect(() => {
    if (currentLine < code.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 25); // 50ms -> 25ms
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowPhone(true), 250); // 500ms -> 250ms
    }
  }, [currentLine]);

  useEffect(() => {
    if (showPhone && currentAction < automationSteps.length) {
      const timer = setTimeout(() => {
        setCurrentAction(prev => prev + 1);
      }, 500); // 1000ms -> 500ms
      return () => clearTimeout(timer);
    } else if (currentAction >= automationSteps.length) {
      setTimeout(() => setShowContacts(true), 500); // 1000ms -> 500ms
    }
  }, [showPhone, currentAction]);

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div className="bg-[#2D2D2D] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-gray-400">mobile_bot.py</div>
      </div>

      <div className="p-6">
        {/* Kod Editörü */}
        <div className={`font-mono text-sm transition-opacity duration-300 ${showPhone ? 'hidden' : 'block'}`}>
          {code.map((line, index) => (
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

        {/* Telefon Arayüzü */}
        {showPhone && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }} // 0.3s -> 0.2s
              className="relative mx-auto w-[300px] h-[600px] bg-black rounded-3xl p-4 border-4 border-gray-800"
            >
              {/* Üst Çentik */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl" />
              
              {/* Ekran */}
              <div className="bg-white/10 h-full rounded-2xl p-4 overflow-hidden">
                {/* Uygulama Başlığı */}
                <div className="text-center mb-8">
                  <Icons.Smartphone className="w-12 h-12 mx-auto mb-2 text-blue-500" />
                  <h3 className="text-lg font-semibold">Mobile Automation</h3>
                </div>

                {/* Otomasyon Adımları */}
                <div className="space-y-4">
                  {automationSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentAction;
                    const isComplete = index < currentAction;

                    return (
                      <motion.div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          isActive ? 'bg-blue-500/20 text-blue-400' :
                          isComplete ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-800/50 text-gray-400'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }} // 0.3s -> 0.2s
                      >
                        <motion.div
                          animate={isActive ? { rotate: 360 } : {}}
                          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} // 1s -> 0.5s
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                        <span className="text-sm">{step.action}</span>
                        {isComplete && (
                          <Icons.Check className="w-4 h-4 ml-auto text-green-500" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

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
          </div>
        )}
      </div>
    </div>
  );
}