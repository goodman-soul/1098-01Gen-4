# 骑行装备尺码馆

一个专业的骑行装备尺码推荐工具，帮助骑行爱好者快速找到合适的头盔、骑行裤、锁鞋和手套尺码。

## ✨ 功能特色

### 🎯 智能尺码推荐
- **头盔**：基于头围参数，支持 Giro、Specialized、MET 等多品牌尺码对比
- **骑行裤**：腰围、臀围、身高、体重四维参数匹配，支持竞速/长途/休闲三种版型
- **锁鞋**：脚长、脚宽双维度测量，标准版/宽版可选
- **手套**：手长、手围精准匹配，薄/中/厚三种衬垫选择

### ⚖️ 商品对比功能
- 最多 4 件商品同时对比
- 对比维度：价格、重量、透气性、适合季节
- 自动标记最优参数
- 可视化透气度进度条

### 📱 移动端友好
- 响应式布局，768px 断点自动切换
- 尺码表移动端卡片堆叠布局，避免横向挤压
- 所有可点击元素 ≥ 44x44px，符合移动端标准
- 流畅的横向滚动和触摸体验

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | 前端框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 6.x | 构建工具 |
| TailwindCSS | 3.x | 样式框架 |
| React Router | 6.x | 路由管理 |
| Framer Motion | 11.x | 动画库 |
| Zustand | 4.x | 状态管理 |
| Lucide React | 0.x | 图标库 |

## 📦 项目结构

```
src/
├── components/          # 共享组件
│   ├── Layout.tsx       # 页面布局
│   ├── SizeSlider.tsx   # 参数滑块
│   ├── SizeTable.tsx    # 自适应尺码表
│   ├── OptionSelector.tsx # 选项选择器
│   ├── RecommendationCard.tsx # 推荐结果卡片
│   ├── ProductCard.tsx  # 商品卡片
│   └── CompareBar.tsx   # 对比栏
├── pages/               # 页面组件
│   ├── Home.tsx         # 首页
│   ├── Helmet.tsx       # 头盔推荐
│   ├── Pants.tsx        # 骑行裤推荐
│   ├── Shoes.tsx        # 锁鞋推荐
│   ├── Gloves.tsx       # 手套推荐
│   └── Compare.tsx      # 商品对比
├── hooks/               # 自定义 Hooks
│   └── useSizeRecommendation.ts # 尺码推荐算法
├── store/               # 状态管理
│   └── useCompareStore.ts # 对比列表状态
├── data/                # Mock 数据
│   └── mockData.ts      # 尺码数据和商品数据
├── types/               # TypeScript 类型定义
│   └── index.ts
├── App.tsx              # 应用入口
└── index.css            # 全局样式
```

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run check

# 生产构建
npm run build

# 预览生产版本
npm run preview
```

## 📐 尺码推荐算法

### 核心逻辑
1. **范围匹配**：检查输入参数是否落在尺码范围内
2. **置信度评估**：
   - **完美匹配**：参数接近范围中点（< 30%）
   - **合适**：参数在范围内但偏离中点（< 70%）
   - **接近边缘**：参数在范围边缘或接近边界
3. **多参数综合**：骑行裤等多参数装备采用加权匹配

### 移动端适配策略

1. **尺码表自适应**
   - 桌面端：传统表格布局
   - 移动端（< 768px）：卡片堆叠布局，label: value 形式

2. **横向滚动容器**
   - `overflow-x: auto` + `-webkit-overflow-scrolling: touch`
   - 隐藏滚动条，保留滑动手感

3. **触摸优化**
   - 触控区域最小 44x44px
   - `touch-action: manipulation` 消除点击延迟

## 🎨 设计规范

### 配色方案
- **主色**：深蓝 `#0A2444`（专业、科技感）
- **强调色**：活力橙 `#E66A2C`（运动、活力）
- **深色背景**：`#0F0F1A`（减少视觉疲劳）

### 字体
- 标题：Chakra Petch（运动风格）
- 正文：Noto Sans SC（中文阅读友好）

## 📄 License

MIT License
