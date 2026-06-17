import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, ArrowDown, Zap, Clock, Coffee } from 'lucide-react';
import { SizeSlider } from '../components/SizeSlider';
import { SizeTable } from '../components/SizeTable';
import { RecommendationCard } from '../components/RecommendationCard';
import { ProductCard } from '../components/ProductCard';
import { OptionSelector } from '../components/OptionSelector';
import { usePantsRecommendation } from '../hooks/useSizeRecommendation';
import { pantsSizes, products, fitTypeLabels } from '../data/mockData';

export function Pants() {
  const [waist, setWaist] = useState(80);
  const [hip, setHip] = useState(96);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [fitType, setFitType] = useState<'racing' | 'endurance' | 'casual'>('endurance');
  
  const recommendations = usePantsRecommendation(waist, hip, height, weight, fitType);
  const pantsProducts = products.filter(p => p.category === 'pants');

  const fitOptions = [
    { value: 'racing' as const, label: '竞速', description: '紧身剪裁，减少风阻', icon: <Zap size={20} /> },
    { value: 'endurance' as const, label: '长途', description: '舒适优先，长时间骑行', icon: <Clock size={20} /> },
    { value: 'casual' as const, label: '休闲', description: '宽松舒适，日常骑行', icon: <Coffee size={20} /> },
  ];

  const tableColumns = [
    { key: 'size', header: '尺码', width: '15%' },
    { key: 'waist', header: '腰围 (cm)', width: '20%' },
    { key: 'hip', header: '臀围 (cm)', width: '20%' },
    { key: 'height', header: '身高 (cm)', width: '20%' },
    { key: 'weight', header: '体重 (kg)', width: '25%' },
  ];

  const currentFitSizes = pantsSizes.filter(s => s.fitType === fitType);
  const tableData = currentFitSizes.map(s => ({
    size: s.size,
    waist: `${s.waist[0]} - ${s.waist[1]}`,
    hip: `${s.hip[0]} - ${s.hip[1]}`,
    height: `${s.height[0]} - ${s.height[1]}`,
    weight: `${s.weight[0]} - ${s.weight[1]}`,
  }));

  const recommendedSize = recommendations[0]?.recommendedSize;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-orange-600 flex items-center justify-center">
          <Bike size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-display text-dark-50">骑行裤尺码推荐</h1>
          <p className="text-dark-400">多维度参数综合评估，找到最适合您的骑行裤</p>
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
                value={waist}
                onChange={setWaist}
                min={68}
                max={100}
                step={1}
                unit="cm"
                label="腰围"
                description="肚脐上方最细处水平一周"
              />

              <SizeSlider
                value={hip}
                onChange={setHip}
                min={84}
                max={112}
                step={1}
                unit="cm"
                label="臀围"
                description="臀部最丰满处水平一周"
              />

              <SizeSlider
                value={height}
                onChange={setHeight}
                min={155}
                max={195}
                step={1}
                unit="cm"
                label="身高"
                description="赤脚身高"
              />

              <SizeSlider
                value={weight}
                onChange={setWeight}
                min={50}
                max={95}
                step={1}
                unit="kg"
                label="体重"
                description="当前体重"
              />

              <div className="pt-2">
                <OptionSelector
                  options={fitOptions}
                  value={fitType}
                  onChange={(v) => setFitType(v as 'racing' | 'endurance' | 'casual')}
                  label="骑行习惯"
                />
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
                ({fitTypeLabels[fitType]}版型)
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
              title={`${fitTypeLabels[fitType]}版型尺码表`}
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
          {pantsProducts.map((product) => (
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
