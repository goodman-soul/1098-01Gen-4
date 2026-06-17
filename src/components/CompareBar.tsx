import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompareStore } from '../store/useCompareStore';

export function CompareBar() {
  const { products, maxProducts, removeProduct, clearProducts } = useCompareStore();
  const navigate = useNavigate();

  if (products.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-dark-800/95 backdrop-blur-xl border-t border-dark-600 shadow-2xl"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-dark-400 mb-2">
              已选择 <span className="text-accent-400 font-semibold">{products.length}</span> / {maxProducts} 件商品
            </p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-2 px-3 py-2 bg-dark-700 rounded-lg flex-shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <span className="text-sm text-dark-100 max-w-[100px] truncate">
                      {product.name}
                    </span>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="w-6 h-6 flex items-center justify-center text-dark-400 hover:text-accent-400 transition-colors min-w-[24px] min-h-[24px]"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={clearProducts}
              className="px-4 py-2 bg-dark-700 text-dark-300 rounded-lg hover:bg-dark-600 hover:text-dark-100 transition-colors flex items-center gap-2 min-h-[44px]"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">清空</span>
            </button>
            <button
              onClick={() => navigate('/compare')}
              disabled={products.length < 2}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
            >
              对比
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
