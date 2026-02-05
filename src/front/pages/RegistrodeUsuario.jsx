import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const RegistrodeUsuario = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        contrasena: "",
        confirmarContrasena: "",
        terminos: false
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validaciones
        if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono || !formData.contrasena || !formData.confirmarContrasena) {
            setError("Por favor, complete todos los campos.");
            return;
        }
        if (formData.contrasena.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Por favor, ingrese un correo electrónico válido.");
            return;
        }
        if (!/^\d{7,15}$/.test(formData.telefono)) {
            setError("Por favor, ingrese un número de teléfono válido (7-15 dígitos).");
            return;
        }
        if (formData.contrasena !== formData.confirmarContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        if (!formData.terminos) {
            setError("Debe aceptar los términos y condiciones.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    email: formData.email,
                    telefono: formData.telefono,
                    contrasena: formData.contrasena
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Error al registrarse");
                setLoading(false);
                return;
            }

            // ✅ GUARDAR EL TOKEN Y LA INFORMACIÓN DEL USUARIO
            // El backend ahora devuelve el token automáticamente
            if (data.access_token) {
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user", JSON.stringify(data.user));
                
                // Redirigir al dashboard directamente después del registro
                navigate("/dashboard"); // Cambia esto a la ruta que necesites
            } else {
                // Si el backend no devuelve token, redirigir al login
                navigate("/login");
            }

        } catch (err) {
            setError("Error de conexión con el servidor.");
            console.error("Error:", err);
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
                <h1 className="text-center text-danger text-bold" style={{fontSize: "clamp(30px, 5vw, 60px)"}}>
                    Registro de Usuario
                </h1>

                {error && (
                    <div className="alert alert-danger text-center mx-auto" style={{maxWidth: "500px"}}>
                        {error}
                    </div>
                )}

                <form className="mx-auto mt-4" style={{maxWidth: "500px"}} onSubmit={handleSubmit} noValidate>
                    <div className="mb-3 row g-3">
                        <div className="col-12 col-sm-6">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre" 
                                name="nombre" 
                                value={formData.nombre} 
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="apellido" 
                                name="apellido" 
                                value={formData.apellido} 
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            id="telefono" 
                            name="telefono" 
                            value={formData.telefono} 
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="contrasena" 
                            value={formData.contrasena} 
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmarPassword" className="form-label">Confirmar Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="confirmarPassword" 
                            name="confirmarContrasena" 
                            value={formData.confirmarContrasena} 
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-3 form-check mt-3">
                        <input 
                            type="checkbox" 
                            id="terminos" 
                            name="terminos" 
                            className="me-2" 
                            checked={formData.terminos} 
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <label htmlFor="terminos" className="form-label">
                            Acepto los términos y condiciones
                        </label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button 
                            className="btn btn-danger w-100 w-sm-auto px-5" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Registrando...
                                </>
                            ) : (
                                "Registrarse"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <p className="text-center mt-3">
                    ¿Ya tienes una cuenta? <Link to="/login" className="text-danger">Inicia sesión aquí</Link>
                </p>
            </div>
        </div>
    );
}

export default RegistrodeUsuario;