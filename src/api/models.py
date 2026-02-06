from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    apellido: Mapped[str] = mapped_column(String(50), nullable=False)
    foto_perfil: Mapped[str] = mapped_column(String(255), nullable=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    telefono: Mapped[str] = mapped_column(String(20), nullable=True)
    contrasena: Mapped[str] = mapped_column(nullable=False)
    admin: Mapped[bool] = mapped_column(
        Boolean(), default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "foto_perfil": self.foto_perfil,
            "telefono": self.telefono,
            "email": self.email,
            "is_active": self.is_active,
            # do not serialize the password, its a security breach
        }


class Rifa(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=True)
    User: Mapped["User"] = relationship(backref="rifa")
    titulo: Mapped[str] = mapped_column(String(100), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(255), nullable=True)
    cantidad_tickets: Mapped[int] = mapped_column(nullable=False)
    precio_ticket: Mapped[float] = mapped_column(nullable=False)
    loteria: Mapped[str] = mapped_column(String(50), nullable=False)
    fecha_sorteo: Mapped[str] = mapped_column(String(50), nullable=False)
    imagen: Mapped[str] = mapped_column(String(255), nullable=True)
    metodo_pagos: Mapped[str] = mapped_column(String(500), nullable=True)
    titular_zelle: Mapped[str] = mapped_column(String(100), nullable=True)
    contacto_zelle: Mapped[str] = mapped_column(String(100), nullable=True)
    titular_transferencia: Mapped[str] = mapped_column(
        String(100), nullable=True)
    numero_ruta: Mapped[str] = mapped_column(String(50), nullable=True)
    numero_cuenta: Mapped[str] = mapped_column(String(50), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "descripcion": self.descripcion,
            "cantidad_tickets": self.cantidad_tickets,
            "precio_ticket": self.precio_ticket,
            "loteria": self.loteria,
            "fecha_sorteo": self.fecha_sorteo,
            "imagen": self.imagen,
            "metodo_pagos": self.metodo_pagos,
            "titular_zelle": self.titular_zelle,
            "contacto_zelle": self.contacto_zelle,
            "titular_transferencia": self.titular_transferencia,
            "numero_ruta": self.numero_ruta,
            "numero_cuenta": self.numero_cuenta
        }


class Ticket(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    rifa_id: Mapped[int] = mapped_column(ForeignKey('rifa.id'), nullable=False)
    Rifa: Mapped["Rifa"] = relationship(backref="tickets")
    numero_ticket: Mapped[str] = mapped_column(String(20), nullable=False)
    is_sold: Mapped[bool] = mapped_column(
        Boolean(), default=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "numero_ticket": self.numero_ticket,
            "is_sold": self.is_sold,
        }


class Comprador_ticket(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    ticket_id: Mapped[int] = mapped_column(
        ForeignKey('ticket.id'), nullable=False)
    Ticket: Mapped["Ticket"] = relationship(backref="comprador_tickets")
    nombre_comprador: Mapped[str] = mapped_column(String(100), nullable=False)
    email_comprador: Mapped[str] = mapped_column(String(120), nullable=False)
    pais_comprador: Mapped[str] = mapped_column(String(50), nullable=True)
    telefono_comprador: Mapped[str] = mapped_column(String(20), nullable=True)
    comprobante_pago: Mapped[str] = mapped_column(String(255), nullable=True)
    estado: Mapped[str] = mapped_column(String(20), default='pendiente', nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "ticket_id": self.ticket_id,
            "nombre_comprador": self.nombre_comprador,
            "email_comprador": self.email_comprador,
            "pais_comprador": self.pais_comprador,
            "telefono_comprador": self.telefono_comprador,
            "comprobante_pago": self.comprobante_pago,
            "estado": self.estado,
        }
