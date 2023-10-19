from flask import Flask,request,jsonify,Response,json,render_template,send_from_directory
import base64
import cv2
import sys
import time
# 
import os
from flask_sqlalchemy import SQLAlchemy
# password encryption
from flask_bcrypt import Bcrypt
# jwt
from models.models import User,Image
# orm migraciones
from flask_migrate import Migrate

from extensions import migrate,db,BASE_URL
from flask_cors import CORS

import easyocr
import numpy as np

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.utils import secure_filename

app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:root@db/ocr"
app.config['SECRET_KEY'] = 'super-secret'
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://dash:password@postgres/ocr"
cors = CORS(app,resources={r"/api/*":{"origins":"http://localhost:8000"}})

bcrypt = Bcrypt(app)

db.init_app(app)
migrate.init_app(app, db)
jwt = JWTManager(app)

# Establece la carpeta de archivos estáticos
app.static_folder = 'static'

# Configura la URL para acceder a los archivos estático

app.static_url_path = '/static'
# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):    
    folder_path="app/dist"
    if path != "" and os.path.exists(folder_path+'/' + path):
        return send_from_directory(folder_path, path)
    else:
        return send_from_directory(folder_path, 'index.html')


@app.route("/test")
def hello_world():
    return {"message":"no existe"}

@app.route("/api/login",methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]
    user = User.get_first_value(email=email)
    if user:
        if bcrypt.check_password_hash(user.password,password):
            access_token = create_access_token(identity=user.id)
            response_data = {
                "message": "El correo previamente fue registrado",
                "token": access_token,
            }
            return Response(response=json.dumps(response_data), status=200, 
            content_type="application/json")
            #return jsonify(access_token=access_token)
        else:
            return Response(response="*La contraseña es incorrecta", status=401, 
            content_type="application/json")
    else:
        return Response(response="*Verifique sus crendenciales nuevamente", status=401, 
            content_type="application/json")

@app.route("/api/auth", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = User.get_first_value(id=current_user)
    return Response(response=user, status=200, 
            content_type="application/json")



def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'jpg' or filename.rsplit('.', 1)[1].lower() == 'png'

def detect_text(roi):
  reader = easyocr.Reader(["es"],gpu=False)
  ocr_result = reader.readtext(roi)
  return ocr_result

def filter_text(region, ocr_result, region_threshold):
    print(region.shape)
    rectangle_size = region.shape[0]*region.shape[1]
    text = []
    for result in ocr_result:
        length = np.sum(np.subtract(result[0][1], result[0][0]))
        height = np.sum(np.subtract(result[0][2], result[0][1]))
        if length*height / rectangle_size > region_threshold:
            text.append(result[1])
    return text

@app.route("/api/send_image", methods=["POST"])
@jwt_required()
def send_image():
    if 'file' not in request.files:
        return "does not exist"
    current_user = get_jwt_identity()
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename) # desinfectar el nombre de un archivo antes de almacenarlo.
        file.save("static/"+filename)
        image_read = cv2.imread("static/"+filename)
        ocr_result = detect_text(image_read) # roi here
        text = filter_text(image_read, ocr_result, 0.05)
        format_text = ' '.join(text)
        dataImage = Image(image=filename,text=format_text,user_id=current_user)
        dataImage.save()
        response_data = {
            "message": "Analizado correctamente",
            "response": {
                'id': dataImage.id,
                'uri': BASE_URL+"/static/"+dataImage.image,
                'text': dataImage.text,
                'user_id': dataImage.user_id
            }
        }
        return jsonify(response_data), 200
    else:
        return Response(response="Validar los datos enviados", status=401, 
        content_type="application/json")


@app.route("/api/register",methods=["POST"])
def register():
    firstName = request.json["firstName"]
    lastName = request.json["lastName"]
    email = request.json["email"]
    password = request.json["password"]
    user = User.get_first_value(email=email)
    if user:
        return Response(response="*EL correo previamente fue registrado", status=401, 
        content_type="application/json")
    else:
        passwordHash = bcrypt.generate_password_hash(password).decode("utf-8")
        user = User(firstName=firstName,lastName=lastName,email=email,password=passwordHash)
        user.save()
        return Response(response="*Registrado correctamente", status=200, 
        content_type="application/json")

@app.route("/api/list_images",methods=["GET"])
@jwt_required()
def list_images():
    current_user = get_jwt_identity()
    images = Image.simple_filter(user_id=current_user)
    image_json_list = [image.to_json() for image in images]
    return jsonify(images=image_json_list)



@app.route("/migrate",methods=["GET"])
def migrate():
    db.create_all()
    db.session.commit()
    return '==================TABLES CREATED=================='



if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8000)
