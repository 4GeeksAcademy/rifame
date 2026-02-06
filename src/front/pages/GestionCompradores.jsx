import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const GestionCompradores = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const { rifaId } = useParams();
    const navigate = useNavigate();

    const [compradores, setCompradores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtroEstado, setFiltroEstado] = useState('todos'); // todos, pendiente, verificado, rechazado
    const [comprobanteSeleccionado, setComprobanteSeleccionado] = useState(null);

    useEffect(() => {
        fetchCompradores();
    }, [rifaId]);

    const fetchCompradores = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/rifa/${rifaId}/compradores`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCompradores(data);
                setError(null);
            } else if (response.status === 403) {
                setError("No tienes permiso para ver esta información");
            } else if (response.status === 404) {
                setError("Rifa no encontrada");
            } else {
                setError("Error al cargar los compradores");
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    const verificarComprador = async (compradorId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        if (!window.confirm('¿Estás seguro de verificar este comprador?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/comprador/${compradorId}/verificar`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Comprador verificado exitosamente');
                fetchCompradores(); // Recargar la lista
            } else {
                alert('Error al verificar comprador');
            }
        } catch (err) {
            alert('Error de conexión');
        }
    };

    const rechazarComprador = async (compradorId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        if (!window.confirm('¿Estás seguro de rechazar este comprador? El ticket quedará disponible nuevamente.')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/comprador/${compradorId}/rechazar`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Comprador rechazado y ticket liberado');
                fetchCompradores(); // Recargar la lista
            } else {
                alert('Error al rechazar comprador');
            }
        } catch (err) {
            alert('Error de conexión');
        }
    };

    const compradoresFiltrados = filtroEstado === 'todos' 
        ? compradores 
        : compradores.filter(c => c.estado === filtroEstado);

    const getEstadoBadgeClass = (estado) => {
        switch (estado) {
            case 'pendiente': return 'bg-warning text-dark';
            case 'verificado': return 'bg-success';
            case 'rechazado': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando compradores...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    <i className="fa-solid fa-exclamation-triangle me-2"></i>
                    {error}
                </div>
                <button className="btn btn-danger" onClick={() => navigate('/mis-rifas')}>
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Volver a Mis Rifas
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-danger fw-bold">
                    <i className="fa-solid fa-users me-2"></i>
                    Gestión de Compradores
                </h1>
                <button className="btn btn-outline-danger" onClick={() => navigate('/mis-rifas')}>
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Volver
                </button>
            </div>

            {/* Filtros */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Filtrar por estado</h5>
                    <div className="btn-group" role="group">
                        <button
                            className={`btn ${filtroEstado === 'todos' ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => setFiltroEstado('todos')}
                        >
                            Todos ({compradores.length})
                        </button>
                        <button
                            className={`btn ${filtroEstado === 'pendiente' ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
                            onClick={() => setFiltroEstado('pendiente')}
                        >
                            Pendientes ({compradores.filter(c => c.estado === 'pendiente').length})
                        </button>
                        <button
                            className={`btn ${filtroEstado === 'verificado' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setFiltroEstado('verificado')}
                        >
                            Verificados ({compradores.filter(c => c.estado === 'verificado').length})
                        </button>
                        <button
                            className={`btn ${filtroEstado === 'rechazado' ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => setFiltroEstado('rechazado')}
                        >
                            Rechazados ({compradores.filter(c => c.estado === 'rechazado').length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de compradores */}
            {compradoresFiltrados.length === 0 ? (
                <div className="alert alert-info">
                    <i className="fa-solid fa-info-circle me-2"></i>
                    No hay compradores {filtroEstado !== 'todos' ? `en estado "${filtroEstado}"` : ''} para esta rifa.
                </div>
            ) : (
                <div className="row g-3">
                    {compradoresFiltrados.map((comprador) => (
                        <div key={comprador.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">Ticket #{comprador.numero_ticket}</span>
                                    <span className={`badge ${getEstadoBadgeClass(comprador.estado)}`}>
                                        {comprador.estado.toUpperCase()}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <h6 className="card-title">
                                        <i className="fa-solid fa-user me-2"></i>
                                        {comprador.nombre_comprador}
                                    </h6>
                                    <p className="card-text mb-1">
                                        <i className="fa-solid fa-envelope me-2"></i>
                                        <small>{comprador.email_comprador}</small>
                                    </p>
                                    <p className="card-text mb-1">
                                        <i className="fa-solid fa-phone me-2"></i>
                                        <small>{comprador.telefono_comprador || 'N/A'}</small>
                                    </p>
                                    <p className="card-text mb-2">
                                        <i className="fa-solid fa-globe me-2"></i>
                                        <small>{comprador.pais_comprador || 'N/A'}</small>
                                    </p>

                                    {comprador.comprobante_pago && (
                                        <button
                                            className="btn btn-sm btn-outline-primary w-100 mb-2"
                                            onClick={() => setComprobanteSeleccionado(comprador.comprobante_pago)}
                                        >
                                            <i className="fa-solid fa-image me-2"></i>
                                            Ver Comprobante
                                        </button>
                                    )}

                                    {comprador.estado === 'pendiente' && (
                                        <div className="d-flex gap-2 mt-2">
                                            <button
                                                className="btn btn-sm btn-success flex-fill"
                                                onClick={() => verificarComprador(comprador.id)}
                                            >
                                                <i className="fa-solid fa-check me-1"></i>
                                                Verificar
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger flex-fill"
                                                onClick={() => rechazarComprador(comprador.id)}
                                            >
                                                <i className="fa-solid fa-times me-1"></i>
                                                Rechazar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal para ver comprobante */}
            {comprobanteSeleccionado && (
                <div 
                    className="modal fade show d-block" 
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onClick={() => setComprobanteSeleccionado(null)}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h5 className="modal-title">Comprobante de Pago</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setComprobanteSeleccionado(null)}
                                ></button>
                            </div>
                            <div className="modal-body text-center">
                                <img 
                                    src={comprobanteSeleccionado} 
                                    alt="Comprobante de pago" 
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '70vh' }}
                                />
                            </div>
                            <div className="modal-footer">
                                <a 
                                    href={comprobanteSeleccionado} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <i className="fa-solid fa-external-link-alt me-2"></i>
                                    Abrir en nueva pestaña
                                </a>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setComprobanteSeleccionado(null)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionCompradores;
