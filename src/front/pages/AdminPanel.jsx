import { Link } from "react-router-dom";

const AdminPanel = () => {
    return (
            <div className="container my-5">
                
                    <div className="d-flex justify-content-center mb-5">
                        <h1 style={{color:"#d90429", fontWeight:"bold", fontSize:"60px"}}>
                            Panel de Administración
                        </h1>
                    </div>

                <div className="row justify-content-center mb-5 g-4">
                            <div className="col-12 col-md-4">
                            <div className="p-4 rounded-4 text-center"
                                style={{boxShadow: "0 10px 30px rgba(217,4,41,.15)"}}>
                                <h4 style={{color:"#d90429"}}>
                                    Rifas Activas
                                </h4>
                                <p className="fs-1 fw-bold">
                                    1                                
                                </p>
                            </div>
                        </div>
               <div className="col-12 col-md-4">
                            <div className="p-4 rounded-4 text-center"
                                style={{boxShadow: "0 10px 30px rgba(217,4,41,.15)"}}>
                                <h4 style={{color:"#d90429"}}>
                                    Historial
                                </h4>
                                <p className="fs-1 fw-bold">
                                    3                                
                                </p>
                            </div>
                    </div>
                </div>
                <h2 className="mb-4"
                    style={{color:"#d90429", fontWeight:"bold",}}>
                    Rifas Publicadas
                </h2>
                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="card h-100 border-0 p-4 d-flex flex-column"
                            style={{boxShadow: "0 10px 30px rgba(217,4,41,.15)", borderRadius: "20px"}}>
                                <h4 style={{color:"#d90429", fontWeight:"bold"}}>
                                    Rifas Macbook Pro
                                </h4>
                                <span className="badge bg-success mb-3">
                                    Activa
                                </span>
                                 <ul className="list-unstyled small">
                                    <li><strong>Loteria:</strong> Loteria Nacional</li>
                                    <li><strong>Fecha Sorteo:</strong> 25/02/2026 18:00</li>
                                    <li><strong>Precio Ticket:</strong> $10</li>
                                    <li><strong>Fecha Conclusión:</strong> 25/03/2026 15:00</li>
                                    <li><strong>Tickets:</strong> 1/100</li>
                                </ul>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        porcentaje de ventas
                                    </small>
                                <div className="progress">
                                <div className="progress-bar bg-danger"
                                    style={{width: "1%"}}>
                                        1%
                                </div>
                                </div>
                                </div>
                                <div className="mt-auto d-flex justify-content-center pt-3">
                                    <Link to="/detalle-rifa" className="btn btn-sm btn-outline-danger rounded-5">
                                        Consultar rifa
                                    </Link>
                                </div>
                        </div>
                    </div>
                    </div>
                <h2 className="mb-4"
                    style={{color:"#d90429", fontWeight:"bold",}}>
                        Historial de Rifas
                </h2>
                <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Rifa</th>
                                <th>Loteria</th>
                                <th>Fecha Sorteo</th>
                                <th>Estado</th>
                                <th>Tickets</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rifa iphone</td>
                                <td>Loteria Nacional</td>
                                <td>25/12/2026 18:00</td>
                                <td><span className="badge bg-success">Finalizada</span></td>
                                <td>100/100</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-danger rounded-5">
                                        Consultar rifa
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
    );
};

export default AdminPanel;