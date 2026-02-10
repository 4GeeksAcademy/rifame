import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const EditarUsuario = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;
     const CLOUDINARY_CLOUD_NAME = "dkkkjhhgl";
    const CLOUDINARY_UPLOAD_PRESET = "rifas_images";

    console.log("USER EN LOCALSTORAGE", storedUser); 
    console.log("USER ID", userId);     
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre:"",
        apellido:"",
        email:"",
        telefono:"",
        foto_perfil:""
    });
const [file, setFile] = useState(null);
const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then(res => res.json())
        .then(data => {
            setFormData({
                nombre: data.nombre || "",
                apellido: data.apellido || "",
                email: data.email || "",
                telefono: data.telefono || "",
                foto_perfil: data.foto_perfil || ""
            });
        })
        .catch(err => console.error(err));
    }, [userId]);


const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleImageChange = (e) => {
    setFile(e.target.files[0]);
};

const handleFileChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let fotoUrl = formData.foto_perfil; 
    try { 
        if (file) {
        const imgData = new FormData();
        imgData.append("file", file);
        imgData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        imgData.append("folder", "rifas_images");
        
        const uploadRes= await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: imgData
        });
        const uploadData = await uploadRes.json();
        if (!uploadData.secure_url) {
            alert ("Error al subir imagen");
            return;
        }
        fotoUrl = uploadData.secure_url;
    }
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({...formData, foto_perfil: fotoUrl })
        });

        if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
                return;
            }

        if (!res.ok) {
            alert("Error al actualizar usuario");
            return;
        }
        navigate("/dashboard");
}
 catch (error) {
    console.error("Error:", error);
    alert("Error al actualizar usuario");
}
};

return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="card shadow-lg w-100 border border-danger" style={{maxWidth: "500px"}}>
            <div className="card-header bg-danger text-white text-center">
                <h3 className="text-center mb-4">Editar Usuario</h3>
                </div>
            <div className="card-body">
                <form onSubmit={handleFileChange} encType="multipart/form-data">

                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                        type="text"
                        name="nombre"
                        className="form-control mb-2"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellido</label>
                        <input
                        type="text"
                        name="apellido"
                        className="form-control mb-2"
                        value={formData.apellido}
                        onChange={handleChange}
                        placeholder="Apellido"
                        required
                        />
                    </div>
                        <div className="mb-4">
                                <label className="form-label">Correo Electrónico</label>
                            <input
                            type="email"
                            name="email"
                            className="form-control "
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Correo Electrónico"
                            required
                            />
                        </div>
                        <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input
                        type="text"
                        name="telefono"
                        className="form-control mb-2"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Foto de Perfil</label>
                        <input
                        type="file"
                        className="form-control mb-3"
                        onChange={handleImageChange}
                        />
                    </div>

                    {formData.foto_perfil && (
                        <div className="mb-3 text-center">
                            <img 
                            src={formData.foto_perfil}
                            alt="Foto de perfil"
                            className="img-thumbnail"
                            style={{maxWidth: "120px", maxHeight: "120px"}}
                            />
                        </div>
                    )}
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                                        Cancelar
                                    </button>   
                                    <button type="submit" className="btn btn-primary">
                                        Guardar Cambios
                                    </button>
                                 </div>
                </form>
            </div>
        </div>
    </div>
);
};
export default EditarUsuario;