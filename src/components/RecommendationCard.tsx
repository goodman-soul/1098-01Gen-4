import { motion } from 'framer-motion';
import { Check, AlertTriangle, Info } from 'lucide-react';
import { RecommendationResult } from '../types';

interface RecommendationCardProps {
  result: RecommendationResult;
  delay?: number;
}

const confidenceConfig = {
  perfect: {
    icon: Check,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    label: '完美匹配',
    glow: 'shadow-green-500/20',
  },
  good: {
    icon: Check,
    color: 'text-primary-400',
    bgColor: 'bg-primary-500/20',
    borderColor: 'border-primary-500/30',
    label: '合适',
    glow: 'shadow-primary-500/20',
  },
  borderline: {
    icon: AlertTriangle,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    label: '接近边缘',
    glow: 'shadow-yellow-500/20',
  },
};

export function RecommendationCard({ result, delay = 0 }: RecommendationCardProps) {
  const config = confidenceConfig[result.confidence];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 200 }}
      className={`card p-6 border ${config.borderColor} ${config.bgColor} shadow-lg ${config.glow}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-dark-400 font-medium">{result.brand}</p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring', stiffness: 300 }}
            className="text-5xl font-bold font-display gradient-text mt-1"
          >
            {result.recommendedSize}
          </motion.div>
        </div>
        <div className={`flex items-center gap-1.5 ${config.color} px-3 py-1 rounded-full ${config.bgColor}`}>
          <Icon size={16} />
          <span className="text-sm font-medium">{config.label}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-dark-400">适合范围</p>
        <p className="text-lg font-semibold text-dark-100">
          {result.sizeRange[0]} - {result.sizeRange[1]} {result.sizeRangeUnit}
        </p>
      </div>

      {result.alternativeSizes && result.alternativeSizes.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-dark-400">可选尺码</p>
          <div className="flex gap-2 mt-1">
            {result.alternativeSizes.map((size) => (
              <span
                key={size}
                className="px-3 py-1 bg-dark-700 rounded-lg text-sm text-dark-200"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.tips && result.tips.length > 0 && (
        <div className="border-t border-dark-600/50 pt-4 mt-4">
          <div className="flex items-center gap-2 mb-2 text-dark-300">
            <Info size={16} />
            <span className="text-sm font-medium">选购建议</span>
          </div>
          <ul className="space-y-1.5">
            {result.tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.3 + index * 0.1 }}
                className="text-sm text-dark-300 flex items-start gap-2"
              >
                <span className="text-accent-500 mt-0.5">•</span>
                {tip}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
