import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hand, ArrowDown, Wind, Shield, Thermometer } from 'lucide-react';
import { SizeSlider } from '../components/SizeSlider';
import { SizeTable } from '../components/SizeTable';
import { RecommendationCard } from '../components/RecommendationCard';
import { ProductCard } from '../components/ProductCard';
import { OptionSelector } from '../components/OptionSelector';
import { useGlovesRecommendation } from '../hooks/useSizeRecommendation';
import { glovesSizes, products, paddingLabels } from '../data/mockData';

export function Gloves() {
  const [handLength, setHandLength] = useState(18);
  const [handCircumference, setHandCircumference] = useState(20);
  const [padding, setPadding] = useState<'light' | 'medium' | 'thick'>('medium');
  
  const recommendations = useGlovesRecommendation(handLength, handCircumference, padding);
  const glovesProducts = products.filter(p => p.category === 'gloves');

  const paddingOptions = [
    { value: 'light' as const, label: '薄衬垫', description: '追求路感，竞速骑行', icon: <Wind size={20} /> },
    { value: 'medium' as const, label: '中衬垫', description: '兼顾舒适与操控', icon: <Shield size={20} /> },
    { value: 'thick' as const, label: '厚衬垫', description: '长距离骑行，减震优先', icon: <Thermometer size={20} /> },
  ];

  const tableColumns = [
    { key: 'size', header: '尺码', width: '20%' },
    { key: 'handLength', header: '手长 (cm)', width: '30%' },
    { key: 'handCircumference', header: '手围 (cm)', width: '30%' },
    { key: 'padding', header: '衬垫', width: '20%' },
  ];

  const currentPaddingSizes = glovesSizes.filter(s => s.padding === padding);
  const tableData = currentPaddingSizes.map(s => ({
    size: s.size,
    handLength: `${s.handLength[0]} - ${s.handLength[1]}`,
    handCircumference: `${s.handCircumference[0]} - ${s.handCircumference[1]}`,
    padding: paddingLabels[s.padding],
  }));

  const recommendedSize = recommendations[0]?.recommendedSize;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400 to-primary-500 flex items-center justify-center">
          <Hand size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-display text-dark-50">手套尺码推荐</h1>
          <p className="text-dark-400">手长手围测量，根据骑行习惯推荐合适衬垫</p>
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
            
            <div className="space-y-6">
              <SizeSlider
                value={handLength}
                onChange={setHandLength}
                min={16}
                max={22}
                step={0.5}
                unit="cm"
                label="手长"
                description="手腕横纹到中指指尖的距离"
              />

              <SizeSlider
                value={handCircumference}
                onChange={setHandCircumference}
                min={18}
                max={24}
                step={0.5}
                unit="cm"
                label="手围"
                description="手掌最宽处（不含拇指）一周"
              />

              <div className="pt-2">
                <OptionSelector
                  options={paddingOptions}
                  value={padding}
                  onChange={(v) => setPadding(v as 'light' | 'medium' | 'thick')}
                  label="衬垫厚度"
                />
              </div>

              <div className="p-4 bg-dark-700/50 rounded-lg">
                <h4 className="text-sm font-medium text-dark-200 mb-2">测量方法</h4>
                <ol className="text-sm text-dark-400 space-y-1 list-decimal list-inside">
                  <li>手伸直，测量手腕横纹到中指尖</li>
                  <li>将软尺绕手掌最宽处一周</li>
                  <li>不要包含拇指在内测量</li>
                  <li>测量时手自然放松</li>
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
              <span className="ml-2 text-sm font-normal text-dark-400">
                ({paddingLabels[padding]})
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <RecommendationCard key={index} result={rec} delay={index * 0.1} />
              ))}
            </div>
          </div>

          <div className="card p-6">
            <SizeTable
              columns={tableColumns}
              data={tableData}
              title={`${paddingLabels[padding]}尺码表`}
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
          {glovesProducts.map((product) => (
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
