import pandas as pd
import numpy as np
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
import joblib
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

try:
    model = joblib.load('aki_model.joblib')
except FileNotFoundError:
    print("WARNING: ไม่พบไฟล์โมเดล 'aki_model.joblib'")
    print("ใช้โมเดลจำลอง (dummy model) สำหรับการทดสอบ")

    class DummyModel:
        def predict(self, df):
            # ตรรกะจำลอง: ถ้า 'age' > 60 ให้ทายว่า 1 (มีความเสี่ยง)
            # คุณสามารถเปลี่ยน 'age' เป็น key อื่นใน formValues ของคุณ
            try:
                if df.iloc[0].get('age', 0) > 60:
                    return [1]
            except:
                pass  # ถ้าไม่มี key 'age' ก็ข้ามไ
            return [0]

    model = DummyModel()
except Exception as e:
    print(f"เกิดข้อผิดพลาดในการโหลดโมเดล: {e}")
    model = None


@app.post("/predict")
async def predict_aki(form_data: Dict[str, Any]):
    if model is None:
        return {"error": "Model is not loaded correctly on server"}, 500

    try:
        df = pd.DataFrame([form_data])

        prediction = model.predict(df)

        result = int(prediction[0])

        return {"prediction_result": result}

    except Exception as e:
        return {"error": str(e)}, 400


@app.get("/")
async def read_root():
    return {"message": "P-AKI Prediction API is running. POST to /predict"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
