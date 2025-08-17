from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from pydantic import BaseModel
import requests
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model at startup
model = None

@app.on_event("startup")
async def load_model():
    global model
    try:
        model = tf.keras.models.load_model('trained_model.h5')
    except Exception as e:
        raise RuntimeError(f"Failed to load model: {str(e)}")

# Define class names (same as your Streamlit app)
CLASS_NAMES = [
    'Apple___Apple_scab',
    'Apple___Black_rot',
    'Apple___Cedar_apple_rust',
    'Apple___healthy',
    'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy',
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy',
    'Raspberry___healthy',
    'Soybean___healthy',
    'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch',
    'Strawberry___healthy',
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

def preprocess_image(image):
    """Preprocess the image for model prediction"""
    image = image.resize((128, 128))
    image = np.array(image)
    image = np.expand_dims(image, axis=0)
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File provided is not an image")
    
    try:
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Make prediction
        prediction = model.predict(processed_image)
        result_index = np.argmax(prediction)
        confidence = np.max(prediction)
        
        return {
            "class": CLASS_NAMES[result_index],
            "confidence": float(confidence)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Plant Disease Detection API is running!"}

#Groq API integration

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "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")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_with_groq(data: ChatRequest):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama3-8b-8192",  # Or "mixtral-8x7b-32768" for better reasoning
        "messages": [
            {"role": "system", "content": "You are KrishiMitra, an AI-powered digital farming assistant. Provide short, helpful, and friendly answers about agriculture, crop prices, soil health, pest control, and weather."},
            {"role": "user", "content": data.message}
        ],
        "temperature": 0.7,
        "max_tokens": 200
    }

    response = requests.post(url, headers=headers, json=payload)
    response_data = response.json()

    bot_reply = response_data["choices"][0]["message"]["content"].strip()
    return {"reply": bot_reply}