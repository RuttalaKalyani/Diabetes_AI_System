
import React, { useState, useCallback } from 'react';
import { PredictionForm } from './components/PredictionForm';
import { ResultDisplay } from './components/ResultDisplay';
import { DiabetesFeatures, PredictionResult } from './types';
import { runHybridPrediction } from './utils/mlEngine';
import { getAIExplanation } from './services/geminiService';
import { Activity, ShieldCheck, Heart, Info } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handlePredict = async (features: DiabetesFeatures) => {
    setLoading(true);
    
    // 1. Run local Hybrid ML logic
    const { rf, xgb, hybrid } = runHybridPrediction(features);
    
    // 2. Get AI Explanation from Gemini
    const aiData = await getAIExplanation(features, hybrid);
    
    const riskCategory = hybrid < 0.3 ? 'Low' : hybrid < 0.7 ? 'Moderate' : 'High';

    setResult({
      hybridScore: hybrid,
      rfProb: rf,
      xgbProb: xgb,
      riskCategory,
      contributingFactors: aiData.topFactors,
      recommendations: aiData.recommendations,
      aiAnalysis: aiData.analysis
    });
    
    setLoading(false);
  };

  const resetForm = () => {
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl glass border border-indigo-400/30">
            <Activity className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">DiaGuard <span className="text-indigo-400">AI</span></h1>
            <p className="text-slate-400 text-sm">Enhanced Hybrid Risk Prediction System</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-medium text-slate-300">
            <ShieldCheck className="w-4 h-4 text-green-400" /> Secure Data
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-medium text-slate-300">
            <Heart className="w-4 h-4 text-rose-400" /> Clinical Support
          </div>
        </div>
      </header>

      <main className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Input Form or Statistics */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Info className="w-24 h-24" />
            </div>
            <h2 className="text-xl font-bold mb-2">Patient Diagnostics</h2>
            <p className="text-slate-400 text-sm mb-8">Enter clinical metrics to calculate the hybrid risk score.</p>
            
            <PredictionForm onPredict={handlePredict} isLoading={loading} />
          </div>

          {!result && !loading && (
            <div className="p-6 glass rounded-2xl bg-indigo-500/5">
              <h3 className="font-semibold text-indigo-300 mb-2">How it works</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our system uses a dual-source learning architecture. It combines Random Forest (structural analysis) and XGBoost (pattern optimization) to create a robust risk profile, enhanced by Gemini XAI for interpretability.
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Results */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center py-20 glass rounded-3xl gap-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <Activity className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Analyzing Clinical Data...</h3>
                <p className="text-slate-400 text-sm animate-bounce">Consulting Hybrid Ensemble Experts</p>
              </div>
            </div>
          ) : result ? (
            <ResultDisplay result={result} onReset={resetForm} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-700/50 rounded-3xl text-slate-500">
              <Activity className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg">Waiting for Diagnostic Input</p>
              <p className="text-sm">Submit the form to generate a detailed AI report.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DiaGuard AI Health Systems. For informational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
