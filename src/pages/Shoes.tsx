import { useState } from 'react';
import { motion } from 'framer-motion';
import { Footprints, ArrowDown, MoveHorizontal } from 'lucide-react';
import { SizeSlider } from '../components/SizeSlider';
import { SizeTable } from '../components/SizeTable';
import { RecommendationCard } from '../components/RecommendationCard';
import { ProductCard } from '../components/ProductCard';
import { OptionSelector } from '../components/OptionSelector';
import { useShoesRecommendation } from '../hooks/useSizeRecommendation';
import { shoesSizes, products } from '../data/mockData';

export function Shoes() {
  const [footLength, setFootLength] = useState(265);
  const [footWidth, setFootWidth] = useState(100);
  const [needWide, setNeedWide] = useState<'standard' | 'wide'>('standard');
  
  const recommendations = useShoesRecommendation(footLength, footWidth, needWide === 'wide');
  const shoesProducts = products.filter(p => p.category === 'shoes');

  const widthOptions = [
    { value: 'standard' as const, label: '标准版', description: '适合正常脚宽', icon: <Footprints size={20} /> },
    { value: 'wide' as const, label: '宽版', description: '适合脚宽大于105mm', icon: <MoveHorizontal size={20} /> },
  ];

  const tableColumns = [
    { key: 'size', header: '尺码', width: '18%' },
    { key: 'euSize', header: '欧码', width: '15%' },
    { key: 'footLength', header: '脚长 (mm)', width: '25%' },
    { key: 'footWidth', header: '脚宽 (mm)', width: '25%' },
    { key: 'wide', header: '宽版', width: '17%' },
  ];

  const filteredSizes = needWide ? shoesSizes.filter(s => s.wideVersion) : shoesSizes.filter(s => !s.wideVersion);
  const tableData = filteredSizes.map(s => ({
    size: s.size,
    euSize: s.euSize,
    footLength: `${s.footLength[0]} - ${s.footLength[1]}`,
    footWidth: `${s.footWidth[0]} - ${s.footWidth[1]}`,
    wide: s.wideVersion ? '✓' : '',
  }));

  const recommendedSize = recommendations[0]?.recommendedSize;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
          <Footprints size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-display text-dark-50">锁鞋尺码推荐</h1>
          <p className="text-dark-400">脚长脚宽双维度测量，精准推荐锁鞋尺码</p>
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
                value={footLength}
                onChange={setFootLength}
                min={240}
                max={290}
                step={1}
                unit="mm"
                label="脚长"
                description="脚跟到最长脚趾的距离"
              />

              <SizeSlider
                value={footWidth}
                onChange={setFootWidth}
                min={90}
                max={120}
                step={1}
                unit="mm"
                label="脚宽"
                description="前脚掌最宽处的距离"
              />

              <div className="pt-2">
                <OptionSelector
                  options={widthOptions}
                  value={needWide}
                  onChange={(v) => setNeedWide(v as 'standard' | 'wide')}
                  label="鞋楦宽度"
                />
              </div>

              <div className="p-4 bg-dark-700/50 rounded-lg">
                <h4 className="text-sm font-medium text-dark-200 mb-2">测量方法</h4>
                <ol className="text-sm text-dark-400 space-y-1 list-decimal list-inside">
                  <li>将脚放在纸上，脚跟贴墙</li>
                  <li>用笔标记最长脚趾位置</li>
                  <li>测量脚跟到标记的距离</li>
                  <li>同样方法测量脚宽</li>
                  <li>建议穿上骑行袜测量</li>
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
              title={needWide === 'wide' ? '宽版尺码表' : '标准版尺码表'}
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
          {shoesProducts.map((product) => (
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
