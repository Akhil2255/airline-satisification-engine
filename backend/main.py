
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# Load the existing trained model
MODEL_PATH = Path(__file__).parent / "models" / "xgboost_best.pkl"
model = joblib.load(MODEL_PATH)

app = FastAPI(title="Airline Satisfaction API")

# Allow the React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://airline-satisification-engine.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PassengerInput(BaseModel):
    gender: str
    customerType: str
    age: int = Field(ge=7, le=85)
    typeOfTravel: str
    customerClass: str
    flightDistance: int = Field(ge=31, le=4983)

    inflightWifiService: int = Field(ge=0, le=5)
    departureArrivalTimeConvenient: int = Field(ge=0, le=5)
    easeOfOnlineBooking: int = Field(ge=0, le=5)
    gateLocation: int = Field(ge=0, le=5)
    foodAndDrink: int = Field(ge=0, le=5)
    onlineBoarding: int = Field(ge=0, le=5)
    seatComfort: int = Field(ge=0, le=5)
    inflightEntertainment: int = Field(ge=0, le=5)
    onboardService: int = Field(ge=0, le=5)
    legRoomService: int = Field(ge=0, le=5)
    baggageHandling: int = Field(ge=0, le=5)
    checkinService: int = Field(ge=0, le=5)
    inflightService: int = Field(ge=0, le=5)
    cleanliness: int = Field(ge=0, le=5)

    departureDelayInMinutes: int = Field(ge=0, le=1592)
    arrivalDelayInMinutes: float = Field(ge=0, le=1584)


@app.get("/")
def home():
    return {"message": "Airline Satisfaction API is running"}


@app.post("/predict")
def predict(data: PassengerInput):

    # Convert frontend field names to model feature names
    passenger = {
        "Gender": data.gender,
        "customer_type": data.customerType,
        "age": data.age,
        "type_of_travel": data.typeOfTravel,
        "customer_class": data.customerClass,
        "flight_distance": data.flightDistance,
        "inflight_wifi_service": data.inflightWifiService,
        "departure_arrival_time_convenient": data.departureArrivalTimeConvenient,
        "ease_of_online_booking": data.easeOfOnlineBooking,
        "gate_location": data.gateLocation,
        "food_and_drink": data.foodAndDrink,
        "online_boarding": data.onlineBoarding,
        "seat_comfort": data.seatComfort,
        "inflight_entertainment": data.inflightEntertainment,
        "onboard_service": data.onboardService,
        "leg_room_service": data.legRoomService,
        "baggage_handling": data.baggageHandling,
        "checkin_service": data.checkinService,
        "inflight_service": data.inflightService,
        "cleanliness": data.cleanliness,
        "departure_delay_in_minutes": data.departureDelayInMinutes,
        "arrival_delay_in_minutes": data.arrivalDelayInMinutes,
    }

    input_df = pd.DataFrame([passenger])

    prediction = int(model.predict(input_df)[0])
    raw_probabilities = model.predict_proba(input_df)[0]
    class_probabilities = {
        int(class_label): float(probability)
        for class_label, probability in zip(model.classes_, raw_probabilities)
    }

    return {
        "predictedClass": (
            "Satisfied" if prediction == 1
            else "Neutral or Dissatisfied"
        ),
        "satisfiedProbability": round(class_probabilities.get(1, 0.0), 4),
        "dissatisfiedProbability": round(class_probabilities.get(0, 0.0), 4),
        "predictionCode": prediction
    }
