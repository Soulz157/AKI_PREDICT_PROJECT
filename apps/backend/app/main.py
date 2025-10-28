import os
import pandas as pd
import numpy as np
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
import joblib
import pathlib as path
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # production: ใช้ ["http://localhost:3000", "https://your-domain.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


ALL_FEATURES = ['Age', 'Gender', 'ASAgr', 'Emer_surg', 'BW', 'Height', 'BMI',
                'HT', 'DM', 'DLP', 'COPD', 'CVD', 'CAD', 'NSAIDs', 'ACEI', 'Statin',
                'ARB', 'Diuretics', 'Dx', 'Type_Op', 'Op_app', 'Side_op', 'Dur_anes',
                'Dur_sx', 'Time_OL', 'Typ_Anal', 'Fluid_ml', 'Crystalloid_ml',
                'Colloid_ml', 'Total_HES_ml', 'Total_blood_ml', 'FFP_ml', 'Bl_loss',
                'Urine', 'fluid_balance', 'Ephedrine(mg)', 'Levophed(mcg)', 'Hypotension',
                'Hypotension(Mins)', 'LowestSBP', 'LowestDBP', 'lowest MAP', 'Hypoxemia',
                'Hypercarbia', 'Pre Hb', 'Alb', 'Pre Cr', 'PreGFR', 'RetainedETT(Days)',
                'NLR1',
                'is_PreGFR_Low', 'is_PreCr_High', 'is_Age_High', 'is_BMI_High',
                'Comorbidity_Count', 'is_Hypotensive', 'is_Long_Surgery',
                'is_High_BloodLoss', 'Total_Risk_Score']


try:
    model_path = os.path.join(os.path.dirname(
        __file__), '../models', 'LGBM_Optuna_Model.joblib')
    model = joblib.load(model_path)
    print(f"Loading model from: {model_path}")
    scaler_path = os.path.join(os.path.dirname(
        __file__), '../models', 'AKI_Scaler.joblib')
    scaler = joblib.load(scaler_path)
    print(f"Loading scaler from: {scaler_path}")

except Exception as e:
    print(f"เกิดข้อผิดพลาดในการโหลดโมเดล: {e}")
    model = None
    scaler = None


@app.post("/predict")
async def predict_aki(form_data: Dict[str, Any]):
    if model is None:
        return {"error": "Model is not loaded correctly on server"}, 500

    try:
        df = preprocess_input(form_data)

        known_cols = [
            col for col in ALL_FEATURES if col in df.columns]
        for col in known_cols:
            df[col] = pd.to_numeric(df[col], errors='coerce')

        df = df.fillna(0)

        df_processed = perform_feature_engineering(df)

        df_processed = df_processed.reindex(
            columns=ALL_FEATURES, fill_value=0)
        df_scaled = scaler.transform(df_processed)
        prediction = model.predict(df_scaled)
        prediction_proba = model.predict_proba(df_scaled)

        result_class = int(prediction[0])
        result_probabilities = prediction_proba[0].tolist()

        return {
            "prediction_result": result_class,
            "probabilities": {
                "class_0": result_probabilities[0],
                "class_1": result_probabilities[1],
                "class_2": result_probabilities[2],
                "class_3": result_probabilities[3]
            }
        }

    except Exception as e:
        return {"error": str(e)}, 400


@app.get("/")
async def read_root():
    return {"message": "P-AKI Prediction API is running. POST to /predict"}


def perform_feature_engineering(df):
    try:

        GFR_LOW_THRESHOLD = 60
        CR_HIGH_THRESHOLD = 1.2
        AGE_HIGH_THRESHOLD = 65
        BMI_HIGH_THRESHOLD = 30
        MAP_LOW_THRESHOLD = 65
        BL_LOSS_HIGH_THRESHOLD = 500
        DUR_SX_LONG_THRESHOLD = 180

        df['is_PreGFR_Low'] = (df['PreGFR'] < GFR_LOW_THRESHOLD).astype(int)
        df['is_PreCr_High'] = (df['Pre Cr'] > CR_HIGH_THRESHOLD).astype(int)
        df['is_Age_High'] = (df['Age'] > AGE_HIGH_THRESHOLD).astype(int)
        df['is_BMI_High'] = (df['BMI'] > BMI_HIGH_THRESHOLD).astype(int)
        df['is_Hypotensive'] = (
            df['lowest MAP'] < MAP_LOW_THRESHOLD).astype(int)
        df['is_Long_Surgery'] = (
            df['Dur_sx'] > DUR_SX_LONG_THRESHOLD).astype(int)
        df['is_High_BloodLoss'] = (
            df['Bl_loss'] > BL_LOSS_HIGH_THRESHOLD).astype(int)

        comorbidity_cols = ['HT', 'DM', 'CVD']
        df['Comorbidity_Count'] = df[comorbidity_cols].sum(axis=1)

        risk_flag_columns = [
            'is_PreGFR_Low', 'is_PreCr_High', 'is_Age_High', 'is_BMI_High',
            'is_Hypotensive', 'is_Long_Surgery', 'is_High_BloodLoss'
        ]
        df['Total_Risk_Score'] = df[risk_flag_columns].sum(
            axis=1) + df['Comorbidity_Count']
    except Exception as e:
        print(f"Error in feature engineering: {e}")

    return df


def preprocess_input(data: Dict[str, Any]) -> pd.DataFrame:
    form_data = data.copy()
    key_mappings = {
        "lowest_map": "lowest MAP",
        "age": "Age",
        "bodyWeight": "BW",
        "height": "Height",
        "bmi": "BMI",
        "asa": "ASAgr",
        "dx": "Dx",
        "gender": "Gender",
        "ht": "HT", "dm": "DM", "copd": "COPD", "cvd": "CVD", "dlp": "DLP", "cad": "CAD",
        "nsaids": "NSAIDs", "acei": "ACEI", "statin": "Statin", "arb": "ARB", "diuretics": "Diuretics",
        "preHb": "Pre Hb", "alb": "Alb", "preCr": "Pre Cr", "preGfr": "PreGFR",
        # (เพิ่มจาก DesktopInt2)
        "dur_anes": "Dur_anes", "dur_sx": "Dur_sx", "time_ol": "Time_OL",
        "fluid_ml": "Fluid_ml", "crystalloid_ml": "Crystalloid_ml", "colloid_ml": "Colloid_ml",
        "total_blood_ml": "Total_blood_ml", "ffp_ml": "FFP_ml", "bl_loss": "Bl_loss",
        "urine": "Urine", "fluid_balance": "Fluid_balance", "hypotension": "Hypotension(Mins)",
        "total_hes_ml": "Total_HES_ml", "lowest_sbp": "LowestSBP",
        "lowest_dbp": "LowestDBP",
        "ephedrine": "Ephedrine(mg)", "levophed": "Levophed(mcg)",
        "type_op": "Type_Op", "op_app": "Op_app", "side_op": "Side_op",
        "hypoxemia": "Hypoxemia", "hypercarbia": "Hypercarbia", "emer_surg": "Emer_surg",
        "retained_ett": "RetainedETT(Days)", "nlr1": "NLR1"
    }

    processed_data = {}
    for frontend_key, backend_key in key_mappings.items():
        if frontend_key in form_data:
            processed_data[backend_key] = form_data[frontend_key]

    for key, value in form_data.items():
        if key not in key_mappings and key not in processed_data:
            processed_data[key] = value
    return pd.DataFrame([processed_data])


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
