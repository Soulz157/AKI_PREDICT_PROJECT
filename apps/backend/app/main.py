import pandas as pd
import numpy as np
import uvicorn
from fastapi import FastAPI


app = FastAPI()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

    @app.get("/")
    async def read_root(param: dict):
        df = pd.DataFrame([param])
        return df.to_dict(orient="records")[0]
