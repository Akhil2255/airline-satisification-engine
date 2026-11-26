import React, { useState } from 'react';
import { PERSONA_ARCHETYPES, PIPELINE_FILES } from '../data/projectData';

export const PersonaExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(PERSONA_ARCHETYPES[0].id);
  const selected = PERSONA_ARCHETYPES.find((p) => p.id === selectedId) ?? PERSONA_ARCHETYPES[0];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 text-balance">
          K-Means Passenger Personas
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl">
          Unsupervised clustering (k = 4) groups passengers using travel context, service ratings,
          and delay features without using the satisfaction target label.
        </p>
      </div>

      {/* Interactive Persona Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-2">
          {PERSONA_ARCHETYPES.map((persona, index) => {
            const active = persona.id === selectedId;
            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => setSelectedId(persona.id)}
                className={`w-full text-left p-4 rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                  active
                    ? 'bg-white border-blue-700 ring-1 ring-blue-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-mono text-slate-500">
                  Cluster Group 0{index + 1}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {persona.title}
                </div>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                  {persona.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-5">
          <div>
            <div className="text-xs text-slate-500">
              Unsupervised Experience Archetype · 04_kmeans_clustering.py
            </div>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {selected.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {selected.description}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Characteristic Experience Signals
            </h3>
            <ul className="mt-2.5 space-y-2">
              {selected.keySignals.map((sig) => (
                <li key={sig} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="text-blue-700 font-semibold" aria-hidden="true">
                    ·
                  </span>
                  <span>{sig}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Airline Improvement Opportunity
            </h3>
            <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
              {selected.airlineAction}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 leading-relaxed">
            Clustering pipeline artifacts: <span className="font-mono text-slate-700">models/cluster_preprocessor.pkl</span>,{' '}
            <span className="font-mono text-slate-700">models/kmeans_model.pkl</span>,{' '}
            <span className="font-mono text-slate-700">outputs/passenger_personas.csv</span>, and{' '}
            <span className="font-mono text-slate-700">outputs/passenger_clusters.png</span>.
            Exact cluster counts and feature means are stored in your local CSV output.
          </div>
        </div>
      </div>

      {/* End-to-End Pipeline Status Table */}
      <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">
            Completed Pipeline vs. Remaining Work
          </h2>
          <p className="text-xs text-slate-500">
            Current implementation inventory from Airline_Satisfaction_Engine/
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
                <th className="py-2.5 px-5">File / Deliverable</th>
                <th className="py-2.5 px-4">Workflow Stage</th>
                <th className="py-2.5 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {PIPELINE_FILES.map((row) => (
                <tr key={row.file} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-5 font-mono text-xs text-slate-900">{row.file}</td>
                  <td className="py-2.5 px-4 text-xs text-slate-600">{row.stage}</td>
                  <td
                    className={`py-2.5 px-5 text-right text-xs font-medium whitespace-nowrap ${
                      row.status === 'Remaining Task' ? 'text-blue-700' : 'text-emerald-700'
                    }`}
                  >
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
