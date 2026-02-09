import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import  useGlobalReducer  from "../hooks/useGlobalReducer";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
    const { store, dispatch } = useGlobalReducer();
    const { user, rifas } = store;

    const [stats, setStats] = useState({
        totalRifas: 0,
        rifasActivas: 0,
        totalVentas: 0,
        pagosPendientes: 0
    });

    const getRifas = async (dispatch, userId, token) => {
      try {
        const response = await fetch(`${API_URL}/api/rifa/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
    
          dispatch({
            type: "set_rifas",
            payload: data,
          });
    
          return { success: true, data };
        }
    
        if (response.status === 401) {
          dispatch({ type: "logout" });
          return { success: false, message: "Sesión expirada", expired: true };
        }
    
        return { success: false, message: "Error al obtener rifas" };
      } catch (error) {
        console.error("Error:", error);
        return { success: false, message: "Error de conexión" };
      }
    };

    useEffect(() => {
        if (user) {
            getRifas(dispatch, user.id, store.token);
        }
    }, [user]);

    useEffect(() => {
        const totalRifas = rifas.length;
        const rifasActivas = rifas.filter(rifa => new Date(rifa.fecha_sorteo) > new Date()).length;
        const totalVentas = rifas.reduce((sum, rifa) => sum + (rifa.tickets_vendidos || 0), 0);
        const pagosPendientes = rifas.reduce((sum, rifa) => sum + (rifa.pagos_pendientes || 0), 0);

        setStats({
            totalRifas,
            rifasActivas,
            totalVentas,
            pagosPendientes
        });
    }, [rifas]);

    const rifasRecientes = rifas
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);


    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <h1 className="mb-2">¡Bienvenido, {user?.nombre}! 👋</h1>
                    <p className="text-muted">Aquí está el resumen de tu actividad</p>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="row g-3 mb-4">
                {/* Total de Rifas */}
                <div className="col-md-3 col-sm-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted mb-1 small">Total Rifas</p>
                                    <h3 className="mb-0">{stats.totalRifas}</h3>
                                </div>
                                <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                                    <i className="fa-solid fa-ticket text-primary fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rifas Activas */}
                <div className="col-md-3 col-sm-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted mb-1 small">Rifas Activas</p>
                                    <h3 className="mb-0">{stats.rifasActivas}</h3>
                                </div>
                                <div className="bg-success bg-opacity-10 rounded-circle p-3">
                                    <i className="fa-solid fa-check-circle text-success fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Ventas */}
                <div className="col-md-3 col-sm-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted mb-1 small">Tickets Vendidos</p>
                                    <h3 className="mb-0">{stats.totalVentas}</h3>
                                </div>
                                <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                                    <i className="fa-solid fa-chart-line text-warning fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagos Pendientes */}
                <div className="col-md-3 col-sm-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted mb-1 small">Pagos Pendientes</p>
                                    <h3 className="mb-0">{stats.pagosPendientes}</h3>
                                </div>
                                <div className="bg-danger bg-opacity-10 rounded-circle p-3">
                                    <i className="fa-solid fa-dollar-sign text-danger fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Acciones Rápidas</h5>
                            <div className="row g-2">
                                <div className="col-md-3 col-sm-6">
                                    <Link to="/crear-rifa" className="btn btn-danger w-100">
                                        <i className="fa-solid fa-plus me-2"></i>
                                        Crear Rifa
                                    </Link>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <Link to="/mis-rifas" className="btn btn-outline-primary w-100">
                                        <i className="fa-solid fa-ticket me-2"></i>
                                        Ver Mis Rifas
                                    </Link>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <Link to="/clientes" className="btn btn-outline-success w-100">
                                        <i className="fa-solid fa-money-bill me-2"></i>
                                        Ver Mis Clientes
                                    </Link>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <Link to="/perfil" className="btn btn-outline-secondary w-100">
                                        <i className="fa-solid fa-user me-2"></i>
                                        Mi Perfil
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rifas Recientes */}
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="card-title mb-0">Rifas Recientes</h5>
                                <Link to="/mis-rifas" className="btn btn-sm btn-outline-danger">
                                    Ver Todas
                                </Link>
                            </div>

                            {rifasRecientes.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="fa-solid fa-ticket text-muted fs-1 mb-3"></i>
                                    <p className="text-muted">No tienes rifas creadas aún</p>
                                    <Link to="/crear-rifa" className="btn btn-danger">
                                        Crear Mi Primera Rifa
                                    </Link>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Título</th>
                                                <th>Precio</th>
                                                <th>Tickets</th>
                                                <th>Fecha Sorteo</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rifasRecientes.map(rifa => {
                                                const activa = new Date(rifa.fecha_sorteo) > new Date();
                                                return (
                                                    <tr key={rifa.id}>
                                                        <td>
                                                            <img 
                                                                src={rifa.imagen || "https://via.placeholder.com/50"} 
                                                                alt={rifa.titulo}
                                                                className="rounded"
                                                                style={{width: "50px", height: "50px", objectFit: "cover"}}
                                                            />
                                                        </td>
                                                        <td>{rifa.titulo}</td>
                                                        <td>${rifa.precio_ticket}</td>
                                                        <td>{rifa.cantidad_tickets}</td>
                                                        <td>{new Date(rifa.fecha_sorteo).toLocaleDateString()}</td>
                                                        <td>
                                                            <span className={`badge rounded-5 ${activa ? 'bg-success' : 'bg-secondary'}`}>
                                                                {activa ? 'Activa' : 'Finalizada'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <Link 
                                                                to={`/comprar-ticket/${rifa.id}`}
                                                                className="btn btn-sm btn-outline-success rounded-5"
                                                            >
                                                                <i className="fa-solid fa-ticket me-1"></i>
                                                                Vender
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;