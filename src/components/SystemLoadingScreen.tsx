import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

interface SystemLoadingScreenProps {
  onComplete: () => void;
}

export default function SystemLoadingScreen({ onComplete }: SystemLoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentCodeLine, setCurrentCodeLine] = useState(0);

  const steps = [
    { text: '> Sistem başlatılıyor...', duration: 200 },
    { text: '> Güvenlik protokolleri kontrol ediliyor...', duration: 200 },
    { text: '> Kullanıcı doğrulanıyor...', duration: 200 },
    { text: '> Giriş başarılı!', duration: 200 },
    { text: '> Yönlendiriliyor...', duration: 200 }
  ];

  const codeSnippets = [
    'class SecuritySystem {',
    '  constructor() {',
    '    this.encryptionType = "AES-256-GCM";',
    '    this.iterations = 100000;',
    '    this.keyLength = 256;',
    '  }',
    '',
    '  async generateKey(password: string, salt: Buffer): Promise<Buffer> {',
    '    return crypto.pbkdf2Sync(',
    '      password,',
    '      salt,',
    '      this.iterations,',
    '      this.keyLength,',
    '      "sha512"',
    '    );',
    '  }',
    '',
    '  async encrypt(data: string): Promise<EncryptedData> {',
    '    const iv = crypto.randomBytes(16);',
    '    const salt = crypto.randomBytes(64);',
    '    const key = await this.generateKey(this.masterKey, salt);',
    '    const cipher = crypto.createCipheriv(',
    '      this.encryptionType,',
    '      key,',
    '      iv',
    '    );',
    '',
    '    let encrypted = cipher.update(data, "utf8", "hex");',
    '    encrypted += cipher.final("hex");',
    '',
    '    const authTag = cipher.getAuthTag();',
    '',
    '    return {',
    '      encrypted,',
    '      iv: iv.toString("hex"),',
    '      authTag: authTag.toString("hex"),',
    '      salt: salt.toString("hex")',
    '    };',
    '  }',
    '',
    '  async decrypt(encryptedData: EncryptedData): Promise<string> {',
    '    const key = await this.generateKey(',
    '      this.masterKey,',
    '      Buffer.from(encryptedData.salt, "hex")',
    '    );',
    '',
    '    const decipher = crypto.createDecipheriv(',
    '      this.encryptionType,',
    '      key,',
    '      Buffer.from(encryptedData.iv, "hex")',
    '    );',
    '',
    '    decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"));',
    '',
    '    let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8");',
    '    decrypted += decipher.final("utf8");',
    '',
    '    return decrypted;',
    '  }',
    '}',
    '',
    'async function initializeSystem() {',
    '  const security = new SecuritySystem();',
    '  await security.initialize();',
    '  console.log("System initialized successfully!");',
    '}'
  ];

  useEffect(() => {
    const addLog = async () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setLogs(prev => [...prev, step.text]);
        await new Promise(resolve => setTimeout(resolve, step.duration));
        setCurrentStep(prev => prev + 1);
        
        if (currentStep === steps.length - 1) {
          setTimeout(onComplete, 200);
        }
      }
    };

    addLog();
  }, [currentStep]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCodeLine(prev => (prev + 1) % codeSnippets.length);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Kod Editörü Arkaplanı */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="p-4 font-mono text-sm h-full overflow-hidden">
          {codeSnippets.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: index * 0.02 }}
              className="flex"
            >
              <span className="text-gray-600 mr-4 select-none">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className={
                line.includes('class') ? 'text-[#4EC9B0]' :
                line.includes('constructor') || line.includes('function') ? 'text-[#DCDCAA]' :
                line.includes('this') ? 'text-[#9CDCFE]' :
                line.includes('"') ? 'text-[#CE9178]' :
                line.includes('async') ? 'text-[#C586C0]' :
                line.includes('return') ? 'text-[#C586C0]' :
                line.includes('Buffer') ? 'text-[#4EC9B0]' :
                'text-[#D4D4D4]'
              }>
                {line}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Terminal Penceresi */}
      <div className="w-full max-w-2xl p-8 relative">
        <motion.div 
          className="bg-black/90 border border-blue-500/30 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-blue-950/30 p-3 flex items-center gap-2 border-b border-blue-500/30">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-blue-500/80 text-sm font-mono">system_init.sh</span>
          </div>

          <div className="p-6 font-mono text-sm space-y-2">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-blue-500/80"
              >
                {log}
              </motion.div>
            ))}

            {currentStep < steps.length && (
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-2 h-4 bg-blue-500/80 inline-block"
              />
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}