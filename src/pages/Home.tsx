import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HardHat, Bike, Footprints, Hand, ArrowRight, Ruler, Info } from 'lucide-react';

const categories = [
  {
    path: '/helmet',
    icon: HardHat,
    title: '头盔尺码',
    description: '根据头围精准推荐，确保安全舒适',
    gradient: 'from-primary-500 to-primary-700',
    param: '头围',
  },
  {
    path: '/pants',
    icon: Bike,
    title: '骑行裤尺码',
    description: '腰围、臀围、身高、体重综合评估',
    gradient: 'from-accent-500 to-orange-600',
    param: '腰围',
  },
  {
    path: '/shoes',
    icon: Footprints,
    title: '锁鞋尺码',
    description: '脚长脚宽双维度，支持宽版推荐',
    gradient: 'from-primary-400 to-accent-500',
    param: '脚长',
  },
  {
    path: '/gloves',
    icon: Hand,
    title: '手套尺码',
    description: '手长手围测量，不同衬垫厚度可选',
    gradient: 'from-accent-400 to-primary-500',
    param: '手长',
  },
];

const tips = [
  { icon: Ruler, title: '精准测量', desc: '使用软尺紧贴皮肤测量，不要过紧或过松' },
  { icon: Info, title: '参考说明', desc: '尺码推荐仅供参考，建议结合实际试穿' },
];

export function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
          <span className="gradient-text">骑行装备</span>
          <br />
          <span className="text-dark-50">尺码馆</span>
        </h1>
        <p className="text-lg text-dark-300 max-w-2xl mx-auto">
          专业的骑行装备尺码推荐工具，根据您的身体参数和骑行习惯，
          为您精准推荐头盔、骑行裤、锁鞋和手套的合适尺码
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div key={category.path} variants={itemVariants}>
              <Link
                to={category.path}
                className="group block h-full"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="card p-8 h-full relative overflow-hidden"
                >
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${category.gradient} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity`} />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    
                    <h2 className="text-2xl font-bold font-display text-dark-50 mb-2">
                      {category.title}
                    </h2>
                    <p className="text-dark-400 mb-6">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-dark-500">
                        关键参数：<span className="text-primary-400 font-medium">{category.param}</span>
                      </span>
                      <div className="flex items-center gap-2 text-accent-400 font-medium group-hover:gap-3 transition-all">
                        开始测量
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-8 mb-12"
      >
        <h3 className="text-xl font-bold font-display text-dark-50 mb-6">测量小贴士</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-100 mb-1">{tip.title}</h4>
                  <p className="text-sm text-dark-400">{tip.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-dark-500 text-sm"
      >
        <p>提示：建议在下午测量，此时身体略有肿胀，尺码更准确</p>
        <p className="mt-1">如果您在两个尺码之间，建议选择较大的尺码</p>
      </motion.div>
    </div>
  );
}
