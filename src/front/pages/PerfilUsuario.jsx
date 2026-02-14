import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const PerfilUsuario = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!storedUser || !token) {
            navigate("/login");
            return;
        }
        fetch(`${API_URL}/api/user/${storedUser.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            if(res.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
                return null;
            }
            return res.json();
        })
        .then(data => {
            if (data) setUser(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error al cargar perfil:", err);
            setLoading(false);
        });
          
    }, [navigate]);
    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-danger"></div>
                <p className="mt-3">Cargando perfil...</p>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="container mt-5 text-center">
                <h2 className="text-danger">No se pudo cargar el perfil</h2>
            </div>
        );
    }

 return (
    <div className="container py-5">

            <div className="text-center mb-5">
                <h1 className="fw-bold">
                    Mi Perfil
                </h1>
                <p className="text-muted">
                    Informacion de tu Cuenta
                </p>
            </div>
        <div className="row justify-content-center g-4">

        <div className="col-12 col-md-5 col-lg-4">
            <div className="card border-0 shadow-sm text-center p-4 h-100">
                <div className="card-body">
                    <img 
                        src={user.foto_perfil || "https://via.placeholder.com/150"}
                        alt="Foto de perfil"
                        className="rounded-circle mx-auto mb-3"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    <h4 className="fw-semibold">{user.nombre} {user.apellido}</h4>
                    <p className="text-muted">{user.email}</p>
                </div>

                <span className={`badge ${user.admin ? "bg-dark" : "bg-primary"} rounded-5`}>
                    {user.admin ? "Administrador" : "Usuario"}
                </span>

                <div className="mt-4">
                    <button className="btn btn-danger w-100 mt-4"
                        onClick={() => navigate(`/editar-usuario/${user.id}`)}>
                        <i className="fa-solid fa-pen me-2"></i> 
                        Editar Perfil
                    </button>
                </div>
            </div>
        </div>
    
    
    <div className="col-12 col-md-7 col-lg-6">
        <div className="card border-0 shadow-sm p-4 h-100">
                  <h5 className="mb-4 fw-semibold">
                    Información Personal
                  </h5>

                     <div className="row mb-3">
                        <div className="col-12 col-sm-6">
                            <label className="text-muted mb-1">Nombre:</label>
                            <p className="fw-bold">{user.nombre}</p>
                        </div>
            
                        <div className="col-12 col-sm-6">
                            <p className="text-muted mb-1">Apellido:</p>
                            <p className="mb-0">{user.apellido}</p>
                        </div>
                     </div>

                  <div className="row mb-3">
                        <div className="col-md-6">
                            <p className="text-muted mb-1">Email:</p>
                            <p className="mb-0">{user.email}</p>
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="text-muted mb-1">Teléfono:</p>
                            <p className="mb-0">{user.telefono || "No proporcionado"}</p>
                        </div>
                  </div>
                     <div>
                        <p className="text-muted mb-1">
                         Estado
                        </p>
                        <p className={`fw-bold ${user.is_active ? "text-success" : "text-danger"}`}>
                        {user.is_active ? "Activo" : "Inactivo"}
                        </p>
                     </div>
            </div>
        </div>
    </div>
</div>
);
};

export default PerfilUsuario;