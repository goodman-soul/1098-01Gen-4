import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SizeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  label: string;
  description?: string;
}

export function SizeSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  label,
  description,
}: SizeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const updateValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = x / rect.width;
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      onChange(clampedValue);
    },
    [min, max, step, onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValueFromPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateValueFromPosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValueFromPosition(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        updateValueFromPosition(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, updateValueFromPosition]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div>
          <label className="text-sm font-medium text-dark-100">{label}</label>
          {description && (
            <p className="text-xs text-dark-400 mt-0.5">{description}</p>
          )}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="text-2xl font-bold font-display text-accent-400 min-w-[80px] text-right"
          >
            {value}
            <span className="text-sm text-dark-400 ml-1">{unit}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        ref={trackRef}
        className="slider-track relative cursor-pointer select-none touch-manipulation min-h-[44px] flex items-center"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="slider-track absolute top-1/2 -translate-y-1/2 left-0 right-0">
          <motion.div
            className="slider-fill"
            style={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        </div>

        <motion.div
          className="slider-thumb absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
          style={{ left: `${percentage}%` }}
          animate={{ scale: isDragging ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      </div>

      <div className="flex justify-between mt-1 text-xs text-dark-500">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
