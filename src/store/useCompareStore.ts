import { create } from 'zustand';
import { Product } from '../types';

interface CompareStore {
  products: Product[];
  maxProducts: number;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
  isSelected: (productId: string) => boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  products: [],
  maxProducts: 4,
  
  addProduct: (product: Product) => {
    const { products, maxProducts } = get();
    if (products.length >= maxProducts) return;
    if (products.some(p => p.id === product.id)) return;
    
    set(state => ({
      products: [...state.products, product],
    }));
  },
  
  removeProduct: (productId: string) => {
    set(state => ({
      products: state.products.filter(p => p.id !== productId),
    }));
  },
  
  clearProducts: () => {
    set({ products: [] });
  },
  
  isSelected: (productId: string) => {
    return get().products.some(p => p.id === productId);
  },
}));
