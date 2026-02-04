"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rifa, Ticket
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


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


# ==========================================
# AUTENTICACIÓN
# ==========================================


@api.route("/login", methods=["POST"])
def login():
    """Endpoint para hacer login y obtener el token JWT"""
    email = request.json.get("email", None)
    contrasena = request.json.get("contrasena", None)
    
    if not email or not contrasena:
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400
    
    # Buscar usuario en la base de datos
    user = User.query.filter_by(email=email).first()
    
    # Verificar credenciales
    if user is None or user.contrasena != contrasena:
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401
    
    # Verificar si está activo
    if not user.is_active:
        return jsonify({"msg": "Usuario inactivo"}), 401
    
    # Crear token con el ID del usuario
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200


# ==========================================
# USUARIOS
# ==========================================


@api.route('/user', methods=['GET'])
def get_users():
    """Obtener todos los usuarios"""
    users = User.query.all()
    users = [user.serialize() for user in users]
    return jsonify(users), 200


@api.route('/user', methods=['POST'])
def create_user():
    """Crear un nuevo usuario (registro)"""
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
        
        # Crear token automáticamente después del registro
        access_token = create_access_token(identity=str(user.id))
        
        return jsonify({
            "message": "Usuario creado exitosamente",
            "access_token": access_token,
            "user": user.serialize()
        }), 201
        
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"message": "El correo electrónico ya existe."}), 400


@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Obtener un usuario específico"""
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "Usuario no encontrado."}), 404
    return jsonify(user.serialize()), 200


@api.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()  # Proteger esta ruta
def update_user(user_id):
    """Actualizar un usuario"""
    current_user_id = get_jwt_identity()
    
    # Solo puede actualizar su propio perfil
    if current_user_id != user_id:
        return jsonify({"message": "No autorizado"}), 403
    
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "Usuario no encontrado."}), 404

    body = request.get_json()
    
    # Permitir actualización parcial de campos
    if 'nombre' in body:
        user.nombre = body['nombre']
    if 'apellido' in body:
        user.apellido = body['apellido']
    if 'email' in body:
        user.email = body['email']
    if 'telefono' in body:
        user.telefono = body['telefono']
    if 'contrasena' in body:
        user.contrasena = body['contrasena']
    if 'foto_perfil' in body:
        user.foto_perfil = body['foto_perfil']

    try:
        db.session.commit()
        return jsonify(user.serialize()), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "El correo electrónico ya existe."}), 400


# ==========================================
# RIFAS
# ==========================================

@api.route('/rifa/<int:user_id>', methods=['GET'])
@jwt_required()  # Proteger la ruta
def get_rifas_by_user(user_id):
    """Obtener todas las rifas de un usuario específico"""
    current_user_id = get_jwt_identity()
    
    # Solo puede ver sus propias rifas
    if current_user_id != str(user_id):
        return jsonify({"message": "No autorizado"}), 403
    
    rifas = Rifa.query.filter_by(user_id=user_id).all()
    rifas = [rifa.serialize() for rifa in rifas]
    return jsonify(rifas), 200


@api.route('/rifa', methods=['POST'])
@jwt_required()  # Proteger la ruta
def crear_rifa():
    # Obtener el ID del usuario autenticado del token
    current_user_id = get_jwt_identity()
    current_user_id = int(current_user_id)  # Convertir a entero
    
    # Verificar que el usuario existe
    if not current_user_id:
        return jsonify({"msg": "Usuario no autenticado"}), 401
    
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Obtener los datos del body
    body = request.get_json()
    keys = ['titulo', 'descripcion', 'cantidad_tickets', 'precio_ticket', 'loteria', 'fecha_sorteo']
    titulo, descripcion, cantidad_tickets, precio_ticket, loteria, fecha_sorteo = reqVal(body, keys)
    
    # AHORA SÍ crear el objeto Rifa
    rifa = Rifa()
    rifa.user_id = current_user_id  # ✅ Ahora sí existe rifa
    rifa.titulo = titulo
    rifa.descripcion = descripcion
    rifa.cantidad_tickets = cantidad_tickets
    rifa.precio_ticket = precio_ticket
    rifa.loteria = loteria
    rifa.fecha_sorteo = fecha_sorteo
    rifa.imagen = body.get('imagen', None)
    rifa.metodo_pagos = body.get('metodo_pagos', None)
    rifa.titular_zelle = body.get('titular_zelle', None)
    rifa.contacto_zelle = body.get('contacto_zelle', None)
    rifa.titular_transferencia = body.get('titular_transferencia', None)
    rifa.numero_ruta = body.get('numero_ruta', None)
    rifa.numero_cuenta = body.get('numero_cuenta', None)
    
    db.session.add(rifa)
    db.session.commit()

    return jsonify(rifa.serialize()), 201


@api.route('/rifa/<int:rifa_id>', methods=['DELETE'])
@jwt_required()  # Proteger la ruta
def eliminar_rifa(rifa_id):
    # Obtener el ID del usuario autenticado del token
    current_user_id = get_jwt_identity()
    current_user_id = int(current_user_id)  # Convertir a entero
    
    rifa = Rifa.query.get(rifa_id)
    if rifa is None:
        return jsonify({"message": "Rifa no encontrada."}), 404
    
    # Verificar que el usuario autenticado es el dueño de la rifa
    if rifa.user_id != current_user_id:
        return jsonify({"message": "No autorizado"}), 403
    
    db.session.delete(rifa)
    db.session.commit()
    
    return jsonify({"message": "Rifa eliminada exitosamente."}), 200


@api.route('/rifa/<int:rifa_id>/editar', methods=['PUT'])
@jwt_required()  # Proteger la ruta
def editar_rifa(rifa_id):
    # Obtener el ID del usuario autenticado del token
    current_user_id = get_jwt_identity()
    current_user_id = int(current_user_id)  # Convertir a entero
    rifa = Rifa.query.get(rifa_id)
    if rifa is None:
        return jsonify({"message": "Rifa no encontrada."}), 404

    # Verificar que el usuario autenticado es el dueño de la rifa
    if rifa.user_id != current_user_id:
        return jsonify({"message": "No autorizado"}), 403
    body = request.get_json()
    # Permitir actualización parcial de campos
    if 'titulo' in body:
        rifa.titulo = body['titulo']
    if 'descripcion' in body:
        rifa.descripcion = body['descripcion']
    if 'cantidad_tickets' in body:
        rifa.cantidad_tickets = body['cantidad_tickets']
    if 'precio_ticket' in body:
        rifa.precio_ticket = body['precio_ticket']
    if 'loteria' in body:
        rifa.loteria = body['loteria']
    if 'fecha_sorteo' in body:
        rifa.fecha_sorteo = body['fecha_sorteo']
    if 'imagen' in body:
        rifa.imagen = body['imagen']
    if 'metodo_pagos' in body:
        rifa.metodo_pagos = body['metodo_pagos']
    if 'titular_zelle' in body:
        rifa.titular_zelle = body['titular_zelle']
    if 'contacto_zelle' in body:
        rifa.contacto_zelle = body['contacto_zelle']
    if 'titular_transferencia' in body:
        rifa.titular_transferencia = body['titular_transferencia']
    if 'numero_ruta' in body:
        rifa.numero_ruta = body['numero_ruta']
    if 'numero_cuenta' in body:
        rifa.numero_cuenta = body['numero_cuenta']

    db.session.commit()
    return jsonify(rifa.serialize()), 200


# ==========================================