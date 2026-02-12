
import { DiabetesFeatures } from '../types';

/**
 * Simulates a Random Forest Classifier logic based on Pima Dataset patterns
 * Random Forest typically handles structural variance well.
 */
const simulateRandomForest = (data: DiabetesFeatures): number => {
  let score = 0;
  
  // Weights based on Pima feature importance
  if (data.glucose > 140) score += 0.4;
  else if (data.glucose > 120) score += 0.2;
  
  if (data.bmi > 30) score += 0.2;
  if (data.age > 45) score += 0.15;
  if (data.dpf > 0.5) score += 0.15;
  if (data.pregnancies > 5) score += 0.1;
  
  return Math.min(Math.max(score, 0.05), 0.95);
};

/**
 * Simulates an XGBoost logic focusing on pattern boosting and non-linear residuals
 */
const simulateXGBoost = (data: DiabetesFeatures): number => {
  let score = 0;
  
  // XGBoost picks up more interaction effects
  if (data.glucose > 150 && data.bmi > 35) score += 0.5;
  else if (data.glucose > 130) score += 0.25;
  
  if (data.insulin > 200) score += 0.15;
  if (data.age > 50 && data.bloodPressure > 90) score += 0.2;
  if (data.skinThickness > 40) score += 0.1;
  
  return Math.min(Math.max(score, 0.03), 0.98);
};

/**
 * Hybrid Ensemble: Averages the probability outputs
 */
export const runHybridPrediction = (data: DiabetesFeatures): { rf: number; xgb: number; hybrid: number } => {
  const rf = simulateRandomForest(data);
  const xgb = simulateXGBoost(data);
  const hybrid = (rf + xgb) / 2;
  
  return { rf, xgb, hybrid };
};
