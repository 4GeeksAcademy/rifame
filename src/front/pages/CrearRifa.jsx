import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CrearRifa = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        tituloRifa: "",
        descripcionRifa: "",
        precioTicket: "",
        metodoPagos: [], // ✅ Ahora es un array
        cantidadTickets: "",
        loteria: "",
        fechaSorteo: "",
        titularZelle: "",
        contactoZelle: "",
        titularTransferencia: "",
        numeroRuta: "",
        numeroCuenta: ""
    });

    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const CLOUDINARY_CLOUD_NAME = "dkkkjhhgl";
    const CLOUDINARY_UPLOAD_PRESET = "rifas_images";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // ✅ Nueva función para manejar checkboxes de métodos de pago
    const handleMetodoPagoChange = (metodo) => {
        setFormData(prev => {
            const metodosActuales = prev.metodoPagos;
            const yaSeleccionado = metodosActuales.includes(metodo);

            if (yaSeleccionado) {
                return {
                    ...prev,
                    metodoPagos: metodosActuales.filter(m => m !== metodo)
                };
            } else {
                return {
                    ...prev,
                    metodoPagos: [...metodosActuales, metodo]
                };
            }
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
                console.log("Imagen subida exitosamente:", data.secure_url);
                setUploading(false);
                return data.secure_url;
            } else {
                throw new Error("Error al subir la imagen");
            }
        } catch (error) {
            console.error("Error al subir imagen:", error);
            setError("Error al subir la imagen. Por favor, intenta nuevamente.");
            setUploading(false);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validaciones
        if (!formData.tituloRifa || !formData.descripcionRifa || !formData.precioTicket ||
            formData.metodoPagos.length === 0 || !formData.cantidadTickets || !formData.loteria ||
            !formData.fechaSorteo) {
            setError("Por favor, complete todos los campos obligatorios.");
            return;
        }

        if (isNaN(formData.precioTicket) || formData.precioTicket <= 0) {
            setError("Por favor, ingrese un precio válido para el ticket.");
            return;
        }

        // ✅ Validar que si seleccionó Zelle, complete los campos
        if (formData.metodoPagos.includes("ZELLE")) {
            if (!formData.titularZelle || !formData.contactoZelle) {
                setError("Por favor, complete todos los campos de Zelle");
                return;
            }
        }

        // ✅ Validar que si seleccionó Transferencia, complete los campos
        if (formData.metodoPagos.includes("Transferencia-Bancaria")) {
            if (!formData.titularTransferencia || !formData.numeroRuta || !formData.numeroCuenta) {
                setError("Por favor, complete todos los campos de Transferencia Bancaria");
                return;
            }
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("No estás autenticado. Por favor, inicia sesión.");
            navigate("/login");
            return;
        }

        if (imageFile && !imageUrl) {
            setError("Espera a que termine de subir la imagen...");
            return;
        }

        setLoading(true);

        try {
            const requestBody = {
                titulo: formData.tituloRifa,
                descripcion: formData.descripcionRifa,
                precio_ticket: parseFloat(formData.precioTicket),
                cantidad_tickets: parseInt(formData.cantidadTickets),
                loteria: formData.loteria,
                fecha_sorteo: formData.fechaSorteo,
                metodo_pagos: formData.metodoPagos.join(','), // ✅ Convertir array a string separado por comas
                imagen: imageUrl || null,
                titular_zelle: formData.metodoPagos.includes("ZELLE") ? formData.titularZelle : null,
                contacto_zelle: formData.metodoPagos.includes("ZELLE") ? formData.contactoZelle : null,
                titular_transferencia: formData.metodoPagos.includes("Transferencia-Bancaria") ? formData.titularTransferencia : null,
                numero_ruta: formData.metodoPagos.includes("Transferencia-Bancaria") ? formData.numeroRuta : null,
                numero_cuenta: formData.metodoPagos.includes("Transferencia-Bancaria") ? formData.numeroCuenta : null
            };

            console.log("Enviando datos:", requestBody);

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rifa`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Rifa creada exitosamente:", data);
                alert("¡Rifa creada exitosamente!");
                navigate("/mis-rifas");
            } else {
                if (response.status === 401) {
                    setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setTimeout(() => navigate("/login"), 2000);
                } else {
                    setError(data.msg || data.message || "Error al crear la rifa");
                }
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setError("Error de conexión con el servidor. Por favor, intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="container mt-5 px-3 px-sm-4">
                <button type="button" className="btn btn-link mb-3 d-flex p-0">
                    <Link to="/" className="text-danger fs-3">
                        <i className="fa-solid fa-angle-left"></i>
                    </Link>
                </button>

                <h1 className="text-center text-danger text-bold" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
                    Crear Rifa
                </h1>

                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" className="btn-close" onClick={() => setError("")}></button>
                    </div>
                )}

                <form className="mt-4 mx-auto" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
                    {/* Título */}
                    <div className="mb-3">
                        <label htmlFor="tituloRifa" className="form-label">
                            Título de la Rifa <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="tituloRifa"
                            id="tituloRifa"
                            placeholder="Ej: Rifa de un iPhone 15 Pro"
                            value={formData.tituloRifa}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div className="mb-3">
                        <label htmlFor="descripcionRifa" className="form-label">
                            Descripción <span className="text-danger">*</span>
                        </label>
                        <textarea
                            className="form-control"
                            name="descripcionRifa"
                            id="descripcionRifa"
                            rows="3"
                            placeholder="Describe los detalles del premio y las condiciones"
                            value={formData.descripcionRifa}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    {/* Precio del Ticket */}
                    <div className="mb-3">
                        <label htmlFor="precioTicket" className="form-label">
                            Precio por Ticket ($) <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            name="precioTicket"
                            id="precioTicket"
                            placeholder="10.00"
                            value={formData.precioTicket}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    {/* Cantidad de Tickets */}
                    <div className="mb-3">
                        <label htmlFor="cantidadTickets" className="form-label">
                            Cantidad de Tickets <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select"
                            name="cantidadTickets"
                            id="cantidadTickets"
                            value={formData.cantidadTickets}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        >
                            <option value="">Seleccione la cantidad</option>
                            <option value="100">100 tickets</option>
                            <option value="1000">1,000 tickets</option>
                        </select>
                    </div>

                    {/* Lotería */}
                    <div className="mb-3">
                        <label htmlFor="loteria" className="form-label">
                            Lotería <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="loteria"
                            id="loteria"
                            placeholder="Ej: Lotería Nacional"
                            value={formData.loteria}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    {/* Fecha del Sorteo */}
                    <div className="mb-3">
                        <label htmlFor="fechaSorteo" className="form-label">
                            Fecha y Hora del Sorteo <span className="text-danger">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="fechaSorteo"
                            id="fechaSorteo"
                            value={formData.fechaSorteo}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    {/* ✅ Métodos de Pago con Checkboxes */}
                    <div className="mb-3">
                        <label className="form-label">
                            Métodos de Pago <span className="text-danger">*</span>
                        </label>
                        <p className="text-muted small">Selecciona uno o ambos métodos de pago</p>

                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="zelleCheck"
                                checked={formData.metodoPagos.includes("ZELLE")}
                                onChange={() => handleMetodoPagoChange("ZELLE")}
                                disabled={loading}
                            />
                            <label className="form-check-label" htmlFor="zelleCheck">
                                <i className="fa-solid fa-money-bill-transfer me-2 text-primary"></i>
                                Zelle
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="transferenciaCheck"
                                checked={formData.metodoPagos.includes("Transferencia-Bancaria")}
                                onChange={() => handleMetodoPagoChange("Transferencia-Bancaria")}
                                disabled={loading}
                            />
                            <label className="form-check-label" htmlFor="transferenciaCheck">
                                <i className="fa-solid fa-building-columns me-2 text-success"></i>
                                Transferencia Bancaria
                            </label>
                        </div>

                        {formData.metodoPagos.length === 0 && (
                            <small className="text-danger">Debes seleccionar al menos un método de pago</small>
                        )}
                    </div>

                    {/* ✅ Información de Zelle - Solo si está seleccionado */}
                    {formData.metodoPagos.includes("ZELLE") && (
                        <div className="mb-3 p-3 border rounded bg-light">
                            <h5 className="text-danger mb-3">
                                <i className="fa-solid fa-money-bill-transfer me-2"></i>
                                Información de Zelle
                            </h5>
                            <div className="mb-3">
                                <label htmlFor="titularZelle" className="form-label">
                                    Titular de la Cuenta <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="titularZelle"
                                    name="titularZelle"
                                    placeholder="Nombre completo del titular"
                                    value={formData.titularZelle}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactoZelle" className="form-label">
                                    Correo Electrónico o Número de Teléfono <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contactoZelle"
                                    name="contactoZelle"
                                    placeholder="correo@ejemplo.com o +1234567890"
                                    value={formData.contactoZelle}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* ✅ Información de Transferencia Bancaria - Solo si está seleccionado */}
                    {formData.metodoPagos.includes("Transferencia-Bancaria") && (
                        <div className="mb-3 p-3 border rounded bg-light">
                            <h5 className="text-danger mb-3">
                                <i className="fa-solid fa-building-columns me-2"></i>
                                Información de Transferencia Bancaria
                            </h5>
                            <div className="mb-3">
                                <label htmlFor="titularTransferencia" className="form-label">
                                    Titular de la Cuenta <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="titularTransferencia"
                                    name="titularTransferencia"
                                    placeholder="Nombre completo del titular"
                                    value={formData.titularTransferencia}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numeroRuta" className="form-label">
                                    Número de Ruta <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="numeroRuta"
                                    name="numeroRuta"
                                    placeholder="123456789"
                                    value={formData.numeroRuta}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numeroCuenta" className="form-label">
                                    Número de Cuenta <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="numeroCuenta"
                                    name="numeroCuenta"
                                    placeholder="987654321"
                                    value={formData.numeroCuenta}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Imagen del Premio */}
                    <div className="mb-3">
                        <label htmlFor="imagenPremio" className="form-label">
                            Imagen del Premio
                        </label>
                        <p className="text-muted small mb-2">
                            Tamaño máximo: 5MB | Formatos: JPG, PNG, WEBP
                        </p>

                        {imagePreview && (
                            <div className="mb-3 text-center">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="img-fluid rounded border"
                                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                                />
                                {uploading && (
                                    <div className="mt-2">
                                        <div className="spinner-border spinner-border-sm text-danger me-2" role="status"></div>
                                        <small className="text-muted">Subiendo a Cloudinary...</small>
                                    </div>
                                )}
                                {imageUrl && !uploading && (
                                    <div className="mt-2">
                                        <i className="fa-solid fa-check-circle text-success me-2"></i>
                                        <small className="text-success">¡Imagen subida exitosamente!</small>
                                    </div>
                                )}
                            </div>
                        )}

                        <input
                            type="file"
                            className="form-control"
                            name="imagenPremio"
                            id="imagenPremio"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImageChange}
                            disabled={loading || uploading}
                        />
                    </div>

                    {/* Botón de Submit */}
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-danger w-100 w-sm-auto px-5"
                            disabled={loading || uploading || formData.metodoPagos.length === 0}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Creando...
                                </>
                            ) : uploading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Subiendo imagen...
                                </>
                            ) : (
                                "Crear Rifa"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearRifa;