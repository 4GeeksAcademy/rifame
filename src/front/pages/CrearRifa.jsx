import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CrearRifa = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        tituloRifa: "",
        descripcionRifa: "",
        precioTicket: "",
        metodoPagos: "",
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

    // ⚠️ IMPORTANTE: Reemplaza con tu Cloud Name de Cloudinary
    const CLOUDINARY_CLOUD_NAME = "dkkkjhhgl";
    const CLOUDINARY_UPLOAD_PRESET = "rifas_images";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validar tamaño (máx 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("La imagen no puede superar 5MB");
            return;
        }

        // Validar tipo
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setError("Solo se permiten imágenes JPG, PNG o WEBP");
            return;
        }

        // Mostrar preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        setImageFile(file);
        
        // Subir automáticamente a Cloudinary
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
            !formData.metodoPagos || !formData.cantidadTickets || !formData.loteria || 
            !formData.fechaSorteo) {
            setError("Por favor, complete todos los campos obligatorios.");
            return;
        }

        if (isNaN(formData.precioTicket) || formData.precioTicket <= 0) {
            setError("Por favor, ingrese un precio válido para el ticket.");
            return;
        }

        // Validar que exista un token
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No estás autenticado. Por favor, inicia sesión.");
            navigate("/login");
            return;
        }

        // Si hay una imagen pero no se ha subido a Cloudinary
        if (imageFile && !imageUrl) {
            setError("Espera a que termine de subir la imagen...");
            return;
        }

        setLoading(true);

        try {
            // Preparar los datos para enviar
            const requestBody = {
                titulo: formData.tituloRifa,
                descripcion: formData.descripcionRifa,
                precio_ticket: parseFloat(formData.precioTicket),
                cantidad_tickets: parseInt(formData.cantidadTickets),
                loteria: formData.loteria,
                fecha_sorteo: formData.fechaSorteo,
                metodo_pagos: formData.metodoPagos,
                imagen: imageUrl || null, // URL de Cloudinary
                titular_zelle: formData.titularZelle || null,
                contacto_zelle: formData.contactoZelle || null,
                titular_transferencia: formData.titularTransferencia || null,
                numero_ruta: formData.numeroRuta || null,
                numero_cuenta: formData.numeroCuenta || null
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
                
                <h1 className="text-center text-danger text-bold" style={{fontSize: "clamp(32px, 5vw, 60px)"}}>
                    Crear Rifa
                </h1>
                
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" className="btn-close" onClick={() => setError("")}></button>
                    </div>
                )}
                
                <form className="mt-4 mx-auto" style={{maxWidth: "600px"}} onSubmit={handleSubmit}>
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

                    {/* Método de Pago */}
                    <div className="mb-3">
                        <label htmlFor="metodoPagos" className="form-label">
                            Método de Pago <span className="text-danger">*</span>
                        </label>
                        <select 
                            className="form-select" 
                            name="metodoPagos" 
                            id="metodoPagos"
                            value={formData.metodoPagos} 
                            onChange={handleChange}
                            disabled={loading}
                            required
                        >
                            <option value="">Seleccione un método de pago</option>
                            <option value="ZELLE">Zelle</option>
                            <option value="Transferencia-Bancaria">Transferencia Bancaria</option>
                            <option value="Llenar-Despues">Llenar Después</option>
                        </select>
                    </div>

                    {/* Información de Zelle */}
                    {formData.metodoPagos === "ZELLE" && (
                        <div className="mb-3 p-3 border rounded bg-light">
                            <h5 className="text-danger mb-3">Información de Zelle</h5>
                            <div className="mb-3">
                                <label htmlFor="titularZelle" className="form-label">Titular de la Cuenta</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="titularZelle" 
                                    name="titularZelle" 
                                    placeholder="Nombre completo del titular"
                                    value={formData.titularZelle} 
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactoZelle" className="form-label">
                                    Correo Electrónico o Número de Teléfono
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
                                />
                            </div>
                        </div>
                    )}

                    {/* Información de Transferencia Bancaria */}
                    {formData.metodoPagos === "Transferencia-Bancaria" && (
                        <div className="mb-3 p-3 border rounded bg-light">
                            <h5 className="text-danger mb-3">Información de Transferencia Bancaria</h5>
                            <div className="mb-3">
                                <label htmlFor="titularTransferencia" className="form-label">
                                    Titular de la Cuenta
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
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numeroRuta" className="form-label">Número de Ruta</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="numeroRuta" 
                                    name="numeroRuta" 
                                    placeholder="123456789"
                                    value={formData.numeroRuta} 
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numeroCuenta" className="form-label">Número de Cuenta</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="numeroCuenta" 
                                    name="numeroCuenta" 
                                    placeholder="987654321"
                                    value={formData.numeroCuenta} 
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    )}

                    {/* Imagen del Premio con Cloudinary */}
                    <div className="mb-3">
                        <label htmlFor="imagenPremio" className="form-label">
                            Imagen del Premio
                        </label>
                        <p className="text-muted small mb-2">
                            Tamaño máximo: 5MB | Formatos: JPG, PNG, WEBP
                        </p>
                        
                        {/* Preview de la imagen */}
                        {imagePreview && (
                            <div className="mb-3 text-center">
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="img-fluid rounded border"
                                    style={{maxWidth: "300px", maxHeight: "300px"}}
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
                            disabled={loading || uploading}
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