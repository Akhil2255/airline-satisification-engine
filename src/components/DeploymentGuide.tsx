import React, { useState } from 'react';
import { DEPLOY_ARTIFACTS } from '../data/projectData';
import { Check, Copy, CheckSquare, Square } from 'lucide-react';

interface ChecklistStep {
  id: string;
  title: string;
  detail: string;
}

const DEPLOY_CHECKLIST: ChecklistStep[] = [
  {
    id: 'paths',
    title: '1. Verify relative paths in 07_app.py',
    detail:
      'Use Path(__file__).resolve().parent / "models" / "xgboost_best.pkl" so Streamlit Community Cloud loads the model reliably regardless of working directory.',
  },
  {
    id: 'requirements',
    title: '2. Clean up requirements.txt',
    detail:
      'Include streamlit, pandas, numpy, scikit-learn, xgboost, joblib, matplotlib, and seaborn without Windows-only or local-only packages.',
  },
  {
    id: 'gitignore',
    title: '3. Check .gitignore rules carefully',
    detail:
      'Ignore __pycache__/, .venv/, .vscode/, and .env, while ensuring models/xgboost_best.pkl is NOT ignored so Streamlit Cloud receives your trained model.',
  },
  {
    id: 'size',
    title: '4. Confirm file sizes are under GitHub limits',
    detail:
      'GitHub blocks individual files over 100 MB. Keep dataset/airline_passenger_satisfaction.csv excluded if it exceeds 50-100 MB, since 07_app.py only needs models/xgboost_best.pkl.',
  },
  {
    id: 'github',
    title: '5. Push repository to GitHub',
    detail:
      'Run git init, stage 07_app.py, requirements.txt, .gitignore, README.md, and models/xgboost_best.pkl, commit, and push to main.',
  },
  {
    id: 'streamlit',
    title: '6. Deploy on Streamlit Community Cloud',
    detail:
      'Sign in at share.streamlit.io, choose "Create app", select your repository and branch (main), set Main file path to 07_app.py, and click Deploy.',
  },
];

type ArtifactTab = 'requirements' | 'gitignore' | 'pathCheck' | 'readme' | 'commands';

const TAB_CONFIG: Array<{ id: ArtifactTab; label: string; filename: string; content: string }> = [
  {
    id: 'requirements',
    label: 'requirements.txt',
    filename: 'Airline_Satisfaction_Engine/requirements.txt',
    content: DEPLOY_ARTIFACTS.requirementsTxt,
  },
  {
    id: 'gitignore',
    label: '.gitignore',
    filename: 'Airline_Satisfaction_Engine/.gitignore',
    content: DEPLOY_ARTIFACTS.gitignore,
  },
  {
    id: 'pathCheck',
    label: '07_app.py Path Check',
    filename: 'Airline_Satisfaction_Engine/07_app.py (model loader)',
    content: DEPLOY_ARTIFACTS.pathSnippet,
  },
  {
    id: 'readme',
    label: 'README.md',
    filename: 'Airline_Satisfaction_Engine/README.md',
    content: DEPLOY_ARTIFACTS.readmeMd,
  },
  {
    id: 'commands',
    label: 'Git Commands',
    filename: 'VS Code Terminal (Bash / PowerShell)',
    content: DEPLOY_ARTIFACTS.gitCommands,
  },
];

export const DeploymentGuide: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<ArtifactTab>('requirements');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleStep = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = DEPLOY_CHECKLIST.filter((s) => completed[s.id]).length;
  const activeArtifact = TAB_CONFIG.find((t) => t.id === activeTab) ?? TAB_CONFIG[0];

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 text-balance">
            GitHub & Streamlit Community Cloud Preparation
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl">
            Step-by-step release checklist and ready-to-copy configuration files for your local
            Airline_Satisfaction_Engine repository.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-700 tabular-nums shrink-0">
          {completedCount} / {DEPLOY_CHECKLIST.length} steps checked
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Checklist */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
          <div className="px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Deployment Checklist
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Mark each step complete as you prepare your repository in VS Code.
            </p>
          </div>
          {DEPLOY_CHECKLIST.map((step) => {
            const isDone = Boolean(completed[step.id]);
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => toggleStep(step.id)}
                className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-700"
              >
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                )}
                <div>
                  <div
                    className={`text-sm font-medium ${
                      isDone ? 'text-slate-500 line-through' : 'text-slate-900'
                    }`}
                  >
                    {step.title}
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{step.detail}</p>
                </div>
              </button>
            );
          })}
        </section>

        {/* Copyable File Templates */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 bg-slate-50">
            <div className="flex flex-wrap items-center gap-1">
              {TAB_CONFIG.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 border border-slate-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleCopy(activeArtifact.content, activeArtifact.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              {copiedId === activeArtifact.id ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  Copy File
                </>
              )}
            </button>
          </div>

          <div className="px-5 py-2.5 border-b border-slate-100 text-xs font-mono text-slate-600">
            {activeArtifact.filename}
          </div>

          <pre className="p-5 text-xs font-mono text-slate-800 bg-white overflow-x-auto leading-relaxed">
            <code>{activeArtifact.content}</code>
          </pre>
        </section>
      </div>
    </div>
  );
};
