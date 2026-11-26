import { useState } from 'react';
import { BarChart3, Users, SlidersHorizontal, Rocket, Menu, X } from 'lucide-react';
import {
  DEFAULT_PASSENGER_FEATURES,
  PassengerFeatures,
} from './data/projectData';
import { PredictionWorkspace } from './components/PredictionWorkspace';
import { ModelBenchmarks } from './components/ModelBenchmarks';
import { PersonaExplorer } from './components/PersonaExplorer';
import { DeploymentGuide } from './components/DeploymentGuide';

type WorkspaceView = 'predict' | 'models' | 'personas' | 'deploy';

const NAV_ITEMS: Array<{
  id: WorkspaceView;
  label: string;
  breadcrumb: string;
  icon: typeof SlidersHorizontal;
}> = [
  {
    id: 'predict',
    label: 'Satisfaction Predictor',
    breadcrumb: 'Satisfaction Predictor',
    icon: SlidersHorizontal,
  },
  {
    id: 'models',
    label: 'Model Benchmarks',
    breadcrumb: 'Model Benchmarks',
    icon: BarChart3,
  },
  {
    id: 'personas',
    label: 'Passenger Personas',
    breadcrumb: 'Passenger Personas',
    icon: Users,
  },
  {
    id: 'deploy',
    label: 'GitHub & Streamlit',
    breadcrumb: 'GitHub & Streamlit Deploy',
    icon: Rocket,
  },
];

export default function App() {
  const [activeView, setActiveView] = useState<WorkspaceView>('predict');
  const [features, setFeatures] = useState<PassengerFeatures>(DEFAULT_PASSENGER_FEATURES);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentNav = NAV_ITEMS.find((item) => item.id === activeView) ?? NAV_ITEMS[0];

  const handleNavSelect = (view: WorkspaceView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-slate-200">
        <div className="h-14 px-5 flex items-center border-b border-slate-200">
          <span className="font-display text-sm font-bold tracking-tight text-slate-900 whitespace-nowrap">
            Airline Satisfaction Engine
          </span>
        </div>

        <nav aria-label="Workspace navigation" className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 text-xs text-slate-500 space-y-1">
          <div className="font-medium text-slate-700">Primary Model</div>
          <div className="font-mono text-slate-600">models/xgboost_best.pkl</div>
          <div className="tabular-nums">96.06% test accuracy · 22 features</div>
        </div>
      </aside>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/30"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 w-64 bg-white h-full border-r border-slate-200 flex flex-col">
            <div className="h-14 px-5 flex items-center justify-between border-b border-slate-200">
              <span className="font-display text-sm font-bold tracking-tight text-slate-900">
                Airline Satisfaction Engine
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="p-3 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavSelect(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md border border-slate-200"
            >
              <Menu className="w-4 h-4" />
            </button>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
              <span className="text-slate-500 truncate hidden sm:inline">
                Airline Satisfaction Engine
              </span>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">
                /
              </span>
              <span className="font-medium text-slate-900 truncate">{currentNav.breadcrumb}</span>
            </nav>
          </div>

          <div className="shrink-0">
            {activeView === 'deploy' ? (
              <button
                type="button"
                onClick={() => handleNavSelect('predict')}
                className="px-3.5 py-2 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
              >
                Open Predictor
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNavSelect('deploy')}
                className="px-3.5 py-2 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
              >
                Deployment Guide
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          {activeView === 'predict' && (
            <PredictionWorkspace
              features={features}
              onChange={setFeatures}
              onReset={() => setFeatures(DEFAULT_PASSENGER_FEATURES)}
            />
          )}
          {activeView === 'models' && <ModelBenchmarks />}
          {activeView === 'personas' && <PersonaExplorer />}
          {activeView === 'deploy' && <DeploymentGuide />}
        </main>
      </div>
    </div>
  );
}
