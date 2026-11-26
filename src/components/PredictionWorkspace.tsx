import React, { useEffect, useState } from 'react';import {
  DEFAULT_PASSENGER_FEATURES,
  FEATURE_PRESETS,
  PassengerFeatures,
  SERVICE_RATINGS_META,
  
} from '../data/projectData';
import { CheckCircle2, AlertCircle, RotateCcw, Loader2 } from 'lucide-react';

interface ApiPredictionResult {
  predictedClass: 'Satisfied' | 'Neutral or Dissatisfied';
  satisfiedProbability: number;
  dissatisfiedProbability: number;
  predictionCode: number;
}
interface PredictionWorkspaceProps {
  features: PassengerFeatures;
  onChange: (next: PassengerFeatures) => void;
  onReset: () => void;
}

export const PredictionWorkspace: React.FC<PredictionWorkspaceProps> = ({
  features,
  onChange,
  onReset,
}) => {
  const [result, setResult] = useState<ApiPredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSatisfied = result?.predictedClass === 'Satisfied';
  useEffect(() => {
  const timer = setTimeout(async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://airline-satisification-engine.onrender.com/predict',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gender: features.gender,
          customerType: features.customerType,
          age: features.age,
          typeOfTravel: features.typeOfTravel,
          customerClass: features.customerClass,
          flightDistance: features.flightDistance,
          inflightWifiService: features.inflightWifiService,
          departureArrivalTimeConvenient: features.departureArrivalTimeConvenient,
          easeOfOnlineBooking: features.easeOfOnlineBooking,
          gateLocation: features.gateLocation,
          foodAndDrink: features.foodAndDrink,
          onlineBoarding: features.onlineBoarding,
          seatComfort: features.seatComfort,
          inflightEntertainment: features.inflightEntertainment,
          onboardService: features.onboardService,
          legRoomService: features.legRoomService,
          baggageHandling: features.baggageHandling,
          checkinService: features.checkinService,
          inflightService: features.inflightService,
          cleanliness: features.cleanliness,
          departureDelayInMinutes: features.departureDelayInMinutes,
          arrivalDelayInMinutes: features.arrivalDelayInMinutes,
        }),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(`Prediction failed (HTTP ${response.status}): ${details || response.statusText}`);
      }

      const data: ApiPredictionResult = await response.json();
      if (typeof data.satisfiedProbability !== 'number' || typeof data.dissatisfiedProbability !== 'number' || !data.predictedClass) {
        throw new Error('The prediction API returned an unexpected response.');
      }
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to connect to prediction API.'
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [features]);

  const updateField = <K extends keyof PassengerFeatures>(key: K, value: PassengerFeatures[K]) => {
    onChange({ ...features, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 text-balance">
            Passenger Satisfaction Predictor
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Configure all 22 passenger, travel, service rating, and flight delay inputs used by the
            training pipeline.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {FEATURE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.values)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              {preset.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 22-Feature Input Form */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Passenger Information */}
          <section className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-semibold text-slate-900">
                01. Passenger Information
              </h2>
              <span className="text-xs text-slate-500">3 features</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="field-gender" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Gender
                </label>
                <select
                  id="field-gender"
                  value={features.gender}
                  onChange={(e) => updateField('gender', e.target.value as PassengerFeatures['gender'])}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-md text-slate-900 focus:border-blue-700 focus:outline-none"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              <div>
                <label htmlFor="field-customer-type" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Customer Type
                </label>
                <select
                  id="field-customer-type"
                  value={features.customerType}
                  onChange={(e) =>
                    updateField('customerType', e.target.value as PassengerFeatures['customerType'])
                  }
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-md text-slate-900 focus:border-blue-700 focus:outline-none"
                >
                  <option value="Loyal Customer">Loyal Customer</option>
                  <option value="disloyal Customer">disloyal Customer</option>
                </select>
              </div>
              <div>
                <label htmlFor="field-age" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Age (years)
                </label>
                <input
                  id="field-age"
                  type="number"
                  min={7}
                  max={85}
                  value={features.age}
                  onChange={(e) =>
                  updateField(
                    'age',
                    e.target.value === '' ? 0 : Number(e.target.value)
                  )
                }
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-md text-slate-900 tabular-nums focus:border-blue-700 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Travel Information */}
          <section className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-semibold text-slate-900">
                02. Travel Information
              </h2>
              <span className="text-xs text-slate-500">3 features</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="field-travel-type" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Type of Travel
                </label>
                <select
                  id="field-travel-type"
                  value={features.typeOfTravel}
                  onChange={(e) =>
                    updateField('typeOfTravel', e.target.value as PassengerFeatures['typeOfTravel'])
                  }
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-md text-slate-900 focus:border-blue-700 focus:outline-none"
                >
                  <option value="Business travel">Business travel</option>
                  <option value="Personal Travel">Personal Travel</option>
                </select>
              </div>
              <div>
                <label htmlFor="field-class" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Customer Class
                </label>
                <select
                  id="field-class"
                  value={features.customerClass}
                  onChange={(e) =>
                    updateField('customerClass', e.target.value as PassengerFeatures['customerClass'])
                  }
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-md text-slate-900 focus:border-blue-700 focus:outline-none"
                >
                  <option value="Business">Business</option>
                  <option value="Eco Plus">Eco Plus</option>
                  <option value="Eco">Eco</option>
                </select>
              </div>
              <div>
                <label htmlFor="field-distance" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Flight Distance (miles)
                </label>
                <input
                  id="field-distance"
                  type="number"
                  min={30}
                  max={5000}
                  step={10}
                  value={features.flightDistance}
                  onChange={(e) =>
                  updateField(
                    'flightDistance',
                    e.target.value === '' ? 0 : Number(e.target.value)
                  )
                }
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-md text-slate-900 tabular-nums focus:border-blue-700 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Airline Service Ratings */}
          <section className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-semibold text-slate-900">
                03. Airline Service Ratings
              </h2>
              <span className="text-xs text-slate-500">14 features · Scale 0 (Not Applicable) to 5</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {SERVICE_RATINGS_META.map((rating) => {
                const value = features[rating.key];
                return (
                  <div key={rating.key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor={`rating-${rating.key}`} className="font-medium text-slate-700">
                        {rating.label}
                      </label>
                      <span className="font-mono font-medium text-slate-900 tabular-nums">
                        {value} / 5
                      </span>
                    </div>
                    <input
                      id={`rating-${rating.key}`}
                      type="range"
                      min={0}
                      max={5}
                      step={1}
                      value={value}
                      onChange={(e) => updateField(rating.key, Number(e.target.value))}
                      className="w-full accent-blue-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 4: Flight Delay Information */}
          <section className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-semibold text-slate-900">
                04. Flight Delay Information
              </h2>
              <span className="text-xs text-slate-500">2 features</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="field-dep-delay" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Departure Delay in Minutes
                </label>
                <input
                  id="field-dep-delay"
                  type="number"
                  min={0}
                  max={1600}
                  value={features.departureDelayInMinutes}
                  onChange={(e) =>
                  updateField(
                    'departureDelayInMinutes',
                    e.target.value === '' ? 0 : Number(e.target.value)
                  )
                }
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-md text-slate-900 tabular-nums focus:border-blue-700 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="field-arr-delay" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Arrival Delay in Minutes
                </label>
                <input
                  id="field-arr-delay"
                  type="number"
                  min={0}
                  max={1600}
                  value={features.arrivalDelayInMinutes}
                  onChange={(e) =>
                    updateField(
                      'arrivalDelayInMinutes',
                      Math.max(0, Math.min(1600, Number(e.target.value) || 0))
                    )
                  }
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-200 rounded-md text-slate-900 tabular-nums focus:border-blue-700 focus:outline-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right: Prediction Outcome Panel */}
        <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5">
            <div>
              <div className="text-xs font-medium text-slate-500">
                Predicted Outcome · 22 Features
              </div>
              <div className="mt-2 flex items-center gap-2.5">
                {loading ? (
                  <Loader2 className="w-6 h-6 text-blue-600 shrink-0 animate-spin" aria-hidden="true" />
                ) : isSatisfied ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" aria-hidden="true" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
                )}
                <span
                  className={`text-xl font-semibold tracking-tight ${
                    isSatisfied ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {loading ? 'Predicting…' : error ? 'Prediction unavailable' : result?.predictedClass ?? 'Waiting for prediction'}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-600">
                {result ? <>Target encoding: <span className="font-mono text-slate-800">{result.predictionCode}</span>{' '}· XGBoost Model Prediction</> : 'XGBoost model prediction'}
              </p>
            </div>

<div className="border-t border-slate-100 pt-4 space-y-3">
  <div className="text-xs font-medium text-slate-700">Class Probabilities</div>

  <div className="space-y-1.5">
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-700 font-medium">Satisfied (1)</span>
      <span className="font-mono font-semibold text-slate-900 tabular-nums">
        {result ? `${(result.satisfiedProbability * 100).toFixed(1)}%` : '—'}
      </span>
    </div>

    <div className="w-full h-2.5 bg-slate-100 rounded-sm overflow-hidden">
      <div
        className="h-full bg-emerald-600 transition-all duration-150"
        style={{ width: `${result ? (result.satisfiedProbability * 100).toFixed(1) : 0}%` }}
      />
    </div>
  </div>

  <div className="space-y-1.5">
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-700 font-medium">Neutral or Dissatisfied (0)</span>
      <span className="font-mono font-semibold text-slate-900 tabular-nums">
        {result ? `${(result.dissatisfiedProbability * 100).toFixed(1)}%` : '—'}
      </span>
    </div>

    <div className="w-full h-2.5 bg-slate-100 rounded-sm overflow-hidden">
      <div
        className="h-full bg-amber-600 transition-all duration-150"
        style={{ width: `${result ? (result.dissatisfiedProbability * 100).toFixed(1) : 0}%` }}
      />
    </div>
  </div>
</div>
             

            <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 leading-relaxed">
               Predictions are generated using the trained XGBoost model
                through the FastAPI backend.
            </div>

            
          </div>
        </aside>
      </div>
    </div>
  );
};

export { DEFAULT_PASSENGER_FEATURES };
