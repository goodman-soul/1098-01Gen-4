import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bike, HardHat, Footprints, Hand, Scale, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { CompareBar } from './CompareBar';
import { useCompareStore } from '../store/useCompareStore';

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/helmet', icon: HardHat, label: '头盔' },
  { path: '/pants', icon: Bike, label: '骑行裤' },
  { path: '/shoes', icon: Footprints, label: '锁鞋' },
  { path: '/gloves', icon: Hand, label: '手套' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { products } = useCompareStore();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-dark-800/80 backdrop-blur-xl border-b border-dark-600/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Bike size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold font-display text-dark-50">骑行装备尺码馆</h1>
                <p className="text-xs text-dark-400">专业尺码推荐</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all min-h-[44px] ${
                      isActive
                        ? 'text-accent-400'
                        : 'text-dark-300 hover:text-dark-50 hover:bg-dark-700/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-accent-500/10 rounded-lg border border-accent-500/20"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/compare"
                className="relative px-4 py-2 bg-dark-700 rounded-lg flex items-center gap-2 text-dark-200 hover:bg-dark-600 transition-colors min-h-[44px]"
              >
                <Scale size={18} />
                <span className="hidden sm:inline text-sm">对比</span>
                {products.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 rounded-full text-xs font-bold text-white flex items-center justify-center">
                    {products.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-dark-200 hover:text-dark-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-dark-600/50 bg-dark-800"
          >
            <nav className="container mx-auto px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg flex items-center gap-3 min-h-[44px] ${
                      isActive
                        ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
                        : 'text-dark-300 hover:bg-dark-700/50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <CompareBar />

      <footer className="mt-20 border-t border-dark-600/50 bg-dark-800/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Bike size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold font-display text-dark-100">骑行装备尺码馆</p>
                <p className="text-xs text-dark-500">专业骑行装备尺码推荐工具</p>
              </div>
            </div>
            <p className="text-sm text-dark-500">
              © 2024 骑行装备尺码馆. 数据仅供参考，请以实际试穿为准。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
