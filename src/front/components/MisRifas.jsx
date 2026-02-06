import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getRifas } from "../actions.js";

const MisRifas = () => {

    const { store, dispatch } = useGlobalReducer();
    const { user, rifas } = store;

    const [filter, setFilter] = useState('todas'); // 'todas', 'activas', 'finalizadas'

    useEffect(() => {
        if (user && user.id) {
            getRifas(dispatch, user.id, store.token);
        }
    }, [user]);

    const handleDeleteRifa = async (rifaId) => {
        if (!confirm("¿Estás seguro de que deseas eliminar esta rifa? Esta acción no se puede deshacer.")) {
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rifa/${rifaId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${store.token}`
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la rifa");
            }

            // Actualizar el estado global
            dispatch({
                type: 'delete_rifa',
                payload: rifaId
            });

        } catch (error) {
            console.error("Error al eliminar la rifa:", error);
            alert("No se pudo eliminar la rifa. Por favor, inténtalo de nuevo.");
        }
    };

    const filteredRifas = rifas.filter(rifa => {
        if (filter === 'activas') {
            return new Date(rifa.fecha_sorteo) > new Date();
        } else if (filter === 'finalizadas') {
            return new Date(rifa.fecha_sorteo) <= new Date();
        }
        return true; // 'todas'
    });

    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="mb-2">Mis Rifas</h1>
                            <p className="text-muted">Administra todas tus rifas</p>
                        </div>
                        <Link to="/crear-rifa" className="btn btn-danger">
                            <i className="fa-solid fa-plus me-2"></i>
                            Crear Nueva Rifa
                        </Link>
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="btn-group" role="group">
                        <button
                            type="button"
                            className={`btn ${filter === 'todas' ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => setFilter('todas')}
                        >
                            Todas ({rifas.length})
                        </button>
                        <button
                            type="button"
                            className={`btn ${filter === 'activas' ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => setFilter('activas')}
                        >
                            Activas ({rifas.filter(r => new Date(r.fecha_sorteo) > new Date()).length})
                        </button>
                        <button
                            type="button"
                            className={`btn ${filter === 'finalizadas' ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => setFilter('finalizadas')}
                        >
                            Finalizadas ({rifas.filter(r => new Date(r.fecha_sorteo) <= new Date()).length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de Rifas */}
            {filteredRifas.length === 0 ? (
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center py-5">
                                <i className="fa-solid fa-ticket text-muted" style={{ fontSize: "4rem" }}></i>
                                <h4 className="mt-3 mb-2">No tienes rifas {filter === 'todas' ? '' : filter}</h4>
                                <p className="text-muted">
                                    {filter === 'todas'
                                        ? 'Crea tu primera rifa para comenzar'
                                        : `No hay rifas ${filter} en este momento`
                                    }
                                </p>
                                {filter === 'todas' && (
                                    <Link to="/crear-rifa" className="btn btn-danger mt-3">
                                        <i className="fa-solid fa-plus me-2"></i>
                                        Crear Mi Primera Rifa
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row g-3">
                    {filteredRifas.map(rifa => {
                        const activa = new Date(rifa.fecha_sorteo) > new Date();

                        return (
                            <div key={rifa.id} className="col-md-6 col-lg-4">
                                <div className="card h-100 shadow-sm border-0">
                                    {/* Imagen */}
                                    <img
                                        src={rifa.imagen || "https://via.placeholder.com/400x300"}
                                        className="card-img-top"
                                        alt={rifa.titulo}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />

                                    {/* Badge de estado */}
                                    <span
                                        className={`badge position-absolute top-0 end-0 m-2 ${activa ? 'bg-success' : 'bg-secondary'}`}
                                    >
                                        {activa ? 'Activa' : 'Finalizada'}
                                    </span>

                                    <div className="card-body">
                                        <h5 className="card-title">{rifa.titulo}</h5>
                                        <p className="card-text text-muted small">
                                            {rifa.descripcion?.substring(0, 100)}
                                            {rifa.descripcion?.length > 100 ? '...' : ''}
                                        </p>

                                        <div className="row g-2 mb-3">
                                            <div className="col-6">
                                                <small className="text-muted d-block">Precio Ticket</small>
                                                <strong>${rifa.precio_ticket}</strong>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted d-block">Total Tickets</small>
                                                <strong>{rifa.cantidad_tickets}</strong>
                                            </div>
                                            <div className="col-12">
                                                <small className="text-muted d-block">Fecha Sorteo</small>
                                                <strong>{new Date(rifa.fecha_sorteo).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</strong>
                                            </div>
                                        </div>

                                        {/* Botones de acción */}
                                        <div className="d-grid gap-2">
                                            <Link
                                                to={`/rifa/${rifa.id}`}
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                <i className="fa-solid fa-eye me-2"></i>
                                                Ver Detalles
                                            </Link>

                                            <Link
                                                to={`/comprar-ticket/${rifa.id}`}
                                                className="btn btn-success btn-sm"
                                            >
                                                <i className="fa-solid fa-ticket me-1"></i>
                                                Ver Página Pública
                                            </Link>

                                            <div className="btn-group btn-group-sm" role="group">
                                                <Link
                                                    to={`/rifa/${rifa.id}/editar`}
                                                    className="btn btn-outline-secondary"
                                                >
                                                    <i className="fa-solid fa-edit me-1"></i>
                                                    Editar
                                                </Link>
                                                <Link
                                                    to={`/rifa/${rifa.id}/compradores`}
                                                    className="btn btn-outline-success"
                                                >
                                                    <i className="fa-solid fa-users me-1"></i>
                                                    Compradores
                                                </Link>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => handleDeleteRifa(rifa.id)}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MisRifas;