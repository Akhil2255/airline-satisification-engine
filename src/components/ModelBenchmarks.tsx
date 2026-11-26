import React, { useState } from 'react';
import { DATASET_STATS, MODEL_BENCHMARKS } from '../data/projectData';

type MetricKey = 'accuracy' | 'precision' | 'recall' | 'f1';

const METRIC_LABELS: Record<MetricKey, string> = {
  accuracy: 'Accuracy',
  precision: 'Precision',
  recall: 'Recall',
  f1: 'F1-score',
};

export const ModelBenchmarks: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('f1');

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 text-balance">
          Model Comparison & Dataset Benchmarks
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl">
          Actual experimental results reported on the held-out 20% stratified test split of the
          Airline Passenger Satisfaction dataset.
        </p>
      </div>

      {/* Dataset KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs font-medium text-slate-500">Original Dataset Records</div>
          <div className="mt-1.5 text-2xl font-semibold text-slate-900 font-mono tabular-nums">
            {DATASET_STATS.totalRecords.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {DATASET_STATS.originalColumns} columns · {DATASET_STATS.inputFeatures} model features
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs font-medium text-slate-500">Neutral or Dissatisfied (0)</div>
          <div className="mt-1.5 text-2xl font-semibold text-slate-900 font-mono tabular-nums">
            {DATASET_STATS.targetClasses[0].count.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-slate-500 tabular-nums">
            {DATASET_STATS.targetClasses[0].share}% of dataset
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs font-medium text-slate-500">Satisfied (1)</div>
          <div className="mt-1.5 text-2xl font-semibold text-slate-900 font-mono tabular-nums">
            {DATASET_STATS.targetClasses[1].count.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-slate-500 tabular-nums">
            {DATASET_STATS.targetClasses[1].share}% of dataset
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs font-medium text-slate-500">Best 5-Fold CV F1 (XGBoost)</div>
          <div className="mt-1.5 text-2xl font-semibold text-blue-700 font-mono tabular-nums">
            95.44%
          </div>
          <div className="mt-1 text-xs text-slate-500">
            RandomizedSearchCV · Stratified 5-Fold
          </div>
        </div>
      </div>

      {/* Model Evaluation Table */}
      <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Supervised Model Test Evaluation
            </h2>
            <p className="text-xs text-slate-500">
              Source: outputs/model_comparison.csv · Stratified 80:20 train-test split
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">models/xgboost_best.pkl</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
                <th className="py-3 px-5">Model</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-right">Accuracy</th>
                <th className="py-3 px-4 text-right">Precision</th>
                <th className="py-3 px-4 text-right">Recall</th>
                <th className="py-3 px-5 text-right">F1-score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {MODEL_BENCHMARKS.map((model) => {
                const isBest = model.name === 'Optimized XGBoost';
                return (
                  <tr
                    key={model.name}
                    className={`hover:bg-slate-50 transition-colors ${
                      isBest ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-slate-900">{model.name}</div>
                      <div className="text-xs font-mono text-slate-500">{model.artifact}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{model.role}</td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-900">
                      {model.accuracy.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-900">
                      {model.precision.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-900">
                      {model.recall.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono tabular-nums font-semibold text-slate-900">
                      {model.f1.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Metric Comparison Bar Chart */}
      <section className="bg-white border border-slate-200 rounded-lg p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Visual Metric Comparison
            </h2>
            <p className="text-xs text-slate-500">
              Select an evaluation metric to compare baseline models against Optimized XGBoost.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start">
            {(Object.keys(METRIC_LABELS) as MetricKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedMetric(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedMetric === key
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {METRIC_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {MODEL_BENCHMARKS.map((model) => {
            const val = model[selectedMetric];
            const isBest = model.name === 'Optimized XGBoost';
            return (
              <div key={model.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-800">{model.name}</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {val.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-sm overflow-hidden">
                  <div
                    className={`h-full transition-all duration-200 ${
                      isBest ? 'bg-blue-700' : 'bg-slate-400'
                    }`}
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
          <span className="font-medium text-slate-800">Preprocessing & Leak Prevention:</span>{' '}
          {DATASET_STATS.imputation}. {DATASET_STATS.encoding}. These are experimental results
          obtained using the current dataset and train-test split, not guaranteed performance on
          unseen real-world airline data.
        </div>
      </section>
    </div>
  );
};
