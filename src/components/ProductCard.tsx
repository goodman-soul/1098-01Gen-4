import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Wind, Scale, Calendar } from 'lucide-react';
import { Product } from '../types';
import { useCompareStore } from '../store/useCompareStore';
import { seasonLabels } from '../data/mockData';

interface ProductCardProps {
  product: Product;
  recommendedSize?: string;
}

export function ProductCard({ product, recommendedSize }: ProductCardProps) {
  const { addProduct, removeProduct, isSelected, maxProducts, products } = useCompareStore();
  const selected = isSelected(product.id);
  const isFull = products.length >= maxProducts;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleToggle = () => {
    if (selected) {
      removeProduct(product.id);
    } else if (!isFull) {
      addProduct(product);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`card card-hover overflow-hidden relative ${
        selected ? 'ring-2 ring-accent-500 ring-offset-2 ring-offset-dark-800' : ''
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-dark-700">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-dark-600 to-dark-700 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-dark-500/50" />
            </div>
          </div>
        )}
        <motion.img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute top-3 right-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggle}
            disabled={!selected && isFull}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all min-h-[44px] min-w-[44px] ${
              selected
                ? 'bg-accent-500 text-white'
                : isFull
                ? 'bg-dark-600 text-dark-400 cursor-not-allowed'
                : 'bg-dark-800/80 text-dark-200 hover:bg-accent-500 hover:text-white'
            }`}
          >
            {selected ? <Check size={20} /> : <Plus size={20} />}
          </motion.button>
        </div>
        {recommendedSize && (
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 bg-accent-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
              推荐 {recommendedSize}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-primary-400 font-medium">{product.brand}</p>
            <h3 className="text-lg font-semibold text-dark-50 line-clamp-1">{product.name}</h3>
          </div>
          <p className="text-xl font-bold font-display text-accent-400">
            ¥{product.price}
          </p>
        </div>

        <p className="text-sm text-dark-400 mb-4 line-clamp-2">{product.description}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center gap-1 p-2 bg-dark-700/50 rounded-lg">
            <Scale size={16} className="text-primary-400" />
            <span className="text-xs text-dark-400">重量</span>
            <span className="text-sm font-semibold text-dark-100">{product.weight}g</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 bg-dark-700/50 rounded-lg">
            <Wind size={16} className="text-primary-400" />
            <span className="text-xs text-dark-400">透气</span>
            <div className="w-full h-1.5 bg-dark-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                style={{ width: `${(product.breathability / 10) * 100}%` }}
              />
            </div>
            <span className="text-xs text-dark-300">{product.breathability}/10</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 bg-dark-700/50 rounded-lg">
            <Calendar size={16} className="text-primary-400" />
            <span className="text-xs text-dark-400">季节</span>
            <div className="flex gap-0.5">
              {product.seasons.map((s) => (
                <span
                  key={s}
                  className="text-xs px-1.5 py-0.5 bg-dark-600 rounded text-dark-200"
                >
                  {seasonLabels[s]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {product.sizes.map((size) => (
            <span
              key={size}
              className={`px-2.5 py-1 rounded text-xs font-medium ${
                size === recommendedSize
                  ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                  : 'bg-dark-700 text-dark-300'
              }`}
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
