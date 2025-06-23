from fastapi import FastAPI

app = FastAPI(title="Daily Report Generator API")

@app.get("/")
async def root():
    return {"message": "Welcome to the Daily Report Generator Backend"}
