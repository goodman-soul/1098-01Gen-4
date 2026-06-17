import { useState } from 'react';
import { motion } from 'framer-motion';
import { HardHat, ArrowDown } from 'lucide-react';
import { SizeSlider } from '../components/SizeSlider';
import { SizeTable } from '../components/SizeTable';
import { RecommendationCard } from '../components/RecommendationCard';
import { ProductCard } from '../components/ProductCard';
import { useHelmetRecommendation } from '../hooks/useSizeRecommendation';
import { helmetSizes, products } from '../data/mockData';

export function Helmet() {
  const [headCircumference, setHeadCircumference] = useState(57);
  const recommendations = useHelmetRecommendation(headCircumference);
  const helmetProducts = products.filter(p => p.category === 'helmet');

  const tableColumns = [
    { key: 'brand', header: '品牌', width: '20%' },
    { key: 'size', header: '尺码', width: '15%' },
    { key: 'range', header: '头围范围 (cm)', width: '35%' },
    { key: 'fit', header: '贴合度', width: '30%' },
  ];

  const tableData = helmetSizes.map(s => ({
    brand: s.brand,
    size: s.size,
    range: `${s.headCircumference[0]} - ${s.headCircumference[1]}`,
    fit: headCircumference >= s.headCircumference[0] && headCircumference <= s.headCircumference[1] ? '✓ 合适' : '',
  }));

  const recommendedSize = recommendations[0]?.recommendedSize;

  const highlightRow = (row: Record<string, string | number>) => {
    return row.fit === '✓ 合适';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <HardHat size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-display text-dark-50">头盔尺码推荐</h1>
          <p className="text-dark-400">根据您的头围，为您推荐最合适的头盔尺码</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-semibold font-display text-dark-50 mb-6">输入您的参数</h2>
            
            <div className="space-y-8">
              <SizeSlider
                value={headCircumference}
                onChange={setHeadCircumference}
                min={51}
                max={64}
                step={1}
                unit="cm"
                label="头围"
                description="眉毛上方绕头部最宽处一周"
              />

              <div className="p-4 bg-dark-700/50 rounded-lg">
                <h4 className="text-sm font-medium text-dark-200 mb-2">测量方法</h4>
                <ol className="text-sm text-dark-400 space-y-1 list-decimal list-inside">
                  <li>使用软尺沿眉毛上方绕头部一周</li>
                  <li>经过后脑勺最突出的位置</li>
                  <li>保持软尺水平，不要过紧</li>
                  <li>读数精确到厘米</li>
                </ol>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          <div>
            <h2 className="text-xl font-semibold font-display text-dark-50 mb-6 flex items-center gap-2">
              <ArrowDown size={20} className="text-accent-400" />
              推荐结果
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <RecommendationCard key={rec.brand} result={rec} delay={index * 0.1} />
              ))}
            </div>
          </div>

          <div className="card p-6">
            <SizeTable
              columns={tableColumns}
              data={tableData}
              highlightRow={highlightRow}
              title="尺码对照表"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold font-display text-dark-50 mb-6">推荐商品</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {helmetProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              recommendedSize={recommendedSize}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
