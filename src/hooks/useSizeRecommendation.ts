import { useMemo } from 'react';
import { helmetSizes, pantsSizes, shoesSizes, glovesSizes } from '../data/mockData';
import { RecommendationResult } from '../types';

function findBestFit<T extends { size: string }>(
  sizes: T[],
  value: number,
  getRange: (s: T) => [number, number]
): { size: T; confidence: 'perfect' | 'good' | 'borderline' } | null {
  for (const size of sizes) {
    const [min, max] = getRange(size);
    const mid = (min + max) / 2;
    const range = max - min;
    
    if (value >= min && value <= max) {
      const distanceFromMid = Math.abs(value - mid);
      const relativeDistance = distanceFromMid / (range / 2);
      
      let confidence: 'perfect' | 'good' | 'borderline';
      if (relativeDistance < 0.3) {
        confidence = 'perfect';
      } else if (relativeDistance < 0.7) {
        confidence = 'good';
      } else {
        confidence = 'borderline';
      }
      
      return { size, confidence };
    }
  }
  
  let closestSize: T | null = null;
  let minDistance = Infinity;
  
  for (const size of sizes) {
    const [min, max] = getRange(size);
    let distance: number;
    if (value < min) {
      distance = min - value;
    } else {
      distance = value - max;
    }
    
    if (distance < minDistance) {
      minDistance = distance;
      closestSize = size;
    }
  }
  
  return closestSize ? { size: closestSize, confidence: 'borderline' } : null;
}

export function useHelmetRecommendation(headCircumference: number): RecommendationResult[] {
  return useMemo(() => {
    const brands = [...new Set(helmetSizes.map(s => s.brand))];
    const results: RecommendationResult[] = [];
    
    for (const brand of brands) {
      const brandSizes = helmetSizes.filter(s => s.brand === brand);
      const fit = findBestFit(brandSizes, headCircumference, s => s.headCircumference);
      
      if (fit) {
        const alternatives = brandSizes
          .filter(s => s.size !== fit.size.size)
          .map(s => s.size);
        
        const tips: string[] = [];
        if (fit.confidence === 'borderline') {
          tips.push('您的头围接近尺码边缘，建议试戴或考虑相邻尺码');
        }
        tips.push('佩戴时头盔应水平，前沿距眉毛约2指宽');
        
        results.push({
          recommendedSize: fit.size.size,
          sizeRange: fit.size.headCircumference,
          sizeRangeUnit: 'cm',
          brand,
          confidence: fit.confidence,
          alternativeSizes: alternatives,
          tips,
        });
      }
    }
    
    return results.sort((a, b) => {
      const order = { perfect: 0, good: 1, borderline: 2 };
      return order[a.confidence] - order[b.confidence];
    });
  }, [headCircumference]);
}

export function usePantsRecommendation(
  waist: number,
  hip: number,
  height: number,
  weight: number,
  fitType: 'racing' | 'endurance' | 'casual'
): RecommendationResult[] {
  return useMemo(() => {
    const fitSizes = pantsSizes.filter(s => s.fitType === fitType);
    const results: RecommendationResult[] = [];
    
    for (const size of fitSizes) {
      let matchCount = 0;
      let borderlineCount = 0;
      
      const checkParam = (value: number, range: [number, number]) => {
        if (value >= range[0] && value <= range[1]) {
          const mid = (range[0] + range[1]) / 2;
          const dist = Math.abs(value - mid) / ((range[1] - range[0]) / 2);
          if (dist < 0.7) {
            matchCount++;
          } else {
            borderlineCount++;
          }
          return true;
        }
        return false;
      };
      
      const waistMatch = checkParam(waist, size.waist);
      const hipMatch = checkParam(hip, size.hip);
      const heightMatch = checkParam(height, size.height);
      const weightMatch = checkParam(weight, size.weight);
      
      if (waistMatch || hipMatch || heightMatch || weightMatch) {
        const totalMatch = matchCount + borderlineCount;
        let confidence: 'perfect' | 'good' | 'borderline';
        
        if (matchCount >= 3) {
          confidence = 'perfect';
        } else if (matchCount >= 2 || totalMatch >= 3) {
          confidence = 'good';
        } else {
          confidence = 'borderline';
        }
        
        const tips: string[] = [];
        if (fitType === 'racing') {
          tips.push('竞速版型剪裁偏紧身，建议选择时考虑压缩效果');
        } else if (fitType === 'endurance') {
          tips.push('长途版型舒适度优先，护垫较厚，建议预留空间');
        } else {
          tips.push('休闲版型相对宽松，日常骑行更舒适');
        }
        if (confidence === 'borderline') {
          tips.push('部分参数接近尺码边缘，建议参考实际试穿');
        }
        
        results.push({
          recommendedSize: size.size,
          sizeRange: size.waist,
          sizeRangeUnit: 'cm',
          brand: '标准尺码',
          confidence,
          tips,
        });
      }
    }
    
    return results.sort((a, b) => {
      const order = { perfect: 0, good: 1, borderline: 2 };
      return order[a.confidence] - order[b.confidence];
    }).slice(0, 2);
  }, [waist, hip, height, weight, fitType]);
}

export function useShoesRecommendation(
  footLength: number,
  footWidth: number,
  needWide: boolean
): RecommendationResult[] {
  return useMemo(() => {
    const filteredSizes = needWide 
      ? shoesSizes.filter(s => s.wideVersion)
      : shoesSizes.filter(s => !s.wideVersion);
    
    const results: RecommendationResult[] = [];
    
    for (const size of filteredSizes) {
      const lengthFit = footLength >= size.footLength[0] && footLength <= size.footLength[1];
      const widthFit = footWidth >= size.footWidth[0] && footWidth <= size.footWidth[1];
      
      if (lengthFit || widthFit) {
        const lengthMid = (size.footLength[0] + size.footLength[1]) / 2;
        const lengthDist = Math.abs(footLength - lengthMid) / ((size.footLength[1] - size.footLength[0]) / 2);
        
        let confidence: 'perfect' | 'good' | 'borderline';
        if (lengthFit && widthFit && lengthDist < 0.5) {
          confidence = 'perfect';
        } else if ((lengthFit && widthFit) || lengthDist < 0.7) {
          confidence = 'good';
        } else {
          confidence = 'borderline';
        }
        
        const tips: string[] = [];
        if (needWide) {
          tips.push('宽版鞋楦适合脚宽超过105mm的骑友');
        }
        tips.push('建议下午测量脚长，此时脚部略有肿胀，尺码更准确');
        tips.push('穿上骑行袜后再测量，预留约5mm空间');
        if (confidence === 'borderline') {
          tips.push('您的脚型参数接近尺码边界，建议大半码');
        }
        
        results.push({
          recommendedSize: size.size,
          sizeRange: size.footLength,
          sizeRangeUnit: 'mm',
          brand: '标准欧码',
          confidence,
          tips,
        });
      }
    }
    
    return results.sort((a, b) => {
      const order = { perfect: 0, good: 1, borderline: 2 };
      return order[a.confidence] - order[b.confidence];
    }).slice(0, 2);
  }, [footLength, footWidth, needWide]);
}

export function useGlovesRecommendation(
  handLength: number,
  handCircumference: number,
  padding: 'light' | 'medium' | 'thick'
): RecommendationResult[] {
  return useMemo(() => {
    const fitSizes = glovesSizes.filter(s => s.padding === padding);
    const results: RecommendationResult[] = [];
    
    for (const size of fitSizes) {
      const lengthFit = handLength >= size.handLength[0] && handLength <= size.handLength[1];
      const circumFit = handCircumference >= size.handCircumference[0] && handCircumference <= size.handCircumference[1];
      
      if (lengthFit || circumFit) {
        let confidence: 'perfect' | 'good' | 'borderline';
        if (lengthFit && circumFit) {
          confidence = 'perfect';
        } else if (lengthFit || circumFit) {
          confidence = 'good';
        } else {
          confidence = 'borderline';
        }
        
        const tips: string[] = [];
        if (padding === 'light') {
          tips.push('薄衬垫手套适合追求路感的竞速骑行');
        } else if (padding === 'medium') {
          tips.push('中等衬垫兼顾舒适性和操控感');
        } else {
          tips.push('厚衬垫适合长距离骑行，减震效果更好');
        }
        tips.push('手套应贴合但不紧绷，手指能自由弯曲');
        
        results.push({
          recommendedSize: size.size,
          sizeRange: size.handCircumference,
          sizeRangeUnit: 'cm',
          brand: '标准尺码',
          confidence,
          tips,
        });
      }
    }
    
    return results.sort((a, b) => {
      const order = { perfect: 0, good: 1, borderline: 2 };
      return order[a.confidence] - order[b.confidence];
    }).slice(0, 2);
  }, [handLength, handCircumference, padding]);
}
