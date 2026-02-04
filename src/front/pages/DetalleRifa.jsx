import React from "react";

const DetalleRifa = () => {
    const rifa={
        titulo:"Rifas Macbook Pro",
        estado:"Activa",
        loteria:"Loteria Nacional",
        fechaSorteo:"25/02/2026 18:00",
        fechaConclusion:"25/03/2026 15:00",
        precioTicket:10,
        totalTickets:100,
        vendidos:1
    };

    const porcentaje= (rifa.vendidos / rifa.totalTickets) * 100;

    const tickets=[{
        id:1,
        numero:"001",
        nombre: "Joseph Chavez",
        telefono:"5555555555",
        monto: rifa.precioTicket,
        estado:"Pendiente"
      
    }];

    return (
        <div className="container my-5"
        style ={{paddingBottom: "120px"}}>
            <div className="mb-4">
                <h2 className="fw-bold"
                    style={{color:"#d90429"}}>
                    {rifa.titulo}
                </h2>
                <span className="badge bg-success mb-2"> 
                    {rifa.estado} 
                </span>
                <p className="mb-1"> Lotería: {rifa.loteria} </p>
                <p className="mb-1"> Fecha Sorteo: {rifa.fechaSorteo} </p>
                <p className="mb-1"> Fecha Conclusión: {rifa.fechaConclusion} </p>
                <p className="mb-1"> Precio Ticket: ${rifa.precioTicket} </p>
                </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h6>Tickets Vendidos</h6>
                            <h3>{rifa.vendidos} / {rifa.totalTickets}</h3>
                        </div>
                    </div>
                </div>
            <div className="col-md-4">
                <div className="card text-center shadow-sm">
                    <div className="card-body">
                        <h6> Ingresos</h6>
                        <h3>${rifa.vendidos * rifa.precioTicket}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card text-center shadow-sm">
                    <div className="card-body">
                        <h6> Boletos disponibles</h6>
                        <h3>{rifa.totalTickets - rifa.vendidos}</h3>
                    </div>
                </div>
            </div>
        </div>
            <div className="mb-5">
                <p className="fw-semibold">{porcentaje.toFixed(1)}% vendidos</p>
                <div className="progress" style={{height: "18px"}}>
                    <div className="progress-bar bg-danger"
                        style={{width: `${porcentaje}%`}}
                        />
                    </div>
                </div>
                <div className="card shadow-sm">
                    <div className="card-header bg-white fw-bold text-center">
                        Boletos Vendidos
                    </div>
                    <div className="card-body p-0 table-responsive">
                        <table className="table table-hover mb-0 align-middle" style={{ minWidth: "720px", tableLayout: "fixed" }}> {/* CAMBIO: layout fijo para evitar columnas desbalanceadas */} {/* CAMBIO 3: ancho mínimo para que no se corten títulos */}
                            <colgroup>
                                <col style={{ width: "80px" }} />
                                <col style={{ width: "200px" }} />
                                <col style={{ width: "150px" }} />
                                <col style={{ width: "100px" }} />
                                <col style={{ width: "120px", whiteSpace: "nowrap" }} />
                                <col style={{ width: "280px" }} />
                            </colgroup>
                        <thead className="table-light">
                            <tr>
                                <th className="text-center"> #ticket </th>
                                <th className="text-center">Comprador</th>
                                <th className="text-center">Teléfono</th>
                                <th className="text-center">Monto</th>
                                <th className="text-center">Estado</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td className="text-center">{ticket.numero}</td>
                                    <td className="text-center">{ticket.nombre}</td>
                                    <td className="text-center">{ticket.telefono}</td>
                                    <td className="text-center">${ticket.monto}</td>
                                    <td className="text-center">
                                        <span className="badge bg-warning">
                                            {ticket.estado}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex flex-row justify-content-end align-items-center gap-2"
                                        style={{whiteSpace: "nowrap"}}> 
                                            <button className="btn btn-sm btn-primary text-white" data-bs-toggle="modal" data-bs-target="#ticketPagoModal">
                                                Ver ticket de deposito
                                            </button>
                                            <button className="btn btn-sm btn-success text-white">
                                                Aprobar
                                            </button>
                                            <button className="btn btn-sm btn-danger text-white">
                                                Rechazar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    );  
};

export default DetalleRifa;