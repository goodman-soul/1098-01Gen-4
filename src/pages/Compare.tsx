import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X, Scale, Wind, Calendar, Tag, Weight, CheckCircle2 } from 'lucide-react';
import { useCompareStore } from '../store/useCompareStore';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { seasonLabels } from '../data/mockData';
import { Product } from '../types';

export function Compare() {
  const navigate = useNavigate();
  const { products, removeProduct, maxProducts } = useCompareStore();
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (products.length < 2) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <Scale size={64} className="mx-auto text-dark-600 mb-6" />
          <h2 className="text-2xl font-bold font-display text-dark-300 mb-4">请先选择要对比的商品</h2>
          <p className="text-dark-500 mb-8">至少选择 2 件商品进行对比，最多可对比 {maxProducts} 件</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const compareParams = [
    { key: 'brand', label: '品牌', icon: Tag },
    { key: 'price', label: '价格', icon: Tag, format: (v: number) => `¥${v}` },
    { key: 'weight', label: '重量', icon: Weight, format: (v: number) => `${v}g` },
    { key: 'breathability', label: '透气性', icon: Wind, isBar: true },
    { key: 'seasons', label: '适合季节', icon: Calendar, isTags: true },
  ];

  const getBestValue = (key: string) => {
    if (key === 'weight') {
      return Math.min(...products.map(p => (p as unknown as Record<string, number>)[key]));
    }
    if (key === 'breathability') {
      return Math.max(...products.map(p => (p as unknown as Record<string, number>)[key]));
    }
    if (key === 'price') {
      return Math.min(...products.map(p => (p as unknown as Record<string, number>)[key]));
    }
    return null;
  };

  const isBestValue = (product: Product, key: string) => {
    const best = getBestValue(key);
    if (best === null) return false;
    return (product as unknown as Record<string, number>)[key] === best;
  };

  if (isMobile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-dark-300 hover:text-dark-50 mb-6 min-h-[44px]"
        >
          <ArrowLeft size={20} />
          返回
        </button>

        <h1 className="text-2xl font-bold font-display text-dark-50 mb-6">商品对比</h1>

        <div className="space-y-6">
          {products.map((product, productIndex) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: productIndex * 0.1 }}
              className="card p-4"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-primary-400 font-medium">{product.brand}</p>
                  <h3 className="text-lg font-semibold text-dark-50 line-clamp-1">{product.name}</h3>
                  <p className="text-xl font-bold font-display text-accent-400">¥{product.price}</p>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="p-2 text-dark-500 hover:text-accent-400 min-w-[36px] min-h-[36px]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {compareParams.map((param, paramIndex) => {
                  const Icon = param.icon;
                  const value = (product as unknown as Record<string, unknown>)[param.key];
                  const isBest = isBestValue(product, param.key);

                  return (
                    <div
                      key={param.key}
                      className={`flex items-center justify-between py-2 ${
                        paramIndex < compareParams.length - 1 ? 'border-b border-dark-600/50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 text-dark-400">
                        <Icon size={16} />
                        <span className="text-sm">{param.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {param.isBar && typeof value === 'number' ? (
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-dark-600 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isBest ? 'bg-accent-500' : 'bg-primary-500'
                                }`}
                                style={{ width: `${(value / 10) * 100}%` }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${isBest ? 'text-accent-400' : 'text-dark-200'}`}>
                              {value}/10
                            </span>
                          </div>
                        ) : param.isTags && Array.isArray(value) ? (
                          <div className="flex gap-1">
                            {value.map((s: string) => (
                              <span
                                key={s}
                                className="text-xs px-2 py-1 bg-dark-600 rounded text-dark-200"
                              >
                                {seasonLabels[s]}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className={`text-sm font-medium ${isBest ? 'text-accent-400' : 'text-dark-200'}`}>
                            {param.format ? param.format(value as number) : String(value)}
                            {isBest && <CheckCircle2 size={14} className="inline ml-1 text-accent-400" />}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-dark-600/50">
                <p className="text-sm text-dark-400 mb-2">可用尺码</p>
                <div className="flex flex-wrap gap-1">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-2.5 py-1 bg-dark-700 rounded text-xs text-dark-300"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-dark-300 hover:text-dark-50 mb-6 min-h-[44px]"
      >
        <ArrowLeft size={20} />
        返回
      </button>

      <h1 className="text-3xl font-bold font-display text-dark-50 mb-8">商品对比</h1>

      <div className="relative">
        <div className="table-scroll-container">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-dark-700/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-200 w-40 sticky left-0 bg-dark-800 z-10">
                  参数
                </th>
                {products.map((product) => (
                  <th
                    key={product.id}
                    className="px-6 py-4 text-center min-w-[200px] relative"
                  >
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2 p-1 text-dark-500 hover:text-accent-400 rounded-full hover:bg-dark-600/50 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      <X size={16} />
                    </button>
                    <div className="flex flex-col items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-lg object-cover mb-3"
                      />
                      <p className="text-xs text-primary-400 font-medium">{product.brand}</p>
                      <p className="text-sm font-semibold text-dark-50 line-clamp-2">{product.name}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareParams.map((param, rowIndex) => {
                const Icon = param.icon;
                return (
                  <tr
                    key={param.key}
                    className={`border-b border-dark-700 ${
                      rowIndex % 2 === 0 ? 'bg-dark-800/30' : 'bg-dark-800/50'
                    }`}
                  >
                    <td className="px-6 py-4 sticky left-0 bg-dark-800 z-10">
                      <div className="flex items-center gap-2 text-dark-300">
                        <Icon size={18} />
                        <span className="font-medium">{param.label}</span>
                      </div>
                    </td>
                    {products.map((product) => {
                      const value = (product as unknown as Record<string, unknown>)[param.key];
                      const isBest = isBestValue(product, param.key);

                      return (
                        <td key={product.id} className="px-6 py-4 text-center">
                          {param.isBar && typeof value === 'number' ? (
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-full max-w-[140px] h-3 bg-dark-600 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(value / 10) * 100}%` }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                  className={`h-full rounded-full ${
                                    isBest ? 'bg-gradient-to-r from-accent-500 to-orange-500' : 'bg-primary-500'
                                  }`}
                                />
                              </div>
                              <span className={`text-sm font-medium ${isBest ? 'text-accent-400' : 'text-dark-200'}`}>
                                {value}/10
                                {isBest && <CheckCircle2 size={14} className="inline ml-1" />}
                              </span>
                            </div>
                          ) : param.isTags && Array.isArray(value) ? (
                            <div className="flex justify-center gap-1.5 flex-wrap">
                              {value.map((s: string) => (
                                <span
                                  key={s}
                                  className="text-xs px-2.5 py-1 bg-dark-600 rounded-full text-dark-200"
                                >
                                  {seasonLabels[s]}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className={`text-lg font-semibold ${isBest ? 'text-accent-400' : 'text-dark-100'}`}>
                              {param.format ? param.format(value as number) : String(value)}
                              {isBest && <CheckCircle2 size={16} className="inline ml-1" />}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr className="bg-dark-700/30">
                <td className="px-6 py-4 sticky left-0 bg-dark-800 z-10">
                  <span className="font-medium text-dark-300">可用尺码</span>
                </td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4">
                    <div className="flex justify-center gap-1.5 flex-wrap">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 bg-dark-700 rounded text-sm text-dark-200"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="bg-dark-700/30">
                <td className="px-6 py-4 sticky left-0 bg-dark-800 z-10">
                  <span className="font-medium text-dark-300">描述</span>
                </td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4">
                    <p className="text-sm text-dark-400">{product.description}</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <p className="text-sm text-dark-500">
          <span className="inline-flex items-center gap-1 mr-4">
            <CheckCircle2 size={14} className="text-accent-400" />
            表示该参数最优
          </span>
          最多可对比 {maxProducts} 件商品
        </p>
      </div>
    </div>
  );
}
