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

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [uploading, setUploading] = useState(false);

    const CLOUDINARY_CLOUD_NAME = "dkkkjhhgl";
    const CLOUDINARY_UPLOAD_PRESET = "rifas_images";


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
                    metodoPagos: rifa.metodo_pagos ? rifa.metodo_pagos.split(",").map(m => m.trim()) : [],
                    titularZelle: rifa.titular_zelle || "",
                    contactoZelle: rifa.contacto_zelle || "",
                    titularTransferencia: rifa.titular_transferencia || "",
                    numeroRuta: rifa.numero_ruta || "",
                    numeroCuenta: rifa.numero_cuenta || ""
                });

                setImageUrl(rifa.imagen || "");

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

            let nuevosMetodos = yaSeleccionado
                ? prev.metodoPagos.filter(m => m !== metodo)
                : [...prev.metodoPagos, metodo];

            return {
                ...prev,
                metodoPagos: nuevosMetodos,

                // Limpiar datos si se desmarca
                ...(metodo === "ZELLE" && yaSeleccionado ? {
                    titularZelle: "",
                    contactoZelle: ""
                } : {}),

                ...(metodo === "Transferencia-Bancaria" && yaSeleccionado ? {
                    titularTransferencia: "",
                    numeroRuta: "",
                    numeroCuenta: ""
                } : {})
            };
        });
    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError("La imagen no puede superar 5MB");
            return;
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setError("Solo se permiten imágenes JPG, PNG o WEBP");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        setImageFile(file);
        await uploadImageToCloudinary(file);
    };

    const uploadImageToCloudinary = async (file) => {
        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("folder", "rifas");

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (data.secure_url) {
                setImageUrl(data.secure_url);
                setUploading(false);
            } else {
                throw new Error("Error al subir la imagen");
            }
        } catch (error) {
            console.error("Error al subir imagen:", error);
            setError("Error al subir la imagen");
            setUploading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (imageFile && !imageUrl) {
            setError("Espera a que termine de subir la imagen...");
            setLoading(false);
            return;
        }

        if (formData.metodoPagos.length === 0) {
            setError("Debe seleccionar al menos un método de pago");
            setLoading(false);
            return;
        }

        if (formData.metodoPagos.includes("ZELLE")) {
            if (!formData.titularZelle || !formData.contactoZelle) {
                setError("Complete los datos de ZELLE");
                setLoading(false);
                return;
            }
        }

        if (formData.metodoPagos.includes("Transferencia-Bancaria")) {
            if (!formData.titularTransferencia || !formData.numeroRuta || !formData.numeroCuenta) {
                setError("Complete los datos de Transferencia Bancaria");
                setLoading(false);
                return;
            }
        }

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
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label text-center d-block">
                        Imagen del Premio
                    </label>

                    {(imagePreview || imageUrl) && (
                        <div className="mb-3 text-center">
                            <img
                                src={imagePreview || imageUrl}
                                alt="Preview"
                                className="img-fluid rounded border"
                                style={{ maxWidth: "300px", maxHeight: "300px" }}
                            />

                            {uploading && (
                                <div className="mt-2">
                                    <div className="spinner-border spinner-border-sm text-danger me-2"></div>
                                    <small>Subiendo imagen...</small>
                                </div>
                            )}
                        </div>
                    )}

                    <input
                        type="file"
                        className="form-control"
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                        onChange={handleImageChange}
                        disabled={loading || uploading}
                    />
                </div>

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
                    <label className="form-label">Métodos de Pago</label>

                    <div>
                        <input
                            type="checkbox"
                            checked={formData.metodoPagos.includes("ZELLE")}
                            onChange={() => handleMetodoPagoChange("ZELLE")}
                        /> ZELLE
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            checked={formData.metodoPagos.includes("Transferencia-Bancaria")}
                            onChange={() => handleMetodoPagoChange("Transferencia-Bancaria")}
                        /> Transferencia Bancaria
                    </div>
                </div>

                {formData.metodoPagos.includes("ZELLE") && (
                    <div className="border p-3 mb-3 rounded bg-light">
                        <h6>Información ZELLE</h6>

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Titular Zelle"
                            name="titularZelle"
                            value={formData.titularZelle}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Correo o Teléfono"
                            name="contactoZelle"
                            value={formData.contactoZelle}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {formData.metodoPagos.includes("Transferencia-Bancaria") && (
                    <div className="border p-3 mb-3 rounded bg-light">
                        <h6>Información Transferencia</h6>

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Titular"
                            name="titularTransferencia"
                            value={formData.titularTransferencia}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Número de Ruta"
                            name="numeroRuta"
                            value={formData.numeroRuta}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Número de Cuenta"
                            name="numeroCuenta"
                            value={formData.numeroCuenta}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className="btn btn-danger w-100"
                    disabled={loading}
                >
                    {loading ? "Actualizando..." : "Guardar Cambios"}
                </button>
            </form>
        </div >
    );
};

export default EditarRifa;
