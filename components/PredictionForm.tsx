
import React, { useState } from 'react';
import { DiabetesFeatures } from '../types';
import { ChevronRight } from 'lucide-react';

interface Props {
  onPredict: (features: DiabetesFeatures) => void;
  isLoading: boolean;
}

const initialValues: DiabetesFeatures = {
  pregnancies: 0,
  glucose: 120,
  bloodPressure: 80,
  skinThickness: 20,
  insulin: 80,
  bmi: 25,
  dpf: 0.5,
  age: 30
};

export const PredictionForm: React.FC<Props> = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState<DiabetesFeatures>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const inputFields = [
    { name: 'pregnancies', label: 'Pregnancies', min: 0, max: 20, unit: 'count' },
    { name: 'glucose', label: 'Glucose', min: 0, max: 300, unit: 'mg/dL' },
    { name: 'bloodPressure', label: 'Blood Pressure', min: 0, max: 200, unit: 'mm Hg' },
    { name: 'skinThickness', label: 'Skin Thickness', min: 0, max: 100, unit: 'mm' },
    { name: 'insulin', label: 'Insulin', min: 0, max: 900, unit: 'mu U/ml' },
    { name: 'bmi', label: 'BMI', min: 0, max: 70, unit: 'kg/m²' },
    { name: 'dpf', label: 'Diabetes Pedigree', min: 0, max: 3, unit: 'score' },
    { name: 'age', label: 'Age', min: 0, max: 120, unit: 'years' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {inputFields.map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="text-xs font-medium text-slate-400 ml-1">
              {field.label} <span className="text-[10px] opacity-60">({field.unit})</span>
            </label>
            <input
              type="number"
              name={field.name}
              value={formData[field.name as keyof DiabetesFeatures]}
              onChange={handleChange}
              step={field.name === 'dpf' || field.name === 'bmi' ? "0.01" : "1"}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder-slate-600"
              required
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
      >
        {isLoading ? 'Processing...' : 'Run Analysis'}
        {!isLoading && <ChevronRight className="w-5 h-5" />}
      </button>
    </form>
  );
};
