export interface HelmetSize {
  size: string;
  headCircumference: [number, number];
  brand: string;
}

export interface PantsSize {
  size: string;
  waist: [number, number];
  hip: [number, number];
  height: [number, number];
  weight: [number, number];
  fitType: 'racing' | 'endurance' | 'casual';
}

export interface ShoesSize {
  size: string;
  euSize: number;
  footLength: [number, number];
  footWidth: [number, number];
  wideVersion: boolean;
}

export interface GlovesSize {
  size: string;
  handLength: [number, number];
  handCircumference: [number, number];
  padding: 'light' | 'medium' | 'thick';
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type ProductCategory = 'helmet' | 'pants' | 'shoes' | 'gloves';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  weight: number;
  breathability: number;
  seasons: Season[];
  image: string;
  sizes: string[];
  description: string;
}

export interface RecommendationResult {
  recommendedSize: string;
  sizeRange: [number, number];
  sizeRangeUnit: 'cm' | 'mm';
  brand: string;
  confidence: 'perfect' | 'good' | 'borderline';
  alternativeSizes?: string[];
  tips?: string[];
}

export interface CompareState {
  products: Product[];
  maxProducts: number;
}
