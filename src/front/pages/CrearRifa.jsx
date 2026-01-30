import { Link } from "react-router-dom";

const CrearRifa = () => {

    return (
        <div>
            <div className="container mt-5">
                <button type="button" className="btn btn-link mb-3 d-flex">
                    <Link to="/" className="text-danger fs-3"><i className="fa-solid fa-angle-left"></i></Link>
                </button>                <h1 className="text-center text-danger text-bold" style={{fontSize:"60px"}} >Crear Rifa</h1>
                <form className="mt-4 col-6 m-auto">
                    <div className="mb-3">
                        <label htmlFor="tituloRifa" className="form-label">Título de la Rifa</label>
                        <input type="text" className="form-control" id="tituloRifa" placeholder="Ingrese el título de la rifa" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripcionRifa" className="form-label">Descripción</label>
                        <textarea className="form-control" id="descripcionRifa" rows="3" placeholder="Ingrese una descripción para la rifa"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="precioTicket" className="form-label">Precio por Ticket</label>
                        <input type="number" className="form-control" id="precioTicket" placeholder="Ingrese el precio por ticket" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="metodoPagos" className="form-label">Métodos de Pagos</label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Seleccione un método de pago</option>
                            <option value="ZELLE">ZELLE</option>
                            <option value="Transferencia-Bancaria">Transferencia Bancaria</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cantidadTickets" className="form-label">Cantidad de Tickets</label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Cantidad de Tickets</option>
                            <option value="1">100</option>
                            <option value="2">1.000</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Loteria" className="form-label">Loteria</label>
                        <input type="text" className="form-control" id="Loteria" placeholder="Ingrese la loteria" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fechaSorteo" className="form-label">Fecha y hora del Sorteo</label>
                        <input type="datetime-local" className="form-control" id="fechaSorteo" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imagenPremio" className="form-label">Imagen del premio</label>
                        <input type="file" className="form-control" id="imagenPremio" />
                    </div>
                    <button type="submit" className="btn btn-danger m-auto d-flex">Crear Rifa</button>
                </form>
            </div>

        </div>
    );
};
export default CrearRifa;