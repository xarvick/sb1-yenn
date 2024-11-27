import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import ContactInfo from '../ContactInfo';

export default function TradingDemo() {
  const [currentLine, setCurrentLine] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const [candlesticks, setCandlesticks] = useState<any[]>([]);
  const [showContacts, setShowContacts] = useState(false);

  const pineScript = [
    '//@version=5',
    'indicator("EMC Super Trend", overlay=true)',
    '',
    'atrPeriod = input(10, "ATR Periyodu")',
    'factor = input(3.0, "Çarpan")',
    '',
    'atr = ta.atr(atrPeriod)',
    'up = hl2 - (factor * atr)',
    'down = hl2 + (factor * atr)',
    '',
    '[supertrend, direction] = ta.supertrend(factor, atrPeriod)',
    '',
    'plotshape(direction < 0 and direction[1] >= 0, "Satış", shape.triangledown,',
    '    location.abovebar, color.red, size=size.small)',
    '',
    'plotshape(direction > 0 and direction[1] <= 0, "Alış", shape.triangleup,',
    '    location.belowbar, color.green, size=size.small)',
    '',
    'plot(supertrend, "SuperTrend", color = direction < 0 ? color.red : color.green,',
    '    style=plot.style_linebr)'
  ];

  useEffect(() => {
    if (currentLine < pineScript.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 15); // Her satır için 15ms
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setShowChart(true);
        generateChartData();
      }, 500);
    }
  }, [currentLine]);

  const generateChartData = () => {
    let price = 45000;
    let trend = 1;
    let trendDuration = 0;
    const maxTrendDuration = 5;

    const newCandlesticks = Array(30).fill(0).map(() => {
      trendDuration++;
      if (trendDuration >= maxTrendDuration || Math.random() < 0.2) {
        trend *= -1;
        trendDuration = 0;
      }

      const volatility = Math.random() * 2000 + 1000; // Daha büyük fiyat hareketleri
      const change = trend * (Math.random() * volatility);
      price += change;

      const open = price;
      const close = price + (trend * Math.random() * 1500); // Daha büyük gövdeler
      const high = Math.max(open, close) + Math.random() * 500; // Daha uzun fitiller
      const low = Math.min(open, close) - Math.random() * 500;

      return { open, close, high, low, trend };
    });

    setCandlesticks(newCandlesticks);
    setTimeout(() => setShowContacts(true), 3000);
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div className="bg-[#2D2D2D] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-gray-400">supertrend.pine</div>
      </div>

      <div className="p-6">
        {/* Kod Editörü */}
        <div className={`font-mono text-sm transition-opacity duration-300 ${showChart ? 'hidden' : 'block'}`}>
          {pineScript.map((line, index) => (
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
              <span className="text-gray-500 mr-4 select-none">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className={
                line.startsWith('//') ? 'text-gray-500' :
                line.includes('input') ? 'text-purple-400' :
                line.includes('=') ? 'text-blue-400' :
                line.includes('plot') ? 'text-green-400' :
                line.includes('"') ? 'text-yellow-300' :
                'text-gray-300'
              }>
                {line}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Grafik */}
        {showChart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[600px] relative bg-[#131722] rounded-lg p-4"
          >
            {/* Grafik Başlığı */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Icons.Bitcoin className="w-8 h-8 text-[#F7931A]" />
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold">BTC/USDT</span>
                    <span className="text-green-500">+2.45%</span>
                  </div>
                  <div className="text-gray-400 text-sm">Bitcoin</div>
                </div>
              </div>
            </div>

            {/* Izgara Çizgileri */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
              {[...Array(48)].map((_, i) => (
                <div key={i} className="border-[0.5px] border-gray-800/30" />
              ))}
            </div>

            {/* Mum Çubukları */}
            <div className="relative h-[400px] flex items-center justify-center">
              {candlesticks.map((candle, i) => {
                const isGreen = candle.close > candle.open;
                const bodyHeight = Math.abs(candle.close - candle.open) / 50; // Daha büyük gövdeler
                const wickHeight = Math.abs(candle.high - candle.low) / 50;
                
                return (
                  <motion.div
                    key={i}
                    className="flex-1 flex flex-col items-center justify-center relative"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {/* Fitil */}
                    <div 
                      className={`w-[2px] ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ height: `${wickHeight}px` }}
                    />
                    {/* Gövde */}
                    <div 
                      className={`w-6 ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ height: `${Math.max(2, bodyHeight)}px` }}
                    />
                    
                    {/* Sinyal */}
                    {candle.trend > 0 && i % 7 === 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-6"
                      >
                        <div className="px-2 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                          AL
                        </div>
                      </motion.div>
                    )}
                    {candle.trend < 0 && i % 8 === 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-6"
                      >
                        <div className="px-2 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400">
                          SAT
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* İletişim Bilgileri */}
            {showContacts && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
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