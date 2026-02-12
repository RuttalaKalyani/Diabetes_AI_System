
export interface DiabetesFeatures {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  dpf: number;
  age: number;
}

export interface PredictionResult {
  hybridScore: number;
  rfProb: number;
  xgbProb: number;
  riskCategory: 'Low' | 'Moderate' | 'High';
  contributingFactors: string[];
  recommendations: string[];
  aiAnalysis: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}
