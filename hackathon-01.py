import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
import PIL.Image
import io

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# PASTE YOUR GOOGLE API KEY HERE
client = genai.Client(api_key="Saanavi-Api")

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    # Load the image from the upload
    image_bytes = await file.read()
    img = PIL.Image.open(io.BytesIO(image_bytes))

    # We ask Gemini to do exactly what you requested in one prompt
    prompt = """
    1. List all the objects/things present in this image.
    2. Tell me the relation between those objects (what is happening in the scene).
    Return the response in a clear, structured way.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[prompt, img]
    )

    return {"description": response.text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)