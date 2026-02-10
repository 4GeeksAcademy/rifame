import { useState, useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Clientes = () => {
    const { store } = useGlobalReducer();
    const { user, token } = store;

    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        if (user?.id && token) {
            fetchClientes();
        } else {
            setLoading(false);
        }
    }, [user?.id, token]);

    const fetchClientes = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}/api/user/${user.id}/clientes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setClientes(data);
            } else if (response.status === 401) {
                setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
            } else if (response.status === 403) {
                setError('No tienes permiso para ver esta información.');
            } else {
                setError('Error al cargar los clientes');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        (cliente.telefono && cliente.telefono.includes(busqueda))
    );

    if (loading) {
        return (
            <div className="container mt-5 text-center" style={{ paddingTop: '80px' }}>
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando clientes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5" style={{ paddingTop: '80px' }}>
                <div className="alert alert-danger" role="alert">
                    <i className="fa-solid fa-exclamation-triangle me-2"></i>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <button
                                type="button"
                                className="btn btn-link"
                                onClick={() => window.history.back()}
                            >
                                <span className="text-danger fs-3">
                                    <i className="fa-solid fa-angle-left"></i>
                                </span>
                            </button>
                            <div className="ms-2">
                                <h1 className="mb-0">Clientes</h1>
                                <p className="text-muted mb-0">Administra todos tus clientes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buscador */}
            <div className="row mb-4">
                <div className="col-12 col-md-6">
                    <div className="input-group">
                        <span className="input-group-text bg-white">
                            <i className="fa-solid fa-magnifying-glass text-danger"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nombre, email o teléfono..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Tabla de clientes */}
            {clientesFiltrados.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    <i className="fa-solid fa-info-circle me-2"></i>
                    {busqueda ? 'No se encontraron clientes que coincidan con la búsqueda' : 'No tienes clientes aún'}
                </div>
            ) : (
                <div className="card border-0 shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-start">ID</th>
                                    <th className="text-start">Nombre</th>
                                    <th className="text-start">Email</th>
                                    <th className="text-start">Teléfono</th>
                                    <th className="text-start">País</th>
                                    <th className="text-start">Tickets</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientesFiltrados.map((cliente) => (
                                    <tr key={cliente.email}>
                                        <td className="text-start">
                                            #{cliente.id}
                                        </td>
                                        <td className="text-start">
                                            <i className="fa-solid fa-user me-2 text-danger"></i>
                                            {cliente.nombre}
                                        </td>
                                        <td className="text-start">
                                            <small>{cliente.email}</small>
                                        </td>
                                        <td className="text-start">
                                            {cliente.telefono || 'N/A'}
                                        </td>
                                        <td className="text-start">
                                            {cliente.pais || 'N/A'}
                                        </td>
                                        <td className="text-start">
                                            <span className="badge bg-danger rounded-5">
                                                {cliente.rifas_compradas}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clientes;