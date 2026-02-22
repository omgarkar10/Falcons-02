import os
from flask import Flask, render_template, request
import google.generativeai as genai
from PIL import Image

app = Flask(__name__)

# Apni API Key yahan dalo
API_KEY="AIzaSyCFNsFusJ_pnpXKhGecXBXy5g7kfgm5Y3I"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

@app.route('/', methods=['GET', 'POST'])
def index():
    description = ""
    if request.method == 'POST':
        image_file = request.files['image']
        if image_file:
            # Image ko open karke Gemini ke format mein badlein
            img = Image.open(image_file)
            # Ab isse analyze karein 
            prompt = "Detect objects in this image and describe the relationship between them."
            response = model.generate_content(["Describe this image",img])
            description = response.text
            
    return render_template('index.html', description=description)

if __name__ == '__main__':
    app.run(debug=True)