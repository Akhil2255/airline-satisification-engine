export type SatisfactionClass = 'Satisfied' | 'Neutral or Dissatisfied';

export interface PassengerFeatures {
  gender: 'Female' | 'Male';
  customerType: 'Loyal Customer' | 'disloyal Customer';
  age: number;
  typeOfTravel: 'Business travel' | 'Personal Travel';
  customerClass: 'Business' | 'Eco' | 'Eco Plus';
  flightDistance: number;
  inflightWifiService: number;
  departureArrivalTimeConvenient: number;
  easeOfOnlineBooking: number;
  gateLocation: number;
  foodAndDrink: number;
  onlineBoarding: number;
  seatComfort: number;
  inflightEntertainment: number;
  onboardService: number;
  legRoomService: number;
  baggageHandling: number;
  checkinService: number;
  inflightService: number;
  cleanliness: number;
  departureDelayInMinutes: number;
  arrivalDelayInMinutes: number;
}

export const DEFAULT_PASSENGER_FEATURES: PassengerFeatures = {
  gender: 'Female',
  customerType: 'Loyal Customer',
  age: 38,
  typeOfTravel: 'Business travel',
  customerClass: 'Business',
  flightDistance: 1450,
  inflightWifiService: 4,
  departureArrivalTimeConvenient: 4,
  easeOfOnlineBooking: 4,
  gateLocation: 3,
  foodAndDrink: 4,
  onlineBoarding: 5,
  seatComfort: 5,
  inflightEntertainment: 4,
  onboardService: 4,
  legRoomService: 4,
  baggageHandling: 4,
  checkinService: 4,
  inflightService: 4,
  cleanliness: 5,
  departureDelayInMinutes: 0,
  arrivalDelayInMinutes: 0,
};

export interface FeaturePreset {
  id: string;
  label: string;
  summary: string;
  values: PassengerFeatures;
}

export const FEATURE_PRESETS: FeaturePreset[] = [
  {
    id: 'business-high',
    label: 'Business · High Service',
    summary: 'Loyal business traveler with strong boarding, Wi-Fi, and zero delays.',
    values: DEFAULT_PASSENGER_FEATURES,
  },
  {
    id: 'eco-delayed',
    label: 'Economy · Delay Impacted',
    summary: 'Personal economy trip with lower service ratings and 55-minute arrival delay.',
    values: {
      gender: 'Male',
      customerType: 'disloyal Customer',
      age: 29,
      typeOfTravel: 'Personal Travel',
      customerClass: 'Eco',
      flightDistance: 620,
      inflightWifiService: 2,
      departureArrivalTimeConvenient: 3,
      easeOfOnlineBooking: 2,
      gateLocation: 2,
      foodAndDrink: 2,
      onlineBoarding: 2,
      seatComfort: 2,
      inflightEntertainment: 2,
      onboardService: 3,
      legRoomService: 2,
      baggageHandling: 3,
      checkinService: 2,
      inflightService: 3,
      cleanliness: 2,
      departureDelayInMinutes: 45,
      arrivalDelayInMinutes: 55,
    },
  },
  {
    id: 'mixed-ecoplus',
    label: 'Eco Plus · Mixed Ratings',
    summary: 'Loyal traveler with comfortable cabin scores but weak Wi-Fi and online booking.',
    values: {
      gender: 'Female',
      customerType: 'Loyal Customer',
      age: 46,
      typeOfTravel: 'Business travel',
      customerClass: 'Eco Plus',
      flightDistance: 980,
      inflightWifiService: 1,
      departureArrivalTimeConvenient: 3,
      easeOfOnlineBooking: 1,
      gateLocation: 3,
      foodAndDrink: 4,
      onlineBoarding: 3,
      seatComfort: 4,
      inflightEntertainment: 4,
      onboardService: 4,
      legRoomService: 4,
      baggageHandling: 4,
      checkinService: 3,
      inflightService: 4,
      cleanliness: 4,
      departureDelayInMinutes: 12,
      arrivalDelayInMinutes: 8,
    },
  },
];

export interface ServiceRatingMeta {
  key: keyof Pick<
    PassengerFeatures,
    | 'inflightWifiService'
    | 'departureArrivalTimeConvenient'
    | 'easeOfOnlineBooking'
    | 'gateLocation'
    | 'foodAndDrink'
    | 'onlineBoarding'
    | 'seatComfort'
    | 'inflightEntertainment'
    | 'onboardService'
    | 'legRoomService'
    | 'baggageHandling'
    | 'checkinService'
    | 'inflightService'
    | 'cleanliness'
  >;
  label: string;
  csvColumn: string;
}

export const SERVICE_RATINGS_META: ServiceRatingMeta[] = [
  { key: 'inflightWifiService', label: 'Inflight Wi-Fi Service', csvColumn: 'Inflight wifi service' },
  {
    key: 'departureArrivalTimeConvenient',
    label: 'Departure/Arrival Time Convenience',
    csvColumn: 'Departure/Arrival time convenient',
  },
  { key: 'easeOfOnlineBooking', label: 'Ease of Online Booking', csvColumn: 'Ease of Online booking' },
  { key: 'gateLocation', label: 'Gate Location', csvColumn: 'Gate location' },
  { key: 'foodAndDrink', label: 'Food and Drink', csvColumn: 'Food and drink' },
  { key: 'onlineBoarding', label: 'Online Boarding', csvColumn: 'Online boarding' },
  { key: 'seatComfort', label: 'Seat Comfort', csvColumn: 'Seat comfort' },
  { key: 'inflightEntertainment', label: 'Inflight Entertainment', csvColumn: 'Inflight entertainment' },
  { key: 'onboardService', label: 'Onboard Service', csvColumn: 'Onboard service' },
  { key: 'legRoomService', label: 'Leg Room Service', csvColumn: 'Leg room service' },
  { key: 'baggageHandling', label: 'Baggage Handling', csvColumn: 'Baggage handling' },
  { key: 'checkinService', label: 'Check-in Service', csvColumn: 'Checkin service' },
  { key: 'inflightService', label: 'Inflight Service', csvColumn: 'Inflight service' },
  { key: 'cleanliness', label: 'Cleanliness', csvColumn: 'Cleanliness' },
];

export interface PredictionPreviewResult {
  predictedClass: SatisfactionClass;
  satisfiedProbability: number;
  dissatisfiedProbability: number;
  personaHint: string;
  topFactors: Array<{ label: string; effect: 'Positive' | 'Negative'; detail: string }>;
}

/**
 * Client-side scoring approximation over the 22 input features for browser demonstration.
 * In the Python Streamlit application (07_app.py), predictions are computed directly
 * by the serialized scikit-learn + XGBoost pipeline in models/xgboost_best.pkl.
 */
export function estimateSatisfactionPreview(f: PassengerFeatures): PredictionPreviewResult {
  let logit = -3.1;

  if (f.customerType === 'Loyal Customer') logit += 0.95;
  else logit -= 0.75;

  if (f.typeOfTravel === 'Business travel') logit += 1.05;
  else logit -= 0.85;

  if (f.customerClass === 'Business') logit += 1.1;
  else if (f.customerClass === 'Eco Plus') logit -= 0.15;
  else logit -= 0.45;

  if (f.flightDistance > 1500) logit += 0.25;
  if (f.age >= 25 && f.age <= 60) logit += 0.15;

  const serviceWeights: Array<{ key: ServiceRatingMeta['key']; weight: number; label: string }> = [
    { key: 'onlineBoarding', weight: 0.72, label: 'Online Boarding' },
    { key: 'inflightWifiService', weight: 0.56, label: 'Inflight Wi-Fi Service' },
    { key: 'inflightEntertainment', weight: 0.36, label: 'Inflight Entertainment' },
    { key: 'seatComfort', weight: 0.34, label: 'Seat Comfort' },
    { key: 'onboardService', weight: 0.28, label: 'Onboard Service' },
    { key: 'legRoomService', weight: 0.25, label: 'Leg Room Service' },
    { key: 'cleanliness', weight: 0.22, label: 'Cleanliness' },
    { key: 'checkinService', weight: 0.22, label: 'Check-in Service' },
    { key: 'baggageHandling', weight: 0.18, label: 'Baggage Handling' },
    { key: 'inflightService', weight: 0.18, label: 'Inflight Service' },
    { key: 'easeOfOnlineBooking', weight: 0.14, label: 'Ease of Online Booking' },
    { key: 'foodAndDrink', weight: 0.12, label: 'Food and Drink' },
    { key: 'departureArrivalTimeConvenient', weight: 0.06, label: 'Time Convenience' },
    { key: 'gateLocation', weight: 0.04, label: 'Gate Location' },
  ];

  const factors: Array<{ label: string; score: number; detail: string }> = [];

  for (const item of serviceWeights) {
    const val = f[item.key];
    const centered = val - 3;
    const contrib = centered * item.weight;
    logit += contrib;
    if (Math.abs(contrib) >= 0.35) {
      factors.push({
        label: item.label,
        score: contrib,
        detail: `${val}/5 rating`,
      });
    }
  }

  const delayMinutes = Math.max(f.departureDelayInMinutes, f.arrivalDelayInMinutes);
  const delayPenalty = Math.min(2.4, (f.departureDelayInMinutes * 0.012) + (f.arrivalDelayInMinutes * 0.016));
  logit -= delayPenalty;
  if (delayMinutes >= 15) {
    factors.push({
      label: 'Flight Delay',
      score: -delayPenalty,
      detail: `${f.departureDelayInMinutes}m dep / ${f.arrivalDelayInMinutes}m arr`,
    });
  }

  factors.push({
    label: 'Travel Profile',
    score: (f.typeOfTravel === 'Business travel' ? 1.05 : -0.85) + (f.customerClass === 'Business' ? 1.1 : -0.3),
    detail: `${f.typeOfTravel} · ${f.customerClass}`,
  });

  const probSatisfied = 1 / (1 + Math.exp(-logit));
  const clampedSatisfied = Math.min(0.994, Math.max(0.006, probSatisfied));
  const clampedDissatisfied = 1 - clampedSatisfied;

  const avgRating =
    SERVICE_RATINGS_META.reduce((acc, m) => acc + f[m.key], 0) / SERVICE_RATINGS_META.length;

  let personaHint = 'Mixed Service Quality Experience';
  if (delayMinutes >= 30) {
    personaHint = 'Delay-Impacted Experience';
  } else if (avgRating >= 3.7) {
    personaHint = 'High Service Quality Experience';
  } else if (avgRating <= 2.4) {
    personaHint = 'Poor Service Experience';
  }

  const topFactors = factors
    .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
    .slice(0, 4)
    .map((item) => ({
      label: item.label,
      effect: (item.score >= 0 ? 'Positive' : 'Negative') as 'Positive' | 'Negative',
      detail: item.detail,
    }));

  return {
    predictedClass: clampedSatisfied >= 0.5 ? 'Satisfied' : 'Neutral or Dissatisfied',
    satisfiedProbability: clampedSatisfied,
    dissatisfiedProbability: clampedDissatisfied,
    personaHint,
    topFactors,
  };
}

export interface ModelBenchmark {
  name: string;
  role: string;
  artifact: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  cvF1?: number;
  notes: string;
}

export const MODEL_BENCHMARKS: ModelBenchmark[] = [
  {
    name: 'Gaussian Naive Bayes',
    role: 'Probabilistic Baseline',
    artifact: 'models/naive_bayes.pkl',
    accuracy: 84.87,
    precision: 83.03,
    recall: 81.92,
    f1: 82.47,
    notes: 'Fast baseline classifier evaluated on the 20% stratified test split.',
  },
  {
    name: 'Decision Tree',
    role: 'Non-Linear Baseline',
    artifact: 'models/decision_tree.pkl',
    accuracy: 94.63,
    precision: 93.57,
    recall: 94.12,
    f1: 93.84,
    notes: 'Captures feature interactions across travel class, online boarding, and service ratings.',
  },
  {
    name: 'Optimized XGBoost',
    role: 'Primary Production Model',
    artifact: 'models/xgboost_best.pkl',
    accuracy: 96.06,
    precision: 97.20,
    recall: 93.63,
    f1: 95.38,
    cvF1: 95.44,
    notes: 'Tuned via RandomizedSearchCV with Stratified 5-Fold Cross-Validation optimizing F1-score.',
  },
];

export const DATASET_STATS = {
  name: 'Airline Passenger Satisfaction Dataset (Kaggle)',
  totalRecords: 129880,
  originalColumns: 24,
  inputFeatures: 22,
  targetClasses: [
    { label: 'Neutral or Dissatisfied', code: 0, count: 73452, share: 56.55 },
    { label: 'Satisfied', code: 1, count: 56428, share: 43.45 },
  ],
  splitRatio: '80:20 Stratified Train-Test Split',
  imputation: 'Median (numerical) and Most-Frequent (categorical), fitted on training data only',
  encoding: 'One-Hot Encoding inside preprocessing pipeline',
};

export interface PersonaArchetype {
  id: string;
  title: string;
  description: string;
  keySignals: string[];
  airlineAction: string;
}

export const PERSONA_ARCHETYPES: PersonaArchetype[] = [
  {
    id: 'high-service',
    title: 'High Service Quality Experience',
    description:
      'Passengers reporting consistently strong ratings across cabin comfort, online boarding, inflight entertainment, and onboard service with minimal schedule disruption.',
    keySignals: ['High online boarding & seat comfort ratings', 'Strong inflight Wi-Fi & entertainment scores', 'Low departure and arrival delays'],
    airlineAction: 'Maintain service consistency and reinforce loyalty retention perks.',
  },
  {
    id: 'poor-service',
    title: 'Poor Service Experience',
    description:
      'Passengers reporting low scores across multiple service touchpoints, including digital booking, boarding convenience, seating comfort, and cabin cleanliness.',
    keySignals: ['Low digital & boarding ratings', 'Below-average cabin comfort and cleanliness', 'Elevated dissatisfaction risk regardless of distance'],
    airlineAction: 'Audit digital check-in friction, cabin turnaround standards, and Economy seat comfort.',
  },
  {
    id: 'mixed-service',
    title: 'Mixed Service Quality Experience',
    description:
      'Passengers who rate core physical flight aspects adequately (such as crew service or baggage handling) while scoring specific areas like inflight Wi-Fi or online booking poorly.',
    keySignals: ['Moderate physical service ratings', 'Uneven digital touchpoint scores', 'High sensitivity to small service improvements'],
    airlineAction: 'Target high-leverage upgrades such as reliable Wi-Fi and streamlined online boarding.',
  },
  {
    id: 'delay-impacted',
    title: 'Delay-Impacted Experience',
    description:
      'Passengers whose flight experience is shaped primarily by significant departure and arrival delays, pulling down overall satisfaction even when onboard amenities are acceptable.',
    keySignals: ['Elevated departure delay minutes', 'Corresponding arrival delay minutes', 'Lower departure/arrival time convenience perception'],
    airlineAction: 'Improve turnaround recovery, proactive gate communication, and delay compensation workflows.',
  },
];

export const PIPELINE_FILES = [
  { file: '01_dataset_exploration.py', stage: 'Stage 1 · Dataset Exploration', status: 'Completed' },
  { file: '02_data_preprocessing.py', stage: 'Stage 2 · Data Preprocessing', status: 'Completed' },
  { file: '03_model_training.py', stage: 'Stage 3 · Baseline Supervised Models', status: 'Completed' },
  { file: '04_kmeans_clustering.py', stage: 'Stage 4 · K-Means Personas (k=4)', status: 'Completed' },
  { file: '05_xgboost_optimization.py', stage: 'Stage 5 · XGBoost Optimization & Saving', status: 'Completed' },
  { file: '06_dataset_schema.py', stage: 'Schema Definitions & Validation', status: 'Completed' },
  { file: '07_app.py', stage: 'Stage 7 · Streamlit Application', status: 'Completed (Local)' },
  { file: 'GitHub + Streamlit Cloud', stage: 'Stage 8 · Public Deployment', status: 'Remaining Task' },
];

export const DEPLOY_ARTIFACTS = {
  requirementsTxt: `streamlit>=1.32.0
pandas>=2.1.0
numpy>=1.26.0
scikit-learn>=1.4.0
xgboost>=2.0.0
joblib>=1.3.0
matplotlib>=3.8.0
seaborn>=0.13.0`,
  gitignore: `# Python cache and virtual environments
__pycache__/
*.py[cod]
*$py.class
.venv/
venv/
env/

# IDE and OS files
.vscode/
.idea/
.DS_Store
Thumbs.db

# Environment secrets
.env
.streamlit/secrets.toml

# Large raw dataset (exclude if > 100 MB or keep only if under GitHub limit)
# dataset/airline_passenger_satisfaction.csv
`,
  readmeMd: `# Airline Satisfaction Engine

A machine learning application that predicts airline passenger satisfaction using historical passenger, travel, service rating, and flight delay data.

## Key Features
- **Satisfaction Prediction**: Interactive Streamlit app (\`07_app.py\`) powered by a trained Scikit-learn + XGBoost pipeline (\`models/xgboost_best.pkl\`).
- **Model Comparison**: Evaluates Gaussian Naive Bayes, Decision Tree, and Optimized XGBoost on an 80:20 stratified split of 129,880 passenger records.
- **Passenger Personas**: Unsupervised K-Means clustering (\`k=4\`) to surface distinct passenger experience groups.

## Experimental Test Results
| Model | Accuracy | Precision | Recall | F1-score |
| --- | ---: | ---: | ---: | ---: |
| Gaussian Naive Bayes | 84.87% | 83.03% | 81.92% | 82.47% |
| Decision Tree | 94.63% | 93.57% | 94.12% | 93.84% |
| Optimized XGBoost | 96.06% | 97.20% | 93.63% | 95.38% |

*Optimized XGBoost achieved a 5-Fold Cross-Validation F1-score of 95.44%.*

## Run Locally
\`\`\`bash
pip install -r requirements.txt
streamlit run 07_app.py
\`\`\`
`,
  pathSnippet: `from pathlib import Path
import joblib
import streamlit as st

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "xgboost_best.pkl"

@st.cache_resource
def load_model():
    return joblib.load(MODEL_PATH)

model = load_model()`,
  gitCommands: `# Step 1: Check your current files and sizes (run inside Airline_Satisfaction_Engine/)
git status
ls -lh models/

# Step 2: Test the Streamlit app locally before pushing
streamlit run 07_app.py

# Step 3: Initialize Git (skip if already initialized) and stage project files
git init
git branch -M main
git add 07_app.py requirements.txt .gitignore README.md models/xgboost_best.pkl
git add 01_dataset_exploration.py 02_data_preprocessing.py 03_model_training.py 04_kmeans_clustering.py 05_xgboost_optimization.py 06_dataset_schema.py

# Step 4: Commit and push to your GitHub repository
git commit -m "Prepare Airline Satisfaction Engine for Streamlit Community Cloud"
git remote add origin https://github.com/<YOUR_USERNAME>/Airline_Satisfaction_Engine.git
git push -u origin main`,
};
