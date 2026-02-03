"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
def reqVal(body, keys):
    vals = []
    for key in keys:
        if key not in body:
            raise APIException(f'You need to specify the {key}', status_code=400)
        vals.append(body[key])
    return vals

@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    users = [user.serialize() for user in users]
    return jsonify(users), 200


@api.route('/user', methods=['POST'])
def create_user():
    body = request.get_json()
    keys = ['nombre', 'apellido', 'email', 'telefono', 'contrasena']
    nombre, apellido, email, telefono, contrasena = reqVal(body, keys)

    user = User()
    user.nombre = nombre
    user.apellido = apellido
    user.email = email
    user.telefono = telefono
    user.contrasena = contrasena
    user.foto_perfil = None
    user.admin = False
    user.is_active = True

    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"message": "El correo electrónico ya existe."}), 400

    return jsonify(user.serialize()), 201
