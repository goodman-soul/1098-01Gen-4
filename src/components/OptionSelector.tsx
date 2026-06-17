import { motion } from 'framer-motion';

interface Option<T> {
  value: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface OptionSelectorProps<T> {
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
}

export function OptionSelector<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: OptionSelectorProps<T>) {
  return (
    <div className="w-full">
      {label && (
        <p className="text-sm font-medium text-dark-100 mb-3">{label}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <motion.button
              key={option.value}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(option.value)}
              className={`relative p-4 rounded-xl text-left transition-all min-h-[60px] ${
                isSelected
                  ? 'bg-gradient-to-br from-accent-500/20 to-primary-500/10 border-2 border-accent-500/50'
                  : 'bg-dark-700 border-2 border-transparent hover:border-dark-500'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="option-selector"
                  className="absolute inset-0 rounded-xl bg-accent-500/5"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative flex items-center gap-3">
                {option.icon && (
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected ? 'bg-accent-500/20 text-accent-400' : 'bg-dark-600 text-dark-300'
                    }`}
                  >
                    {option.icon}
                  </div>
                )}
                <div>
                  <p
                    className={`font-semibold ${
                      isSelected ? 'text-accent-400' : 'text-dark-100'
                    }`}
                  >
                    {option.label}
                  </p>
                  {option.description && (
                    <p className="text-xs text-dark-400 mt-0.5">{option.description}</p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
