from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import tempfile
import google.generativeai as genai  
from model.predict import predict_stockout

# ---------------- API KEY ----------------
API_KEY = "API KEY" 
genai.configure(api_key=API_KEY)

# ---------------- App Config ----------------
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# ---------------- Models ----------------
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    experience = db.Column(db.Text, nullable=False)

# ---------------- Create Tables ----------------
with app.app_context():
    db.create_all()

# ---------------- Routes (Contact) ----------------
@app.route('/Contact', methods=['POST'])
def add_contact():
    data = request.get_json()
    new_contact = Contact(
        name=data['name'],
        email=data['email'],
        message=data['message']
    )
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({"message": "Contact saved!"}), 201

@app.route('/Contact', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    result = [
        {"id": c.id, "name": c.name, "email": c.email, "message": c.message}
        for c in contacts
    ]
    return jsonify(result)

# ---------------- Routes (Feedback) ----------------
@app.route('/Feedback', methods=['POST'])
def add_feedback():
    data = request.get_json()
    new_feedback = Feedback(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        experience=data['experience']
    )
    db.session.add(new_feedback)
    db.session.commit()
    return jsonify({"message": "Feedback given!"}), 201

@app.route('/Feedback', methods=['GET'])
def get_feedback():
    feedbacks = Feedback.query.all()
    result = [
        {"id": f.id, "name": f.name, "email": f.email, "phone": f.phone, "experience": f.experience}
        for f in feedbacks
    ]
    return jsonify(result)

# ---------------- Prediction Route ----------------
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Save temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
        file.save(tmp.name)
        tmp_path = tmp.name

    try:
        pred_df = predict_stockout(tmp_path)
        os.remove(tmp_path)

        # Convert dataframe to JSON
        result = pred_df.to_dict(orient="records")
        return jsonify({"summary": "Stock prediction analysis completed.", "fields": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- Chatbot Route ----------------
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    context = data.get('context', '')

    try:
        # Initialize model
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Create prompt
        prompt = f"{context}\n\nUser: {message}\nAI:"
        response = model.generate_content(prompt)

        reply = response.text if response and hasattr(response, "text") else "No response generated."

    except Exception as e:
        #reply = f"Error: {str(e)}" ----- This prints error
        reply = "Error getting the message, please try again later" # ------this sends error message 

    return jsonify({"reply": reply})

# ---------------- Run App ----------------
if __name__ == '__main__':
    app.run(debug=True)
