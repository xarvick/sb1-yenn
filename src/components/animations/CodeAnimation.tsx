import { motion } from 'framer-motion';

export default function CodeAnimation() {
  const pythonCode = [
    'import pandas as pd',
    'import numpy as np',
    'from sklearn.model_selection import train_test_split',
    '',
    'class TradingBot:',
    '    def __init__(self):',
    '        self.model = None',
    '        self.data = None',
    '',
    '    def load_data(self, symbol: str):',
    '        """Load historical market data"""',
    '        self.data = pd.read_csv(f"{symbol}_data.csv")',
    '',
    '    def preprocess(self):',
    '        """Prepare data for training"""',
    '        self.data["SMA"] = self.data["close"].rolling(20).mean()',
    '        self.data["RSI"] = calculate_rsi(self.data["close"])',
    '',
    '    def train(self):',
    '        """Train the model"""',
    '        X = self.data[["SMA", "RSI"]]',
    '        y = self.data["target"]',
    '        self.model.fit(X, y)',
    '',
    '    def run(self):',
    '        """Execute trading strategy"""',
    '        predictions = self.model.predict(latest_data)',
    '        execute_trades(predictions)'
  ];

  return (
    <motion.div 
      className="relative rounded-lg overflow-hidden bg-[#1E1E1E] font-mono text-sm md:text-base"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Terminal Header */}
      <div className="bg-[#2D2D2D] p-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-gray-400">python trading_bot.py</span>
      </div>

      {/* Code Content */}
      <div className="p-6">
        {pythonCode.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex"
          >
            <span className="text-gray-500 mr-4 select-none">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <span className={
              line.startsWith('import') ? 'text-[#C586C0]' :
              line.startsWith('class') ? 'text-[#4EC9B0]' :
              line.startsWith('    def') ? 'text-[#DCDCAA]' :
              line.includes('"""') ? 'text-[#6A9955]' :
              line.includes('self') ? 'text-[#9CDCFE]' :
              'text-[#D4D4D4]'
            }>
              {line}
            </span>
          </motion.div>
        ))}

        {/* Blinking Cursor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-5 bg-white/50 mt-2 ml-8"
        />
      </div>
    </motion.div>
  );
}