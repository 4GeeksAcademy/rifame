import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Pagos = () => {
    const { user } = useAuth();
    const [compras, setCompras] = useState([]);
    const [filteredCompras, setFilteredCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filtros
    const [filters, setFilters] = useState({
        rifa: "",
        participante: "",
        estado: "todas", // todas, verificadas, pendientes
        tipoPago: "",
        modo: "" // todas, online, presencial
    });

    useEffect(() => {
        if (user?.id) {
            fetchCompras();
        }
    }, [user]);

    useEffect(() => {
        applyFilters();
    }, [filters, compras]);

    const fetchCompras = async () => {
        const token = localStorage.getItem("token");

        if (!user?.id) {
            setLoading(false);
            return;
        }
        
        try {
            // Aquí deberías tener un endpoint que devuelva todas las compras
            // de las rifas del usuario
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/compras/user/${user.id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                setCompras(data);
            }
        } catch (error) {
            console.error("Error al obtener compras:", error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...compras];

        if (filters.rifa) {
            filtered = filtered.filter(c => 
                c.rifa_titulo?.toLowerCase().includes(filters.rifa.toLowerCase())
            );
        }

        if (filters.participante) {
            filtered = filtered.filter(c => 
                c.comprador_nombre?.toLowerCase().includes(filters.participante.toLowerCase()) ||
                c.comprador_email?.toLowerCase().includes(filters.participante.toLowerCase())
            );
        }

        if (filters.estado !== "todas") {
            filtered = filtered.filter(c => {
                if (filters.estado === "verificadas") return c.verificado;
                if (filters.estado === "pendientes") return !c.verificado;
                return true;
            });
        }

        if (filters.tipoPago) {
            filtered = filtered.filter(c => c.tipo_pago === filters.tipoPago);
        }

        if (filters.modo) {
            filtered = filtered.filter(c => c.modo === filters.modo);
        }

        setFilteredCompras(filtered);
    };

    const handleVerificarPago = async (compraId, verificado) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/compras/${compraId}/verificar`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ verificado })
                }
            );

            if (response.ok) {
                fetchCompras(); // Recargar compras
            }
        } catch (error) {
            console.error("Error al verificar pago:", error);
        }
    };

    const resetFilters = () => {
        setFilters({
            rifa: "",
            participante: "",
            estado: "todas",
            tipoPago: "",
            modo: ""
        });
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid mt-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <h1 className="mb-2">Compras y Pagos</h1>
                    <p className="text-muted">Administra los pagos de tus rifas</p>
                </div>
            </div>

            <div className="row">
                {/* Tabla de compras */}
                <div className="col-lg-9">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            {/* Tabs */}
                            <ul className="nav nav-tabs mb-3">
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${filters.estado === 'todas' ? 'active' : ''}`}
                                        onClick={() => setFilters({...filters, estado: 'todas'})}
                                    >
                                        Todas
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${filters.estado === 'pendientes' ? 'active' : ''}`}
                                        onClick={() => setFilters({...filters, estado: 'pendientes'})}
                                    >
                                        Pendientes
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${filters.estado === 'verificadas' ? 'active' : ''}`}
                                        onClick={() => setFilters({...filters, estado: 'verificadas'})}
                                    >
                                        Verificadas
                                    </button>
                                </li>
                            </ul>

                            {/* Tabla */}
                            {filteredCompras.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="fa-solid fa-receipt text-muted fs-1 mb-3"></i>
                                    <p className="text-muted">No hay compras para mostrar</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Rifa</th>
                                                <th>Participante</th>
                                                <th>Creador</th>
                                                <th>Fecha</th>
                                                <th>Verificación</th>
                                                <th>Pago</th>
                                                <th>Cant.</th>
                                                <th>Monto</th>
                                                <th>Números</th>
                                                <th>Estado</th>
                                                <th>Modo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCompras.map(compra => (
                                                <tr key={compra.id}>
                                                    <td className="fw-bold">{compra.id}</td>
                                                    <td>
                                                        <div className="small">
                                                            <div className="fw-bold">{compra.rifa_titulo}</div>
                                                            <div className="text-muted">Demo Rifa {compra.rifa_id}</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="small">
                                                            <div className="fw-bold">{compra.comprador_nombre}</div>
                                                            <div className="text-muted">{compra.comprador_email}</div>
                                                            <div className="text-muted">{compra.comprador_telefono}</div>
                                                        </div>
                                                    </td>
                                                    <td className="small">{compra.creador_nombre}</td>
                                                    <td className="small">
                                                        <div>{new Date(compra.fecha_compra).toLocaleDateString()}</div>
                                                        <div className="text-muted">
                                                            {new Date(compra.fecha_compra).toLocaleTimeString()}
                                                        </div>
                                                    </td>
                                                    <td className="small">
                                                        <div>{new Date(compra.fecha_verificacion || compra.fecha_compra).toLocaleDateString()}</div>
                                                        <div className="text-muted">
                                                            {new Date(compra.fecha_verificacion || compra.fecha_compra).toLocaleTimeString()}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-primary">
                                                            {compra.tipo_pago}
                                                        </span>
                                                    </td>
                                                    <td className="fw-bold">{compra.cantidad}</td>
                                                    <td className="fw-bold text-success">
                                                        ${compra.monto_total}
                                                    </td>
                                                    <td className="small">
                                                        {compra.numeros?.join(', ') || 'N/A'}
                                                    </td>
                                                    <td>
                                                        {compra.verificado ? (
                                                            <button 
                                                                className="btn btn-sm btn-success"
                                                                onClick={() => handleVerificarPago(compra.id, false)}
                                                                title="Marcar como no verificado"
                                                            >
                                                                <i className="fa-solid fa-check"></i>
                                                            </button>
                                                        ) : (
                                                            <button 
                                                                className="btn btn-sm btn-outline-secondary"
                                                                onClick={() => handleVerificarPago(compra.id, true)}
                                                                title="Verificar pago"
                                                            >
                                                                <i className="fa-regular fa-circle"></i>
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-secondary">
                                                            {compra.modo || 'online'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar de filtros */}
                <div className="col-lg-3">
                    <div className="card border-0 shadow-sm sticky-top" style={{top: "20px"}}>
                        <div className="card-body">
                            <h5 className="card-title mb-3">Filtros</h5>

                            {/* Filtro por Rifa */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold">RIFA</label>
                                <select 
                                    className="form-select form-select-sm"
                                    value={filters.rifa}
                                    onChange={(e) => setFilters({...filters, rifa: e.target.value})}
                                >
                                    <option value="">Todas las rifas</option>
                                    {/* Aquí irían las rifas únicas */}
                                </select>
                            </div>

                            {/* Filtro por Ticket */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold">TICKET</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm"
                                    placeholder="Buscar ticket..."
                                />
                            </div>

                            {/* Filtro por Participante */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold">PARTICIPANTE</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm"
                                    placeholder="Nombre o email..."
                                    value={filters.participante}
                                    onChange={(e) => setFilters({...filters, participante: e.target.value})}
                                />
                            </div>

                            {/* Filtro por Status */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold">STATUS</label>
                                <select 
                                    className="form-select form-select-sm"
                                    value={filters.estado}
                                    onChange={(e) => setFilters({...filters, estado: e.target.value})}
                                >
                                    <option value="todas">Todas</option>
                                    <option value="verificadas">Verificadas</option>
                                    <option value="pendientes">Pendientes</option>
                                </select>
                            </div>

                            {/* Filtro por Tipo de Pago */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold">TIPO DE PAGO</label>
                                <select 
                                    className="form-select form-select-sm"
                                    value={filters.tipoPago}
                                    onChange={(e) => setFilters({...filters, tipoPago: e.target.value})}
                                >
                                    <option value="">Todos</option>
                                    <option value="BBVA">BBVA</option>
                                    <option value="SANTANDER">SANTANDER</option>
                                    <option value="BANORTE">BANORTE</option>
                                    <option value="ZELLE">ZELLE</option>
                                </select>
                            </div>

                            {/* Filtro por Modo */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold">MODO</label>
                                <select 
                                    className="form-select form-select-sm"
                                    value={filters.modo}
                                    onChange={(e) => setFilters({...filters, modo: e.target.value})}
                                >
                                    <option value="">Todos</option>
                                    <option value="online">Online</option>
                                    <option value="presencial">Presencial</option>
                                </select>
                            </div>

                            {/* Botones */}
                            <div className="d-grid gap-2">
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={applyFilters}
                                >
                                    Filtrar
                                </button>
                                <button 
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={resetFilters}
                                >
                                    Quitar Filtros
                                </button>
                            </div>

                            {/* Estado de búsqueda */}
                            <div className="mt-3 p-2 bg-light rounded">
                                <div className="small fw-bold mb-2">Estado de la búsqueda:</div>
                                <div className="small">
                                    Mostrando: <span className="fw-bold">{filteredCompras.length}</span> compras
                                </div>
                                {filters.estado !== 'todas' && (
                                    <div className="small">
                                        Filtro: {filters.estado}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagos;