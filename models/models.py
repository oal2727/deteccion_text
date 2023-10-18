from flask_sqlalchemy import SQLAlchemy
from common.db import db,BaseModelMixin
from extensions import BASE_URL
class User(db.Model,BaseModelMixin):
   id = db.Column(db.Integer, primary_key=True)
   firstName = db.Column(db.String(100),nullable=False)
   lastName = db.Column(db.String(100),nullable=False)
   email = db.Column(db.String(120), unique=True, nullable=False)
   password = db.Column(db.String(120), nullable=False)


class Image(db.Model,BaseModelMixin):
   id = db.Column(db.Integer, primary_key=True)
   image = db.Column(db.String(150),nullable=False)
   text = db.Column(db.Text,nullable=True)
   user_id = db.Column(db.Integer,nullable=False)

   def to_json(self):
      return{
         "id":self.id,
         "uri":BASE_URL+"/static/"+self.image,
         "text":self.text,
      }
