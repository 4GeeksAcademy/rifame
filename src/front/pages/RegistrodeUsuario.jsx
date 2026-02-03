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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        try {
            const response = await fetch("https://effective-couscous-pjq9qjr49xwg3rw55-3001.app.github.dev/api/user", {
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

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Error al registrarse");
                return;
            }

            navigate("/login");

        } catch (err) {
            setError("Error de conexión con el servidor.");
        }
    };

    return (
        <div>
            <div className="container mt-5 px-3 px-sm-4">
                <button type="button" className="btn btn-link mb-3 d-flex p-0">
                    <Link to="/" className="text-danger fs-3"><i className="fa-solid fa-angle-left"></i></Link>
                </button>
                <h1 className="text-center text-danger text-bold" style={{fontSize: "clamp(30px, 5vw, 60px)"}}>Registro de Usuario</h1>

                {error && <div className="alert alert-danger text-center mx-auto" style={{maxWidth: "500px"}}>{error}</div>}

                <form className="mx-auto mt-4" style={{maxWidth: "500px"}} onSubmit={handleSubmit} noValidate>
                    <div className="mb-3 row g-3">
                        <div className="col-12 col-sm-6">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required/>
                        </div>
                        <div className="col-12 col-sm-6">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmarPassword" className="form-label">Confirmar Contraseña</label>
                        <input type="password" className="form-control" id="confirmarPassword" name="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3 form-check mt-3">
                        <input type="checkbox" id="terminos" name="terminos" className="me-2" checked={formData.terminos} onChange={handleChange} required/>
                        <label htmlFor="terminos" className="form-label">Acepto los términos y condiciones</label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-danger w-100 w-sm-auto px-5" type="submit">Registrarse</button>
                    </div>
                </form>
            </div>
            <div>
                <p className="text-center mt-3">¿Ya tienes una cuenta? <Link to="/login" className="text-danger">Inicia sesión aquí</Link></p>
            </div>
        </div>
    );
}

export default RegistrodeUsuario;