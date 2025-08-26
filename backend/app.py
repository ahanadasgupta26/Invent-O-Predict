from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# ---------------- Configuration ----------------
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

# ---------------- Run App ----------------
if __name__ == '__main__':
    app.run(debug=True)
