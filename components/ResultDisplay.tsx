
import React from 'react';
import { PredictionResult, ChartDataPoint } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle, CheckCircle2, Activity, RefreshCw, Zap, ClipboardList } from 'lucide-react';

interface Props {
  result: PredictionResult;
  onReset: () => void;
}

export const ResultDisplay: React.FC<Props> = ({ result, onReset }) => {
  const chartData: ChartDataPoint[] = [
    { name: 'Random Forest', value: Math.round(result.rfProb * 100) },
    { name: 'XGBoost', value: Math.round(result.xgbProb * 100) },
    { name: 'Hybrid Ensemble', value: Math.round(result.hybridScore * 100) },
  ];

  const riskStyles = {
    High: { color: 'text-rose-400', border: 'border-rose-500/20', bg: 'bg-rose-500/5', icon: <AlertCircle className="w-8 h-8 text-rose-400" /> },
    Moderate: { color: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/5', icon: <Activity className="w-8 h-8 text-amber-400" /> },
    Low: { color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', icon: <CheckCircle2 className="w-8 h-8 text-emerald-400" /> },
  }[result.riskCategory];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Main Score Card */}
      <div className={`p-8 rounded-[2.5rem] glass border ${riskStyles.border} ${riskStyles.bg} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Zap className="w-32 h-32" />
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Predictive Diagnostics</p>
            <h2 className="text-4xl font-black tracking-tight">
              {result.riskCategory} <span className="font-light opacity-50">Risk Profile</span>
            </h2>
          </div>
          <div className="p-4 bg-black/20 rounded-2xl backdrop-blur-md">
            {riskStyles.icon}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
             <p className="text-xs text-slate-500 font-medium mb-1">Ensemble Confidence</p>
             <p className="text-3xl font-mono font-bold tracking-tighter">{(result.hybridScore * 100).toFixed(1)}%</p>
          </div>
          <div className="p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/10 flex items-center gap-4">
             <div className="p-2 bg-indigo-500/20 rounded-lg">
                <ClipboardList className="w-5 h-5 text-indigo-400" />
             </div>
             <p className="text-sm text-slate-300 leading-relaxed italic line-clamp-2">
                "{result.aiAnalysis}"
             </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Model Voting Comparison */}
        <div className="glass p-6 rounded-[2rem] border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" /> Ensemble Voting
            </h3>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#6366f1' : '#1e293b'} stroke={index === 2 ? '#818cf8' : '#334155'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Attribution */}
        <div className="glass p-6 rounded-[2rem] border border-white/5">
          <h3 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" /> Primary Drivers
          </h3>
          <div className="space-y-3">
            {result.contributingFactors.map((factor, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5 transition-colors hover:bg-white/10">
                <span className="text-xs font-black text-indigo-500 w-4">{idx + 1}</span>
                <span className="text-sm text-slate-300 font-medium">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass p-8 rounded-[2rem] border border-white/5">
        <h3 className="font-bold text-slate-300 mb-6">AI-Generated Patient Care Plan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.recommendations.map((rec, idx) => (
            <div key={idx} className="flex gap-4 p-5 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              <p className="text-sm text-slate-300 leading-snug font-light">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-5 rounded-3xl border border-white/5 bg-slate-900/40 hover:bg-slate-800/60 transition-all text-slate-400 font-semibold flex items-center justify-center gap-3 active:scale-[0.98]"
      >
        <RefreshCw className="w-4 h-4" /> Reset Clinical Input
      </button>
    </div>
  );
};
