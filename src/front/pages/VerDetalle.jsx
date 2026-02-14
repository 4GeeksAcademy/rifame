import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const VerDetalle = () => {
  const { id } = useParams();
  const { store } = useGlobalReducer();

  // Buscar la rifa por id
  const rifa = store.rifas.find(
    (r) => r.id === parseInt(id)
  );

  if (!rifa) {
    return <h2 className="text-center mt-5">Rifa no encontrada</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="card p-4">

        <img
          src={rifa.imagen}
          alt={rifa.tituloRifa}
          className="img-fluid mb-3"
        />

        <h2>{rifa.tituloRifa}</h2>
        <p>{rifa.descripcionRifa}</p>

        <p><strong>Precio Ticket:</strong> ${rifa.precioTicket}</p>
        <p><strong>Total Tickets:</strong> {rifa.totalTickets}</p>
        <p><strong>Fecha Sorteo:</strong> {rifa.fechaSorteo}</p>

      </div>
    </div>
  );
};

export default VerDetalle;