import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function ChartAnimation() {
  const generateCandlesticks = () => {
    let price = 100;
    return [...Array(30)].map(() => {
      const change = (Math.random() - 0.5) * 10;
      price += change;
      const open = price;
      const close = price + (Math.random() - 0.5) * 5;
      const high = Math.max(open, close) + Math.random() * 3;
      const low = Math.min(open, close) - Math.random() * 3;
      return { open, close, high, low };
    });
  };

  const candlesticks = generateCandlesticks();
  const maxPrice = Math.max(...candlesticks.map(c => c.high));
  const minPrice = Math.min(...candlesticks.map(c => c.low));
  const priceRange = maxPrice - minPrice;

  const scaleY = (price: number) => {
    return ((price - minPrice) / priceRange) * 400;
  };

  return (
    <div className="relative h-[600px] bg-[#1E1E1E] rounded-lg overflow-hidden">
      {/* Chart Header */}
      <div className="bg-[#2D2D2D] p-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Icons.Bitcoin className="w-8 h-8 text-[#F7931A]" />
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold">BTC/USDT</span>
              <motion.span 
                className="text-green-500 text-lg"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                +2.45%
              </motion.span>
            </div>
            <div className="text-gray-400 text-sm">Bitcoin</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {['1H', '4H', '1D', '1W'].map((timeframe, i) => (
            <motion.button
              key={timeframe}
              className={`px-3 py-1 rounded ${i === 1 ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {timeframe}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="p-6 h-[500px] relative">
        {/* Price Grid */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full border-t border-gray-800/50 text-xs text-gray-500">
              ${Math.round(maxPrice - (i * priceRange / 5))}
            </div>
          ))}
        </div>

        {/* Candlesticks */}
        <div className="absolute inset-0 flex items-end">
          {candlesticks.map((candle, i) => {
            const isGreen = candle.close > candle.open;
            const height = Math.abs(scaleY(candle.close) - scaleY(candle.open));
            const top = scaleY(Math.max(candle.open, candle.close));
            const wickTop = scaleY(candle.high);
            const wickBottom = scaleY(candle.low);
            
            return (
              <motion.div
                key={i}
                className="relative flex-1"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                {/* Wick */}
                <motion.div
                  className={`w-[1px] mx-auto ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    height: wickBottom - wickTop,
                    marginTop: wickTop
                  }}
                />
                {/* Body */}
                <motion.div
                  className={`w-4 mx-auto ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    height: Math.max(1, height),
                    marginTop: top - wickTop
                  }}
                  whileHover={{ scale: 1.2 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Overlay Indicators */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Buy/Sell Signals */}
          {[...Array(5)].map((_, i) => {
            const isGreen = Math.random() > 0.5;
            return (
              <motion.div
                key={i}
                className={`absolute ${isGreen ? 'text-green-500' : 'text-red-500'}`}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.2 }}
              >
                <div className={`px-2 py-1 rounded text-xs font-bold ${isGreen ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {isGreen ? 'BUY' : 'SELL'}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Indicator Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#2D2D2D] border-t border-gray-800 p-4">
        <div className="grid grid-cols-4 gap-8">
          {[
            { label: 'RSI', value: '65.4', color: 'yellow' },
            { label: 'MACD', value: '0.0024', color: 'blue' },
            { label: 'Volume', value: '1.2M', color: 'purple' },
            { label: 'OBV', value: '+12.5K', color: 'green' }
          ].map(({ label, value, color }) => (
            <motion.div
              key={label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-gray-400 text-sm mb-1">{label}</div>
              <motion.div
                className={`text-${color}-500 font-bold`}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {value}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}