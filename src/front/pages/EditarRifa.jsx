import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const EditarRifa = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        tituloRifa: "",
        descripcionRifa: "",
        precioTicket: "",
        metodoPagos: [],
        cantidadTickets: "",
        loteria: "",
        fechaSorteo: "",
        titularZelle: "",
        contactoZelle: "",
        titularTransferencia: "",
        numeroRuta: "",
        numeroCuenta: ""
    });

    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchRifa = async () => {
            if (!API_URL) {
                setError("API_URL no está definida en el .env");
                return;
            }

            if (!token) {
                setError("No hay token de autenticación");
                return;
            }
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/api/rifa/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.log("Error backend:", errorText);
                    throw new Error(`Error al obtener la Rifa`);
                }

                const data = await response.json();
                console.log("DATA BACKEND:", data);
                const rifa = Array.isArray(data) ? data[0] : data;

                setFormData({
                    tituloRifa: rifa.titulo || "",
                    descripcionRifa: rifa.descripcion || "",
                    precioTicket: rifa.precio_ticket || "",
                    cantidadTickets: rifa.cantidad_tickets || "",
                    loteria: rifa.loteria || "",
                    fechaSorteo: rifa.fecha_sorteo
                        ? rifa.fecha_sorteo.slice(0, 16)
                        : "",
                    metodoPagos: rifa.metodo_pagos ? rifa.metodo_pagos.split(",") : [],
                    titularZelle: rifa.titular_zelle || "",
                    contactoZelle: rifa.contacto_zelle || "",
                    titularTransferencia: rifa.titular_transferencia || "",
                    numeroRuta: rifa.numero_ruta || "",
                    numeroCuenta: rifa.numero_cuenta || ""
                });

                if (rifa.imagen) {
                    setImageUrl(rifa.imagen);
                }
            } catch (err) {
                console.error(err);
                setError("Error al cargar la rifa");
            } finally {
                setLoading(false);
            }
        };
        fetchRifa();
    }, [id, token, API_URL]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};
const handleMetodoPagoChange = (metodo) => {
    setFormData(prev => {
        const yaSeleccionado = prev.metodoPagos.includes(metodo);
        return {
            ...prev,
            metodoPagos: yaSeleccionado
                ? prev.metodoPagos.filter(m => m !== metodo)
                : [...prev.metodoPagos, metodo]
        };
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const requestBody = {
            titulo: formData.tituloRifa,
            descripcion: formData.descripcionRifa,
            precio_ticket: parseFloat(formData.precioTicket),
            cantidad_tickets: parseInt(formData.cantidadTickets),
            loteria: formData.loteria,
            fecha_sorteo: formData.fechaSorteo,
            metodo_pagos: formData.metodoPagos.join(","),
            imagen: imageUrl || null,
            titular_zelle: formData.metodoPagos.includes("ZELLE") ? formData.titularZelle : null,
            contacto_zelle: formData.metodoPagos.includes("ZELLE") ? formData.contactoZelle : null,
            titular_transferencia: formData.metodoPagos.includes("Transferencia-Bancaria") ? formData.titularTransferencia : null,
            numero_ruta: formData.metodoPagos.includes("Transferencia-Bancaria") ? formData.numeroRuta : null,
            numero_cuenta: formData.metodoPagos.includes("Transferencia-Bancaria") ? formData.numeroCuenta : null
        };
        const response = await fetch(`${API_URL}/api/rifa/${id}/editar`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
        const data = await response.json();
        if (response.ok) {
            alert("Rifa actualizada exitosamente");
            navigate("/mis-rifas");

        } else {
            setError(data.message || "Error al actualizar la rifa");
        }
    } catch (err) {
        console.error(err);
        setError("Error al conectar al servidor");
    } finally {
        setLoading(false);
    }
};

return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <h1 className="text-center text-danger mb-4">
            Editar Rifa
        </h1>
        {error && (
            <div className="alert alert-danger">
                {error}
            </div>
        )}
        {imageUrl && (
            <div className="mb-3 text-center">
                <img src={imageUrl}
                    alt="Imagen de la rifa"
                    className="img-fluid rounded"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                />
            </div>
        )}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                    type="text"
                    className="form-control"
                    name="tituloRifa"
                    value={formData.tituloRifa}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                    className="form-control"
                    name="descripcionRifa"
                    value={formData.descripcionRifa}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Precio Ticket</label>
                <input
                    type="number"
                    className="form-control"
                    name="precioTicket"
                    value={formData.precioTicket}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Cantidad Tickets</label>
                <input
                    type="text"
                    className="form-control"
                    name="cantidadTickets"
                    value={formData.cantidadTickets}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Lotería</label>
                <input
                    type="text"
                    className="form-control"
                    name="loteria"
                    value={formData.loteria}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha Sorteo</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    name="fechaSorteo"
                    value={formData.fechaSorteo}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Metodos de Pago</label>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData.metodoPagos.includes("ZELLE")}
                        onChange={() => handleMetodoPagoChange("ZELLE")}
                    />
                    <label className="form-check-label">
                        ZELLE
                    </label>
                </div>

                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData.metodoPagos.includes("Transferencia-Bancaria")}
                        onChange={() => handleMetodoPagoChange("Transferencia-Bancaria")}
                    />
                    <label className="form-check-label" htmlFor="transferencia-bancaria">Transferencia Bancaria</label>
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-danger w-100"
                disabled={loading}
            >
                {loading ? "Actualizando..." : "Guardar Cambios"}
            </button>
        </form>
    </div>
);
};

export default EditarRifa;
